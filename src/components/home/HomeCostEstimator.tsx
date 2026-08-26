import React, { useState } from "react";
import {
  Calculator,
  Wrench,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  ArrowRight,
  Info,
  Sparkles,
} from "lucide-react";

interface RepairOption {
  id: string;
  fault: string;
  partCostRange: string;
  serviceCharge: string;
  approxDuration: string;
  partsWarranty: string;
  description: string;
}

interface AppliancePricingData {
  id: string;
  name: string;
  icon: string;
  commonRepairs: RepairOption[];
}

const PRICING_DATA: AppliancePricingData[] = [
  {
    id: "ac",
    name: "Air Conditioner (Split / Inverter)",
    icon: "❄️",
    commonRepairs: [
      {
        id: "ac-jet",
        fault: "Foam Jet Deep Cleaning & Coil De-clogging",
        partCostRange: "₹0 (Consumables included)",
        serviceCharge: "₹500 Fixed",
        approxDuration: "45–60 Mins",
        partsWarranty: "30-Day Clean Cooling Guarantee",
        description: "Indoor blower dismantling, evaporator chemical foam spray, and outdoor condenser high-pressure jet wash.",
      },
      {
        id: "ac-gas",
        fault: "Refrigerant Gas Top-Up / Full Charging (R32/R410A)",
        partCostRange: "₹1,200 – ₹2,200 (Exact as per gas weight)",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "60–90 Mins",
        partsWarranty: "90-Day Cooling Leak Warranty",
        description: "Nitrogen pressure leak test, brazing pipe joints, high-vacuum evacuation, and certified brand refrigerant charging.",
      },
      {
        id: "ac-pcb",
        fault: "Inverter Microcontroller PCB Circuit Repair",
        partCostRange: "₹1,500 – ₹3,500 (Component level)",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "1–2 Days (Lab Test)",
        partsWarranty: "6-Month PCB Warranty",
        description: "SMD diode, IGBT transistor, and bridge rectifier level soldering with thermal stress chamber verification.",
      },
      {
        id: "ac-fan",
        fault: "Outdoor / Indoor Blower Motor & Capacitor Replacement",
        partCostRange: "₹450 – ₹1,800 (OG sealed)",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "45 Mins",
        partsWarranty: "1-Year Manufacturer Warranty",
        description: "Original dual-run copper winding capacitor or brushless DC fan motor replacement.",
      },
    ],
  },
  {
    id: "fridge",
    name: "Refrigerator (Frost-Free / Direct Cool)",
    icon: "🧊",
    commonRepairs: [
      {
        id: "fridge-defrost",
        fault: "No-Frost Defrost Circuit (Sensor + Timer + Heater)",
        partCostRange: "₹650 – ₹1,400",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "45–60 Mins",
        partsWarranty: "6-Month Replacement Warranty",
        description: "Resolves ice build-up blocking lower cabinet air ducts; restores sub-zero airflow.",
      },
      {
        id: "fridge-gas",
        fault: "Compressor Gas Charging & Filter Drier Replacement",
        partCostRange: "₹1,400 – ₹2,400",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "90 Mins",
        partsWarranty: "90-Day Gas Warranty",
        description: "System flushing, capillary tube clearance, molecular sieve filter replacement & R600a eco gas charging.",
      },
      {
        id: "fridge-relay",
        fault: "PTC Starter Relay & Overload Protector (OLP)",
        partCostRange: "₹350 – ₹750",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "30 Mins",
        partsWarranty: "1-Year OG Warranty",
        description: "Fixes recurring clicking sounds from compressor and prevents motor winding burnout.",
      },
      {
        id: "fridge-gasket",
        fault: "Magnetic Door Gasket Seal Replacement",
        partCostRange: "₹600 – ₹1,200",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "30 Mins",
        partsWarranty: "6-Month Air-Tight Guarantee",
        description: "Cures door air leakage, water pooling around crisper trays, and excessive compressor cycling.",
      },
    ],
  },
  {
    id: "washing",
    name: "Washing Machine (Front / Top Load)",
    icon: "🌀",
    commonRepairs: [
      {
        id: "wm-pump",
        fault: "Drain Pump & Coin Trap Solenoid Replacement",
        partCostRange: "₹650 – ₹1,350",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "45 Mins",
        partsWarranty: "6-Month Warranty",
        description: "Fixes water drainage stoppage, OE/5E error codes, and buzzing pump impellers.",
      },
      {
        id: "wm-inlet",
        fault: "Dual Water Inlet Solenoid Valve Replacement",
        partCostRange: "₹450 – ₹950",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "30 Mins",
        partsWarranty: "1-Year OG Warranty",
        description: "Resolves slow water filling, IE errors, and continuous unstopped water overflow.",
      },
      {
        id: "wm-shocks",
        fault: "Heavy Duty Drum Shock Absorbers & Suspension Rods",
        partCostRange: "₹850 – ₹1,800 (Set of 2/4)",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "60 Mins",
        partsWarranty: "1-Year Dynamic Balance Warranty",
        description: "Eliminates violent vibrating, drum banging against cabinet, and 'walking' on spin cycle.",
      },
      {
        id: "wm-pcb",
        fault: "Main Control Board & Display Touch Panel Repair",
        partCostRange: "₹1,200 – ₹2,800",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "1 Day Lab Test",
        partsWarranty: "6-Month Warranty",
        description: "Fixes unresponsive touch buttons, dead display, or cycles getting stuck at rinse mode.",
      },
    ],
  },
  {
    id: "tv",
    name: "Smart LED / 4K OLED Television",
    icon: "📺",
    commonRepairs: [
      {
        id: "tv-backlight",
        fault: "Full Array LED Backlight Strip Replacement",
        partCostRange: "₹1,400 – ₹2,800 (Brand matched)",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "60–90 Mins",
        partsWarranty: "1-Year Brightness Warranty",
        description: "Restores crystal clear picture when audio is working but screen is dark or has blue tint.",
      },
      {
        id: "tv-smps",
        fault: "SMPS Power Supply Board Overvoltage Surge Repair",
        partCostRange: "₹850 – ₹1,900",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "45 Mins",
        partsWarranty: "6-Month Power Surge Warranty",
        description: "Fixes TV not turning on, clicking relay, or standby light blinking error sequences.",
      },
      {
        id: "tv-motherboard",
        fault: "Main Smart Motherboard & Processor Reballing",
        partCostRange: "₹1,800 – ₹3,800",
        serviceCharge: "₹500 Fixed Visit",
        approxDuration: "1–2 Days",
        partsWarranty: "6-Month Warranty",
        description: "Fixes Android bootloop, HDMI port detection failure, and Wi-Fi IC disconnection.",
      },
    ],
  },
];

interface HomeCostEstimatorProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const HomeCostEstimator: React.FC<HomeCostEstimatorProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedApplianceId, setSelectedApplianceId] = useState<string>("ac");
  const [selectedRepairId, setSelectedRepairId] = useState<string>("ac-jet");

  const currentAppliance =
    PRICING_DATA.find((a) => a.id === selectedApplianceId) || PRICING_DATA[0];

  const currentRepair =
    currentAppliance.commonRepairs.find((r) => r.id === selectedRepairId) ||
    currentAppliance.commonRepairs[0];

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#060c20] via-[#08122c] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Upfront Transparency</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
            Instant Repair Cost & Spare Parts Estimator
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Select your appliance and common issue to see real-world part costs and service duration. Know your exact estimate before our technician arrives at your doorstep.
          </p>
        </div>

        {/* Appliance Category Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {PRICING_DATA.map((appliance) => {
            const isSelected = appliance.id === selectedApplianceId;
            return (
              <button
                key={appliance.id}
                onClick={() => {
                  setSelectedApplianceId(appliance.id);
                  setSelectedRepairId(appliance.commonRepairs[0].id);
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  isSelected
                    ? "bg-cyan-400 text-slate-950 border-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] scale-105"
                    : "bg-white/[0.04] text-slate-300 border-white/10 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                <span className="text-base">{appliance.icon}</span>
                <span>{appliance.name}</span>
              </button>
            );
          })}
        </div>

        {/* 2-Column Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: Repair Type Selector */}
          <div className="lg:col-span-5 flex flex-col gap-2.5">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Select Service / Fault</span>
              <span className="text-[11px] text-cyan-400 font-mono">
                {currentAppliance.commonRepairs.length} Standard Repairs
              </span>
            </div>

            {currentAppliance.commonRepairs.map((repair) => {
              const isSelected = repair.id === currentRepair.id;
              return (
                <button
                  key={repair.id}
                  onClick={() => setSelectedRepairId(repair.id)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-cyan-950/90 to-blue-950/70 border-cyan-400 text-white shadow-lg"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="font-semibold text-xs sm:text-sm mb-1 leading-snug">
                    {repair.fault}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <span className="text-cyan-300 font-mono">Visiting: ₹500</span>
                    <span>•</span>
                    <span>{repair.approxDuration}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Transparent Cost Breakdown Card */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-[#070e24] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10 mb-5">
                <div>
                  <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                    Standardized Estimate Breakdown
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                    {currentRepair.fault}
                  </h3>
                </div>
                <div className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full shrink-0">
                  {currentRepair.partsWarranty}
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.03] p-3.5 rounded-xl border border-white/5 mb-5">
                {currentRepair.description}
              </p>

              {/* Cost Rows */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Doorstep Visit & Inspection Fee</div>
                      <div className="text-[11px] text-slate-400">Includes multi-point safety & electrical load testing</div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-cyan-300 font-mono">
                    ₹500 Fixed
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <Wrench className="w-4 h-4 text-emerald-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Estimated Genuine Spare Part Range</div>
                      <div className="text-[11px] text-slate-400">Factory sealed OG parts billed strictly at MRP</div>
                    </div>
                  </div>
                  <div className="text-sm font-black text-emerald-400 font-mono">
                    {currentRepair.partCostRange}
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <div>
                      <div className="text-xs font-bold text-white">Average On-Site Repair Time</div>
                      <div className="text-[11px] text-slate-400">Technician arrives with complete tool suite</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-amber-300 font-mono">
                    {currentRepair.approxDuration}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
              <div className="text-[11px] text-slate-400">
                🔒 Written estimate delivered before touching a single screw.
              </div>

              <button
                onClick={() =>
                  onOpenBookingModal(
                    currentAppliance.name,
                    `${currentRepair.fault} (Est: ₹500 Visit + Parts)`
                  )
                }
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book This Service (₹500 Visit)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
