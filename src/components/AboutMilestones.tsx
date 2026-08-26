import React from "react";
import { Calendar, Award, CheckCircle2, TrendingUp, Sparkles, Building2 } from "lucide-react";

export const AboutMilestones: React.FC = () => {
  const milestones = [
    {
      year: "2011",
      title: "Inception in Avinashi",
      subtitle: "Specialized AC & Refrigeration Workshop",
      desc: "Founded with a team of 3 certified HVAC engineers to deliver honest, prompt cooling repairs for residential homes and local textile units in Avinashi.",
      metric: "500+ Homes Year 1",
    },
    {
      year: "2015",
      title: "Multi-Appliance Expansion",
      subtitle: "Full Home Appliance Care",
      desc: "Expanded repair and maintenance infrastructure to include Washing Machines, Smart LED TVs, Microwave Ovens, and Kitchen Chimneys.",
      metric: "5,000+ Customers",
    },
    {
      year: "2018",
      title: "Pioneered ₹500 Fixed Diagnostic Rate",
      subtitle: "Eliminating Hidden Repair Fees",
      desc: "Introduced our transparent ₹500 flat visiting & diagnostic fee policy with zero advance payment to protect customers from arbitrary mechanic charges.",
      metric: "12,000+ Repaired",
    },
    {
      year: "2021",
      title: "OEM Direct Spares Warehouse",
      subtitle: "100% Genuine Barcode Sourcing",
      desc: "Established direct procurement partnerships with official distributor networks (Samsung, LG, Whirlpool, Bosch, IFB, Voltas) with barcode traceability.",
      metric: "10,000+ OEM Spares Stocked",
    },
    {
      year: "2024",
      title: "Fleet Modernization & 60-Min Dispatch",
      subtitle: "Regional Fast-Response Coverage",
      desc: "Expanded our mobile fleet of 24+ factory-certified service engineers across Avinashi, Tiruppur, Coimbatore, and Erode with real-time digital dispatch.",
      metric: "20,000+ Happy Families",
    },
    {
      year: "2026",
      title: "Premier Regional Benchmark",
      subtitle: "25,000+ Milestone & Digital Excellence",
      desc: "Celebrating 15 years of uninterrupted service excellence, maintaining a 98.9% customer satisfaction index and 6-month unconditional warranty & guarantee.",
      metric: "25,000+ Completed Jobs",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Calendar className="w-3.5 h-3.5" />
          <span>Our 15-Year Journey</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          The VELS Evolution (2011 – 2026)
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          From a humble technical workshop in Avinashi to Tamil Nadu’s most dependable multi-brand home appliance service network.
        </p>
      </div>

      <div className="relative">
        {/* Central Connecting Line for Desktop (lg+) */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-gradient-to-b from-cyan-500/80 via-emerald-500/50 to-transparent" />

        {/* Vertical Connecting Line for Mobile and Tablet (below lg) */}
        <div className="lg:hidden absolute left-6 top-6 bottom-6 w-0.5 bg-gradient-to-b from-cyan-500/80 via-emerald-500/50 to-transparent" />

        <div className="space-y-8 lg:space-y-12">
          {milestones.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={index}
                className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-12 pl-14 lg:pl-0 ${
                  isEven ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Mobile / Tablet Node (Left Rail) */}
                <div className="lg:hidden absolute left-0 top-3 flex items-center justify-center shrink-0">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-950 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center font-mono font-black text-xs shadow-[0_0_15px_rgba(0,229,255,0.4)] z-10">
                    {item.year.slice(2)}
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full lg:w-1/2">
                  <div
                    className={`glass-panel p-5 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative group overflow-hidden ${
                      isEven ? "lg:text-right" : "lg:text-left"
                    }`}
                  >
                    <div className={`flex items-center gap-2.5 mb-3 flex-wrap ${isEven ? "lg:justify-end" : "lg:justify-start"}`}>
                      <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-extrabold text-xs">
                        {item.year}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                        {item.metric}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-xl font-bold text-white mb-1 font-['Manrope'] group-hover:text-cyan-200 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-400 mb-3">
                      {item.subtitle}
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {/* Desktop Center Timeline Node */}
                <div className="hidden lg:flex relative items-center justify-center shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950 border-2 border-cyan-400 text-cyan-300 flex items-center justify-center font-mono font-black text-sm shadow-[0_0_15px_rgba(0,229,255,0.4)] z-10">
                    {item.year.slice(2)}
                  </div>
                </div>

                {/* Placeholder spacer for grid symmetry on large screens */}
                <div className="hidden lg:block lg:w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
