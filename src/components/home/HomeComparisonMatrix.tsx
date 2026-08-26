import React, { useState } from "react";
import {
  ShieldCheck,
  XCircle,
  CheckCircle2,
  Sparkles,
  Award,
  Zap,
  ArrowRight,
} from "lucide-react";

interface ComparisonItem {
  feature: string;
  category: "Pricing" | "Quality" | "Safety" | "Warranty";
  velsBenefit: string;
  velsDetail: string;
  marketRisk: string;
  marketDetail: string;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: "Visiting & Diagnostic Fee Policy",
    category: "Pricing",
    velsBenefit: "₹500 Transparent Fixed Rate",
    velsDetail: "Covers doorstep visit within 60–90 mins, digital multimeter inspection, safety check, and written quote before repair.",
    marketRisk: "Random Arbitrary Fees (₹300 - ₹1,500)",
    marketDetail: "Unclear visiting charges that increase unpredictably once the technician arrives at your home.",
  },
  {
    feature: "Spare Part Authenticity & Sourcing",
    category: "Quality",
    velsBenefit: "100% Genuine Factory-Sealed OG Parts",
    velsDetail: "Sourced directly from authorized brand distributors (LG, Samsung, Daikin, IFB, Bosch, Whirlpool) with barcode verification.",
    marketRisk: "Refurbished or Duplicate Local Parts",
    marketDetail: "Low-grade duplicate coils and re-used capacitors prone to repeated burnouts within weeks.",
  },
  {
    feature: "Technician Background & Certification",
    category: "Safety",
    velsBenefit: "50+ Police & Master Verified Engineers",
    velsDetail: "Trained at brand workshops, uniformed with ID cards, digital toolkits, and 5+ years field experience.",
    marketRisk: "Unverified Freelance Mechanics",
    marketDetail: "No background verification, lack of modern inverter PCB testing instruments, and zero safety liability.",
  },
  {
    feature: "Post-Service Warranty & Protection",
    category: "Warranty",
    velsBenefit: "30-Day Official Digital Guarantee",
    velsDetail: "Official digital invoice issued. Any recurrence of the same fault within 30 days is re-serviced 100% free of charge.",
    marketRisk: "Zero Warranty (Verbal Promises)",
    marketDetail: "Technicians frequently block calls or charge another visiting fee if the appliance breaks down the next day.",
  },
  {
    feature: "Equipment & Jet Wash Standards",
    category: "Quality",
    velsBenefit: "High-Pressure Jet & Nitrogen Leak Test",
    velsDetail: "Full AC water jacket covers, anti-bacterial chemical foam, and electronic manifold gauges for precision pressure.",
    marketRisk: "Manual Water Splash & Guesswork",
    marketDetail: "Splashing tap water with brushes damages delicate evaporator fins and risks water leaking onto room walls.",
  },
  {
    feature: "Turnaround & Emergency Response Time",
    category: "Safety",
    velsBenefit: "Guaranteed 60–90 Minute Doorstep ETA",
    velsDetail: "GPS-enabled fleet across Avinashi, Tirupur, Sevur, and Karumathampatti for immediate dispatch.",
    marketRisk: "2 to 3 Days Delay & Missed Appointments",
    marketDetail: "Continuous delays, non-responsive support, and multiple missed visits leaving your fridge or AC inoperable.",
  },
];

interface HomeComparisonMatrixProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const HomeComparisonMatrix: React.FC<HomeComparisonMatrixProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  const categories = ["All", "Pricing", "Quality", "Safety", "Warranty"];

  const filteredData =
    selectedFilter === "All"
      ? COMPARISON_DATA
      : COMPARISON_DATA.filter((item) => item.category === selectedFilter);

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060c1e] via-[#081228] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Why 1,250+ Avinashi Families Trust Us</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            VELS Certified Care vs. Unverified Market
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            See how our standardized ₹500 visiting policy, authentic brand spare parts, and 30-day warranty eliminate all repair risks.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                selectedFilter === cat
                  ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                  : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white"
              }`}
            >
              {cat} Standards
            </button>
          ))}
        </div>

        {/* Comparison Cards Grid */}
        <div className="space-y-4 mb-8">
          {filteredData.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-500/30 transition-all flex flex-col lg:flex-row items-stretch justify-between gap-4"
            >
              {/* Feature Title */}
              <div className="lg:w-1/4 flex flex-col justify-center">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mb-1">
                  {item.category} Feature
                </span>
                <h3 className="text-base font-bold text-white leading-snug">
                  {item.feature}
                </h3>
              </div>

              {/* VELS Advantage Column */}
              <div className="lg:w-[38%] p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-400/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-extrabold text-cyan-300 flex items-center gap-1.5">
                    <span>VELS Standard:</span>
                    <span className="text-white">{item.velsBenefit}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    {item.velsDetail}
                  </p>
                </div>
              </div>

              {/* Unorganized Market Risk Column */}
              <div className="lg:w-[38%] p-4 rounded-xl bg-rose-950/20 border border-rose-500/20 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 flex items-center justify-center shrink-0 mt-0.5">
                  <XCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <span>Local Market Risk:</span>
                    <span className="text-slate-200">{item.marketRisk}</span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mt-1">
                    {item.marketDetail}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">
                Book with 100% confidence. Zero risk.
              </div>
              <div className="text-[11px] text-slate-300">
                Pay ₹500 only after thorough digital inspection and your written estimate approval.
              </div>
            </div>
          </div>

          <button
            onClick={() => onOpenBookingModal()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Book Verified Technician (₹500)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
