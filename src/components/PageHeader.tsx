import React from "react";
import { Sparkles, ChevronRight, Home } from "lucide-react";
import { PageType } from "../types";

interface PageHeaderProps {
  badge: string;
  title: string;
  highlightedTitle?: string;
  description: string;
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  badge,
  title,
  highlightedTitle,
  description,
  currentPage,
  onNavigate,
}) => {
  return (
    <div className="relative pt-32 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#090D1C] via-[#05070F] to-[#05070F] border-b border-cyan-500/10">
      {/* Background glow orb */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[220px] bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center gap-1.5 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-cyan-400 font-bold capitalize">
            {currentPage.replace(/-/g, " ")}
          </span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(0,229,255,0.2)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 font-['Manrope']">
          {title}{" "}
          {highlightedTitle && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-blue-400">
              {highlightedTitle}
            </span>
          )}
        </h1>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-3xl leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
