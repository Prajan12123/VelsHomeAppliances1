import React, { useState } from "react";
import {
  BadgeIndianRupee,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { COMPANY_DETAILS } from "../data";

interface ServicePreset {
  name: string;
  appliance: string;
  partsRange: string;
  typicalTotal: string;
  included: string[];
}

export const ContactCostEstimator: React.FC<{
  onSelectService: (appliance: string, service: string) => void;
}> = ({ onSelectService }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Air Conditioner");

  const estimates: Record<string, ServicePreset[]> = {
    "Air Conditioner": [
      {
        name: "General Inspection & Performance Audit",
        appliance: "Air Conditioner",
        partsRange: "₹0 (No parts needed)",
        typicalTotal: "₹500 Flat",
        included: ["Filter & grill cleaning", "Gas pressure check", "Current draw test", "6-month guarantee & warranty"],
      },
      {
        name: "High-Pressure Foam Jet Deep Cleaning",
        appliance: "Air Conditioner",
        partsRange: "₹400 – ₹700 (Specialized foam & jacket)",
        typicalTotal: "₹900 – ₹1,200",
        included: ["Indoor evaporator coil jet wash", "Outdoor condenser deep blast", "Drain pan anti-fungal flush", "Odor neutralization"],
      },
      {
        name: "Gas Refilling (R32 / R410a / R22) & Leak Sealing",
        appliance: "Air Conditioner",
        partsRange: "₹1,500 – ₹2,400 (Virgin 100% pure gas)",
        typicalTotal: "₹2,000 – ₹2,900",
        included: ["Nitrogen pressure hold test", "Flare nut brazing & leak sealing", "Deep vacuuming (below 500 microns)", "Weighing scale gas charging"],
      },
      {
        name: "Inverter PCB Motherboard Repair",
        appliance: "Air Conditioner",
        partsRange: "₹1,200 – ₹2,800 (IC / IPM module)",
        typicalTotal: "₹1,700 – ₹3,300",
        included: ["Micro-soldering & IPM testing", "Power surge diode replacement", "Moisture-proof conformal coating", "6-Month PCB warranty"],
      },
    ],
    "Refrigerator": [
      {
        name: "Cooling Failure & Diagnostic Visit",
        appliance: "Refrigerator",
        partsRange: "₹0 (Initial check & sensor clean)",
        typicalTotal: "₹500 Flat",
        included: ["Thermostat calibration", "Door gasket suction test", "Compressor relay health check", "6-month guarantee & warranty"],
      },
      {
        name: "Defrost Sensor & Bi-Metal Heater Replacement",
        appliance: "Refrigerator",
        partsRange: "₹650 – ₹1,200 (Original brand sensor)",
        typicalTotal: "₹1,150 – ₹1,700",
        included: ["Thermal fuse replacement", "Evaporator ice de-clogging", "Timer / PCB defrost cycle sync", "Original OEM spares"],
      },
      {
        name: "Inverter Compressor Replacement & Gas Charging",
        appliance: "Refrigerator",
        partsRange: "₹3,500 – ₹5,800 (Brand original)",
        typicalTotal: "₹4,000 – ₹6,300",
        included: ["Direct factory compressor replacement", "Copper filter drier installation", "R600a / R134a precision gas charge", "1-Year compressor warranty"],
      },
    ],
    "Washing Machine": [
      {
        name: "Drainage / Noise Inspection & Diagnostic",
        appliance: "Washing Machine",
        partsRange: "₹0 (Check, lint removal & leveling)",
        typicalTotal: "₹500 Flat",
        included: ["Coin trap / pump unclogging", "Suspension rod spring balance", "Inlet valve mesh cleaning", "6-month guarantee & warranty"],
      },
      {
        name: "Drain Pump or Inlet Solenoid Valve Replacement",
        appliance: "Washing Machine",
        partsRange: "₹750 – ₹1,400 (Factory-sealed OEM)",
        typicalTotal: "₹1,250 – ₹1,900",
        included: ["Original high-torque drain pump", "Anti-siphon pipe check", "Water level pressure sensor check", "6-Month parts warranty"],
      },
      {
        name: "Drum Bearing & Spider Hub Overhaul",
        appliance: "Washing Machine",
        partsRange: "₹1,800 – ₹3,200 (German SKF bearings)",
        typicalTotal: "₹2,300 – ₹3,700",
        included: ["Heavy-duty bearing & oil seal kit", "High-speed spin balance calibration", "Tub descaling & sanitization", "6-Month bearing guarantee"],
      },
    ],
    "LED / Smart TV": [
      {
        name: "No Display / Audio Only Diagnostic",
        appliance: "Television",
        partsRange: "₹0 (Backlight & T-Con probe)",
        typicalTotal: "₹500 Flat",
        included: ["Power supply rail testing", "T-Con LVDS cable reseating", "Software firmware refresh check", "6-month guarantee & warranty"],
      },
      {
        name: "LED Backlight Strip Array Replacement",
        appliance: "Television",
        partsRange: "₹1,200 – ₹2,600 (Full original array)",
        typicalTotal: "₹1,700 – ₹3,100",
        included: ["Uniform luminance LED bar replacement", "Diffuser sheet alignment", "Thermal paste reapplication", "6-Month backlight warranty"],
      },
    ],
  };

  const currentPresets = estimates[selectedCategory] || estimates["Air Conditioner"];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-4">
          <BadgeIndianRupee className="w-3.5 h-3.5" />
          <span>100% Upfront Pricing Transparency</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          Transparent Cost Calculator & Estimate Guide
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          No hidden fees or post-service surprises. Our basic visiting and diagnostic fee is strictly <strong className="text-cyan-300 font-bold">₹500</strong>. See typical cost benchmarks below before booking.
        </p>
      </div>

      {/* Appliance Category Selector Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
        {Object.keys(estimates).map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                : "bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Estimate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {currentPresets.map((preset, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                  {preset.appliance}
                </span>
                <span className="text-sm sm:text-base font-extrabold font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-xl">
                  {preset.typicalTotal}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white font-['Manrope'] mb-2 group-hover:text-cyan-200 transition-colors">
                {preset.name}
              </h3>

              <div className="text-xs text-slate-400 mb-4 pb-3 border-b border-white/5 flex items-center justify-between">
                <span>Spare Parts MRP Range:</span>
                <span className="font-mono font-semibold text-slate-200">{preset.partsRange}</span>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Includes in this service:
                </div>
                {preset.included.map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Visiting Fee: ₹500 Incl.
              </span>
              <button
                onClick={() => onSelectService(preset.appliance, preset.name)}
                className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-400 text-cyan-300 hover:text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Select & Book →
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Pay ₹500 diagnostic fee only after our technician finishes inspection at your home.</span>
        </div>
        <div className="font-mono text-cyan-300 font-bold">
          Zero Advance Payment • 6-Month Guarantee & Warranty
        </div>
      </div>
    </section>
  );
};
