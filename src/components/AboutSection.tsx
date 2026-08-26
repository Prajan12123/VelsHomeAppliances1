import React from "react";
import {
  ShieldCheck,
  Award,
  Users,
  Clock,
  Star,
  CheckCircle,
  Building,
  Quote,
  Sparkles,
  Phone,
} from "lucide-react";
import { COMPANY_DETAILS, CUSTOMER_REVIEWS } from "../data";

interface AboutSectionProps {
  onOpenBookingModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBookingModal }) => {
  return (
    <section id="about" className="relative py-24 bg-[#05070F] overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          {/* Left Column: Brand Narrative */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
              <Building className="w-3.5 h-3.5" />
              <span>About VELS HOME APPLIANCES</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 font-['Manrope']">
              Redefining Appliance Care with Trust & Precision
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
              Founded with the vision to eliminate appliance maintenance anxiety, <strong className="text-white">VELS HOME APPLIANCES</strong> has grown from a specialized technical workshop into one of the region’s most respected multi-brand appliance sales and service hubs.
            </p>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
              We bridge the gap between expensive brand service centers and unreliable third-party repairmen by offering a <strong className="text-cyan-300">flat ₹500 diagnostic rate</strong>, background-verified master technicians, state-of-the-art diagnostic instruments, and 100% genuine OG components.
            </p>

            {/* 4-Step Standard Operating Procedure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-cyan-400 font-mono font-bold text-xs mb-1">01. Quick Booking</div>
                <div className="text-xs text-slate-300">Book in 30 seconds online or via instant WhatsApp.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-cyan-400 font-mono font-bold text-xs mb-1">02. 60–90 Min Arrival</div>
                <div className="text-xs text-slate-300">Verified master technician arrives at your doorstep.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-cyan-400 font-mono font-bold text-xs mb-1">03. ₹500 Fixed Diagnostic</div>
                <div className="text-xs text-slate-300">Transparent assessment with upfront spare part MRP quotes.</div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                <div className="text-cyan-400 font-mono font-bold text-xs mb-1">04. 6-Month Guarantee & Warranty</div>
                <div className="text-xs text-slate-300">Complete peace of mind with written 6-month warranty cards.</div>
              </div>
            </div>

            <button
              onClick={onOpenBookingModal}
              className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)]"
            >
              Experience VELS Service Today
            </button>
          </div>

          {/* Right Column: Visual Showcase & Stats Metrics */}
          <div className="lg:col-span-6 relative">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden">
              
              {/* Showroom visual */}
              <div className="relative rounded-2xl overflow-hidden mb-6 h-64 bg-slate-950">
                <img
                  src="/src/assets/images/showroom_store_1787600393373.jpg"
                  alt="Vels Home Appliances Showroom"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070A17] via-transparent to-black/30" />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Central Flagship Center</div>
                    <div className="text-[11px] text-slate-400">Avinashi, Tamil Nadu • Master Service Center & Showroom</div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500 text-slate-950 font-black uppercase">
                    Open Daily
                  </span>
                </div>
              </div>

              {/* 4 Major Stats Counters */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-cyan-300 font-mono mb-1">
                    {COMPANY_DETAILS.experienceYears}+
                  </div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Years of Legacy
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">
                    {COMPANY_DETAILS.completedServices}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Appliance Repairs
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-1">
                    {COMPANY_DETAILS.activeEngineers}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Certified Technicians
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mb-1">
                    {COMPANY_DETAILS.satisfactionRate}
                  </div>
                  <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                    Satisfaction Index
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Customer Testimonials Section */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 font-['Manrope']">
              What Our Customers Say
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Real feedback from households who rely on VELS for seamless home comfort.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between border-white/10 relative"
              >
                <Quote className="w-8 h-8 text-cyan-400/20 absolute top-4 right-4 pointer-events-none" />

                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white">{rev.name}</div>
                    <div className="text-[11px] text-slate-400">{rev.location}</div>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                    {rev.appliance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
