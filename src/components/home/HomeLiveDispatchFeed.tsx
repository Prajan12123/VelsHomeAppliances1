import React, { useState, useEffect } from "react";
import {
  Radio,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  Wrench,
  ShieldCheck,
  ArrowRight,
  UserCheck,
} from "lucide-react";

interface DispatchUnit {
  id: string;
  engineer: string;
  experience: string;
  applianceFocus: string;
  currentZone: string;
  status: "In Transit" | "On-Site Diagnostic" | "Slot Available";
  statusColor: string;
  eta: string;
  recentJob: string;
}

const DISPATCH_UNITS: DispatchUnit[] = [
  {
    id: "unit-1",
    engineer: "S. Prakash",
    experience: "12+ Yrs (Lead HVAC)",
    applianceFocus: "Inverter ACs & Jet Clean",
    currentZone: "Mangalam Road, Avinashi",
    status: "In Transit",
    statusColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    eta: "14 Mins to Destination",
    recentJob: "Daikin Inverter PCB Overvoltage Calibration Completed",
  },
  {
    id: "unit-2",
    engineer: "K. Murugan",
    experience: "10+ Yrs (Refrigeration)",
    applianceFocus: "Side-by-Side Fridges",
    currentZone: "Rayapuram, Tiruppur",
    status: "On-Site Diagnostic",
    statusColor: "border-amber-500/40 bg-amber-500/10 text-amber-300",
    eta: "Completing 24-Point Audit",
    recentJob: "Samsung Inverter Defrost Bimetal Replaced",
  },
  {
    id: "unit-3",
    engineer: "R. Vetrivel",
    experience: "9+ Yrs (Washing & Motors)",
    applianceFocus: "Front / Top Load Washers",
    currentZone: "Perumanallur Junction",
    status: "Slot Available",
    statusColor: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
    eta: "Ready for Immediate Dispatch",
    recentJob: "Bosch SKF High-RPM Bearings & Damper Calibration",
  },
  {
    id: "unit-4",
    engineer: "M. Dinesh",
    experience: "8+ Yrs (Micro-electronics)",
    applianceFocus: "4K OLED TVs & Microwaves",
    currentZone: "Sevur Main Road",
    status: "In Transit",
    statusColor: "border-cyan-500/40 bg-cyan-500/10 text-cyan-300",
    eta: "22 Mins to Destination",
    recentJob: "Sony Bravia LED Backlight Array Renewal",
  },
];

interface HomeLiveDispatchFeedProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
}

export const HomeLiveDispatchFeed: React.FC<HomeLiveDispatchFeedProps> = ({
  onOpenBookingModal,
}) => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Exclusive Live Telemetry Feed</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Live Mobile Technician Dispatch Radar
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Monitor our active mobile repair units deployed across Avinashi, Tiruppur, and surrounding Coimbatore sectors in real-time.
        </p>
      </div>

      {/* Real-time Status Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping shrink-0" />
          <div className="text-xs">
            <span className="text-slate-400 font-mono">DISPATCH FEED: </span>
            <strong className="text-white font-mono">AVINASHI HUB CENTRAL RADAR</strong>
            <span className="hidden sm:inline text-slate-500"> • </span>
            <span className="text-cyan-300 font-mono font-bold">{currentTime || "LIVE"}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Truck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Active Mobile Units: <strong className="text-white">8/10 Deployed</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-300">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Avg. Arrival: <strong className="text-white">45–70 Mins</strong></span>
          </div>
        </div>
      </div>

      {/* Grid of Active Dispatch Units */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {DISPATCH_UNITS.map((unit) => (
          <div
            key={unit.id}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 relative overflow-hidden"
          >
            <div>
              {/* Unit Header */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 text-xs font-bold font-mono">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {unit.engineer}
                    </h3>
                    <div className="text-[10px] text-slate-400 font-mono">{unit.experience}</div>
                  </div>
                </div>
                <span className={`text-[9px] px-2 py-0.5 rounded border font-mono font-bold ${unit.statusColor}`}>
                  {unit.status}
                </span>
              </div>

              {/* Focus & Zone */}
              <div className="space-y-1.5 py-2.5 border-y border-white/5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px]">Focus:</span>
                  <span className="text-slate-200 font-semibold text-[11px]">{unit.applianceFocus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    Zone:
                  </span>
                  <span className="text-cyan-300 font-medium text-[11px] truncate max-w-[140px]">{unit.currentZone}</span>
                </div>
              </div>

              {/* Status Tracker */}
              <div className="mt-3 p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px]">
                <div className="text-slate-400 text-[10px] font-mono uppercase">Current ETA / Activity</div>
                <div className="font-semibold text-white mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{unit.eta}</span>
                </div>
              </div>

              {/* Recent Job Completed */}
              <div className="mt-2.5 text-[10px] text-slate-400 leading-snug line-clamp-2">
                <span className="text-slate-500 font-mono uppercase">Latest Job: </span>
                {unit.recentJob}
              </div>
            </div>

            <button
              onClick={() => onOpenBookingModal(unit.applianceFocus.split(" &")[0], "Priority Dispatch")}
              className="mt-4 w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-200 hover:text-cyan-300 text-xs font-bold transition-all flex items-center justify-between cursor-pointer"
            >
              <span>Request This Tech Slot</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick Booking CTA */}
      <div className="mt-8 p-5 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-emerald-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white font-['Manrope']">
            Need the Next Available Van Dispatched to Your Doorstep?
          </h4>
          <p className="text-xs text-slate-300 mt-0.5">
            Fixed ₹500 diagnostic rate • Arrives with fully stocked genuine OEM spare parts • 6-Month Guarantee.
          </p>
        </div>
        <button
          onClick={() => onOpenBookingModal()}
          className="py-2.5 px-5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold text-xs uppercase tracking-wider font-mono transition-all shrink-0 cursor-pointer shadow-[0_0_15px_rgba(0,229,255,0.3)]"
        >
          Book Next Express Slot
        </button>
      </div>
    </section>
  );
};
