import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import fs from "fs";

const PORT = 3000;

async function startServer() {
  const app = express();
  
  app.use(express.json());

  // API constraints
  let cachedLeaderboard: any = null;
  let lastLeaderboardUpdate = 0;

  app.get("/api/leaderboard", async (req, res) => {
    if (Date.now() - lastLeaderboardUpdate < 60000 && cachedLeaderboard) {
      return res.json(cachedLeaderboard);
    }

    try {
      const statsMap = new Map<string, any>(); // key map: playerName or ID

      const getPlayer = (id: string | number, name: string, teamName: string, teamLogoUrl: string) => {
        let key = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!statsMap.has(key)) {
          statsMap.set(key, {
            id: String(id),
            name,
            headshotUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff`,
            teamName,
            teamLogoUrl,
            goals: 0,
            assists: 0,
            matches: 0,
          });
        }
        return statsMap.get(key);
      };

      // 1. Fetch from ESPN Scoreboard to get all goals from the tournament
      try {
        const espnRes = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719');
        const espnData = await espnRes.json();
        const events = espnData.events || [];
        for (const ev of events) {
          const details = ev.competitions?.[0]?.details || [];
          for (const det of details) {
            if (det.type?.text === 'Goal' && !det.ownGoal) {
              const athletes = det.athletesInvolved || [];
              if (athletes.length > 0) {
                const athlete = athletes[0];
                const teamData = ev.competitions[0].competitors.find((c: any) => c.team.id === det.team?.id)?.team;
                const p = getPlayer(athlete.id, athlete.shortName || athlete.displayName, teamData?.name || '', teamData?.logo || '');
                p.goals += (det.scoreValue || 1);
              }
            }
          }
        }
      } catch (err) {
        console.error("ESPN Fetch Error", err);
      }

      // 2. Fetch live events from API Football to get assists and live goals
      const apiKey = process.env.API_FOOTBALL_KEY;
      if (apiKey) {
        try {
          const apiFootballRes = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": "v3.football.api-sports.io"
            }
          });
          const liveData = await apiFootballRes.json();
          const wcMatches = (liveData.response || []).filter((m: any) => m.league?.name === 'World Cup' || m.league?.id === 1 || String(m.fixture?.id) === '1489369');
          
          for (const match of wcMatches) {
            const events = match.events || [];
            for (const ev of events) {
              if (ev.type === 'Goal' && ev.detail !== 'Own Goal') {
                const teamData = ev.team;
                // Add assist if available
                if (ev.assist && ev.assist.id && ev.assist.name) {
                  const astPlayer = getPlayer(ev.assist.id, ev.assist.name, teamData?.name, teamData?.logo);
                  // We add assists. We assume ESPN doesn't map these to the same IDs. 
                  // But name lowercase matching will link them if they are identical, though ESPN vs API-Football names might differ slightly.
                  astPlayer.assists += 1;
                }
                
                if (ev.player && ev.player.id && ev.player.name) {
                  const goalPlayer = getPlayer(ev.player.id, ev.player.name, teamData?.name, teamData?.logo);
                  // If ESPN already recorded this goal (e.g. they both updated), we could have double counting.
                  // But the live endpoint might have goals ESPN doesn't have yet.
                  // For now, let's just make sure we don't blindly add. We'll set a custom property and use the max.
                  goalPlayer.liveGoals = (goalPlayer.liveGoals || 0) + 1;
                }
              }
            }
          }
        } catch (err) {
          console.error("API Football Fetch Error", err);
        }
      }

      // Apply the liveGoals correction
      const allPlayers = Array.from(statsMap.values()).map(p => {
        p.goals = Math.max(p.goals, p.liveGoals || 0);
        return p;
      });

      const goalsLeaders = [...allPlayers].filter(p => p.goals > 0).sort((a, b) => b.goals - a.goals);
      const assistsLeaders = [...allPlayers].filter(p => p.assists > 0).sort((a, b) => b.assists - a.assists);

      // assign ranks
      goalsLeaders.forEach((p, idx) => p.rank = idx + 1);
      assistsLeaders.forEach((p, idx) => p.rank = idx + 1);

      cachedLeaderboard = { goalsLeaders, assistsLeaders };
      lastLeaderboardUpdate = Date.now();
      res.json(cachedLeaderboard);

    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  let cachedLiveFixtures: any = null;
  let lastLiveFixturesUpdate = 0;

  app.get("/api/fixtures/live", async (req, res) => {
    if (Date.now() - lastLiveFixturesUpdate < 60000 && cachedLiveFixtures) {
      return res.json(cachedLiveFixtures);
    }

    const updates = new Map<string, any>();

    // 1. Fetch completed/live matches from ESPN
    try {
      const espnRes = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719');
      const espnData = await espnRes.json();
      const events = espnData.events || [];
      
      for (const ev of events) {
        const homeComp = ev.competitions[0].competitors.find((c: any) => c.homeAway === 'home');
        const awayComp = ev.competitions[0].competitors.find((c: any) => c.homeAway === 'away');
        
        if (homeComp?.team?.abbreviation && awayComp?.team?.abbreviation) {
          const homeId = homeComp.team.abbreviation;
          const awayId = awayComp.team.abbreviation;
          
          let statusStr = 'upcoming';
          if (ev.status.type.completed) statusStr = 'final';
          else if (ev.status.type.state === 'in') statusStr = 'live';

          const matchObj = {
            homeTeamId: homeId,
            awayTeamId: awayId,
            status: statusStr,
            homeScore: parseInt(homeComp.score || '0', 10),
            awayScore: parseInt(awayComp.score || '0', 10),
            minute: ev.status.clock || 0
          };
          
          // We use home-away as key
          updates.set(`${homeId}-${awayId}`, matchObj);
        }
      }
    } catch (err) {
      console.error("ESPN Match Fetch Error", err);
    }

    const apiKey = process.env.API_FOOTBALL_KEY;
    if (apiKey) {
      try {
        const apiFootballRes = await fetch('https://v3.football.api-sports.io/fixtures?live=all', {
          headers: {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": "v3.football.api-sports.io"
          }
        });
        const liveData = await apiFootballRes.json();
        const wcMatches = (liveData.response || []).filter((m: any) => m.league?.name === 'World Cup' || m.league?.id === 1 || String(m.fixture?.id) === '1489369');
        
        wcMatches.forEach((m: any) => {
          // If we also get id here, it's our direct match id but wait, API-Football and ESPN ids aren't the same.
          // For API-Football we use their fixture.id
          updates.set(String(m.fixture.id), {
            id: String(m.fixture.id),
            status: 'live',
            homeScore: m.goals.home,
            awayScore: m.goals.away,
            minute: m.fixture.status.elapsed
          });
        });
      } catch (err: any) {
        console.error("API Football Fetch Error", err);
      }
    }

    cachedLiveFixtures = Array.from(updates.values());
    lastLiveFixturesUpdate = Date.now();
    res.json(cachedLiveFixtures);
  });

  app.get("/api/events/:homeId/:awayId", async (req, res) => {
    try {
      const espnRes = await fetch('https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719');
      const espnData = await espnRes.json();
      const events = espnData.events || [];
      
      const homeId = req.params.homeId;
      const awayId = req.params.awayId;

      const match = events.find((ev: any) => {
        const homeComp = ev.competitions[0].competitors.find((c: any) => c.homeAway === 'home');
        const awayComp = ev.competitions[0].competitors.find((c: any) => c.homeAway === 'away');
        return homeComp?.team?.abbreviation === homeId && awayComp?.team?.abbreviation === awayId;
      });

      if (!match) {
        return res.json([]);
      }

      res.json(match.competitions[0].details || []);
    } catch (err: any) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
