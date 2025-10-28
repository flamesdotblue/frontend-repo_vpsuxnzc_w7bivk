import React, { useMemo, useState } from 'react';
import CasinoHeader from './components/CasinoHeader';
import DragonTigerTable from './components/DragonTigerTable';
import ChipTray from './components/ChipTray';
import ControlPanel from './components/ControlPanel';

const RANKS = [
  { r: 2, label: '2', val: 2 },
  { r: 3, label: '3', val: 3 },
  { r: 4, label: '4', val: 4 },
  { r: 5, label: '5', val: 5 },
  { r: 6, label: '6', val: 6 },
  { r: 7, label: '7', val: 7 },
  { r: 8, label: '8', val: 8 },
  { r: 9, label: '9', val: 9 },
  { r: 10, label: '10', val: 10 },
  { r: 11, label: 'J', val: 11 },
  { r: 12, label: 'Q', val: 12 },
  { r: 13, label: 'K', val: 13 },
  { r: 14, label: 'A', val: 14 },
];
const SUITS = ['spades', 'hearts', 'clubs', 'diamonds'];

function buildDeck() {
  const deck = [];
  for (const s of SUITS) {
    for (const r of RANKS) {
      deck.push({ suit: s, rank: r.val, rankLabel: r.label });
    }
  }
  return deck;
}

function drawTwo() {
  const deck = buildDeck();
  const aIdx = Math.floor(Math.random() * deck.length);
  const a = deck.splice(aIdx, 1)[0];
  const bIdx = Math.floor(Math.random() * deck.length);
  const b = deck.splice(bIdx, 1)[0];
  return { a, b };
}

export default function App() {
  const [balance, setBalance] = useState(1000);
  const [selectedChip, setSelectedChip] = useState(25);
  const [bets, setBets] = useState({ dragon: 0, tiger: 0, tie: 0, suitedTie: 0 });
  const [lastBets, setLastBets] = useState(null);
  const [cards, setCards] = useState({ dragon: null, tiger: null });
  const [revealed, setRevealed] = useState(false);
  const [dealing, setDealing] = useState(false);
  const [lastOutcome, setLastOutcome] = useState('');

  const totalBet = useMemo(() => Object.values(bets).reduce((a, b) => a + b, 0), [bets]);

  function placeBet(area) {
    if (!selectedChip) return;
    if (dealing) return;
    if (balance < selectedChip) return;
    setBets((prev) => ({ ...prev, [area]: prev[area] + selectedChip }));
    setBalance((b) => b - selectedChip);
  }

  function clearBets() {
    if (dealing) return;
    const refund = totalBet;
    if (refund > 0) setBalance((b) => b + refund);
    setBets({ dragon: 0, tiger: 0, tie: 0, suitedTie: 0 });
  }

  function rebet() {
    if (dealing) return;
    if (!lastBets) return;
    const needed = Object.values(lastBets).reduce((a, b) => a + b, 0);
    if (balance < needed) return;
    setBalance((b) => b - needed);
    setBets(lastBets);
  }

  function settle(roundCards) {
    const d = roundCards.dragon;
    const t = roundCards.tiger;

    let outcome = '';
    let winMultiplier = { dragon: 2, tiger: 2, tie: 11, suitedTie: 50 }; // including returned stake on wins for main bets
    let winnings = 0;
    const isTie = d.rank === t.rank;
    const isSuitedTie = isTie && d.suit === t.suit;

    if (isSuitedTie) outcome = 'Suited Tie 50:1';
    else if (isTie) outcome = 'Tie 11:1';
    else if (d.rank > t.rank) outcome = 'Dragon Wins';
    else outcome = 'Tiger Wins';

    if (isTie || isSuitedTie) {
      // Dragon/Tiger lose half on tie commonly, but many variations push. We'll implement PUSH for simplicity.
      // Pay tie and suited tie appropriately
      winnings += bets.tie * winMultiplier.tie;
      winnings += bets.suitedTie * winMultiplier.suitedTie;
      // Push main bets
      winnings += bets.dragon; // return stake
      winnings += bets.tiger; // return stake
    } else if (d.rank > t.rank) {
      winnings += bets.dragon * winMultiplier.dragon; // 1:1 plus stake
    } else {
      winnings += bets.tiger * winMultiplier.tiger;
    }

    setBalance((b) => b + winnings);
    setLastOutcome(outcome);
  }

  async function deal() {
    if (dealing) return;
    if (totalBet === 0) return;

    setDealing(true);
    setLastOutcome('');
    setLastBets(bets);

    // Burn previous cards
    setCards({ dragon: null, tiger: null });
    setRevealed(false);

    await new Promise((r) => setTimeout(r, 300));

    const { a, b } = drawTwo();
    const dragon = a;
    const tiger = b;

    setCards({ dragon, tiger });

    // Reveal with a short delay for realism
    await new Promise((r) => setTimeout(r, 700));
    setRevealed(true);

    await new Promise((r) => setTimeout(r, 600));
    settle({ dragon, tiger });

    // Reset bets after settle (keep lastBets for rebet)
    setBets({ dragon: 0, tiger: 0, tie: 0, suitedTie: 0 });
    setDealing(false);
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-zinc-950 via-zinc-900 to-black text-white relative overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -right-10 w-[28rem] h-[28rem] rounded-full bg-rose-500/20 blur-3xl" />

      <div className="max-w-6xl mx-auto pb-16">
        <CasinoHeader balance={balance} />

        <DragonTigerTable
          bets={bets}
          onPlaceBet={placeBet}
          selectedChip={selectedChip}
          cards={cards}
          revealed={revealed}
          lastOutcome={lastOutcome}
        />

        <ChipTray selectedChip={selectedChip} setSelectedChip={setSelectedChip} disabled={dealing} />

        <ControlPanel
          onDeal={deal}
          onClear={clearBets}
          onRebet={rebet}
          totalBet={totalBet}
          canDeal={totalBet > 0}
          canRebet={!!lastBets}
          dealing={dealing}
        />

        {/* Small footer */}
        <p className="text-center mt-8 text-xs text-zinc-500">
          For entertainment purposes • Odds: Dragon/Tiger 1:1 • Tie 11:1 • Suited Tie 50:1
        </p>
      </div>
    </div>
  );
}
