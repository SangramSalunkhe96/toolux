export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Glow ring */}
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-cyan-400 blur-lg opacity-40"></div>

        {/* Main circle */}
        <div className="relative w-10 h-10 rounded-full bg-black border border-cyan-400 flex items-center justify-center">
          <span className="text-cyan-400 font-semibold tracking-tight">
            Tx
          </span>
        </div>
      </div>

      {/* Brand text */}
      <div className="leading-tight">
        <div className="text-white font-semibold tracking-wide">
          Toolux
        </div>
        <div className="text-xs text-gray-400">
          Smart, private web utilities
        </div>
      </div>
    </div>
  );
}
