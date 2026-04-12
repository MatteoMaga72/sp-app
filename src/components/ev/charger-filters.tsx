"use client"

import { Zap } from "lucide-react"

interface FilterState {
  dc: boolean
  ac: boolean
  availableOnly: boolean
  spOnly: boolean
  powerRange: [number, number]
}

interface ChargerFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function ChargerFilters({ filters, onFiltersChange }: ChargerFiltersProps) {
  const toggleFilter = (key: "dc" | "ac") => {
    onFiltersChange({ ...filters, [key]: !filters[key] })
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => toggleFilter("dc")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
          filters.dc
            ? "bg-gradient-to-r from-energy-emerald/10 to-energy-teal/10 border-energy-emerald/30 text-energy-emerald"
            : "glass-bg border-border/50 text-muted-foreground hover:border-energy-emerald/20"
        }`}
      >
        <Zap className="w-3 h-3" />
        DC
      </button>
      <button
        onClick={() => toggleFilter("ac")}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
          filters.ac
            ? "bg-gradient-to-r from-energy-emerald/10 to-energy-teal/10 border-energy-emerald/30 text-energy-emerald"
            : "glass-bg border-border/50 text-muted-foreground hover:border-energy-emerald/20"
        }`}
      >
        <div className="w-3 h-3 rounded-full border border-current flex items-center justify-center">
          <div className="w-1 h-1 rounded-full bg-current" />
        </div>
        AC
      </button>
    </div>
  )
}
