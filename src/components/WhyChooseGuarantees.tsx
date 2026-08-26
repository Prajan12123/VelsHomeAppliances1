import React from "react";
import {
  ShieldCheck,
  BadgeIndianRupee,
  RotateCcw,
  Sparkles,
  Award,
  CheckCircle2,
} from "lucide-react";

export const WhyChooseGuarantees: React.FC<{ onOpenBooking: () => void }> = ({
  onOpenBooking,
}) => {
  const guarantees = [
    {
      icon: BadgeIndianRupee,
      badge: "No Hidden Costs",
      title: "Fixed ₹500 Diagnostic Fee",
      desc: "Our visiting and primary inspection charge is strictly fixed at ₹500. If parts replacement is needed, you get an upfront quote before we begin.",
      points: ["No surprise fees", "Itemized parts pricing", "Pay only upon satisfaction"],
    },
    {
      icon: RotateCcw,
      badge: "Complete Peace of Mind",
      title: "6-Month Free Revisit Guarantee & Warranty",
      desc: "If the exact same issue reoccurs within 6 months of service, our technician will revisit and resolve it at zero service charge.",
      points: ["100% labor covered", "Priority slot assignment", "Zero hassle process"],
    },
    {
      icon: ShieldCheck,
      badge: "Direct Sourced",
      title: "100% Genuine OEM Spares",
      desc: "We exclusively source original, brand-authorized replacement parts with manufacturer warranties of up to 90 days on major components.",
      points: ["Direct brand supply", "Sealed factory packaging", "Original warranty cards"],
    },
    {
      icon: Sparkles,
      badge: "Professional Etiquette",
      title: "Clean Home & Punctual Arrival",
      desc: "Our technicians wear protective shoe covers, carry clean floor mats, clean up debris, and arrive within your designated time window.",
      points: ["Shoe covers & floor mats", "Polite, verified staff", "Full cleanup post-repair"],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5" />
          <span>The VELS Customer Pledge</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          4 Unbreakable Service Guarantees
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          We built our reputation over 15 years by standing 100% behind every repair and every customer interaction.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {guarantees.map((g, idx) => {
          const Icon = g.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative overflow-hidden group flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-bl-full group-hover:bg-cyan-400/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/30 text-cyan-300">
                    {g.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Manrope'] group-hover:text-cyan-200 transition-colors">
                  {g.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {g.desc}
                </p>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5">
                {g.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-cyan-950/30 to-slate-900 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-white font-['Manrope'] mb-1">
            Need an Expert Technician at Your Doorstep Today?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Book in 30 seconds for ₹500 with zero upfront payment required.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer whitespace-nowrap"
        >
          Book Doorstep Visit • ₹500
        </button>
      </div>
    </section>
  );
};
