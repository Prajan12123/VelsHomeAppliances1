import React, { useState } from "react";
import {
  Zap,
  Building2,
  HeartHandshake,
  Clock,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  AlertCircle,
} from "lucide-react";
import { COMPANY_DETAILS } from "../../data";

interface PriorityTier {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  icon: any;
  targetAudience: string;
  slaTime: string;
  benefits: string[];
  pricingNote: string;
  hotline: string;
}

const PRIORITY_TIERS: PriorityTier[] = [
  {
    id: "senior-healthcare",
    badge: "Compassionate Care",
    badgeColor: "border-rose-500/40 bg-rose-500/10 text-rose-300",
    title: "Senior Citizens & Medical Priority Desk",
    subtitle: "Zero-Stress Doorstep Assistance for Elders & Patient Care",
    icon: HeartHandshake,
    targetAudience: "Homes with elderly parents, medical oxygen/insulin cooling needs, and mobility-assisted households.",
    slaTime: "Express Dispatch within 45–60 Mins",
    benefits: [
      "Zero physical effort: Technician handles all appliance moving and cleaning",
      "Clear verbal & visual explanation in Tamil/English before touching any parts",
      "Direct phone call updates sent to family members / children working remotely",
      "Fixed ₹500 diagnostic rate with zero advance payment and 6-month guarantee",
    ],
    pricingNote: "Standard ₹500 fixed diagnostic fee applies (No surcharge for senior care).",
    hotline: "+91 90874 96742",
  },
  {
    id: "commercial-textile",
    badge: "B2B & Corporate SLA",
    badgeColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    title: "Garment Units, Clinics & Commercial Offices",
    subtitle: "High-Capacity Air Conditioning, Chiller & Breakroom Maintenance",
    icon: Building2,
    targetAudience: "Tiruppur textile exporters, dental/eye clinics, retail showrooms, schools, and boutique hotels.",
    slaTime: "Guaranteed Under 2 Hours Corporate SLA",
    benefits: [
      "Multi-Unit Jet Deep Cleaning without halting office business operations",
      "Itemized B2B Tax Invoices with official GST input credit compliance",
      "Scheduled Sunday / Night preventive maintenance windows available",
      "Annual Maintenance Contract (AMC) rates with dedicated account manager",
    ],
    pricingNote: "Custom discounted volume rates starting at ₹399/unit for 3+ units.",
    hotline: "+91 90874 96742",
  },
  {
    id: "emergency-sos",
    badge: "Rapid Emergency Response",
    badgeColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    title: "Emergency SOS Breakdown Hotline",
    subtitle: "Instant Critical Dispatch for Food & Medicine Refrigeration Loss",
    icon: Zap,
    targetAudience: "Sudden refrigerator cooling loss with perishables, deep-freeze breakdown, or water geyser short circuit.",
    slaTime: "Immediate Master Dispatch (<45 Mins)",
    benefits: [
      "Top-tier master engineer assigned with fully stocked van of OG spare parts",
      "Immediate stabilization of electrical short circuits and MCB tripping",
      "Temporary cooling mitigation guidance provided over phone while en route",
      "6-Month unconditional warranty card handed immediately upon sign-off",
    ],
    pricingNote: "Transparent standard ₹500 fee — never surge pricing for emergencies.",
    hotline: "+91 90874 96742",
  },
];

interface HomePriorityDeskProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
  onOpenChat: (prompt?: string) => void;
}

export const HomePriorityDesk: React.FC<HomePriorityDeskProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [selectedTier, setSelectedTier] = useState<PriorityTier>(PRIORITY_TIERS[0]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exclusive Specialized Care Channels</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Specialized Priority Service Desks
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Tailored rapid-response workflows designed for elderly care, critical business uptime, and urgent domestic breakdowns.
        </p>
      </div>

      {/* Tier Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PRIORITY_TIERS.map((tier) => {
          const isSelected = selectedTier.id === tier.id;
          const Icon = tier.icon;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTier(tier)}
              className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? "bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_25px_rgba(0,229,255,0.2)]"
                  : "glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400" />
              )}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isSelected
                        ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                        : "bg-white/5 text-slate-400 border border-white/10"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full border font-mono font-bold ${tier.badgeColor}`}>
                    {tier.badge}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-200 transition-colors mb-1">
                  {tier.title}
                </h3>
                <div className="text-xs text-slate-400 leading-snug line-clamp-2">
                  {tier.subtitle}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">Response SLA:</span>
                <span className="text-cyan-300 font-bold">{tier.slaTime.split("within ")[1] || tier.slaTime}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Tier Expanded Feature Card */}
      <div className="glass-panel p-6 sm:p-9 rounded-3xl border border-cyan-500/30 relative overflow-hidden bg-slate-900/90 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold mb-2">
                <Clock className="w-3.5 h-3.5" />
                <span>{selectedTier.slaTime}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope'] mb-1">
                {selectedTier.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {selectedTier.targetAudience}
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Dedicated Service Protocol Inclusions:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedTier.benefits.map((benefit, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{selectedTier.pricingNote}</span>
            </div>
          </div>

          {/* Right Action Box */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between space-y-4">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">
                Priority Dispatch Desk
              </div>
              <div className="text-lg font-bold text-white font-['Manrope']">
                Need Immediate Coordination?
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Connect directly with our senior dispatch supervisor for instantaneous technician assignment.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-center">
              <div className="text-[11px] font-mono text-slate-400 uppercase">Emergency & Priority Hotline</div>
              <div className="text-xl font-mono font-extrabold text-cyan-300 tracking-wider mt-0.5">
                {COMPANY_DETAILS.phoneFormatted}
              </div>
              <div className="text-[10px] text-emerald-400 mt-1 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Lines Active • Immediate Human Response</span>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
                className="w-full py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Priority Desk Now</span>
              </a>

              <button
                onClick={() => onOpenBookingModal("Priority Service", selectedTier.title)}
                className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Reserve Scheduled Priority Slot Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
