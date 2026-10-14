import Link from "next/link";
import {
  FaCalculator,
  FaBolt,
  FaShieldAlt,
  FaUserSlash,
  FaArrowRight,
  FaInfoCircle,
} from "react-icons/fa";

/**
 * BonusCalculatorTeaser
 * ----------------------
 * Promo section linking to the full Bonus Calculator tool/page.
 * All data is static — this is a teaser, not the working calculator.
 */

const ACCENT = "#fb226b";
const BONUS_COLOR = "#f5b400";
const ROLLOVER_COLOR = "#22c55e";

const PERKS = [
  { icon: FaBolt, label: "Instant estimate" },
  { icon: FaShieldAlt, label: "Clear wagering terms" },
  { icon: FaUserSlash, label: "No signup needed" },
];

const PREVIEW_STATS = [
  { label: "Your deposit", value: "$160", color: ACCENT },
  { label: "Bonus funds", value: "+$216", color: BONUS_COLOR },
  { label: "Playable balance", value: "$376", color: ROLLOVER_COLOR },
];

export default function BonusCalculatorTeaser() {
  return (
    <section className="w-full rounded-3xl border border-white/10  p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left: pitch */}
        <div className="flex-1 w-full">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: "rgba(251,34,107,0.12)" }}
          >
            <FaCalculator className="w-6 h-6" style={{ color: ACCENT }} />
          </div>

          <h2 className="mt-4 text-2xl sm:text-4xl font-extrabold text-white">
            Bonus Calculator
          </h2>
          <p className="mt-3 text-sm sm:text-base text-white/50 max-w-sm leading-relaxed">
            Estimate your bonus value, wagering requirements and playable
            balance before you claim.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            {PERKS.map((perk) => {
              const Icon = perk.icon;
              return (
                <span
                  key={perk.label}
                  className="flex items-center gap-2 text-sm text-white/70"
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: "rgba(251,34,107,0.12)" }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: ACCENT }} />
                  </span>
                  {perk.label}
                </span>
              );
            })}
          </div>

          <Link
            href="/casino-bonus-calculator"
            className="inline-flex items-center gap-2 mt-7 rounded-full px-7 py-4 text-sm sm:text-base font-bold text-white transition-colors"
            style={{ backgroundColor: ACCENT }}
          >
            Open Bonus Calculator
            <FaArrowRight className="w-4 h-4" />
          </Link>
          <p className="mt-3 text-xs text-white/40">
            Continue to the full calculator
          </p>
        </div>

        {/* Right: static preview card */}
        <div className="w-full lg:w-[420px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
          <div className="p-5 sm:p-6">
            <span
              className="inline-block text-[11px] font-bold uppercase tracking-wide rounded-full px-3 py-1"
              style={{
                color: ACCENT,
                backgroundColor: "rgba(251,34,107,0.12)",
              }}
            >
              Bonus Preview
            </span>

            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-extrabold text-white">
                35x
              </span>
              <span className="text-sm text-white/50">
                Wagering requirement
              </span>
            </p>

            <div className="mt-5 grid grid-cols-3 gap-4 pt-5 border-t border-white/10">
              {PREVIEW_STATS.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xs text-white/40">{stat.label}</p>
                  <p
                    className="mt-1 text-lg sm:text-xl font-extrabold"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 px-5 sm:px-6 py-3 bg-white/[0.03] border-t border-white/10">
            <FaInfoCircle className="w-3.5 h-3.5 text-white/30 shrink-0" />
            <p className="text-xs text-white/40">
              Illustrative example &bull; Final terms vary by casino
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
