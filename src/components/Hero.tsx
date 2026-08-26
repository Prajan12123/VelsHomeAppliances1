import React, { useState } from "react";
import {
  Wrench,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle,
  Flame,
  Snowflake,
  Wind,
  Phone,
  ArrowRight,
  Tv,
  Star,
} from "lucide-react";
import { COMPANY_DETAILS } from "../data";

interface HeroProps {
  onOpenBookingModal: (prefillAppliance?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [activeApplianceTab, setActiveApplianceTab] = useState<"refrigerator" | "ac" | "washing" | "tv">("refrigerator");

  const applianceShowcaseData = {
    refrigerator: {
      name: "Smart Inverter French Door Refrigerator",
      category: "Refrigeration & Cooling",
      image: "/src/assets/images/refrigerator_service_1787600356195.jpg",
      rating: "5-Star BEE Efficiency",
      tag: "Dual Inverter Linear Compressor",
      serviceHighlight: "Doorstep Defrost & Gas Charge • ₹500 Fixed",
      specs: ["Multi Air Flow 3D", "Smart ThinQ WiFi", "Frost-Free Tech", "Dual Ice Maker"],
    },
    ac: {
      name: "Dual Inverter AI Smart Split AC",
      category: "Climate & Air Care",
      image: "/src/assets/images/ac_service_technician_1787600340398.jpg",
      rating: "5-Star 6-in-1 Convertible",
      tag: "High-Pressure Jet Wash Ready",
      serviceHighlight: "Deep Cleaning & R32 Gas Topup • ₹500 Fixed",
      specs: ["Copper Condenser", "PM2.5 Micro Filter", "Sub-Zero Cooling", "Anti-Corrosion Blue Fin"],
    },
    washing: {
      name: "AI Direct Drive Front Load Washer",
      category: "Fabric & Laundry Care",
      image: "/src/assets/images/washing_service_1787600376147.jpg",
      rating: "AI DD™ Intelligent Fabric Sense",
      tag: "TurboWash 360° Steam Cycle",
      serviceHighlight: "Drum Balance & Error OE/UE Fix • ₹500 Fixed",
      specs: ["Steam Allergy Care", "1400 RPM High Spin", "Silent Inverter Motor", "10-Yr Motor Warranty"],
    },
    tv: {
      name: "65\" Ultra-Slim 4K Cinema OLED TV",
      category: "Home Entertainment",
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=900&q=80",
      rating: "Dolby Vision IQ & Atmos",
      tag: "Self-Lit OLED 120Hz Refresh",
      serviceHighlight: "Panel & Motherboard Diagnostics • ₹500 Fixed",
      specs: ["α9 AI 4K Gen6 Engine", "Zero Bezel Frameless", "G-Sync Gaming Mode", "Ultra-Luminance Pro"],
    },
  };

  const current = applianceShowcaseData[activeApplianceTab];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-ambient-mesh overflow-hidden"
    >
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy, Trust Badges & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-10">
            
            {/* Top Eyebrow Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-wide mb-6 shadow-[0_0_20px_rgba(0,229,255,0.15)] backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="uppercase tracking-widest text-[11px] font-bold">
                Luxury Appliance Sales & Multi-Brand Service
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold text-white tracking-tight leading-[1.15] mb-6 font-['Manrope']">
              Smart Appliances. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
                Premium Service.
              </span> <br />
              Complete Home Comfort.
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-xl">
              <strong className="text-white font-semibold">VELS HOME APPLIANCES</strong> — Your trusted destination for home appliances, professional installation, maintenance, and reliable service.
            </p>

            {/* Key Service Highlights Pill Cluster */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-8">
              <div className="glass-panel p-3 rounded-xl flex flex-col items-center sm:items-start text-center sm:text-left border-cyan-500/20">
                <div className="flex items-center gap-1 text-cyan-400 text-xs font-bold mb-0.5">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Fixed Fee</span>
                </div>
                <span className="text-sm font-extrabold text-white font-mono">₹500 Visit</span>
              </div>

              <div className="glass-panel p-3 rounded-xl flex flex-col items-center sm:items-start text-center sm:text-left border-cyan-500/20">
                <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold mb-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Express</span>
                </div>
                <span className="text-sm font-extrabold text-white">60–90 Mins</span>
              </div>

              <div className="glass-panel p-3 rounded-xl flex flex-col items-center sm:items-start text-center sm:text-left border-cyan-500/20">
                <div className="flex items-center gap-1 text-sky-400 text-xs font-bold mb-0.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Warranty</span>
                </div>
                <span className="text-sm font-extrabold text-white">6-Month Free</span>
              </div>

              <div className="glass-panel p-3 rounded-xl flex flex-col items-center sm:items-start text-center sm:text-left border-cyan-500/20">
                <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Rating</span>
                </div>
                <span className="text-sm font-extrabold text-white">4.9 / 5 (25k+)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-6">
              {/* Primary Book CTA */}
              <button
                onClick={() => onOpenBookingModal()}
                id="hero-book-service-btn"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-extrabold text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <Wrench className="w-5 h-5 group-hover:rotate-12 transition-transform text-slate-950" />
                <span>Book a Service (₹500 Fixed)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Explore CTA */}
              <a
                href="#appliances"
                id="hero-explore-appliances-btn"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/40 text-white font-bold text-sm sm:text-base uppercase tracking-wider backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4 text-cyan-400" />
                <span>Explore Appliances</span>
              </a>
            </div>

            {/* Gemini AI Diagnostic Quick Prompt */}
            <div className="w-full max-w-lg glass-panel p-3.5 rounded-2xl border border-cyan-500/25 bg-cyan-950/20 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span>Appliance Error or Cooling Issue?</span>
                    <span className="text-[9px] bg-cyan-400 text-slate-950 font-black px-1 rounded uppercase">Gemini AI</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Diagnose error codes (AC E4, Washer OE, Fridge warm) in 5 seconds.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onOpenChat("My AC isn't cooling properly, can you diagnose the issue?")}
                className="shrink-0 px-3 py-1.5 rounded-lg bg-cyan-400/10 hover:bg-cyan-400/20 border border-cyan-400/30 text-cyan-300 hover:text-white text-xs font-semibold transition-colors"
              >
                Diagnose Now
              </button>
            </div>

          </div>

          {/* Right Column: Premium 3D / Realistic Appliance Glass Visual Showroom */}
          <div className="lg:col-span-6 relative z-10">
            
            {/* Interactive Showcase Glass Container */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-2xl">
              
              {/* Top Selector Tabs */}
              <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4 mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveApplianceTab("refrigerator")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeApplianceTab === "refrigerator"
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                      : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>Refrigerator</span>
                </button>

                <button
                  onClick={() => setActiveApplianceTab("ac")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeApplianceTab === "ac"
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                      : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Inverter AC</span>
                </button>

                <button
                  onClick={() => setActiveApplianceTab("washing")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeApplianceTab === "washing"
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                      : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Washing Machine</span>
                </button>

                <button
                  onClick={() => setActiveApplianceTab("tv")}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    activeApplianceTab === "tv"
                      ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.5)]"
                      : "text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>4K OLED TV</span>
                </button>
              </div>

              {/* Main Realistic Visual Display */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950/70 border border-white/10 group aspect-[4/3] flex items-center justify-center">
                {/* Glow Backdrop */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-cyan-500/10 z-10 pointer-events-none" />
                
                <img
                  src={current.image}
                  alt={current.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Top Energy Badge */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-slate-950/85 border border-cyan-400/40 text-cyan-300 text-xs font-bold backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{current.rating}</span>
                </div>

                {/* Floating Technology Badge */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/40 text-white text-[11px] font-semibold backdrop-blur-md shadow-lg">
                  {current.tag}
                </div>

                {/* Bottom Overlay Info Banner */}
                <div className="absolute bottom-3 inset-x-3 z-20 p-3.5 rounded-xl bg-slate-950/90 border border-white/15 backdrop-blur-md">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold">
                      {current.category}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Certified Service
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1 mb-2">
                    {current.name}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                    <span className="text-xs text-slate-300 font-medium">
                      {current.serviceHighlight}
                    </span>
                    <button
                      onClick={() => onOpenBookingModal(current.name)}
                      className="px-3 py-1 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold uppercase tracking-wide transition-all shadow-[0_0_10px_rgba(0,229,255,0.4)]"
                    >
                      Book Service
                    </button>
                  </div>
                </div>
              </div>

              {/* Specs Grid below visual */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {current.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-slate-300"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="truncate">{spec}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Decorative Luxury Accents */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 glass-panel p-4 rounded-2xl border border-cyan-400/40 shadow-[0_15px_35px_rgba(0,229,255,0.25)] z-20 backdrop-blur-xl max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black text-white uppercase font-mono">100% Genuine</div>
                  <div className="text-[11px] text-slate-300 leading-tight">OG Parts with 6-Month Guarantee & Warranty</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
