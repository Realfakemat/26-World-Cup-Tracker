import fs from 'fs';
import path from 'path';

// Known hosts and teams
// As of early prep, USA, CAN, MEX are Hosts. We map them.
const MOCK_TEAMS = [
  // Group A
  { id: 'MEX', name: 'Mexico', group: 'A', flagCode: 'mx' },
  { id: 'NGA', name: 'Nigeria', group: 'A', flagCode: 'ng' },
  { id: 'NOR', name: 'Norway', group: 'A', flagCode: 'no' },
  { id: 'KOR', name: 'South Korea', group: 'A', flagCode: 'kr' },
  // Group B
  { id: 'CAN', name: 'Canada', group: 'B', flagCode: 'ca' },
  { id: 'MAR', name: 'Morocco', group: 'B', flagCode: 'ma' },
  { id: 'SRB', name: 'Serbia', group: 'B', flagCode: 'rs' },
  { id: 'NZL', name: 'New Zealand', group: 'B', flagCode: 'nz' },
  // Group C
  { id: 'USA', name: 'USA', group: 'C', flagCode: 'us' },
  { id: 'SEN', name: 'Senegal', group: 'C', flagCode: 'sn' },
  { id: 'POL', name: 'Poland', group: 'C', flagCode: 'pl' },
  { id: 'AUS', name: 'Australia', group: 'C', flagCode: 'au' },
  // Group D
  { id: 'ARG', name: 'Argentina', group: 'D', flagCode: 'ar' },
  { id: 'EGY', name: 'Egypt', group: 'D', flagCode: 'eg' },
  { id: 'SWE', name: 'Sweden', group: 'D', flagCode: 'se' },
  { id: 'JAM', name: 'Jamaica', group: 'D', flagCode: 'jm' },
  // Group E
  { id: 'FRA', name: 'France', group: 'E', flagCode: 'fr' },
  { id: 'CIV', name: 'Ivory Coast', group: 'E', flagCode: 'ci' },
  { id: 'COL', name: 'Colombia', group: 'E', flagCode: 'co' },
  { id: 'IRQ', name: 'Iraq', group: 'E', flagCode: 'iq' },
  // Group F
  { id: 'ENG', name: 'England', group: 'F', flagCode: 'gb-eng' },
  { id: 'CMR', name: 'Cameroon', group: 'F', flagCode: 'cm' },
  { id: 'ECU', name: 'Ecuador', group: 'F', flagCode: 'ec' },
  { id: 'KSA', name: 'Saudi Arabia', group: 'F', flagCode: 'sa' },
  // Group G
  { id: 'ESP', name: 'Spain', group: 'G', flagCode: 'es' },
  { id: 'DZA', name: 'Algeria', group: 'G', flagCode: 'dz' },
  { id: 'URU', name: 'Uruguay', group: 'G', flagCode: 'uy' },
  { id: 'IRN', name: 'Iran', group: 'G', flagCode: 'ir' },
  // Group H
  { id: 'BRA', name: 'Brazil', group: 'H', flagCode: 'br' },
  { id: 'MLI', name: 'Mali', group: 'H', flagCode: 'ml' },
  { id: 'SUI', name: 'Switzerland', group: 'H', flagCode: 'ch' },
  { id: 'QAT', name: 'Qatar', group: 'H', flagCode: 'qa' },
  // Group I
  { id: 'POR', name: 'Portugal', group: 'I', flagCode: 'pt' },
  { id: 'GHA', name: 'Ghana', group: 'I', flagCode: 'gh' },
  { id: 'CHI', name: 'Chile', group: 'I', flagCode: 'cl' },
  { id: 'JPN', name: 'Japan', group: 'I', flagCode: 'jp' },
  // Group J
  { id: 'GER', name: 'Germany', group: 'J', flagCode: 'de' },
  { id: 'ZAF', name: 'South Africa', group: 'J', flagCode: 'za' },
  { id: 'PER', name: 'Peru', group: 'J', flagCode: 'pe' },
  { id: 'UZB', name: 'Uzbekistan', group: 'J', flagCode: 'uz' },
  // Group K
  { id: 'BEL', name: 'Belgium', group: 'K', flagCode: 'be' },
  { id: 'TUN', name: 'Tunisia', group: 'K', flagCode: 'tn' },
  { id: 'VEN', name: 'Venezuela', group: 'K', flagCode: 've' },
  { id: 'UAE', name: 'UAE', group: 'K', flagCode: 'ae' },
  // Group L
  { id: 'NED', name: 'Netherlands', group: 'L', flagCode: 'nl' },
  { id: 'BFA', name: 'Burkina Faso', group: 'L', flagCode: 'bf' },
  { id: 'PAR', name: 'Paraguay', group: 'L', flagCode: 'py' },
  { id: 'CRC', name: 'Costa Rica', group: 'L', flagCode: 'cr' }
];

const VENUES = [
  'Arrowhead Stadium, Kansas City', 'AT&T Stadium, Dallas', 'Azteca, Mexico City', 
  'BC Place, Vancouver', 'BMO Field, Toronto', 'Estadio Monterrey, Monterrey', 
  'Gillette Stadium, Boston', 'Hard Rock Stadium, Miami', "Levi's Stadium, San Francisco",
  'Lincoln Financial Field, Philadelphia', 'Lumen Field, Seattle', 
  'Mercedes-Benz Stadium, Atlanta', 'MetLife Stadium, New Jersey',
  'NRG Stadium, Houston', 'SoFi Stadium, Los Angeles'
];

interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string;
  group: string;
  matchday: number;
  venue: string;
  status: string;
  homeScore: number | null;
  awayScore: number | null;
  minute?: number;
}

const schedule: Match[] = [];
const STARTS_JUNE_11 = new Date('2026-06-11T12:00:00Z');

let matchCounter = 1;
const groups = ['A','B','C','D','E','F','G','H','I','J','K','L'];

function generateSimulatedScores(matchDate: Date): { s: string, h: number|null, a: number|null, min?: number } {
  const now = new Date('2026-06-18T10:00:00Z'); // simulated current global time
  if (matchDate < new Date(now.getTime() - 2 * 60 * 60 * 1000)) {
    return { s: 'final', h: Math.floor(Math.random() * 4), a: Math.floor(Math.random() * 3) };
  } else if (matchDate < now && matchDate >= new Date(now.getTime() - 2 * 60 * 60 * 1000)) {
    return { s: 'live', h: Math.floor(Math.random() * 2), a: Math.floor(Math.random() * 2), min: Math.floor(Math.random() * 90) };
  }
  return { s: 'upcoming', h: null, a: null };
}

// 72 Group stage matches
for (let md = 1; md <= 3; md++) {
  let currentDate = new Date(STARTS_JUNE_11.getTime() + ((md - 1) * 6 * 24 * 60 * 60 * 1000));
  
  for (let gIndex = 0; gIndex < groups.length; gIndex++) {
    const g = groups[gIndex];
    const groupTeams = MOCK_TEAMS.filter(t => t.group === g);
    
    // Each group has 2 matches per matchday
    // MD1: 0v1, 2v3
    // MD2: 0v2, 1v3
    // MD3: 0v3, 1v2
    let pairs = [];
    if (md === 1) pairs = [[0, 1], [2, 3]];
    if (md === 2) pairs = [[0, 2], [1, 3]];
    if (md === 3) pairs = [[0, 3], [1, 2]];
    
    for (let p of pairs) {
      const matchDateStr = currentDate.toISOString().replace('12:00:00', Math.floor(Math.random() * (21 - 15) + 15) + ':00:00'); 
      const scores = generateSimulatedScores(new Date(matchDateStr));
      
      schedule.push({
        id: `M${matchCounter.toString().padStart(3, '0')}`,
        homeTeamId: groupTeams[p[0]].id,
        awayTeamId: groupTeams[p[1]].id,
        date: matchDateStr,
        group: g,
        matchday: md,
        venue: VENUES[Math.floor(Math.random() * VENUES.length)],
        status: scores.s,
        homeScore: scores.h,
        awayScore: scores.a,
        minute: scores.min,
      });
      matchCounter++;
      
      if (matchCounter % 4 === 0) {
        currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000); // Next day after 4 matches
      }
    }
  }
}

const fileContent = `import { Team, Match } from '../types/tournament';

export const TEAMS: Team[] = ${JSON.stringify(MOCK_TEAMS, null, 2)};

export const FIXTURES: Match[] = ${JSON.stringify(schedule, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src/data/tournamentData.ts'), fileContent, 'utf-8');
console.log('Successfully ingested 72-match FIFA schedule');
