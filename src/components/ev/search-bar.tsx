"use client"

import { Search, SlidersHorizontal } from "lucide-react"
import { useState } from "react"

interface SearchBarProps {
  onFilterClick: () => void
}

export function SearchBar({ onFilterClick }: SearchBarProps) {
  const [query, setQuery] = useState("")

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search Location"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl glass-bg border border-border/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-energy-emerald/50 focus:ring-1 focus:ring-energy-emerald/20 transition-all"
        />
      </div>
      <button
        onClick={onFilterClick}
        className="p-3 rounded-xl glass-bg border border-border/50 hover:border-energy-emerald/30 hover:bg-energy-emerald/5 transition-all"
      >
        <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
      </button>
    </div>
  )
}
