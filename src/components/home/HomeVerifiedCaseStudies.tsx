import React, { useState } from "react";
import {
  FileText,
  CheckCircle2,
  MapPin,
  TrendingDown,
  Wrench,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";

interface CaseStudy {
  id: string;
  appliance: string;
  brandModel: string;
  location: string;
  initialSymptom: string;
  localQuotationElsewhere: string;
  velsResolution: string;
  velsFinalCost: string;
  customerSavings: string;
  timeSpent: string;
  warrantyIssued: string;
  technicianNotes: string;
  customerFeedback: string;
  customerName: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "case-fridge",
    appliance: "Refrigerator",
    brandModel: "LG 594L Side-by-Side Dual Inverter",
    location: "Mangalam Road, Avinashi",
    initialSymptom: "Freezer cold (-18°C) but main fresh food compartment warm (+16°C) with continuous clicking noise.",
    localQuotationElsewhere: "₹18,500 (Told whole compressor & motherboard needed replacement)",
    velsResolution: "Digital probe found compressor healthy. Defrost bimetal thermostat had open-circuit failure, causing ice buildup over the damper airway. Replaced OEM defrost sensor & executed thermal steam de-icing.",
    velsFinalCost: "₹1,950 (₹500 Inspection + ₹1,450 OEM Sensor)",
    customerSavings: "₹16,550 Saved",
    timeSpent: "45 Mins at Doorstep",
    warrantyIssued: "6-Month Full Revisit & Parts Warranty",
    technicianNotes: "Verified sub-zero damper airflow profile with digital anemometer. Power draw stabilized at 0.7 Amps.",
    customerFeedback: "Honest and transparent! Other mechanics wanted to take the entire fridge to their workshop for days. VELS fixed it in 45 minutes right in my kitchen.",
    customerName: "K. Rangarajan (Avinashi Resident)",
  },
  {
    id: "case-ac",
    appliance: "Air Conditioner",
    brandModel: "Daikin 1.5 Ton 5-Star Inverter Split",
    location: "Rayapuram, Tiruppur",
    initialSymptom: "Tripping the main 16A MCB after 3 minutes of running. Zero cooling and error code 'E4' on display.",
    localQuotationElsewhere: "₹12,000 (Advised full outdoor PCB card replacement with 1-week lead time)",
    velsResolution: "Diagnosed high-voltage surge short in outdoor IPM rectifier diode. Conducted micro-soldering diode swap, applied anti-corrosion silicone coating, and balanced R32 refrigerant pressure.",
    velsFinalCost: "₹2,400 (₹500 Visit + ₹1,900 Component Overhaul)",
    customerSavings: "₹9,600 Saved",
    timeSpent: "60 Mins at Doorstep",
    warrantyIssued: "6-Month Full Revisit & Parts Warranty",
    technicianNotes: "Tested under 42°C ambient simulated load. Indoor discharge temperature reached 9.4°C in 8 minutes.",
    customerFeedback: "Saved me from spending half the price of a new AC. The technician carried all soldering tools right in his mobile kit.",
    customerName: "S. Murugesan (Garment Exporter)",
  },
  {
    id: "case-washing",
    appliance: "Washing Machine",
    brandModel: "Bosch Serie 6 8kg Front Load",
    location: "Perumanallur Junction",
    initialSymptom: "Deafening roaring sound like an aircraft taking off during spin cycle; machine walking across laundry room.",
    localQuotationElsewhere: "₹9,500 (Claimed entire sealed drum and motor must be discarded)",
    velsResolution: "Extracted outer tub with specialized bearing puller. Replaced worn bearings with original German-grade double-sealed SKF bearings and triple-lip Viton oil seal. Calibrated hydraulic dampers.",
    velsFinalCost: "₹2,850 (₹500 Inspection + ₹2,350 Parts & Calibration)",
    customerSavings: "₹6,650 Saved",
    timeSpent: "75 Mins at Doorstep",
    warrantyIssued: "6-Month Full Revisit & Parts Warranty",
    technicianNotes: "Vibration test run at 1400 RPM registered <1.2mm displacement. 100% water-tight test passed.",
    customerFeedback: "The machine is whisper-quiet again just like day one. Truly master technicians who understand European machines.",
    customerName: "Dr. Ananya Venkatesh",
  },
  {
    id: "case-tv",
    appliance: "4K Smart TV",
    brandModel: "Sony Bravia 55-inch 4K HDR",
    location: "Sevur Main Road",
    initialSymptom: "TV turns on with sound and remote response, but screen remains pitch black (flashlight shows faint image).",
    localQuotationElsewhere: "₹14,000 (Advised full display panel glass replacement)",
    velsResolution: "Display glass was 100% intact. Two LED backlight diodes in string 3 had burned out. Replaced entire backlight array with factory OEM aluminum-backed LED bars and recalibrated power supply voltage.",
    velsFinalCost: "₹2,600 (₹500 Visit + ₹2,100 Full Array Replacement)",
    customerSavings: "₹11,400 Saved",
    timeSpent: "55 Mins",
    warrantyIssued: "6-Month Full Revisit & Parts Warranty",
    technicianNotes: "Calibrated 450 Nits peak HDR luminance with zero dark blotches or discoloration.",
    customerFeedback: "I was about to buy a new TV thinking the panel had died. VELS saved my Sony Bravia with complete honesty.",
    customerName: "M. Saravanan (Business Owner)",
  },
];

interface HomeVerifiedCaseStudiesProps {
  onOpenBookingModal: (appliance?: string, service?: string) => void;
}

export const HomeVerifiedCaseStudies: React.FC<HomeVerifiedCaseStudiesProps> = ({
  onOpenBookingModal,
}) => {
  const [activeCase, setActiveCase] = useState<CaseStudy>(CASE_STUDIES[0]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3.5 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Exclusive Proven Track Record</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-['Manrope'] mb-3">
          Real Doorstep Engineering Case Files
        </h2>
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
          See how our diagnostic accuracy saves local homeowners thousands of rupees by repairing genuine component faults instead of unnecessary replacements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Case Study Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Verified Local Case Studies:</span>
            <span className="text-emerald-400">Avinashi & Tiruppur</span>
          </div>

          {CASE_STUDIES.map((item) => {
            const isSelected = activeCase.id === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveCase(item)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? "bg-cyan-950/40 border-cyan-400/60 shadow-[0_0_20px_rgba(0,229,255,0.15)]"
                    : "glass-panel border-white/10 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-emerald-400" />
                )}

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${
                    isSelected
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                      : "bg-white/5 text-slate-400 border border-white/10"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[11px] font-mono font-extrabold uppercase text-cyan-400">
                      {item.appliance}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md border font-mono font-bold border-emerald-500/40 bg-emerald-500/10 text-emerald-300">
                      {item.customerSavings}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                    {item.brandModel}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Case Detail File */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden shadow-2xl bg-slate-900/90">
            {/* Header / Appliance Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase mb-1">
                  <span>{activeCase.appliance}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3" />
                    {activeCase.location}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope']">
                  {activeCase.brandModel}
                </h3>
              </div>

              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2 shrink-0">
                <TrendingDown className="w-5 h-5 text-emerald-400" />
                <div>
                  <div className="text-[10px] text-slate-400 font-mono uppercase font-bold">Total Customer Savings</div>
                  <div className="text-sm font-extrabold text-emerald-300 font-mono">{activeCase.customerSavings}</div>
                </div>
              </div>
            </div>

            {/* Diagnostic Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
              {/* Initial Symptom */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-slate-400 font-bold">Reported Symptom</div>
                <div className="text-xs text-slate-200 leading-relaxed font-medium">{activeCase.initialSymptom}</div>
              </div>

              {/* Outside Quote */}
              <div className="p-4 rounded-2xl bg-rose-500/[0.04] border border-rose-500/20 space-y-1.5">
                <div className="text-[10px] font-mono uppercase text-rose-400 font-bold">Quoted Elsewhere</div>
                <div className="text-xs text-rose-200/90 leading-relaxed font-medium">{activeCase.localQuotationElsewhere}</div>
              </div>
            </div>

            {/* VELS Engineering Resolution */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 mb-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase">
                <Wrench className="w-4 h-4 text-cyan-400" />
                <span>VELS Precision Diagnostic & Resolution:</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {activeCase.velsResolution}
              </p>
            </div>

            {/* Specs & Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs mb-5">
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Final Job Cost</span>
                <span className="text-xs font-bold text-cyan-300 font-mono">{activeCase.velsFinalCost}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-mono">Turnaround Time</span>
                <span className="text-xs font-bold text-white font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  {activeCase.timeSpent}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[10px] text-slate-400 block font-mono">Warranty Handed</span>
                <span className="text-xs font-bold text-emerald-400 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  6 Months
                </span>
              </div>
            </div>

            {/* Customer Quote Box */}
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs italic text-slate-300 leading-relaxed mb-6 relative">
              <div className="font-semibold text-white not-italic mb-1 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified Homeowner Feedback:</span>
              </div>
              "{activeCase.customerFeedback}"
              <div className="text-[11px] text-cyan-400 font-mono not-italic mt-2">
                — {activeCase.customerName}
              </div>
            </div>

            {/* Action Trigger */}
            <button
              onClick={() => onOpenBookingModal(activeCase.appliance, "Diagnostic Check")}
              className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Similar Honest ₹500 Diagnosis For Your Appliance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
