import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", compact = false }) => {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  if (compact) {
    return (
      <button
        onClick={toggleTheme}
        id="theme-toggle-compact"
        type="button"
        aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
        title={`Switch to ${isLight ? "dark" : "light"} mode`}
        className={`relative p-2 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
          isLight
            ? "bg-slate-100 border-slate-300 text-amber-500 hover:bg-slate-200 shadow-sm"
            : "bg-white/[0.06] border-white/10 text-cyan-300 hover:bg-white/[0.12] hover:border-cyan-400/40 shadow-[0_0_12px_rgba(0,229,255,0.15)]"
        } ${className}`}
      >
        {isLight ? (
          <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
        ) : (
          <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0" />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      id="theme-toggle-switch"
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      title={`Currently ${isLight ? "Light" : "Dark"} mode. Click to toggle.`}
      className={`relative inline-flex items-center h-8 px-1 rounded-full border transition-all duration-300 cursor-pointer select-none ${
        isLight
          ? "bg-slate-200/90 border-slate-300 shadow-inner w-16"
          : "bg-[#090E20] border-cyan-500/30 shadow-[0_0_15px_rgba(0,229,255,0.2)] w-16"
      } ${className}`}
    >
      {/* Sliding Knob */}
      <span
        className={`absolute top-0.5 bottom-0.5 w-7 h-7 rounded-full transition-all duration-300 transform flex items-center justify-center shadow-md ${
          isLight
            ? "left-0.5 translate-x-0 bg-white border border-amber-300/40 text-amber-500 shadow-amber-500/10"
            : "left-0.5 translate-x-8 bg-gradient-to-tr from-cyan-600 to-cyan-400 text-slate-950 shadow-cyan-400/30"
        }`}
      >
        {isLight ? (
          <Sun className="w-3.5 h-3.5" />
        ) : (
          <Moon className="w-3.5 h-3.5" />
        )}
      </span>

      {/* Background Icons: Sun (Light) on Left, Moon (Dark) on Right */}
      <span className="w-full flex items-center justify-between px-1.5 pointer-events-none">
        <Sun
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isLight ? "opacity-0" : "opacity-35 text-amber-300"
          }`}
        />
        <Moon
          className={`w-3.5 h-3.5 transition-opacity duration-200 ${
            isLight ? "opacity-35 text-slate-500" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
};
