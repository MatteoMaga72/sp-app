"use client"

import { useState } from "react"
import { Fuel, Zap, TrendingDown, ChevronRight } from "lucide-react"

export function CostComparison() {
  const [distance] = useState(100)
  
  const petrolCost = 18.50
  const evCost = 4.20
  const savings = petrolCost - evCost
  const savingsPercent = Math.round((savings / petrolCost) * 100)

  return (
    <div className="glass-card p-4 rounded-2xl border border-border/50 relative overflow-hidden group cursor-pointer hover:border-energy-emerald/30 transition-all">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-energy-emerald/5 via-transparent to-energy-teal/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center">
              <TrendingDown className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Cost Comparison</h3>
              <p className="text-xs text-muted-foreground">Per {distance} km drive</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </div>
        
        {/* Comparison cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Petrol */}
          <div className="bg-card/50 rounded-xl p-3 border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-orange-500/10 flex items-center justify-center">
                <Fuel className="w-3.5 h-3.5 text-orange-500" />
              </div>
              <span className="text-xs text-muted-foreground">Petrol</span>
            </div>
            <p className="text-lg font-bold text-foreground">${petrolCost.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground">~6.2L @ $2.98/L</p>
          </div>
          
          {/* EV */}
          <div className="bg-gradient-to-br from-energy-emerald/10 to-energy-teal/10 rounded-xl p-3 border border-energy-emerald/20">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-energy-emerald/20 flex items-center justify-center">
                <Zap className="w-3.5 h-3.5 text-energy-emerald" />
              </div>
              <span className="text-xs text-muted-foreground">EV</span>
            </div>
            <p className="text-lg font-bold text-energy-emerald">${evCost.toFixed(2)}</p>
            <p className="text-[10px] text-muted-foreground">~14kWh @ $0.30/kWh</p>
          </div>
        </div>
        
        {/* Savings badge */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-energy-emerald/10 to-energy-teal/10 border border-energy-emerald/20">
            <Zap className="w-4 h-4 text-energy-emerald" />
            <span className="text-sm font-semibold text-energy-emerald">
              Save ${savings.toFixed(2)} ({savingsPercent}%)
            </span>
            <span className="text-xs text-muted-foreground">with EV</span>
          </div>
        </div>
      </div>
    </div>
  )
}
