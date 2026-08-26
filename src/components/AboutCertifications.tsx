import React from "react";
import {
  Leaf,
  ShieldCheck,
  Award,
  Recycle,
  FileBadge,
  Heart,
  CheckCircle,
  Building,
} from "lucide-react";

export const AboutCertifications: React.FC = () => {
  const certifications = [
    {
      icon: Leaf,
      title: "Eco-Friendly Refrigerant Recovery",
      desc: "Zero-venting policy. We use closed-loop recovery units for R32, R410a, and R134a to minimize global warming impact and prevent atmospheric ozone damage.",
      tag: "Green Protocol",
    },
    {
      icon: Recycle,
      title: "Authorized E-Waste Disposal",
      desc: "All defective circuit boards, burnt copper coils, and metal casings are channeled to government-certified recycling facilities rather than local scrap yards.",
      tag: "100% Recycled",
    },
    {
      icon: ShieldCheck,
      title: "Electrical Earth & Insulation Safety",
      desc: "Strict compliance with Indian Standard (IS 302 / IS 732) household electrical appliance safety norms with digital megohmmeter insulation resistance verification.",
      tag: "IS Compliant",
    },
    {
      icon: Heart,
      title: "Avinashi Community Skill Initiative",
      desc: "Annual free technical apprenticeship program providing hands-on appliance repair training and career placement for youth from rural Tamil Nadu.",
      tag: "Community First",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-[#051118] via-[#081726] to-[#051118] relative overflow-hidden shadow-2xl">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Environmental & Safety Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-3">
            Committed to Safety, Sustainability & Community
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            We hold ourselves to the highest ethical and environmental benchmarks in our service operations across Tamil Nadu.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {certifications.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-emerald-400/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-300 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/20 text-emerald-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-2 font-['Manrope']">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-300 font-semibold">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Standard Verified</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
