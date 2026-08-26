import React from "react";
import {
  ShieldAlert,
  Zap,
  Flame,
  Wind,
  Droplets,
  Cpu,
  Gauge,
  Sparkles,
  Thermometer,
  RotateCw,
  Layers,
  FileCheck,
} from "lucide-react";

export const WhyChooseSafetyAudit: React.FC = () => {
  const auditPoints = [
    {
      icon: Zap,
      title: "Earth Leakage & Shock Prevention",
      desc: "Checking ground wire continuity & zero current leakage to the appliance chassis to prevent electrical hazards.",
    },
    {
      icon: Gauge,
      title: "Surge Voltage & Capacitor Rating",
      desc: "Testing start/run capacitors and line voltage tolerance to safeguard against power fluctuations.",
    },
    {
      icon: Wind,
      title: "Refrigerant & Gas Pressure Profiling",
      desc: "Digital manifold pressure check for R32, R410a, and R600a to eliminate micro-leaks and ensure optimal thermodynamic cycles.",
    },
    {
      icon: Droplets,
      title: "Drainage Anti-Clog & Hygiene Flow",
      desc: "Flushing drain channels and pans to prevent mold, bacterial buildup, and water overflow inside homes.",
    },
    {
      icon: Thermometer,
      title: "Thermostat & Thermal Cut-Off",
      desc: "High-precision temperature sensor calibration to prevent compressor or heating element burnouts.",
    },
    {
      icon: RotateCw,
      title: "Motor Bearing & Harmonic Vibration",
      desc: "Vibration dampener and bearing check to eliminate noisy grinding and premature motor failure.",
    },
    {
      icon: Cpu,
      title: "PCB Micro-soldering & Relay Check",
      desc: "Semiconductor inspection for carbon deposits, burnt traces, and switching relay reliability.",
    },
    {
      icon: Layers,
      title: "Gasket Air-Tightness & Vacuum Seal",
      desc: "Door gasket thermal insulation and magnetic seal test to reduce electricity waste by up to 25%.",
    },
    {
      icon: Sparkles,
      title: "Energy Draw & Amperage Efficiency",
      desc: "Measuring actual operating current against manufacturer specs to ensure power-saving compliance.",
    },
    {
      icon: Flame,
      title: "Overheat & Fire Hazard Shield",
      desc: "Inspecting heating elements, wiring harness sleeves, and terminal lugs for high-heat fatigue.",
    },
    {
      icon: ShieldAlert,
      title: "Anti-Flood & Solenoid Valve Seal",
      desc: "Water inlet solenoid and pressure switch testing to safeguard against accidental home flooding.",
    },
    {
      icon: FileCheck,
      title: "Digital Safety Sign-Off & Warranty",
      desc: "Completing your official work order and activating the 6-Month VELS peace of mind guarantee and warranty.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#080D1F] to-[#04060E] relative overflow-hidden">
        
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
            <span>Complimentary With Every ₹500 Visit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-3">
            The VELS 12-Point Safety & Efficiency Audit
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            We don’t just fix the immediate issue — we run a comprehensive diagnostic inspection to prevent future breakdowns, lower your electric bills, and protect your home from electrical risks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 relative z-10">
          {auditPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-cyan-400/30 transition-all duration-300 flex items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold text-cyan-400">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-white font-['Manrope']">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Full audit checklist provided on every visit report</span>
          </div>
          <div className="text-cyan-300 font-mono font-bold">
            Guaranteed Zero Additional Inspection Fee
          </div>
        </div>
      </div>
    </section>
  );
};
