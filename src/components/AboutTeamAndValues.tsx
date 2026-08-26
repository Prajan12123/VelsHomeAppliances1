import React from "react";
import {
  ShieldCheck,
  GraduationCap,
  Users2,
  Cpu,
  Sparkles,
  HeartHandshake,
  CheckCircle2,
  Award,
} from "lucide-react";

export const AboutTeamAndValues: React.FC = () => {
  const leadershipTeam = [
    {
      name: "Er. S. Velmurugan",
      role: "Founder & Chief Technical Director",
      experience: "18+ Years Experience",
      expertise: "HVAC System Engineering & Inverter Thermodynamics",
      bio: "Master mechanical engineer with over 18 years in residential and industrial refrigeration. Pioneered the ₹500 flat-rate diagnostic service model in Tiruppur district.",
    },
    {
      name: "Er. K. Natarajan",
      role: "Lead Electronics & PCB Specialist",
      experience: "14+ Years Experience",
      expertise: "Micro-soldering, Dual-Inverter PCB Diagnostics & IoT Logic",
      bio: "Former brand service trainer for leading multinational consumer electronics brands, heading VELS electronic motherboard and smart appliance testing division.",
    },
    {
      name: "R. Dhanalakshmi",
      role: "Head of Customer Relations & Dispatch",
      experience: "10+ Years Experience",
      expertise: "Rapid Dispatch Logistics & Quality Compliance",
      bio: "Ensures every doorstep booking meets the guaranteed 60–90 minute turnaround and that all 6-month warranty claims receive instant priority resolution.",
    },
  ];

  const trainingAcademyPillars = [
    {
      icon: GraduationCap,
      title: "Monthly Factory Skill Upgrades",
      desc: "Our technicians undergo mandatory 40-hour monthly refresher modules on new appliance technologies (Inverter Linear Compressors, AI Wash Cycles, Dual Inverter ACs, OLED/QLED circuitry).",
    },
    {
      icon: ShieldCheck,
      title: "100% Background & Police Verified",
      desc: "Your home’s safety is our top priority. Every engineer is identity-checked, police-verified, and required to display official digital company credentials.",
    },
    {
      icon: Cpu,
      title: "Strict Precision Tooling Protocol",
      desc: "Technicians are prohibited from using crude trial-and-error methods; every repair requires calibrated digital multi-meters and diagnostic software.",
    },
    {
      icon: HeartHandshake,
      title: "Ethical & Honest Customer Etiquette",
      desc: "Our engineers are trained to give unbiased, honest advice on whether an old appliance is worth repairing or if replacement is more economical for you.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section 1: Leadership */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-4">
          <Users2 className="w-3.5 h-3.5" />
          <span>Technical Leadership</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Manrope'] mb-4">
          Led by Certified Appliance Engineers
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm">
          Behind every successful repair is a team of veteran engineering specialists dedicated to technical precision and total consumer trust.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {leadershipTeam.map((lead, idx) => (
          <div
            key={idx}
            className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-900/40 border border-cyan-400/40 text-cyan-300 flex items-center justify-center font-mono font-bold text-lg mb-4 shadow-lg">
                {lead.name.split(" ")[1]?.charAt(0) || "V"}
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-300">
                  {lead.experience}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white font-['Manrope'] mt-2">
                {lead.name}
              </h3>
              <div className="text-xs font-bold text-cyan-400 mb-2">
                {lead.role}
              </div>

              <div className="text-[11px] font-semibold text-emerald-400 mb-3 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                ★ {lead.expertise}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {lead.bio}
              </p>
            </div>

            <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-2 text-[11px] text-slate-400">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Certified Master Technician</span>
            </div>
          </div>
        ))}
      </div>

      {/* Section 2: VELS In-House Training Academy */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#080D1F] to-[#04060E]">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-widest mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>The VELS Technician Standard</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope'] mb-3">
            In-House Training & Excellence Academy
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm">
            We never send uncertified freelancers to your home. Every engineer undergoes rigorous technical training, ESD safety protocols, and strict behavioral guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {trainingAcademyPillars.map((pillar, pIdx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pIdx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-['Manrope'] mb-1">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
