import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { WeeklyCalendar } from './components/WeeklyCalendar';
import { ThirdPlaceRace } from './components/ThirdPlaceRace';
import { PlayerLeaderboard } from './components/PlayerLeaderboard';
import { Countdown } from './components/Countdown';
import { KnockoutBracket } from './components/KnockoutBracket';
import { motion } from 'motion/react';
import { FIXTURES } from './data/tournamentData';

export default function App() {
  const [, setTick] = useState(0);

  useEffect(() => {
    let mounted = true;
    const fetchLiveFixtures = async () => {
      try {
        const res = await fetch('/api/fixtures/live');
        const data = await res.json();
        if (!mounted || !data || data.length === 0) return;
        
        let changed = false;
        data.forEach((liveMatch: any) => {
          let matchObj;
          if (liveMatch.id) {
            matchObj = FIXTURES.find(f => f.id === liveMatch.id);
          } else if (liveMatch.homeTeamId && liveMatch.awayTeamId) {
            matchObj = FIXTURES.find(f => f.homeTeamId === liveMatch.homeTeamId && f.awayTeamId === liveMatch.awayTeamId);
          }

          if (matchObj) {
            if (
              matchObj.homeScore !== liveMatch.homeScore || 
              matchObj.awayScore !== liveMatch.awayScore || 
              matchObj.status !== liveMatch.status ||
              matchObj.minute !== liveMatch.minute
            ) {
              matchObj.homeScore = liveMatch.homeScore;
              matchObj.awayScore = liveMatch.awayScore;
              matchObj.status = liveMatch.status;
              matchObj.minute = liveMatch.minute;
              changed = true;
            }
          }
        });
        
        if (changed) {
          setTick(t => t + 1); // trigger re-render
        }
      } catch (err) {
        console.error(err);
      }
    };
    
    fetchLiveFixtures();
    const interval = setInterval(fetchLiveFixtures, 30000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] font-sans text-white flex flex-col selection:bg-yellow-400 selection:text-black">
      <Header />
      
      <main className="flex-1 w-full flex flex-col h-full">
        {/* Mobile Layout */}
        <div className="flex xl:hidden flex-col w-full overflow-x-hidden bg-gray-800 p-4 sm:p-6 gap-6 pb-16 min-h-screen">
          <Countdown />
          
          <div className="mt-4">
            <div className="flex items-baseline gap-4 mb-4">
              <h2 className="text-3xl font-black italic tracking-tighter uppercase truncate">Current Week</h2>
              <div className="h-1 flex-1 bg-white/10 hidden sm:block"></div>
            </div>
            <WeeklyCalendar />
          </div>

          <PlayerLeaderboard />
          <ThirdPlaceRace />
          <KnockoutBracket />
        </div>

        {/* Desktop Layout */}
        <div className="hidden xl:flex flex-row w-full h-full">
          <aside className="w-3/12 bg-gray-900 border-r border-white/10 flex flex-col p-6 sticky top-0 h-screen overflow-y-auto">
              <ThirdPlaceRace />
              <PlayerLeaderboard />
              <div className="mt-8 bg-yellow-400 text-black p-4 rounded-xl flex items-center gap-3">
                <div className="text-2xl">ℹ️</div>
                <p className="text-[10px] font-bold uppercase leading-tight">Tap any match to see live Group Standings.</p>
              </div>
          </aside>

          <div className="w-9/12 bg-gray-800 p-8 flex flex-col">
            <Countdown />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-baseline gap-4 mb-2"
            >
              <h2 className="text-5xl font-black italic tracking-tighter uppercase">Current Week</h2>
              <div className="h-1 flex-1 bg-white/10"></div>
            </motion.div>
            
            <WeeklyCalendar />

            <KnockoutBracket />
          </div>
        </div>
      </main>
    </div>
  );
}

