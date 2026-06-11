import React from 'react';
import { computeThirdPlaceRace, getTeamById } from '../lib/tournament';
import { cn } from '../lib/utils';

export function ThirdPlaceRace() {
  const thirdPlaceTeams = computeThirdPlaceRace();

  if (thirdPlaceTeams.length === 0) return null;

  return (
    <div className="flex flex-col">
      <h3 className="text-xs font-black uppercase text-gray-500 tracking-[0.2em] mb-4">3rd Place Race</h3>
      
      <div className="space-y-3">
        {thirdPlaceTeams.map((s, idx) => {
          const team = getTeamById(s.teamId);
          if (!team) return null;
          const isAdvancing = idx < 8;

          const borderColor = isAdvancing ? "border-green-500" : "border-red-500";
          const barColor = isAdvancing ? "bg-green-500" : "bg-red-500";
          
          return (
            <div key={s.teamId} className={cn("bg-black/40 p-3 rounded-lg border-l-4", borderColor)}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase truncate">{idx + 1}. {team.name}</span>
                </div>
                {isAdvancing ? (
                  <span className={cn("text-[10px] font-bold px-1 rounded bg-green-500 text-black")}>
                    {s.points} PTS
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-red-400 border border-red-500/50 px-1 rounded">CUT</span>
                )}
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden mt-2">
                 <div className={cn("h-full", barColor)} style={{ width: `${Math.min((s.points / 9) * 100, 100)}%` }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
