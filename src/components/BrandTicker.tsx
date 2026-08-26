import React from "react";
import { BRAND_PARTNERS } from "../data";
import { ShieldCheck } from "lucide-react";

export const BrandTicker: React.FC = () => {
  // Duplicate list for infinite seamless loop
  const tickerItems = [...BRAND_PARTNERS, ...BRAND_PARTNERS, ...BRAND_PARTNERS];

  return (
    <section className="relative py-8 bg-[#070A17]/80 border-y border-white/10 overflow-hidden backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-cyan-400" />
          <span>Multi-Brand Expert Service & Sales Partner for All Major Makes & Models</span>
        </div>
      </div>

      <div className="ticker-mask w-full overflow-hidden">
        <div className="ticker-track flex items-center gap-6">
          {tickerItems.map((brand, idx) => (
            <div
              key={`${brand.name}-${idx}`}
              className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all group shrink-0 cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400/60 group-hover:bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.6)] transition-all" />
              <span className="text-sm font-bold text-slate-200 group-hover:text-white font-['Manrope'] whitespace-nowrap">
                {brand.name}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono font-medium">
                {brand.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
