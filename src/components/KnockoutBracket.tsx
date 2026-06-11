import React from 'react';
import { FIXTURES, TEAMS } from '../data/tournamentData';
import { getTeamById } from '../lib/tournament';
import { Match } from '../types/tournament';
import { cn } from '../lib/utils';

function MatchNode({ match, className }: { match?: Match, className?: string, key?: string | number }) {
  if (!match) return <div className={cn("h-14 w-32 md:w-36", className)}></div>;

  const home = getTeamById(match.homeTeamId) || { id: match.homeTeamId, name: match.homeTeamId, flagCode: 'un', logoUrl: '' };
  const away = getTeamById(match.awayTeamId) || { id: match.awayTeamId, name: match.awayTeamId, flagCode: 'un', logoUrl: '' };

  const renderTeam = (team: any, score: any) => {
    const isPlaceholder = team.group === 'Knockout' || !team.logoUrl;
    
    let name = team.name;
    if (isPlaceholder) {
      name = name.replace('Winner', '').replace('Place', '').replace('Group', 'Grp').trim();
      if (name.startsWith('W') && !isNaN(parseInt(name[1]))) {
        name = `W M${name.substring(1)}`;
      }
    } else {
      if (name.length > 15) {
        name = team.id;
      }
    }

    return (
      <div className="flex justify-between items-center px-2 py-1 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {isPlaceholder ? (
            <div className="w-3.5 h-3.5 rounded-full bg-white/10 shrink-0 border border-white/20"></div>
          ) : (
            <img src={team.logoUrl} className="w-3.5 h-3.5 shrink-0 object-contain" alt={team.name} />
          )}
          <span className={cn(
             "font-bold uppercase tracking-tight truncate",
             isPlaceholder ? "text-[8px] text-gray-500" : "text-[10px]"
          )}>{name}</span>
        </div>
        <span className="font-black text-gray-400 ml-1.5">{score ?? '-'}</span>
      </div>
    );
  };

  return (
    <div className={cn("bg-gray-800 border border-white/10 rounded-lg flex flex-col text-[10px] shadow-md z-10 w-32 md:w-36 hover:border-gray-400 transition-colors cursor-default", className)}>
      <div className="border-b border-white/5 flex flex-col justify-center">
        {renderTeam(home, match.homeScore)}
      </div>
      <div className="flex flex-col justify-center">
        {renderTeam(away, match.awayScore)}
      </div>
      {match.status === 'live' && (
        <div className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </div>
      )}
    </div>
  );
}

function RoundColumn({ matches, isRightSide }: { matches: Match[], isRightSide?: boolean }) {
  return (
    <div className="flex flex-col justify-around h-full w-32 md:w-36 relative">
      {matches.map(m => (
        <MatchNode key={m.id} match={m} />
      ))}
    </div>
  );
}

export function KnockoutBracket() {
  const knockoutMatches = FIXTURES.filter(m => m.group === 'Knockout');
  
  const findMatch = (home: string, away: string) => knockoutMatches.find(m => m.homeTeamId === home && m.awayTeamId === away) || knockoutMatches[0];

  // Round of 32
  const m73 = findMatch('2A', '2B');
  const m74 = findMatch('1E', '3RD'); // Actually 1E vs 3RD, wait, see array above!
  const m75 = findMatch('1F', '2C');
  const m76 = findMatch('1C', '2F');
  const m77 = findMatch('1I', '3RD'); // 1I vs 3RD
  const m78 = findMatch('2E', '2I');
  const m79 = findMatch('1A', '3RD');
  const m80 = findMatch('1L', '3RD');
  const m81 = findMatch('1D', '3RD');
  const m82 = findMatch('1G', '3RD');
  const m83 = findMatch('2K', '2L');
  const m84 = findMatch('1H', '2J');
  const m85 = findMatch('1B', '3RD');
  const m86 = findMatch('1J', '2H');
  const m87 = findMatch('1K', '3RD');
  const m88 = findMatch('2D', '2G');

  const leftR32 = [m74, m77, m73, m75, m83, m84, m81, m82];
  const rightR32 = [m76, m78, m79, m80, m86, m88, m85, m87];

  // Round of 16
  const m89 = findMatch('W74', 'W77');
  const m90 = findMatch('W73', 'W75');
  const m91 = findMatch('W76', 'W78');
  const m92 = findMatch('W79', 'W80');
  const m93 = findMatch('W83', 'W84');
  const m94 = findMatch('W81', 'W82');
  const m95 = findMatch('W86', 'W88');
  const m96 = findMatch('W85', 'W87');

  const leftR16 = [m89, m90, m93, m94];
  const rightR16 = [m91, m92, m95, m96];

  // Quarterfinals
  const m97 = findMatch('W89', 'W90');
  const m98 = findMatch('W93', 'W94');
  const m99 = findMatch('W91', 'W92');
  const m100 = findMatch('W95', 'W96');

  const leftQF = [m97, m98];
  const rightQF = [m99, m100];

  // Semifinals
  const m101 = findMatch('W97', 'W98');
  const m102 = findMatch('W99', 'W100');

  const leftSF = [m101];
  const rightSF = [m102];

  const final = findMatch('W101', 'W102');

  const tournamentTeams = TEAMS.filter((t: any) => t.group !== 'Knockout');

  return (
    <div className="mt-12 mb-8 bg-gray-900 border border-white/10 p-4 sm:p-8 rounded-3xl shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      {/* Background Flags */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.05] flex flex-wrap gap-6 items-center justify-center p-8 mix-blend-screen">
        {[...tournamentTeams, ...tournamentTeams, ...tournamentTeams].map((t, i) => (
          <img key={`bg-${i}`} src={t.logoUrl} className="w-16 h-16 md:w-24 md:h-24 grayscale object-contain" />
        ))}
      </div>

      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-3xl sm:text-5xl font-black italic tracking-tighter uppercase whitespace-nowrap">Playoff <span className="text-yellow-400">Bracket</span></h2>
        <div className="h-1 flex-1 bg-white/10 hidden sm:block"></div>
      </div>
      
      <p className="text-sm opacity-80 mb-2 max-w-3xl">
        This interactive bracket projects the path to the final. As Group Stage matches conclude, the <strong className="text-yellow-400">Round of 32</strong> fills out dynamically.
      </p>

      <div className="block lg:hidden text-xs text-indigo-400 font-bold mb-6 flex items-center gap-2 bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/20">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
        <span>For the best viewing experience, please rotate your device horizontally.</span>
      </div>

      {/* Styled scrollbar container */}
      <div className="overflow-x-auto pb-12 w-full scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="min-w-[1240px] flex justify-between h-[800px] relative font-sans">

          {/* Center visual divider */}
          <div className="absolute inset-x-0 w-full top-0 bottom-0 pointer-events-none flex justify-center items-center">
             <div className="h-full border-r border-dashed border-white/5"></div>
          </div>

          {/* LEFT SIDE */}
          <div className="flex shrink-0 gap-4 md:gap-8 z-10">
            <RoundColumn matches={leftR32} />
            <RoundColumn matches={leftR16} />
            <RoundColumn matches={leftQF} />
            <RoundColumn matches={leftSF} />
          </div>

          {/* CENTER FINAL */}
          <div className="flex flex-col justify-center items-center shrink-0 w-48 z-10 relative px-4 text-center">
             <div className="bg-gradient-to-r from-yellow-500 to-yellow-300 text-black px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded mb-4 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
               World Final
             </div>
             <MatchNode match={final} className="border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.15)] scale-110 shadow-yellow-500/20" />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex shrink-0 flex-row-reverse gap-4 md:gap-8 z-10">
            <RoundColumn matches={rightR32} isRightSide />
            <RoundColumn matches={rightR16} isRightSide />
            <RoundColumn matches={rightQF} isRightSide />
            <RoundColumn matches={rightSF} isRightSide />
          </div>

        </div>
      </div>
    </div>
  );
}
