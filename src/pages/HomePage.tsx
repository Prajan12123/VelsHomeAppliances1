import React from "react";
import { Hero } from "../components/Hero";
import { BrandTicker } from "../components/BrandTicker";
import { HomeLiveDispatchFeed } from "../components/home/HomeLiveDispatchFeed";
import { HomeServiceTracker } from "../components/home/HomeServiceTracker";
import { HomeSymptomSolver } from "../components/home/HomeSymptomSolver";
import { HomeErrorCodeDecoder } from "../components/home/HomeErrorCodeDecoder";
import { HomeAcousticDiagnostics } from "../components/home/HomeAcousticDiagnostics";
import { HomeMasterToolbag } from "../components/home/HomeMasterToolbag";
import { HomeCostEstimator } from "../components/home/HomeCostEstimator";
import { HomeGenuinePartsLab } from "../components/home/HomeGenuinePartsLab";
import { HomeRegionalPowerWaterAudit } from "../components/home/HomeRegionalPowerWaterAudit";
import { HomeVerifiedCaseStudies } from "../components/home/HomeVerifiedCaseStudies";
import { HomePriorityDesk } from "../components/home/HomePriorityDesk";
import { HomeValueBundles } from "../components/home/HomeValueBundles";
import { HomeApplianceHealthCheck } from "../components/home/HomeApplianceHealthCheck";
import { HomeSavingsCalculator } from "../components/home/HomeSavingsCalculator";
import { HomeComparisonMatrix } from "../components/home/HomeComparisonMatrix";
import { HomeCoverageMap } from "../components/home/HomeCoverageMap";
import { HomeDiagnosticProtocol } from "../components/home/HomeDiagnosticProtocol";
import { PageType } from "../types";
import { COMPANY_DETAILS } from "../data";
import {
  Wrench,
  ShoppingBag,
  ShieldCheck,
  Building,
  Phone,
  MessageCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Zap,
  Calendar,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
  onBookingSuccess?: () => void;
  onOpenTracker?: (trackingId?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBookingModal,
  onOpenChat,
  onOpenTracker = (_id?: string) => {},
}) => {
  return (
    <div className="w-full">
      {/* 1. Main Interactive Hero */}
      <Hero
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 2. Multi-Brand Partner Ticker */}
      <BrandTicker />

      {/* 3. EXCLUSIVE HOME FEATURE: Live Mobile Technician Dispatch Radar */}
      <HomeLiveDispatchFeed
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 4. EXCLUSIVE HOME FEATURE: Live Service Order & Technician GPS Tracker */}
      <HomeServiceTracker
        onOpenTrackerWithId={(id) => onOpenTracker(id)}
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 5. EXCLUSIVE HOME FEATURE: Interactive Diagnostic Symptom Matrix */}
      <HomeSymptomSolver
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 5. EXCLUSIVE HOME FEATURE: Multi-Brand Error Code Diagnostic Decoder */}
      <HomeErrorCodeDecoder
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 6. EXCLUSIVE HOME FEATURE: Acoustic Sound Diagnostic Lab */}
      <HomeAcousticDiagnostics
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 7. EXCLUSIVE HOME FEATURE: Doorstep Master Engineer Toolbag & Instrumentation */}
      <HomeMasterToolbag
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 8. EXCLUSIVE HOME FEATURE: Transparent Repair Cost & Spare Parts Estimator */}
      <HomeCostEstimator
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 9. EXCLUSIVE HOME FEATURE: Inside Our Genuine Parts Lab & Authenticator */}
      <HomeGenuinePartsLab
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 10. EXCLUSIVE HOME FEATURE: Regional Power Surge, Hard Water & Textile Lint Protection Guide */}
      <HomeRegionalPowerWaterAudit
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 11. EXCLUSIVE HOME FEATURE: Verified Local Engineering Case Files */}
      <HomeVerifiedCaseStudies
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 9. EXCLUSIVE HOME FEATURE: Specialized Priority Service Desks */}
      <HomePriorityDesk
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 10. EXCLUSIVE HOME FEATURE: Seasonal Multi-Appliance Value Bundles */}
      <HomeValueBundles
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 11. EXCLUSIVE HOME FEATURE: 60-Second Appliance Health & Risk Scorecard */}
      <HomeApplianceHealthCheck
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 12. EXCLUSIVE HOME FEATURE: Smart Energy Bill & Lifespan Savings Calculator */}
      <HomeSavingsCalculator
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 13. EXCLUSIVE HOME FEATURE: Certified Standards vs Local Market Comparison */}
      <HomeComparisonMatrix
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 14. EXCLUSIVE HOME FEATURE: Live Avinashi & Tirupur Service Dispatch Radar */}
      <HomeCoverageMap
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 15. EXCLUSIVE HOME FEATURE: Transparent 4-Stage ₹500 Visit Protocol */}
      <HomeDiagnosticProtocol
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* 8. Quick Category Gateways to Dedicated Pages */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explore Dedicated Showrooms & Hubs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope'] mb-2">
            Looking for something specific?
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm">
            Visit our dedicated catalogs for full repair pricing, brand-new appliances, customer reviews, or our Avinashi workshop.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Services */}
          <div className="glass-panel p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                <Wrench className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider mb-1">
                Visiting + Service: ₹500
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
                Appliance Services
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Explore individual price cards, common faults, and part details for 10+ appliances.
              </p>
            </div>
            <button
              onClick={() => onNavigate("services")}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-white hover:text-cyan-300 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
            >
              <span>View All Services</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 2: Appliances Store */}
          <div className="glass-panel p-5 rounded-2xl border border-blue-500/20 hover:border-blue-400/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-1">
                Authorized Dealer
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">
                Appliances Showroom
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Browse latest Inverter ACs, Side-by-Side Fridges, Smart TVs & Kitchen suites.
              </p>
            </div>
            <button
              onClick={() => onNavigate("appliances")}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-blue-500/20 border border-white/10 hover:border-blue-500/40 text-white hover:text-blue-300 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Browse Products</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 3: Why Choose Us */}
          <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 hover:border-amber-400/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider mb-1">
                15+ Years Trust
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-amber-300 transition-colors">
                Why Choose Us
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Learn about our 50+ master engineers, OG parts sourcing, and 6-month guarantee & warranty.
              </p>
            </div>
            <button
              onClick={() => onNavigate("why-choose-us")}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-amber-500/20 border border-white/10 hover:border-amber-500/40 text-white hover:text-amber-300 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Our Credentials</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Card 4: About & Contact */}
          <div className="glass-panel p-5 rounded-2xl border border-emerald-500/20 hover:border-emerald-400/50 transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <div className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider mb-1">
                4.9 ★ (1,250+ Reviews)
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-emerald-300 transition-colors">
                About & Contact
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                View our Avinashi address, Google rating breakdown, and direct appointment scheduler.
              </p>
            </div>
            <button
              onClick={() => onNavigate("contact")}
              className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 hover:border-emerald-500/40 text-white hover:text-emerald-300 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Visit Contact Hub</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 9. Direct Contact Quick-Action Cards */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3">
                <Phone className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase">Direct Calling Hotline</div>
              <div className="text-base font-bold font-mono text-white mt-1">{COMPANY_DETAILS.phoneFormatted}</div>
              <p className="text-[11px] text-slate-400 mt-1">Available 8:00 AM – 9:30 PM Daily</p>
            </div>
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
              className="mt-4 w-full py-2 text-center rounded-lg bg-cyan-500/20 hover:bg-cyan-400 text-cyan-300 hover:text-slate-950 font-bold text-xs transition-colors"
            >
              Call Technician Now
            </a>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-3">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase">WhatsApp Help Desk</div>
              <div className="text-base font-bold font-mono text-white mt-1">{COMPANY_DETAILS.phoneFormatted}</div>
              <p className="text-[11px] text-slate-400 mt-1">Send photos / videos of error codes</p>
            </div>
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20need%20assistance.`}
              target="_blank"
              rel="noreferrer"
              className="mt-4 w-full py-2 text-center rounded-lg bg-emerald-500/20 hover:bg-emerald-500 text-emerald-300 hover:text-white font-bold text-xs transition-colors"
            >
              Open WhatsApp Chat
            </a>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-blue-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-3">
                <Clock className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase">Track Service Status</div>
              <div className="text-base font-bold text-white mt-1">Live Status Lookup</div>
              <p className="text-[11px] text-slate-400 mt-1">Check assigned technician & ETA</p>
            </div>
            <button
              onClick={onOpenTracker}
              className="mt-4 w-full py-2 text-center rounded-lg bg-blue-500/20 hover:bg-blue-400 text-blue-300 hover:text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Track Active Booking
            </button>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase">AI Diagnosis Assistant</div>
              <div className="text-base font-bold text-white mt-1">Instant Smart Help</div>
              <p className="text-[11px] text-slate-400 mt-1">Interactive troubleshooting 24/7</p>
            </div>
            <button
              onClick={() => onOpenChat()}
              className="mt-4 w-full py-2 text-center rounded-lg bg-amber-500/20 hover:bg-amber-400 text-amber-300 hover:text-slate-950 font-bold text-xs transition-colors cursor-pointer"
            >
              Launch AI Concierge
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
