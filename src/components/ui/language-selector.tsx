"use client";

import { useState } from "react";
import { Globe, ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "ms", label: "Bahasa Melayu", flag: "🇲🇾" },
  { code: "ta", label: "தமிழ்", flag: "🇮🇳" },
];

export function LanguageSelector({ className = "" }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-glass-bg backdrop-blur-sm border border-glass-border text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Select language"
      >
        <Globe className="w-3.5 h-3.5" />
        <span>{selected.flag} {selected.code.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-glass-bg backdrop-blur-xl border border-glass-border shadow-xl z-50 overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-energy-emerald/10 transition-colors ${
                selected.code === lang.code ? "bg-energy-emerald/5 text-energy-emerald font-medium" : "text-foreground"
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {selected.code === lang.code && (
                <span className="ml-auto text-energy-emerald text-xs">Active</span>
              )}
            </button>
          ))}
          <div className="px-4 py-2 border-t border-glass-border">
            <p className="text-xs text-muted-foreground">
              Full translation coming soon. Currently English only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
