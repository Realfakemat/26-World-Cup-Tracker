import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Match } from '../types/tournament';
import { getTeamById } from '../lib/tournament';
import { generateScenarios } from '../lib/scenarios';
import { format, parseISO } from 'date-fns';
import { cn } from '../lib/utils';
import { GroupTable } from './GroupTable';
import { MatchEvents } from './MatchEvents';

interface MatchCardProps {
  key?: React.Key;
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  
  const [expanded, setExpanded] = React.useState(false);

  if (!homeTeam || !awayTeam) return null;

  const scenarios = generateScenarios(match);
  const parsedDate = parseISO(match.date);

  return (
    <div className={cn(
      "p-5 shadow-lg flex flex-col justify-between transition-all relative bg-white text-black rounded-2xl border border-white/20 hover:border-gray-300"
    )}>

      <div className="flex justify-between items-center mb-4">
        <span className={cn(
          "text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shrink-0 bg-gray-200 text-black"
        )}>
          Grp {match.group} • MD {match.matchday}
        </span>
        <span className={cn(
          "text-[10px] font-bold uppercase tracking-widest text-right shrink-0 opacity-60 text-black"
        )}>
          {format(parsedDate, 'MMM d • HH:mm')}
          {match.status === 'live' && <span className="text-red-500 animate-pulse ml-1">LIVE</span>}
          {match.status === 'final' && <span className="ml-1">FT</span>}
        </span>
      </div>

      <div className="flex justify-around items-center mb-6">
        <div className="text-center flex-1">
          <div className={cn("w-12 h-12 rounded-full mb-2 mx-auto flex items-center justify-center p-1 border bg-gray-100 border-gray-200")}>
            {homeTeam.logoUrl ? (
              <img src={homeTeam.logoUrl} alt="logo" className="w-full h-full object-contain" />
            ) : (
              <img src={`https://hatscripts.github.io/circle-flags/flags/${homeTeam.flagCode}.svg`} alt="flag" className="w-full h-full object-cover rounded-full" />
            )}
          </div>
          <div className="font-black text-lg sm:text-xl uppercase tracking-tighter">
            {homeTeam.name}
          </div>
          {(match.status === 'final' || match.status === 'live') && (
            <div className="font-black text-2xl mt-1">{match.homeScore}</div>
          )}
        </div>
        <div className={cn("text-2xl sm:text-4xl font-black italic opacity-20")}>
          VS
        </div>
        <div className="text-center flex-1">
          <div className={cn("w-12 h-12 rounded-full mb-2 mx-auto flex items-center justify-center p-1 border bg-gray-100 border-gray-200")}>
            {awayTeam.logoUrl ? (
              <img src={awayTeam.logoUrl} alt="logo" className="w-full h-full object-contain" />
            ) : (
              <img src={`https://hatscripts.github.io/circle-flags/flags/${awayTeam.flagCode}.svg`} alt="flag" className="w-full h-full object-cover rounded-full" />
            )}
          </div>
          <div className="font-black text-lg sm:text-xl uppercase tracking-tighter">
            {awayTeam.name}
          </div>
          {(match.status === 'final' || match.status === 'live') && (
            <div className="font-black text-2xl mt-1">{match.awayScore}</div>
          )}
        </div>
      </div>

      <button 
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "w-full py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-colors border bg-gray-900 text-white border-transparent hover:bg-indigo-600",
          match.status !== 'final' ? 'mt-0' : 'mt-4'
        )}
      >
        {expanded ? 'Hide Details' : 'View Details'}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={cn(
              "mt-4 rounded-xl p-4 border bg-gray-50 border-gray-200 text-black flex flex-col gap-6"
            )}>
              {(match.status === 'final' || match.status === 'live') && (
                <MatchEvents match={match} />
              )}
              
              {match.status !== 'final' && (
                <>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className={cn("text-xs font-black uppercase tracking-widest text-gray-900")}>
                        Scenario Matrix
                      </span>
                      <div className={cn("h-px flex-1 bg-gray-300")}></div>
                    </div>
                    <ul className="text-[11px] font-bold space-y-3 uppercase leading-tight">
                      <li className="flex gap-2">
                        <span className="text-green-500 shrink-0">• WIN:</span> 
                        <span className={cn("text-gray-600")}>{scenarios.homeWin}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-yellow-500 shrink-0">• DRAW:</span> 
                        <span className={cn("text-gray-600")}>{scenarios.draw}</span>
                      </li>
                      <li className="flex gap-2">
                        <span className="text-blue-500 shrink-0">• LOSS:</span> 
                        <span className={cn("text-gray-600")}>{scenarios.awayWin}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-dashed border-gray-300/30">
                    <h4 className={cn("text-[10px] font-black uppercase tracking-widest mb-2 text-gray-500")}>Group {match.group} Standings</h4>
                    <div className={cn("rounded-lg overflow-hidden border border-gray-200")}>
                      <GroupTable groupId={match.group} compact isDarkCard={false} />
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
