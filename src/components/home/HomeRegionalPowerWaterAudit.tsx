import React, { useState } from "react";
import {
  Droplets,
  Zap,
  Wind,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";

interface RegionalFactor {
  id: string;
  title: string;
  category: string;
  regionFocus: string;
  level: string;
  levelColor: string;
  icon: any;
  problemSummary: string;
  appliancesAffected: string[];
  velsEngineeringRemedy: string;
  estimatedAnnualSavings: string;
}

const REGIONAL_FACTORS: RegionalFactor[] = [
  {
    id: "water-hardness",
    title: "High Hard Water Mineral & Limescale Deposition",
    category: "Water Quality (TDS 650–1,200 PPM)",
    regionFocus: "Avinashi Town, Sevur, Annur & Kaniyur",
    level: "High Limescale Impact",
    levelColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    icon: Droplets,
    problemSummary: "Calcium and magnesium carbonates solidify over washing machine heaters, geyser heating rods, and dishwasher solenoid valves, causing 40% slower heating and heating element burnout in 12–18 months.",
    appliancesAffected: ["Front/Top Load Washers", "Water Geysers", "Dishwashers"],
    velsEngineeringRemedy: "Heavy-duty Food-Grade Citric De-scaling Protocol + Polyphosphate In-line Scale Filter Attachment (Prevents 98% Limescale).",
    estimatedAnnualSavings: "₹3,500 / year on electricity & heater spares",
  },
  {
    id: "voltage-surges",
    title: "Fluctuating Grid Voltages & Lightning Spike Transients",
    category: "Electrical Grid (160V to 295V Fluctuations)",
    regionFocus: "Industrial Tiruppur, Perumanallur & Rural Belts",
    level: "Critical Motherboard Risk",
    levelColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    icon: Zap,
    problemSummary: "Sudden motor starts at nearby textile weaving/knitting mills inject heavy harmonic noise and over-voltage spikes that fry unprotected Smart TV SMPS circuits and Inverter AC/Fridge outdoor IPM chips.",
    appliancesAffected: ["Inverter ACs", "Inverter Fridges", "4K OLED/LED TVs"],
    velsEngineeringRemedy: "Metal Oxide Varistor (MOV) High-Surge Suppression Clamping + Conformal Silicone PCB Moisture & Surge Seal.",
    estimatedAnnualSavings: "₹8,000+ per avoided motherboard replacement",
  },
  {
    id: "textile-lint",
    regionFocus: "Tiruppur Export Belts, Rayapuram & Avinashi Bypass",
    title: "Micro-Fiber Textile Lint & Cotton Dust Airway Choke",
    category: "Atmospheric Particulate Load",
    level: "High Airflow Restriction",
    levelColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    icon: Wind,
    problemSummary: "Microscopic airborne textile lint adheres to wet evaporator fins and blower fan wheels of Air Conditioners, forming a dense felt mat that suffocates airflow, causes ice formation, and spikes power bills by 35%.",
    appliancesAffected: ["Split Inverter ACs", "Air Purifiers", "Kitchen Chimneys"],
    velsEngineeringRemedy: "45-Bar High-Pressure Foam Jet Deep Cleaning with Anti-Bacterial Bio-Enzyme Flush and Hydrophobic Fin Shielding.",
    estimatedAnnualSavings: "₹4,200 / year on AC electricity consumption",
  },
];

interface HomeRegionalPowerWaterAuditProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
}

export const HomeRegionalPowerWaterAudit: React.FC<HomeRegionalPowerWaterAuditProps> = ({
  onOpenBookingModal,
}) => {
  const [activeFactor, setActiveFactor] = useState<RegionalFactor>(REGIONAL_FACTORS[0]);

  const Icon = activeFactor.icon;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <MapPin className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exclusive Regional Intelligence</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Avinashi & Tiruppur Environmental Appliance Protection Guide
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          How local hard borewell water, textile fiber dust, and rural voltage fluctuations impact your appliances — and how VELS engineers protect them.
        </p>
      </div>

      {/* Factor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {REGIONAL_FACTORS.map((factor) => {
          const isSelected = activeFactor.id === factor.id;
          const FactorIcon = factor.icon;
          return (
            <button
              key={factor.id}
              onClick={() => setActiveFactor(factor)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? "bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_25px_rgba(0,229,255,0.2)]"
                  : "glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400" />
              )}

              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                        : "bg-white/5 text-slate-400 border border-white/10"
                    }`}
                  >
                    <FactorIcon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-bold ${factor.levelColor}`}>
                    {factor.level}
                  </span>
                </div>

                <div className="text-[10px] font-mono uppercase text-cyan-400 font-bold mb-1">
                  {factor.category}
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors mb-2">
                  {factor.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate">{factor.regionFocus}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Factor Deep-Dive Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-slate-900/90 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase mb-1">
                <span>{activeFactor.category}</span>
                <span>•</span>
                <span className="text-slate-300">{activeFactor.regionFocus}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope']">
                {activeFactor.title}
              </h3>
            </div>

            {/* Problem Breakdown */}
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-200/90 leading-relaxed">
              <div className="font-bold text-rose-300 uppercase font-mono mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Regional Threat to Local Appliances:</span>
              </div>
              {activeFactor.problemSummary}
            </div>

            {/* VELS Engineering Solution */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-slate-200 leading-relaxed space-y-1.5">
              <div className="font-bold text-emerald-300 uppercase font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>VELS Specialized Preventive Engineering Protocol:</span>
              </div>
              <p>{activeFactor.velsEngineeringRemedy}</p>
            </div>

            {/* Impacted Appliances Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Most Affected:</span>
              {activeFactor.appliancesAffected.map((app, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-cyan-300 font-mono font-semibold"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-4 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-5 text-center">
            <div>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Preventive Value Generated
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono mt-1">
                {activeFactor.estimatedAnnualSavings}
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Measured across 1,400+ Avinashi & Tiruppur serviced households.
              </p>
            </div>

            <button
              onClick={() => onOpenBookingModal("Preventive Service", activeFactor.title)}
              className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer"
            >
              <span>Book Preventive Protection Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
