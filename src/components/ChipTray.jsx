import React from 'react';

const CHIPS = [1, 5, 25, 50, 100, 500];

export default function ChipTray({ selectedChip, setSelectedChip, disabled }) {
  return (
    <div className="w-full mt-6 px-4">
      <div className="mx-auto max-w-xl grid grid-cols-6 gap-3">
        {CHIPS.map((chip) => {
          const isActive = selectedChip === chip;
          return (
            <button
              key={chip}
              disabled={disabled}
              onClick={() => setSelectedChip(chip)}
              className={`relative aspect-square rounded-full flex items-center justify-center text-white font-semibold shadow-lg transition-all duration-200 border ${
                isActive
                  ? 'scale-105 border-white/80 ring-2 ring-white/50'
                  : 'hover:scale-105 border-white/20'
              } ${
                chip <= 5
                  ? 'bg-zinc-800'
                  : chip <= 25
                  ? 'bg-blue-700'
                  : chip <= 50
                  ? 'bg-emerald-700'
                  : chip <= 100
                  ? 'bg-amber-700'
                  : 'bg-rose-700'
              }`}
            >
              <span className="text-xs opacity-80 absolute top-1">$</span>
              <span className="text-lg">{chip}</span>
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-zinc-400 mt-2">Select a chip and tap a bet area to place your wager</p>
    </div>
  );
}
