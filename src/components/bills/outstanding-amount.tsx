"use client"

import { ChevronRight, ExternalLink, Zap, Droplets } from "lucide-react"

export function OutstandingAmount() {
  return (
    <div className="mb-4">
      <div className="rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border p-4 shadow-lg shadow-energy-emerald/5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Outstanding Amount</h2>
            <button className="flex items-center gap-1 text-energy-emerald text-sm font-medium mt-0.5 hover:text-energy-teal transition-colors">
              Understanding Your Bill
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bill Details */}
        <div className="flex items-center justify-between py-3 border-t border-border/50">
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">18 Everton Rd Singapore 089374</p>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-energy-emerald" />
                <span className="text-xs text-muted-foreground">Electricity</span>
              </div>
              <span className="text-muted-foreground">&</span>
              <div className="flex items-center gap-1">
                <Droplets className="w-3.5 h-3.5 text-energy-cyan" />
                <span className="text-xs text-muted-foreground">Water</span>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">$130.20</p>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground">
              RECURRING
            </span>
          </div>
        </div>

        {/* Pay Now Button */}
        <button className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-energy-emerald/20">
          Pay Now
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
