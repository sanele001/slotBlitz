"use client";

import { useMemo, useState } from "react";

/**
 * BonusCalculator
 * ---------------
 * Interactive widget that breaks down a casino deposit bonus into its
 * real wagering requirement, so users can see the true "cost" of a
 * promotion before opting in.
 */

const ACCENT = "#fb226b"; // deposit / capital commit
const BONUS_COLOR = "#f5b400"; // bonus funds / casino leverage
const ROLLOVER_COLOR = "#22c55e"; // wagering requirement

type WageringBasis = "deposit+bonus" | "bonus-only";

export default function BonusCalculator() {
  const [depositAmount, setDepositAmount] = useState(160);
  const [bonusPercentage, setBonusPercentage] = useState(135);
  const [wageringMultiplier, setWageringMultiplier] = useState(29);
  const [basis, setBasis] = useState<WageringBasis>("deposit+bonus");

  const { bonusFunds, playableBalance, totalWagering } = useMemo(() => {
    const bonus = depositAmount * (bonusPercentage / 100);
    const balance = depositAmount + bonus;
    const wageringBase = basis === "deposit+bonus" ? balance : bonus;
    const total = wageringBase * wageringMultiplier;
    return {
      bonusFunds: bonus,
      playableBalance: balance,
      totalWagering: total,
    };
  }, [depositAmount, bonusPercentage, wageringMultiplier, basis]);

  const depositShare =
    playableBalance > 0 ? (depositAmount / playableBalance) * 100 : 50;
  const bonusShare = 100 - depositShare;

  // Visual fill for the rollover bar, scaled against a soft reference
  // cap so the bar has room to visually grow/shrink with the inputs.
  const rolloverFill = Math.min((totalWagering / 25000) * 100, 100);

  const money = (n: number) =>
    `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <p className="text-sm sm:text-base text-white/70 mb-4">
        Here is a{" "}
        <span className="font-bold text-white">Casino Bonus Calculator</span>{" "}
        widget designed specifically to help users understand the true value of
        online casino promotions by breaking down the wagering requirements.
      </p>

      <div className="rounded-3xl border border-white/10 bg-[#0c0714] p-5 sm:p-7">
        {/* Total wagering requirement */}
        <div>
          <p className="text-xs text-white/40">Total wagering requirement</p>
          <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
            {money(totalWagering)}{" "}
            <span className="text-xs sm:text-sm font-normal text-white/40">
              total volume to unlock cashout
            </span>
          </p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-3 gap-4 mt-5 pt-5 border-t border-white/10">
          <div>
            <p className="text-xs text-white/40">Your deposit</p>
            <p
              className="mt-1 text-sm sm:text-base font-bold"
              style={{ color: ACCENT }}
            >
              {money(depositAmount)}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Bonus funds</p>
            <p
              className="mt-1 text-sm sm:text-base font-bold"
              style={{ color: BONUS_COLOR }}
            >
              +{money(bonusFunds)}
            </p>
          </div>
          <div>
            <p className="text-xs text-white/40">Playable balance</p>
            <p
              className="mt-1 text-sm sm:text-base font-bold"
              style={{ color: ROLLOVER_COLOR }}
            >
              {money(playableBalance)}
            </p>
          </div>
        </div>

        {/* Initial fund compilation */}
        <div className="mt-7 pt-6 border-t border-white/10">
          <p className="text-sm font-semibold text-white/70">
            Initial fund compilation
          </p>
          <div className="mt-3 flex w-full h-11 rounded-xl overflow-hidden">
            <div
              className="flex items-center px-4 text-sm font-semibold text-white"
              style={{ width: `${depositShare}%`, backgroundColor: ACCENT }}
            >
              Deposit
            </div>
            <div
              className="flex items-center px-4 text-sm font-semibold text-[#2a1b00]"
              style={{ width: `${bonusShare}%`, backgroundColor: BONUS_COLOR }}
            >
              Bonus
            </div>
          </div>
        </div>

        {/* Wagering multiplier impact */}
        <div className="mt-7 pt-6 border-t border-white/10">
          <p className="text-sm font-semibold text-white/70">
            Required wagering multiplier impact ({wageringMultiplier}x rollover)
          </p>
          <div className="mt-3 w-full h-11 rounded-xl bg-white/5 overflow-hidden">
            <div
              className="h-full flex items-center justify-end px-4 text-sm font-semibold text-white rounded-xl transition-all duration-200"
              style={{
                width: `${rolloverFill}%`,
                backgroundColor: ROLLOVER_COLOR,
              }}
            >
              {money(totalWagering)} Rollover
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="flex items-center gap-2 text-xs text-white/50">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: ACCENT }}
            />
            Your capital commit
          </span>
          <span className="flex items-center gap-2 text-xs text-white/50">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: BONUS_COLOR }}
            />
            Casino matched leverage ({bonusPercentage}%)
          </span>
          <span className="flex items-center gap-2 text-xs text-white/50">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: ROLLOVER_COLOR }}
            />
            Rollover volume standard
          </span>
        </div>

        {/* Wagering requirement term base */}
        <div className="mt-7 pt-6 border-t border-white/10">
          <p className="text-sm font-semibold text-white/70 mb-3">
            Wagering requirement term base
          </p>
          <div className="flex w-full rounded-full bg-white/5 p-1">
            <button
              onClick={() => setBasis("deposit+bonus")}
              className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors"
              style={
                basis === "deposit+bonus"
                  ? { backgroundColor: ACCENT, color: "white" }
                  : { color: "rgba(255,255,255,0.5)" }
              }
            >
              Deposit + Bonus
            </button>
            <button
              onClick={() => setBasis("bonus-only")}
              className="flex-1 rounded-full py-2.5 text-sm font-semibold transition-colors"
              style={
                basis === "bonus-only"
                  ? { backgroundColor: ACCENT, color: "white" }
                  : { color: "rgba(255,255,255,0.5)" }
              }
            >
              Bonus Only
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="mt-7 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SliderField
            label="Deposit amount"
            value={depositAmount}
            displayValue={money(depositAmount)}
            min={10}
            max={1000}
            step={10}
            onChange={setDepositAmount}
          />
          <SliderField
            label="Bonus percentage"
            value={bonusPercentage}
            displayValue={`${bonusPercentage}%`}
            min={0}
            max={200}
            step={5}
            onChange={setBonusPercentage}
          />
          <SliderField
            label="Wagering multiplier"
            value={wageringMultiplier}
            displayValue={`${wageringMultiplier}x`}
            min={1}
            max={50}
            step={1}
            onChange={setWageringMultiplier}
          />
        </div>
      </div>

      <p className="mt-3 text-xs text-white/30 text-center">
        AI-generated. Don&apos;t enter sensitive personal info.
      </p>
    </div>
  );
}

function SliderField({
  label,
  value,
  displayValue,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <p className="text-xs text-white/40">{label}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-3 accent-[#fb226b]"
      />
      <p className="mt-1 text-sm font-bold text-white">{displayValue}</p>
    </div>
  );
}
