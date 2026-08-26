import React from "react";
import { PageHeader } from "../components/PageHeader";
import { WhyChooseSection } from "../components/WhyChooseSection";
import { WhyChooseComparisonTable } from "../components/WhyChooseComparisonTable";
import { WhyChooseServiceProtocol } from "../components/WhyChooseServiceProtocol";
import { WhyChooseSafetyAudit } from "../components/WhyChooseSafetyAudit";
import { WhyChooseGuarantees } from "../components/WhyChooseGuarantees";
import { WhyChooseFAQ } from "../components/WhyChooseFAQ";
import { BrandTicker } from "../components/BrandTicker";
import { PageType } from "../types";
import { COMPANY_DETAILS, CUSTOMER_REVIEWS } from "../data";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  CheckCircle2,
  Wrench,
  Star,
  Sparkles,
  Phone,
  Zap,
} from "lucide-react";

interface WhyChoosePageProps {
  onNavigate: (page: PageType) => void;
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const WhyChoosePage: React.FC<WhyChoosePageProps> = ({
  onNavigate,
  onOpenBookingModal,
  onOpenChat,
}) => {
  return (
    <div className="w-full">
      {/* Dedicated Page Header */}
      <PageHeader
        badge="Proven Engineering Track Record Since 2011"
        title="Why Avinashi & Beyond Chooses"
        highlightedTitle="VELS"
        description="Experience the difference of manufacturer-trained technical expertise, 100% genuine OEM factory parts, transparent ₹500 fixed diagnostic rates, and our 6-month unconditional revisit guarantee & warranty."
        currentPage="why-choose-us"
        onNavigate={onNavigate}
      />

      {/* Main Core 6 Pillars Feature Grid */}
      <WhyChooseSection />

      {/* Brand Partner Ticker */}
      <BrandTicker />

      {/* 1. Comparison Matrix: VELS vs Local Mechanics */}
      <WhyChooseComparisonTable />

      {/* 2. 6-Stage Precision Service Protocol */}
      <WhyChooseServiceProtocol />

      {/* 3. 12-Point Electrical Safety & Efficiency Audit */}
      <WhyChooseSafetyAudit />

      {/* 4. 4 Unbreakable Customer Guarantees */}
      <WhyChooseGuarantees onOpenBooking={() => onOpenBookingModal()} />

      {/* Verified Customer Testimonials Strip */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5 fill-cyan-400 text-cyan-400" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope'] mb-2">
            Real Experiences from Real Homeowners
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Read how we’ve delivered speed, transparent pricing, and peace of mind across our service territory.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="glass-panel p-6 rounded-3xl border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs font-bold text-cyan-400 font-mono mb-2">
                  {rev.appliance}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{rev.name}</div>
                  <div className="text-[11px] text-slate-400">{rev.location}</div>
                </div>
                <span className="text-[10px] text-slate-500">{rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      <WhyChooseFAQ onOpenChat={() => onOpenChat("Tell me why I should choose VELS for my appliance service")} />

      {/* Final High-Impact Booking Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#070D1F] via-[#091530] to-[#070D1F] text-center relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Doorstep Service within 60–90 Mins</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-['Manrope']">
              Ready for Hassle-Free Appliance Service?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Book online in 30 seconds. Fixed ₹500 visiting and diagnostic fee with zero advance payment required. 100% genuine factory parts & 6-month guarantee & warranty.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onOpenBookingModal()}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,255,0.4)] transition-all cursor-pointer"
              >
                Book Doorstep Visit • Fixed ₹500
              </button>

              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>Call {COMPANY_DETAILS.phone}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>6-Month Guarantee & Warranty</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Genuine OEM Spares</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Engineers</span>
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
