import React from "react";
import { Check, X, ShieldCheck, Zap, Award, Sparkles } from "lucide-react";

export const WhyChooseComparisonTable: React.FC = () => {
  const comparisonData = [
    {
      feature: "Visiting & Diagnostic Fee",
      vels: "Fixed ₹500 (Visiting + Diagnostic included)",
      others: "₹300–₹800 visiting + separate diagnostic fees",
      isAdvantage: true,
    },
    {
      feature: "Spare Parts Authenticity",
      vels: "100% Genuine OEM factory-sealed parts with QR verification",
      others: "Often generic, unbranded or reconditioned parts",
      isAdvantage: true,
    },
    {
      feature: "Technician Credentials",
      vels: "Manufacturer-trained, certified & police-verified engineers",
      others: "Unverified third-party freelance mechanics",
      isAdvantage: true,
    },
    {
      feature: "Service Guarantee",
      vels: "6-Month unconditional free revisit guarantee & warranty",
      others: "No warranty or unreachable once payment is made",
      isAdvantage: true,
    },
    {
      feature: "Diagnostic Tooling",
      vels: "Digital multimeters, thermal leak detectors & PCB testers",
      others: "Trial-and-error manual guesswork",
      isAdvantage: true,
    },
    {
      feature: "Doorstep Response Speed",
      vels: "Guaranteed 60–90 min rapid arrival across Avinashi & region",
      others: "Uncertain delays, 24 to 48 hours waiting time",
      isAdvantage: true,
    },
    {
      feature: "Post-Service Safety Audit",
      vels: "12-Point electrical earth leakage & insulation inspection included",
      others: "No safety checks conducted",
      isAdvantage: true,
    },
    {
      feature: "Billing & Documentation",
      vels: "Transparent digital invoice with itemized parts & work order",
      others: "Handwritten or verbal quote without proof",
      isAdvantage: true,
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Award className="w-3.5 h-3.5" />
          <span>Objective Comparison</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          VELS Home Appliances vs. Local Repair Options
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          See why thousands of households across Avinashi, Tiruppur, and Coimbatore trust our certified service standard over unorganized repair mechanics.
        </p>
      </div>

      <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03]">
                <th className="py-5 px-6 text-xs font-extrabold text-slate-400 uppercase tracking-wider w-1/3">
                  Service Feature
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-cyan-300 uppercase tracking-wider bg-cyan-950/40 border-x border-cyan-500/20 w-1/3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    <span>VELS Service Standard</span>
                  </div>
                </th>
                <th className="py-5 px-6 text-xs font-extrabold text-slate-400 uppercase tracking-wider w-1/3">
                  Local / Unorganized Mechanics
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
              {comparisonData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-4 px-6 font-bold text-white">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 font-semibold text-emerald-300 bg-cyan-950/20 border-x border-cyan-500/20">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{row.vels}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-rose-500/10 border border-rose-400/30 flex items-center justify-center text-rose-400 shrink-0 mt-0.5">
                        <X className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{row.others}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 sm:p-6 bg-cyan-950/30 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-cyan-200">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>All appointments protected by our Fixed ₹500 Visit & Diagnosis Guarantee.</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            *Certified by VELS Quality & Safety Control Board
          </div>
        </div>
      </div>
    </section>
  );
};
