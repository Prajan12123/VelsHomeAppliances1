import React from "react";
import {
  Smartphone,
  PhoneForwarded,
  Wrench,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";

export const ContactWhatToExpect: React.FC = () => {
  const steps = [
    {
      step: "01",
      icon: Smartphone,
      title: "Instant Digital Confirmation",
      timing: "Under 60 Seconds",
      desc: "Receive an instant booking ticket with guaranteed ₹500 fixed diagnostic quote and automated engineer queue assignment.",
    },
    {
      step: "02",
      icon: PhoneForwarded,
      title: "Tele-Triage Call & ETA",
      timing: "Within 15 Minutes",
      desc: "Our lead technical desk contacts you to verify appliance symptoms, confirm model series, and provide the exact arrival ETA.",
    },
    {
      step: "03",
      icon: Wrench,
      title: "Clean Doorstep Surgical Repair",
      timing: "60–90 Min Arrival",
      desc: "The engineer arrives in uniform with digital Fluke testing tools, protective floor mats, and factory-sealed OEM replacement spares.",
    },
    {
      step: "04",
      icon: FileCheck2,
      title: "Testing & 6-Month Warranty Sign-Off",
      timing: "Post-Service",
      desc: "Live load operational test conducted in your presence. Pay the ₹500 fee + approved spares with official GST invoice & 6-month warranty card.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>Doorstep Service Experience</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          What to Expect After Booking
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          We respect your time and home privacy. Here is how our seamless 4-stage service workflow unfolds from the moment you submit your request.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-3 right-4 font-mono font-black text-3xl text-white/5 group-hover:text-cyan-400/20 transition-colors">
                {item.step}
              </div>

              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/30 text-cyan-300 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>

                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/90 text-cyan-400 border border-cyan-500/30 mb-2 inline-block">
                  {item.timing}
                </span>

                <h3 className="text-base font-bold text-white font-['Manrope'] mb-2 group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Standard Protocol</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
