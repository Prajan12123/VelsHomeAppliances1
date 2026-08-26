import React, { useState } from "react";
import { PageHeader } from "../components/PageHeader";
import { BookingContactSection } from "../components/BookingContactSection";
import { ContactEmergencyHotline } from "../components/ContactEmergencyHotline";
import { ContactCoverageHubs } from "../components/ContactCoverageHubs";
import { ContactCostEstimator } from "../components/ContactCostEstimator";
import { ContactWhatToExpect } from "../components/ContactWhatToExpect";
import { ContactCorporateInquiry } from "../components/ContactCorporateInquiry";
import { PageType, BookingRecord } from "../types";
import { COMPANY_DETAILS } from "../data";
import {
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ShieldCheck,
  Sparkles,
  Navigation,
  Compass,
  CheckCircle2,
} from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: PageType) => void;
  bookingPrefill: { appliance?: string; service?: string };
  onBookingSuccess: (newBooking: BookingRecord) => void;
  onOpenChat: (initialPrompt?: string) => void;
  onOpenTracker: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onNavigate,
  bookingPrefill,
  onBookingSuccess,
  onOpenChat,
  onOpenTracker,
}) => {
  const [activePrefill, setActivePrefill] = useState<{ appliance?: string; service?: string }>(
    bookingPrefill
  );

  const handleSelectServiceFromEstimator = (appliance: string, service: string) => {
    setActivePrefill({ appliance, service });
    // Smoothly scroll to the booking section
    const bookingElem = document.getElementById("contact");
    if (bookingElem) {
      bookingElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      {/* Dedicated Page Header */}
      <PageHeader
        badge="Direct Hub • Avinashi Tamil Nadu"
        title="Get In Touch &"
        highlightedTitle="Book Doorstep Service"
        description="Book your ₹500 fixed appliance inspection in 30 seconds, connect with our technical desk on WhatsApp, or visit our central showroom on Mangalam Road, Avinashi."
        currentPage="contact"
        onNavigate={onNavigate}
      />

      {/* Priority SOS Emergency Hotline Banner */}
      <ContactEmergencyHotline />

      {/* Main Interactive Booking and Direct Contact Details */}
      <BookingContactSection
        initialAppliance={activePrefill.appliance || bookingPrefill.appliance}
        initialService={activePrefill.service || bookingPrefill.service}
        onBookingSuccess={onBookingSuccess}
        onOpenChat={onOpenChat}
      />

      {/* 100% Upfront Pricing Transparency & Service Cost Estimator */}
      <ContactCostEstimator onSelectService={handleSelectServiceFromEstimator} />

      {/* Regional Doorstep Coverage & Live Dispatch Corridors with ETAs */}
      <ContactCoverageHubs />

      {/* 4-Stage Doorstep Service Experience (What to Expect) */}
      <ContactWhatToExpect />

      {/* Commercial & Corporate AMC Contracts (Textile mills, factories, apartments) */}
      <ContactCorporateInquiry />

      {/* Direct Showroom & Physical Store Visit Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#070D1F] via-[#051124] to-[#070D1F]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest">
                <MapPin className="w-3.5 h-3.5" />
                <span>Central Flagship Store & Service Depot</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope']">
                Visit Our Avinashi Showroom
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Want to see live appliance demonstrations, purchase brand-new appliances with zero down-payment EMI schemes, or hand over an inverter PCB for precision lab micro-soldering? Visit our flagship showroom in Avinashi.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Location Landmark</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    {COMPANY_DETAILS.address} (Near Bus Stand & Mangalam Road Junction)
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                  <div className="font-bold text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-400" />
                    <span>Visiting Hours</span>
                  </div>
                  <div className="text-slate-300">
                    Monday to Sunday: 9:00 AM – 9:00 PM (All 7 Days Open)
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://maps.google.com/?q=Avinashi+Tamil+Nadu+VELS+Home+Appliances`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Google Maps</span>
                </a>

                <button
                  onClick={() => onOpenTracker()}
                  className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Track Existing Booking Ticket
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <h4 className="text-sm font-bold text-white font-['Manrope'] uppercase tracking-wider text-cyan-300">
                  Showroom Amenities & Facilities:
                </h4>
                
                {[
                  "Free Customer Parking for 2-Wheelers & 4-Wheelers",
                  "Air Conditioned Product Experience Zone",
                  "Instant In-Store Paperless Bajaj & HDB Finance Approval",
                  "Immediate Old Appliance Exchange Value Quotation",
                  "Free Coffee / Refreshments while you wait",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Direct Contact Channels Matrix */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
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
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="text-xs font-bold text-slate-400 uppercase">Fixed Diagnostic Fee</div>
              <div className="text-base font-bold text-white mt-1">₹500 Visit & Check</div>
              <p className="text-[11px] text-slate-400 mt-1">Includes 6-month free revisit warranty & guarantee</p>
            </div>
            <div className="mt-4 py-2 px-3 text-center rounded-lg bg-blue-500/10 text-blue-300 font-bold text-xs">
              No Hidden Charges
            </div>
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
