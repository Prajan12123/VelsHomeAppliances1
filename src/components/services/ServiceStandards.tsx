import React from "react";
import { 
  ShieldCheck, 
  Gauge, 
  Cpu, 
  Sparkles, 
  Award, 
  CheckCircle2, 
  ShieldAlert, 
  Wrench, 
  Droplets,
  HardHat,
  FileCheck2,
  Clock
} from "lucide-react";

export const ServiceStandards: React.FC = () => {
  const diagnosticTools = [
    {
      title: "Mastercool Digital Manifolds",
      desc: "Microprocessor-controlled pressure & vacuum gauges calibrated for exact R32, R410A & R600A refrigerant diagnostics.",
      icon: Gauge,
      metric: "±0.5 PSI Precision"
    },
    {
      title: "Fluke True-RMS Clamp Multimeters",
      desc: "Laboratory-grade AC/DC current, resistance, microfarad capacitor testing, and PCB voltage drop analysis.",
      icon: Cpu,
      metric: "Cat IV Safety Rated"
    },
    {
      title: "High-Pressure Anti-Spill Jet Systems",
      desc: "Specialized water-jacketed high-pressure washer guns designed for indoor AC split cleaning with zero wall splatter.",
      icon: Droplets,
      metric: "140 Bar Max Flow"
    },
    {
      title: "Infrared Thermal Imaging Cameras",
      desc: "Non-contact thermal profiling to detect overheating motor bearings, hot spots on PCB logic boards, and duct leaks.",
      icon: Sparkles,
      metric: "0.1°C Sensitivity"
    }
  ];

  const qualityPillars = [
    {
      title: "100% Genuine OG Spares",
      desc: "We exclusively source factory-certified parts with manufacturer hologram seals, barcode tracking, and official replacement warranty cards.",
      icon: Award,
      badge: "Zero Counterfeits"
    },
    {
      title: "60–90 Min Express Arrival SLA",
      desc: "Our strategic coverage network across Avinashi, Tirupur, and surrounding corridors guarantees rapid response for urgent breakdowns.",
      icon: Clock,
      badge: "Express Response"
    },
    {
      title: "Strict Safety & Hygiene Protocol",
      desc: "Technicians arrive with sanitized toolboxes, protective floor mats, clean uniform attire, ID badges, and indoor shoe covers.",
      icon: HardHat,
      badge: "Clean Worksite"
    },
    {
      title: "Transparent Digital Invoicing",
      desc: "Itemized billing sent instantly via SMS & WhatsApp with GST compliance, manufacturer part numbers, and written 6-month guarantee & warranty coverage.",
      icon: FileCheck2,
      badge: "Instant Invoice"
    }
  ];

  return (
    <section className="py-20 bg-[#070A18] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Master Technical Infrastructure</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Engineered for Precision & Absolute Reliability
          </h2>
          
          <p className="text-base text-slate-300">
            Why leading residential villas and corporate facilities trust VELS: We equip our engineers with aerospace-grade diagnostic instruments and source exclusively verified manufacturer components.
          </p>
        </div>

        {/* Diagnostic Tools Grid */}
        <div className="mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-cyan-300 mb-6 flex items-center gap-2">
            <Wrench className="w-4 h-4" />
            <span>Calibrated Diagnostic Equipment Deployed on Every Visit</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {diagnosticTools.map((tool, idx) => {
              const Icon = tool.icon;
              return (
                <div 
                  key={idx}
                  className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono font-bold bg-white/10 text-cyan-300 px-2 py-0.5 rounded-md">
                      {tool.metric}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-2 font-['Manrope']">
                    {tool.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Pillars of Quality */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#070D22] via-[#081232] to-[#05091A]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {qualityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded">
                      {pillar.badge}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white font-['Manrope']">
                    {pillar.title}
                  </h4>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
