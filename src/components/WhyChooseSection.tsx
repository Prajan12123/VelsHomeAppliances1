import React from "react";
import {
  UserCheck,
  BadgeIndianRupee,
  Zap,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  CheckCircle2,
  Award,
} from "lucide-react";
import { WHY_CHOOSE_ITEMS } from "../data";

export const WhyChooseSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "UserCheck":
      case "UsersCheck":
        return <UserCheck className="w-6 h-6" />;
      case "BadgeIndianRupee":
        return <BadgeIndianRupee className="w-6 h-6" />;
      case "Zap":
        return <Zap className="w-6 h-6" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6" />;
      case "ShieldCheck":
        return <ShieldCheck className="w-6 h-6" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-choose-us" className="relative py-24 bg-[#05070F] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-sky-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Award className="w-3.5 h-3.5" />
            <span>The VELS Distinction</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Why Choose VELS Home Appliances?
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base">
            Engineered around trust, certified precision, rapid turnaround, and uncompromising customer care.
          </p>
        </div>

        {/* 6 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WHY_CHOOSE_ITEMS.map((item) => (
            <div
              key={item.id}
              id={`why-card-${item.id}`}
              className="glass-panel-interactive p-8 rounded-3xl flex flex-col justify-between group border-white/10 relative overflow-hidden"
            >
              {/* Subtle top corner gradient highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-400/5 rounded-bl-full group-hover:bg-cyan-400/15 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-900/40 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                    {item.highlight}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors font-['Manrope']">
                  {item.title}
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="font-mono text-cyan-400 font-bold">
                  {item.stat}
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Verified Standard
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
