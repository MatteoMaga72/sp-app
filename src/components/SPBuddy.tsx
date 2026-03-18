"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { X, Send, Zap, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

const quickChips = ["My bill", "Usage this week", "Green goals", "EV charging nearby", "Report outage"];

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  if (["hi", "hello", "hey", "help"].some((kw) => lower === kw || lower.startsWith(kw + " ") || lower.startsWith(kw + ","))) {
    return "Hello! I'm SP Buddy, your utilities assistant. I can help you with:\nUnderstanding your bills\nChecking your usage\nAccount management\nEV charging locations\nGreen goals progress\n\nWhat would you like to know?";
  }
  if (/\b(bill|charge|payment|expensive|high bill|cost)\b/.test(lower)) {
    return "Your latest bill is $154.08 for Mar 2026 (Electricity & Water at 18 Everton Rd). This is $23.47 less than last month! Would you like me to explain the breakdown, or help you set up auto-payment via GIRO?";
  }
  if (/\b(usage|consumption|electricity|kwh|water)\b/.test(lower)) {
    return "This week you've used 37.95 kWh of electricity so far. That's 12% less than last week! Your biggest usage day was Monday (22 kWh). Tip: Running your AC at 25C instead of 22C can save up to 15% on cooling costs.";
  }
  if (/\b(outage|power cut|blackout|no electricity)\b/.test(lower) || (lower.includes("power") && !lower.includes("power.")) || lower.includes("report outage")) {
    return "I don't see any reported outages in your area (D2 - Tanjong Pagar) right now. If you're experiencing issues, I can help you:\n1) Report an outage\n2) Check scheduled maintenance\n3) Contact emergency services\n\nWhat would you like to do?";
  }
  if (/\b(open|close|move|moving|new house|transfer)\b/.test(lower)) {
    return "I can help you with that! Are you:\n1) Moving to a new place (I'll handle close + open together)\n2) Opening a new utilities account\n3) Closing an existing account?\n\nJust pick a number and I'll guide you step by step.";
  }
  if (/\b(giro|auto\s?pay|autopay|bank)\b/.test(lower)) {
    return "Setting up eGIRO is quick! You can link these banks: DBS, OCBC, UOB, Maybank, ICBC, BOC, MariBank, Citibank, HSBC, Standard Chartered. Would you like me to take you to the eGIRO setup page?";
  }
  if (/\b(green|save|saving|reduce|sustainable|carbon)\b/.test(lower)) {
    return "Great news! Your Green Goal 1 (15% less electricity) is ON TRACK! You're currently 19.38% below last year's usage. Green Goal 2 (18% less water) needs attention - you're only at 13.92% reduction. Want personalized tips to hit your water target?";
  }
  if (/\b(ev|charging|electric vehicle|car)\b/.test(lower)) {
    return "There are 3 charging stations near 18 Everton Rd:\nTanjong Pagar Plaza (2/4 available, 0.3km)\nVivoCity (8/12 available, 1.2km)\nIcon Village (4/6 available, 0.5km)\n\nWant me to navigate you to the nearest one?";
  }
  return "I'm not sure about that, but I'm learning! For now, I can help with bills, usage, account management, green goals, and EV charging. You can also contact us at spgrp.sg/contactus or call 1800-222-2333.";
}

const GREETING: Message = {
  id: 0,
  text: "Hello! I'm SP Buddy, your utilities assistant. I can help you with:\nUnderstanding your bills\nChecking your usage\nAccount management\nEV charging locations\nGreen goals progress\n\nWhat would you like to know?",
  sender: "bot",
};

export default function SPBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);
  useEffect(() => { if (isOpen) setTimeout(() => inputRef.current?.focus(), 350); }, [isOpen]);

  function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const userMsg: Message = { id: nextId.current++, text: msg, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowChips(false);
    setIsTyping(true);
    const delay = 500 + Math.random() * 500;
    setTimeout(() => {
      const botMsg: Message = { id: nextId.current++, text: getBotResponse(msg), sender: "bot" };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  }

  function handleClose() {
    setIsOpen(false);
    setTimeout(() => { setMessages([GREETING]); setShowChips(true); setInput(""); nextId.current = 1; }, 300);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed z-50 flex items-center justify-center rounded-full bg-sp-teal text-white shadow-lg active:scale-95 ${isOpen ? "pointer-events-none opacity-0" : "opacity-100"}`}
        style={{ width: 56, height: 56, bottom: 80, right: 16, transition: "opacity 0.2s ease, transform 0.15s ease", animation: isOpen ? "none" : "pulse-ring 2s ease-in-out infinite" }}
        aria-label="Open SP Buddy chat"
      >
        <Zap size={26} fill="white" />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ transition: "opacity 0.3s ease" }}
        onClick={handleClose}
      />

      <div
        className="fixed left-0 right-0 z-40 flex flex-col glass-strong rounded-t-3xl shadow-2xl dark:shadow-gray-950/50 overflow-hidden"
        style={{ bottom: 0, height: "75vh", maxWidth: 430, margin: "0 auto", transform: isOpen ? "translateY(0)" : "translateY(100%)", transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <div className="flex items-center gap-3 px-4 py-3 bg-sp-teal text-white shrink-0" style={{ backdropFilter: 'blur(20px)' }}>
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
            <Bot size={18} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm leading-tight">SP Buddy</p>
            <p className="text-[10px] opacity-80">Your utilities assistant</p>
          </div>
          <button onClick={handleClose} className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/20 active:bg-white/30" aria-label="Close chat">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              {msg.sender === "bot" && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sp-teal shrink-0 mb-1">
                  <Bot size={14} className="text-white" />
                </div>
              )}
              <div className={`max-w-[80%] px-3 py-2 text-sm leading-relaxed whitespace-pre-line ${msg.sender === "user" ? "bg-sp-teal/90 text-white rounded-2xl rounded-br-md backdrop-blur-sm" : "glass-subtle text-sp-dark rounded-2xl rounded-bl-md"}`}>
                {msg.text}
              </div>
              {msg.sender === "user" && (
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sp-teal/20 shrink-0 mb-1">
                  <User size={14} className="text-sp-teal" />
                </div>
              )}
            </div>
          ))}

          {showChips && (
            <div className="flex flex-wrap gap-2 pt-1">
              {quickChips.map((chip) => (
                <button key={chip} onClick={() => handleSend(chip)} className="px-3 py-1.5 text-xs font-medium rounded-full glass border border-sp-teal/30 text-sp-teal hover:bg-sp-teal-light active:bg-sp-teal active:text-white" style={{ transition: "all 0.15s ease" }}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-sp-teal shrink-0 mb-1">
                <Bot size={14} className="text-white" />
              </div>
              <div className="glass-subtle rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                <span className="typing-dot" style={{ animationDelay: "0ms" }} />
                <span className="typing-dot" style={{ animationDelay: "150ms" }} />
                <span className="typing-dot" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="flex items-center gap-2 px-3 py-2 glass-strong shrink-0">
          <input
            ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Ask SP Buddy..."
            className="flex-1 px-4 py-2 text-sm rounded-full glass text-sp-dark outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-sp-teal/30"
          />
          <button onClick={() => handleSend()} disabled={!input.trim()} className="flex items-center justify-center w-9 h-9 rounded-full bg-sp-teal text-white disabled:opacity-40 active:scale-95" style={{ transition: "opacity 0.15s ease, transform 0.1s ease" }} aria-label="Send message">
            <Send size={16} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(0, 191, 165, 0.5); }
          70% { box-shadow: 0 0 0 12px rgba(0, 191, 165, 0); }
          100% { box-shadow: 0 0 0 0 rgba(0, 191, 165, 0); }
        }
        .typing-dot {
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #999;
          animation: bounce-dot 1.2s ease-in-out infinite;
        }
        @keyframes bounce-dot {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
      `}} />
    </>
  );
}
