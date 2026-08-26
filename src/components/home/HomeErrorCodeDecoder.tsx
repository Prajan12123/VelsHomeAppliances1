import React, { useState } from "react";
import {
  Code,
  Search,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ShieldAlert,
  Zap,
  RotateCcw,
  Sparkles,
  Info,
} from "lucide-react";

interface ErrorCodeEntry {
  code: string;
  brand: string;
  appliance: string;
  meaning: string;
  symptom: string;
  severity: "High Hazard (Stop Unit)" | "Operational Warning" | "Sensor / Drain Fault";
  severityColor: string;
  diySafeStep: string;
  velsResolution: string;
  partsInvolved: string;
}

const ERROR_CODES_DB: ErrorCodeEntry[] = [
  {
    code: "OE / 5C",
    brand: "LG / Samsung",
    appliance: "Washing Machine",
    meaning: "Drain Timeout Failure (Water not emptying within 10 mins)",
    symptom: "Washer pauses mid-cycle full of water with alarm buzzing; cycle halts before spin.",
    severity: "Operational Warning",
    severityColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    diySafeStep: "Unscrew lower-front emergency drain filter coin trap to remove coins/hairpins. If clean, stop running.",
    velsResolution: "Test drain pump motor winding resistance, clear internal sump hose blockage, or replace OEM pump.",
    partsInvolved: "High-torque drain pump, coin filter housing, sump hose",
  },
  {
    code: "dE / dE1",
    brand: "LG / IFB / Bosch",
    appliance: "Washing Machine",
    meaning: "Door Lock Switch Thermal Interlock Malfunction",
    symptom: "Door is shut tight but machine beeps and refuses to start cycle; display flashes dE.",
    severity: "Sensor / Drain Fault",
    severityColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    diySafeStep: "Push door firmly until click is heard; inspect if clothes are pinched in door gasket.",
    velsResolution: "Replace PTC bi-metal door lock mechanism and verify micro-switch signal continuity with PCB.",
    partsInvolved: "OEM 3-pin door interlock lock switch",
  },
  {
    code: "CH05 / E4",
    brand: "LG / Daikin / Voltas",
    appliance: "Air Conditioner",
    meaning: "Communication Loss Between Indoor & Outdoor Unit",
    symptom: "AC runs indoor fan for 3 minutes, then stops cooling and flashes CH05 / E4 on display.",
    severity: "High Hazard (Stop Unit)",
    severityColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    diySafeStep: "Switch off main 16A MCB isolator for 5 minutes and restart once. If code reappears, do not force run.",
    velsResolution: "Probe 24V DC communication bus signal, test outdoor IPM micro-controller, and inspect PCB optocouplers.",
    partsInvolved: "Outdoor PCB motherboard, communication wiring, noise filter",
  },
  {
    code: "F3 / E1",
    brand: "Daikin / Panasonic",
    appliance: "Air Conditioner",
    meaning: "High Discharge Pipe Temperature (Low Refrigerant Gas Leak)",
    symptom: "Blowing lukewarm air; outdoor compressor gets scorching hot and shuts down on thermal overload.",
    severity: "High Hazard (Stop Unit)",
    severityColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    diySafeStep: "Immediately switch off AC to prevent burning the expensive inverter compressor motor.",
    velsResolution: "Perform 40-Bar Nitrogen pressure leak detection on flare nuts/condenser coil, fix leak, and weigh-in R32 gas.",
    partsInvolved: "Copper flare joints, OEM service valve, pure virgin refrigerant",
  },
  {
    code: "22E / Er dH",
    brand: "Samsung / LG",
    appliance: "Refrigerator",
    meaning: "Defrost Heater & Thermal Sensor Open Circuit",
    symptom: "Freezer functions normally, but lower fresh food compartment warms up with heavy frost buildup behind rear panel.",
    severity: "Operational Warning",
    severityColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    diySafeStep: "Do not chip ice with sharp knives (punctures cooling coil). Keep doors closed to preserve temperature.",
    velsResolution: "Test defrost heater resistance (approx 150–250 ohms), replace burned bi-metal fuse and NTC sensor.",
    partsInvolved: "Glass tube defrost heater, bi-metal thermostat, NTC thermistor",
  },
  {
    code: "6 Blinks",
    brand: "Sony Bravia",
    appliance: "4K Smart TV",
    meaning: "Backlight Inverter Rail / Power Board Protection Error",
    symptom: "TV powers on, Sony logo appears briefly, then screen goes dark and front red LED blinks 6 times repeatedly.",
    severity: "High Hazard (Stop Unit)",
    severityColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    diySafeStep: "Unplug from 230V wall socket. Do not attempt repeated power cycling as it damages the main board.",
    velsResolution: "Replace degraded high-uniformity LED backlight strip array and re-tune SMPS backlight drive voltage.",
    partsInvolved: "Direct-lit aluminum LED bars, SMPS drive board",
  },
  {
    code: "UE / E04",
    brand: "LG / Samsung / IFB",
    appliance: "Washing Machine",
    meaning: "Unbalanced Drum Load Protection",
    symptom: "Machine slows down and fills with water repeatedly trying to redistribute laundry during spin cycle.",
    severity: "Sensor / Drain Fault",
    severityColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    diySafeStep: "Pause machine, open door, and manually separate heavy bedsheets or tangled jeans evenly around the drum.",
    velsResolution: "If error persists when empty: Replace worn hydraulic shock absorbers and calibrate 3D vibration sensor.",
    partsInvolved: "Heavy-duty suspension dampers, balance counterweight, 3D sensor",
  },
];

interface HomeErrorCodeDecoderProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
  onOpenChat: (prompt?: string) => void;
}

export const HomeErrorCodeDecoder: React.FC<HomeErrorCodeDecoderProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeEntry, setActiveEntry] = useState<ErrorCodeEntry>(ERROR_CODES_DB[0]);

  const brands = ["All", "LG", "Samsung", "Daikin", "Bosch", "Sony", "Voltas"];

  const filteredCodes = ERROR_CODES_DB.filter((item) => {
    const matchesBrand =
      selectedBrand === "All" || item.brand.toLowerCase().includes(selectedBrand.toLowerCase());
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.appliance.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBrand && matchesSearch;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Code className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exclusive Digital Diagnostic Utility</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Appliance Displaying an Error Code?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Look up the exact fault code across major brands to understand what your machine is signaling before booking a ₹500 doorstep check.
        </p>

        {/* Filter and Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Brand Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/10">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() => setSelectedBrand(b)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  selectedBrand === b
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_10px_rgba(0,229,255,0.3)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search code (e.g. OE, CH05, F3)..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950/70 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Code Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Matching Fault Codes ({filteredCodes.length})</span>
            <span className="text-cyan-400">Click to Inspect</span>
          </div>

          {filteredCodes.length === 0 ? (
            <div className="glass-panel p-8 text-center rounded-2xl border border-white/10 text-slate-400 text-xs">
              No matching code found. Ask our AI Assistant for instant custom code decoding.
              <div className="mt-4">
                <button
                  onClick={() => onOpenChat(`What does error code "${searchQuery}" mean on my appliance?`)}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-400/40 text-xs cursor-pointer"
                >
                  Decode with AI Assistant
                </button>
              </div>
            </div>
          ) : (
            filteredCodes.map((item) => {
              const isSelected = activeEntry.code === item.code && activeEntry.brand === item.brand;
              return (
                <button
                  key={`${item.brand}-${item.code}`}
                  onClick={() => setActiveEntry(item)}
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
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 font-mono font-extrabold text-sm transition-transform group-hover:scale-105 ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                        : "bg-white/5 text-slate-300 border border-white/10"
                    }`}
                  >
                    {item.code}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold text-cyan-400">
                        {item.brand} • {item.appliance}
                      </span>
                      <span className={`text-[9px] px-2 py-0.5 rounded border font-mono font-bold ${item.severityColor}`}>
                        {item.severity.split(" (")[0]}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                      {item.meaning}
                    </h3>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Right Side: Detailed Code Dossier */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl bg-slate-900/90">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Fault Matrix • {activeEntry.brand} {activeEntry.appliance}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-mono font-black text-white">
                    Code: {activeEntry.code}
                  </span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-mono font-bold ${activeEntry.severityColor}`}>
                    {activeEntry.severity}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-400 font-mono block">Inspection Guarantee</span>
                <span className="text-xs font-bold text-emerald-400 font-mono">6-Month Warranty</span>
              </div>
            </div>

            {/* Core Translation & Symptoms */}
            <div className="space-y-4 my-6">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Technical Definition</div>
                <div className="text-sm font-bold text-white">{activeEntry.meaning}</div>
                <div className="text-xs text-slate-300 leading-relaxed pt-1">{activeEntry.symptom}</div>
              </div>

              {/* Safe DIY Triage Step */}
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-300 uppercase">
                  <Info className="w-4 h-4 text-blue-400" />
                  <span>Immediate Safe Step for Homeowner:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeEntry.diySafeStep}
                </p>
              </div>

              {/* VELS Precision Engineering Protocol */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-1.5">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span>VELS Doorstep Resolution Protocol:</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {activeEntry.velsResolution}
                </p>
                <div className="text-[11px] text-slate-400 pt-1">
                  <strong className="text-cyan-300 font-mono">Associated Spares: </strong>
                  {activeEntry.partsInvolved}
                </div>
              </div>
            </div>

            {/* Action Trigger Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() =>
                  onOpenBookingModal(
                    activeEntry.appliance,
                    `Error Code ${activeEntry.code} (${activeEntry.brand})`
                  )
                }
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book ₹500 Check for Code {activeEntry.code}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() =>
                  onOpenChat(
                    `My ${activeEntry.brand} ${activeEntry.appliance} shows error code "${activeEntry.code}". Can you give me more details?`
                  )
                }
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Ask AI Specialist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
