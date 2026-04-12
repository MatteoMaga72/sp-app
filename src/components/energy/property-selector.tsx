"use client";

import { useState } from "react";
import { ChevronDown, Zap, Droplets } from "lucide-react";

export function PropertySelector() {
  const [activeTab, setActiveTab] = useState<"electricity" | "water">("electricity");

  return (
    <div className="mb-4 space-y-3">
      <button className="flex items-center gap-2 group">
        <span className="text-lg font-semibold text-foreground">18 Everton Rd</span>
        <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
      </button>

      <div className="flex items-center gap-2 p-1 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border w-fit">
        <button
          onClick={() => setActiveTab("electricity")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
            activeTab === "electricity"
              ? "bg-gradient-to-r from-energy-emerald to-energy-teal shadow-lg shadow-energy-emerald/20"
              : "hover:bg-secondary/50"
          }`}
        >
          <Zap className={`w-4 h-4 ${activeTab === "electricity" ? "text-white" : "text-muted-foreground"}`} />
          <span className={`text-sm font-medium ${activeTab === "electricity" ? "text-white" : "text-muted-foreground"}`}>
            Electricity
          </span>
        </button>
        <button
          onClick={() => setActiveTab("water")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
            activeTab === "water"
              ? "bg-gradient-to-r from-energy-teal to-energy-cyan shadow-lg shadow-energy-teal/20"
              : "hover:bg-secondary/50"
          }`}
        >
          <Droplets className={`w-4 h-4 ${activeTab === "water" ? "text-white" : "text-muted-foreground"}`} />
          <span className={`text-sm font-medium ${activeTab === "water" ? "text-white" : "text-muted-foreground"}`}>
            Water
          </span>
        </button>
      </div>
    </div>
  );
}
