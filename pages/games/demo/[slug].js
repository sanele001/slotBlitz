import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaArrowLeft, FaDollarSign, FaSpinner } from 'react-icons/fa';

const games = {
  'mega-fortune-dreams': {
    title: "Mega Fortune Dreams",
    provider: "NetEnt",
    minBet: "0.20",
    maxBet: "80.00",
    balance: 1000,
  },
  'starburst': {
    title: "Starburst",
    provider: "NetEnt",
    minBet: "0.10",
    maxBet: "100.00",
    balance: 1000,
  },
  'gonzos-quest': {
    title: "Gonzo's Quest",
    provider: "NetEnt",
    minBet: "0.20",
    maxBet: "50.00",
    balance: 1000,
  }
};

const DemoGame = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [balance, setBalance] = useState(1000);
  const [bet, setBet] = useState(1);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { slug } = router.query;
  const game = slug && games[slug];

  const spin = () => {
    if (balance < bet) return;
    
    setIsSpinning(true);
    setBalance(prev => prev - bet);

    // Simulate slot machine spinning
    setTimeout(() => {
      const win = Math.random() > 0.7;
      const winAmount = win ? bet * Math.floor(Math.random() * 5 + 2) : 0;
      
      setResult({
        win,
        amount: winAmount,
        symbols: Array(3).fill(null).map(() => 
          ['🍒', '🍊', '🍇', '💎', '7️⃣'][Math.floor(Math.random() * 5)]
        )
      });

      if (win) {
        setBalance(prev => prev + winAmount);
      }

      setIsSpinning(false);
    }, 1500);
  };

  if (!mounted) {
    return null;
  }

  if (!game) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Game Not Found</h1>
          <Link href="/" className="text-primary hover:text-primary-dark">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Play {game.title} Demo - Slot Review</title>
      </Head>

      <div className="min-h-screen bg-dark">
        <div className="container mx-auto px-4 py-8">
          <Link href={`/games/${slug}`} className="inline-flex items-center text-primary hover:text-primary-dark mb-8">
            <FaArrowLeft className="mr-2" />
            Back to Game Info
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-dark-light rounded-xl p-8 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">{game.title}</h1>
              <p className="text-gray-400">Demo Mode</p>
            </div>

            <div className="bg-dark rounded-xl p-6 mb-8">
              <div className="grid grid-cols-3 gap-4 text-center mb-8">
                {result ? (
                  result.symbols.map((symbol, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-dark-light rounded-lg flex items-center justify-center text-4xl"
                    >
                      {symbol}
                    </div>
                  ))
                ) : (
                  Array(3).fill(null).map((_, index) => (
                    <div
                      key={index}
                      className="aspect-square bg-dark-light rounded-lg flex items-center justify-center text-4xl"
                    >
                      ?
                    </div>
                  ))
                )}
              </div>

              {result && (
                <div className="text-center mb-6">
                  {result.win ? (
                    <p className="text-green-500 text-xl font-bold">
                      You won ${result.amount}!
                    </p>
                  ) : (
                    <p className="text-red-500 text-xl font-bold">
                      Try again!
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <div className="bg-dark px-6 py-3 rounded-lg">
                <p className="text-gray-400 text-sm mb-1">Balance</p>
                <p className="text-white font-bold text-xl">${balance.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-1">Bet</label>
                  <input
                    type="number"
                    min={Number(game.minBet)}
                    max={Number(game.maxBet)}
                    value={bet}
                    onChange={(e) => setBet(Number(e.target.value))}
                    className="bg-dark text-white px-4 py-2 rounded-lg w-32"
                  />
                </div>
                <button
                  onClick={spin}
                  disabled={isSpinning || balance < bet}
                  className="bg-primary text-white px-8 py-3 rounded-full hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSpinning ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    'SPIN'
                  )}
                </button>
              </div>
            </div>

            <div className="text-center text-gray-400 text-sm">
              <p>Min Bet: ${game.minBet} | Max Bet: ${game.maxBet}</p>
              <p className="mt-2">This is a demo version for entertainment purposes only.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DemoGame;