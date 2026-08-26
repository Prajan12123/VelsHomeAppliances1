import React from "react";
import { PageHeader } from "../components/PageHeader";
import { ApplianceShowroom } from "../components/ApplianceShowroom";
import { ApplianceCapacityAdvisor } from "../components/appliances/ApplianceCapacityAdvisor";
import { ApplianceExchangeEvaluator } from "../components/appliances/ApplianceExchangeEvaluator";
import { ApplianceTechComparison } from "../components/appliances/ApplianceTechComparison";
import { ApplianceVIPShowroomServices } from "../components/appliances/ApplianceVIPShowroomServices";
import { PageType } from "../types";
import { COMPANY_DETAILS } from "../data";
import { ShoppingBag, Truck, ShieldCheck, Zap, MessageCircle, Phone, MapPin } from "lucide-react";

interface AppliancesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const AppliancesPage: React.FC<AppliancesPageProps> = ({
  onNavigate,
  onOpenBookingModal,
  onOpenChat,
}) => {
  return (
    <div className="w-full space-y-4">
      {/* Dedicated Page Header */}
      <PageHeader
        badge="Authorized Showroom & Direct Retail"
        title="Smart Appliance"
        highlightedTitle="Showroom & Catalog"
        description="Explore the latest 5-Star BEE rated energy-efficient appliances from leading global brands. Request custom in-store quotations, schedule free live in-home demonstrations, and get zero-cost EMI assistance in Avinashi."
        currentPage="appliances"
        onNavigate={onNavigate}
      />

      {/* Main Appliance Showroom Catalog Component (Prices removed, showroom quotes & demo CTAs) */}
      <ApplianceShowroom
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* Exclusive 1: Smart Sizing & Capacity Matcher */}
      <ApplianceCapacityAdvisor
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* Exclusive 2: Instant Old Appliance Trade-In & Exchange Bonus Calculator */}
      <ApplianceExchangeEvaluator
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* Exclusive 3: Modern Smart Tech vs Conventional Deep Dive */}
      <ApplianceTechComparison
        onOpenBookingModal={onOpenBookingModal}
      />

      {/* Exclusive 4: VIP Showroom Retail Perks */}
      <ApplianceVIPShowroomServices
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* Showroom Visit CTA */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-[#070A18] via-[#091535] to-[#040815] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>Avinashi Flagship Showroom</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2 font-['Manrope']">
              Visit Us in Person or Inquire via WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              {COMPANY_DETAILS.address} • Open 8:00 AM to 9:30 PM Daily.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20am%20interested%20in%20in-store%20deals%20and%20demonstrations%20for%20appliances.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Showroom</span>
            </a>
            <button
              onClick={() => onNavigate("contact")}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              View Store Map
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
