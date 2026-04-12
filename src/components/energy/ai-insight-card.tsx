"use client";

import { Sparkles, ArrowRight, X } from "lucide-react";
import { useState } from "react";

export function AIInsightCard() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative p-4 rounded-2xl bg-gradient-to-br from-energy-emerald/10 via-energy-teal/10 to-energy-cyan/5 border border-energy-emerald/20 backdrop-blur-xl overflow-hidden mb-4">
      <div className="absolute inset-0 bg-gradient-to-r from-energy-emerald/5 via-transparent to-energy-teal/5 animate-pulse" />

      <button
        onClick={() => setDismissed(true)}
        className="absolute top-3 right-3 w-6 h-6 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-secondary transition-colors z-10"
      >
        <X className="w-3 h-3 text-muted-foreground" />
      </button>

      <div className="relative flex gap-3">
        <div className="flex-shrink-0">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center shadow-lg shadow-energy-emerald/30">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
            <div className="absolute inset-0 rounded-xl bg-energy-emerald/30 blur-md -z-10" />
          </div>
        </div>

        <div className="flex-1 pr-6">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-energy-emerald uppercase tracking-wide">AI Insight</span>
            <div className="w-1 h-1 rounded-full bg-energy-emerald animate-pulse" />
          </div>
          <p className="text-sm text-foreground leading-relaxed mb-3">
            Your AC spiked 2-5PM yesterday — adjust your thermostat schedule to{" "}
            <span className="font-semibold text-energy-emerald">save $8/month</span>
          </p>

          <button className="group flex items-center gap-2 text-xs font-medium text-energy-emerald hover:text-energy-teal transition-colors">
            <span>View recommendation</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
