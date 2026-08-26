import React from "react";
import { CheckCircle2, ShieldCheck, Cpu, FileText, Wrench, Award, Sparkles, ArrowRight } from "lucide-react";

interface HomeDiagnosticProtocolProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const HomeDiagnosticProtocol: React.FC<HomeDiagnosticProtocolProps> = ({
  onOpenBookingModal,
}) => {
  const steps = [
    {
      num: "01",
      title: "Digital Multi-Point Inspection",
      desc: "Our technician arrives in uniform within 60–90 mins with calibrated digital multimeters, gas pressure gauges, and thermal infrared thermometers to pinpoint exact electrical/mechanical faults.",
      icon: Cpu,
      highlight: "₹500 Fixed Doorstep Visit",
    },
    {
      num: "02",
      title: "100% Upfront Written Estimate",
      desc: "Before turning a single screw or replacing parts, the technician explains the exact fault and provides a written estimate matching official MRP rates. Zero hidden costs or surprise surcharges.",
      icon: FileText,
      highlight: "No Obligation Approval",
    },
    {
      num: "03",
      title: "OG Genuine Part Repair",
      desc: "Repairs are executed using 100% genuine factory-sealed components from authorized distributors (LG, Samsung, Daikin, Whirlpool, IFB, Bosch, Sony, Voltas).",
      icon: Wrench,
      highlight: "Brand-Certified Components",
    },
    {
      num: "04",
      title: "Sealed 30-Day Guarantee",
      desc: "After testing the appliance under full load, you receive an official digital invoice and a 30-day no-questions-asked service warranty backed by our Avinashi headquarters.",
      icon: ShieldCheck,
      highlight: "100% Peace of Mind",
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#060c20] to-[#040714] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Standard Operating Procedure</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            What Happens During Your ₹500 Visit?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            We revolutionized home appliance service in Avinashi with transparent diagnostic standards, fixed visiting fees, and zero quote ambiguity.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black font-mono text-cyan-400/60 group-hover:text-cyan-300 transition-colors">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <span className="text-[11px] font-bold text-cyan-300 font-mono">
                    ✓ {step.highlight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                Ready to experience hassle-free appliance maintenance?
              </div>
              <div className="text-[11px] text-slate-300">
                Book in 60 seconds • Pay ₹500 after diagnosis • 100% verified technicians
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenBookingModal()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book ₹500 Visit Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
