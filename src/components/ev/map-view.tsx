"use client"

import { MapPin, Star, Navigation } from "lucide-react"

const markers = [
  { id: 1, x: 25, y: 20, available: true },
  { id: 2, x: 35, y: 25, available: true },
  { id: 3, x: 45, y: 35, available: true },
  { id: 4, x: 30, y: 45, available: false },
  { id: 5, x: 55, y: 50, available: true },
  { id: 6, x: 20, y: 55, available: true },
  { id: 7, x: 40, y: 60, available: true },
  { id: 8, x: 60, y: 40, available: true },
  { id: 9, x: 70, y: 65, available: true },
  { id: 10, x: 50, y: 75, available: true },
  { id: 11, x: 65, y: 80, available: true },
]

export function MapView() {
  return (
    <div className="space-y-3">
      {/* Map container */}
      <div className="relative glass-card rounded-2xl border border-border/50 overflow-hidden h-[400px]">
        {/* Map background - stylized */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100/50 to-cyan-50/50 dark:from-teal-900/20 dark:to-cyan-900/20">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          {/* Stylized land mass */}
          <div className="absolute top-[10%] left-[5%] w-[60%] h-[80%] bg-stone-200/80 dark:bg-stone-800/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%]" />
          
          {/* Station markers */}
          {markers.map((marker) => (
            <button
              key={marker.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110 ${
                marker.available ? "z-10" : "z-0"
              }`}
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            >
              <div className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
                marker.available 
                  ? "bg-gradient-to-br from-energy-emerald to-energy-teal" 
                  : "bg-gray-400 dark:bg-gray-600"
              }`}>
                {/* Plug icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M12 2v6M8 2v4M16 2v4M8 6h8M10 10v4M14 10v4M8 14h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4a2 2 0 012-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {/* Pulse effect for available */}
                {marker.available && (
                  <div className="absolute inset-0 rounded-full bg-energy-emerald/30 animate-ping" />
                )}
              </div>
              {/* Pointer */}
              <div className={`absolute left-1/2 -translate-x-1/2 -bottom-1 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent ${
                marker.available ? "border-t-energy-teal" : "border-t-gray-400 dark:border-t-gray-600"
              }`} />
            </button>
          ))}
        </div>

        {/* Locate me button */}
        <button className="absolute bottom-4 right-4 p-3 rounded-full glass-bg border border-border/50 shadow-lg hover:border-energy-emerald/30 transition-all">
          <Navigation className="w-5 h-5 text-energy-emerald" />
        </button>
      </div>

      {/* View favorites button */}
      <button className="w-full py-3 rounded-xl glass-bg border border-border/50 flex items-center justify-center gap-2 text-sm font-medium text-foreground hover:border-energy-emerald/30 transition-all">
        <Star className="w-4 h-4 text-amber-400" />
        View Favourites
      </button>
    </div>
  )
}
