"use client"

import { List, Map } from "lucide-react"

interface ViewToggleProps {
  view: "list" | "map"
  onViewChange: (view: "list" | "map") => void
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="inline-flex rounded-lg p-1 glass-bg border border-border/50">
      <button
        onClick={() => onViewChange("list")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          view === "list"
            ? "bg-gradient-to-r from-energy-emerald to-energy-teal text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <List className="w-3.5 h-3.5" />
        List
      </button>
      <button
        onClick={() => onViewChange("map")}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
          view === "map"
            ? "bg-gradient-to-r from-energy-emerald to-energy-teal text-white shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <Map className="w-3.5 h-3.5" />
        Map
      </button>
    </div>
  )
}
