import React from "react";
import { Package, ShieldCheck, Sparkles, CheckCircle2, ArrowRight, Zap, Star } from "lucide-react";
import { COMPANY_DETAILS } from "../../data";

interface ValueBundle {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  highlightColor: "cyan" | "emerald" | "amber";
  originalPrice: number;
  comboPrice: number;
  savings: number;
  inclusions: string[];
  recommendedFor: string;
}

const HOME_BUNDLES: ValueBundle[] = [
  {
    id: "summer-combo",
    title: "Dual Cooling Care Combo",
    tagline: "AC Foam Jet Service + Refrigerator Deep Cleaning",
    badge: "Most Popular",
    highlightColor: "cyan",
    originalPrice: 1200,
    comboPrice: 899,
    savings: 301,
    inclusions: [
      "High-pressure indoor & outdoor AC jet foam wash",
      "AC Gas pressure & sub-zero temperature check",
      "Refrigerator condenser coil descaling & drain flush",
      "Door magnetic gasket suction restoration",
      "30-Day complete service warranty",
    ],
    recommendedFor: "Homes preparing for summer cooling & energy bill reduction.",
  },
  {
    id: "full-home-trio",
    title: "Complete Home Appliance Health Check",
    tagline: "AC + Refrigerator + Washing Machine Multi-Point Tune-up",
    badge: "Maximum Value",
    highlightColor: "emerald",
    originalPrice: 1800,
    comboPrice: 1299,
    savings: 501,
    inclusions: [
      "AC Jet Foam Wash + Gas Pressure Diagnostic",
      "Refrigerator Defrost & Compressor Load Diagnostic",
      "Washing Machine Drum Descaling & Vibration Calibration",
      "Comprehensive Digital Electrical Safety Check",
      "Priority same-day technician guarantee",
    ],
    recommendedFor: "Whole-home comprehensive seasonal maintenance.",
  },
  {
    id: "kitchen-combo",
    title: "Kitchen Master Care Pack",
    tagline: "Chimney Degreasing + Microwave HV Check + Dishwasher Clean",
    badge: "Chef's Choice",
    highlightColor: "amber",
    originalPrice: 1500,
    comboPrice: 999,
    savings: 501,
    inclusions: [
      "Auto-clean Kitchen Chimney baffle filter degreasing",
      "Microwave high-voltage safety & magnetron check",
      "Dishwasher spray arm clearance & drain cycle flush",
      "Heavy grease & carbon residue removal",
      "Free technician safety audit report",
    ],
    recommendedFor: "Modular kitchens and heavy cooking households.",
  },
];

interface HomeValueBundlesProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const HomeValueBundles: React.FC<HomeValueBundlesProps> = ({
  onOpenBookingModal,
}) => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Package className="w-3.5 h-3.5" />
          <span>Exclusive Home Page Specials</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Multi-Appliance Value Bundles
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
          Save significantly by combining multiple appliance services during a single technician visit. Genuine parts, certified master technicians, and written warranties included.
        </p>
      </div>

      {/* 3 Bundle Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOME_BUNDLES.map((bundle) => {
          const isCyan = bundle.highlightColor === "cyan";
          const isEmerald = bundle.highlightColor === "emerald";
          const isAmber = bundle.highlightColor === "amber";

          return (
            <div
              key={bundle.id}
              className={`glass-panel p-6 sm:p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative group hover:-translate-y-1 ${
                isEmerald
                  ? "border-emerald-500/40 bg-gradient-to-b from-[#06181f] to-[#040c16] shadow-[0_0_30px_rgba(52,211,153,0.15)]"
                  : isCyan
                  ? "border-cyan-500/40 bg-gradient-to-b from-[#071328] to-[#040a18] shadow-[0_0_30px_rgba(0,229,255,0.15)]"
                  : "border-amber-500/40 bg-gradient-to-b from-[#1c1407] to-[#0a0702] shadow-[0_0_30px_rgba(245,158,11,0.15)]"
              }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span
                  className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                    isEmerald
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/40"
                      : isCyan
                      ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40"
                      : "bg-amber-500/20 text-amber-300 border-amber-400/40"
                  }`}
                >
                  {bundle.badge}
                </span>

                <div className="text-[11px] font-bold text-slate-400 font-mono">
                  Save ₹{bundle.savings}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white font-['Manrope'] mb-1">
                  {bundle.title}
                </h3>
                <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                  {bundle.tagline}
                </p>

                {/* Price Display */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 mb-6 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-slate-400 line-through mr-2 font-mono">
                      ₹{bundle.originalPrice}
                    </span>
                    <span
                      className={`text-3xl font-black font-mono ${
                        isEmerald
                          ? "text-emerald-300"
                          : isCyan
                          ? "text-cyan-300"
                          : "text-amber-300"
                      }`}
                    >
                      ₹{bundle.comboPrice}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">
                    All Inclusive
                  </span>
                </div>

                {/* Inclusions */}
                <div className="space-y-2.5 mb-6">
                  {bundle.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2
                        className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                          isEmerald
                            ? "text-emerald-400"
                            : isCyan
                            ? "text-cyan-400"
                            : "text-amber-400"
                        }`}
                      />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="text-[11px] text-slate-400 italic mb-6">
                  🎯 {bundle.recommendedFor}
                </div>
              </div>

              <button
                onClick={() =>
                  onOpenBookingModal(
                    bundle.title,
                    `Special Home Bundle (₹${bundle.comboPrice})`
                  )
                }
                className={`w-full py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isEmerald
                    ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                    : isCyan
                    ? "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.4)]"
                    : "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                }`}
              >
                <span>Book This Bundle (₹{bundle.comboPrice})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};
