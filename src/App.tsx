import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { GeminiChatbot } from "./components/GeminiChatbot";
import { BookingModal } from "./components/BookingModal";
import { BookingTrackerModal } from "./components/BookingTrackerModal";
import { BookingRecord, PageType } from "./types";
import { COMPANY_DETAILS } from "./data";
import { Sparkles, MessageCircle, Wrench, Clock } from "lucide-react";

// Dedicated Pages
import { HomePage } from "./pages/HomePage";
import { ServicesPage } from "./pages/ServicesPage";
import { AppliancesPage } from "./pages/AppliancesPage";
import { WhyChoosePage } from "./pages/WhyChoosePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => {
    const hash = window.location.hash.replace("#", "");
    const validPages: PageType[] = [
      "home",
      "services",
      "appliances",
      "why-choose-us",
      "about",
      "contact",
    ];
    return validPages.includes(hash as PageType) ? (hash as PageType) : "home";
  });

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState<string>("VELS-84920");

  const [bookingPrefill, setBookingPrefill] = useState<{
    appliance?: string;
    service?: string;
  }>({});

  const [chatPrompt, setChatPrompt] = useState<string>("");

  const [recentBookings, setRecentBookings] = useState<BookingRecord[]>([
    {
      id: "VELS-94281",
      customerName: "S. Manikandan",
      mobile: "98401 23456",
      applianceType: "Refrigerator Service",
      serviceRequired: "Inverter Defrost Sensor & ₹500 Fixed Visit",
      address: "24, 4th Main Road, Velachery, Chennai",
      preferredDate: new Date().toISOString().split("T")[0],
      timeSlot: "Morning (09:00 AM - 12:00 PM)",
      message: "Freezer cooling fine, bottom compartment warm",
      status: "Technician Assigned",
      createdAt: new Date().toISOString(),
      fixedCharge: 500,
    },
  ]);

  // Sync hash changes with browser navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      const validPages: PageType[] = [
        "home",
        "services",
        "appliances",
        "why-choose-us",
        "about",
        "contact",
      ];
      if (validPages.includes(hash as PageType)) {
        setCurrentPage(hash as PageType);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    window.location.hash = page === "home" ? "" : page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenBookingModal = (prefillAppliance?: string, prefillService?: string) => {
    setBookingPrefill({
      appliance: prefillAppliance,
      service: prefillService,
    });
    setIsBookingModalOpen(true);
  };

  const handleOpenChat = (prompt?: string) => {
    if (prompt) {
      setChatPrompt(prompt);
    }
    setIsChatOpen(true);
  };

  const handleOpenTracker = (trackingId?: string) => {
    if (trackingId) {
      setSelectedTrackingId(trackingId);
    }
    setIsTrackerOpen(true);
  };

  const handleBookingSuccess = (newBooking: BookingRecord) => {
    setRecentBookings((prev) => [newBooking, ...prev]);
    setSelectedTrackingId(newBooking.id);
  };

  return (
    <div
      id="vels-app-root"
      className="min-h-screen w-full bg-[#05070F] text-slate-100 selection:bg-cyan-500 selection:text-slate-950 relative overflow-x-hidden font-['Manrope'] flex flex-col justify-between"
    >
      {/* Header Navigation with Active Page Highlighting */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBookingModal={handleOpenBookingModal}
        onOpenChat={handleOpenChat}
      />

      {/* Main Dynamic Page Content */}
      <main className="flex-1 w-full">
        {currentPage === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenChat={handleOpenChat}
            onBookingSuccess={handleBookingSuccess}
            onOpenTracker={(id) => handleOpenTracker(id)}
          />
        )}

        {currentPage === "services" && (
          <ServicesPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentPage === "appliances" && (
          <AppliancesPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentPage === "why-choose-us" && (
          <WhyChoosePage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
            onOpenChat={handleOpenChat}
          />
        )}

        {currentPage === "about" && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenBookingModal={handleOpenBookingModal}
          />
        )}

        {currentPage === "contact" && (
          <ContactPage
            onNavigate={handleNavigate}
            bookingPrefill={bookingPrefill}
            onBookingSuccess={handleBookingSuccess}
            onOpenChat={handleOpenChat}
            onOpenTracker={() => handleOpenTracker()}
          />
        )}
      </main>

      {/* Site Footer with Dedicated Page Links */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBookingModal}
        onOpenChat={() => handleOpenChat()}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Floating Action Cluster (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 pointer-events-none">
        {/* Floating WhatsApp Quick Action */}
        <a
          href={`https://wa.me/${COMPANY_DETAILS.whatsappNumber}?text=Hi%20VELS%20Home%20Appliances,%20I%20need%20assistance%20with%20my%20home%20appliance.`}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_4px_20px_rgba(16,185,129,0.5)] transition-all hover:scale-110 flex items-center justify-center"
          title="Chat on WhatsApp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5" />
        </a>

        {/* Floating Service Booking Tracker */}
        <button
          onClick={() => handleOpenTracker()}
          id="floating-track-btn"
          className="pointer-events-auto p-3.5 rounded-full bg-white/10 hover:bg-cyan-500/15 border border-white/15 hover:border-cyan-400/50 text-cyan-300 shadow-[0_4px_20px_rgba(0,229,255,0.25)] transition-all hover:scale-110 flex items-center justify-center cursor-pointer"
          title="Track Service Booking"
          aria-label="Track Service Booking"
        >
          <Clock className="w-5 h-5" />
        </button>

        {/* Floating AI Concierge Diagnostic Chat Button */}
        {!isChatOpen && (
          <button
            onClick={() => handleOpenChat()}
            id="floating-ai-concierge-btn"
            className="pointer-events-auto relative p-3.5 rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 text-slate-950 font-black shadow-[0_0_30px_rgba(0,229,255,0.6)] hover:shadow-[0_0_40px_rgba(0,229,255,0.9)] hover:scale-105 transition-all flex items-center justify-center cursor-pointer"
            title="Ask VELS AI Diagnostics"
            aria-label="Ask VELS AI Diagnostics"
          >
            <Sparkles className="w-5 h-5 animate-pulse text-slate-950" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-300 border-2 border-slate-950"></span>
            </span>
          </button>
        )}
      </div>

      {/* Floating Bottom Left Express Booking Pill for Mobile */}
      <div className="fixed bottom-6 left-6 z-30 sm:hidden">
        <button
          onClick={() => handleOpenBookingModal()}
          className="px-4 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,229,255,0.6)] flex items-center gap-2 cursor-pointer"
        >
          <Wrench className="w-4 h-4" />
          <span>Book Service</span>
        </button>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        prefillAppliance={bookingPrefill.appliance}
        prefillService={bookingPrefill.service}
        onBookingSuccess={handleBookingSuccess}
        onOpenTrackerWithId={(id) => handleOpenTracker(id)}
      />

      <BookingTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        recentBookings={recentBookings}
        initialTrackingId={selectedTrackingId}
        onOpenBooking={() => {
          setIsTrackerOpen(false);
          handleOpenBookingModal();
        }}
      />

      <GeminiChatbot
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenBooking={(appliance, service) => {
          setIsChatOpen(false);
          handleOpenBookingModal(appliance, service);
        }}
        initialPrompt={chatPrompt}
      />
    </div>
  );
}
