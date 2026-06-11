import React, { useEffect, useState } from 'react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

interface PlayerStat {
  id: string;
  name: string;
  headshotUrl: string;
  teamName: string;
  teamLogoUrl: string;
  goals: number;
  assists: number;
  matches: number;
  rank: number;
}

export function PlayerLeaderboard() {
  const [activeTab, setActiveTab] = useState<'goals' | 'assists'>('goals');
  const [goalsLeaders, setGoalsLeaders] = useState<PlayerStat[]>([]);
  const [assistsLeaders, setAssistsLeaders] = useState<PlayerStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    
    async function fetchStats() {
      try {
        const res = await fetch('/api/leaderboard');
        const data = await res.json();
        
        if (!mounted) return;

        if (data && (data.goalsLeaders?.length > 0 || data.assistsLeaders?.length > 0)) {
            setGoalsLeaders(data.goalsLeaders || []);
            setAssistsLeaders(data.assistsLeaders || []);
            setIsLoading(false);
            return;
        }
        
        // No data yet (tournament hasn't started)
        // Set some dummy visual data while waiting for real goals
        setGoalsLeaders([
          { id: '1', name: 'K. Mbappé', headshotUrl: 'https://ui-avatars.com/api/?name=K+Mbappe&background=000&color=fff', teamName: 'France', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/fra.png', goals: 0, assists: 0, matches: 0, rank: 1 },
          { id: '2', name: 'L. Messi', headshotUrl: 'https://ui-avatars.com/api/?name=L+Messi&background=000&color=fff', teamName: 'Argentina', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/arg.png', goals: 0, assists: 0, matches: 0, rank: 2 },
          { id: '3', name: 'C. Pulisic', headshotUrl: 'https://ui-avatars.com/api/?name=C+Pulisic&background=000&color=fff', teamName: 'United States', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/usa.png', goals: 0, assists: 0, matches: 0, rank: 3 },
          { id: '4', name: 'A. Davies', headshotUrl: 'https://ui-avatars.com/api/?name=A+Davies&background=000&color=fff', teamName: 'Canada', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/can.png', goals: 0, assists: 0, matches: 0, rank: 4 },
          { id: '5', name: 'Vini Jr.', headshotUrl: 'https://ui-avatars.com/api/?name=Vini+Jr&background=000&color=fff', teamName: 'Brazil', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/bra.png', goals: 0, assists: 0, matches: 0, rank: 5 },
        ]);
        setAssistsLeaders([
          { id: '1', name: 'K. De Bruyne', headshotUrl: 'https://ui-avatars.com/api/?name=K+De+Bruyne&background=000&color=fff', teamName: 'Belgium', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/bel.png', goals: 0, assists: 0, matches: 0, rank: 1 },
          { id: '2', name: 'Neymar Jr', headshotUrl: 'https://ui-avatars.com/api/?name=Neymar+Jr&background=000&color=fff', teamName: 'Brazil', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/bra.png', goals: 0, assists: 0, matches: 0, rank: 2 },
          { id: '3', name: 'P. Foden', headshotUrl: 'https://ui-avatars.com/api/?name=P+Foden&background=000&color=fff', teamName: 'England', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/eng.png', goals: 0, assists: 0, matches: 0, rank: 3 },
          { id: '4', name: 'B. Fernandes', headshotUrl: 'https://ui-avatars.com/api/?name=B+Fernandes&background=000&color=fff', teamName: 'Portugal', teamLogoUrl: 'https://a.espncdn.com/i/teamlogos/countries/500/por.png', goals: 0, assists: 0, matches: 0, rank: 4 },
        ]);

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch player stats", err);
        if (mounted) setIsLoading(false);
      }
    }

    fetchStats();
    
    // Refresh every 2 minutes
    const interval = setInterval(fetchStats, 120000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const data = activeTab === 'goals' ? goalsLeaders : assistsLeaders;

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl overflow-hidden mt-8 shadow-xl flex flex-col">
      <div className="p-4 sm:p-6 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-black italic tracking-tighter uppercase">Player Stats</h2>
          <span className="bg-red-500 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm animate-pulse">Live</span>
        </div>
        
        <div className="flex bg-gray-800 rounded-lg p-1 border border-white/10 w-fit">
          <button
            onClick={() => setActiveTab('goals')}
            className={cn(
              "px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md transition-colors",
              activeTab === 'goals' ? "bg-yellow-400 text-black shadow-sm" : "text-gray-400 hover:text-white"
            )}
          >
            Goals
          </button>
          <button
            onClick={() => setActiveTab('assists')}
            className={cn(
              "px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-md transition-colors",
              activeTab === 'assists' ? "bg-yellow-400 text-black shadow-sm" : "text-gray-400 hover:text-white"
            )}
          >
            Assists
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {isLoading ? (
          <div className="animate-pulse flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl"></div>
            ))}
          </div>
        ) : data.length === 0 ? (
          <div className="text-center p-8 opacity-50">
            <span className="text-xs uppercase font-bold tracking-widest block mb-2">Awaiting Match Data</span>
            <span className="text-sm">Leaderboards will update once matches begin.</span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 relative">
            <AnimatePresence mode="popLayout">
              {data.map((player) => (
                <motion.div
                  key={player.id}
                  layoutId={player.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-800 border border-white/5 rounded-xl p-3 flex items-center gap-4 hover:bg-gray-750 transition-colors group"
                >
                  <div className="w-8 text-center shrink-0">
                    <span className={cn(
                      "text-xl font-black italic",
                      player.rank === 1 ? "text-yellow-400" :
                      player.rank === 2 ? "text-gray-300" :
                      player.rank === 3 ? "text-amber-600" : "text-gray-500"
                    )}>{player.rank}</span>
                  </div>
                  
                  <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden bg-black/30 border border-white/10 p-0.5">
                    <img src={player.headshotUrl} alt={player.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <span className="font-bold text-base sm:text-lg truncate group-hover:text-yellow-400 transition-colors uppercase tracking-tight">{player.name}</span>
                    <div className="flex items-center gap-1.5 text-xs opacity-70">
                      {player.teamLogoUrl && (
                        <img src={player.teamLogoUrl} alt={player.teamName} className="w-3 h-3 object-contain" />
                      )}
                      <span className="truncate">{player.teamName}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-right pr-2">
                    <div className="flex flex-col items-center">
                      <span className="font-black text-2xl leading-none">
                        {activeTab === 'goals' ? player.goals : player.assists}
                      </span>
                      <span className="text-[9px] uppercase font-bold tracking-widest text-gray-500 mt-1">
                        {activeTab === 'goals' ? 'Gls' : 'Ast'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
