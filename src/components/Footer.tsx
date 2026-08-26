import React from "react";
import {
  Wrench,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Zap,
  ArrowUp,
  Sparkles,
} from "lucide-react";
import { COMPANY_DETAILS, APPLIANCE_SERVICES } from "../data";
import { PageType } from "../types";

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onOpenBooking: (prefillAppliance?: string) => void;
  onOpenChat: () => void;
  onOpenTracker?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, onOpenChat, onOpenTracker }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks: { label: string; page: PageType }[] = [
    { label: "Home Showroom", page: "home" },
    { label: "Appliance Services (Visiting & Service: ₹500)", page: "services" },
    { label: "Explore Appliances", page: "appliances" },
    { label: "Why Choose VELS", page: "why-choose-us" },
    { label: "About Us & Reviews", page: "about" },
    { label: "Contact & Location", page: "contact" },
  ];

  return (
    <footer className="relative bg-[#03050A] border-t border-white/10 pt-16 pb-12 overflow-hidden text-xs text-slate-400">
      {/* Glow highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Brand & Overview */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate("home")}
                className="relative h-12 overflow-hidden rounded-xl border border-cyan-500/30 bg-black/70 p-1 shadow-[0_0_20px_rgba(0,229,255,0.25)] cursor-pointer"
              >
                <img
                  src="/src/assets/images/vels_logo_badge_1787600706612.jpg"
                  alt="VELS Home Appliances"
                  referrerPolicy="no-referrer"
                  className="h-full w-auto object-contain rounded-lg"
                />
              </button>
              <div>
                <span className="font-extrabold text-base tracking-wider text-white uppercase font-['Manrope'] block">
                  VELS HOME APPLIANCES
                </span>
                <span className="text-[10px] text-cyan-400 tracking-widest uppercase font-semibold">
                  Multi-Brand Master Service & Care
                </span>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              Your premier home appliance partner. Delivering high-precision diagnostics, OG certified parts, and guaranteed 60–90 minute doorstep arrival with our transparent <strong className="text-white">₹500 fixed service rate</strong>.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-xs">ISO 9001:2015 Certified Operations</div>
                <div className="text-[10px] text-slate-400">Written 6-month post-service guarantee and warranty</div>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="hover:text-cyan-300 transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services Catalog */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Appliance Services
            </h4>
            <div className="grid grid-cols-1 gap-1.5">
              {APPLIANCE_SERVICES.slice(0, 8).map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => {
                    onNavigate("services");
                    onOpenBooking(svc.name);
                  }}
                  className="text-left text-xs text-slate-400 hover:text-cyan-300 transition-colors truncate cursor-pointer"
                >
                  • {svc.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Contact & Operations */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Hub & Emergency
            </h4>
            
            <div className="space-y-2.5">
              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2.5 text-white hover:text-cyan-300 transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-mono font-bold text-sm">{COMPANY_DETAILS.phoneFormatted}</span>
              </a>

              <a
                href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WhatsApp: {COMPANY_DETAILS.phoneFormatted}</span>
              </a>

              <div className="flex items-start gap-2.5 text-slate-400">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className="leading-snug">{COMPANY_DETAILS.address}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-400">
                <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>8:00 AM – 9:30 PM (Daily Support)</span>
              </div>

              <button
                onClick={onOpenChat}
                className="mt-2 w-full py-2.5 px-3 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ask AI Service Concierge</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong className="text-slate-300">VELS HOME APPLIANCES</strong>. All Rights Reserved. Master Multi-Brand Appliance Solutions.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenTracker}
              className="text-[11px] text-slate-500 hover:text-emerald-400 transition-colors flex items-center gap-1 cursor-pointer font-medium"
              title="Restricted to Website Owner"
            >
              <span>🔒 Owner Portal (Excel Output)</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
