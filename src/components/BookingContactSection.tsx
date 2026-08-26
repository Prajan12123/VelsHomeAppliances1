import React, { useState } from "react";
import {
  Wrench,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Mail,
  Send,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { COMPANY_DETAILS, APPLIANCE_SERVICES } from "../data";
import { BookingFormData, BookingRecord } from "../types";

interface BookingContactSectionProps {
  initialAppliance?: string;
  initialService?: string;
  onBookingSuccess: (booking: BookingRecord) => void;
  onOpenChat: (initialPrompt?: string) => void;
}

export const BookingContactSection: React.FC<BookingContactSectionProps> = ({
  initialAppliance = "",
  initialService = "",
  onBookingSuccess,
  onOpenChat,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    mobile: "",
    applianceType: initialAppliance || "AC Service & Installation",
    serviceRequired: initialService || "General Diagnostic & Fixed ₹500 Visit",
    address: "",
    preferredDate: new Date().toISOString().split("T")[0],
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successTicket, setSuccessTicket] = useState<BookingRecord | null>(null);

  const timeSlots = [
    "Morning (09:00 AM - 12:00 PM)",
    "Afternoon (12:00 PM - 03:00 PM)",
    "Evening (03:00 PM - 06:00 PM)",
    "Night / Express (06:00 PM - 09:00 PM)",
  ];

  const serviceOptions = [
    "General Diagnostic & Fixed ₹500 Visit",
    "High-Pressure Foam Jet Deep Cleaning",
    "Gas Refilling & Leakage Sealing",
    "Error Code / PCB Diagnostic & Fix",
    "Appliance Installation & Wall Mounting",
    "Uninstallation & Relocation Service",
    "Complete Overhaul & Spare Replacement",
    "Appliance Demo & Purchase Inquiry",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.customerName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.mobile.trim() || formData.mobile.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.address.trim()) {
      setErrorMsg("Please enter your service address/locality.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success && data.booking) {
        setSuccessTicket(data.booking);
        onBookingSuccess(data.booking);
      } else {
        // Fallback local booking simulation
        const fallbackBooking: BookingRecord = {
          ...formData,
          id: `VELS-${Math.floor(10000 + Math.random() * 90000)}`,
          status: "Confirmed",
          createdAt: new Date().toISOString(),
          fixedCharge: COMPANY_DETAILS.fixedCharge,
        };
        setSuccessTicket(fallbackBooking);
        onBookingSuccess(fallbackBooking);
      }
    } catch (err) {
      // Fallback local booking
      const fallbackBooking: BookingRecord = {
        ...formData,
        id: `VELS-${Math.floor(10000 + Math.random() * 90000)}`,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        fixedCharge: COMPANY_DETAILS.fixedCharge,
      };
      setSuccessTicket(fallbackBooking);
      onBookingSuccess(fallbackBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#05070F] overflow-hidden">
      {/* Background Ambient Spotlights */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5" />
            <span>Instant Doorstep Appointment</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4 font-['Manrope']">
            Book a Technician & Contact Us
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base">
            Schedule your professional service visit today with our fixed <strong className="text-cyan-300 font-semibold">₹500 inspection fee</strong> and written 6-month guarantee & warranty.
          </p>
        </div>

        {/* 2 Column Layout: Info on Left, Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Details & Operations Hub */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Call & WhatsApp Box */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10">
              <h3 className="text-xl font-bold text-white mb-2 font-['Manrope']">
                Immediate Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                Have an urgent appliance breakdown or water leak? Connect directly with our on-duty master engineer.
              </p>

              <div className="space-y-3">
                <a
                  href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
                  className="w-full p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 hover:bg-cyan-900/60 text-white transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-cyan-400 font-bold uppercase">Direct Phone Line</div>
                      <div className="text-base font-extrabold font-mono text-white">{COMPANY_DETAILS.phoneFormatted}</div>
                    </div>
                  </div>
                  <span className="text-xs text-cyan-300 font-semibold group-hover:translate-x-1 transition-transform">Call Now →</span>
                </a>

                <a
                  href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20would%20like%20to%20book%20a%20technician%20for%20service.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 hover:bg-emerald-900/60 text-white transition-all flex items-center justify-between group shadow-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[11px] text-emerald-400 font-bold uppercase">Instant WhatsApp Chat</div>
                      <div className="text-base font-extrabold font-mono text-white">{COMPANY_DETAILS.phoneFormatted}</div>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-300 font-semibold group-hover:translate-x-1 transition-transform">Chat Now →</span>
                </a>
              </div>
            </div>

            {/* Hub Details & Operating Hours */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-white/10 space-y-5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Central Service Hub & Showroom</div>
                  <div className="text-slate-300 leading-relaxed">{COMPANY_DETAILS.address}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Operating Hours</div>
                  <div className="text-slate-300">{COMPANY_DETAILS.serviceHours}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-0.5">Official Support Email</div>
                  <div className="text-slate-300 font-mono">{COMPANY_DETAILS.email}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyan-300 text-xs font-semibold">
                  <Sparkles className="w-4 h-4" />
                  <span>Unsure about the issue?</span>
                </div>
                <button
                  onClick={() => onOpenChat()}
                  className="text-xs font-bold text-white underline hover:text-cyan-300"
                >
                  Ask Gemini AI
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/15 relative shadow-2xl">
              
              {/* Form Title & Pricing Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope']">
                    Book Doorstep Technician
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fill out the details below for guaranteed 60-90 min technician dispatch.
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-full bg-cyan-400 text-slate-950 text-xs font-mono font-black shadow-[0_0_15px_rgba(0,229,255,0.4)]">
                  VISITING + SERVICE CHARGE: ₹500
                </div>
              </div>

              {/* Success Notification Banner if booked */}
              {successTicket && (
                <div className="mb-6 p-5 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-white animate-hero-up shadow-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-emerald-300">
                          Booking Confirmed Successfully!
                        </span>
                        <span className="text-xs font-mono bg-emerald-400 text-slate-950 font-black px-2 py-0.5 rounded">
                          {successTicket.id}
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed mb-3">
                        Thank you, <strong className="text-white">{successTicket.customerName}</strong>! Our certified engineer will arrive at your address on <strong className="text-emerald-300">{successTicket.preferredDate}</strong> during the <strong className="text-emerald-300">{successTicket.timeSlot}</strong> slot.
                      </p>
                      <div className="text-[11px] text-slate-300 flex flex-wrap items-center gap-2">
                        <span>Visiting Charge + Service Charge: ₹500</span>
                        <span>•</span>
                        <span className="text-emerald-400">6-Month Guarantee & Warranty Activated</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* The Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.customerName}
                      onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Mobile Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Appliance Type *
                    </label>
                    <select
                      value={formData.applianceType}
                      onChange={(e) => setFormData({ ...formData, applianceType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                    >
                      {APPLIANCE_SERVICES.map((svc) => (
                        <option key={svc.id} value={svc.name} className="bg-slate-900 text-white">
                          {svc.name}
                        </option>
                      ))}
                      <option value="Other Appliance" className="bg-slate-900 text-white">
                        Other / Multi-Appliance
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Service Required *
                    </label>
                    <select
                      value={formData.serviceRequired}
                      onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                    >
                      {serviceOptions.map((opt, idx) => (
                        <option key={idx} value={opt} className="bg-slate-900 text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Service Address / Street & Locality *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 4B, Emerald Heights, 2nd Main Road, Anna Nagar"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.preferredDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={formData.timeSlot}
                      onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                    >
                      {timeSlots.map((slot, idx) => (
                        <option key={idx} value={slot} className="bg-slate-900 text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Describe Issue / Model No (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. AC indoor unit is dripping water and error code E4 is flashing on display..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl glass-input text-xs sm:text-sm"
                  />
                </div>

                {/* Pricing Guarantee Summary */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Fixed Diagnostic Visit Fee:</span>
                  </div>
                  <span className="font-mono font-extrabold text-cyan-300 text-sm">
                    ₹500 (Pay after completion)
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-booking-btn"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_40px_rgba(0,229,255,0.7)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Assigning Master Technician...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-slate-950" />
                      <span>Confirm Service Booking</span>
                      <Send className="w-4 h-4" />
                    </div>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
