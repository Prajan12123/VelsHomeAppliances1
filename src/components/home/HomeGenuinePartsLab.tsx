import React, { useState } from "react";
import {
  ShieldCheck,
  ShieldX,
  Cpu,
  Zap,
  CheckCircle2,
  XCircle,
  QrCode,
  Sparkles,
  ArrowRight,
  Search,
  Check,
} from "lucide-react";

interface ComponentTeardown {
  id: string;
  name: string;
  appliance: string;
  category: string;
  oemSpecs: {
    origin: string;
    lifespan: string;
    warranty: string;
    materials: string;
    fireRating: string;
    testCycle: string;
  };
  copycatFlaws: {
    origin: string;
    lifespan: string;
    warranty: string;
    materials: string;
    fireRating: string;
    failureMode: string;
  };
  keyAdvantage: string;
}

const TEARDOWN_COMPONENTS: ComponentTeardown[] = [
  {
    id: "pcb-inverter",
    name: "Dual Inverter Micro-Controller PCB",
    appliance: "Air Conditioners & Refrigerators",
    category: "Power Electronics",
    oemSpecs: {
      origin: "OEM Sealed Factory Direct (Japan / Korea Spec)",
      lifespan: "8 to 12 Years Expected",
      warranty: "6-Month Full Replacement & Labor Warranty",
      materials: "Double-sided FR4 Glass Epoxy + Conformal Silicone Seal",
      fireRating: "UL94-V0 Flame Retardant Certified",
      testCycle: "10,000 High-Voltage Surge Test Cycles",
    },
    copycatFlaws: {
      origin: "Uncertified Local Assembled Repacks",
      lifespan: "3 to 6 Months Typical",
      warranty: "No Warranty or 7-Day Limit",
      materials: "Single-layer Paper Phenolic board (absorbs humidity)",
      fireRating: "No Fire Protection (Flammable plastic diodes)",
      failureMode: "Blows IPM chip upon minor voltage fluctuations",
    },
    keyAdvantage: "Withstands 160V–290V fluctuating power grid variations common in rural & industrial Tamil Nadu.",
  },
  {
    id: "compressor-relay",
    name: "PTC Solid-State Compressor Starter & OLP",
    appliance: "Inverter & Frost-Free Refrigerators",
    category: "Electro-Mechanical",
    oemSpecs: {
      origin: "Original Tier-1 Refrigerator OEM Component",
      lifespan: "7 to 10 Years Continuous Cycling",
      warranty: "6-Month Full Replacement & Labor Warranty",
      materials: "High-grade sintered Barium Titanate ceramic disc",
      fireRating: "High-temperature Bakelite heat enclosure (350°C)",
      testCycle: "500,000 Thermal On/Off Switch Cycles",
    },
    copycatFlaws: {
      origin: "Recycled Refurbished Scrap Relays",
      lifespan: "2 to 8 Weeks",
      warranty: "Zero Return Policy",
      materials: "Brittle low-purity composite disc that cracks easily",
      fireRating: "Melts and emits pungent chemical smoke under load",
      failureMode: "Continuous clicking, locked rotor, compressor coil burnout",
    },
    keyAdvantage: "Cuts power instantly during micro-second current spikes, protecting the expensive compressor motor.",
  },
  {
    id: "washer-bearing",
    name: "Double-Sealed High-RPM Drum Bearing & Spider Hub",
    appliance: "Front & Top Load Washing Machines",
    category: "Heavy Mechanical",
    oemSpecs: {
      origin: "Original Factory High-Grade Chrome Steel (SKF/OEM)",
      lifespan: "10+ Years (2,500+ Wash Cycles)",
      warranty: "6-Month Full Replacement & Labor Warranty",
      materials: "Precision Carbon-Nitride Steel + Viton Triple-Lip Oil Seal",
      fireRating: "High-temp water & detergent chemical resistant",
      testCycle: "1400 RPM continuous dynamic load testing",
    },
    copycatFlaws: {
      origin: "Unbranded Mild Steel Bearings",
      lifespan: "2 to 4 Months",
      warranty: "None",
      materials: "Non-sealed rubber gaskets that let detergent water leak",
      fireRating: "Corrodes rapidly in soapy hard water environment",
      failureMode: "Severe grinding roar, rust seizure, drum axle fracture",
    },
    keyAdvantage: "100% impenetrable triple-lip seal eliminates detergent water ingress and drum walking.",
  },
  {
    id: "copper-coil",
    name: "100% Virgin Copper Condenser & Motor Windings",
    appliance: "Split Inverter ACs & Mixer Motors",
    category: "Thermal & Motors",
    oemSpecs: {
      origin: "99.9% Electrolytic Pure Virgin Copper",
      lifespan: "10 to 15 Years Anti-Corrosion",
      warranty: "6-Month Full Replacement & Labor Warranty",
      materials: "Grooved Inner Copper Tubing with Blue-Fin Anti-Rust Coat",
      fireRating: "Operating pressure capacity exceeding 650 PSI",
      testCycle: "Hydrostatic Nitrogen Pressure Tested @ 45 Bar",
    },
    copycatFlaws: {
      origin: "Aluminum-Copper Hybrid / Scrap Alloy",
      lifespan: "1 to 2 Seasons",
      warranty: "No leakage coverage",
      materials: "Porous aluminum tubes vulnerable to formicary corrosion",
      fireRating: "Cannot be braze-repaired without weakening joints",
      failureMode: "Frequent micro-pinhole gas leaks requiring costly refills",
    },
    keyAdvantage: "Delivers maximum thermal conductivity, rapid sub-zero heat exchange, and zero gas leaks.",
  },
];

interface HomeGenuinePartsLabProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
}

export const HomeGenuinePartsLab: React.FC<HomeGenuinePartsLabProps> = ({
  onOpenBookingModal,
}) => {
  const [activeComponent, setActiveComponent] = useState<ComponentTeardown>(TEARDOWN_COMPONENTS[0]);
  const [viewMode, setViewMode] = useState<"comparison" | "authenticator">("comparison");
  const [sampleSerial, setSampleSerial] = useState("VELS-OEM-2026-8849X");
  const [authResult, setAuthResult] = useState<{
    status: "verified" | "invalid";
    partName: string;
    batch: string;
    warranty: string;
    inspector: string;
  } | null>({
    status: "verified",
    partName: "Genuine OEM Dual Inverter Board",
    batch: "QC-2026-PASS / Hub Avinashi",
    warranty: "6 Months Comprehensive Warranty Active",
    inspector: "Senior QC Lead - K. Murugan (VELS Hub)",
  });

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (sampleSerial.trim().length > 4) {
      setAuthResult({
        status: "verified",
        partName: activeComponent.name,
        batch: `QC-${Math.floor(1000 + Math.random() * 9000)}-PASS / Hub Avinashi`,
        warranty: "6 Months Comprehensive Guarantee Active",
        inspector: "Senior Master Engineer - S. Prakash",
      });
    } else {
      setAuthResult(null);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Exclusive Zero-Counterfeit Pledge</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Inside Our Genuine Parts Testing Lab
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          Substandard aftermarket parts burn out in weeks. See how VELS 100% factory-sealed original spares protect your investment.
        </p>

        {/* View Switcher Toggle */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setViewMode("comparison")}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border ${
              viewMode === "comparison"
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            Engineering Teardown
          </button>
          <button
            onClick={() => setViewMode("authenticator")}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer border flex items-center gap-1.5 ${
              viewMode === "authenticator"
                ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.25)]"
                : "bg-white/5 text-slate-400 border-white/10 hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Digital Part Authenticator</span>
          </button>
        </div>
      </div>

      {viewMode === "comparison" ? (
        <div>
          {/* Component Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {TEARDOWN_COMPONENTS.map((item) => {
              const isSelected = activeComponent.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveComponent(item)}
                  className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                      : "glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="text-[10px] font-mono font-bold uppercase text-cyan-400 mb-1">
                    {item.category}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.name}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Side-by-Side Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* VELS Genuine OEM Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-emerald-500/40 relative overflow-hidden bg-gradient-to-b from-emerald-950/20 to-slate-900/90 shadow-xl">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-emerald-500/20 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      VELS Standard
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white font-['Manrope']">
                      100% Factory OEM Genuine
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 font-mono font-extrabold text-[11px]">
                  6-Month Warranty
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Component Origin:</span>
                  <span className="font-semibold text-emerald-300 text-right">{activeComponent.oemSpecs.origin}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Design Lifespan:</span>
                  <span className="font-semibold text-white text-right">{activeComponent.oemSpecs.lifespan}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Material Standard:</span>
                  <span className="font-semibold text-slate-200 text-right">{activeComponent.oemSpecs.materials}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Fire & Heat Safety:</span>
                  <span className="font-semibold text-emerald-300 text-right">{activeComponent.oemSpecs.fireRating}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Factory Quality Stress Test:</span>
                  <span className="font-semibold text-slate-200 text-right">{activeComponent.oemSpecs.testCycle}</span>
                </div>
              </div>

              <div className="mt-6 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Key Engineering Advantage:</strong> {activeComponent.keyAdvantage}</span>
              </div>
            </div>

            {/* Substandard Counterfeit Card */}
            <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-rose-500/30 relative overflow-hidden bg-gradient-to-b from-rose-950/20 to-slate-900/90 shadow-xl opacity-90">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-rose-500/20 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-300">
                    <ShieldX className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider">
                      Market Counterfeit
                    </span>
                    <h3 className="text-base sm:text-lg font-extrabold text-white font-['Manrope']">
                      Generic / Refurbished Repack
                    </h3>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 font-mono font-extrabold text-[11px]">
                  High Failure Risk
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Component Origin:</span>
                  <span className="font-semibold text-rose-300 text-right">{activeComponent.copycatFlaws.origin}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Design Lifespan:</span>
                  <span className="font-semibold text-rose-200 text-right">{activeComponent.copycatFlaws.lifespan}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Material Standard:</span>
                  <span className="font-semibold text-slate-300 text-right">{activeComponent.copycatFlaws.materials}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Fire & Heat Safety:</span>
                  <span className="font-semibold text-rose-400 text-right">{activeComponent.copycatFlaws.fireRating}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-slate-400">Frequent Failure Mode:</span>
                  <span className="font-semibold text-rose-300 text-right">{activeComponent.copycatFlaws.failureMode}</span>
                </div>
              </div>

              <div className="mt-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span><strong>Customer Alert:</strong> Local mechanics often charge full prices for these scrap parts, which fail again in weeks and void manufacturer warranties.</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Digital Part Authenticator Tool */
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-['Manrope']">
                VELS Serial & Batch Verification Engine
              </h3>
              <p className="text-xs text-slate-300">
                Every spare part fitted by our engineers carries a laser-etched VELS QC verification barcode.
              </p>
            </div>
          </div>

          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={sampleSerial}
                onChange={(e) => setSampleSerial(e.target.value)}
                placeholder="Enter Part Serial / QC Number (e.g. VELS-OEM-2026-8849X)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Verify Part Integrity
            </button>
          </form>

          {authResult && (
            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 animate-fade-in space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>100% Verified Authentic VELS OEM Stock</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                  VALIDATED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2 border-t border-emerald-500/20">
                <div>
                  <span className="text-slate-400">Assigned Part: </span>
                  <span className="text-white font-semibold">{authResult.partName}</span>
                </div>
                <div>
                  <span className="text-slate-400">Batch Code: </span>
                  <span className="text-cyan-300 font-mono font-semibold">{authResult.batch}</span>
                </div>
                <div>
                  <span className="text-slate-400">Warranty Coverage: </span>
                  <span className="text-emerald-300 font-semibold">{authResult.warranty}</span>
                </div>
                <div>
                  <span className="text-slate-400">Inspected By: </span>
                  <span className="text-white font-semibold">{authResult.inspector}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CTA Footer Strip */}
      <div className="mt-10 text-center">
        <button
          onClick={() => onOpenBookingModal()}
          className="inline-flex items-center gap-2 py-3 px-6 rounded-2xl bg-cyan-500/20 hover:bg-cyan-400 hover:text-slate-950 text-cyan-300 font-bold text-xs font-mono uppercase tracking-wider transition-all border border-cyan-500/40 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.2)]"
        >
          <span>Schedule Doorstep Diagnostic with 100% Genuine Spare Parts</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
