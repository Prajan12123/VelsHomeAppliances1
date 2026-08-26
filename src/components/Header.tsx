import React, { useState, useEffect } from "react";
import { Wrench, Phone, Menu, X, Sparkles } from "lucide-react";
import { COMPANY_DETAILS } from "../data";
import { PageType } from "../types";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onOpenBookingModal: (prefillAppliance?: string) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBookingModal,
  onOpenChat,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: { label: string; page: PageType }[] = [
    { label: "Home", page: "home" },
    { label: "Services", page: "services" },
    { label: "Appliances", page: "appliances" },
    { label: "Why Choose Us", page: "why-choose-us" },
    { label: "About Us", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const handleNavClick = (page: PageType) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#05070F]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3"
          : "bg-[#05070F]/70 backdrop-blur-md border-b border-white/5 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Crest */}
          <button
            onClick={() => handleNavClick("home")}
            id="brand-logo"
            className="flex items-center gap-3 group focus:outline-none text-left cursor-pointer"
          >
            <div className="relative flex items-center h-10 sm:h-11 overflow-hidden rounded-xl border border-cyan-500/30 bg-black/60 shadow-[0_0_20px_rgba(0,229,255,0.25)] group-hover:shadow-[0_0_28px_rgba(0,229,255,0.55)] group-hover:border-cyan-400/60 transition-all p-0.5">
              <img
                src="/src/assets/images/vels_logo_badge_1787600706612.jpg"
                alt="VELS Home Appliances"
                referrerPolicy="no-referrer"
                className="h-full w-auto object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-wider text-white uppercase font-['Manrope'] leading-tight group-hover:text-cyan-300 transition-colors">
                VELS
              </span>
              <span className="text-[10px] sm:text-[11px] tracking-widest text-slate-400 uppercase font-medium">
                Home Appliances
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  id={`nav-link-${item.page}`}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 font-bold shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                      : "text-slate-300 hover:text-cyan-300 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster: Light/Dark Mode Switch & CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Light / Dark Mode Toggle Switch */}
            <ThemeToggle />

            {/* Primary Compact Glowing CTA */}
            <button
              onClick={() => onOpenBookingModal()}
              id="header-book-cta"
              className="conic-glow-border group cursor-pointer focus:outline-none"
            >
              <div className="px-3 py-1 rounded-full bg-[#05070F] group-hover:bg-cyan-950/80 transition-colors flex items-center gap-1.5">
                <Wrench className="w-3 h-3 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-white">
                  Book Service
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Menu & Right Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle compact />
            <button
              onClick={() => onOpenBookingModal()}
              className="px-2.5 py-1 rounded-full bg-cyan-400 text-slate-950 text-[11px] font-bold flex items-center gap-1"
            >
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-btn"
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:text-cyan-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#070A17]/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 mt-3 space-y-4 shadow-2xl animate-hero-up"
        >
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Appearance
            </span>
            <ThemeToggle />
          </div>

          <div className="flex flex-col space-y-1.5">
            {navItems.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-left text-sm font-semibold uppercase tracking-wider py-2.5 px-3 rounded-xl transition-all ${
                    isActive
                      ? "bg-cyan-400 text-slate-950 font-bold"
                      : "text-slate-200 hover:text-cyan-400 hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenChat();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/50 text-xs font-bold text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Appliance Troubleshooting & Diagnosis</span>
            </button>

            <a
              href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-xs font-bold text-emerald-300"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>Call Technician: {COMPANY_DETAILS.phoneFormatted}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-500 text-slate-950 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              Book Service Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
