export default function CalculatorTeaser() {
  return (
    <div className="mx-auto w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0c0714] p-5 sm:p-7">
      <div>
        <p className="text-xs text-white/40">Total wagering requirement</p>
        <p className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
          $ 10,000{" "}
          <span className="text-xs sm:text-sm font-normal text-white/40">
            total volume to unlock cashout
          </span>
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 sm:gap-4">
        <div>
          <p className="text-xs text-white/40">Your deposit</p>
          <p className="mt-1 text-sm font-bold text-[#fb226b] sm:text-base">
            $160
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40">Bonus funds</p>
          <p className="mt-1 text-sm font-bold text-[#f5b400] sm:text-base">
            +$216
          </p>
        </div>
        <div>
          <p className="text-xs text-white/40">Playable balance</p>
          <p className="mt-1 text-sm font-bold text-[#22c55e] sm:text-base">
            $376
          </p>
        </div>
      </div>
    </div>
  );
}
