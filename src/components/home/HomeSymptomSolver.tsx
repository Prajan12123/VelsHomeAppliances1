import React, { useState } from "react";
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HelpCircle,
} from "lucide-react";

interface Symptom {
  id: string;
  issue: string;
  cause: string;
  severity: "Low" | "Moderate" | "Critical";
  diyTip: string;
  suggestedAction: string;
}

interface ApplianceCategory {
  id: string;
  name: string;
  icon: string;
  symptoms: Symptom[];
}

const APPLIANCE_SYMPTOMS: ApplianceCategory[] = [
  {
    id: "ac",
    name: "Air Conditioner",
    icon: "❄️",
    symptoms: [
      {
        id: "ac-1",
        issue: "AC Running but Not Cooling / Blowing Warm Air",
        cause: "Low refrigerant gas (R32/R410A) due to micro-leak, choked cooling coil, or faulty outdoor fan capacitor.",
        severity: "Critical",
        diyTip: "Turn off immediately to prevent compressor burn-out. Check if remote is set to 'Cool' mode at 24°C.",
        suggestedAction: "High-Pressure Jet Cleaning & Nitrogen Gas Pressure Test (₹500 Visit)",
      },
      {
        id: "ac-2",
        issue: "Water Dripping Constantly from Indoor Unit",
        cause: "Clogged condensate drain pipe with fungus/dust sludge, or cracked internal drain tray.",
        severity: "Moderate",
        diyTip: "Place a bucket underneath and do not run on turbo mode to avoid electric short circuits.",
        suggestedAction: "Deep Chemical Drain Pipe Flushing & Tray Re-alignment",
      },
      {
        id: "ac-3",
        issue: "AC Turns Off After 5-10 Minutes with Error Code (E1/CH05)",
        cause: "Outdoor unit overheating, PCB communication signal lost, or ambient temperature sensor malfunction.",
        severity: "Critical",
        diyTip: "Switch off main MCB breaker for 10 minutes to reset inverter microcontroller.",
        suggestedAction: "Inverter PCB Diagnostic & Thermistor Sensor Calibration",
      },
      {
        id: "ac-4",
        issue: "Foul Moldy Odour when AC is Switched On",
        cause: "Bacterial and mold build-up across the evaporator cooling fins and blower fan wheel.",
        severity: "Low",
        diyTip: "Run AC in Fan-only mode for 30 minutes with windows open.",
        suggestedAction: "Anti-bacterial Foam Jet Wash & UV Disinfection",
      },
    ],
  },
  {
    id: "fridge",
    name: "Refrigerator",
    icon: "🧊",
    symptoms: [
      {
        id: "fridge-1",
        issue: "Freezer is Freezing but Lower Fridge Section is Warm",
        cause: "Defrost timer or bimetal sensor failure causing ice to block the internal air damper circulation duct.",
        severity: "Critical",
        diyTip: "Avoid overloading the back vents; check if evaporator fan is spinning when door switch is pressed.",
        suggestedAction: "Defrost Circuit Diagnostic & Sensor Replacement (₹500 Visit)",
      },
      {
        id: "fridge-2",
        issue: "Clicking Sound from Back & Compressor Not Starting",
        cause: "Faulty PTC start relay, damaged overload protector (OLP), or inverter driver board lock.",
        severity: "Critical",
        diyTip: "Unplug from socket immediately to prevent compressor winding overheating.",
        suggestedAction: "Digital Multimeter Compressor Load Test & OG Relay Replacement",
      },
      {
        id: "fridge-3",
        issue: "Water Pooling on Floor Underneath Crisper Drawers",
        cause: "Defrost drain hole clogged with food debris, causing condensation to overflow inside cabin.",
        severity: "Moderate",
        diyTip: "Clear crisper boxes and clean door rubber gaskets with warm soapy water.",
        suggestedAction: "Drain Trough De-icing & Gasket Magnetic Seal Tightening",
      },
    ],
  },
  {
    id: "washing",
    name: "Washing Machine",
    icon: "🌀",
    symptoms: [
      {
        id: "washing-1",
        issue: "Violent Vibration, Banging Noise & 'Walking' During Spin",
        cause: "Worn-out drum shock absorbers, broken balance spring, or spider arm bearing breakdown.",
        severity: "Critical",
        diyTip: "Stop cycle immediately. Ensure machine feet are level on firm ground and laundry is evenly distributed.",
        suggestedAction: "Heavy Duty Shock Absorber Renewal & Drum Dynamic Balancing",
      },
      {
        id: "washing-2",
        issue: "Water Won't Drain & Machine Stops with OE / 5E / E20 Error",
        cause: "Drain pump jammed with coins/lint or drain filter impeller blocked.",
        severity: "Moderate",
        diyTip: "Open bottom front coin trap door with shallow tray to manually drain emergency water.",
        suggestedAction: "Drain Pump Impeller Debris Extraction & Solenoid Test (₹500 Visit)",
      },
      {
        id: "washing-3",
        issue: "Drum Not Rotating but Motor Humming Sound is Heard",
        cause: "Snapped drive belt, worn motor carbon brushes, or inverter drive PCB phase failure.",
        severity: "Critical",
        diyTip: "Check if drum turns freely by hand; do not force multiple restarts.",
        suggestedAction: "Drive Belt Tensioning & Motor Commutator Overhaul",
      },
    ],
  },
  {
    id: "tv",
    name: "Smart LED / OLED TV",
    icon: "📺",
    symptoms: [
      {
        id: "tv-1",
        issue: "Sound is Working Crystal Clear but Screen is Completely Black",
        cause: "LED backlight strip burnout or backlight inverter booster board circuit failure.",
        severity: "Critical",
        diyTip: "Shine flashlight closely at screen in dark room. If faint image is visible, panel is good and only backlights need service.",
        suggestedAction: "Original Direct-Lit LED Array Replacement with 1-Year Guarantee",
      },
      {
        id: "tv-2",
        issue: "Horizontal or Vertical Coloured Lines on Screen",
        cause: "T-Con timing controller board fault, loose LVDS ribbon cable, or COF tab bonding issue.",
        severity: "Moderate",
        diyTip: "Test multiple HDMI inputs and internal smart menu to rule out set-top box cables.",
        suggestedAction: "T-Con Board Micro-soldering & Optical Ribbon Alignment (₹500 Visit)",
      },
      {
        id: "tv-3",
        issue: "TV Won't Turn On, Standby Red LED Blinks Repeatedly",
        cause: "SMPS power supply board overvoltage surge, swollen capacitors, or motherboard standby circuit.",
        severity: "Critical",
        diyTip: "Unplug from wall for 15 minutes; disconnect all external HDMI cables and try direct socket.",
        suggestedAction: "SMPS Power Module Diagnostic & Voltage Regulator Replacement",
      },
    ],
  },
  {
    id: "microwave",
    name: "Microwave & Oven",
    icon: "🔥",
    symptoms: [
      {
        id: "microwave-1",
        issue: "Microwave Runs & Turns but Food Remains Cold",
        cause: "Burned high-voltage magnetron tube, high-voltage diode short-circuit, or HV transformer open.",
        severity: "Critical",
        diyTip: "Never attempt to open microwave casing yourself due to dangerous 2,000V stored capacitor charges.",
        suggestedAction: "High-Voltage Magnetron & HV Diode Safe Replacement (₹500 Visit)",
      },
      {
        id: "microwave-2",
        issue: "Sparking / Crackling Arcs Inside Cooking Chamber",
        cause: "Burnt or oil-saturated mica waveguide cover, or exposed chipped metal cavity paint.",
        severity: "Critical",
        diyTip: "Stop immediately. Ensure no metal cutlery or gold-rimmed plates are inside.",
        suggestedAction: "Mica Waveguide Shield Replacement & Cavity High-Temp Coating",
      },
    ],
  },
];

interface HomeSymptomSolverProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const HomeSymptomSolver: React.FC<HomeSymptomSolverProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>("ac");
  const [selectedSymptomId, setSelectedSymptomId] = useState<string>("ac-1");

  const currentCategory =
    APPLIANCE_SYMPTOMS.find((c) => c.id === selectedApplianceId) ||
    APPLIANCE_SYMPTOMS[0];

  const currentSymptom =
    currentCategory.symptoms.find((s) => s.id === selectedSymptomId) ||
    currentCategory.symptoms[0];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#080d22] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Assistant</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            Instant Appliance Issue Solver
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Select your home appliance and identify symptoms. Get professional diagnostic insights, safety recommendations, and request a certified ₹500 doorstep visit.
          </p>
        </div>

        {/* Appliance Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {APPLIANCE_SYMPTOMS.map((cat) => {
            const isSelected = cat.id === selectedApplianceId;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedApplianceId(cat.id);
                  setSelectedSymptomId(cat.symptoms[0].id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main 2-Column Symptom & Resolution Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Symptom Selector List */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Select Recognized Issue</span>
              <span className="text-[11px] text-cyan-400 font-mono">
                {currentCategory.symptoms.length} Symptoms Listed
              </span>
            </div>

            {currentCategory.symptoms.map((symptom) => {
              const isActive = symptom.id === currentSymptom.id;
              return (
                <button
                  key={symptom.id}
                  onClick={() => setSelectedSymptomId(symptom.id)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative group ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-950/80 to-blue-950/60 border-cyan-400 text-white shadow-lg"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs sm:text-sm font-semibold leading-snug">
                      {symptom.issue}
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0 ${
                        symptom.severity === "Critical"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                          : symptom.severity === "Moderate"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                          : "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40"
                      }`}
                    >
                      {symptom.severity}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Detailed Diagnostic Insight Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-[#070b1d] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10 mb-5">
                <div>
                  <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                    Diagnostic Analysis & Probable Root Cause
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {currentSymptom.issue}
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold">
                  ₹500 Fixed Visit
                </div>
              </div>

              {/* Probable Cause */}
              <div className="mb-4">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Technical Cause:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-white/[0.03] p-3 rounded-xl border border-white/5">
                  {currentSymptom.cause}
                </p>
              </div>

              {/* DIY Quick Safety Caution */}
              <div className="mb-5">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  <span>Safety Recommendation & First Aid:</span>
                </div>
                <p className="text-xs sm:text-sm text-amber-200/90 leading-relaxed bg-amber-950/30 p-3 rounded-xl border border-amber-500/20">
                  {currentSymptom.diyTip}
                </p>
              </div>

              {/* Suggested Professional Action */}
              <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-400/30 mb-6">
                <div className="text-[11px] text-cyan-300 font-bold uppercase tracking-wider mb-0.5">
                  Recommended Technician Service:
                </div>
                <div className="text-xs sm:text-sm font-extrabold text-white">
                  {currentSymptom.suggestedAction}
                </div>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() =>
                  onOpenChat(
                    `Help me diagnose this ${currentCategory.name} problem: ${currentSymptom.issue}`
                  )
                }
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Ask AI Expert More</span>
              </button>

              <button
                onClick={() =>
                  onOpenBookingModal(currentCategory.name, currentSymptom.issue)
                }
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Technician Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
