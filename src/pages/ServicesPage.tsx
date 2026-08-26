import React from "react";
import { PageHeader } from "../components/PageHeader";
import { ServicesSection } from "../components/ServicesSection";
import { BrandTicker } from "../components/BrandTicker";
import { ServiceProcessFlow } from "../components/services/ServiceProcessFlow";
import { ServiceMaintenanceGuide } from "../components/services/ServiceMaintenanceGuide";
import { ServiceStandards } from "../components/services/ServiceStandards";
import { ServiceCarePlans } from "../components/services/ServiceCarePlans";
import { ServiceFaqSection } from "../components/services/ServiceFaqSection";
import { PageType } from "../types";
import { COMPANY_DETAILS } from "../data";
import { Wrench, Phone, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface ServicesPageProps {
  onNavigate: (page: PageType) => void;
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenBookingModal,
  onOpenChat,
}) => {
  return (
    <div className="w-full space-y-0">
      {/* 1. Dedicated Page Header */}
      <PageHeader
        badge="Multi-Brand Certified Service Center"
        title="Comprehensive"
        highlightedTitle="Appliance Services"
        description="High-precision diagnostic equipment, high-pressure jet wash systems, OG spare components, and certified technicians for all residential and commercial appliances."
        currentPage="services"
        onNavigate={onNavigate}
      />

      {/* 2. Main Services Component (Full 10 Appliance Cards, Search & Category Filters) */}
      <ServicesSection
        onOpenBookingModal={onOpenBookingModal}
        onOpenChat={onOpenChat}
      />

      {/* 3. 5-Stage Step-by-Step Doorstep Workflow */}
      <ServiceProcessFlow onOpenBookingModal={onOpenBookingModal} />

      {/* 4. Multi-Brand Certified Partner Ticker */}
      <BrandTicker />

      {/* 5. Preventive Maintenance & Master Care Guides */}
      <ServiceMaintenanceGuide onOpenBookingModal={onOpenBookingModal} />

      {/* 6. Technical Standards, Diagnostic Equipment & Safety Protocols */}
      <ServiceStandards />

      {/* 7. Maintenance Care Plans & AMC Packages */}
      <ServiceCarePlans 
        onOpenBookingModal={onOpenBookingModal} 
        onOpenChat={onOpenChat} 
      />

      {/* 8. Comprehensive Service FAQs */}
      <ServiceFaqSection 
        onOpenBookingModal={onOpenBookingModal} 
        onOpenChat={onOpenChat} 
      />

      {/* 9. Direct Contact & Rapid Escalation Guarantee */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-[#070A18]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Genuine OG Spares</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We use only manufacturer-approved genuine spare parts with official serial numbers and warranty coverage.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">6-Month Guarantee & Warranty</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every service includes a written 6-month guarantee & warranty on labor and up to 1-year warranty on replaced components.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white mb-1">Standardized Diagnostic Visit</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Doorstep visiting and complete technical diagnosis with itemized quote prior to repair.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/10">
            <div>
              <div className="text-base font-bold text-white">Have a custom or commercial appliance issue?</div>
              <div className="text-xs text-slate-400">Speak directly with our chief technical supervisor in Avinashi.</div>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
                className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-colors flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>{COMPANY_DETAILS.phoneFormatted}</span>
              </a>
              <button
                onClick={() => onOpenBookingModal()}
                className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-colors cursor-pointer flex items-center gap-2"
              >
                <span>Book Service Visit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

