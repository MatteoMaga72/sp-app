"use client"

import { useState } from "react"
import { ChevronDown, Zap, TrendingDown, DollarSign, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { ConsumptionChart } from "./consumption-chart"

export function YourHomeView() {
  const [property, setProperty] = useState("18 Everton Rd")
  const [showPropertyDropdown, setShowPropertyDropdown] = useState(false)
  const [chartPeriod, setChartPeriod] = useState<"half-hourly" | "daily" | "monthly">("monthly")

  const properties = ["18 Everton Rd", "25 Orchard Rd", "42 Marina Bay"]

  return (
    <div className="space-y-4">
      {/* Property Selector */}
      <div className="relative">
        <button
          onClick={() => setShowPropertyDropdown(!showPropertyDropdown)}
          className="flex items-center gap-2 text-lg font-semibold text-foreground"
        >
          {property}
          <ChevronDown className={`w-5 h-5 transition-transform ${showPropertyDropdown ? "rotate-180" : ""}`} />
        </button>

        {showPropertyDropdown && (
          <div className="absolute top-full left-0 mt-2 w-64 glass-bg rounded-xl border border-border/50 shadow-xl z-10 overflow-hidden">
            {properties.map((p) => (
              <button
                key={p}
                onClick={() => {
                  setProperty(p)
                  setShowPropertyDropdown(false)
                }}
                className={`w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors ${
                  property === p ? "text-energy-emerald font-medium" : "text-foreground"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Usage Summary Card */}
      <div className="glass-bg rounded-2xl p-5 border border-border/50 space-y-4">
        <div className="flex items-start gap-4">
          {/* Building Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-energy-teal/20 to-energy-emerald/20 flex items-center justify-center relative">
            <div className="text-2xl">🏢</div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-energy-emerald flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold text-energy-emerald">324.00 kWh</span>
              <span className="text-muted-foreground">used in Mar 2026</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-energy-emerald" />
              <span>
                <strong className="text-energy-emerald">19.20% less</strong>
                <span className="text-muted-foreground"> electricity used than Feb 2026</span>
              </span>
            </div>

            <div className="flex items-center gap-2 mt-1 text-sm">
              <DollarSign className="w-4 h-4 text-energy-teal" />
              <span>
                <strong className="text-foreground">$24.50</strong>
                <span className="text-muted-foreground"> estimated bill savings</span>
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-energy-emerald to-energy-teal rounded-full transition-all relative"
              style={{ width: "26.7%" }}
            >
              <div className="absolute inset-0 bg-white/20 animate-shine" />
            </div>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Used <strong className="text-foreground">77.98 kWh</strong> this month
            </span>
            <span className="text-muted-foreground">
              Target {"<"} <strong className="text-foreground">292.50 kWh</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-bg rounded-2xl p-5 border border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">kWh</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <ConsumptionChart 
          data={[
            { month: "J", value: 380, neighbor: 420 },
            { month: "F", value: 400, neighbor: 430 },
            { month: "M", value: 324, neighbor: 410 },
            { month: "A", value: 350, neighbor: 400 },
            { month: "M", value: 0, neighbor: 0 },
            { month: "J", value: 0, neighbor: 0 },
            { month: "J", value: 0, neighbor: 0 },
            { month: "A", value: 0, neighbor: 0 },
            { month: "S", value: 0, neighbor: 0 },
            { month: "O", value: 0, neighbor: 0 },
            { month: "N", value: 0, neighbor: 0 },
            { month: "D", value: 0, neighbor: 0 },
          ]}
          unit="kWh"
          maxValue={690}
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

        {/* Chart Type Toggle */}
        <div className="flex justify-center gap-2">
          {["half-hourly", "daily", "monthly"].map((period) => (
            <button
              key={period}
              onClick={() => setChartPeriod(period as typeof chartPeriod)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                chartPeriod === period
                  ? "bg-energy-emerald text-white"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {period.replace("-", " ")}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
