import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  Send,
  X,
  Bot,
  User,
  Wrench,
  ChevronDown,
  RefreshCw,
  Phone,
  ShieldCheck,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { ChatMessage } from "../types";
import { COMPANY_DETAILS } from "../data";

interface GeminiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (prefillAppliance?: string, prefillService?: string) => void;
  initialPrompt?: string;
}

export const GeminiChatbot: React.FC<GeminiChatbotProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-0",
      sender: "bot",
      text: "Hello! I am your VELS Smart Appliance Concierge. How can I help you today? I can diagnose appliance error codes, explain our ₹500 fixed service policy, or help you book an express doorstep technician.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      suggestions: [
        "Diagnose AC cooling / Error E4",
        "Fridge not cooling, freezer is frozen",
        "Washing Machine drain error OE",
        "Explain ₹500 fixed visit charge",
      ],
    },
  ]);

  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      sendMessage(initialPrompt);
    }
  }, [initialPrompt, isOpen]);

  const sendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsLoading(true);

    try {
      // Build conversation history for server-side Gemini API
      const historyPayload = messages
        .filter((m) => m.id !== "msg-0") // optional
        .map((m) => ({
          role: m.sender === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
        }),
      });

      const data = await res.json();

      if (data.reply) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          suggestions: data.suggestions || [
            "Book a technician for ₹500",
            "Call Master Technician",
            "What OG spare parts are used?",
          ],
        };
        setMessages((prev) => [...prev, botMsg]);
      } else {
        throw new Error(data.error || "No response received");
      }
    } catch (err) {
      // Graceful fallback response
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: `Based on your query regarding "${textToSend}", our certified VELS master technician can inspect your appliance at your doorstep with our fixed ₹500 diagnostic rate and 6-month service guarantee & warranty. Would you like to schedule a visit?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        suggestions: ["Book ₹500 Doorstep Visit", "Call Support Now"],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (suggestion.toLowerCase().includes("book")) {
      onOpenBooking("Appliance Diagnosed via AI", "Fixed ₹500 Inspection & Diagnostic");
    } else if (suggestion.toLowerCase().includes("call")) {
      window.open(`tel:${COMPANY_DETAILS.phone.replace(/\s+/g, "")}`, "_self");
    } else {
      sendMessage(suggestion);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="gemini-chatbot-container"
      className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] glass-panel rounded-3xl overflow-hidden border border-cyan-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(0,229,255,0.2)] flex flex-col backdrop-blur-2xl animate-hero-up"
    >
      {/* Header */}
      <div className="p-4 bg-slate-950/90 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 p-[1.5px]">
            <div className="w-full h-full bg-slate-950 rounded-[9px] flex items-center justify-center text-cyan-300">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white uppercase tracking-wider">
                VELS AI Diagnostics
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.2 bg-cyan-400 text-slate-950 rounded uppercase">
                Gemini
              </span>
            </div>
            <span className="text-[10px] text-cyan-400 font-mono">
              Smart Appliance Concierge
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() =>
              setMessages([
                {
                  id: "msg-0",
                  sender: "bot",
                  text: "Hello! I am your VELS Smart Appliance Concierge. How can I help you today?",
                  timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  suggestions: [
                    "Diagnose AC cooling / Error E4",
                    "Fridge not cooling, freezer is frozen",
                    "Washing Machine drain error OE",
                    "Explain ₹500 fixed visit charge",
                  ],
                },
              ])
            }
            title="Reset conversation"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div className="flex items-start gap-2 max-w-[88%]">
              {msg.sender === "bot" && (
                <div className="w-6 h-6 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-cyan-500 to-sky-600 text-slate-950 font-medium rounded-tr-none shadow-md"
                    : "bg-white/[0.06] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md"
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === "user" && (
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <span className="text-[9px] text-slate-500 mt-1 px-1 font-mono">
              {msg.timestamp}
            </span>

            {/* Quick Action Suggestion Chips */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                {msg.suggestions.map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(sug)}
                    className="px-2.5 py-1 rounded-full bg-cyan-950/70 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-semibold transition-all hover:scale-102"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-cyan-400 text-xs py-2">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-medium animate-pulse">
              Analyzing appliance telemetry with Gemini AI...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Footer Booking Action Banner */}
      <div className="px-4 py-2 bg-cyan-950/40 border-t border-cyan-500/20 flex items-center justify-between text-[11px]">
        <span className="text-slate-300">
          Fixed Inspection Fee: <strong className="text-cyan-300 font-mono">₹500</strong>
        </span>
        <button
          onClick={() => onOpenBooking("Diagnosed Appliance", "General Diagnostic")}
          className="text-cyan-400 font-bold hover:underline flex items-center gap-1"
        >
          <Wrench className="w-3 h-3" /> Quick Book
        </button>
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(inputVal);
        }}
        className="p-3 bg-slate-950/90 border-t border-white/10 flex items-center gap-2"
      >
        <input
          type="text"
          placeholder="Ask anything (e.g. My AC shows E4, Fridge warm)..."
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          className="flex-1 px-3.5 py-2.5 rounded-xl glass-input text-xs placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={isLoading || !inputVal.trim()}
          className="p-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 disabled:opacity-40 transition-all cursor-pointer shadow-md"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
