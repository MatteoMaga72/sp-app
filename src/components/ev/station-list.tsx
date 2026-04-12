"use client"

import { MapPin, Zap, Star, Navigation } from "lucide-react"

interface FilterState {
  dc: boolean
  ac: boolean
  availableOnly: boolean
  spOnly: boolean
  powerRange: [number, number]
}

interface Station {
  id: string
  name: string
  network: string
  distance: string
  address: string
  chargers: {
    type: "AC" | "DC"
    power: number
    available: number
    total: number
  }[]
  isFavorite: boolean
  isSpCharger: boolean
}

const stations: Station[] = [
  {
    id: "1",
    name: "Gurney Plaza",
    network: "JomCharge",
    distance: "9672.95km",
    address: "55 Persiaran Gurney",
    chargers: [
      { type: "AC", power: 40, available: 7, total: 7 }
    ],
    isFavorite: true,
    isSpCharger: true
  },
  {
    id: "2",
    name: "New World Park, Penang",
    network: "JomCharge",
    distance: "9674.58km",
    address: "102 Jalan Burma",
    chargers: [
      { type: "DC", power: 120, available: 1, total: 2 }
    ],
    isFavorite: false,
    isSpCharger: false
  },
  {
    id: "3",
    name: "Lexus Penang",
    network: "JomCharge",
    distance: "9674.87km",
    address: "26, Jln Sultan Ahmad Shah, George Town",
    chargers: [
      { type: "DC", power: 60, available: 2, total: 2 }
    ],
    isFavorite: false,
    isSpCharger: true
  },
  {
    id: "4",
    name: "The Granite Luxury Hotel",
    network: "M Summit 191 / JomCharge",
    distance: "9675.33km",
    address: "191A, Jalan Magazine, George Town",
    chargers: [
      { type: "AC", power: 40, available: 1, total: 1 },
      { type: "DC", power: 50, available: 2, total: 2 }
    ],
    isFavorite: true,
    isSpCharger: false
  },
  {
    id: "5",
    name: "Queensbay Mall",
    network: "ChargEV",
    distance: "9676.12km",
    address: "100, Persiaran Bayan Indah",
    chargers: [
      { type: "DC", power: 150, available: 3, total: 4 }
    ],
    isFavorite: false,
    isSpCharger: true
  }
]

interface StationListProps {
  filters: FilterState
}

export function StationList({ filters }: StationListProps) {
  const filteredStations = stations.filter(station => {
    if (filters.availableOnly) {
      const hasAvailable = station.chargers.some(c => c.available > 0)
      if (!hasAvailable) return false
    }
    if (filters.spOnly && !station.isSpCharger) return false
    
    const hasMatchingCharger = station.chargers.some(c => {
      if (c.type === "DC" && !filters.dc) return false
      if (c.type === "AC" && !filters.ac) return false
      if (c.power < filters.powerRange[0] || c.power > filters.powerRange[1]) return false
      return true
    })
    return hasMatchingCharger
  })

  return (
    <div className="space-y-3">
      {/* Column headers */}
      <div className="flex items-center justify-between px-2 text-xs text-muted-foreground">
        <span>Charging points</span>
        <span>Available/Total</span>
      </div>

      {/* Station cards */}
      {filteredStations.map((station) => (
        <div
          key={station.id}
          className="glass-card rounded-2xl p-4 border border-border/50 hover:border-energy-emerald/30 transition-all cursor-pointer group"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Station name and favorite */}
              <div className="flex items-start gap-2 mb-1">
                <h3 className="font-semibold text-foreground text-sm leading-tight">
                  {station.name}
                </h3>
                {station.isFavorite && (
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                )}
              </div>
              
              {/* Network */}
              <p className="text-xs text-muted-foreground mb-2">({station.network})</p>
              
              {/* Distance and address */}
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{station.distance} • {station.address}</span>
              </div>
            </div>

            {/* Charger availability */}
            <div className="flex flex-col items-end gap-2">
              {station.chargers.map((charger, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  {/* Availability */}
                  <div className="text-right">
                    <span className={`text-lg font-bold ${
                      charger.available === 0 
                        ? "text-red-500" 
                        : charger.available === charger.total 
                          ? "text-energy-emerald" 
                          : "text-amber-500"
                    }`}>
                      {charger.available}
                    </span>
                    <span className="text-sm text-muted-foreground">/{charger.total}</span>
                  </div>
                  
                  {/* Charger type badge */}
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                    charger.type === "DC"
                      ? "bg-slate-800 text-white dark:bg-slate-700"
                      : "bg-energy-emerald/10 text-energy-emerald border border-energy-emerald/20"
                  }`}>
                    {charger.type} {charger.power}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SP Charger badge */}
          {station.isSpCharger && (
            <div className="mt-3 pt-3 border-t border-border/30">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-energy-emerald/10 text-energy-emerald text-[10px] font-medium">
                <Zap className="w-3 h-3" />
                SP Charger
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Empty state */}
      {filteredStations.length === 0 && (
        <div className="glass-card rounded-2xl p-8 border border-border/50 text-center">
          <Navigation className="w-12 h-12 mx-auto text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground">No charging stations match your filters</p>
          <p className="text-xs text-muted-foreground/70 mt-1">Try adjusting your filter settings</p>
        </div>
      )}
    </div>
  )
}
