import React from 'react';

export function Header() {
  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-8 py-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 border-b-4 border-yellow-400 gap-4">
      <div className="flex flex-col">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter leading-none uppercase">
          Die Hard's
          <span className="block text-yellow-300">World Cup 2026</span>
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest mt-1 opacity-80">Tournament Tracker</p>
      </div>
    </header>
  );
}
