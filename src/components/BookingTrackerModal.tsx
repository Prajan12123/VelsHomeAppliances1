import React, { useState, useEffect } from "react";
import {
  X,
  Search,
  CheckCircle2,
  Phone,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Filter,
  RefreshCw,
  Lock,
  KeyRound,
  ArrowRight,
  LogOut,
  Clock,
  MapPin,
  ShieldCheck,
  Calendar,
  Sparkles,
  ChevronRight,
  MessageCircle,
  Truck,
  UserCheck,
  Check,
  QrCode,
  SlidersHorizontal,
  RotateCcw,
  BadgeAlert,
  HelpCircle,
  Mail,
  Smartphone,
  Key,
} from "lucide-react";
import { COMPANY_DETAILS } from "../data";
import { BookingRecord, ServiceTrackingRecord, TrackingStage } from "../types";

interface BookingTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  recentBookings?: BookingRecord[];
  initialTrackingId?: string;
  onOpenBooking?: (prefillAppliance?: string) => void;
}

export const BookingTrackerModal: React.FC<BookingTrackerModalProps> = ({
  isOpen,
  onClose,
  recentBookings = [],
  initialTrackingId = "",
  onOpenBooking,
}) => {
  // Mode: "customer" (Live Tracker) or "owner" (Admin Excel Register)
  const [activeMode, setActiveMode] = useState<"customer" | "owner">("customer");

  // Customer Tracking States
  const [searchQuery, setSearchQuery] = useState<string>(initialTrackingId || "VELS-84920");
  const [trackedBooking, setTrackedBooking] = useState<ServiceTrackingRecord | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string>("");
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  // Reschedule Form State
  const [isRescheduling, setIsRescheduling] = useState<boolean>(false);
  const [rescheduleDate, setRescheduleDate] = useState<string>("");
  const [rescheduleSlot, setRescheduleSlot] = useState<string>("Morning (09:00 AM - 12:00 PM)");
  const [rescheduleMsg, setRescheduleMsg] = useState<string>("");

  // Owner Portal States
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem("vels_owner_auth") === "true";
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [ownerSearchQuery, setOwnerSearchQuery] = useState("");
  const [ownerStatusFilter, setOwnerStatusFilter] = useState<string>("All");
  const [backendBookings, setBackendBookings] = useState<BookingRecord[]>(recentBookings);
  const [isLoadingOwner, setIsLoadingOwner] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccessMsg, setExportSuccessMsg] = useState("");
  const [selectedOwnerBooking, setSelectedOwnerBooking] = useState<BookingRecord | null>(null);

  // Forgot PIN States
  const [isForgotPinOpen, setIsForgotPinOpen] = useState(false);
  const [recoveryIdentifier, setRecoveryIdentifier] = useState("");
  const [recoveryKey, setRecoveryKey] = useState("");
  const [recoveryMethod, setRecoveryMethod] = useState<"identifier" | "masterKey">("identifier");
  const [isRecovering, setIsRecovering] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveredPin, setRecoveredPin] = useState<string | null>(null);
  const [recoverySuccessMsg, setRecoverySuccessMsg] = useState("");

  // Quick Demo Tracking IDs
  const quickDemoIds = [
    { id: "VELS-84920", label: "AC Jet Cleaning (En-Route)", status: "Technician Assigned" },
    { id: "VELS-84922", label: "Fridge Defrost (In Progress)", status: "In Progress" },
    { id: "VELS-84921", label: "Washer Drain Error (Confirmed)", status: "Confirmed" },
    { id: "VELS-84924", label: "Chimney Degreasing (Completed)", status: "Completed" },
  ];

  // Lookup Tracking details from backend
  const handleTrackBooking = async (queryToSearch?: string) => {
    const q = (queryToSearch || searchQuery).trim();
    if (!q) {
      setSearchError("Please enter a Tracking ID (e.g. VELS-84920) or 10-digit mobile number.");
      return;
    }

    setIsSearching(true);
    setSearchError("");
    setRescheduleMsg("");

    try {
      const res = await fetch(`/api/bookings/track/${encodeURIComponent(q)}`);
      const data = await res.json();

      if (res.ok && data.found && data.booking) {
        setTrackedBooking(data.booking);
        setSearchQuery(data.booking.id);
        // Expand the currently active step by default
        const activeStep = data.booking.stages?.find((s: TrackingStage) => s.active)?.step || 1;
        setExpandedStep(activeStep);
      } else {
        // If not found in backend, check local bookings list
        const localMatched = backendBookings.find(
          (b) =>
            b.id.toLowerCase() === q.toLowerCase() ||
            b.mobile.replace(/\D/g, "").includes(q.replace(/\D/g, ""))
        );

        if (localMatched) {
          // Generate client fallback tracking record
          const fallbackStages: TrackingStage[] = [
            {
              step: 1,
              title: "Booking Order Confirmed",
              description: `Service ticket logged into central system. Standard ₹${COMPANY_DETAILS.fixedCharge} visiting fee locked.`,
              time: "Just now",
              completed: true,
              active: false,
              details: [`Ticket: ${localMatched.id}`, `Appliance: ${localMatched.applianceType}`],
            },
            {
              step: 2,
              title: "Master Technician Assigned",
              description: "Lead technician allocated with safety tool bag & genuine parts.",
              time: "10 mins ago",
              completed: true,
              active: true,
              details: ["Technician: R. Vignesh Kumar", "Certification: ISO 9001:2015"],
            },
            {
              step: 3,
              title: "En-Route to Doorstep",
              description: `Technician dispatched from Avinashi Central Hub towards ${localMatched.address}.`,
              time: "Pending",
              completed: false,
              active: false,
              details: ["Live ETA: 25–35 Mins", "Van: TN-39-BY-4819"],
            },
            {
              step: 4,
              title: "Multi-Point Inspection",
              description: "Voltage, motor load, and coolant pressure diagnostics.",
              time: "Pending",
              completed: false,
              active: false,
            },
            {
              step: 5,
              title: "Calibration & Safety Test",
              description: "20-minute continuous run test under full load.",
              time: "Pending",
              completed: false,
              active: false,
            },
            {
              step: 6,
              title: "Service Complete & 180-Day Warranty",
              description: "Job card signed and 6-month warranty certificate activated.",
              time: "Pending",
              completed: false,
              active: false,
            },
          ];

          setTrackedBooking({
            ...localMatched,
            trackingId: localMatched.id,
            currentStageIndex: 2,
            liveStatusText: "Master Technician Assigned & En-Route",
            lastUpdated: new Date().toISOString(),
            stages: fallbackStages,
            technician: {
              name: "R. Vignesh Kumar",
              id: "VELS-TECH-042",
              phone: COMPANY_DETAILS.phone,
              experience: "12+ Years Master Tech",
              rating: 4.96,
              totalJobs: 1420,
              specialty: "Inverter AC & Refrigeration",
              currentLocation: "Mangalam Road Hub (3.2 km away)",
              distanceKm: "3.2 km",
              eta: "20–30 Mins",
              vanRegNumber: "TN-39-BY-4819",
              verifiedOtpCode: "7492",
            },
            jobCard: {
              diagnosticChecklist: [
                { item: "Power Voltage & Grounding Test", status: "Passed" },
                { item: "Motor & Compressor Health Audit", status: "Passed" },
                { item: "PCB Electronic Controller Circuit", status: "Passed" },
              ],
              serviceTotal: 500,
              warrantyExpiryDate: new Date(Date.now() + 180 * 86400000).toISOString().split("T")[0],
              warrantyCertificateId: `VELS-WRN-${localMatched.id.replace("VELS-", "")}-2026`,
            },
          });
          setExpandedStep(2);
        } else {
          setSearchError(data.message || `No service ticket found for "${q}". Please check your Tracking ID or Mobile number.`);
          setTrackedBooking(null);
        }
      }
    } catch (err) {
      console.warn("Tracking fetch error, using local fallback:", err);
    } finally {
      setIsSearching(false);
    }
  };

  // Perform initial search on modal open & live polling interval
  useEffect(() => {
    if (isOpen) {
      if (initialTrackingId) {
        setSearchQuery(initialTrackingId);
        handleTrackBooking(initialTrackingId);
      } else if (!trackedBooking) {
        handleTrackBooking("VELS-84920");
      }

      // Real-time live status heartbeat (polls every 8 seconds when active in customer mode)
      const pollInterval = setInterval(() => {
        if (trackedBooking && activeMode === "customer" && !isSearching) {
          fetch(`/api/bookings/track/${encodeURIComponent(trackedBooking.id)}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success && data.booking) {
                setTrackedBooking(data.booking);
              }
            })
            .catch(() => {});
        }
      }, 8000);

      return () => clearInterval(pollInterval);
    }
  }, [isOpen, initialTrackingId, activeMode, trackedBooking?.id]);

  // Fetch backend bookings for owner portal
  const fetchOwnerBookings = async () => {
    setIsLoadingOwner(true);
    try {
      const res = await fetch("/api/bookings");
      const data = await res.json();
      if (data.bookings && Array.isArray(data.bookings)) {
        setBackendBookings(data.bookings);
      }
    } catch (err) {
      console.warn("Using local booking cache:", err);
    } finally {
      setIsLoadingOwner(false);
    }
  };

  // Real-time status update by Showroom Owner
  const handleUpdateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${bookingId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, pin: "212733" }),
      });
      const data = await res.json();
      if (data.success) {
        setBackendBookings((prev) =>
          prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus as any } : b))
        );
        if (trackedBooking && trackedBooking.id === bookingId) {
          setTrackedBooking(data.booking);
        }
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  // Reschedule submission
  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackedBooking) return;
    if (!rescheduleDate) {
      setRescheduleMsg("Please select a new date.");
      return;
    }

    try {
      const res = await fetch(`/api/bookings/${trackedBooking.id}/reschedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preferredDate: rescheduleDate,
          timeSlot: rescheduleSlot,
        }),
      });

      const data = await res.json();
      if (res.ok && data.booking) {
        setTrackedBooking(data.booking);
        setRescheduleMsg(`Successfully rescheduled to ${rescheduleDate} (${rescheduleSlot})!`);
        setTimeout(() => {
          setIsRescheduling(false);
          setRescheduleMsg("");
        }, 3000);
      }
    } catch (err) {
      setTrackedBooking((prev) =>
        prev
          ? {
              ...prev,
              preferredDate: rescheduleDate,
              timeSlot: rescheduleSlot,
            }
          : null
      );
      setRescheduleMsg(`Updated service appointment date to ${rescheduleDate}!`);
      setTimeout(() => {
        setIsRescheduling(false);
        setRescheduleMsg("");
      }, 3000);
    }
  };

  // Strict Owner PIN submit (Protected: Only Showroom Owner)
  const handlePinSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim();
    
    // Strict Owner PIN Check: 212733
    if (cleanPin === "212733") {
      try {
        const res = await fetch("/api/owner/verify-pin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin: cleanPin }),
        });
        const data = await res.json();
        if (data.authorized || res.ok) {
          setIsAuthenticated(true);
          sessionStorage.setItem("vels_owner_auth", "true");
          setPinError("");
          fetchOwnerBookings();
          return;
        }
      } catch (err) {
        // Fallback for offline if matching strictly
        setIsAuthenticated(true);
        sessionStorage.setItem("vels_owner_auth", "true");
        setPinError("");
        fetchOwnerBookings();
        return;
      }
    }

    setPinError("Access Denied: Invalid Owner PIN. Access is strictly restricted to the authorized showroom owner.");
  };

  // Recover Owner PIN via Email, Phone, or Master Key
  const handleRecoverPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRecovering(true);
    setRecoveryError("");
    setRecoverySuccessMsg("");
    setRecoveredPin(null);

    const payload = recoveryMethod === "identifier"
      ? { identifier: recoveryIdentifier }
      : { recoveryKey: recoveryKey };

    try {
      const res = await fetch("/api/owner/recover-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success && data.currentPin) {
        setRecoveredPin(data.currentPin);
        setRecoverySuccessMsg(data.message || "Identity verified!");
      } else {
        // Local validation fallback
        const cleanId = recoveryIdentifier.trim().toLowerCase().replace(/[\s\-\+\(\)]/g, "");
        const cleanKey = recoveryKey.trim();
        if (
          cleanId === "prajansuresh333@gmail.com" ||
          cleanId === "velshomeappliances@gmail.com" ||
          cleanId.includes("9344487400") ||
          cleanKey === "VELSHA2733" ||
          cleanKey === "212733"
        ) {
          setRecoveredPin("212733");
          setRecoverySuccessMsg("Owner identity verified successfully.");
        } else {
          setRecoveryError(data.message || "Verification failed. Please enter your registered showroom owner email or mobile number.");
        }
      }
    } catch (err) {
      // Local fallback check
      const cleanId = recoveryIdentifier.trim().toLowerCase().replace(/[\s\-\+\(\)]/g, "");
      const cleanKey = recoveryKey.trim();
      if (
        cleanId === "prajansuresh333@gmail.com" ||
        cleanId === "velshomeappliances@gmail.com" ||
        cleanId.includes("9344487400") ||
        cleanKey === "VELSHA2733"
      ) {
        setRecoveredPin("212733");
        setRecoverySuccessMsg("Owner identity verified successfully.");
      } else {
        setRecoveryError("Verification failed. Please check your registered owner email or mobile number.");
      }
    } finally {
      setIsRecovering(false);
    }
  };

  // Auto-fill recovered PIN and instantly authenticate
  const handleAutoFillAndAuthenticate = async () => {
    if (!recoveredPin) return;
    setPinInput(recoveredPin);
    setIsForgotPinOpen(false);
    setIsAuthenticated(true);
    sessionStorage.setItem("vels_owner_auth", "true");
    setPinError("");
    fetchOwnerBookings();
  };

  const handleOwnerLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("vels_owner_auth");
    setPinInput("");
    setActiveMode("customer");
  };

  // Download single ticket excel receipt
  const handleDownloadSingleExcel = (bookingId: string) => {
    const link = document.createElement("a");
    link.href = `/api/bookings/export-excel?id=${encodeURIComponent(bookingId)}`;
    link.download = `VELS_Work_Order_${bookingId}.xlsx`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // Master Excel export
  const handleDownloadMasterExcel = async () => {
    setIsExporting(true);
    setExportSuccessMsg("");
    try {
      const response = await fetch("/api/bookings/export-excel");
      if (!response.ok) throw new Error("Failed to download Excel file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const todayStr = new Date().toISOString().split("T")[0];
      link.setAttribute("download", `VELS_Master_Bookings_Report_${todayStr}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setExportSuccessMsg("Master Excel report exported successfully!");
      setTimeout(() => setExportSuccessMsg(""), 5000);
    } catch (err) {
      window.location.href = "/api/bookings/export-excel";
    } finally {
      setIsExporting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-hero-up overflow-y-auto">
      <div className="glass-panel w-full max-w-5xl rounded-3xl overflow-hidden border border-cyan-500/30 p-4 sm:p-7 relative shadow-[0_20px_70px_rgba(0,0,0,0.9)] my-auto max-h-[94vh] flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              <Truck className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope']">
                  {activeMode === "customer" ? "Live Service Order & Dispatch Tracker" : "Website Owner Register (Excel Outputs)"}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-Time GPS</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {activeMode === "customer"
                  ? "Enter your Tracking ID or Mobile Number to check real-time arrival status, assigned technician, and warranty."
                  : "Private backend portal to view customer tickets and download Excel spreadsheets."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mode Switcher */}
            <button
              onClick={() => {
                if (activeMode === "customer") {
                  setActiveMode("owner");
                  if (isAuthenticated) fetchOwnerBookings();
                } else {
                  setActiveMode("customer");
                }
              }}
              className={`p-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                activeMode === "owner"
                  ? "bg-emerald-500/20 border-emerald-400/40 text-emerald-300"
                  : "bg-white/5 border-white/10 hover:bg-white/10 text-slate-400 hover:text-white"
              }`}
              title={activeMode === "customer" ? "Switch to Website Owner Portal" : "Switch to Live Customer Tracker"}
            >
              {activeMode === "customer" ? (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Owner Portal</span>
                </>
              ) : (
                <>
                  <Truck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Live Tracker</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CUSTOMER LIVE TRACKER VIEW */}
        {/* ======================================================== */}
        {activeMode === "customer" && (
          <div className="flex-1 overflow-y-auto pt-4 space-y-5 pr-1">
            
            {/* Search Box & Quick Sample Chips */}
            <div className="space-y-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleTrackBooking();
                }}
                className="flex flex-col sm:flex-row gap-2"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter Tracking ID (e.g. VELS-84920) or 10-Digit Mobile Number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs sm:text-sm font-mono text-white placeholder:text-slate-500 focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSearching}
                  id="track-submit-btn"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSearching ? (
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>Track Status</span>
                </button>
              </form>

              {/* Quick Sample Lookup Pills */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                <span className="text-slate-400 font-semibold mr-1">Quick Sample Lookups:</span>
                {quickDemoIds.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSearchQuery(item.id);
                      handleTrackBooking(item.id);
                    }}
                    className={`px-2.5 py-1 rounded-lg border font-mono transition-all cursor-pointer ${
                      searchQuery.toUpperCase() === item.id
                        ? "bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold"
                        : "bg-white/[0.03] border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-white"
                    }`}
                  >
                    <span className="font-bold text-white">{item.id}</span>
                    <span className="text-slate-400 ml-1">({item.status})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Error state if any */}
            {searchError && (
              <div className="p-4 rounded-2xl bg-rose-950/50 border border-rose-500/40 text-xs text-rose-200 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <div className="flex-1">
                  <div className="font-bold">Tracking Record Not Found</div>
                  <div className="text-[11px] text-rose-300">{searchError}</div>
                </div>
              </div>
            )}

            {/* Active Tracked Ticket Details */}
            {trackedBooking && (
              <div className="space-y-5 animate-hero-up">
                
                {/* 1. Main Order Summary Banner */}
                <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-r from-blue-950/70 via-slate-900/90 to-cyan-950/70 border border-cyan-500/40 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-lg">
                          TRACKING ID: {trackedBooking.id}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          Booked on: {new Date(trackedBooking.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-black text-white font-['Manrope'] mt-1">
                        {trackedBooking.applianceType}
                      </h4>
                      <p className="text-xs text-cyan-300/90 font-medium">
                        {trackedBooking.serviceRequired}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-xl uppercase tracking-wider border shadow-sm ${
                          trackedBooking.status === "Confirmed"
                            ? "bg-sky-500/20 border-sky-400 text-sky-300"
                            : trackedBooking.status === "Technician Assigned"
                            ? "bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse"
                            : trackedBooking.status === "In Progress"
                            ? "bg-blue-500/20 border-blue-400 text-blue-300"
                            : trackedBooking.status === "Completed"
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                            : "bg-rose-500/20 border-rose-400 text-rose-300"
                        }`}
                      >
                        ● {trackedBooking.status}
                      </span>

                      {/* Download Single Excel Receipt */}
                      <button
                        onClick={() => handleDownloadSingleExcel(trackedBooking.id)}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                        title="Download Job Card Receipt in Excel (.xlsx)"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="hidden sm:inline">Excel Job Card</span>
                      </button>
                    </div>
                  </div>

                  {/* Key Tracking Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Customer:</span>
                      <span className="font-extrabold text-white truncate block">{trackedBooking.customerName}</span>
                      <span className="font-mono text-[11px] text-cyan-400">{trackedBooking.mobile}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Scheduled Window:</span>
                      <span className="font-extrabold text-white block">{trackedBooking.preferredDate}</span>
                      <span className="text-[11px] text-slate-300 truncate block">{trackedBooking.timeSlot}</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Visiting & Inspection Rate:</span>
                      <span className="font-extrabold font-mono text-emerald-400 text-sm block">₹{COMPANY_DETAILS.fixedCharge}.00</span>
                      <span className="text-[10px] text-slate-400">Fixed rate (Pay after visit)</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block">Doorstep Verification OTP:</span>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono font-black text-amber-300 text-base tracking-widest bg-amber-950/60 px-2 py-0.5 rounded-lg border border-amber-500/40">
                          {trackedBooking.technician?.verifiedOtpCode || "7492"}
                        </span>
                        <span className="text-[10px] text-slate-400">Share with engineer</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. ASSIGNED TECHNICIAN & LIVE ROUTE CARD */}
                {trackedBooking.technician && (
                  <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.03] border border-cyan-500/30 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    <div className="md:col-span-7 flex items-center gap-3.5">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-md">
                          <img
                            src={trackedBooking.technician.photo || "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80"}
                            alt={trackedBooking.technician.name}
                            className="w-full h-full object-cover rounded-[14px]"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-extrabold text-white text-sm sm:text-base">
                            {trackedBooking.technician.name}
                          </h5>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold">
                            ★ {trackedBooking.technician.rating} ({trackedBooking.technician.totalJobs}+ Jobs)
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {trackedBooking.technician.experience} • <span className="text-cyan-300">{trackedBooking.technician.specialty}</span>
                        </p>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-1">
                          <span className="font-mono text-white bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
                            Van: {trackedBooking.technician.vanRegNumber}
                          </span>
                          <span>•</span>
                          <span className="text-amber-300 font-medium">
                            Live Hub: {trackedBooking.technician.currentLocation}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="md:col-span-5 flex flex-wrap sm:flex-nowrap items-center gap-2 justify-end">
                      <a
                        href={`tel:${trackedBooking.technician.phone.replace(/\s+/g, "")}`}
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call Technician</span>
                      </a>

                      <a
                        href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS,%20tracking%20update%20for%20ticket%20${trackedBooking.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Live WhatsApp</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* 3. 6-STAGE INTERACTIVE TRACKING STEPPER */}
                <div className="p-4 sm:p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2 font-mono">
                      <Clock className="w-4 h-4 text-cyan-400" />
                      <span>Live Service Progress Timeline</span>
                    </h5>
                    <span className="text-xs text-cyan-300 font-mono">
                      Current: {trackedBooking.liveStatusText}
                    </span>
                  </div>

                  {/* Stage Stepper List */}
                  <div className="relative pl-6 sm:pl-8 space-y-5 before:content-[''] before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-cyan-400 before:via-blue-500 before:to-white/10">
                    {trackedBooking.stages?.map((stage) => {
                      const isExpanded = expandedStep === stage.step;
                      return (
                        <div key={stage.step} className="relative group">
                          {/* Circle indicator */}
                          <div
                            className={`absolute -left-6 sm:-left-8 top-0.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                              stage.completed
                                ? "bg-cyan-400 border-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.6)]"
                                : stage.active
                                ? "bg-slate-950 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.8)] animate-pulse"
                                : "bg-slate-900 border-white/20 text-slate-500"
                            }`}
                          >
                            {stage.completed ? (
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                            ) : (
                              stage.step
                            )}
                          </div>

                          {/* Stage Content Card */}
                          <div
                            onClick={() => setExpandedStep(isExpanded ? null : stage.step)}
                            className={`p-3.5 sm:p-4 rounded-2xl transition-all border cursor-pointer ${
                              stage.active
                                ? "bg-cyan-950/40 border-cyan-400 shadow-md"
                                : stage.completed
                                ? "bg-white/[0.03] border-white/10 hover:border-cyan-500/30"
                                : "bg-white/[0.01] border-white/5 opacity-60"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs sm:text-sm font-extrabold text-white">
                                    Stage {stage.step}: {stage.title}
                                  </span>
                                  {stage.active && (
                                    <span className="px-2 py-0.5 rounded-full bg-cyan-400 text-slate-950 font-mono text-[9px] font-black uppercase">
                                      Active Now
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                                  {stage.description}
                                </p>
                              </div>

                              <div className="text-right shrink-0">
                                <span className="font-mono text-[11px] text-cyan-300 font-semibold block">
                                  {stage.time}
                                </span>
                                <span className="text-[10px] text-slate-500">
                                  {isExpanded ? "Hide details ▲" : "View details ▼"}
                                </span>
                              </div>
                            </div>

                            {/* Expandable Step Details */}
                            {isExpanded && stage.details && stage.details.length > 0 && (
                              <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] animate-hero-up">
                                {stage.details.map((detail, idx) => (
                                  <div
                                    key={idx}
                                    className="p-2 rounded-xl bg-black/40 border border-white/5 text-slate-300 flex items-center gap-2"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                                    <span>{detail}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 4. DIGITAL SERVICE JOB CARD & 180-DAY WARRANTY CARD */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Job Card & Multi-Point Checklist */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-white/[0.03] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Doorstep Quality Inspection Audit</span>
                      </span>
                      <span className="text-[11px] text-emerald-300 font-bold">100% Certified</span>
                    </div>

                    <div className="space-y-1.5">
                      {trackedBooking.jobCard?.diagnosticChecklist.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2 rounded-xl bg-black/30 border border-white/5 text-xs"
                        >
                          <span className="text-slate-300">{item.item}</span>
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
                            ✓ {item.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between text-xs border-t border-white/10">
                      <span className="text-slate-400">Total Fixed Visit Fee:</span>
                      <span className="font-mono font-extrabold text-emerald-400 text-sm">
                        ₹{COMPANY_DETAILS.fixedCharge}.00
                      </span>
                    </div>
                  </div>

                  {/* 180-Day Guarantee Certificate */}
                  <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-emerald-950/40 to-slate-900/80 border border-emerald-500/40 space-y-3 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
                      <QrCode className="w-24 h-24 text-emerald-400" />
                    </div>

                    <div className="flex items-center justify-between relative z-10">
                      <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Official 180-Day Warranty Certificate</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-mono text-[10px] font-bold">
                        VERIFIED
                      </span>
                    </div>

                    <div className="space-y-2 text-xs relative z-10">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Certificate ID:</span>
                        <span className="font-mono font-bold text-white">
                          {trackedBooking.jobCard?.warrantyCertificateId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Warranty Coverage:</span>
                        <span className="font-bold text-emerald-300">
                          6 Months Free Revisit & Part Replacement
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Expiry Date:</span>
                        <span className="font-mono text-slate-200">
                          {trackedBooking.jobCard?.warrantyExpiryDate}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Authorized Hub:</span>
                        <span className="text-slate-200">Avinashi Central Hub, Mangalam Road</span>
                      </div>
                    </div>

                    <div className="pt-2 relative z-10 flex gap-2">
                      <button
                        onClick={() => handleDownloadSingleExcel(trackedBooking.id)}
                        className="w-full py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Warranty Receipt (.xlsx)</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* 5. INTERACTIVE ACTIONS: Reschedule / Book Another */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold text-white block">Need to change date or timing?</span>
                    <span className="text-[11px] text-slate-400">
                      You can modify your appointment slot without any cancellation fee.
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsRescheduling(!isRescheduling)}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isRescheduling ? "Close Form" : "Reschedule Appointment"}</span>
                    </button>

                    {onOpenBooking && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenBooking();
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <span>Book Another Appliance</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline Reschedule Form */}
                {isRescheduling && (
                  <form
                    onSubmit={handleRescheduleSubmit}
                    className="p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/40 space-y-3 animate-hero-up"
                  >
                    <div className="font-bold text-white text-xs uppercase tracking-wider">
                      Select New Service Date & Window
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
                          New Date:
                        </label>
                        <input
                          type="date"
                          required
                          value={rescheduleDate}
                          onChange={(e) => setRescheduleDate(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] text-slate-400 font-bold uppercase mb-1">
                          Time Window:
                        </label>
                        <select
                          value={rescheduleSlot}
                          onChange={(e) => setRescheduleSlot(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-input text-xs text-white bg-slate-900"
                        >
                          <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                          <option value="Afternoon (12:00 PM - 03:00 PM)">Afternoon (12:00 PM - 03:00 PM)</option>
                          <option value="Evening (03:00 PM - 06:00 PM)">Evening (03:00 PM - 06:00 PM)</option>
                          <option value="Night / Express (06:00 PM - 09:00 PM)">Night / Express (06:00 PM - 09:00 PM)</option>
                        </select>
                      </div>
                    </div>

                    {rescheduleMsg && (
                      <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{rescheduleMsg}</span>
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setIsRescheduling(false)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-1.5 rounded-lg bg-cyan-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow"
                      >
                        Save New Time
                      </button>
                    </div>
                  </form>
                )}

              </div>
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* WEBSITE OWNER PORTAL VIEW (WITH PIN AUTH & EXCEL EXPORTS) */}
        {/* ======================================================== */}
        {activeMode === "owner" && (
          <div className="flex-1 overflow-y-auto pt-4 space-y-4 pr-1">
            {!isAuthenticated ? (
              <div className="py-10 px-4 max-w-md mx-auto text-center space-y-5">
                <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Lock className="w-8 h-8" />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-white font-['Manrope']">
                    Authorized Showroom Owner Access
                  </h4>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                    This portal is strictly protected and restricted to the showroom owner to manage live dispatch stages and export master booking records to Excel (.xlsx).
                  </p>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                        Showroom Owner Security PIN
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setIsForgotPinOpen(true);
                          setRecoveryError("");
                          setRecoveredPin(null);
                          setRecoverySuccessMsg("");
                        }}
                        className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>Forgot PIN?</span>
                      </button>
                    </div>

                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="Enter 6-Digit Owner PIN"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm font-mono tracking-widest text-white text-center"
                        autoFocus
                        maxLength={10}
                      />
                    </div>
                    {pinError && (
                      <div className="mt-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 space-y-1">
                        <p className="font-semibold flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                          <span>{pinError}</span>
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            setIsForgotPinOpen(true);
                            setRecoveryError("");
                            setRecoveredPin(null);
                          }}
                          className="text-[11px] text-emerald-400 hover:underline font-bold pl-5 block cursor-pointer"
                        >
                          → Click here to recover Owner Security PIN
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4" />
                      <span>Authenticate & Open Owner Register</span>
                    </button>
                  </div>
                </form>

                {/* Forgot PIN Recovery Card / Modal */}
                {isForgotPinOpen && (
                  <div className="mt-4 p-5 rounded-2xl bg-slate-900/95 border border-emerald-500/40 shadow-2xl text-left space-y-4 animate-hero-up">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                          <ShieldCheck className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-sm font-bold text-white">Owner Security PIN Recovery</h5>
                          <p className="text-[10px] text-slate-400">Verify your registered showroom identity to retrieve the PIN</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsForgotPinOpen(false)}
                        className="p-1 rounded-lg text-slate-400 hover:text-white bg-white/5 hover:bg-white/10"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-xl border border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={() => setRecoveryMethod("identifier")}
                        className={`py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                          recoveryMethod === "identifier"
                            ? "bg-emerald-500 text-slate-950 shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email or Mobile</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setRecoveryMethod("masterKey")}
                        className={`py-1.5 px-3 rounded-lg font-bold transition-all flex items-center justify-center gap-1.5 ${
                          recoveryMethod === "masterKey"
                            ? "bg-emerald-500 text-slate-950 shadow-md"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        <Key className="w-3.5 h-3.5" />
                        <span>Master Key</span>
                      </button>
                    </div>

                    {/* Recovery Form */}
                    <form onSubmit={handleRecoverPin} className="space-y-3">
                      {recoveryMethod === "identifier" ? (
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">
                            Registered Showroom Owner Email or Mobile:
                          </label>
                          <div className="relative">
                            <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="text"
                              placeholder="Enter your registered owner email or 10-digit mobile"
                              value={recoveryIdentifier}
                              onChange={(e) => setRecoveryIdentifier(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs text-white"
                              autoFocus
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-[11px] font-bold text-slate-300 mb-1">
                            Showroom Master Recovery Security Key:
                          </label>
                          <div className="relative">
                            <Key className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="password"
                              placeholder="Enter Master Recovery Security Key"
                              value={recoveryKey}
                              onChange={(e) => setRecoveryKey(e.target.value)}
                              className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs font-mono text-white"
                              autoFocus
                            />
                          </div>
                        </div>
                      )}

                      {recoveryError && (
                        <p className="text-xs text-rose-400 font-semibold flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{recoveryError}</span>
                        </p>
                      )}

                      {!recoveredPin ? (
                        <div className="pt-1">
                          <button
                            type="submit"
                            disabled={isRecovering}
                            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            <span>{isRecovering ? "Verifying Credentials..." : "Verify & Retrieve Owner PIN"}</span>
                          </button>
                        </div>
                      ) : null}
                    </form>

                    {/* Recovered PIN Display Box */}
                    {recoveredPin && (
                      <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-400/60 text-center space-y-2.5 animate-hero-up shadow-lg">
                        <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Identity Verified!</span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] text-slate-300">Your Active Showroom Owner Security PIN is:</p>
                          <div className="inline-block px-5 py-2 rounded-xl bg-black/60 border border-emerald-400 font-mono font-black text-2xl text-emerald-300 tracking-widest">
                            {recoveredPin}
                          </div>
                        </div>
                        <div className="flex gap-2 pt-1">
                          <button
                            type="button"
                            onClick={handleAutoFillAndAuthenticate}
                            className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                          >
                            <Lock className="w-3.5 h-3.5" />
                            <span>Auto-Fill PIN & Unlock Register</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Owner Control Actions Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      Master Service Bookings: <strong className="text-emerald-400 font-mono">{backendBookings.length}</strong>
                    </span>
                    <button
                      onClick={fetchOwnerBookings}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                      title="Refresh Bookings in Real-Time"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${isLoadingOwner ? "animate-spin text-emerald-400" : ""}`} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleDownloadMasterExcel}
                      disabled={isExporting}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{isExporting ? "Generating Excel..." : "Export All to Excel (.xlsx)"}</span>
                    </button>

                    <button
                      onClick={handleOwnerLogout}
                      className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-rose-400 transition-colors"
                      title="Lock Owner Portal"
                    >
                      <LogOut className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {exportSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{exportSuccessMsg}</span>
                  </div>
                )}

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search bookings by name, mobile, ID, address..."
                      value={ownerSearchQuery}
                      onChange={(e) => setOwnerSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl glass-input text-xs text-white"
                    />
                  </div>

                  <select
                    value={ownerStatusFilter}
                    onChange={(e) => setOwnerStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl glass-input text-xs text-white bg-slate-900"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Technician Assigned">Technician Assigned</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Owner Bookings Table with Live Status Controls */}
                <div className="space-y-2.5">
                  {backendBookings
                    .filter((b) => {
                      const matchesStatus = ownerStatusFilter === "All" || b.status === ownerStatusFilter;
                      const q = ownerSearchQuery.toLowerCase().trim();
                      const matchesQuery =
                        !q ||
                        b.id.toLowerCase().includes(q) ||
                        b.customerName.toLowerCase().includes(q) ||
                        b.mobile.toLowerCase().includes(q) ||
                        b.applianceType.toLowerCase().includes(q);
                      return matchesStatus && matchesQuery;
                    })
                    .map((b) => (
                      <div
                        key={b.id}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            {b.id}
                          </span>
                          <div>
                            <span className="font-bold text-white block">{b.customerName}</span>
                            <span className="text-[11px] text-cyan-300 font-mono">{b.mobile}</span>
                          </div>
                        </div>

                        <div className="hidden sm:block text-slate-300">
                          <span className="font-medium block">{b.applianceType}</span>
                          <span className="text-[10px] text-slate-400">{b.preferredDate} ({b.timeSlot})</span>
                        </div>

                        {/* Live Dispatch Status Control Dropdown */}
                        <div className="flex items-center gap-2">
                          <select
                            value={b.status}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-900 border border-white/20 text-cyan-300 cursor-pointer"
                            title="Change Dispatch Stage in Real-Time"
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Technician Assigned">Tech Assigned</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleDownloadSingleExcel(b.id)}
                            className="p-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900 transition-colors"
                            title="Download Work Order (.xlsx)"
                          >
                            <FileSpreadsheet className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setActiveMode("customer");
                              setSearchQuery(b.id);
                              handleTrackBooking(b.id);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold text-[10px] transition-all cursor-pointer"
                          >
                            Track Live
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
