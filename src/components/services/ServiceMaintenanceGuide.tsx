import React, { useState } from "react";
import { 
  Wind, 
  Refrigerator, 
  Disc, 
  Flame, 
  Zap, 
  Tv, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  Clock, 
  Wrench,
  Sparkles
} from "lucide-react";

interface ServiceMaintenanceGuideProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const ServiceMaintenanceGuide: React.FC<ServiceMaintenanceGuideProps> = ({ onOpenBookingModal }) => {
  const [selectedCategory, setSelectedCategory] = useState("ac");

  const applianceGuides = [
    {
      id: "ac",
      name: "Air Conditioners",
      icon: Wind,
      idealFrequency: "Every 4 to 6 Months",
      warningSigns: [
        "Weak airflow or room taking >30 mins to cool",
        "Water dripping from indoor evaporator unit",
        "Hissing or bubbling noises (possible refrigerant leak)",
        "Musty or damp odor when AC fan turns on"
      ],
      dos: [
        "Clean nylon mesh dust filters every 15–20 days under running water",
        "Keep outdoor condenser unit at least 2 feet clear of walls & plants",
        "Use 24°C–26°C setting with ceiling fan for optimal cooling & 25% energy savings",
        "Run in Fan-only mode for 15 minutes before seasonal shut-down"
      ],
      donts: [
        "Never use chemical sprays directly on indoor cooling coil fins",
        "Avoid blocking indoor louvers with curtains or tall furniture",
        "Don't ignore flickering display or error codes (E1, E4, CH05)",
        "Never run AC without dust filters installed in the front grill"
      ],
      proTip: "A high-pressure foam jet wash clears deep fungus and biofilm in cooling fins, reducing electricity consumption by up to 20%."
    },
    {
      id: "fridge",
      name: "Refrigerators",
      icon: Refrigerator,
      idealFrequency: "Every 6 to 12 Months",
      warningSigns: [
        "Compressor runs continuously without shutting off",
        "Freezer creates thick frost layer while lower cabinet is warm",
        "Water pools underneath vegetable crisper drawer",
        "Rubber door gasket feels loose or allows air leakage"
      ],
      dos: [
        "Clean rear condenser coils every 6 months to prevent compressor overheat",
        "Maintain 2–3 inches of breathing gap around refrigerator sides and back",
        "Test door seal: Close door on a currency note; if it slips out easily, replace gasket",
        "Keep internal airflow vents unblocked by oversized containers"
      ],
      donts: [
        "Never use sharp knives or ice picks to scrape frost from freezer walls",
        "Don't pack shelves to 100% capacity — air circulation is required to maintain temperature",
        "Avoid placing piping hot food directly into the refrigerator",
        "Never disconnect fridge for short periods (<10 mins) without delay relay"
      ],
      proTip: "Setting freezer to -18°C and fresh food to 3°C gives ideal food preservation with lowest power draw."
    },
    {
      id: "washing",
      name: "Washing Machines",
      icon: Disc,
      idealFrequency: "Every 6 Months",
      warningSigns: [
        "Excessive banging or violent shaking during high-speed spin cycle",
        "Machine fails to drain water or stops midway with OE/E2 error",
        "Foul mildew smell inside drum or on freshly washed clothes",
        "Water fills very slowly due to inlet filter calcification"
      ],
      dos: [
        "Leave door/lid open for 1 hour after washing to dry drum and prevent mildew",
        "Clean bottom debris filter and coin trap every 30 days",
        "Use manufacturer-recommended descaling powder once every 3 months for hard water",
        "Check and clean water inlet mesh filter on rear hose connection"
      ],
      donts: [
        "Don't overload drum past 80% rated capacity — strains spider arm & motor belt",
        "Avoid using excess detergent; soap scum builds up behind outer tub",
        "Never wash heavy waterproof rugs or rubber-backed mats in standard cycle",
        "Don't ignore grinding noises — worn drum bearings can damage the motor shaft"
      ],
      proTip: "In South India hard water areas, regular descaling prevents heater coil burnouts and increases machine lifespan by 5+ years."
    },
    {
      id: "microwave",
      name: "Microwaves & Ovens",
      icon: Flame,
      idealFrequency: "Every 12 Months",
      warningSigns: [
        "Sparking or arcing inside cavity near mica wave guide cover",
        "Turntable plate does not rotate or makes grinding sounds",
        "Food remains cold despite microwave running for minutes",
        "Touchpad buttons unresponsive or display digits missing"
      ],
      dos: [
        "Always use microwave-safe glass, ceramic, or BPA-free containers",
        "Wipe food splatters immediately with a damp microfiber cloth & mild soap",
        "Clean mica wave-guide cover on interior right wall gently",
        "Keep cooling exhaust vents on top and back clear of clutter"
      ],
      donts: [
        "Never operate microwave when empty — damages magnetron vacuum tube",
        "Never use metal bowls, aluminum foil, or gold-rimmed crockery",
        "Don't heat tightly sealed jars or whole eggs with shells",
        "Never attempt to unscrew the rear case yourself — high-voltage capacitor can be fatal"
      ],
      proTip: "Place a bowl of water with lemon slices inside and microwave on high for 3 minutes. The steam loosens stubborn grease for effortless wiping."
    },
    {
      id: "water",
      name: "RO Water Purifiers",
      icon: Zap,
      idealFrequency: "Every 3 to 4 Months",
      warningSigns: [
        "Significant drop in purified water flow rate from tap",
        "Unusual taste, cloudiness, or odor in drinking water",
        "Continuous rejection water running even when tank is full",
        "Auto-flush pump vibrating loudly or leaking from base"
      ],
      dos: [
        "Replace sediment and pre-carbon filters every 3 to 6 months",
        "Check input and output TDS levels regularly with a digital meter",
        "Sanitize storage tank with food-grade disinfectant every 6 months",
        "Keep booster pump and adapter plugged into a surge protector"
      ],
      donts: [
        "Never run hot water (>40°C) through the RO membrane",
        "Don't bypass the pre-filter cartridge to save upfront filter cost",
        "Never consume purified water if machine has been idle for >2 weeks without flushing",
        "Avoid using non-certified duplicate membrane cartridges"
      ],
      proTip: "Regular pre-filter replacement protects the delicate RO membrane, saving up to 60% on costly membrane replacements."
    },
    {
      id: "tv",
      name: "Smart LED / OLED TVs",
      icon: Tv,
      idealFrequency: "Every 12 Months",
      warningSigns: [
        "Audio working but screen is completely black (backlight failure)",
        "Horizontal or vertical colored lines running across display",
        "TV cycles on and off automatically (power supply capacitor fault)",
        "HDMI ports not detecting input from set-top box or console"
      ],
      dos: [
        "Connect TV to a dedicated surge protector or voltage stabilizer",
        "Clean screen with dry optical microfiber cloth only; spray cleaner on cloth, not screen",
        "Maintain 4 inches gap behind TV for motherboard ventilation",
        "Update smart TV firmware regularly for bug fixes and app performance"
      ],
      donts: [
        "Never spray liquid glass cleaners (Windex/Colin) directly onto the panel edge",
        "Avoid leaving static images or pause screens on OLED TVs for hours (prevents burn-in)",
        "Don't install TV directly above heat sources, fireplace, or under AC vents with condensation",
        "Never mount TV using undersized wall brackets without load testing"
      ],
      proTip: "Lowering backlight brightness from 100% to 75–80% doubles the lifespan of internal LED strips and reduces panel heat."
    }
  ];

  const current = applianceGuides.find(g => g.id === selectedCategory) || applianceGuides[0];
  const CurrentIcon = current.icon;

  return (
    <section className="py-20 bg-[#05070F] border-t border-white/10 relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Lightbulb className="w-3.5 h-3.5 text-cyan-400" />
            <span>Master Engineer Knowledge Base</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Appliance Care & Preventive Maintenance
          </h2>
          
          <p className="text-base text-slate-300">
            Expert guidelines from our senior technicians to help extend your appliances' operational lifespan, maintain peak energy efficiency, and prevent sudden breakdowns.
          </p>
        </div>

        {/* Appliance Category Selector Bar */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start sm:justify-center">
          {applianceGuides.map((guide) => {
            const Icon = guide.icon;
            const isSelected = selectedCategory === guide.id;
            return (
              <button
                key={guide.id}
                onClick={() => setSelectedCategory(guide.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                    : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{guide.name}</span>
              </button>
            );
          })}
        </div>

        {/* Guide Content Display */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/20 bg-[#080E24]">
          
          {/* Guide Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                <CurrentIcon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-white font-['Manrope']">
                  {current.name} Care Protocol
                </h3>
                <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                  <span className="flex items-center gap-1.5 text-cyan-300 font-semibold">
                    <Clock className="w-3.5 h-3.5" />
                    Recommended Servicing: {current.idealFrequency}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onOpenBookingModal(current.name, "Full Diagnostic & Preventive Maintenance")}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-white font-bold text-xs transition-all border border-white/15 hover:border-cyan-400 flex items-center gap-2 cursor-pointer"
            >
              <Wrench className="w-4 h-4" />
              <span>Book {current.name} Service</span>
            </button>
          </div>

          {/* Warning Signs */}
          <div className="mb-8 p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-extrabold uppercase tracking-wider mb-3">
              <AlertTriangle className="w-4 h-4" />
              <span>Red Flags & Warning Signs — Schedule a Visit If You Notice:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {current.warningSigns.map((sign, idx) => (
                <div key={idx} className="bg-black/30 p-3 rounded-xl border border-white/5 text-xs text-slate-200">
                  <span className="text-amber-400 font-mono font-bold mr-1.5">•</span>
                  {sign}
                </div>
              ))}
            </div>
          </div>

          {/* Do's & Don'ts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            
            {/* Do's Column */}
            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/20 space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-extrabold uppercase tracking-wider">
                <CheckCircle2 className="w-5 h-5" />
                <span>Best Practices (Do's)</span>
              </div>
              <ul className="space-y-3">
                {current.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts Column */}
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 text-sm font-extrabold uppercase tracking-wider">
                <XCircle className="w-5 h-5" />
                <span>Practices to Avoid (Don'ts)</span>
              </div>
              <ul className="space-y-3">
                {current.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Pro Tip Callout */}
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/20 flex items-start sm:items-center gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
            <div className="text-xs text-cyan-200">
              <strong className="text-white font-bold">Master Technician Secret:</strong> {current.proTip}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
