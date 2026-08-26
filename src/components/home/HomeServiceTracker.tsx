import React, { useState } from "react";
import {
  Search,
  Truck,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Phone,
  Sparkles,
  ArrowRight,
  MapPin,
  KeyRound,
  FileSpreadsheet,
  QrCode,
  Calendar,
} from "lucide-react";
import { COMPANY_DETAILS } from "../../data";

interface HomeServiceTrackerProps {
  onOpenTrackerWithId?: (trackingId: string) => void;
  onOpenBookingModal?: (prefillAppliance?: string) => void;
}

export const HomeServiceTracker: React.FC<HomeServiceTrackerProps> = ({
  onOpenTrackerWithId = (_trackingId: string) => {},
  onOpenBookingModal = (_prefillAppliance?: string) => {},
}) => {
  const [trackingInput, setTrackingInput] = useState("");

  const sampleIds = [
    { id: "VELS-84920", appliance: "Split AC Jet Cleaning", stage: "Technician In-Transit (ETA 20m)" },
    { id: "VELS-84922", appliance: "Inverter Refrigerator", stage: "On-Site Diagnostic" },
    { id: "VELS-84921", appliance: "Front Load Washer", stage: "Confirmed & Scheduled" },
    { id: "VELS-84924", appliance: "Kitchen Auto Chimney", stage: "Completed & 180-Day Warranty" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      onOpenTrackerWithId(trackingInput.trim());
    } else {
      onOpenTrackerWithId("VELS-84920");
    }
  };

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(0,229,255,0.15)]">
        
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Heading & Tracker Search Box */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold uppercase tracking-wider font-mono">
              <Truck className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>Real-Time Doorstep Dispatch Radar</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] tracking-tight leading-tight">
                Track Your Service Booking & Live Technician Status
              </h2>
              <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                Check your technician's GPS route, 4-digit doorstep security OTP, multi-point diagnostic findings, and 180-day digital warranty certificate in real-time.
              </p>
            </div>

            {/* Interactive Search Bar */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. VELS-84920) or Mobile Number..."
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl glass-input text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 border border-cyan-500/30 focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <Search className="w-4 h-4" />
                  <span>Track Status</span>
                </button>
              </div>

              {/* Sample Quick-Check Chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className="text-slate-400 text-[11px] font-semibold">Live Active Orders:</span>
                {sampleIds.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onOpenTrackerWithId(item.id)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-300 text-[11px] font-mono transition-all cursor-pointer flex items-center gap-1"
                  >
                    <span className="font-bold text-white">{item.id}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-[10px] text-cyan-400">{item.appliance}</span>
                  </button>
                ))}
              </div>
            </form>

            {/* Three Value Trust Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Fixed ₹500 Rate</span>
                  <span className="text-slate-400">Visiting + Diagnostic fee</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <KeyRound className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">Doorstep 4-Digit OTP</span>
                  <span className="text-slate-400">Verify lead technician</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-2.5">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-white block">60-90 Min Arrival</span>
                  <span className="text-slate-400">Rapid local dispatch</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Live Preview Card */}
          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900/90 to-black/80 border border-cyan-500/40 shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                    Live Dispatch Feed
                  </span>
                </div>
                <span className="font-mono text-xs text-white bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40 font-bold">
                  VELS-84920
                </span>
              </div>

              {/* Status Header */}
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">Current Status:</span>
                  <span className="font-bold text-amber-400">Technician En-Route (ETA 20m)</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[65%] rounded-full animate-pulse" />
                </div>
              </div>

              {/* Technician Info */}
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=100&auto=format&fit=crop&q=80"
                    alt="Technician"
                    className="w-10 h-10 rounded-xl object-cover border border-cyan-400/50"
                  />
                  <div>
                    <span className="font-bold text-white block">R. Vignesh Kumar</span>
                    <span className="text-[10px] text-slate-400">12+ Yrs Master Tech • ★ 4.96</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Express Van</span>
                  <span className="font-mono font-bold text-cyan-300 text-xs">TN-39-BY-4819</span>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Appliance:</span>
                  <span className="font-semibold text-white">LG Dual Inverter 1.5 Ton AC</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Scheduled Time:</span>
                  <span className="font-semibold text-white">Today (Morning 10:30 AM)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Inspection Charge:</span>
                  <span className="font-mono font-bold text-emerald-400">₹500 (Pay After Visit)</span>
                </div>
              </div>

              {/* Open full modal CTA */}
              <button
                onClick={() => onOpenTrackerWithId("VELS-84920")}
                className="w-full py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <span>Launch Full Interactive Tracker</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
