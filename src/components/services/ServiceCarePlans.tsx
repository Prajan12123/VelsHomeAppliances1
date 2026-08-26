import React, { useState } from "react";
import { 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Clock, 
  Wrench,
  HelpCircle,
  Award
} from "lucide-react";

interface ServiceCarePlansProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ServiceCarePlans: React.FC<ServiceCarePlansProps> = ({ onOpenBookingModal, onOpenChat }) => {
  const [billingCycle, setBillingCycle] = useState<"annual" | "biannual">("annual");

  const plans = [
    {
      id: "on-demand",
      name: "On-Demand Express Visit",
      badge: "Pay As You Go",
      tagline: "Perfect for one-time troubleshooting, sudden faults & emergency diagnostics.",
      price: "₹500",
      period: "per visit",
      isPopular: false,
      features: [
        "60–90 min doorstep arrival guarantee",
        "Comprehensive multi-point digital diagnosis",
        "Safety isolation and electrical load check",
        "Itemized quote before any spare parts replacement",
        "Written 6-month guarantee & warranty on labor & diagnostics",
        "Clean workspace & testing run cycle"
      ],
      excluded: [
        "Routine seasonal cleaning packages",
        "Priority emergency weekend dispatch queue",
        "Discounts on genuine OG replacement parts"
      ],
      cta: "Book Express Visit",
      ctaAction: () => onOpenBookingModal(undefined, "On-Demand Express Diagnostic Visit")
    },
    {
      id: "home-care-plus",
      name: "Home Care AMC Plus",
      badge: "Most Popular for Homes",
      tagline: "Comprehensive year-round coverage for 3 key appliances (AC, Refrigerator & Washing Machine).",
      price: billingCycle === "annual" ? "₹2,499" : "₹1,499",
      period: billingCycle === "annual" ? "per year" : "per 6 months",
      isPopular: true,
      features: [
        "2 Free Comprehensive High-Pressure AC Jet Servicings",
        "1 Free Refrigerator Coil Deep Cleaning & Gas Profiling",
        "1 Free Washing Machine Descaling & Drum Realignment",
        "Unlimited Breakdown Diagnostic Visits at Zero Visiting Fee",
        "15% Discount on all Genuine OG Spare Parts",
        "Priority same-day dispatch queue (Under 60 mins)",
        "Dedicated Master Engineer assigned to your residence",
        "Full 90-day extended warranty on all repairs"
      ],
      excluded: [],
      cta: "Activate Home Care Plan",
      ctaAction: () => onOpenBookingModal("Home Care AMC Plus", "Annual Maintenance Contract Package")
    },
    {
      id: "villa-elite",
      name: "Villa & Commercial Elite Care",
      badge: "Full Estate Protection",
      tagline: "Unmatched maintenance coverage for luxury villas, modular kitchen suites & commercial setups.",
      price: billingCycle === "annual" ? "₹5,999" : "₹3,499",
      period: billingCycle === "annual" ? "per year" : "per 6 months",
      isPopular: false,
      features: [
        "All appliances covered (Up to 8 units: ACs, Fridge, Washers, TV, Water Purifier, Chimney)",
        "4 Free Routine High-Pressure Deep Cleanings per year",
        "Zero Visiting Charges for unlimited emergency calls",
        "25% Flat Discount on OG Spares & PCB repair services",
        "VIP 45-minute arrival SLA with senior master technician",
        "Bi-monthly proactive health check & power surge audit",
        "Direct WhatsApp line to Chief Technical Supervisor",
        "180-day extended warranty on all replaced components"
      ],
      excluded: [],
      cta: "Get Elite Villa Coverage",
      ctaAction: () => onOpenBookingModal("Villa & Commercial Elite", "VIP Multi-Appliance Protection Plan")
    }
  ];

  return (
    <section className="py-20 bg-[#05070F] border-t border-white/10 relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Award className="w-3.5 h-3.5 text-cyan-400" />
            <span>Annual Maintenance & Protection Plans</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Transparent Care Plans for Every Household
          </h2>
          
          <p className="text-base text-slate-300">
            Choose between pay-as-you-go single repairs or all-inclusive annual maintenance packages with free routine deep services and spare part discounts.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white/[0.05] border border-white/10 mt-6">
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "annual"
                  ? "bg-cyan-400 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              Annual Contract (Save 20%)
            </button>
            <button
              onClick={() => setBillingCycle("biannual")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                billingCycle === "biannual"
                  ? "bg-cyan-400 text-slate-950 shadow-md"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              6-Month Plan
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`glass-panel p-8 rounded-3xl border transition-all duration-300 relative flex flex-col justify-between ${
                  plan.isPopular
                    ? "bg-gradient-to-b from-[#0B1536] to-[#060A1A] border-cyan-400 shadow-[0_0_40px_rgba(0,229,255,0.2)] lg:-translate-y-2"
                    : "bg-white/[0.02] border-white/10 hover:border-cyan-500/30"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-black text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    <span>Best Value Recommendation</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-white font-['Manrope'] mb-2">
                    {plan.name}
                  </h3>

                  <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                    {plan.tagline}
                  </p>

                  <div className="flex items-baseline gap-2 pb-6 border-b border-white/10 mb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                      {plan.price}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      / {plan.period}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Included in Plan:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}

                    {plan.excluded && plan.excluded.length > 0 && (
                      <div className="pt-2 space-y-2">
                        {plan.excluded.map((item, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-500">
                            <span className="w-4 text-center font-mono font-bold">—</span>
                            <span className="leading-snug line-through">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={plan.ctaAction}
                  className={`w-full py-3.5 px-6 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.isPopular
                      ? "bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                      : "bg-white/10 hover:bg-cyan-400 hover:text-slate-950 text-white border border-white/15 hover:border-cyan-400"
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            );
          })}
        </div>

        {/* Custom Corporate & Commercial Note */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shrink-0">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Need a customized contract for restaurants, hotels, or commercial buildings?</div>
              <div className="text-xs text-slate-400">We offer custom multi-unit commercial preventative maintenance plans across Avinashi & Tirupur.</div>
            </div>
          </div>
          <button
            onClick={() => onOpenChat("I need information on commercial AMC plans for multiple air conditioners and refrigeration units.")}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
          >
            Inquire Commercial AMC
          </button>
        </div>

      </div>
    </section>
  );
};
