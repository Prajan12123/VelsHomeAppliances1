import React from "react";
import { PageHeader } from "../components/PageHeader";
import { AboutSection } from "../components/AboutSection";
import { AboutMilestones } from "../components/AboutMilestones";
import { AboutInfrastructure } from "../components/AboutInfrastructure";
import { AboutTeamAndValues } from "../components/AboutTeamAndValues";
import { AboutCertifications } from "../components/AboutCertifications";
import { BrandTicker } from "../components/BrandTicker";
import { PageType } from "../types";
import { COMPANY_DETAILS } from "../data";
import {
  HeartHandshake,
  Eye,
  Award,
  CheckCircle2,
  MapPin,
  Wrench,
  Phone,
  Clock,
  Sparkles,
} from "lucide-react";

interface AboutPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  return (
    <div className="w-full">
      {/* Dedicated Page Header */}
      <PageHeader
        badge="Serving Tamil Nadu Since 2011"
        title="About"
        highlightedTitle="VELS HOME APPLIANCES"
        description="Founded on the principles of engineering precision, transparent pricing, and unwavering customer care, VELS has been the premier multi-brand appliance service and sales choice for over 25,000 households."
        currentPage="about"
        onNavigate={onNavigate}
      />

      {/* Main Narrative & Story (Includes Avinashi Showroom Image & Customer Reviews) */}
      <AboutSection onOpenBookingModal={() => onOpenBookingModal()} />

      {/* Brand Partner Ticker */}
      <BrandTicker />

      {/* 15-Year Evolution Timeline (2011 - 2026) */}
      <AboutMilestones />

      {/* World-Class Infrastructure & Laboratory Facilities */}
      <AboutInfrastructure />

      {/* Certified Technical Leadership & In-House Training Academy */}
      <AboutTeamAndValues />

      {/* Environmental Standards, E-Waste & Safety Compliance */}
      <AboutCertifications />

      {/* Mission, Vision & Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Guiding Principles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope'] mb-2">
            Our Purpose & Commitment
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Setting the highest ethical standard for home appliance maintenance in South India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 bg-[#070A18] relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-4">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Manrope']">
              Our Vision
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              To be South India's benchmark appliance solutions provider by delivering zero-friction retail, ethical ₹500 flat-rate service visits, and uncompromised technical craftsmanship in every home we serve.
            </p>
            <div className="space-y-1.5 text-xs text-cyan-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Standardized pricing across all appliance types</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Regional footprint expansion with local service hubs</span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-emerald-500/20 bg-[#070A18] relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2 font-['Manrope']">
              Our Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              To eradicate opaque technician estimates, fake duplicate spares, and delayed repairs by guaranteeing OG component authenticity, 60–90 minute doorstep arrival, and transparent digital workflows.
            </p>
            <div className="space-y-1.5 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>100% Factory-sealed OEM replacement spares</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>6-Month unconditional free revisit guarantee & warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Master Center Address Card */}
        <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-lg">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                Master Flagship Service Hub & Showroom
              </div>
              <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                {COMPANY_DETAILS.address}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Open Mon – Sun: 9:00 AM to 9:00 PM</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.3)]"
            >
              Book Service • ₹500
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Get Directions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
