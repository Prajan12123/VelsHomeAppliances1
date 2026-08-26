import React, { useState } from "react";
import { MapPin, Navigation, Clock, ShieldCheck, CheckCircle2, Search } from "lucide-react";

export const ContactCoverageHubs: React.FC = () => {
  const [selectedHub, setSelectedHub] = useState<number>(0);
  const [searchFilter, setSearchFilter] = useState("");

  const coverageZones = [
    {
      region: "Avinashi Central & Town",
      eta: "30 – 45 Mins",
      type: "Immediate Rapid Hub",
      pinCodes: ["641654", "641655"],
      landmarks: ["Mangalam Road", "Old & New Bus Stand", "Avinashilingeswarar Temple", "Cheyur Road", "Sevur", "Kamarajar Nagar", "RTO Office"],
      techniciansCount: "8 Engineers on Duty",
    },
    {
      region: "Perumanallur & Pandian Nagar",
      eta: "35 – 45 Mins",
      type: "North Express Hub",
      pinCodes: ["641666", "641602"],
      landmarks: ["Perumanallur Junction", "Kanakkampalayam", "Pandian Nagar", "Neruperichal", "Tiruppur Ring Road"],
      techniciansCount: "6 Engineers on Duty",
    },
    {
      region: "Thekkalur, Somanur & Karumathampatti",
      eta: "40 – 55 Mins",
      type: "West Express Hub",
      pinCodes: ["641659", "641668"],
      landmarks: ["Thekkalur Bypass", "Karumathampatti Ring Road", "Somanur Link", "Kaniyur Industrial Belt", "Kovai 4-Lane"],
      techniciansCount: "6 Engineers on Duty",
    },
    {
      region: "Tiruppur City & Industrial Belt",
      eta: "45 – 60 Mins",
      type: "Express Coverage",
      pinCodes: ["641601", "641602", "641603", "641607"],
      landmarks: ["PN Road", "Avinashi Road", "Kumaran Road", "Anupparpalayam", "15 Velampalayam", "Pushpa Theatre", "College Road"],
      techniciansCount: "12 Engineers on Duty",
    },
    {
      region: "Palladam & Mangalam Corridor",
      eta: "45 – 60 Mins",
      type: "South Corridor Hub",
      pinCodes: ["641664", "641662"],
      landmarks: ["Mangalam Town", "Palladam Bus Stand", "Trichy Road Junction", "Agrahara Puthur", "Chettipalayam Link", "Karaipudur"],
      techniciansCount: "5 Engineers on Duty",
    },
    {
      region: "Coimbatore East, Sulur & Airport Zone",
      eta: "55 – 70 Mins",
      type: "Extended Express",
      pinCodes: ["641014", "641062", "641407", "641048"],
      landmarks: ["Kaniyur Toll", "Neelambur Bypass", "Sulur Air Base", "Peedampalli", "Arasur Industrial Park", "Avinashi Express"],
      techniciansCount: "6 Engineers on Duty",
    },
    {
      region: "Kunnathur, Uthukuli & Gobi Road",
      eta: "45 – 60 Mins",
      type: "East Corridor Hub",
      pinCodes: ["638103", "638751"],
      landmarks: ["Kunnathur Four Roads", "Nambiyur Link", "Uthukuli Road", "Mudalipalayam", "Chengappalli NH"],
      techniciansCount: "4 Engineers on Duty",
    },
    {
      region: "Annur & Mettupalayam Link",
      eta: "45 – 60 Mins",
      type: "North-West Corridor",
      pinCodes: ["641653", "641697"],
      landmarks: ["Annur Four Roads", "Kattampatti", "Othakalmandapam Link", "Pogalur", "Sirumugai Link"],
      techniciansCount: "4 Engineers on Duty",
    },
    {
      region: "Tiruppur South & Veerapandi",
      eta: "50 – 65 Mins",
      type: "South-East Corridor",
      pinCodes: ["641604", "641605", "641608"],
      landmarks: ["Kangeyam Road", "Veerapandi", "Dharapuram Road", "Nallur", "Vidyalayam", "Muthur Road"],
      techniciansCount: "5 Engineers on Duty",
    },
    {
      region: "Cheyur, Pongupalayam & Karavalur",
      eta: "35 – 50 Mins",
      type: "North Rapid Hub",
      pinCodes: ["641655", "641654"],
      landmarks: ["Cheyur Amman Temple", "Karavalur Junction", "Pongupalayam", "Alathur Industrial Units", "Mookambika Nagar"],
      techniciansCount: "4 Engineers on Duty",
    },
    {
      region: "Uthukuli & Vijayamangalam Toll",
      eta: "45 – 60 Mins",
      type: "East Link Hub",
      pinCodes: ["638751", "638056"],
      landmarks: ["Uthukuli Railway Station Road", "Vijayamangalam Toll Gate", "Chennimalai Cross", "Chengappalli Link", "Perundurai Border"],
      techniciansCount: "4 Engineers on Duty",
    },
    {
      region: "Kovilpalayam & Saravanampatti Belt",
      eta: "50 – 65 Mins",
      type: "Coimbatore Tech Link",
      pinCodes: ["641107", "641035"],
      landmarks: ["Kovilpalayam 4-Roads", "Kurumbapalayam", "Saravanampatti IT SEZ Link", "Kariyampalayam", "Sathy Road Corridor"],
      techniciansCount: "5 Engineers on Duty",
    },
    {
      region: "Iduvai & Murugampalayam Belt",
      eta: "45 – 60 Mins",
      type: "Industrial Corridor",
      pinCodes: ["641687", "641606"],
      landmarks: ["Iduvai Junction", "Murugampalayam", "Andipalayam Ring Road", "Chinnakampalayam", "Veerapandi South"],
      techniciansCount: "4 Engineers on Duty",
    },
    {
      region: "Punjai Puliyampatti & Nambiyur",
      eta: "55 – 70 Mins",
      type: "North Highway Hub",
      pinCodes: ["638459", "638458"],
      landmarks: ["Puliyampatti Bus Stand", "Nambiyur Main Road", "Kavilipalayam", "Malayampalayam", "Bannari Amman Link"],
      techniciansCount: "4 Engineers on Duty",
    },
    {
      region: "Karamadai & Sirumugai Foothills",
      eta: "60 – 75 Mins",
      type: "Hills Gateway Hub",
      pinCodes: ["641104", "641302"],
      landmarks: ["Sirumugai Link", "Bellaipalayam", "Karamadai Bypass", "Mettupalayam Gateway", "Annur-Mettupalayam Highway"],
      techniciansCount: "3 Engineers on Duty",
    },
  ];

  const filteredZones = coverageZones.filter(
    (z) =>
      z.region.toLowerCase().includes(searchFilter.toLowerCase()) ||
      z.landmarks.some((l) => l.toLowerCase().includes(searchFilter.toLowerCase())) ||
      z.pinCodes.some((p) => p.includes(searchFilter))
  );

  const activeZone = coverageZones[selectedHub] || coverageZones[0];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Navigation className="w-3.5 h-3.5" />
          <span>Regional Doorstep Coverage</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          Live Service Hubs & Arrival ETAs
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          We maintain localized technician squads across Avinashi, Tiruppur, Coimbatore East, and surrounding textile corridors for ultra-fast doorstep dispatch.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Selectable Zone List */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your area, landmark or pincode (e.g. 641654, PN Road, Sevur)..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl glass-input text-xs sm:text-sm text-white"
            />
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredZones.map((zone, idx) => {
              const originalIndex = coverageZones.findIndex((z) => z.region === zone.region);
              const isSelected = selectedHub === originalIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setSelectedHub(originalIndex)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-cyan-950/80 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                      : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <MapPin className={`w-4 h-4 ${isSelected ? "text-cyan-400" : "text-slate-400"}`} />
                      <h4 className="text-sm font-bold text-white font-['Manrope']">
                        {zone.region}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                      ETA: {zone.eta}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                    {zone.landmarks.join(" • ")}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>Pincodes: {zone.pinCodes.join(", ")}</span>
                    <span className="text-cyan-300 font-semibold">{zone.techniciansCount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Hub Detail Spotlight */}
        <div className="lg:col-span-6">
          <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#081226] to-[#040814] relative overflow-hidden shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest block">
                  Active Dispatch Corridor
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Manrope'] mt-0.5">
                  {activeZone.region}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Arrival Standard</span>
                <span className="text-base font-extrabold font-mono text-emerald-400">{activeZone.eta}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <div className="text-slate-400 text-xs uppercase font-bold tracking-wider mb-2">
                  Key Localities & Commercial Hubs Covered:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeZone.landmarks.map((lm, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-slate-200 text-xs font-medium"
                    >
                      📍 {lm}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Pincode Service Network</div>
                  <div className="font-mono text-cyan-300 font-bold mt-1">
                    {activeZone.pinCodes.join(", ")}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Standard Visiting Rate</div>
                  <div className="font-mono text-emerald-400 font-bold mt-1">
                    Fixed ₹500 Doorstep Check
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/20 text-xs text-slate-300 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <span>Single-Visit Resolution Guarantee</span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  Technicians dispatched to this zone carry pre-tested fast-moving OEM spares (compressor relays, capacitors, drain pumps, sensors, thermostats) for single-visit fixes.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
