"use client";

import { Bell, Leaf } from "lucide-react";
import { SPLogo } from "@/components/ui/sp-logo";
import { LanguageSelector } from "@/components/ui/language-selector";

export function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center shadow-lg shadow-energy-emerald/25">
            <span className="text-lg font-semibold text-primary-foreground">M</span>
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-energy-emerald flex items-center justify-center ring-2 ring-background">
            <Leaf className="w-3 h-3 text-primary-foreground" />
          </div>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Good evening</p>
          <p className="text-lg font-semibold text-foreground">Matteo</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <LanguageSelector />
        <SPLogo size="sm" />
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-energy-emerald/15 border border-energy-emerald/30">
          <div className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-pulse" />
          <span className="text-xs font-medium text-energy-emerald">Saved $24.50</span>
        </div>

        <button className="relative w-10 h-10 rounded-full bg-glass-bg backdrop-blur-xl border border-glass-border flex items-center justify-center transition-all hover:bg-secondary active:scale-95">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
            3
          </span>
        </button>
      </div>
    </header>
  );
}
