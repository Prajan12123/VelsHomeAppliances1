import React, { useState } from "react";
import {
  Building2,
  Briefcase,
  FileSpreadsheet,
  CheckCircle2,
  Send,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { COMPANY_DETAILS } from "../data";

export const ContactCorporateInquiry: React.FC = () => {
  const [corpData, setCorpData] = useState({
    companyName: "",
    contactPerson: "",
    phone: "",
    email: "",
    facilityType: "Textile Mill / Garment Factory",
    unitCount: "10 – 25 Units",
    requirements: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#060D1E] via-[#08122B] to-[#040813] relative overflow-hidden shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: AMC Benefits */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              <span>B2B & Corporate Accounts</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope']">
              Commercial AMC & Multi-Unit Maintenance Contracts
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Serving textile export houses, spinning mills, corporate offices, hospitals, and residential apartment communities across Tiruppur and Coimbatore districts with dedicated service level agreements (SLAs).
            </p>

            <div className="space-y-3">
              {[
                "Dedicated Key Account Manager & Priority Tech Squad",
                "Quarterly Preventive Foam-Jet & Electrical Audits",
                "GST-Compliant Consolidated Monthly Billing",
                "Substantial Spares Discount on Volume Repairs",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 flex items-center justify-between text-xs">
              <div className="text-slate-300">
                Direct Corporate Desk: <strong className="text-white font-mono">{COMPANY_DETAILS.phoneFormatted}</strong>
              </div>
              <span className="text-cyan-400 font-bold">24/7 SLA</span>
            </div>
          </div>

          {/* Right Column: Quick Proposal Request Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <h4 className="text-base font-bold text-white font-['Manrope']">
                  Request Commercial AMC Proposal
                </h4>
                <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                  Custom Quotation
                </span>
              </div>

              {submitted ? (
                <div className="p-6 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-emerald-300">
                    Corporate Proposal Request Received!
                  </div>
                  <p className="text-xs text-slate-300">
                    Our Corporate Key Account Director will review your requirements and reach out at <strong>{corpData.phone || COMPANY_DETAILS.phoneFormatted}</strong> within 2 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Company / Facility Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Tiruppur Garments Ltd"
                        value={corpData.companyName}
                        onChange={(e) => setCorpData({ ...corpData, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Contact Person & Designation *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Suresh (Admin / Facility Mgr)"
                        value={corpData.contactPerson}
                        onChange={(e) => setCorpData({ ...corpData, contactPerson: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Contact Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9842100000"
                        value={corpData.phone}
                        onChange={(e) => setCorpData({ ...corpData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                        Facility / Business Type
                      </label>
                      <select
                        value={corpData.facilityType}
                        onChange={(e) => setCorpData({ ...corpData, facilityType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl glass-input text-xs"
                      >
                        <option value="Textile Mill / Garment Factory" className="bg-slate-900">Textile Mill / Garment Factory</option>
                        <option value="Commercial Office / IT Park" className="bg-slate-900">Commercial Office / IT Park</option>
                        <option value="Hospital / Clinic" className="bg-slate-900">Hospital / Clinic</option>
                        <option value="Hotel / Restaurant" className="bg-slate-900">Hotel / Restaurant</option>
                        <option value="Residential Gated Community" className="bg-slate-900">Residential Gated Community</option>
                        <option value="School / College Institution" className="bg-slate-900">School / College Institution</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                      Estimated Appliance Units / Specific Needs
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. 18 Split ACs + 3 Commercial Chillers requiring quarterly preventive maintenance..."
                      value={corpData.requirements}
                      onChange={(e) => setCorpData({ ...corpData, requirements: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl glass-input text-xs"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  >
                    <span>Request Corporate AMC Custom Quote</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
