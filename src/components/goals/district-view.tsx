"use client"

import { useState } from "react"
import { ChevronDown, Zap, TrendingUp, Info, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { ConsumptionChart } from "./consumption-chart"

export function DistrictView() {
  const [district, setDistrict] = useState("D2 (Anson, Tanjong Pagar)")
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false)

  const districts = [
    "D1 (Raffles Place, Marina)",
    "D2 (Anson, Tanjong Pagar)",
    "D3 (Queenstown, Tiong Bahru)",
    "D4 (Telok Blangah, Harbourfront)",
    "D5 (Pasir Panjang, Clementi)",
  ]

  return (
    <div className="space-y-4">
      {/* District Selector */}
      <div className="relative">
        <button
          onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
          className="flex items-center gap-2 text-lg font-semibold text-foreground"
        >
          <MapPin className="w-5 h-5 text-energy-emerald" />
          {district}
          <ChevronDown className={`w-5 h-5 transition-transform ${showDistrictDropdown ? "rotate-180" : ""}`} />
        </button>

        {showDistrictDropdown && (
          <div className="absolute top-full left-0 mt-2 w-80 glass-bg rounded-xl border border-border/50 shadow-xl z-10 overflow-hidden max-h-64 overflow-y-auto">
            {districts.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setDistrict(d)
                  setShowDistrictDropdown(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                  district === d ? "text-energy-emerald font-medium" : "text-foreground"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* District Usage Summary Card */}
      <div className="glass-bg rounded-2xl p-5 border border-border/50 space-y-4">
        <div className="flex items-start gap-4">
          {/* District Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center relative">
            <div className="text-2xl">🏙️</div>
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 animate-pulse" />
          </div>

          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold text-energy-teal">3,385.59 MWh</span>
              <span className="text-muted-foreground">used in Mar 2026</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <TrendingUp className="w-4 h-4 text-rose-500" />
              <span>
                <strong className="text-rose-500">6.79% more</strong>
                <span className="text-muted-foreground"> electricity used than Feb 2026</span>
              </span>
            </div>
          </div>
        </div>

        {/* District comparison */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-muted/30">
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground">District Avg</p>
            <p className="text-lg font-semibold text-foreground">3,614.87 MWh</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground">Your Usage</p>
            <p className="text-lg font-semibold text-energy-emerald">3,061.31 MWh</p>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 text-center">
            <p className="text-xs text-muted-foreground">Best in District</p>
            <p className="text-lg font-semibold text-energy-teal">1,737.99 MWh</p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-bg rounded-2xl p-5 border border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">MWh</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <ConsumptionChart 
          data={[
            { month: "J", value: 2800, neighbor: 3200 },
            { month: "F", value: 3100, neighbor: 3400 },
            { month: "M", value: 3200, neighbor: 3500 },
            { month: "A", value: 3385, neighbor: 3614 },
            { month: "M", value: 0, neighbor: 0 },
            { month: "J", value: 0, neighbor: 0 },
            { month: "J", value: 0, neighbor: 0 },
            { month: "A", value: 0, neighbor: 0 },
            { month: "S", value: 0, neighbor: 0 },
            { month: "O", value: 0, neighbor: 0 },
            { month: "N", value: 0, neighbor: 0 },
            { month: "D", value: 0, neighbor: 0 },
          ]}
          unit="MWh"
          maxValue={5580}
          showTooltipOnMonth="A"
        />

        <p className="text-center text-xs text-muted-foreground">Billing Month</p>

        {/* Period Selector */}
        <div className="flex items-center justify-center gap-2">
          <button className="w-8 h-8 rounded-full glass-bg flex items-center justify-center hover:bg-muted/50 transition-colors">
            <ChevronLeft className="w-4 h-4 text-muted-foreground" />
          </button>
          <button className="flex items-center gap-1 px-4 py-2 glass-bg rounded-xl text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
            THIS YEAR
            <ChevronDown className="w-4 h-4" />
          </button>
          <button className="w-8 h-8 rounded-full glass-bg flex items-center justify-center hover:bg-muted/50 transition-colors">
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  )
}
