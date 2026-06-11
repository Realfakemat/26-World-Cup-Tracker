import React, { useMemo, useState } from 'react';
import { MatchCard } from './MatchCard';
import { FIXTURES } from '../data/tournamentData';
import { format, parseISO, addDays, startOfDay, isSameDay } from 'date-fns';
import { cn } from '../lib/utils';
import { GroupId } from '../types/tournament';

export function WeeklyCalendar() {
  const initialDate = new Date('2026-06-11T00:00:00Z');
  const [currentWeekStart, setCurrentWeekStart] = useState(initialDate);
  const [groupFilter, setGroupFilter] = useState<GroupId | 'ALL'>('ALL');

  const daysInWeek = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));
  }, [currentWeekStart]);

  const nextWeek = () => setCurrentWeekStart(prev => addDays(prev, 7));
  const prevWeek = () => setCurrentWeekStart(prev => addDays(prev, -7));

  const allGroups: GroupId[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

  return (
    <div className="w-full flex-1 flex flex-col">
      {/* Week Navigation & Filters */}
      <div className="bg-gray-900 border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 mb-6 shadow-xl sticky top-4 z-40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex bg-black/30 p-1 rounded-full border border-white/20 self-start sm:self-auto overflow-x-auto max-w-full hide-scrollbar">
            <button 
              onClick={prevWeek}
              className="px-4 py-1 text-xs font-bold uppercase hover:bg-white/10 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              Prev Week
            </button>
            <div className="px-6 py-2 text-sm font-black uppercase bg-yellow-400 text-black rounded-full shadow-lg whitespace-nowrap shrink-0">
              {format(currentWeekStart, 'MMM d')} - {format(daysInWeek[6], 'MMM d')}
            </div>
            <button 
              onClick={nextWeek}
              className="px-4 py-1 text-xs font-bold uppercase hover:bg-white/10 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              Next Week
            </button>
          </div>

          <div className="flex flex-col sm:items-end w-full sm:w-auto">
            <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.2em] mb-1">Group Filters</span>
            <div className="flex gap-1 overflow-x-auto max-w-full hide-scrollbar pb-1">
              <button 
                onClick={() => setGroupFilter('ALL')}
                className={cn(
                  "px-3 py-1 border border-white/20 rounded font-black text-xs min-w-[40px] text-center transition-colors shrink-0",
                  groupFilter === 'ALL' ? "bg-yellow-400 text-black" : "hover:bg-white hover:text-black text-white"
                )}
              >ALL</button>
              {allGroups.map(g => (
                <button
                  key={g}
                  onClick={() => setGroupFilter(g)}
                  className={cn(
                    "px-3 py-1 border border-white/20 rounded font-black text-xs min-w-[32px] text-center transition-colors shrink-0",
                    groupFilter === g ? "bg-yellow-400 text-black" : "hover:bg-white hover:text-black text-white"
                  )}
                >{g}</button>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative content-start pb-8 min-h-[50vh]">
        {daysInWeek.map((day) => {
          const dayMatches = FIXTURES.filter(m => {
            const mDate = startOfDay(parseISO(m.date));
            return isSameDay(mDate, day) && (groupFilter === 'ALL' || m.group === groupFilter);
          });

          if (dayMatches.length === 0) return null;

          return (
            <React.Fragment key={day.toISOString()}>
              <div className="col-span-full border-b border-white/10 pb-2 mt-4 first:mt-0">
                 <h3 className="text-xl font-black uppercase tracking-widest text-yellow-500">
                    {format(day, 'EEEE')} <span className="text-white opacity-40 ml-2">{format(day, 'MMM d')}</span>
                 </h3>
              </div>
              {dayMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
