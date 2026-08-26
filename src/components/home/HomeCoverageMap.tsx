import React, { useState } from "react";
import { MapPin, Navigation, Clock, ShieldCheck, CheckCircle2, Phone, Sparkles, Search } from "lucide-react";
import { COMPANY_DETAILS } from "../../data";

interface ServiceZone {
  name: string;
  distance: string;
  eta: string;
  activeTechs: number;
  landmarks: string[];
  status: "Available" | "High Demand";
  pincode?: string;
}

const SERVICE_ZONES: ServiceZone[] = [
  {
    name: "Avinashi Town & New Bus Stand",
    distance: "0–3 km",
    eta: "30–45 Mins",
    activeTechs: 12,
    landmarks: ["Mangalam Road", "Old Fire Station", "Avinashilingeshwarar Temple", "RTO Office", "Kamarajar Nagar", "Cheyur Road"],
    status: "Available",
    pincode: "641654",
  },
  {
    name: "Perumanallur & Pandian Nagar",
    distance: "4–8 km",
    eta: "35–45 Mins",
    activeTechs: 11,
    landmarks: ["Perumanallur 4-Roads", "Kanakkampalayam", "Pandian Nagar", "Tiruppur Ring Road", "Neruperichal"],
    status: "Available",
    pincode: "641666",
  },
  {
    name: "Sevur & Kaniyur Highway",
    distance: "4–8 km",
    eta: "40–55 Mins",
    activeTechs: 8,
    landmarks: ["Sevur Junction", "Kaniyur Toll", "Alathur Industrial Area", "Pongupalayam", "Kattampatti"],
    status: "Available",
    pincode: "641655",
  },
  {
    name: "Thekkalur & Karumathampatti",
    distance: "6–12 km",
    eta: "45–60 Mins",
    activeTechs: 9,
    landmarks: ["Thekkalur Bypass", "Karumathampatti Ring Road", "Kovai Highway", "Kaniyur Industrial Belt", "Somanur Link"],
    status: "Available",
    pincode: "641659",
  },
  {
    name: "Tiruppur North & College Road",
    distance: "10–15 km",
    eta: "45–60 Mins",
    activeTechs: 14,
    landmarks: ["PN Road", "College Road", "Pushpa Theatre Area", "Anupparpalayam", "15 Velampalayam", "Kumaran Road"],
    status: "High Demand",
    pincode: "641602",
  },
  {
    name: "Palladam & Mangalam Corridor",
    distance: "8–14 km",
    eta: "45–55 Mins",
    activeTechs: 8,
    landmarks: ["Mangalam Town", "Palladam Bus Stand", "Agrahara Puthur", "Chettipalayam Road", "Karaipudur"],
    status: "Available",
    pincode: "641664",
  },
  {
    name: "Annur & Puliyampatti Link",
    distance: "12–18 km",
    eta: "50–65 Mins",
    activeTechs: 7,
    landmarks: ["Annur Four Roads", "Othakalmandapam", "Kunnathur Bypass", "Pogalur", "Sirumugai Link Road"],
    status: "Available",
    pincode: "641653",
  },
  {
    name: "Kunnathur & Gobi Road Corridor",
    distance: "10–16 km",
    eta: "45–60 Mins",
    activeTechs: 6,
    landmarks: ["Kunnathur Bus Stand", "Nambiyur Road", "Mudalipalayam", "Uttukuli Link", "Chengappalli"],
    status: "Available",
    pincode: "638103",
  },
  {
    name: "Coimbatore East, Sulur & Neelambur",
    distance: "14–22 km",
    eta: "55–70 Mins",
    activeTechs: 8,
    landmarks: ["Neelambur Toll", "Sulur Airbase Zone", "Peedampalli", "Avinashi Express Highway", "Arasur"],
    status: "Available",
    pincode: "641062",
  },
  {
    name: "Tiruppur South & Veerapandi",
    distance: "14–18 km",
    eta: "50–65 Mins",
    activeTechs: 9,
    landmarks: ["Kangeyam Road", "Veerapandi Ring Road", "Dharapuram Road", "Nallur", "Vidyalayam"],
    status: "High Demand",
    pincode: "641604",
  },
  {
    name: "Cheyur, Pongupalayam & Karavalur",
    distance: "5–10 km",
    eta: "35–50 Mins",
    activeTechs: 8,
    landmarks: ["Cheyur Amman Temple", "Karavalur Junction", "Pongupalayam", "Alathur Industrial Units", "Mookambika Nagar"],
    status: "Available",
    pincode: "641655",
  },
  {
    name: "Uthukuli & Vijayamangalam Toll",
    distance: "12–18 km",
    eta: "45–60 Mins",
    activeTechs: 6,
    landmarks: ["Uthukuli Railway Station Road", "Vijayamangalam Toll Gate", "Chennimalai Cross", "Chengappalli Link", "Perundurai Border"],
    status: "Available",
    pincode: "638751",
  },
  {
    name: "Kovilpalayam & Saravanampatti Belt",
    distance: "16–22 km",
    eta: "50–65 Mins",
    activeTechs: 7,
    landmarks: ["Kovilpalayam 4-Roads", "Kurumbapalayam", "Saravanampatti IT SEZ Link", "Kariyampalayam", "Sathy Road Corridor"],
    status: "Available",
    pincode: "641107",
  },
  {
    name: "Iduvai & Murugampalayam Belt",
    distance: "10–16 km",
    eta: "45–60 Mins",
    activeTechs: 6,
    landmarks: ["Iduvai Junction", "Murugampalayam", "Andipalayam Ring Road", "Chinnakampalayam", "Veerapandi South"],
    status: "Available",
    pincode: "641687",
  },
  {
    name: "Punjai Puliyampatti & Nambiyur",
    distance: "18–25 km",
    eta: "55–70 Mins",
    activeTechs: 5,
    landmarks: ["Puliyampatti Bus Stand", "Nambiyur Main Road", "Kavilipalayam", "Malayampalayam", "Bannari Amman Link"],
    status: "Available",
    pincode: "638459",
  },
  {
    name: "Karamadai & Sirumugai Foothills",
    distance: "20–28 km",
    eta: "60–75 Mins",
    activeTechs: 5,
    landmarks: ["Sirumugai Link", "Bellaipalayam", "Karamadai Bypass", "Mettupalayam Gateway", "Annur-Mettupalayam Highway"],
    status: "Available",
    pincode: "641104",
  },
];

interface HomeCoverageMapProps {
  onOpenBookingModal: (prefillAppliance?: string, prefillService?: string) => void;
}

export const HomeCoverageMap: React.FC<HomeCoverageMapProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedZone, setSelectedZone] = useState<ServiceZone>(SERVICE_ZONES[0]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredZones = SERVICE_ZONES.filter((zone) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      zone.name.toLowerCase().includes(query) ||
      (zone.pincode && zone.pincode.includes(query)) ||
      zone.landmarks.some((lm) => lm.toLowerCase().includes(query))
    );
  });

  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-[#060e22] via-[#081530] to-[#040816] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Navigation className="w-3.5 h-3.5" />
              <span>Real-Time Local Dispatch</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope']">
              Avinashi & Surrounding Service Coverage
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
              50+ mobile technicians deployed across Avinashi and surrounding industrial & residential corridors with fully equipped spare-parts vans.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.04] p-3 rounded-2xl border border-white/10 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold text-emerald-400">
              50 Mobile Vans Active Right Now
            </span>
          </div>
        </div>

        {/* 2-Column Zone Selector & Interactive Radar View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Zone list */}
          <div className="lg:col-span-6 flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Select Your Locality ({SERVICE_ZONES.length} Hubs):
              </div>
              <span className="text-[11px] text-cyan-300 font-mono">60–90 Min Arrival</span>
            </div>

            {/* Locality Search Input */}
            <div className="relative mb-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search area, landmark or pincode (e.g. Mangalam, 641654, PN Road)..."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950/70 border border-white/10 text-xs font-mono text-cyan-300 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="space-y-2 max-h-[440px] overflow-y-auto pr-1">
              {filteredZones.length === 0 ? (
                <div className="p-6 text-center rounded-2xl bg-white/[0.02] border border-white/5 text-slate-400 text-xs">
                  No exact match found. Don't worry, our express vans cover all zones within 30km of Avinashi!
                </div>
              ) : (
                filteredZones.map((zone) => {
                  const isSelected = zone.name === selectedZone.name;
                  return (
                    <button
                      key={zone.name}
                      onClick={() => setSelectedZone(zone)}
                      className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all border cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? "bg-gradient-to-r from-blue-950/90 to-cyan-950/80 border-cyan-400 text-white shadow-[0_0_15px_rgba(0,229,255,0.2)] scale-[1.01]"
                          : "bg-white/[0.02] border-white/10 hover:border-white/25 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-cyan-400 text-slate-950 shadow-md"
                              : "bg-white/5 text-blue-400"
                          }`}
                        >
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-white truncate">
                            {zone.name}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                            <span>{zone.distance}</span>
                            <span>•</span>
                            <span className="text-cyan-300 font-mono font-semibold">
                              ETA {zone.eta}
                            </span>
                            {zone.pincode && (
                              <>
                                <span>•</span>
                                <span className="font-mono text-slate-400 text-[10px]">{zone.pincode}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase shrink-0 ${
                          zone.status === "Available"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {zone.status}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Detailed Local Dispatch Box */}
          <div className="lg:col-span-6 glass-panel p-6 sm:p-7 rounded-2xl border border-cyan-500/40 bg-[#070e24] flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div>
                  <div className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest">
                    Dispatched from Avinashi Main Hub
                  </div>
                  <h3 className="text-xl font-bold text-white mt-0.5">
                    {selectedZone.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-400 uppercase">Estimated Arrival</div>
                  <div className="text-lg font-black text-cyan-300 font-mono">
                    {selectedZone.eta}
                  </div>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase">Dedicated Engineers</div>
                  <div className="text-base font-bold text-white mt-0.5">
                    {selectedZone.activeTechs} On-Duty Techs
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-slate-400 uppercase">Diagnostic Fee</div>
                  <div className="text-base font-black text-emerald-400 font-mono mt-0.5">
                    ₹500 Flat Rate
                  </div>
                </div>
              </div>

              {/* Covered Landmarks */}
              <div className="mb-6">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Popular Service Areas in this Sector:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedZone.landmarks.map((landmark) => (
                    <span
                      key={landmark}
                      className="text-xs px-2.5 py-1 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-200"
                    >
                      {landmark}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-cyan-200 flex items-center gap-2 mb-6">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Technician carries digital multimeter, leak detectors & genuine spare parts.</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/10">
              <a
                href={`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`}
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Call Local Dispatch</span>
              </a>

              <button
                onClick={() =>
                  onOpenBookingModal(
                    "Home Appliance Service",
                    `Doorstep Visit to ${selectedZone.name}`
                  )
                }
                className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,229,255,0.4)] flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Book Visit to My Area</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
