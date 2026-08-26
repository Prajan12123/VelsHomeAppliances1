import React, { useState } from "react";
import { Calculator, Zap, ShieldCheck, TrendingUp, Sparkles, ArrowRight } from "lucide-react";

interface HomeSavingsCalculatorProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const HomeSavingsCalculator: React.FC<HomeSavingsCalculatorProps> = ({
  onOpenBookingModal,
}) => {
  const [applianceCount, setApplianceCount] = useState<number>(4);
  const [applianceAge, setApplianceAge] = useState<number>(3);
  const [maintenanceFrequency, setMaintenanceFrequency] = useState<"annual" | "bi-annual" | "rarely">("rarely");

  // Calculations
  // Clean coils & proper gas pressure save approx 18-25% electricity per AC/Fridge per year
  // In Avinashi/Tirupur, average AC consumes ~1,200 units/year; Fridge ~450 units/year.
  // Power cost = ₹7.5 / unit.
  const baseUnitsPerAppliance = 550;
  const powerUnitRate = 7.5;
  
  let efficiencyLossPercent = 0.08 * applianceAge;
  if (maintenanceFrequency === "rarely") {
    efficiencyLossPercent += 0.15;
  } else if (maintenanceFrequency === "annual") {
    efficiencyLossPercent += 0.05;
  }

  const yearlyWastedUnits = Math.round(applianceCount * baseUnitsPerAppliance * efficiencyLossPercent);
  const yearlyWastedMoney = Math.round(yearlyWastedUnits * powerUnitRate);
  const lifespanExtensionYears = maintenanceFrequency === "bi-annual" ? 5 : maintenanceFrequency === "annual" ? 3 : 1;
  const replacementCostAvoided = applianceCount * 4500;

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#060e1d] via-[#051525] to-[#040815] shadow-2xl relative overflow-hidden">
        {/* Glow background */}
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Interactive Controls */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Smart Cost & Life Calculator</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope'] mb-2">
              How Much Can Regular ₹500 Servicing Save You?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
              Dirty filters, choked condenser coils, and low refrigerant gas force compressors to draw 25–40% more current. Calculate your home's yearly power savings:
            </p>

            {/* Slider 1: Total Appliances */}
            <div className="mb-5 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300">
                  Number of Major Appliances (AC, Fridge, Washing Machine, TV)
                </label>
                <span className="text-base font-black font-mono text-cyan-300">
                  {applianceCount} Appliances
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={applianceCount}
                onChange={(e) => setApplianceCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>1 Unit</span>
                <span>5 Units</span>
                <span>10+ Units</span>
              </div>
            </div>

            {/* Slider 2: Average Age */}
            <div className="mb-5 bg-white/[0.03] p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-300">
                  Average Age of Your Appliances
                </label>
                <span className="text-base font-black font-mono text-emerald-300">
                  {applianceAge} {applianceAge === 1 ? "Year" : "Years"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={applianceAge}
                onChange={(e) => setApplianceAge(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>1 Year (New)</span>
                <span>5 Years</span>
                <span>10 Years (Vintage)</span>
              </div>
            </div>

            {/* Selector 3: Maintenance Habit */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2">
                Your Current Service Routine:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: "rarely", label: "Only When Broken" },
                  { key: "annual", label: "Once a Year" },
                  { key: "bi-annual", label: "Every 6 Months" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMaintenanceFrequency(item.key as any)}
                    className={`py-2 px-2.5 rounded-xl text-[11px] font-bold transition-all border text-center cursor-pointer ${
                      maintenanceFrequency === item.key
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-400 shadow-md"
                        : "bg-white/[0.02] text-slate-400 border-white/10 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Calculated Savings Card */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-400/40 bg-gradient-to-br from-[#081b28] to-[#040e1b] shadow-2xl relative">
              <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>Estimated Annual Value Impact</span>
              </div>
              <div className="text-xs text-slate-300 mb-6">
                Based on TNEB tariff rates & real-world thermal efficiency data in Avinashi.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Yearly Power Bill Saved</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono">
                    ₹{yearlyWastedMoney.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-emerald-400 font-semibold mt-1">
                    ~{yearlyWastedUnits} kWh electricity saved
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Lifespan Extended By</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-cyan-300 font-mono">
                    +{lifespanExtensionYears} Years
                  </div>
                  <div className="text-[10px] text-slate-300 font-semibold mt-1">
                    Prevents sudden compressor death
                  </div>
                </div>
              </div>

              {/* Breakdown Note */}
              <div className="p-3.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/30 mb-6 flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-xs text-emerald-200/90 leading-relaxed">
                  Regular ₹500 seasonal servicing prevents expensive ₹8,000+ compressor coil burnout and keeps cooling at peak sub-zero efficiency.
                </p>
              </div>

              <button
                onClick={() =>
                  onOpenBookingModal(
                    "Energy Efficiency Tune-Up",
                    "Full Jet Cleaning & Efficiency Diagnostic"
                  )
                }
                className="w-full py-3.5 px-6 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(52,211,153,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book ₹500 Efficiency Check</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
