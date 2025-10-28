import React from 'react';
import { Crown } from 'lucide-react';

export default function CasinoHeader({ balance }) {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-zinc-900/80 via-zinc-800/80 to-zinc-900/80 backdrop-blur rounded-b-2xl border-b border-white/10 shadow-xl">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-300">
          <Crown size={22} />
        </div>
        <div>
          <p className="text-sm text-zinc-400">Live Table</p>
          <h1 className="text-xl font-semibold text-white tracking-wide">Dragon • Tiger</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-4 py-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 shadow-inner">
          <span className="text-sm">Balance</span>
          <span className="ml-2 font-semibold">${balance.toLocaleString()}</span>
        </div>
      </div>
    </header>
  );
}
