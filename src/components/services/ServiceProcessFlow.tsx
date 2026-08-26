import React, { useState } from "react";
import { 
  CalendarCheck2, 
  MapPin, 
  SearchCheck, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Zap,
  PhoneCall
} from "lucide-react";

interface ServiceProcessFlowProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const ServiceProcessFlow: React.FC<ServiceProcessFlowProps> = ({ onOpenBookingModal }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      stepNumber: "01",
      title: "Smart Booking & Fast Confirmation",
      subtitle: "Under 60 Seconds",
      icon: CalendarCheck2,
      badge: "Instant Lock",
      desc: "Select your appliance issue, pick your preferred time slot, and receive instant SMS and WhatsApp confirmation with a unique service tracking ID.",
      details: [
        "Select date & convenient 1-hour time window",
        "Choose express 60-90 min arrival or scheduled slot",
        "Instant booking reference ID & direct WhatsApp coordinator",
        "Zero advance payment required to book"
      ],
      tagline: "Transparent, immediate slot reservation without waiting queues."
    },
    {
      stepNumber: "02",
      title: "Verified Master Technician Arrival",
      subtitle: "60–90 Min Doorstep SLA",
      icon: MapPin,
      badge: "GPS Tracked",
      desc: "Our factory-trained, background-checked technician arrives punctually at your doorstep in official uniform with ID badge, sanitization kit, and calibrated diagnostic tools.",
      details: [
        "Real-time SMS update when technician is en route",
        "Technician identity badge, phone number & photo shared",
        "Arrives with specialized floor mats & protective shoe covers",
        "Fully equipped mobile repair kit with standard OG spares"
      ],
      tagline: "Courteous, verified experts who respect your home and time."
    },
    {
      stepNumber: "03",
      title: "High-Precision Digital Diagnostic",
      subtitle: "Zero Guesswork",
      icon: SearchCheck,
      badge: "Multi-Point Check",
      desc: "Using digital multimeters, thermal sensors, and pressure gauges, we run a thorough multi-point inspection to pinpoint the exact root cause of the breakdown.",
      details: [
        "In-depth electrical, mechanical & gas pressure testing",
        "Error code extraction and PCB voltage profiling",
        "Visual inspection of motor coils, valves & cooling loops",
        "Clear explanation of the fault provided in plain language"
      ],
      tagline: "Comprehensive diagnostic report before any disassembly."
    },
    {
      stepNumber: "04",
      title: "Transparent Written Estimate & Approval",
      subtitle: "Zero Hidden Charges",
      icon: FileText,
      badge: "Upfront Clarity",
      desc: "You receive an itemized quote detailing labor and OG spare parts pricing at actual manufacturer MRP. Repair only proceeds with your explicit approval.",
      details: [
        "Itemized cost breakdown with manufacturer part numbers",
        "No pressure policy — repair proceeds ONLY upon your green light",
        "Genuine OG parts unpacked in front of you with seals intact",
        "Clear comparison between repair options when available"
      ],
      tagline: "No surprise bills, no hidden surcharges, ever."
    },
    {
      stepNumber: "05",
      title: "Precision Repair & 6-Month Warranty",
      subtitle: "Complete Peace of Mind",
      icon: CheckCircle2,
      badge: "Guaranteed",
      desc: "We perform the repair using OG parts, execute a full live test cycle to verify 100% operation, clean the workspace, and hand over a digital 6-month guarantee & warranty card.",
      details: [
        "Full operational cycle test under real load conditions",
        "Comprehensive post-service cleaning of appliance & work area",
        "Digital tax invoice & official 6-month service guarantee & warranty card",
        "Post-service follow-up call from quality desk within 24 hours"
      ],
      tagline: "Backed by our written service guarantee and direct customer helpline."
    }
  ];

  return (
    <section className="py-20 bg-[#070A17]/70 border-t border-white/10 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Standard Operating Procedure</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Our 5-Stage Doorstep Service Workflow
          </h2>
          
          <p className="text-base text-slate-300">
            From the moment you schedule until the post-service test run, our standardized 5-stage protocol ensures meticulous technical precision, absolute billing transparency, and zero hassle.
          </p>
        </div>

        {/* Step Selector Pills for Desktop / Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-10">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={item.stepNumber}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative group cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-cyan-950/60 border-cyan-400 shadow-[0_0_25px_rgba(0,229,255,0.25)] scale-[1.02]"
                    : "bg-white/[0.03] border-white/10 hover:border-cyan-500/40 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-md ${
                    isSelected ? "bg-cyan-400 text-slate-950" : "bg-white/10 text-slate-400"
                  }`}>
                    {item.stepNumber}
                  </span>
                  <Icon className={`w-4 h-4 transition-colors ${
                    isSelected ? "text-cyan-300" : "text-slate-400 group-hover:text-cyan-400"
                  }`} />
                </div>
                <div>
                  <div className={`text-xs font-extrabold line-clamp-1 ${
                    isSelected ? "text-white" : "text-slate-200"
                  }`}>
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {item.subtitle}
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Step Detailed Card */}
        {(() => {
          const current = steps[activeStep];
          const CurrentIcon = current.icon;
          return (
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 bg-[#080D21] shadow-2xl relative overflow-hidden transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left Visual & Summary */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-bold">
                      STAGE {current.stepNumber} OF 05
                    </span>
                    <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
                      {current.badge}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-cyan-400" />
                      {current.subtitle}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Manrope']">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {current.desc}
                  </p>

                  {/* Checklist */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {current.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-start gap-2.5 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs text-slate-200 leading-snug">{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span><strong>Our Promise:</strong> {current.tagline}</span>
                  </div>
                </div>

                {/* Right Action Box */}
                <div className="lg:col-span-5 flex flex-col justify-center bg-gradient-to-b from-[#0C1433] to-[#060918] p-6 sm:p-8 rounded-2xl border border-cyan-500/20 shadow-xl space-y-5">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                    <CurrentIcon className="w-7 h-7" />
                  </div>

                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Ready for Doorstep Service?
                    </div>
                    <div className="text-lg font-extrabold text-white">
                      Get Express Support in Avinashi & Surrounding Areas
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      Serving residential complexes, villas, restaurants & offices within a 25km radius.
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <button
                      onClick={() => onOpenBookingModal(undefined, `${current.title} - Express Visit`)}
                      className="w-full py-3.5 px-6 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Book Service Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        6-Month Written Warranty & Guarantee
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" />
                        60-90 Mins Arrival SLA
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
