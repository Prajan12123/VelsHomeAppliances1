import React from "react";
import {
  PhoneCall,
  Activity,
  FileCheck2,
  Wrench,
  Gauge,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export const WhyChooseServiceProtocol: React.FC = () => {
  const steps = [
    {
      num: "01",
      icon: PhoneCall,
      title: "Pre-Visit Tele-Triage",
      desc: "Our technical desk analyzes your appliance brand, model, and symptoms to pre-assign the right master technician and pre-pack original factory spares.",
      tag: "Zero Delay Prep",
    },
    {
      num: "02",
      icon: Activity,
      title: "Digital Multi-Point Diagnosis",
      desc: "Technician uses calibrated Fluke multimeters, amp clamps, and thermal sensors to identify the exact root failure rather than symptomatic quick-fixes.",
      tag: "Pinpoint Precision",
    },
    {
      num: "03",
      icon: FileCheck2,
      title: "Transparent Written Estimate",
      desc: "Before turning a single screw or replacing a component, you receive an itemized quote with OEM spare part MRP and fixed ₹500 basic charge.",
      tag: "100% Upfront Pricing",
    },
    {
      num: "04",
      icon: Wrench,
      title: "Clean, ESD-Safe Surgical Repair",
      desc: "Repairs are executed using anti-static work mats, insulated precision tools, and sealed original brand replacement parts right in front of you.",
      tag: "Genuine OEM Spares",
    },
    {
      num: "05",
      icon: Gauge,
      title: "Live Load Stress Testing",
      desc: "We perform full electrical load and cycle verification (cooling wattage, compressor draw, motor RPM, and drain test) to ensure peak operating efficiency.",
      tag: "Stress Tested",
    },
    {
      num: "06",
      icon: ShieldCheck,
      title: "12-Point Safety Audit & Warranty",
      desc: "Technician completes an electrical earth leakage test, signs off the safety checklist, and activates your 6-month free revisit warranty and guarantee.",
      tag: "6-Month Guarantee & Warranty",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Wrench className="w-3.5 h-3.5" />
          <span>The VELS Engineering Standard</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          Our 6-Stage Precision Service Protocol
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          No shortcuts, no guesswork. Every home visit follows an ISO-aligned technical workflow designed for longevity and safety.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-400/5 rounded-bl-full group-hover:bg-cyan-400/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-900/40 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xl font-extrabold text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {step.num}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono font-bold mb-3">
                  {step.tag}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 font-['Manrope'] group-hover:text-cyan-200 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/5 flex items-center text-[11px] text-slate-400 font-medium">
                <span>Stage {step.num} Verified</span>
                <ArrowRight className="w-3.5 h-3.5 ml-auto text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
