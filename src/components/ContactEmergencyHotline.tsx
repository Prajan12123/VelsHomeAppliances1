import React from "react";
import {
  PhoneCall,
  Flame,
  AlertTriangle,
  Zap,
  Building2,
  Clock,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { COMPANY_DETAILS } from "../data";

export const ContactEmergencyHotline: React.FC = () => {
  const emergencies = [
    {
      icon: Flame,
      title: "Commercial Chiller & Dairy Freezers",
      desc: "Instant priority dispatch for milk dairies, restaurants, grocery deep freezers, and industrial cold rooms in Tiruppur textile belt.",
      eta: "Within 45 Mins",
    },
    {
      icon: Zap,
      title: "Electrical Short-Circuit / Burning Smell",
      desc: "Appliance sparking, MCB tripping, or burning insulation smell from AC indoor/outdoor units or washing machine control panels.",
      eta: "Immediate Priority",
    },
    {
      icon: AlertTriangle,
      title: "Severe AC / Refrigerator Water Flooding",
      desc: "Sudden heavy indoor condensate water backflow threatening wooden false ceilings, luxury flooring, or electronic setups.",
      eta: "Within 60 Mins",
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-[#18080C] via-[#0E0B1A] to-[#18080C] relative overflow-hidden shadow-2xl">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-bold uppercase tracking-widest mb-3">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Priority SOS Escalation Desk</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope'] mb-2">
              Critical Emergency Appliance Hotline
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              Experiencing a sudden commercial chiller outage, severe water leakage, or burning electrical smell? Skip the regular queue and connect immediately with our master on-duty triage engineer.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {emergencies.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="w-5 h-5 text-rose-400" />
                      <span className="text-[10px] font-mono font-bold text-rose-300 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                        {item.eta}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white mb-1">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-500 via-red-500 to-rose-600 hover:from-rose-400 hover:to-red-500 text-white font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(244,63,94,0.4)] flex items-center justify-center gap-3 transition-all cursor-pointer text-center"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>Call Emergency Desk ({COMPANY_DETAILS.phoneFormatted})</span>
            </a>

            <a
              href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=EMERGENCY%20PRIORITY:%20I%20have%20an%20urgent%20appliance%20breakdown%20in%20my%20premises.`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white font-bold text-xs uppercase tracking-wider text-center transition-colors"
            >
              WhatsApp Urgent Photo / Video →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
