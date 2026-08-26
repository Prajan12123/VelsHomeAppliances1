import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Zap,
  ShieldAlert,
} from "lucide-react";

interface Question {
  id: string;
  appliance: string;
  question: string;
  options: {
    label: string;
    points: number;
    riskNote?: string;
  }[];
}

const QUESTIONS: Question[] = [
  {
    id: "ac-service",
    appliance: "Air Conditioner",
    question: "When was your AC indoor/outdoor unit last jet cleaned?",
    options: [
      { label: "Within the last 3 months", points: 25 },
      { label: "3 to 6 months ago", points: 18 },
      { label: "6 to 12 months ago", points: 8, riskNote: "Clogged condenser adds 20-30% to electric bill" },
      { label: "Never / More than 1 year", points: 0, riskNote: "Severe risk of compressor overheating & gas choke" },
    ],
  },
  {
    id: "fridge-cooling",
    appliance: "Refrigerator",
    question: "How is the cooling performance & door seal suction?",
    options: [
      { label: "Perfect cooling, strong magnetic door seal", points: 25 },
      { label: "Cooling is fine, but ice gathers in freezer", points: 15, riskNote: "Defrost sensor may be slowly failing" },
      { label: "Takes longer to freeze water / warm lower compartment", points: 5, riskNote: "Low refrigerant pressure or fan motor drag" },
      { label: "Compressor clicks constantly / water leaks under tray", points: 0, riskNote: "Relay overload or blocked drain pan" },
    ],
  },
  {
    id: "wm-vibration",
    appliance: "Washing Machine",
    question: "What happens during the high-speed spin drying cycle?",
    options: [
      { label: "Smooth & quiet rotation with balanced spin", points: 25 },
      { label: "Slight squeak or mild rumble", points: 18 },
      { label: "Noticeable thumping or water takes longer to drain", points: 8, riskNote: "Worn shock absorber or clogged drain filter" },
      { label: "Violent drum banging / walking across the floor", points: 0, riskNote: "Immediate danger of tub crack or spider arm break" },
    ],
  },
  {
    id: "power-protection",
    appliance: "Electrical Protection",
    question: "Do you have voltage stabilizers or surge guards on your heavy appliances?",
    options: [
      { label: "Yes, dedicated digital stabilizers for AC & Fridge", points: 25 },
      { label: "Stabilizer on AC only, not fridge/washing machine", points: 15 },
      { label: "Direct wall socket connection (No stabilizer)", points: 5, riskNote: "High risk of PCB failure during grid spikes" },
      { label: "Frequent power cuts & visible light flickering in area", points: 0, riskNote: "Severe risk of Inverter board microcontroller burnout" },
    ],
  },
];

interface HomeApplianceHealthCheckProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const HomeApplianceHealthCheck: React.FC<HomeApplianceHealthCheckProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedNotes, setSelectedNotes] = useState<Record<string, string>>({});
  const [completed, setCompleted] = useState<boolean>(false);

  const handleSelect = (questionId: string, points: number, riskNote?: string) => {
    const updatedAnswers = { ...answers, [questionId]: points };
    setAnswers(updatedAnswers);

    if (riskNote) {
      setSelectedNotes({ ...selectedNotes, [questionId]: riskNote });
    } else {
      const newNotes = { ...selectedNotes };
      delete newNotes[questionId];
      setSelectedNotes(newNotes);
    }

    if (Object.keys(updatedAnswers).length === QUESTIONS.length) {
      setCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setSelectedNotes({});
    setCompleted(false);
  };

  const totalScore = (Object.values(answers) as number[]).reduce((acc: number, curr: number) => acc + curr, 0);

  const getHealthGrade = (score: number) => {
    if (score >= 85) {
      return {
        grade: "Excellent Health",
        color: "text-emerald-400",
        badgeBg: "bg-emerald-500/20 border-emerald-400/40 text-emerald-300",
        summary: "Your home appliances are in top-tier operating condition! Routine annual maintenance will keep them running efficiently.",
        actionNeeded: "Low Priority — Keep filters vacuumed.",
      };
    } else if (score >= 60) {
      return {
        grade: "Moderate Risk",
        color: "text-amber-400",
        badgeBg: "bg-amber-500/20 border-amber-400/40 text-amber-300",
        summary: "Noticeable early wear detected in cooling or mechanical circuits. High chance of increased power consumption and unexpected seasonal breakdown.",
        actionNeeded: "Recommended: Schedule ₹500 Preventive Doorstep Service.",
      };
    } else {
      return {
        grade: "High Failure Hazard",
        color: "text-rose-400",
        badgeBg: "bg-rose-500/20 border-rose-400/40 text-rose-300",
        summary: "Critical vulnerabilities found! Blocked coils, weak electrical protection, or motor strain can cause permanent compressor/PCB burnout.",
        actionNeeded: "Urgent: Book Immediate Inspection to prevent expensive part replacements.",
      };
    }
  };

  const currentGrade = getHealthGrade(totalScore);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060e22] via-[#081530] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-3.5 h-3.5" />
            <span>Interactive Diagnostic Quiz</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            60-Second Home Appliance Health Scorecard
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Answer 4 quick questions about your home appliances to calculate your electrical efficiency, breakdown vulnerability, and get a tailored maintenance plan.
          </p>
        </div>

        {/* Questionnaire & Real-time Live Gauge */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Questions */}
          <div className="lg:col-span-7 space-y-6">
            {QUESTIONS.map((q, idx) => {
              const selectedValue = answers[q.id];
              const isAnswered = selectedValue !== undefined;

              return (
                <div
                  key={q.id}
                  className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/[0.02] transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-6 h-6 rounded-full bg-cyan-400/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      {q.appliance}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white mb-3">
                    {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isOptionSelected = selectedValue === opt.points;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelect(q.id, opt.points, opt.riskNote)}
                          className={`p-3 rounded-xl text-left text-xs transition-all border cursor-pointer flex items-center justify-between gap-2 ${
                            isOptionSelected
                              ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 font-bold shadow-md"
                              : "bg-white/[0.03] border-white/10 text-slate-300 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          <span className="leading-snug">{opt.label}</span>
                          {isOptionSelected && (
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Warning snippet if high risk selected */}
                  {selectedNotes[q.id] && (
                    <div className="mt-3 p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-[11px] text-rose-300 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedNotes[q.id]}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Real-time Scorecard Result */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-[#070e24] shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                  <div>
                    <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                      Live Appliance Health
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {Object.keys(answers).length} of {QUESTIONS.length} Questions Answered
                    </div>
                  </div>

                  {completed && (
                    <button
                      onClick={handleReset}
                      className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                </div>

                {/* Score Number + Grade */}
                <div className="text-center p-5 rounded-2xl bg-white/[0.03] border border-white/10 mb-5">
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">
                    Cumulative Health Score
                  </div>
                  <div className="text-5xl sm:text-6xl font-black font-mono text-white mb-2">
                    {totalScore}
                    <span className="text-xl text-slate-500 font-sans">/100</span>
                  </div>

                  <span
                    className={`inline-block text-xs font-black px-3.5 py-1 rounded-full uppercase border ${currentGrade.badgeBg}`}
                  >
                    {currentGrade.grade}
                  </span>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-300 leading-relaxed mb-4 bg-cyan-950/30 p-3.5 rounded-xl border border-cyan-500/20">
                  {currentGrade.summary}
                </p>

                {/* Action Needed */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 mb-6 text-xs flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-white font-semibold">{currentGrade.actionNeeded}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2.5 pt-4 border-t border-white/10">
                <button
                  onClick={() =>
                    onOpenBookingModal(
                      "Multi-Appliance Health Check",
                      `Scorecard Result: ${totalScore}/100 (${currentGrade.grade}) - Doorstep Visit (₹500)`
                    )
                  }
                  className="w-full py-3.5 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book ₹500 Multi-Point Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() =>
                    onOpenChat(
                      `My Home Appliance Health Score is ${totalScore}/100 (${currentGrade.grade}). What specific preventive maintenance should I do for my AC and Refrigerator?`
                    )
                  }
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Discuss Score with AI Concierge</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
