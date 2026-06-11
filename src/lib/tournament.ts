import { Match, Team, TeamStanding, GroupId } from '../types/tournament';
import { TEAMS, FIXTURES } from '../data/tournamentData';

export function getGroupTeams(groupId: GroupId): Team[] {
  return TEAMS.filter((t) => t.group === groupId);
}

export function getGroupMatches(groupId: GroupId): Match[] {
  return FIXTURES.filter((m) => m.group === groupId).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

export function computeGroupStandings(groupId: GroupId): TeamStanding[] {
  const teams = getGroupTeams(groupId);
  const matches = getGroupMatches(groupId);

  const standingsMap: Record<string, TeamStanding> = {};

  teams.forEach((t) => {
    standingsMap[t.id] = {
      teamId: t.id,
      group: groupId,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
      rank: 0,
    };
  });

  matches.forEach((m) => {
    if ((m.status === 'final' || m.status === 'live') && m.homeScore !== null && m.awayScore !== null) {
      const home = standingsMap[m.homeTeamId];
      const away = standingsMap[m.awayTeamId];

      if (!home || !away) return; // In case of incomplete data

      home.played += 1;
      away.played += 1;
      home.goalsFor += m.homeScore;
      home.goalsAgainst += m.awayScore;
      away.goalsFor += m.awayScore;
      away.goalsAgainst += m.homeScore;

      if (m.homeScore > m.awayScore) {
        home.won += 1;
        away.lost += 1;
        home.points += 3;
      } else if (m.homeScore < m.awayScore) {
        away.won += 1;
        home.lost += 1;
        away.points += 3;
      } else {
        home.drawn += 1;
        away.drawn += 1;
        home.points += 1;
        away.points += 1;
      }
    }
  });

  // Calculate GD and sort
  const standings = Object.values(standingsMap).map((s) => ({
    ...s,
    goalDifference: s.goalsFor - s.goalsAgainst,
  }));

  standings.sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
    if (a.goalsFor !== b.goalsFor) return b.goalsFor - a.goalsFor;
    return 0; // Simple tie-break for prototype
  });

  // Assign ranks
  standings.forEach((s, idx) => {
    s.rank = idx + 1;
  });

  return standings;
}

export function resolveKnockoutTeamId(placeholder: string): string | null {
  // Check if it's a Knockout placeholder (like 1A, 2B)
  if (placeholder.match(/^[12][A-L]$/)) {
    const rank = parseInt(placeholder[0]);
    const group = placeholder[1] as GroupId;
    const standings = computeGroupStandings(group);
    if (standings.length > rank - 1) {
      return standings[rank - 1].teamId;
    }
  }

  if (placeholder === '3RD') {
    return '3RD';
  }

  return placeholder;
}

export function getTeamById(id: string): Team | undefined {
  if (id === '3RD') return { id: '3RD', name: 'TBD 3rd Rank', group: 'Knockout', flagCode: 'un', primaryColor: '#555' };
  
  // Try resolving first
  const resolvedId = resolveKnockoutTeamId(id) || id;
  const t = TEAMS.find((t) => t.id === resolvedId);
  if (t) return t;

  // Generic placeholder team
  return {
    id,
    name: id,
    group: 'Knockout',
    flagCode: 'un',
    primaryColor: '#888'
  };
}

// Global third place computations
export function computeThirdPlaceRace(): TeamStanding[] {
  const allGroups: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const thirdPlaceTeams: TeamStanding[] = [];

  allGroups.forEach((g) => {
    const st = computeGroupStandings(g);
    if (st.length >= 3) {
      thirdPlaceTeams.push(st[2]); // Rank 3 is index 2
    }
  });

  thirdPlaceTeams.sort((a, b) => {
    if (a.points !== b.points) return b.points - a.points;
    if (a.goalDifference !== b.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return thirdPlaceTeams;
}
