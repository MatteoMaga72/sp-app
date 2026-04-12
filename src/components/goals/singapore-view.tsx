"use client"

import { TrendingDown, Info, ChevronLeft, ChevronRight, ChevronDown, Globe } from "lucide-react"
import { ConsumptionChart } from "./consumption-chart"

export function SingaporeView() {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Globe className="w-5 h-5 text-energy-emerald" />
        <h3 className="text-lg font-semibold text-foreground">Singapore National Grid</h3>
      </div>

      {/* National Usage Summary Card */}
      <div className="glass-bg rounded-2xl p-5 border border-border/50 space-y-4">
        <div className="flex items-start gap-4">
          {/* Singapore Icon */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500/20 to-pink-500/20 flex items-center justify-center">
            <span className="text-2xl">🇸🇬</span>
          </div>

          <div className="flex-1">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl font-bold text-energy-emerald">4,892.31 GWh</span>
              <span className="text-muted-foreground">used in Mar 2026</span>
            </div>

            <div className="flex items-center gap-2 mt-2 text-sm">
              <TrendingDown className="w-4 h-4 text-energy-emerald" />
              <span>
                <strong className="text-energy-emerald">2.3% less</strong>
                <span className="text-muted-foreground"> than same period last year</span>
              </span>
            </div>
          </div>
        </div>

        {/* National stats grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">Peak Demand</p>
            <p className="text-lg font-semibold text-foreground">7,245 MW</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">Renewable %</p>
            <p className="text-lg font-semibold text-energy-emerald">12.8%</p>
          </div>
          <div className="p-3 rounded-xl bg-muted/30 text-center">
            <p className="text-xs text-muted-foreground">Carbon Saved</p>
            <p className="text-lg font-semibold text-energy-teal">142k tons</p>
          </div>
        </div>

        {/* Your contribution */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-energy-emerald/10 to-energy-teal/10 border border-energy-emerald/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Your Contribution</p>
              <p className="text-foreground font-medium">
                You&apos;re in the top <strong className="text-energy-emerald">15%</strong> of energy savers!
              </p>
            </div>
            <div className="text-3xl">🏆</div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="glass-bg rounded-2xl p-5 border border-border/50 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">GWh</span>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Info className="w-4 h-4" />
          </button>
        </div>

        <ConsumptionChart 
          data={[
            { month: "J", value: 5100, neighbor: 5300 },
            { month: "F", value: 4800, neighbor: 5100 },
            { month: "M", value: 4892, neighbor: 5000 },
            { month: "A", value: 4750, neighbor: 4900 },
            { month: "M", value: 0, neighbor: 0 },
            { month: "J", value: 0, neighbor: 0 },
            { month: "J", value: 0, neighbor: 0 },
            { month: "A", value: 0, neighbor: 0 },
            { month: "S", value: 0, neighbor: 0 },
            { month: "O", value: 0, neighbor: 0 },
            { month: "N", value: 0, neighbor: 0 },
            { month: "D", value: 0, neighbor: 0 },
          ]}
          unit="GWh"
          maxValue={6000}
        />

        <p className="text-center text-xs text-muted-foreground">Month (2026)</p>

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
