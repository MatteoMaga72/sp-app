"use client"

import { useState } from "react"
import { EVHeader } from "@/components/ev/ev-header"
import { CostComparison } from "@/components/ev/cost-comparison"
import { SearchBar } from "@/components/ev/search-bar"
import { ViewToggle } from "@/components/ev/view-toggle"
import { ChargerFilters } from "@/components/ev/charger-filters"
import { StationList } from "@/components/ev/station-list"
import { MapView } from "@/components/ev/map-view"
import { FilterSheet } from "@/components/ev/filter-sheet"
import { ScanButton } from "@/components/ev/scan-button"

export default function EVChargingPage() {
  const [view, setView] = useState<"list" | "map">("list")
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    dc: true,
    ac: true,
    availableOnly: false,
    spOnly: false,
    powerRange: [0, 100] as [number, number]
  })

  return (
    <div className="min-h-screen bg-background pb-24">
      <EVHeader />
      
      <main className="px-4 py-4 space-y-4">
        <CostComparison />
        
        <SearchBar onFilterClick={() => setShowFilters(true)} />
        
        <div className="flex items-center justify-between">
          <ViewToggle view={view} onViewChange={setView} />
          <ChargerFilters filters={filters} onFiltersChange={setFilters} />
        </div>
        
        {view === "list" ? (
          <StationList filters={filters} />
        ) : (
          <MapView />
        )}
      </main>
      
      <ScanButton />
      
      <FilterSheet 
        open={showFilters} 
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  )
}
