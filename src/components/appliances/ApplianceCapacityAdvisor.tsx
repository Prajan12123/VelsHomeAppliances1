import React, { useState } from "react";
import {
  Compass,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Layers,
  ThermometerSnowflake,
  Refrigerator,
  Tv,
  RotateCw,
} from "lucide-react";

interface CapacityAdvisorItem {
  id: string;
  category: "ac" | "fridge" | "washing" | "tv";
  title: string;
  icon: string;
  selectorLabel: string;
  options: {
    label: string;
    description: string;
    recommendedSpec: string;
    recommendedModel: string;
    powerBenefit: string;
    idealFor: string;
  }[];
}

const ADVISOR_DATA: CapacityAdvisorItem[] = [
  {
    id: "ac",
    category: "ac",
    title: "Air Conditioner Tonnage Matcher",
    icon: "❄️",
    selectorLabel: "Select your Room Area / Floor Type:",
    options: [
      {
        label: "Small Bedroom (Up to 120 sq.ft)",
        description: "Standard bedroom on ground/middle floor with normal sunlight.",
        recommendedSpec: "1.0 Ton 5-Star Dual Inverter Split AC",
        recommendedModel: "Voltas / Blue Star 1.0T 5-Star Adjustable Inverter AC",
        powerBenefit: "Consumes ~500–650 Watts/hr; saves up to 40% power.",
        idealFor: "Individual bedrooms, study rooms, home offices.",
      },
      {
        label: "Master Bedroom / Living Room (120–180 sq.ft)",
        description: "Standard master bedroom or mid-sized living area with standard ceiling height.",
        recommendedSpec: "1.5 Ton 5-Star Inverter Split AC with AI Convertible",
        recommendedModel: "Samsung WindFree™ / LG AI Dual Inverter 1.5T 5-Star AC",
        powerBenefit: "Optimal cooling velocity in 45 seconds with 6-in-1 capacity scaling.",
        idealFor: "3–4 person family master suites and living lounges.",
      },
      {
        label: "Large Hall or Top Floor / Direct Sun (180–280 sq.ft)",
        description: "Spacious hall, dining hall, or top-floor room with high sun exposure.",
        recommendedSpec: "2.0 Ton Heavy-Duty Inverter Split AC with BlueFin",
        recommendedModel: "O General / Hitachi Tropical Heavy-Duty 2.0T Inverter AC",
        powerBenefit: "High-CFM blower guarantees 18°C chill even in 52°C peak summer.",
        idealFor: "Open floor plan living rooms, top-floor apartments, duplexes.",
      },
    ],
  },
  {
    id: "fridge",
    category: "fridge",
    title: "Refrigerator Capacity & Type Advisor",
    icon: "🧊",
    selectorLabel: "Select your Household Size & Cooking Style:",
    options: [
      {
        label: "1 to 2 Members (Compact Household)",
        description: "Small family, bachelor pad, or secondary utility kitchen.",
        recommendedSpec: "190L – 220L 5-Star Direct Cool Refrigerator",
        recommendedModel: "Godrej Edge Pro / Samsung 215L Single Door 5-Star",
        powerBenefit: "Consumes less than 130 kWh/year; operates on home inverter.",
        idealFor: "Daily fresh cooking with moderate frozen food storage.",
      },
      {
        label: "3 to 4 Members (Standard Family)",
        description: "Regular family with weekly vegetable stocking and beverage storage.",
        recommendedSpec: "260L – 380L 5-Star Frost-Free Double Door",
        recommendedModel: "Whirlpool Intellifresh / Haier 345L Bottom Mounted Inverter",
        powerBenefit: "Even cooling vents on each shelf; auto-defrost convenience.",
        idealFor: "Weekly batch shoppers, regular dairy & fresh food prep.",
      },
      {
        label: "5+ Members / Large Joint Family",
        description: "Large joint family, frequent entertainers, or heavy freezer demand.",
        recommendedSpec: "550L – 680L French Door / Side-by-Side Inverter",
        recommendedModel: "LG InstaView DoorCooling+ / Samsung 674L French Door",
        powerBenefit: "Smart Inverter Linear Compressor; dual independent cooling zones.",
        idealFor: "Bulk grocery preservation, dual ice makers, smart door display.",
      },
    ],
  },
  {
    id: "washing",
    category: "washing",
    title: "Washing Machine Load & Drum Selector",
    icon: "🌀",
    selectorLabel: "Select your Daily Laundry Load & Blanket Needs:",
    options: [
      {
        label: "1 to 2 People (Light Daily Wash)",
        description: "Daily light clothing, shirts, and casual wear.",
        recommendedSpec: "6.5 Kg – 7.0 Kg Fully Automatic Top Load",
        recommendedModel: "Panasonic / Whirlpool 7.0 Kg Smart Inverter Top Load",
        powerBenefit: "Fast 28-min express wash; low water level auto-sensor.",
        idealFor: "Compact spaces, quick daily laundry turnarounds.",
      },
      {
        label: "3 to 4 People (Medium Family + Bed Linens)",
        description: "Mixed daily family clothes, school uniforms, and weekly bedsheets.",
        recommendedSpec: "8.0 Kg Front Load with AI Direct Drive & In-built Heater",
        recommendedModel: "IFB Senator Plus 8.0 Kg / LG AI Direct Drive Front Load",
        powerBenefit: "Steam hygiene cycle removes 99.9% allergens; saves 40% water.",
        idealFor: "Fabric care, delicate silks, office wear, and heavy cottons.",
      },
      {
        label: "5+ People (Heavy Loads, Curtains & King Blankets)",
        description: "Heavy multi-batch laundry, double blankets, towels, and curtains.",
        recommendedSpec: "9.0 Kg – 10.5 Kg AI Direct Drive Front Load / Washer Dryer",
        recommendedModel: "Bosch Serie 8 9.0 Kg ActiveOxygen / Samsung EcoBubble Front Load",
        powerBenefit: "6 Motion DD technology gently washes bulky comforters without vibration.",
        idealFor: "High-capacity all-in-one laundry care for joint families.",
      },
    ],
  },
  {
    id: "tv",
    category: "tv",
    title: "Smart TV Display & Viewing Distance Matcher",
    icon: "📺",
    selectorLabel: "Select your Room Viewing Distance:",
    options: [
      {
        label: "5 to 7 Feet (Bedroom / Small Den)",
        description: "Cozy bedroom seating or compact entertainment alcove.",
        recommendedSpec: "43\" 4K UHD Smart Bezel-Less LED TV",
        recommendedModel: "Samsung Crystal 4K / LG 43\" UHD Smart WebOS TV",
        powerBenefit: "Ultra HD clarity with HDR10+ and Dolby Audio 24W.",
        idealFor: "Bedrooms, guest suites, compact home gaming setups.",
      },
      {
        label: "7 to 10 Feet (Standard Living Room)",
        description: "Standard family sofa distance in modern apartments and villas.",
        recommendedSpec: "55\" 4K QLED / OLED 120Hz Smart Cinema TV",
        recommendedModel: "Panasonic Master OLED 55\" / Samsung QLED 4K Display",
        powerBenefit: "Wide viewing angle, immersive Dolby Atmos, and low blue-light eye comfort.",
        idealFor: "Family movie nights, live cricket/sports, 4K streaming.",
      },
      {
        label: "10+ Feet (Spacious Hall / Dedicated Home Theatre)",
        description: "Large living room, home theatre room, or executive suite.",
        recommendedSpec: "65\" – 75\" Cinema 4K OLED / Quantum Dot Display",
        recommendedModel: "LG OLED evo 65\" / Samsung Neo QLED 65\" 4K Cinema TV",
        powerBenefit: "Infinite contrast, self-lit pixels, 60W theatre acoustics with subwoofers.",
        idealFor: "Cinematic grandeur, IMAX Enhanced streaming, console gaming.",
      },
    ],
  },
];

interface ApplianceCapacityAdvisorProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ApplianceCapacityAdvisor: React.FC<ApplianceCapacityAdvisorProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("ac");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number>(1);

  const currentItem =
    ADVISOR_DATA.find((item) => item.category === selectedCategory) ||
    ADVISOR_DATA[0];

  const currentOption =
    currentItem.options[selectedOptionIndex] || currentItem.options[0];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060c20] via-[#08132e] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Buying Guide</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            Smart Sizing & Capacity Matcher
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Not sure what AC tonnage, fridge volume, or washing machine capacity matches your home? Select your room dimensions and family requirements for an instant engineering match.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {ADVISOR_DATA.map((cat) => {
            const isSelected = cat.category === selectedCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.category);
                  setSelectedOptionIndex(1); // default to middle standard option
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.title.split(" ")[0]} {cat.title.split(" ")[1]}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Matcher Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Room / Requirement Options */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              {currentItem.selectorLabel}
            </div>

            {currentItem.options.map((opt, idx) => {
              const isSelected = idx === selectedOptionIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedOptionIndex(idx)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-950/90 to-blue-950/80 border-cyan-400 text-white shadow-lg scale-[1.01]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-white mb-1 flex items-center justify-between">
                    <span>{opt.label}</span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    {opt.description}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Matched Showroom Recommendation Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-[#070e24] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-4">
                <div>
                  <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                    Recommended Engineering Specification
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white mt-0.5 font-['Manrope']">
                    {currentOption.recommendedSpec}
                  </h3>
                </div>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
                  Ideal Match
                </div>
              </div>

              {/* Showroom Model Suggestion */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 mb-4">
                <div className="text-[10px] text-cyan-300 uppercase font-mono font-bold">
                  Featured Showroom Model
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                  {currentOption.recommendedModel}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  ✓ Includes Free Avinashi Doorstep Delivery & Certified Brand Installation
                </div>
              </div>

              {/* Specs & Performance Breakdown */}
              <div className="space-y-2.5 mb-6">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Power & Efficiency Benefit:</div>
                    <div className="text-xs text-slate-300">{currentOption.powerBenefit}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">Best Suited For:</div>
                    <div className="text-xs text-slate-300">{currentOption.idealFor}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="text-[11px] text-slate-400">
                🏷️ Inquire for in-store festive offers, exchange credit & 0% EMI.
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() =>
                    onOpenBookingModal(
                      currentOption.recommendedModel,
                      `Product Availability & Price Inquiry (${currentOption.recommendedSpec})`
                    )
                  }
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Inquire Best Price</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
