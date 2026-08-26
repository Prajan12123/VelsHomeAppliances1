import React, { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { COMPANY_DETAILS } from "../data";

export const WhyChooseFAQ: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Why is your visiting charge fixed at ₹500?",
      a: "Unlike traditional mechanics who quote arbitrary prices on the spot, VELS operates on a standardized pricing policy. Our ₹500 visiting charge covers the technician's doorstep arrival, thorough digital inspection, electrical safety check, and minor adjustments. If spare parts are needed, you get an upfront quote before any work starts.",
    },
    {
      q: "How do I know the replacement parts are 100% genuine?",
      a: "We procure spare parts directly through official brand supply channels (Samsung, LG, Whirlpool, Bosch, IFB, Voltas, etc.). All replacement components arrive in sealed packaging with official brand barcodes and are backed by up to 90 days manufacturer warranty.",
    },
    {
      q: "What happens if my appliance develops the same issue again?",
      a: "Every service completed by VELS comes with a 6-Month Free Revisit Guarantee and Warranty. If the exact same problem reoccurs within 6 months, we dispatch a senior engineer to resolve it at zero additional service charge.",
    },
    {
      q: "Are the technicians verified and safe for residential visits?",
      a: "Yes, 100%. All VELS technicians undergo thorough background checks, identity verification, and factory technical training. They arrive in official uniform with company ID badges and follow strict hygiene protocols including protective shoe covers.",
    },
    {
      q: "How fast can a technician arrive at my home?",
      a: "For emergency cooling or major appliance issues across Avinashi, Tiruppur, Coimbatore, and neighboring areas, we maintain an average response time of 60 to 90 minutes. You can also select your preferred date and convenient time slot.",
    },
    {
      q: "Do I have to pay anything upfront when booking online?",
      a: "No! Booking is completely free of charge with zero advance payment. You only pay the ₹500 service charge (and any agreed spare parts cost) after the service is fully completed and tested to your satisfaction.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Manrope'] mb-3">
          Got Questions? We’ve Got Clear Answers.
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          Everything you need to know about our service standards, pricing, and guarantees.
        </p>
      </div>

      <div className="space-y-3.5">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? "bg-white/[0.05] border-cyan-500/40 shadow-lg"
                  : "bg-white/[0.02] border-white/5 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <span className="text-sm sm:text-base font-bold text-white font-['Manrope']">
                  {faq.q}
                </span>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen
                      ? "bg-cyan-400 text-slate-950 rotate-180"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-hero-up">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-10 p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm font-bold text-white font-['Manrope']">Still have questions?</h4>
          <p className="text-xs text-slate-400 mt-0.5">Speak with our technical coordinator or chat with our assistant.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{COMPANY_DETAILS.phone}</span>
          </a>
          <button
            onClick={onOpenChat}
            className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat with Assistant</span>
          </button>
        </div>
      </div>
    </section>
  );
};
