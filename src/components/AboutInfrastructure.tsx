import React from "react";
import {
  Cpu,
  Boxes,
  Truck,
  Wrench,
  Gauge,
  ShieldCheck,
  Zap,
  Sparkles,
  Layers,
} from "lucide-react";

export const AboutInfrastructure: React.FC = () => {
  const facilities = [
    {
      icon: Cpu,
      title: "Advanced PCB & Inverter Diagnostic Lab",
      badge: "Avinashi Central Lab",
      desc: "Our climate-controlled electronic testing lab houses digital storage oscilloscopes, infrared thermal cameras, and micro-soldering stations to repair complex inverter motherboard faults down to the component level.",
      features: [
        "Digital Fluke & Tektronix scopes",
        "ESD-safe anti-static workstations",
        "Dual-inverter compressor simulation rigs",
        "Component-level micro-soldering",
      ],
    },
    {
      icon: Boxes,
      title: "10,000+ OEM Spares Central Hub",
      badge: "Direct Factory Supply",
      desc: "A dedicated 3,500 sq.ft inventory hub storing factory-sealed genuine replacement parts for Samsung, LG, Whirlpool, Bosch, IFB, Voltas, Daikin, Godrej, and Panasonic.",
      features: [
        "Factory-sealed barcode verification",
        "Compressors, PCB boards, fan motors & pumps",
        "Original electronic sensors & thermostats",
        "Zero duplicate or counterfeit parts policy",
      ],
    },
    {
      icon: Truck,
      title: "Mobile Emergency Response Fleet",
      badge: "60–90 Min Doorstep Coverage",
      desc: "Our fleet of 24+ fully equipped technical service vehicles operates across Avinashi, Tiruppur, Coimbatore, Palladam, and Erode, carrying high-frequency spares for instant single-visit fixes.",
      features: [
        "Pre-stocked with fast-moving consumable spares",
        "R32, R410a, R134a, R600a manifold gauges",
        "Nitrogen purging & electronic leak detectors",
        "GPS-tracked dispatch for accurate arrival ETAs",
      ],
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Backbone</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          World-Class Infrastructure & Diagnostic Facility
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          Unlike freelancers with minimal tools, VELS backs every home technician with industrial-grade laboratory testing equipment and direct factory spare parts channels.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {facilities.map((fac, idx) => {
          const Icon = fac.icon;
          return (
            <div
              key={idx}
              className="glass-panel p-7 sm:p-8 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 relative group flex flex-col justify-between overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/5 rounded-bl-full group-hover:bg-cyan-400/10 transition-colors" />

              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-900/40 border border-cyan-400/40 text-cyan-300 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-500/30 text-cyan-300">
                    {fac.badge}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 font-['Manrope'] group-hover:text-cyan-200 transition-colors">
                  {fac.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {fac.desc}
                </p>
              </div>

              <div className="space-y-2.5 pt-5 border-t border-white/10">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 mb-2">
                  Technical Specifications:
                </div>
                {fac.features.map((ft, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-200">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span>{ft}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
