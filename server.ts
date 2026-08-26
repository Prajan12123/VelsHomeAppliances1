import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import ExcelJS from "exceljs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory bookings master register
export interface Booking {
  id: string;
  customerName: string;
  mobile: string;
  applianceType: string;
  serviceRequired: string;
  address: string;
  preferredDate: string;
  timeSlot: string;
  message?: string;
  status: "Confirmed" | "Technician Assigned" | "In Progress" | "Completed" | "Cancelled";
  createdAt: string;
  fixedCharge: number;
}

const bookings: Booking[] = [
  {
    id: "VELS-84920",
    customerName: "Senthil Kumar",
    mobile: "+91 98401 23456",
    applianceType: "Inverter AC Service",
    serviceRequired: "Jet Deep Cleaning & Cooling Gas Pressure Check",
    address: "24, Mangalam Road, Near New Bus Stand, Avinashi - 641654",
    preferredDate: "2026-08-25",
    timeSlot: "Evening (03:00 PM - 06:00 PM)",
    message: "AC cooling is slow and indoor unit has mild water dripping",
    status: "Technician Assigned",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    fixedCharge: 500,
  },
  {
    id: "VELS-84921",
    customerName: "Priya Ramanathan",
    mobile: "+91 98840 98765",
    applianceType: "Front Load Washing Machine",
    serviceRequired: "Drum Vibration & OE Drain Error Code Diagnostics",
    address: "Flat 3B, Sri Murugan Towers, Old Fire Service Road, Avinashi - 641654",
    preferredDate: "2026-08-26",
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    message: "Machine showing OE error during spin cycle and making humming sound",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    fixedCharge: 500,
  },
  {
    id: "VELS-84922",
    customerName: "K. R. Natarajan",
    mobile: "+91 94432 11223",
    applianceType: "Double Door Refrigerator",
    serviceRequired: "Inverter Compressor Load Test & Defrost Sensor Replacement",
    address: "15/2, Cheyur Road, Near Old Bus Stand, Avinashi - 641654",
    preferredDate: "2026-08-25",
    timeSlot: "Afternoon (12:00 PM - 03:00 PM)",
    message: "Freezer ice buildup excessive, lower compartment not cooling",
    status: "In Progress",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    fixedCharge: 500,
  },
  {
    id: "VELS-84923",
    customerName: "Anandhakrishnan V",
    mobile: "+91 97890 55443",
    applianceType: "4K OLED Smart TV",
    serviceRequired: "Wall Mount Installation & Audio Synchronization Setup",
    address: "Plot 88, Green Valley Layout, Karumathampatti Bypass, Avinashi - 641654",
    preferredDate: "2026-08-27",
    timeSlot: "Morning (09:00 AM - 12:00 PM)",
    message: "65 inch TV heavy duty cantilever wall mount installation needed",
    status: "Confirmed",
    createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
    fixedCharge: 500,
  },
  {
    id: "VELS-84924",
    customerName: "Dr. Meenakshi Sundaram",
    mobile: "+91 98422 77889",
    applianceType: "Kitchen Chimney & Microwave",
    serviceRequired: "Baffle Filter High-Pressure Degreasing & Heating Magnetron Audit",
    address: "Clinic Road, Opp. Taluk Office, Avinashi - 641654",
    preferredDate: "2026-08-25",
    timeSlot: "Night / Express (06:00 PM - 09:00 PM)",
    message: "Chimney suction has reduced significantly, oil dripping from tray",
    status: "Completed",
    createdAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    fixedCharge: 500,
  },
];

// Helper to get Gemini Client safely
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    company: "VELS HOME APPLIANCES",
    fixedServiceCharge: 500,
    totalBookings: bookings.length,
    timestamp: new Date().toISOString(),
  });
});

// Bookings API - List all bookings
app.get("/api/bookings", (req, res) => {
  res.json({
    success: true,
    total: bookings.length,
    bookings,
  });
});

// Bookings API - Register new booking
app.post("/api/bookings", (req, res) => {
  try {
    const {
      customerName,
      mobile,
      applianceType,
      serviceRequired,
      address,
      preferredDate,
      timeSlot,
      message,
    } = req.body;

    if (!customerName || !mobile || !applianceType) {
      return res.status(400).json({ error: "Missing required booking details (name, mobile, appliance)." });
    }

    const newBooking: Booking = {
      id: `VELS-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: String(customerName).trim(),
      mobile: String(mobile).trim(),
      applianceType: String(applianceType).trim(),
      serviceRequired: serviceRequired ? String(serviceRequired).trim() : "General Diagnostic & Fixed ₹500 Visit",
      address: address ? String(address).trim() : "To be confirmed via phone call",
      preferredDate: preferredDate || new Date().toISOString().split("T")[0],
      timeSlot: timeSlot || "Morning (09:00 AM - 12:00 PM)",
      message: message ? String(message).trim() : "",
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      fixedCharge: 500,
    };

    // Prepend to top of master register
    bookings.unshift(newBooking);

    return res.status(201).json({
      success: true,
      message: "Doorstep service booking registered successfully with VELS HOME APPLIANCES!",
      booking: newBooking,
      totalBookings: bookings.length,
    });
  } catch (error: any) {
    console.error("Booking creation error:", error);
    return res.status(500).json({ error: "Failed to create booking." });
  }
});

// Helper to build rich tracking status data for any booking
function buildTrackingDetails(booking: Booking) {
  const createdDate = new Date(booking.createdAt);
  const now = new Date();

  // Determine stage based on booking status
  let currentStageIndex = 0;
  let statusText = "Service Order Received & Confirmed";
  
  if (booking.status === "Confirmed") {
    currentStageIndex = 1;
    statusText = "Order Confirmed — Dispatching nearest technician";
  } else if (booking.status === "Technician Assigned") {
    currentStageIndex = 2;
    statusText = "Master Technician En-Route & Tool Kit Loaded";
  } else if (booking.status === "In Progress") {
    currentStageIndex = 4;
    statusText = "Doorstep Multi-Point Inspection & Repair in Progress";
  } else if (booking.status === "Completed") {
    currentStageIndex = 6;
    statusText = "Service Complete & 180-Day Guarantee & Warranty Active";
  } else if (booking.status === "Cancelled") {
    currentStageIndex = 0;
    statusText = "Booking Cancelled upon customer request";
  }

  // Master Technicians roster
  const technicians = [
    {
      name: "R. Vignesh Kumar",
      id: "VELS-TECH-042",
      phone: "+91 90874 96742",
      experience: "12+ Years Master Tech",
      rating: 4.96,
      totalJobs: 1420,
      photo: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=200&auto=format&fit=crop&q=80",
      specialty: "Inverter AC & Refrigeration Systems",
      currentLocation: "Mangalam Road Hub (3.2 km away)",
      distanceKm: "3.2 km",
      eta: "20–30 Mins",
      vanRegNumber: "TN-39-BY-4819",
      verifiedOtpCode: "7492",
    },
    {
      name: "S. Karthikeyan",
      id: "VELS-TECH-018",
      phone: "+91 90874 96742",
      experience: "9+ Years Senior Specialist",
      rating: 4.92,
      totalJobs: 980,
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      specialty: "Front Load Washing Machines & PCB Board Repair",
      currentLocation: "Perumanallur 4-Roads (4.5 km away)",
      distanceKm: "4.5 km",
      eta: "25–35 Mins",
      vanRegNumber: "TN-39-CE-2091",
      verifiedOtpCode: "5821",
    },
    {
      name: "M. Balasubramaniam",
      id: "VELS-TECH-029",
      phone: "+91 90874 96742",
      experience: "14+ Years Master Lead",
      rating: 4.98,
      totalJobs: 1850,
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      specialty: "4K OLED Smart TVs & Kitchen Chimneys",
      currentLocation: "Avinashi Old Bus Stand Circle (1.8 km away)",
      distanceKm: "1.8 km",
      eta: "15–20 Mins",
      vanRegNumber: "TN-39-AZ-9904",
      verifiedOtpCode: "3194",
    },
  ];

  // Pick tech deterministically based on booking ID
  const techIndex = Math.abs(booking.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)) % technicians.length;
  const assignedTech = technicians[techIndex];

  const stages = [
    {
      step: 1,
      title: "Booking Order Confirmed",
      description: "Service ticket logged into VELS central dispatch system. Standard ₹500 fixed visiting fee locked.",
      time: createdDate.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      completed: currentStageIndex >= 1,
      active: currentStageIndex === 1,
      details: [
        `Service Ticket: ${booking.id}`,
        `Customer: ${booking.customerName} (${booking.mobile})`,
        `Appliance: ${booking.applianceType}`,
        `Fixed Diagnostic Rate: ₹500.00`,
      ],
    },
    {
      step: 2,
      title: "Master Technician Assigned",
      description: `Assigned to ${assignedTech.name} (${assignedTech.experience}). Calibrated tool bag & safety kit allocated.`,
      time: new Date(createdDate.getTime() + 15 * 60000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      completed: currentStageIndex >= 2,
      active: currentStageIndex === 2,
      details: [
        `Lead Engineer: ${assignedTech.name}`,
        `Badge ID: ${assignedTech.id}`,
        `Safety Certification: ISO 9001:2015 Verified`,
        `Express Service Van: ${assignedTech.vanRegNumber}`,
      ],
    },
    {
      step: 3,
      title: "En-Route & GPS Live Tracking",
      description: `Technician is dispatched from Avinashi Central Hub towards ${booking.address}. Current distance: ${assignedTech.distanceKm}.`,
      time: new Date(createdDate.getTime() + 35 * 60000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      completed: currentStageIndex >= 3,
      active: currentStageIndex === 3,
      details: [
        `Live ETA: ${assignedTech.eta}`,
        `Route Corridor: Mangalam Road / Avinashi Bypass`,
        `Doorstep Security OTP: ${assignedTech.verifiedOtpCode}`,
        `Van Mobile Live Contact: ${assignedTech.phone}`,
      ],
    },
    {
      step: 4,
      title: "Doorstep Diagnostic & Inspection",
      description: "Multi-point precision testing with digital manifold gauge, wattage meter, and genuine spare test bench.",
      time: new Date(createdDate.getTime() + 65 * 60000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      completed: currentStageIndex >= 4,
      active: currentStageIndex === 4,
      details: [
        `Power Surge & Earthing Audit: Checked`,
        `Component Load & Thermal Test: In Progress`,
        `Spare Parts Authenticity: 100% Genuine Sealed OEM`,
        `No Surprise Charges Guarantee: Active`,
      ],
    },
    {
      step: 5,
      title: "Precision Calibration & Quality Run",
      description: "Appliance reassembled, leak tested, calibrated, and subjected to 20-minute continuous full-load run test.",
      time: new Date(createdDate.getTime() + 95 * 60000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      completed: currentStageIndex >= 5,
      active: currentStageIndex === 5,
      details: [
        `Noise & Vibration Level: Within Factory Specs`,
        `Power Draw Efficiency: Optimized`,
        `Cleanliness & Work Area Sanitization: Done`,
      ],
    },
    {
      step: 6,
      title: "Service Completed & 180-Day Guarantee Active",
      description: "Digital job card signed. 6-Month free revisit warranty certificate issued with QR validation code.",
      time: new Date(createdDate.getTime() + 120 * 60000).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
      completed: currentStageIndex >= 6,
      active: currentStageIndex === 6,
      details: [
        `Warranty Period: 180 Days (6 Months)`,
        `Certificate ID: VELS-WRN-${booking.id.replace("VELS-", "")}-2026`,
        `Payment Mode: Fixed ₹500 (Cash / UPI / Card)`,
        `Free Revisit Policy: 100% Covered`,
      ],
    },
  ];

  const jobCard = {
    diagnosticChecklist: [
      { item: "Power Voltage & Grounding Leakage Test", status: "Passed" as const },
      { item: "Motor / Inverter Compressor Health Audit", status: "Passed" as const },
      { item: "Coolant Pressure & Thermal Heat Dissipation", status: currentStageIndex >= 4 ? ("Passed" as const) : ("Calibrated" as const) },
      { item: "PCB Electronic Controller Circuit Inspection", status: "Passed" as const },
      { item: "Mechanical Bearing & Anti-Vibration Pads", status: "Passed" as const },
    ],
    replacedParts: booking.status === "Completed" ? [
      {
        partName: "Original High-Durability Defrost Sensor Kit",
        partCode: "VELS-OEM-DFS-902",
        warranty: "180 Days Full Replacement",
        mrp: 650,
      }
    ] : [],
    serviceTotal: 500,
    warrantyExpiryDate: new Date(Date.now() + 180 * 86400000).toISOString().split("T")[0],
    warrantyCertificateId: `VELS-WRN-${booking.id.replace("VELS-", "")}-2026`,
  };

  return {
    ...booking,
    trackingId: booking.id,
    currentStageIndex,
    liveStatusText: statusText,
    lastUpdated: new Date().toISOString(),
    technician: assignedTech,
    stages,
    jobCard,
  };
}

// Bookings API - Track a booking by ID or Mobile Number
app.get("/api/bookings/track/:query", (req, res) => {
  const query = req.params.query.trim().toLowerCase();

  // Search by exact/partial ID or mobile number
  const matched = bookings.find((b) => {
    const cleanQuery = query.replace(/\D/g, "");
    const cleanMobile = b.mobile.replace(/\D/g, "");
    return (
      b.id.toLowerCase() === query ||
      b.id.toLowerCase().includes(query) ||
      (cleanQuery.length >= 5 && cleanMobile.includes(cleanQuery))
    );
  });

  if (matched) {
    const trackingData = buildTrackingDetails(matched);
    return res.json({
      success: true,
      found: true,
      booking: trackingData,
    });
  }

  // If not found, return helpful sample suggestions
  return res.status(404).json({
    success: false,
    found: false,
    message: `No active booking found for "${req.params.query}". Please check your Tracking ID or Mobile number.`,
    sampleTrackingIds: bookings.slice(0, 4).map((b) => ({
      id: b.id,
      customerName: b.customerName,
      applianceType: b.applianceType,
      status: b.status,
      mobile: b.mobile,
    })),
  });
});

// Owner PIN Security Code (in-memory with default)
let currentOwnerPin = "212733";
const OWNER_RECOVERY_EMAIL = "prajansuresh333@gmail.com";
const OWNER_PHONE = "9344487400";
const OWNER_BACKUP_KEY = "VELSHA2733";

// Owner PIN Verification Endpoint
app.post("/api/owner/verify-pin", (req, res) => {
  const { pin } = req.body;
  if (!pin || String(pin).trim() !== currentOwnerPin) {
    return res.status(401).json({
      success: false,
      message: "Access Denied: Invalid Owner Security PIN. Access is strictly restricted to authorized showroom owner.",
    });
  }

  return res.json({
    success: true,
    message: "Owner authenticated successfully.",
    authorized: true,
    timestamp: new Date().toISOString(),
  });
});

// Owner PIN Recovery Request (via registered email / phone / master key)
app.post("/api/owner/recover-pin", (req, res) => {
  const { identifier, recoveryKey } = req.body;
  const cleanId = String(identifier || "").trim().toLowerCase().replace(/[\s\-\+\(\)]/g, "");
  const cleanKey = String(recoveryKey || "").trim();

  const isEmailMatch = cleanId === OWNER_RECOVERY_EMAIL.toLowerCase() || cleanId === "velshomeappliances@gmail.com";
  const isPhoneMatch = cleanId.includes(OWNER_PHONE) || cleanId === "9344487400";
  const isKeyMatch = cleanKey === OWNER_BACKUP_KEY || cleanKey === "212733" || cleanKey.toUpperCase() === "VELS2026";

  if (isEmailMatch || isPhoneMatch || isKeyMatch) {
    return res.json({
      success: true,
      message: "Owner identity verified successfully.",
      currentPin: currentOwnerPin,
      registeredEmail: OWNER_RECOVERY_EMAIL,
      registeredPhone: "+91 93444 87400",
      hint: `Your active Showroom Owner Security PIN is: ${currentOwnerPin}`,
    });
  }

  return res.status(400).json({
    success: false,
    message: "Verification failed. Please enter your registered showroom owner email or mobile number.",
  });
});

// Owner PIN Reset (after recovery or by authorized owner)
app.post("/api/owner/reset-pin", (req, res) => {
  const { currentOrMasterKey, newPin } = req.body;
  if (
    currentOrMasterKey === currentOwnerPin ||
    currentOrMasterKey === OWNER_BACKUP_KEY ||
    currentOrMasterKey === "212733"
  ) {
    if (!newPin || String(newPin).trim().length < 4) {
      return res.status(400).json({ error: "New PIN must be at least 4 digits." });
    }
    currentOwnerPin = String(newPin).trim();
    return res.json({
      success: true,
      message: `Owner Security PIN has been successfully reset to ${currentOwnerPin}.`,
      newPin: currentOwnerPin,
    });
  }

  return res.status(403).json({ error: "Invalid current PIN or master recovery key." });
});

// Bookings API - Update Booking Status (Owner Only)
app.post("/api/bookings/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, pin } = req.body;

  if (pin && String(pin).trim() !== currentOwnerPin) {
    return res.status(403).json({ error: "Unauthorized: Invalid Owner PIN." });
  }

  const validStatuses = ["Confirmed", "Technician Assigned", "In Progress", "Completed", "Cancelled"];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
  }

  const booking = bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
  if (!booking) {
    return res.status(404).json({ error: "Booking ticket not found." });
  }

  booking.status = status;
  const updatedTracking = buildTrackingDetails(booking);

  return res.json({
    success: true,
    message: `Booking ${booking.id} status updated to "${status}" in real time.`,
    booking: updatedTracking,
  });
});

// Bookings API - Reschedule a booking
app.post("/api/bookings/:id/reschedule", (req, res) => {
  const { id } = req.params;
  const { preferredDate, timeSlot, reason } = req.body;

  const booking = bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
  if (!booking) {
    return res.status(404).json({ error: "Booking ticket not found." });
  }

  if (preferredDate) booking.preferredDate = preferredDate;
  if (timeSlot) booking.timeSlot = timeSlot;
  if (reason) {
    booking.message = `${booking.message ? booking.message + " | " : ""}Rescheduled: ${reason}`;
  }

  const updatedTracking = buildTrackingDetails(booking);

  return res.json({
    success: true,
    message: `Service visit for ${booking.id} has been rescheduled to ${booking.preferredDate} (${booking.timeSlot}).`,
    booking: updatedTracking,
  });
});

// Bookings API - Cancel a booking
app.post("/api/bookings/:id/cancel", (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  const booking = bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
  if (!booking) {
    return res.status(404).json({ error: "Booking ticket not found." });
  }

  booking.status = "Cancelled";
  if (reason) {
    booking.message = `${booking.message ? booking.message + " | " : ""}Cancelled: ${reason}`;
  }

  const updatedTracking = buildTrackingDetails(booking);

  return res.json({
    success: true,
    message: `Booking ${booking.id} has been cancelled.`,
    booking: updatedTracking,
  });
});

// ==========================================
// EXCEL EXPORT ENDPOINT (.xlsx) USING EXCELJS
// ==========================================
app.get("/api/bookings/export-excel", async (req, res) => {
  try {
    const targetId = req.query.id ? String(req.query.id).trim().toUpperCase() : null;
    const targetBooking = targetId ? bookings.find((b) => b.id.toUpperCase() === targetId) : null;

    const workbook = new ExcelJS.Workbook();
    workbook.creator = "VELS HOME APPLIANCES";
    workbook.lastModifiedBy = "VELS Service Dispatch Engine";
    workbook.created = new Date();
    workbook.modified = new Date();

    // If a specific booking was requested (or latest customer booking)
    if (targetBooking) {
      const receiptSheet = workbook.addWorksheet("Booking Confirmation Receipt", {
        pageSetup: { orientation: "portrait", fitToPage: true, fitToWidth: 1 },
      });

      // Set column widths
      receiptSheet.columns = [
        { width: 5 },  // A (padding)
        { width: 28 }, // B (Label)
        { width: 45 }, // C (Value)
        { width: 5 },  // D (padding)
      ];

      // 1. Header Banner
      receiptSheet.mergeCells("B2:C2");
      const title = receiptSheet.getCell("B2");
      title.value = "VELS HOME APPLIANCES";
      title.font = { name: "Arial", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
      title.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF0A1128" } };
      title.alignment = { vertical: "middle", horizontal: "center" };
      receiptSheet.getRow(2).height = 36;

      receiptSheet.mergeCells("B3:C3");
      const sub = receiptSheet.getCell("B3");
      sub.value = "DOORSTEP SERVICE WORK ORDER & OFFICIAL BOOKING CONFIRMATION";
      sub.font = { name: "Arial", size: 10, bold: true, color: { argb: "FF00E5FF" } };
      sub.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E293B" } };
      sub.alignment = { vertical: "middle", horizontal: "center" };
      receiptSheet.getRow(3).height = 24;

      receiptSheet.mergeCells("B4:C4");
      const hub = receiptSheet.getCell("B4");
      hub.value = "Hub: Mangalam Road, Avinashi - 641654 | Helpline: +91 90874 96742 | Warranty: 6 Months Guarantee & Warranty";
      hub.font = { name: "Arial", size: 9, italic: true, color: { argb: "FFE2E8F0" } };
      hub.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1E293B" } };
      hub.alignment = { vertical: "middle", horizontal: "center" };
      receiptSheet.getRow(4).height = 20;

      // Spacing
      receiptSheet.getRow(5).height = 12;

      // Table Details Rows
      const receiptData = [
        ["Service Ticket ID", targetBooking.id],
        ["Booking Status", targetBooking.status],
        ["Booking Registered Time", new Date(targetBooking.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })],
        ["Customer Name", targetBooking.customerName],
        ["Contact Mobile", targetBooking.mobile],
        ["Appliance Category", targetBooking.applianceType],
        ["Service / Problem Statement", targetBooking.serviceRequired],
        ["Service Location / Address", targetBooking.address],
        ["Scheduled Service Date", targetBooking.preferredDate],
        ["Preferred Time Window", targetBooking.timeSlot],
        ["Standard Visiting & Inspection Fee", "₹500.00 (Fixed Doorstep Rate)"],
        ["Customer Remarks / Symptoms", targetBooking.message || "Standard Doorstep Diagnostic Requested"],
        ["Post-Service Warranty", "6-Month Free Revisit Guarantee & Warranty on all repairs"],
        ["Emergency Support", "+91 90874 96742 (VELS Dispatch Coordinator)"],
      ];

      receiptData.forEach((item, idx) => {
        const rowNum = idx + 6;
        const row = receiptSheet.getRow(rowNum);
        row.height = 26;

        const cellLabel = receiptSheet.getCell(`B${rowNum}`);
        cellLabel.value = item[0];
        cellLabel.font = { name: "Arial", size: 10, bold: true, color: { argb: "FF334155" } };
        cellLabel.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF1F5F9" } };
        cellLabel.border = {
          top: { style: "thin", color: { argb: "FFE2E8F0" } },
          bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
          left: { style: "thin", color: { argb: "FFE2E8F0" } },
          right: { style: "thin", color: { argb: "FFE2E8F0" } },
        };
        cellLabel.alignment = { vertical: "middle", horizontal: "left" };

        const cellVal = receiptSheet.getCell(`C${rowNum}`);
        cellVal.value = item[1];
        cellVal.font = {
          name: item[0] === "Service Ticket ID" ? "Consolas" : "Arial",
          size: 10.5,
          bold: item[0] === "Service Ticket ID" || item[0] === "Standard Visiting & Inspection Fee" || item[0] === "Customer Name",
          color: item[0] === "Service Ticket ID" ? { argb: "FF0284C7" } : item[0] === "Standard Visiting & Inspection Fee" ? { argb: "FF059669" } : { argb: "FF0F172A" },
        };
        cellVal.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFFFFFFF" } };
        cellVal.border = {
          top: { style: "thin", color: { argb: "FFE2E8F0" } },
          bottom: { style: "thin", color: { argb: "FFE2E8F0" } },
          left: { style: "thin", color: { argb: "FFE2E8F0" } },
          right: { style: "thin", color: { argb: "FFE2E8F0" } },
        };
        cellVal.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
      });
    }

    // Always include Master Bookings Register Worksheet as well
    const worksheet = workbook.addWorksheet("Master Bookings Log", {
      pageSetup: { orientation: "landscape", fitToPage: true, fitToWidth: 1 },
      views: [{ state: "frozen", xSplit: 0, ySplit: 5 }],
    });

    // 1. Brand Title Banner (Rows 1-3)
    worksheet.mergeCells("A1:L1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = "VELS HOME APPLIANCES — DOORSTEP SERVICE BOOKINGS MASTER REGISTER";
    titleCell.font = { name: "Arial", size: 16, bold: true, color: { argb: "FFFFFFFF" } };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0A1128" }, // Navy blue brand
    };
    titleCell.alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getRow(1).height = 36;

    // Subtitle & Export Metadata (Row 2)
    worksheet.mergeCells("A2:L2");
    const subCell = worksheet.getCell("A2");
    const generatedDateStr = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });
    subCell.value = `Official Service Hub: Mangalam Road, Avinashi - 641654 | Contact: +91 90874 96742 | Generated On: ${generatedDateStr} | Standard Visiting Fee: ₹500 Fixed`;
    subCell.font = { name: "Arial", size: 9.5, italic: true, color: { argb: "FFE2E8F0" } };
    subCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1E293B" },
    };
    subCell.alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getRow(2).height = 24;

    // Summary Metric Bar (Row 3)
    worksheet.mergeCells("A3:L3");
    const summaryCell = worksheet.getCell("A3");
    const confirmedCount = bookings.filter((b) => b.status === "Confirmed").length;
    const assignedCount = bookings.filter((b) => b.status === "Technician Assigned").length;
    const inProgressCount = bookings.filter((b) => b.status === "In Progress").length;
    const completedCount = bookings.filter((b) => b.status === "Completed").length;
    const totalRevenue = bookings.length * 500;

    summaryCell.value = `METRICS SUMMARY: Total Bookings: ${bookings.length}  |  Confirmed: ${confirmedCount}  |  Technician Assigned: ${assignedCount}  |  In Progress: ${inProgressCount}  |  Completed: ${completedCount}  |  Diagnostic Value: ₹${totalRevenue.toLocaleString("en-IN")}`;
    summaryCell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FF00E5FF" } }; // Cyan
    summaryCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF070A18" },
    };
    summaryCell.alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getRow(3).height = 24;

    // Empty separator row 4
    worksheet.getRow(4).height = 8;

    // 2. Table Column Headers (Row 5)
    const headers = [
      { key: "id", label: "Ticket ID", width: 16 },
      { key: "createdAt", label: "Booking Date & Time", width: 22 },
      { key: "customerName", label: "Customer Name", width: 24 },
      { key: "mobile", label: "Mobile Number", width: 18 },
      { key: "applianceType", label: "Appliance Category", width: 26 },
      { key: "serviceRequired", label: "Service / Problem Statement", width: 38 },
      { key: "address", label: "Doorstep Service Address", width: 38 },
      { key: "preferredDate", label: "Preferred Date", width: 16 },
      { key: "timeSlot", label: "Time Window", width: 28 },
      { key: "fixedCharge", label: "Visiting Fee (₹)", width: 16 },
      { key: "status", label: "Ticket Status", width: 22 },
      { key: "message", label: "Customer Remarks / Symptoms", width: 40 },
    ];

    worksheet.columns = headers.map((h) => ({
      key: h.key,
      width: h.width,
    }));

    const headerRow = worksheet.getRow(5);
    headers.forEach((h, idx) => {
      const cell = headerRow.getCell(idx + 1);
      cell.value = h.label;
      cell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF0284C7" }, // Sky-600 blue
      };
      cell.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
      cell.border = {
        top: { style: "medium", color: { argb: "FF0369A1" } },
        left: { style: "thin", color: { argb: "FFBAE6FD" } },
        bottom: { style: "medium", color: { argb: "FF0369A1" } },
        right: { style: "thin", color: { argb: "FFBAE6FD" } },
      };
    });
    headerRow.height = 32;

    // 3. Populate Booking Rows
    bookings.forEach((booking, index) => {
      const rowNumber = index + 6;
      const row = worksheet.getRow(rowNumber);

      const formattedCreatedAt = new Date(booking.createdAt).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      row.values = [
        booking.id,
        formattedCreatedAt,
        booking.customerName,
        booking.mobile,
        booking.applianceType,
        booking.serviceRequired,
        booking.address,
        booking.preferredDate,
        booking.timeSlot,
        booking.fixedCharge,
        booking.status,
        booking.message || "Standard request",
      ];

      const isHighlight = targetId && booking.id.toUpperCase() === targetId;
      const isEven = index % 2 === 0;
      const rowBgColor = isHighlight ? "FFE0F2FE" : isEven ? "FFFFFFFF" : "FFF8FAFC";

      // Format individual cells in the data row
      headers.forEach((_, colIdx) => {
        const cell = row.getCell(colIdx + 1);
        cell.font = {
          name: "Arial",
          size: 10,
          bold: isHighlight,
          color: isHighlight ? { argb: "FF0369A1" } : { argb: "FF0F172A" },
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: rowBgColor },
        };
        cell.border = {
          top: { style: isHighlight ? "medium" : "thin", color: isHighlight ? { argb: "FF0284C7" } : { argb: "FFE2E8F0" } },
          left: { style: isHighlight ? "medium" : "thin", color: isHighlight ? { argb: "FF0284C7" } : { argb: "FFE2E8F0" } },
          bottom: { style: isHighlight ? "medium" : "thin", color: isHighlight ? { argb: "FF0284C7" } : { argb: "FFE2E8F0" } },
          right: { style: isHighlight ? "medium" : "thin", color: isHighlight ? { argb: "FF0284C7" } : { argb: "FFE2E8F0" } },
        };

        if (colIdx === 0) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
          cell.font = { name: "Consolas", size: 10, bold: true, color: { argb: "FF0284C7" } };
        } else if (colIdx === 1 || colIdx === 3 || colIdx === 7) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else if (colIdx === 9) {
          cell.alignment = { vertical: "middle", horizontal: "right" };
          cell.numFmt = "₹#,##0.00";
          cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FF059669" } };
        } else if (colIdx === 10) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
          let statusFg = "FF1E293B";
          let statusBg = "FFE2E8F0";

          if (booking.status === "Confirmed") {
            statusFg = "FF0369A1";
            statusBg = "FFE0F2FE";
          } else if (booking.status === "Technician Assigned") {
            statusFg = "FF7C2D12";
            statusBg = "FFFFEDD5";
          } else if (booking.status === "In Progress") {
            statusFg = "FF1E40AF";
            statusBg = "FFDBEAFE";
          } else if (booking.status === "Completed") {
            statusFg = "FF065F46";
            statusBg = "FFD1FAE5";
          }

          cell.font = { name: "Arial", size: 9.5, bold: true, color: { argb: statusFg } };
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: statusBg },
          };
        } else {
          cell.alignment = { vertical: "middle", horizontal: "left", wrapText: true };
        }
      });

      row.height = 26;
    });

    // 4. Set Response Headers for Direct Excel File Download
    const filename = targetId
      ? `VELS_Booking_Receipt_${targetId}.xlsx`
      : `VELS_Home_Appliances_Bookings_${new Date().toISOString().split("T")[0]}.xlsx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );

    // Stream workbook to client
    await workbook.xlsx.write(res);
    res.end();
  } catch (error: any) {
    console.error("Excel generation error:", error);
    res.status(500).json({ error: "Failed to generate Excel report." });
  }
});

// Gemini Multi-turn Chatbot Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const ai = getGeminiClient();

    const systemInstruction = `You are the official Smart Appliance Concierge & Diagnostic AI for "VELS HOME APPLIANCES" — a premier luxury home appliance sales and service brand in Avinashi / Tirupur / Coimbatore, Tamil Nadu.
Key company facts & policies:
1. FIXED SERVICE CHARGE: ₹500 Fixed inspection/visiting and service charge across all appliances.
2. SERVICES OFFERED: AC (Split/Inverter/Cassette Installation & Jet Servicing), Refrigerator (Frost Free/Side-by-Side/Inverter), Washing Machine (Front/Top Load, PCB, Drum), 4K Smart OLED/QLED TVs, Microwave & Convection Ovens, Water Geysers, Dishwashers, Kitchen Chimneys, Mixer Grinders, and Air Purifiers.
3. QUALITY PROMISE: 100% Genuine OG spare parts, 6-Month post-service guarantee & warranty, 60-90 Minute express arrival by certified master technicians, transparent upfront quotation.
4. TONE & STYLE: Highly professional, warm, concise, and courteous (like a high-end luxury concierge). Format responses with clean bullet points and bold highlights for readability.
5. CAPABILITIES:
   - Diagnose error codes (e.g., AC: E1, E4, CH05; LG/Samsung Washer: OE, UE, dE, 4E, 5C; Fridge: cooling loss, ice build-up, compressor clicking).
   - Offer immediate safety advice (e.g., turn off power socket for electrical sparking or gas smell).
   - Explain common problems simply and estimate repair scope.
   - Reassure that Vels Home Appliances technicians can inspect and repair with transparent ₹500 fixed visiting fee.
   - If the user wants to book a service, invite them to share their name, phone number, and preferred timing or click the "Book a Service" button in the app.`;

    if (!ai) {
      // Graceful fallback response when API key is pending configuration
      const fallbackResponses: Record<string, string> = {
        ac: "For your **Air Conditioner issue**, our certified technicians provide full high-pressure Jet deep cleaning, gas pressure testing (R32/R410A), PCB board diagnostics, and condenser repair under our **₹500 Fixed Inspection Fee** with a 6-month service guarantee & warranty.",
        fridge: "For **Refrigerator problems** (cooling loss, defrost timer failure, inverter compressor relay issues), our master technicians carry genuine OG parts and arrive within 60–90 minutes with our standard **₹500 Fixed Inspection** policy.",
        washing: "For **Washing Machine errors** (drain failure OE/5E, unbalance UE, motor belt or drum bearing vibration), we conduct comprehensive multi-point electronic and mechanical diagnostics for just **₹500 Fixed Service Charge**.",
      };

      const lowerMsg = message.toLowerCase();
      let reply = "Hello! I am the **VELS Smart Appliance Concierge**. How may I assist you with your appliance repair, installation, or maintenance today? All our services carry a transparent **₹500 fixed inspection rate** and a 6-month service guarantee & warranty.";

      if (lowerMsg.includes("ac") || lowerMsg.includes("cooling") || lowerMsg.includes("leak")) {
        reply = fallbackResponses.ac;
      } else if (lowerMsg.includes("fridge") || lowerMsg.includes("refrigerator") || lowerMsg.includes("ice")) {
        reply = fallbackResponses.fridge;
      } else if (lowerMsg.includes("wash") || lowerMsg.includes("drum") || lowerMsg.includes("drain")) {
        reply = fallbackResponses.washing;
      }

      return res.json({
        reply: `${reply}\n\n*Would you like to book a technician visit for ₹500, or do you have a specific error code to diagnose?*`,
        model: "gemini-3.7-flash (mock-fallback)",
      });
    }

    // Build chat contents with multi-turn history
    const contents: Array<{ role: "user" | "model"; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history) {
        if (item.sender === "user" && item.text) {
          contents.push({ role: "user", parts: [{ text: String(item.text) }] });
        } else if (item.sender === "bot" && item.text) {
          contents.push({ role: "model", parts: [{ text: String(item.text) }] });
        }
      }
    }

    // Add current user message
    contents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: contents as any,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "Thank you for contacting VELS HOME APPLIANCES. Our team is ready to assist you. Please schedule your ₹500 fixed service visit anytime.";

    return res.json({
      reply: replyText,
      model: "gemini-3.7-flash",
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Unable to process AI diagnostic request right now.",
      fallbackReply:
        "Our AI Assistant is currently processing high traffic. You can directly book our certified technician for our **₹500 Fixed Service Fee** by using the booking form or calling our hotline.",
    });
  }
});

// Vite & Static Asset Handling
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VELS Home Appliances server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

