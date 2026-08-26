import React, { useState } from "react";
import {
  Volume2,
  VolumeX,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Wrench,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

interface SoundDiagnostic {
  id: string;
  appliance: string;
  soundName: string;
  soundDescription: string;
  urgency: "Critical - Stop Using" | "High - Service Needed" | "Moderate - Inspection Recommended";
  urgencyColor: string;
  decibels: string;
  probableCauses: string[];
  riskIfIgnored: string;
  recommendedSolution: string;
  estimatedFixTime: string;
}

const SOUND_DIAGNOSTICS: SoundDiagnostic[] = [
  {
    id: "fridge-clicking",
    appliance: "Refrigerator",
    soundName: "Repeated Metallic Clicking Every 2–3 Mins",
    soundDescription: "Compressor tries to kick on with a loud click, hums for 4 seconds, then clicks off without cooling.",
    urgency: "Critical - Stop Using",
    urgencyColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    decibels: "68 dB (Intermittent)",
    probableCauses: [
      "Overload Relay (PTC) burned or cracked",
      "Compressor start capacitor failure",
      "Low voltage surge or locked compressor rotor",
    ],
    riskIfIgnored: "Continuous attempts will permanently burn the motor winding (₹8,000+ compressor replacement).",
    recommendedSolution: "Replace original PTC relay and run voltage stabilizer load diagnostic (₹500 fixed fee).",
    estimatedFixTime: "30–45 Mins",
  },
  {
    id: "washer-thumping",
    appliance: "Washing Machine",
    soundName: "Violent Shaking & Heavy Thumping on Spin Cycle",
    soundDescription: "During high-speed spin (800–1200 RPM), drum bangs violently against outer tub walls like a jet engine.",
    urgency: "High - Service Needed",
    urgencyColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    decibels: "84 dB (High Vibration)",
    probableCauses: [
      "Hydraulic shock absorber dampers worn out",
      "Cast aluminum spider arm cracked or corroded",
      "Unbalanced drum counterweight or bearing wear",
    ],
    riskIfIgnored: "Drum will shatter the plastic outer tub causing severe room flooding and motor damage.",
    recommendedSolution: "Install factory-grade heavy hydraulic dampers & digital drum balance calibration.",
    estimatedFixTime: "45–60 Mins",
  },
  {
    id: "ac-whine",
    appliance: "Air Conditioner",
    soundName: "High-Pitched Whistling / Grinding Squeal",
    soundDescription: "Continuous high-frequency bearing whine from the outdoor compressor fan or indoor blower wheel.",
    urgency: "Moderate - Inspection Recommended",
    urgencyColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    decibels: "72 dB (Continuous)",
    probableCauses: [
      "Blower motor bearing lack of lubricant or debris",
      "Cross-flow fan wheel off-center / cracked blade",
      "Capacitor output drop causing motor strain",
    ],
    riskIfIgnored: "Blower motor will seize completely, leading to indoor coil freezing and ice dripping.",
    recommendedSolution: "High-pressure jet descaling, motor shaft alignment, and dual capacitor refresh.",
    estimatedFixTime: "40–55 Mins",
  },
  {
    id: "microwave-buzz",
    appliance: "Microwave Oven",
    soundName: "Loud Electric Drone with Sparking / Pop",
    soundDescription: "Heavy electrical hum with visible sparks behind the internal side mica waveguide wall.",
    urgency: "Critical - Stop Using",
    urgencyColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    decibels: "78 dB (Arcing)",
    probableCauses: [
      "Carbon-burnt mica waveguide sheet",
      "Magnetron antenna tip scorched",
      "High voltage diode reverse breakdown",
    ],
    riskIfIgnored: "High voltage transformer (2,000V+) short circuit and fire hazard inside the kitchen.",
    recommendedSolution: "Replace OEM mica cover, inspect magnetron emission antenna, and clean cavity.",
    estimatedFixTime: "30–40 Mins",
  },
  {
    id: "tv-crackle",
    appliance: "4K Smart TV",
    soundName: "Internal Static Pop & Audio Distortion",
    soundDescription: "Crackling sound from internal speakers even at low volume, or buzzing from power board.",
    urgency: "Moderate - Inspection Recommended",
    urgencyColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    decibels: "55 dB (Distorted)",
    probableCauses: [
      "SMPS power supply electrolytic capacitor bulging",
      "Speaker cone diaphragm torn or voice coil detached",
      "T-Con signal interference / loose ribbon cable",
    ],
    riskIfIgnored: "Power supply rail spike can destroy the main motherboard processor.",
    recommendedSolution: "Micro-soldering capacitor replacement and high-clarity OEM dual speaker replacement.",
    estimatedFixTime: "40–50 Mins",
  },
];

interface HomeAcousticDiagnosticsProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
  onOpenChat: (prompt?: string) => void;
}

export const HomeAcousticDiagnostics: React.FC<HomeAcousticDiagnosticsProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [selectedSound, setSelectedSound] = useState<SoundDiagnostic>(SOUND_DIAGNOSTICS[0]);
  const [isPlayingSimulation, setIsPlayingSimulation] = useState(false);

  const toggleSimulation = () => {
    setIsPlayingSimulation(!isPlayingSimulation);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>Exclusive Smart Diagnostic Feature</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Appliance Making an Unusual Noise?
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Match the sound with our laboratory acoustic database to identify the exact failing part before catastrophic breakdown occurs.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Sound Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Select Symptom Sound:</span>
            <span className="text-cyan-400">5 Acoustic Presets</span>
          </div>

          {SOUND_DIAGNOSTICS.map((diag) => {
            const isSelected = selectedSound.id === diag.id;
            return (
              <button
                key={diag.id}
                onClick={() => {
                  setSelectedSound(diag);
                  setIsPlayingSimulation(true);
                }}
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
                  <Volume2 className={`w-5 h-5 ${isSelected ? "animate-pulse" : ""}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono font-extrabold uppercase text-cyan-400">
                      {diag.appliance}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md border font-mono font-bold ${diag.urgencyColor}`}>
                      {diag.urgency.split(" - ")[0]}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {diag.soundName}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {diag.soundDescription}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Interactive Diagnostic Analyzer */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl bg-slate-900/80">
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -top-20 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header / Sound Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-1">
                  Acoustic Signature • {selectedSound.appliance}
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope']">
                  {selectedSound.soundName}
                </h3>
              </div>

              {/* Simulation Player Button */}
              <button
                onClick={toggleSimulation}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
                  isPlayingSimulation
                    ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "bg-white/5 text-slate-300 border-white/10 hover:bg-white/10"
                }`}
              >
                {isPlayingSimulation ? (
                  <>
                    <Volume2 className="w-4 h-4 text-cyan-400 animate-bounce" />
                    <span>ACOUSTIC SIMULATION ACTIVE</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-4 h-4 text-slate-400" />
                    <span>TEST SIMULATION</span>
                  </>
                )}
              </button>
            </div>

            {/* Audio Waveform Visualizer Simulation */}
            <div className="my-6 p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col gap-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <Activity className="w-3.5 h-3.5" />
                  Frequency Response Pattern
                </span>
                <span>Noise Level: <strong className="text-white">{selectedSound.decibels}</strong></span>
              </div>

              {/* Animated Waveform Bars */}
              <div className="h-16 flex items-center justify-between gap-1 px-2 pt-2">
                {[45, 80, 60, 95, 30, 75, 100, 40, 85, 70, 90, 50, 65, 85, 45, 95, 70, 60, 100, 80, 55, 90, 75, 40, 65, 85, 95, 50].map((height, i) => (
                  <div
                    key={i}
                    style={{
                      height: isPlayingSimulation ? `${Math.max(15, (height * (Math.sin(i + Date.now() / 300) + 1.2)) / 2.2)}%` : `${height * 0.35}%`,
                      transition: "height 0.15s ease",
                    }}
                    className={`flex-1 rounded-full ${
                      selectedSound.urgency.includes("Critical")
                        ? "bg-gradient-to-t from-rose-500 to-amber-400"
                        : "bg-gradient-to-t from-cyan-500 to-emerald-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Probable Causes & Risk */}
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                  Probable Mechanical / Electrical Causes:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedSound.probableCauses.map((cause, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-slate-200 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Warning Box */}
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-rose-200 uppercase font-mono">Consequence If Ignored</div>
                  <div className="text-xs text-rose-300/90 leading-relaxed mt-0.5">
                    {selectedSound.riskIfIgnored}
                  </div>
                </div>
              </div>

              {/* Recommended Solution */}
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-emerald-300 uppercase font-mono">VELS Master Solution</div>
                  <div className="text-xs text-slate-200 leading-relaxed mt-0.5">
                    {selectedSound.recommendedSolution}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Est. Repair Time</div>
                  <div className="text-xs font-mono font-bold text-emerald-400">{selectedSound.estimatedFixTime}</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBookingModal(selectedSound.appliance, selectedSound.soundName)}
                className="w-full sm:w-auto flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book ₹500 Doorstep Check for this Noise</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenChat(`My ${selectedSound.appliance} is making a noise: "${selectedSound.soundName}". What should I do immediately?`)}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-cyan-400" />
                <span>Ask AI Assistant</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
