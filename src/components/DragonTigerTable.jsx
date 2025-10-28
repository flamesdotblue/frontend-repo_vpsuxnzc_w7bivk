import React from 'react';

const SUITS = {
  spades: '♠',
  hearts: '♥',
  clubs: '♣',
  diamonds: '♦',
};

function PlayingCard({ card, revealed }) {
  const suitColor = card?.suit === 'hearts' || card?.suit === 'diamonds' ? 'text-rose-400' : 'text-zinc-100';
  return (
    <div className={`w-28 h-40 rounded-xl border border-white/20 bg-white/10 backdrop-blur flex items-center justify-center shadow-2xl transition-transform duration-500 [transform-style:preserve-3d] ${
      revealed ? 'rotate-y-0' : 'rotate-y-180'
    }`}
      style={{ perspective: '1000px' }}
    >
      {revealed ? (
        <div className="flex flex-col items-center justify-center gap-1">
          <span className={`text-3xl font-semibold ${suitColor}`}>{card.rankLabel}</span>
          <span className={`text-2xl ${suitColor}`}>{SUITS[card.suit]}</span>
        </div>
      ) : (
        <div className="w-full h-full rounded-xl bg-gradient-to-br from-indigo-600 via-purple-700 to-rose-700 border border-white/10" />
      )}
    </div>
  );
}

export default function DragonTigerTable({ bets, onPlaceBet, selectedChip, cards, revealed, lastOutcome }) {
  const betPill = (amount) => (
    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-sm shadow">
      ${amount}
    </div>
  );

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-6 px-4">
      {/* Felt background */}
      <div className="relative rounded-3xl p-6 md:p-8 bg-gradient-to-br from-emerald-900/80 via-teal-900/80 to-emerald-900/80 border border-emerald-300/20 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #3b82f6 0, transparent 40%), radial-gradient(circle at 80% 0%, #f59e0b 0, transparent 40%), radial-gradient(circle at 40% 100%, #10b981 0, transparent 40%)' }} />

        {/* Titles */}
        <div className="grid grid-cols-3 gap-4 items-center">
          <div className="text-center">
            <h3 className="text-emerald-300/90 font-semibold tracking-wider">DRAGON</h3>
          </div>
          <div className="text-center">
            <h3 className="text-amber-300/90 font-semibold tracking-wider">TIE 11:1</h3>
          </div>
          <div className="text-center">
            <h3 className="text-rose-300/90 font-semibold tracking-wider">TIGER</h3>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-4 items-center mt-4">
          <div className="flex justify-center">
            <PlayingCard card={cards.dragon} revealed={revealed} />
          </div>
          <div className="flex justify-center">
            <PlayingCard card={cards.tiger} revealed={revealed} />
          </div>
          <div className="flex justify-center">
            <PlayingCard card={cards.tiger} revealed={revealed} />
          </div>
        </div>

        {/* Bet Areas */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <button
            onClick={() => onPlaceBet('dragon')}
            className="relative rounded-2xl border-2 border-emerald-300/40 bg-emerald-700/20 hover:bg-emerald-600/20 transition p-8 text-emerald-200/90 font-semibold tracking-wider shadow-inner"
          >
            DRAGON {selectedChip ? <span className="opacity-70 text-xs">+${selectedChip}</span> : null}
            {bets.dragon > 0 && betPill(bets.dragon)}
          </button>

          <button
            onClick={() => onPlaceBet('tie')}
            className="relative rounded-2xl border-2 border-amber-300/40 bg-amber-700/20 hover:bg-amber-600/20 transition p-8 text-amber-200/90 font-semibold tracking-wider shadow-inner"
          >
            TIE 11:1 {selectedChip ? <span className="opacity-70 text-xs">+${selectedChip}</span> : null}
            {bets.tie > 0 && betPill(bets.tie)}
          </button>

          <button
            onClick={() => onPlaceBet('tiger')}
            className="relative rounded-2xl border-2 border-rose-300/40 bg-rose-700/20 hover:bg-rose-600/20 transition p-8 text-rose-200/90 font-semibold tracking-wider shadow-inner"
          >
            TIGER {selectedChip ? <span className="opacity-70 text-xs">+${selectedChip}</span> : null}
            {bets.tiger > 0 && betPill(bets.tiger)}
          </button>
        </div>

        {/* Suited Tie */}
        <div className="mt-4 flex items-center justify-center">
          <button
            onClick={() => onPlaceBet('suitedTie')}
            className="relative rounded-2xl border-2 border-cyan-300/40 bg-cyan-700/20 hover:bg-cyan-600/20 transition px-8 py-4 text-cyan-200/90 font-semibold tracking-wider shadow-inner"
          >
            SUITED TIE 50:1 {selectedChip ? <span className="opacity-70 text-xs">+${selectedChip}</span> : null}
            {bets.suitedTie > 0 && (
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-sm shadow">
                ${bets.suitedTie}
              </div>
            )}
          </button>
        </div>

        {/* Outcome Banner */}
        {lastOutcome && (
          <div className="mt-6 text-center">
            <span className={`inline-block px-4 py-2 rounded-full border text-white shadow-lg ${
              lastOutcome.includes('Dragon')
                ? 'bg-emerald-600/40 border-emerald-300/40'
                : lastOutcome.includes('Tiger')
                ? 'bg-rose-600/40 border-rose-300/40'
                : 'bg-amber-600/40 border-amber-300/40'
            }`}>
              {lastOutcome}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
