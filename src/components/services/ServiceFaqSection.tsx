import React, { useState } from "react";
import { 
  ChevronDown, 
  HelpCircle, 
  Search, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  Wrench,
  Sparkles,
  PhoneCall
} from "lucide-react";
import { COMPANY_DETAILS } from "../../data";

interface ServiceFaqSectionProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ServiceFaqSection: React.FC<ServiceFaqSectionProps> = ({ onOpenBookingModal, onOpenChat }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [faqSearch, setFaqSearch] = useState<string>("");

  const faqs = [
    {
      category: "Pricing & Billing",
      question: "What exactly is covered under the Visiting & Diagnostic Charge?",
      answer: "Our standard charge covers complete doorstep arrival within 60–90 minutes, safety testing, digital multi-point diagnosis using calibrated meters, error code analysis, and an upfront itemized written estimate. If you approve the repair, this fee covers the fundamental service labor; only necessary replacement OG parts are billed separately at actual MRP."
    },
    {
      category: "Pricing & Billing",
      question: "Will I ever face unexpected hidden charges or surge fees?",
      answer: "Never. Transparency is the founding principle of VELS Home Appliances. Our technician is strictly mandated to deliver an itemized quotation specifying spare part numbers and prices before performing any disassembly or repair. Work begins only after your explicit approval."
    },
    {
      category: "Warranty & Guarantee",
      question: "How does the 6-Month Written Service Guarantee & Warranty work?",
      answer: "Every service completed by our team includes a written 6-month labor and diagnostic guarantee & warranty. If the same fault recurs within 6 months of the repair, our master engineer will revisit your doorstep free of charge to inspect and rectify the issue immediately."
    },
    {
      category: "Warranty & Guarantee",
      question: "What is the warranty period for replaced spare parts?",
      answer: "All replacement parts sourced by VELS are 100% genuine OG components from brand manufacturers (Samsung, LG, Whirlpool, Bosch, Daikin, etc.). Replacement spare parts carry manufacturer warranty coverage ranging from 90 days up to 1 full year depending on the specific component (compressors, motors, PCB boards, sensors)."
    },
    {
      category: "Turnaround & Timing",
      question: "How quickly can a technician reach my home in Avinashi / Tirupur?",
      answer: "For standard bookings, we offer convenient 1-hour time slots. For urgent cooling or laundry breakdowns, our express dispatch SLA ensures a technician arrives at your doorstep in 60–90 minutes across Avinashi, Tirupur, Sevur, Mangalam, Thekkalur, and surrounding areas."
    },
    {
      category: "Turnaround & Timing",
      question: "Can repairs be finished on the spot during the first visit?",
      answer: "Over 88% of common appliance issues (such as capacitor failures, gas top-ups, drain pump clogs, defrost sensor replacements, and thermostat calibrations) are resolved on the spot in 45–60 minutes because our mobile service vans carry standard OG components."
    },
    {
      category: "Spares & Authenticity",
      question: "Are your spare parts genuine factory originals or generic copies?",
      answer: "We have zero tolerance for counterfeit or low-grade duplicate components. All replacement parts are delivered in sealed manufacturer packaging with genuine QR/barcode authentication and are unboxed in front of you."
    },
    {
      category: "Safety & Credentials",
      question: "How are your technicians trained and verified?",
      answer: "All VELS technicians undergo thorough background checks, identity verification, and factory brand training. They are equipped with official company uniforms, ID badges, insulated safety toolkits, and protective floor covers to safeguard your home interiors."
    },
    {
      category: "Payments",
      question: "What payment methods do you accept at the time of service?",
      answer: "We support seamless digital payments including Google Pay, PhonePe, Paytm, BHIM UPI, credit/debit cards (via mobile POS machines), Net Banking, and cash. You receive an instant digital GST invoice via SMS and WhatsApp upon payment."
    }
  ];

  const categories = ["All", "Pricing & Billing", "Warranty & Guarantee", "Turnaround & Timing", "Spares & Authenticity", "Payments"];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "All" || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-[#070A18] border-t border-white/10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Everything You Need to Know About Our Services
          </h2>
          
          <p className="text-base text-slate-300">
            Got questions regarding our technician dispatch, genuine parts warranties, or visiting charges? Find clear answers below.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="space-y-4 mb-10">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service questions (e.g. warranty, arrival time, genuine parts, payment)..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl glass-input text-xs sm:text-sm placeholder:text-slate-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar justify-start sm:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                    : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5 mb-12">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#0A102A] border-cyan-500/40 shadow-[0_0_25px_rgba(0,229,255,0.1)]"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-white font-['Manrope']">
                        {faq.question}
                      </span>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-cyan-400" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-hero-up">
                      <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center glass-panel rounded-2xl border-white/10">
              <p className="text-sm text-slate-400 mb-3">No matching questions found for "{faqSearch}".</p>
              <button
                onClick={() => { setFaqSearch(""); setActiveCategory("All"); }}
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs"
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-[#0B1536] to-[#060A18] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-base sm:text-lg font-extrabold text-white mb-1">
              Still have a specific appliance query?
            </div>
            <div className="text-xs text-slate-300">
              Ask our AI Diagnostic Assistant or speak directly with our technical support team.
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onOpenChat("I have a question regarding appliance repair services in Avinashi.")}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Ask AI Concierge</span>
            </button>
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
              className="px-4 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Technician</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
