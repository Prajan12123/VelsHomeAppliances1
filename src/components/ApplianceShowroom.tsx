import React, { useState } from "react";
import {
  ShoppingBag,
  Star,
  CheckCircle2,
  Tag,
  Shield,
  ArrowRight,
  Sparkles,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FEATURED_PRODUCTS, COMPANY_DETAILS } from "../data";
import { ApplianceProduct } from "../types";

interface ApplianceShowroomProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ApplianceShowroom: React.FC<ApplianceShowroomProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");

  const tabs = [
    { id: "all", label: "All Appliances" },
    { id: "ac", label: "Inverter ACs" },
    { id: "refrigerator", label: "Refrigerators" },
    { id: "washing", label: "Washing Machines" },
    { id: "tv", label: "Smart OLED TVs" },
    { id: "kitchen", label: "Kitchen & Air Care" },
  ];

  const uniqueBrands = Array.from(new Set(FEATURED_PRODUCTS.map((p) => p.brand)));

  const filteredProducts = FEATURED_PRODUCTS.filter((prod) => {
    const matchesCategory = activeTab === "all" || prod.category === activeTab;
    const matchesBrand = selectedBrand === "all" || prod.brand.toLowerCase() === selectedBrand.toLowerCase();
    return matchesCategory && matchesBrand;
  });

  return (
    <section id="appliances" className="relative py-24 bg-[#05070F] overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Luxury Showroom & Official Retail</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Next-Gen Smart Home Appliances
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base">
            Experience the latest 5-Star AI Inverter climate systems, multi-door refrigeration, and cinema-grade OLED TVs with complimentary doorstep installation.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div className="flex items-center justify-center gap-2 overflow-x-auto max-w-full pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-cyan-500 text-slate-950 shadow-[0_0_18px_rgba(0,229,255,0.4)]"
                    : "bg-white/5 text-slate-300 hover:text-white hover:bg-white/10 border border-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Brand Filter */}
          <div className="flex items-center justify-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">Brand:</span>
            <button
              onClick={() => setSelectedBrand("all")}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                selectedBrand === "all"
                  ? "bg-cyan-400/20 text-cyan-300 border-cyan-400"
                  : "bg-white/[0.02] text-slate-400 border-white/10 hover:text-white"
              }`}
            >
              All Brands
            </button>
            {uniqueBrands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer border ${
                  selectedBrand === brand
                    ? "bg-cyan-400/20 text-cyan-300 border-cyan-400"
                    : "bg-white/[0.02] text-slate-400 border-white/10 hover:text-white"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="glass-panel-interactive rounded-3xl overflow-hidden flex flex-col group border-white/10"
            >
              {/* Product Visual Showcase */}
              <div className="relative h-60 w-full overflow-hidden bg-slate-950">
                <img
                  src={product.image}
                  alt={product.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A17] via-transparent to-black/30" />

                {/* Energy Star Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/85 border border-cyan-400/50 text-cyan-300 text-xs font-bold backdrop-blur-md flex items-center gap-1 shadow-lg">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>{product.energyRating}</span>
                </div>

                {/* Showroom Status Badge */}
                <div className="absolute top-4 right-4 px-2.5 py-0.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md">
                  In Stock & Ready
                </div>

                {/* Brand pill */}
                <div className="absolute bottom-3 left-4 text-xs font-mono text-slate-300 font-semibold px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm border border-white/15">
                  {product.brand}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors font-['Manrope'] line-clamp-2">
                    {product.title}
                  </h3>

                  {/* Specifications */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-300">
                    {product.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="truncate">{spec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Showroom Value & CTA */}
                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between mb-3 bg-white/[0.03] p-3 rounded-xl border border-white/5">
                    <div>
                      <div className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider">
                        Showroom Direct Deal
                      </div>
                      <div className="text-[11px] text-slate-300 mt-0.5">
                        0% EMI + Exchange Bonus
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      Brand Authorized
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400 mb-4 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{product.warranty}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20am%20interested%20in%20pricing%20and%20festive%20offers%20for%20${encodeURIComponent(
                        product.title
                      )}.`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>WhatsApp</span>
                    </a>

                    <button
                      onClick={() =>
                        onOpenBookingModal(
                          product.title,
                          "Appliance Price & Offer Inquiry"
                        )
                      }
                      className="py-2.5 px-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-extrabold uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Inquire Now</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
