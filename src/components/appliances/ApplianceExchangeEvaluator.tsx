import React, { useState } from "react";
import {
  RotateCcw,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  Truck,
  MessageCircle,
} from "lucide-react";
import { COMPANY_DETAILS } from "../../data";

interface ApplianceTypeOption {
  id: string;
  name: string;
  icon: string;
  baseExchangeBonus: number;
}

const APPLIANCE_TYPES: ApplianceTypeOption[] = [
  { id: "ac", name: "Old Split / Window AC", icon: "❄️", baseExchangeBonus: 4500 },
  { id: "fridge", name: "Old Single / Double Door Refrigerator", icon: "🧊", baseExchangeBonus: 3500 },
  { id: "washing", name: "Old Washing Machine (Semi / Auto)", icon: "🌀", baseExchangeBonus: 2800 },
  { id: "tv", name: "Old CRT / LCD / LED Television", icon: "📺", baseExchangeBonus: 2200 },
];

const WORKING_CONDITIONS = [
  { id: "perfect", label: "Fully Working Condition", multiplier: 1.25, note: "All functions and compressor/motor running normally" },
  { id: "minor", label: "Working with Minor Issues", multiplier: 1.0, note: "Cooling slow, light noise, or minor cosmetic wear" },
  { id: "dead", label: "Dead / Non-Working Unit", multiplier: 0.75, note: "Not turning on, burnt PCB, or scrap condition" },
];

const AGE_RANGES = [
  { id: "1-3", label: "1 to 3 Years Old", bonusAddition: 800 },
  { id: "4-7", label: "4 to 7 Years Old", bonusAddition: 400 },
  { id: "8+", label: "8+ Years Old", bonusAddition: 0 },
];

interface ApplianceExchangeEvaluatorProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const ApplianceExchangeEvaluator: React.FC<ApplianceExchangeEvaluatorProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedType, setSelectedType] = useState<string>("ac");
  const [selectedCondition, setSelectedCondition] = useState<string>("minor");
  const [selectedAge, setSelectedAge] = useState<string>("4-7");

  const currentType = APPLIANCE_TYPES.find((t) => t.id === selectedType) || APPLIANCE_TYPES[0];
  const currentCondition = WORKING_CONDITIONS.find((c) => c.id === selectedCondition) || WORKING_CONDITIONS[1];
  const currentAge = AGE_RANGES.find((a) => a.id === selectedAge) || AGE_RANGES[1];

  // Calculate estimated exchange credit
  const calculatedCredit = Math.round(
    currentType.baseExchangeBonus * currentCondition.multiplier + currentAge.bonusAddition
  );

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#120e05] via-[#1a1407] to-[#0a0702] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Old Appliance Trade-In Program</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            Instant Old Appliance Exchange Value Estimator
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Upgrade your outdated, power-hungry machine to a 5-Star Smart Appliance. We offer doorstep evaluation, free removal of your old unit, and instant exchange credits toward any brand-new purchase.
          </p>
        </div>

        {/* 2-Column Calculator Form & Live Voucher */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Form Selectors */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Select Old Appliance Type */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Select Old Appliance to Trade-In:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {APPLIANCE_TYPES.map((type) => {
                  const isSelected = type.id === selectedType;
                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`p-3 rounded-xl text-left transition-all border cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md font-bold"
                          : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-amber-400/40"
                      }`}
                    >
                      <span className="text-2xl mb-1">{type.icon}</span>
                      <span className="text-xs font-bold leading-tight">{type.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Working Condition */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                2. Current Operating Condition:
              </label>
              <div className="space-y-2">
                {WORKING_CONDITIONS.map((cond) => {
                  const isSelected = cond.id === selectedCondition;
                  return (
                    <button
                      key={cond.id}
                      onClick={() => setSelectedCondition(cond.id)}
                      className={`w-full p-3.5 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-amber-950/70 border-amber-400 text-white shadow-md"
                          : "bg-white/[0.02] border-white/10 text-slate-300 hover:border-white/20"
                      }`}
                    >
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-white">
                          {cond.label}
                        </div>
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {cond.note}
                        </div>
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Age Range */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                3. Approximate Age of Appliance:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {AGE_RANGES.map((age) => {
                  const isSelected = age.id === selectedAge;
                  return (
                    <button
                      key={age.id}
                      onClick={() => setSelectedAge(age.id)}
                      className={`p-3 rounded-xl text-center text-xs font-bold transition-all border cursor-pointer ${
                        isSelected
                          ? "bg-amber-400 text-slate-950 border-amber-300 shadow-md"
                          : "bg-white/[0.03] text-slate-300 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {age.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Instant Live Exchange Voucher */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-2xl border border-amber-500/40 bg-[#161005] flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div>
                  <div className="text-[11px] font-bold text-amber-300 uppercase tracking-widest">
                    Trade-In Valuation Voucher
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Valid across all VELS Showroom Brands
                  </div>
                </div>
                <Tag className="w-5 h-5 text-amber-400" />
              </div>

              {/* Big Estimated Exchange Discount */}
              <div className="text-center p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-5">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                  Estimated Upgrade Trade-In Discount
                </div>
                <div className="text-4xl sm:text-5xl font-black font-mono text-amber-300 mb-1">
                  ₹{calculatedCredit.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-emerald-400 font-semibold">
                  + Free Doorstep Removal & Delivery in Avinashi
                </div>
              </div>

              {/* Inclusions */}
              <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Free pick-up of old appliance during new unit delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Instant deduction on new 5-Star Inverter purchase</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Applicable on LG, Samsung, Whirlpool, IFB, Bosch, Voltas & Godrej</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-4 border-t border-white/10">
              <button
                onClick={() =>
                  onOpenBookingModal(
                    `Exchange Upgrade: ${currentType.name}`,
                    `Old Appliance Trade-In Estimated Discount: ₹${calculatedCredit.toLocaleString("en-IN")} (${currentCondition.label}, ${currentAge.label})`
                  )
                }
                className="w-full py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim ₹{calculatedCredit.toLocaleString("en-IN")} Exchange Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20want%20to%20exchange%20my%20${encodeURIComponent(
                  currentType.name
                )}%20(${encodeURIComponent(currentCondition.label)}).%20Estimated%20Credit:%20₹${calculatedCredit}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>Send Photo of Old Appliance on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
