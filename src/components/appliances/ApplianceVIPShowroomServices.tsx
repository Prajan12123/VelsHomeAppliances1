import React from "react";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  Sparkles,
  Award,
  Headphones,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface ApplianceVIPShowroomServicesProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const ApplianceVIPShowroomServices: React.FC<ApplianceVIPShowroomServicesProps> = ({
  onOpenBookingModal,
  onOpenChat,
}) => {
  const perks = [
    {
      icon: CreditCard,
      title: "0% Interest EMI on Spot",
      desc: "Instant paperless financing with 0% interest schemes through Bajaj Finserv, HDFC Bank, ICICI, and Credit Cards.",
      badge: "Instant Approval",
      color: "cyan",
    },
    {
      icon: Truck,
      title: "Guaranteed 24-Hour Delivery",
      desc: "Direct delivery from our Avinashi warehouse to your doorstep with cushioned transit vehicles across Avinashi and Tirupur.",
      badge: "Free Doorstep Transit",
      color: "emerald",
    },
    {
      icon: Sparkles,
      title: "Free In-Home Demonstration",
      desc: "Certified brand engineers unpack, install, level, and calibrate your appliance, providing a complete 20-minute operational walkthrough.",
      badge: "Brand Certified",
      color: "blue",
    },
    {
      icon: ShieldCheck,
      title: "Official 10-Yr Brand Warranty",
      desc: "We register your product serial number directly on official manufacturer portals for seamless 10-year motor & compressor coverage.",
      badge: "Direct OG Sourced",
      color: "amber",
    },
    {
      icon: RotateCcw,
      title: "Old Appliance Free Removal",
      desc: "Upgrade without the hassle of disposing of your old bulky AC or fridge. Our delivery team clears it safely from your premises.",
      badge: "Eco-Friendly Disposal",
      color: "purple",
    },
    {
      icon: Headphones,
      title: "VIP Lifetime Service Queue",
      desc: "Appliances purchased through VELS Showroom receive permanent priority queue dispatch for all future routine filter washes and check-ups.",
      badge: "Priority Access",
      color: "cyan",
    },
  ];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060c20] via-[#081530] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>VELS Showroom Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            Exclusive Retail & In-Store Purchase Perks
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            When you purchase through our Avinashi authorized showroom, you receive direct manufacturer pricing, hassle-free financing, and lifetime service support backed by our 50+ engineers.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {perks.map((perk, idx) => {
            const Icon = perk.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-cyan-400/40 transition-all flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {perk.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {perk.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {perk.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/5 flex items-center gap-1.5 text-xs text-cyan-300 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>100% Guaranteed on all purchases</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
