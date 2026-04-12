"use client"

import { Leaf } from "lucide-react"

export function RenewablePromo() {
  return (
    <div className="glass-bg rounded-2xl p-4 border border-border/50 hover:border-energy-emerald/30 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-energy-teal/20 flex items-center justify-center shrink-0 relative overflow-hidden">
          <div className="text-2xl">☀️</div>
          <div className="absolute inset-0 bg-gradient-to-t from-energy-emerald/20 to-transparent" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-foreground font-medium leading-tight">
            Green your electricity consumption & support renewable energy generation
          </p>
          <p className="text-muted-foreground text-sm mt-1">SP app</p>
        </div>

        {/* Points Badge */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-energy-emerald/30 text-energy-emerald text-sm font-medium shrink-0 group-hover:bg-energy-emerald/10 transition-colors">
          <span>+ 20</span>
          <Leaf className="w-4 h-4" />
        </div>
      </div>
    </div>
  )
}
