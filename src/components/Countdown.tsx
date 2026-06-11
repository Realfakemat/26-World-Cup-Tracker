import React, { useEffect, useState } from 'react';
import { FIXTURES, TEAMS } from '../data/tournamentData';

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);
  const [nextMatch, setNextMatch] = useState<any>(null);

  useEffect(() => {
    // Find the next upcoming match
    const upcomingMatches = FIXTURES
      .filter(m => m.status === 'upcoming')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    if (upcomingMatches.length === 0) return;
    const match = upcomingMatches[0];
    setNextMatch(match);

    const updateTimer = () => {
      const target = new Date(match.date).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };

    updateTimer(); // Initial call
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!nextMatch || !timeLeft) return null;

  const homeTeam = TEAMS.find(t => t.id === nextMatch.homeTeamId);
  const awayTeam = TEAMS.find(t => t.id === nextMatch.awayTeamId);

  return (
    <div className="bg-[#1f2937] text-white px-6 py-4 rounded-xl flex flex-col md:flex-row items-center gap-6 shadow-xl mb-8 border border-white/10">
      <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1">
        <span className="text-xs font-bold uppercase tracking-widest opacity-60 text-yellow-400 mb-1">
          Next Match Countdown
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {homeTeam?.logoUrl ? (
              <img src={homeTeam.logoUrl} alt="logo" className="w-6 h-6 object-contain" />
            ) : (
              <img src={`https://hatscripts.github.io/circle-flags/flags/${homeTeam?.flagCode}.svg`} alt="flag" className="w-6 h-6 object-cover rounded-full" />
            )}
            <span className="font-black text-xl tracking-tight">{homeTeam?.name || nextMatch.homeTeamId}</span>
          </div>
          <span className="text-sm font-bold opacity-50 px-2">VS</span>
          <div className="flex items-center gap-2">
            {awayTeam?.logoUrl ? (
              <img src={awayTeam.logoUrl} alt="logo" className="w-6 h-6 object-contain" />
            ) : (
              <img src={`https://hatscripts.github.io/circle-flags/flags/${awayTeam?.flagCode}.svg`} alt="flag" className="w-6 h-6 object-cover rounded-full" />
            )}
            <span className="font-black text-xl tracking-tight">{awayTeam?.name || nextMatch.awayTeamId}</span>
          </div>
        </div>
        <div className="text-xs opacity-50 mt-1 font-mono uppercase">
          {new Date(nextMatch.date).toLocaleString(undefined, {
             weekday: 'short', month: 'short', day: 'numeric',
             hour: 'numeric', minute: '2-digit'
          })} 
          {nextMatch.venue && ` • ${nextMatch.venue}`}
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 font-mono font-black text-3xl sm:text-4xl">
        <div className="flex flex-col items-center bg-black/30 p-2 rounded-lg min-w-[4rem]">
          <span>{timeLeft.days.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans tracking-wide text-gray-400">Days</span>
        </div>
        <span className="text-xl mb-4 text-white/30 animate-pulse">:</span>
        <div className="flex flex-col items-center bg-black/30 p-2 rounded-lg min-w-[4rem]">
          <span>{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans tracking-wide text-gray-400">Hours</span>
        </div>
        <span className="text-xl mb-4 text-white/30 animate-pulse">:</span>
        <div className="flex flex-col items-center bg-black/30 p-2 rounded-lg min-w-[4rem]">
          <span>{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans tracking-wide text-gray-400">Mins</span>
        </div>
        <span className="text-xl mb-4 text-white/30 animate-pulse">:</span>
        <div className="flex flex-col items-center bg-black/30 p-2 rounded-lg min-w-[4rem] text-yellow-400">
          <span>{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans tracking-wide text-yellow-400/80">Secs</span>
        </div>
      </div>
    </div>
  );
}
