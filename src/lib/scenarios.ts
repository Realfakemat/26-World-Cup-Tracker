import { Match } from '../types/tournament';
import { computeGroupStandings, getTeamById } from './tournament';

export interface MatchScenario {
  homeWin: string;
  draw: string;
  awayWin: string;
}

export function generateScenarios(match: Match): MatchScenario {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const standings = computeGroupStandings(match.group);

  if (!homeTeam || !awayTeam) {
    return {
      homeWin: 'Scenario unavailable.',
      draw: 'Scenario unavailable.',
      awayWin: 'Scenario unavailable.',
    };
  }

  const hName = homeTeam.name;
  const aName = awayTeam.name;

  const hStand = standings.find((s) => s.teamId === homeTeam.id);
  const aStand = standings.find((s) => s.teamId === awayTeam.id);

  const hPts = hStand?.points || 0;
  const aPts = aStand?.points || 0;

  if (match.matchday === 1) {
    return {
      homeWin: `If ${hName} wins, they take early control of Group ${match.group} with 3 points, maximizing their top-two chances.`,
      draw: `A draw keeps both ${hName} and ${aName} alive, but puts pressure on Matchday 2 to find a victory.`,
      awayWin: `If ${aName} wins, they secure 3 vital points away from home, putting ${hName} in immediate jeopardy.`,
    };
  }

  if (match.matchday === 2) {
    const hWinPts = hPts + 3;
    const aWinPts = aPts + 3;
    return {
      homeWin: `If ${hName} wins, they jump to ${hWinPts} points, likely cementing at least a third-place advancement spot.`,
      draw: `If they draw, ${hName} goes to ${hPts + 1} and ${aName} to ${aPts + 1}, pushing qualification fully onto the final matchday.`,
      awayWin: `If ${aName} wins, they reach ${aWinPts} points, taking full control of their destiny heading into Matchday 3.`,
    };
  }

  if (match.matchday === 3) {
    return {
      homeWin: `A must-win or strong-position game. ${hName} winning forces them up the table; ${aName} risks elimination.`,
      draw: `A draw might suit the team currently higher in the table, but leaves them vulnerable to other group results.`,
      awayWin: `If ${aName} wins, they steal the points and likely leapfrog in the standings, potentially knocking out ${hName}.`,
    };
  }

  return {
    homeWin: `Important points for ${hName}.`,
    draw: 'Both teams share points.',
    awayWin: `Important points for ${aName}.`,
  };
}
