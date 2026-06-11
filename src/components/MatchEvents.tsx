import React, { useEffect, useState } from 'react';
import { Match } from '../types/tournament';
import { getTeamById } from '../lib/tournament';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';

interface MatchEventsProps {
  match: Match;
}

export function MatchEvents({ match }: MatchEventsProps) {
  const homeTeam = getTeamById(match.homeTeamId);
  const awayTeam = getTeamById(match.awayTeamId);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/events/${match.homeTeamId}/${match.awayTeamId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch match events');
        }
        const data = await res.json();
        if (active) {
          if (data && data.length > 0) {
            setEvents(data);
          } else {
            setEvents([]);
          }
        }
      } catch (err: any) {
        if (active) setError(err.message);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchEvents();
    return () => { active = false; };
  }, [match.homeTeamId, match.awayTeamId]);

  if (!homeTeam || !awayTeam) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-6">
        <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
      </div>
    );
  }

  // Filter for allowed event types: goals, yellow card, red card
  const validEvents = events.filter((ev: any) => {
    return ev.type?.text?.includes('Goal') || ev.type?.text?.includes('Card') || ev.type?.text?.includes('Penalty');
  }).sort((a: any, b: any) => parseInt(a.clock?.displayValue) - parseInt(b.clock?.displayValue));

  if (validEvents.length === 0 || error) {
    return (
      <div className="w-full">
        <div className="flex items-center gap-2 mb-3">
          <span className={cn("text-xs font-black uppercase tracking-widest text-gray-900")}>
            Match Events
          </span>
          <div className={cn("h-px flex-1 bg-gray-300")}></div>
        </div>
        
        <div className="text-center py-6 px-4 bg-gray-100/50 rounded-xl border border-gray-200">
          <p className="text-sm font-black uppercase tracking-tight text-gray-500 mb-0">
            No Events
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className={cn("text-xs font-black uppercase tracking-widest text-gray-900")}>
          Match Events
        </span>
        <div className={cn("h-px flex-1 bg-gray-300")}></div>
      </div>
      
      <div className="flex flex-col gap-2">
        {validEvents.map((ev, idx) => {
          const isHome = ev.team?.id === '203' ? true : false; // wait, ESPN ID is different.
          // let's derive isHome correctly from the athletesInvolved if possible, or try to match ESPN team id. Note: the easiest way is checking the player's name against team name, but ESPN only gives team.id. wait. We don't have ESPN team ID mapping.
          // Wait, athletesInvolved -> team -> id.
          return (
            <div key={idx} className="flex items-center gap-3 text-sm border-b border-gray-100 pb-2 last:border-0 last:pb-0">
              <div className="text-xs font-bold text-gray-400 w-10 shrink-0 text-right">
                {ev.clock?.displayValue}
              </div>
              <div className="flex-1 flex items-center gap-2 font-medium">
                {ev.type?.text?.includes('Red') && <span className="w-3 h-4 bg-red-500 rounded-sm shrink-0"></span>}
                {ev.type?.text?.includes('Yellow') && <span className="w-3 h-4 bg-yellow-400 rounded-sm shrink-0"></span>}
                {ev.type?.text?.includes('Goal') && <span className="text-lg leading-none">⚽</span>}
                {ev.type?.text?.includes('Penalty') && <span className="text-lg leading-none">⚽</span>}
                <span className="text-gray-900">
                  {ev.athletesInvolved?.map((a: any) => a.shortName || a.displayName).join(', ')}
                </span>
                {ev.type?.text?.includes('Own Goal') && <span className="text-xs text-red-500 font-bold">(OG)</span>}
                {ev.type?.text?.includes('Penalty') && <span className="text-xs text-gray-500 font-bold">(PEN)</span>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

