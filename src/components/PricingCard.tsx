import React from "react";
import {
  ShieldCheck,
  CheckCircle,
  Zap,
  Wrench,
  Clock,
  FileText,
  BadgeIndianRupee,
  Sparkles,
  Phone,
  ArrowRight,
} from "lucide-react";
import { COMPANY_DETAILS } from "../data";

interface PricingCardProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  return (
    <section id="pricing" className="relative py-24 bg-[#05070F] overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <BadgeIndianRupee className="w-3.5 h-3.5" />
            <span>Zero Hidden Charges Policy</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Honest, Transparent Pricing
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base">
            Never worry about inflated estimates or unfair quotation tricks. At Vels Home Appliances, we believe in complete upfront transparency.
          </p>
        </div>

        {/* Prominent Glossy Glass Pricing Card */}
        <div className="glass-pricing-highlight p-8 sm:p-12 rounded-3xl relative overflow-hidden">
          
          {/* Top Corner Ribbon / Badge */}
          <div className="absolute -top-10 -right-10 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Col: Giant Fixed Pricing Metric */}
            <div className="lg:col-span-6 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-white/15 pb-8 lg:pb-0 lg:pr-8">
              
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                <Sparkles className="w-3 h-3" />
                <span>Fixed Rate Guarantee</span>
              </div>

              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-slate-400 mb-1">
                Standard Doorstep Rate
              </h3>

              <div className="text-2xl sm:text-3xl font-extrabold text-white mb-2 font-['Manrope']">
                VISITING + SERVICE CHARGE —{" "}
                <span className="text-cyan-300 font-mono text-4xl sm:text-5xl block sm:inline">
                  ₹500
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Applies to all home appliances: AC, Fridge, Washing Machine, Smart TV, Microwave, Chimney, Geyser, Dishwasher, and more.
              </p>

              {/* Combined Visiting Charge + Service Charge Box */}
              <div className="w-full mb-6 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      Visiting Charge + Service Charge
                    </div>
                    <div className="text-[11px] text-slate-300">
                      Doorstep arrival + full multi-point diagnosis combined
                    </div>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
                    ₹500
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Fixed Total</span>
                </div>
              </div>

              {/* Glowing Book Service Button */}
              <button
                onClick={() => onOpenBookingModal()}
                id="pricing-book-service-btn"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_35px_rgba(0,229,255,0.5)] hover:shadow-[0_0_50px_rgba(0,229,255,0.8)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Wrench className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                <span>Book Service Now (₹500)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>

            {/* Right Col: Comprehensive Transparency Checklist */}
            <div className="lg:col-span-6 flex flex-col space-y-4 lg:pl-4">
              
              <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>What Is Included in the VELS Promise:</span>
              </h4>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200">
                
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Full Digital & Physical Diagnostic:</strong> Electronic sensor scanning, amperage check, pressure gauges, and physical safety checks.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Upfront Quote Prior to Any Part Swap:</strong> If any spare part is needed, the technician presents the OG pricing catalog for your approval first.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-emerald-300">6-Month Free Revisit Guarantee & Warranty:</strong> If the exact same issue reoccurs within 6 months, we revisit and service completely free of charge.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">100% Genuine OG Replacement Spares:</strong> Original brand-sealed parts with barcodes and manufacturer warranty cards.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">Digital GST Invoicing & Online Payment:</strong> Pay securely via UPI, QR, credit/debit card, or cash after your satisfaction.
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Inquiry Option */}
              <div className="pt-3 flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20would%20like%20to%20book%20a%20technician%20for%20the%20Rs%20500%20fixed%20service.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 hover:bg-emerald-900/60 text-emerald-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant WhatsApp Booking</span>
                </a>

                <button
                  onClick={() => onOpenChat("What are your exact spare parts rates and ₹500 fee terms?")}
                  className="shrink-0 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Ask AI
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
