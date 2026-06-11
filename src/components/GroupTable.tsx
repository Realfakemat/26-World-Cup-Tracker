import React from 'react';
import { GroupId } from '../types/tournament';
import { computeGroupStandings, getTeamById } from '../lib/tournament';
import { cn } from '../lib/utils';

interface GroupTableProps {
  groupId: GroupId;
  compact?: boolean;
  isDarkCard?: boolean;
}

export function GroupTable({ groupId, compact = false, isDarkCard = false }: GroupTableProps) {
  const standings = computeGroupStandings(groupId);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs text-left">
        <thead className={cn(
          "uppercase tracking-widest font-black text-[10px]",
          isDarkCard ? "bg-black/40 text-gray-300" : "bg-gray-100 text-gray-500"
        )}>
          <tr>
            <th className="px-2 py-2">#</th>
            <th className="px-2 py-2">Team</th>
            {!compact && <th className="px-2 py-2 text-center">P</th>}
            {!compact && <th className="px-2 py-2 text-center">W</th>}
            {!compact && <th className="px-2 py-2 text-center">D</th>}
            {!compact && <th className="px-2 py-2 text-center">L</th>}
            <th className="px-2 py-2 text-center">GD</th>
            <th className={cn("px-2 py-2 text-center", isDarkCard ? "text-white" : "text-black")}>Pts</th>
          </tr>
        </thead>
        <tbody className={cn(
          "divide-y font-bold uppercase",
          isDarkCard ? "divide-white/10 bg-black/20 text-white" : "divide-gray-200 bg-white text-gray-800"
        )}>
          {standings.map((s) => {
            const team = getTeamById(s.teamId);
            if (!team) return null;

            return (
              <tr key={s.teamId} className={cn(
                s.rank <= 2 ? (isDarkCard ? "border-l-2 border-l-yellow-400" : "border-l-2 border-l-blue-600") : "",
                s.rank === 3 ? "border-l-2 border-dashed border-l-gray-400" : ""
              )}>
                <td className={cn("px-2 py-2 opacity-60")}>{s.rank}</td>
                <td className="px-2 py-2 flex items-center gap-2">
                  {team.logoUrl ? (
                    <img src={team.logoUrl} alt="logo" className="w-4 h-4 object-contain" />
                  ) : (
                    <img src={`https://hatscripts.github.io/circle-flags/flags/${team.flagCode}.svg`} alt="flag" className="w-4 h-4 object-cover rounded-full" />
                  )}
                  <span>
                    {team.name}
                  </span>
                </td>
                {!compact && <td className="px-2 py-2 text-center opacity-70">{s.played}</td>}
                {!compact && <td className="px-2 py-2 text-center opacity-70">{s.won}</td>}
                {!compact && <td className="px-2 py-2 text-center opacity-70">{s.drawn}</td>}
                {!compact && <td className="px-2 py-2 text-center opacity-70">{s.lost}</td>}
                <td className="px-2 py-2 text-center opacity-70">
                  {s.goalDifference > 0 ? `+${s.goalDifference}` : s.goalDifference}
                </td>
                <td className={cn("px-2 py-2 text-center font-black", isDarkCard ? "text-white" : "text-black")}>{s.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

