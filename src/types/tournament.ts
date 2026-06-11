export type GroupId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'Knockout';

export interface Team {
  id: string;
  name: string;
  group: GroupId;
  flagCode: string;
  logoUrl?: string;
  primaryColor: string;
}

export type MatchStatus = 'upcoming' | 'live' | 'final';

export interface Match {
  id: string;
  homeTeamId: string;
  awayTeamId: string;
  date: string; // ISO 8601
  group: GroupId;
  matchday: number;
  venue: string;
  status: MatchStatus;
  homeScore: number | null;
  awayScore: number | null;
  minute?: number; // Only if live
}

export interface TeamStanding {
  teamId: string;
  group: GroupId;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  rank: number;
}
