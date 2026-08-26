import React, { useState } from "react";
import {
  Cpu,
  CheckCircle2,
  XCircle,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

interface TechComparison {
  id: string;
  appliance: string;
  modernTech: {
    title: string;
    subtitle: string;
    pros: string[];
    powerSaving: string;
    noiseLevel: string;
    lifespan: string;
  };
  traditionalTech: {
    title: string;
    subtitle: string;
    cons: string[];
    powerSaving: string;
    noiseLevel: string;
    lifespan: string;
  };
}

const TECH_COMPARISONS: TechComparison[] = [
  {
    id: "ac-tech",
    appliance: "Air Conditioner Technology",
    modernTech: {
      title: "AI Dual Inverter Climate Control",
      subtitle: "Variable speed twin-rotary compressor with sub-zero copper cooling",
      pros: [
        "Compressor modulates frequency dynamically from 10% to 110% load",
        "Reaches set temperature in under 45 seconds without room hot spots",
        "Microprocessor maintains room temperature within ±0.5°C fluctuation",
        "Consistently operates even during low voltage down to 145V without stabilizer",
      ],
      powerSaving: "Saves up to 45% electricity",
      noiseLevel: "Ultra-Quiet: 19–24 dB (Whisper Silent)",
      lifespan: "12–15+ Years (10-Yr Brand Warranty)",
    },
    traditionalTech: {
      title: "Non-Inverter Fixed Speed AC",
      subtitle: "Older single-speed motor that constantly turns ON and OFF",
      cons: [
        "Compressor runs at 100% full power whenever ON, causing huge electric spikes",
        "Room cycles between freezing cold and uncomfortably humid (±3°C swing)",
        "Frequent ON/OFF starting surges cause mechanical wear on relays",
        "Requires external heavy voltage stabilizer to avoid motor burnouts",
      ],
      powerSaving: "High Power Consumption (BEE 2/3 Star)",
      noiseLevel: "Loud: 42–48 dB (Heavy hum)",
      lifespan: "6–8 Years with high maintenance",
    },
  },
  {
    id: "wash-tech",
    appliance: "Washing Machine Drive System",
    modernTech: {
      title: "AI Direct Drive™ (Inverter Motor)",
      subtitle: "Motor is mounted directly to the drum without belts or pulleys",
      pros: [
        "6 Motion DD creates multi-directional gentle water cascades for silk & wool",
        "AI sensors detect fabric softness & load weight to adjust wash patterns",
        "Zero belt friction means near-zero mechanical wear and zero belt snaps",
        "Steam Allergy Care eliminates 99.9% dust mites and micro-allergens",
      ],
      powerSaving: "5-Star BEE + 30% Water Savings",
      noiseLevel: "Smooth & Low Vibration (48 dB Spin)",
      lifespan: "10-Year Direct Drive Motor Guarantee",
    },
    traditionalTech: {
      title: "Conventional Belt-Driven Motor",
      subtitle: "Motor connected via rubber pulleys and tension belts",
      cons: [
        "Rubber belt stretches, slips, and eventually snaps over 2–3 years",
        "High friction creates strong vibration and 'walking' during spin cycles",
        "Single fixed agitation motion is harsh on delicate shirts and sarees",
        "Consumes significantly more water to rinse detergent residue",
      ],
      powerSaving: "Standard 3-Star Power Efficiency",
      noiseLevel: "Rattling: 65–72 dB during spin",
      lifespan: "Frequent belt & pulley replacements",
    },
  },
  {
    id: "fridge-tech",
    appliance: "Refrigeration Compressor",
    modernTech: {
      title: "Smart Inverter Linear Compressor",
      subtitle: "Linear piston drive with just 1 friction point",
      pros: [
        "Reduces internal temperature fluctuations to keep farm veggies crisp for 14+ days",
        "Even DoorCooling+ vents blast cold air into door racks for milk & juices",
        "Runs on solar power and home UPS systems during power cuts",
        "Multi Air Flow ducts ensure zero ice crystallization on fresh foods",
      ],
      powerSaving: "Saves up to 35% on refrigerator load",
      noiseLevel: "Silent Operation (28 dB)",
      lifespan: "20-Year Certified Linear Durability",
    },
    traditionalTech: {
      title: "Reciprocating Standard Compressor",
      subtitle: "Standard mechanical crank drive with multiple friction points",
      cons: [
        "Internal temperature drops abruptly when compressor kicks on, freezing greens",
        "High friction points generate excessive cabinet heat and waste electricity",
        "Prone to defrost drain blockages and lower compartment warming",
        "Cannot run on standard home inverters due to high initial startup amperage",
      ],
      powerSaving: "High continuous baseline draw",
      noiseLevel: "Noticeable: 42–46 dB humming",
      lifespan: "7–10 Years before gas leakage/motor wear",
    },
  },
];

interface ApplianceTechComparisonProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const ApplianceTechComparison: React.FC<ApplianceTechComparisonProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedTechId, setSelectedTechId] = useState<string>("ac-tech");

  const currentTech =
    TECH_COMPARISONS.find((t) => t.id === selectedTechId) || TECH_COMPARISONS[0];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060c20] via-[#08122a] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Next-Gen Engineering Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            Modern Smart Tech vs. Older Conventional Units
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Understand why modern Inverter Linear refrigeration, Dual Inverter climate control, and AI Direct Drive washing machines deliver massive electricity savings and silent operation.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {TECH_COMPARISONS.map((tech) => {
            const isSelected = tech.id === selectedTechId;
            return (
              <button
                key={tech.id}
                onClick={() => setSelectedTechId(tech.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                {tech.appliance}
              </button>
            );
          })}
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-8">
          {/* Left: Modern Tech (Positive) */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-gradient-to-b from-[#07152b] to-[#050e1e] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-cyan-500/30 mb-4">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                    Available in VELS Showroom
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {currentTech.modernTech.title}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950 font-black text-xs">
                  5-Star BEE
                </div>
              </div>

              <p className="text-xs text-cyan-200 mb-5 leading-relaxed">
                {currentTech.modernTech.subtitle}
              </p>

              {/* Pros list */}
              <div className="space-y-2.5 mb-6">
                {currentTech.modernTech.pros.map((pro, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{pro}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Power Efficiency</div>
                  <div className="text-xs font-bold text-emerald-400 mt-0.5">{currentTech.modernTech.powerSaving}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Acoustics</div>
                  <div className="text-xs font-bold text-cyan-300 mt-0.5">{currentTech.modernTech.noiseLevel}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">Durability</div>
                  <div className="text-xs font-bold text-white mt-0.5">{currentTech.modernTech.lifespan}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Traditional Tech (Negative) */}
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                    Older Conventional Model
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-200 mt-0.5">
                    {currentTech.traditionalTech.title}
                  </h3>
                </div>
                <div className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-bold text-xs">
                  Older Tech
                </div>
              </div>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                {currentTech.traditionalTech.subtitle}
              </p>

              {/* Cons list */}
              <div className="space-y-2.5 mb-6">
                {currentTech.traditionalTech.cons.map((con, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <XCircle className="w-4 h-4 text-rose-400/80 shrink-0 mt-0.5" />
                    <span>{con}</span>
                  </div>
                ))}
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/5 text-center">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Power Efficiency</div>
                  <div className="text-xs font-semibold text-rose-400 mt-0.5">{currentTech.traditionalTech.powerSaving}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Acoustics</div>
                  <div className="text-xs font-semibold text-slate-300 mt-0.5">{currentTech.traditionalTech.noiseLevel}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase">Durability</div>
                  <div className="text-xs font-semibold text-slate-400 mt-0.5">{currentTech.traditionalTech.lifespan}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
