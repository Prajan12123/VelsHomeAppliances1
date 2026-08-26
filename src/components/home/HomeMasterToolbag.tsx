import React, { useState } from "react";
import {
  Wrench,
  Gauge,
  Thermometer,
  Zap,
  Activity,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Eye,
  Sliders,
  Cpu,
} from "lucide-react";

interface PrecisionTool {
  id: string;
  name: string;
  category: string;
  precisionRating: string;
  icon: any;
  purpose: string;
  whyItMatters: string;
  whatLocalMechanicsDoInstead: string;
  testedParameters: string[];
}

const MASTER_TOOLS: PrecisionTool[] = [
  {
    id: "digital-manifold",
    name: "Digital Refrigerant Manifold & Micron Gauge",
    category: "Thermodynamics & HVAC",
    precisionRating: "±0.1 PSI / ±1 Micron Vacuum",
    icon: Gauge,
    purpose: "Measures exact suction & discharge saturation temperatures and verifies sub-500 micron deep vacuum before refrigerant charging.",
    whyItMatters: "Prevents compressor over-pressurization and guarantees sub-zero cooling efficiency with zero trapped moisture.",
    whatLocalMechanicsDoInstead: "Use uncalibrated analog gauges or 'thumb over valve' guesswork, resulting in overcharging and compressor seizure.",
    testedParameters: [
      "R32 / R410A High & Low Pressure",
      "Subcooling & Superheat Delta-T",
      "Deep Nitrogen Leak Hold Test (40 Bar)",
    ],
  },
  {
    id: "thermal-imaging",
    name: "FLIR Infrared Thermal Imaging Camera",
    category: "Electro-Thermal Diagnostics",
    precisionRating: "0.05°C Thermal Sensitivity",
    icon: Thermometer,
    purpose: "Visualizes hidden electrical hotspots, overloaded PCB relays, clogged refrigerator evaporator coils, and uneven AC airflow distributions.",
    whyItMatters: "Catches micro-fractures and thermal overloads BEFORE circuit boards catch fire or burn out permanently.",
    whatLocalMechanicsDoInstead: "Touch components with bare fingers after burning occurs, often replacing the wrong circuit board.",
    testedParameters: [
      "Compressor Terminal Heat Gradient",
      "Inverter IPM Heat Dissipation",
      "Evaporator Frost Line Uniformity",
    ],
  },
  {
    id: "true-rms-multimeter",
    name: "True-RMS Digital Multimeter & Low-Current Clamp",
    category: "Micro-Electronics & Power",
    precisionRating: "CAT-III 1000V / 0.01mA Resolution",
    icon: Zap,
    purpose: "Measures waveform distortion, inverter motor phase balance, capacitive microfarad drift, and insulation earth leakages.",
    whyItMatters: "Detects weak capacitors and micro-leakages that silently trip main household MCB circuit breakers.",
    whatLocalMechanicsDoInstead: "Use ₹150 cheap pocket meters or test lamps that cannot detect inverter pulse-width modulation signals.",
    testedParameters: [
      "Dual Inverter Phase Winding Resistance (U-V-W)",
      "Capacitor Microfarad (µF) Tolerance",
      "Earth Leakage & Ground Continuity (Mohm)",
    ],
  },
  {
    id: "ultrasonic-detector",
    name: "Ultrasonic Acoustic Refrigerant Leak Detector",
    category: "Acoustic Sensors",
    precisionRating: "Detects <0.1 oz/year Micro-Pinhole Leaks",
    icon: Activity,
    purpose: "Pinpoints microscopic gas leaks in AC indoor cooling coils and refrigerator aluminum joints using high-frequency sound waves.",
    whyItMatters: "Finds the exact pinhole joint instantly without cutting open sealed factory piping.",
    whatLocalMechanicsDoInstead: "Pour soapy detergent bubbles over visible tubes, which misses 90% of micro-pinhole leaks inside internal bends.",
    testedParameters: [
      "Indoor Evaporator Coil U-Bends",
      "Flare Nut Compression Joints",
      "Service Valve Schrader Core Seals",
    ],
  },
  {
    id: "esd-soldering",
    name: "Anti-Static (ESD) Precision Soldering & Chip Reflow",
    category: "Micro-Soldering",
    precisionRating: "Controlled 50°C–480°C Micro-Tip",
    icon: Cpu,
    purpose: "Allows on-site replacement of blown relays, diodes, and micro-controllers directly at the customer's doorstep without taking PCBs away.",
    whyItMatters: "Saves customers ₹5,000–₹12,000 by repairing original motherboard components instead of buying whole new cards.",
    whatLocalMechanicsDoInstead: "Take boards away for 7–10 days to unknown third-party shops with hefty middlemen markups.",
    testedParameters: [
      "Inverter Gate Driver Diode Replacement",
      "SMPS High-Voltage Filter Capacitor Rework",
      "Conformal Silicone Re-Coating",
    ],
  },
];

interface HomeMasterToolbagProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
}

export const HomeMasterToolbag: React.FC<HomeMasterToolbagProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedTool, setSelectedTool] = useState<PrecisionTool>(MASTER_TOOLS[0]);

  const Icon = selectedTool.icon;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Wrench className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exclusive Engineering Standard</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Inside Our Master Engineer's Tool Kit
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          No guesswork. Every VELS mobile technician arrives equipped with certified digital laboratory instruments to ensure 100% pinpoint accuracy at your doorstep.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Tool Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Precision Instruments ({MASTER_TOOLS.length})</span>
            <span className="text-emerald-400">Doorstep Standard</span>
          </div>

          {MASTER_TOOLS.map((tool) => {
            const isSelected = selectedTool.id === tool.id;
            const ToolIcon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                    : "glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-emerald-400" />
                )}

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                      : "bg-white/5 text-slate-400 border border-white/10"
                  }`}
                >
                  <ToolIcon className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">
                      {tool.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md border font-mono font-bold border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      {tool.precisionRating.split(" / ")[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {tool.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Tool Details & Comparison */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl bg-slate-900/90">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase font-bold mb-0.5">
                    {selectedTool.category}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-white font-['Manrope']">
                    {selectedTool.name}
                  </h3>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-mono block uppercase">Accuracy Rating</span>
                <span className="text-xs font-mono font-bold text-emerald-400">{selectedTool.precisionRating}</span>
              </div>
            </div>

            {/* Purpose & Why it matters */}
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Diagnostic Purpose</div>
                <p className="text-xs text-slate-200 leading-relaxed font-medium">
                  {selectedTool.purpose}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* VELS Advantage */}
                <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-300 uppercase">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Why VELS Uses This:</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed">
                    {selectedTool.whyItMatters}
                  </p>
                </div>

                {/* Local Market Habit */}
                <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 uppercase">
                    <Sliders className="w-4 h-4" />
                    <span>Uncertified Market Guesswork:</span>
                  </div>
                  <p className="text-xs text-rose-200/80 leading-relaxed">
                    {selectedTool.whatLocalMechanicsDoInstead}
                  </p>
                </div>
              </div>

              {/* Tested Parameters */}
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                  Parameters Verified with this Instrument at Your Doorstep:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {selectedTool.testedParameters.map((param, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-cyan-300 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{param}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={() => onOpenBookingModal("Precision Check", selectedTool.name)}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule ₹500 Doorstep Check with Certified Instruments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
