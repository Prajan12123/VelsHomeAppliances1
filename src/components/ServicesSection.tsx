import React, { useState } from "react";
import {
  Wind,
  Refrigerator,
  Disc,
  Tv,
  Flame,
  Zap,
  Sparkles,
  ShieldAlert,
  Wrench,
  Layers,
  CheckCircle2,
  Clock,
  ArrowRight,
  Search,
  ChevronRight,
  Info,
  X,
} from "lucide-react";
import { APPLIANCE_SERVICES } from "../data";
import { ApplianceService } from "../types";

interface ServicesSectionProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [selectedService, setSelectedService] = useState<ApplianceService | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Cooling Systems",
    "Refrigeration",
    "Fabric Care",
    "Home Entertainment",
    "Kitchen Tech",
    "Water Solutions",
    "Kitchen Care",
    "Kitchen Air Care",
    "Small Appliances",
    "Air Quality",
  ];

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Wind":
        return <Wind className="w-5 h-5" />;
      case "Refrigerator":
        return <Refrigerator className="w-5 h-5" />;
      case "Disc":
        return <Disc className="w-5 h-5" />;
      case "Tv":
        return <Tv className="w-5 h-5" />;
      case "Flame":
        return <Flame className="w-5 h-5" />;
      case "Zap":
        return <Zap className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      case "ShieldAlert":
        return <ShieldAlert className="w-5 h-5" />;
      case "Wrench":
        return <Wrench className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      default:
        return <Wrench className="w-5 h-5" />;
    }
  };

  const filteredServices = APPLIANCE_SERVICES.filter((service) => {
    const matchesCategory =
      activeCategory === "All" || service.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.commonIssues.some((issue) => issue.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="relative py-24 bg-[#05070F] overflow-hidden">
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Wrench className="w-3.5 h-3.5" />
            <span>Master Multi-Brand Service Division</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Complete Home Appliance Solutions
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300">
            Professional diagnostic inspection, certified spare part replacements, and jet cleaning for all major home appliance brands with our transparent <strong className="text-cyan-300 font-semibold">Visiting Charge + Service Charge of ₹500</strong>.
          </p>
        </div>

        {/* Universal ₹500 Visiting + Service Charge Category Banner */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl mb-8 border border-cyan-500/30 bg-gradient-to-r from-[#070A18] via-[#091535] to-[#040815] shadow-[0_0_30px_rgba(0,229,255,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shrink-0 shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-2">
                <span>Standardized Pricing Across All Categories</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white font-['Manrope']">
                Visiting Charge + Service Charge: <span className="text-cyan-300 font-mono">₹500 Fixed</span>
              </h3>
              <p className="text-xs text-slate-300 max-w-2xl">
                Covers doorstep technician visit within 60–90 mins, full digital diagnosis, safety checks & written quote before any repair.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Doorstep & Diagnosis</span>
              <span className="text-sm font-black text-cyan-300 font-mono">₹500 Flat</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-center">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">Spare Parts</span>
              <span className="text-sm font-black text-emerald-400 font-mono">Actual MRP</span>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="glass-panel p-4 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-4 border-white/10">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search appliance (e.g. AC cooling, OE error, TV)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm placeholder:text-slate-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Categories Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.slice(0, 6).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-[0_0_12px_rgba(0,229,255,0.4)]"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              id={`service-card-${service.id}`}
              className="glass-panel-interactive rounded-2xl overflow-hidden flex flex-col group relative"
            >
              {/* Top Visual with Glass Badge */}
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
                <img
                  src={service.image}
                  alt={service.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A17] via-transparent to-black/40" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-950/80 border border-cyan-400/50 text-cyan-300 flex items-center justify-center backdrop-blur-md shadow-lg">
                    {getServiceIcon(service.iconName)}
                  </div>
                  {service.badge && (
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                      {service.badge}
                    </span>
                  )}
                </div>

                {/* Fixed Pricing Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/90 border border-cyan-400/50 text-cyan-300 text-[11px] font-mono font-bold backdrop-blur-md shadow-lg">
                  Visiting + Service: ₹{service.fixedPrice}
                </div>

                {/* Bottom Overlay Category */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium px-2 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                    {service.category}
                  </span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    <Clock className="w-3 h-3" /> {service.timeEstimate}
                  </span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors font-['Manrope']">
                      {service.name}
                    </h3>
                  </div>

                  {/* Pricing Sub-Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 text-[11px] font-medium mb-3">
                    <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                    <span>Visiting + Service Charge: <strong>₹{service.fixedPrice} Fixed</strong></span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {service.shortDesc}
                  </p>

                  {/* Common Issues Pills Preview */}
                  <div className="mb-5">
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Frequent Issues Fixed:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {service.commonIssues.slice(0, 3).map((issue, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/10 text-slate-300"
                        >
                          • {issue}
                        </span>
                      ))}
                      {service.commonIssues.length > 3 && (
                        <button
                          onClick={() => setSelectedService(service)}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:text-white"
                        >
                          +{service.commonIssues.length - 3} more
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setSelectedService(service)}
                    className="text-xs font-semibold text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
                  >
                    <Info className="w-3.5 h-3.5" /> Details & Pricing
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onOpenChat(`I have an issue with my ${service.name}. Can you help diagnose it?`)
                      }
                      title="AI Diagnosis"
                      className="p-2 rounded-xl bg-white/5 hover:bg-cyan-950/60 border border-white/10 hover:border-cyan-500/40 text-cyan-400 transition-colors"
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => onOpenBookingModal(service.name, "Full Diagnostic & ₹500 Fixed Service")}
                      id={`book-btn-${service.id}`}
                      className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_20px_rgba(0,229,255,0.5)] flex items-center gap-1.5"
                    >
                      <span>Book ₹500</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Search Results Fallback */}
        {filteredServices.length === 0 && (
          <div className="glass-panel p-12 rounded-3xl text-center max-w-md mx-auto">
            <Wrench className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-white mb-1">No specific service found</h4>
            <p className="text-xs text-slate-400 mb-4">
              We service all home appliances even if not listed! Speak directly with our master technician.
            </p>
            <button
              onClick={() => onOpenBookingModal("Custom Appliance Service")}
              className="px-5 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase"
            >
              Book General ₹500 Inspection
            </button>
          </div>
        )}

      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-hero-up">
          <div className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-cyan-500/30 p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                {getServiceIcon(selectedService.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  {selectedService.category}
                </span>
                <h3 className="text-2xl font-extrabold text-white font-['Manrope']">
                  {selectedService.name}
                </h3>
              </div>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              {selectedService.fullDesc}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                  Common Issues Diagnosed:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedService.commonIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                  What Vels Service Includes:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedService.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Category Pricing Breakdown Card & CTA */}
            <div className="p-5 rounded-2xl bg-cyan-950/50 border border-cyan-500/30 flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-cyan-500/20">
                <div>
                  <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-wider">Service Category Pricing</div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    Visiting + Service Charge: <span className="text-cyan-300">₹{selectedService.fixedPrice}</span>
                  </div>
                </div>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                  {selectedService.warranty}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Doorstep visit in 60–90 mins</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Complete multi-point diagnosis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Written estimate before repair</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Pay ₹500 after diagnosis</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => {
                    const svc = selectedService;
                    setSelectedService(null);
                    onOpenChat(`Can you explain repair options for ${svc.name}?`);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Diagnostics</span>
                </button>

                <button
                  onClick={() => {
                    const svc = selectedService;
                    setSelectedService(null);
                    onOpenBookingModal(svc.name, "Full Diagnostic & ₹500 Fixed Service");
                  }}
                  className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] cursor-pointer"
                >
                  Book Service (₹500 Fixed)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
