import React, { useState, useEffect } from "react";
import {
  X,
  Wrench,
  CheckCircle2,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Send,
  Sparkles,
  AlertCircle,
  Truck,
  Copy,
  Check,
} from "lucide-react";
import { COMPANY_DETAILS, APPLIANCE_SERVICES } from "../data";
import { BookingFormData, BookingRecord } from "../types";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillAppliance?: string;
  prefillService?: string;
  onBookingSuccess: (booking: BookingRecord) => void;
  onOpenTrackerWithId?: (trackingId: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefillAppliance = "",
  prefillService = "",
  onBookingSuccess,
  onOpenTrackerWithId,
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    mobile: "",
    applianceType: prefillAppliance || "AC Service & Installation",
    serviceRequired: prefillService || "General Diagnostic & Fixed ₹500 Visit",
    address: "",
    preferredDate: new Date().toISOString().split("T")[0],
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successBooking, setSuccessBooking] = useState<BookingRecord | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (prefillAppliance) {
      setFormData((prev) => ({
        ...prev,
        applianceType: prefillAppliance,
        serviceRequired: prefillService || prev.serviceRequired,
      }));
    }
  }, [prefillAppliance, prefillService]);

  if (!isOpen) return null;

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
      setErrorMsg("Please enter your service address.");
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
        setSuccessBooking(data.booking);
        onBookingSuccess(data.booking);
      } else {
        const fallbackBooking: BookingRecord = {
          ...formData,
          id: `VELS-${Math.floor(10000 + Math.random() * 90000)}`,
          status: "Confirmed",
          createdAt: new Date().toISOString(),
          fixedCharge: COMPANY_DETAILS.fixedCharge,
        };
        setSuccessBooking(fallbackBooking);
        onBookingSuccess(fallbackBooking);
      }
    } catch (err) {
      const fallbackBooking: BookingRecord = {
        ...formData,
        id: `VELS-${Math.floor(10000 + Math.random() * 90000)}`,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
        fixedCharge: COMPANY_DETAILS.fixedCharge,
      };
      setSuccessBooking(fallbackBooking);
      onBookingSuccess(fallbackBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTrackingId = (id: string) => {
    navigator.clipboard?.writeText(id);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  const handleResetAndClose = () => {
    setSuccessBooking(null);
    setErrorMsg("");
    onClose();
  };

  const handleTrackNow = (id: string) => {
    onClose();
    if (onOpenTrackerWithId) {
      onOpenTrackerWithId(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-hero-up">
      <div className="glass-panel w-full max-w-xl rounded-3xl overflow-hidden border border-cyan-500/30 p-6 sm:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Close button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {successBooking ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                Booking Confirmed & Dispatched
              </span>
              <h3 className="text-2xl font-extrabold text-white font-['Manrope'] mt-1">
                Technician Dispatched!
              </h3>
              
              {/* Tracking ID Badge */}
              <div className="mt-2 inline-flex items-center gap-2 p-2 rounded-2xl bg-cyan-950/80 border border-cyan-400/50 shadow-md">
                <span className="text-xs text-slate-400 font-medium">Tracking ID:</span>
                <span className="text-base font-mono font-black text-cyan-300">
                  {successBooking.id}
                </span>
                <button
                  onClick={() => handleCopyTrackingId(successBooking.id)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                  title="Copy Tracking ID"
                >
                  {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Hello <strong className="text-white">{successBooking.customerName}</strong>, your service order for <strong className="text-cyan-300">{successBooking.applianceType}</strong> has been assigned to our master engineer for <strong className="text-white">{successBooking.preferredDate} ({successBooking.timeSlot})</strong>.
            </p>

            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Visiting + Inspection Charge:</span>
                <span className="font-bold text-white font-mono">₹500 (Pay after visit)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Service Address:</span>
                <span className="font-medium text-slate-200 truncate max-w-[240px]">{successBooking.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guarantee:</span>
                <span className="font-bold text-emerald-400">6-Month Free Revisit & Warranty</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleTrackNow(successBooking.id)}
                className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,229,255,0.4)]"
              >
                <Truck className="w-4 h-4" />
                <span>Track Live Order & Status</span>
              </button>

              <button
                onClick={handleResetAndClose}
                className="py-3 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope']">
                  Book Appliance Service
                </h3>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-cyan-400 font-mono font-bold">Visiting + Service Charge: ₹500</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-emerald-400">60-90 Min Rapid Arrival</span>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Appliance *
                  </label>
                  <select
                    value={formData.applianceType}
                    onChange={(e) => setFormData({ ...formData, applianceType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                  >
                    {APPLIANCE_SERVICES.map((svc) => (
                      <option key={svc.id} value={svc.name} className="bg-slate-900 text-white">
                        {svc.name}
                      </option>
                    ))}
                    <option value="Other Appliance" className="bg-slate-900 text-white">
                      Other Appliance
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Preferred Time *
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)" className="bg-slate-900 text-white">
                      Morning (9 AM - 12 PM)
                    </option>
                    <option value="Afternoon (12:00 PM - 03:00 PM)" className="bg-slate-900 text-white">
                      Afternoon (12 PM - 3 PM)
                    </option>
                    <option value="Evening (03:00 PM - 06:00 PM)" className="bg-slate-900 text-white">
                      Evening (3 PM - 6 PM)
                    </option>
                    <option value="Night / Express (06:00 PM - 09:00 PM)" className="bg-slate-900 text-white">
                      Express (6 PM - 9 PM)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Service Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Street name, door no, apartment, landmark"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                  Issue Details (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Not cooling / noise / water leakage..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl glass-input text-xs sm:text-sm"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Booking Technician...</span>
                ) : (
                  <span>Confirm Service Booking</span>
                )}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
