import axios from 'axios';
import fs from 'fs';
import path from 'path';

async function ingestESPN() {
  const allEvents = [];
  // From June 11 to July 19
  // 11, 12, 13, ..., 30
  // July 1, ..., 19
  const dates = [];
  for (let i = 11; i <= 30; i++) dates.push(`202606${i.toString().padStart(2, '0')}`);
  for (let i = 1; i <= 19; i++) dates.push(`202607${i.toString().padStart(2, '0')}`);
  
  for (const date of dates) {
    try {
      const res = await axios.get(`https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=${date}`);
      if (res.data.events && res.data.events.length > 0) {
        allEvents.push(...res.data.events);
      }
    } catch(e) {
      console.log('Error fetching ' + date, e.message);
    }
    // brief delay
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`Fetched ${allEvents.length} events from ESPN`);

  // Transform to our format
  const teamMap = new Map();
  const schedule = [];
  const teamMatchCount = new Map();

  allEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  let matchCounter = 1;
  const matchDaysMap = new Map(); // to grouping correctly if needed
  
  for (const event of allEvents) {
    const isGroup = event.season?.type?.name === 'Group Stage' || event.season?.slug === 'group-stage';
    const isKnockout = !isGroup;

    const comps = event.competitions[0];
    const homeTeam = comps.competitors.find(c => c.homeAway === 'home').team;
    const awayTeam = comps.competitors.find(c => c.homeAway === 'away').team;

    // extract team details
    const homeId = homeTeam.abbreviation || homeTeam.name.substring(0, 3).toUpperCase();
    const awayId = awayTeam.abbreviation || awayTeam.name.substring(0, 3).toUpperCase();
    
    if (!teamMap.has(homeId)) {
      teamMap.set(homeId, {
        id: homeId,
        name: homeTeam.name,
        group: isGroup ? 'TBD' : 'TBD',
        flagCode: homeTeam.abbreviation ? homeTeam.abbreviation.toLowerCase() : 'unknown',
        logoUrl: homeTeam.logo
      });
    }
    if (!teamMap.has(awayId)) {
      teamMap.set(awayId, {
        id: awayId,
        name: awayTeam.name,
        group: isGroup ? 'TBD' : 'TBD',
        flagCode: awayTeam.abbreviation ? awayTeam.abbreviation.toLowerCase() : 'unknown',
        logoUrl: awayTeam.logo
      });
    }

    const homeCount = (teamMatchCount.get(homeId) || 0) + 1;
    const awayCount = (teamMatchCount.get(awayId) || 0) + 1;
    teamMatchCount.set(homeId, homeCount);
    teamMatchCount.set(awayId, awayCount);

    const matchday = isKnockout ? 4 : Math.max(homeCount, awayCount);

    const homeScore = comps.competitors.find(c => c.homeAway === 'home').score || '0';
    const awayScore = comps.competitors.find(c => c.homeAway === 'away').score || '0';

    let status = 'upcoming';
    if (event.status.type.state === 'post') status = 'final';
    if (event.status.type.state === 'in') status = 'live';

    schedule.push({
      id: event.id,
      homeTeamId: homeId,
      awayTeamId: awayId,
      date: event.date,
      group: isKnockout ? 'Knockout' : 'Group',
      matchday: matchday,
      venue: event.venue?.displayName || 'TBD',
      status: status,
      homeScore: status !== 'upcoming' ? parseInt(homeScore) : null,
      awayScore: status !== 'upcoming' ? parseInt(awayScore) : null,
      minute: event.status.clock || 0
    });
    matchCounter++;
  }

  const fileContent = `import { Team, Match, GroupId, MatchStatus } from '../types/tournament';

// Helper to assign groups A-L
const rawTeams: any[] = ${JSON.stringify(Array.from(teamMap.values()), null, 2)};
const rawSchedule: any[] = ${JSON.stringify(schedule, null, 2)};

// Build groups from fixtures
const graph = new Map();
for (const match of rawSchedule) {
  if (match.group === 'Knockout') continue;
  if (!graph.has(match.homeTeamId)) graph.set(match.homeTeamId, new Set());
  if (!graph.has(match.awayTeamId)) graph.set(match.awayTeamId, new Set());
  graph.get(match.homeTeamId).add(match.awayTeamId);
  graph.get(match.awayTeamId).add(match.homeTeamId);
}

const visited = new Set();
const clusters = [];

for (const teamId of graph.keys()) {
  if (visited.has(teamId)) continue;
  const cluster = [];
  const q = [teamId];
  while (q.length > 0) {
    const curr = q.shift();
    if (!visited.has(curr)) {
      visited.add(curr);
      cluster.push(curr);
      for (const neighbor of graph.get(curr)) {
        if (!visited.has(neighbor)) {
          q.push(neighbor);
        }
      }
    }
  }
  clusters.push(cluster);
}

const groupNames = ['A', 'B', 'D', 'C', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
let nextGroupIdx = 0;

function getNextGroupName(c) {
  if (c.includes('MEX')) return 'A';
  if (c.includes('CAN')) return 'B';
  if (c.includes('USA')) return 'D';
  while (groupNames[nextGroupIdx] === 'A' || groupNames[nextGroupIdx] === 'B' || groupNames[nextGroupIdx] === 'D') {
    nextGroupIdx++;
  }
  const name = groupNames[nextGroupIdx];
  nextGroupIdx++;
  return name;
}

for (const c of clusters) {
  const gName = getNextGroupName(c);
  for (const teamId of c) {
    const t = rawTeams.find(x => x.id === teamId);
    if (t) t.group = gName;
  }
}

for (let t of rawTeams) {
  if (!t.primaryColor) t.primaryColor = '#3b82f6';
  if (!t.group || t.group === 'TBD' || t.name.includes("Round") || t.name.includes("Place") || t.name.includes("Winner") || t.name.includes("Loser")) {
    t.group = "Knockout";
  }
}

export const TEAMS: Team[] = rawTeams as Team[];

for (let m of rawSchedule) {
  const homeTeam = rawTeams.find(t => t.id === m.homeTeamId);
  if (homeTeam && homeTeam.group !== "Knockout") {
    m.group = homeTeam.group;
  }
}

export const FIXTURES: Match[] = rawSchedule as Match[];
`;

  fs.writeFileSync(path.join(process.cwd(), 'src/data/tournamentData.ts'), fileContent, 'utf-8');
  console.log('Successfully written real schedule data.');
}

ingestESPN();
