import React from 'react';

export default function ControlPanel({ onDeal, onClear, onRebet, totalBet, canDeal, canRebet, dealing }) {
  return (
    <div className="w-full mt-6 px-4 flex items-center justify-center gap-4">
      <button
        onClick={onClear}
        disabled={dealing || totalBet === 0}
        className="px-4 py-2 rounded-lg bg-zinc-800/80 border border-white/10 text-zinc-300 hover:bg-zinc-700/80 disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        Clear
      </button>

      <button
        onClick={onRebet}
        disabled={!canRebet || dealing}
        className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-400/30 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-lg"
      >
        Rebet
      </button>

      <button
        onClick={onDeal}
        disabled={!canDeal || dealing}
        className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border border-emerald-400/40 disabled:opacity-40 disabled:cursor-not-allowed transition shadow-xl"
      >
        {dealing ? 'Dealing…' : totalBet > 0 ? `Deal ($${totalBet})` : 'Place a Bet'}
      </button>
    </div>
  );
}
