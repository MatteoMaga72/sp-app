"use client"

import { Download, Share2, CreditCard } from "lucide-react"

export function BillActions() {
  return (
    <div className="space-y-3 pb-4">
      {/* Secondary Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border hover:bg-energy-emerald/10 hover:border-energy-emerald/30 transition-all">
          <Download className="w-5 h-5 text-energy-emerald" />
          <span className="text-sm font-semibold text-foreground">Download PDF</span>
        </button>
        <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border hover:bg-energy-emerald/10 hover:border-energy-emerald/30 transition-all">
          <Share2 className="w-5 h-5 text-energy-emerald" />
          <span className="text-sm font-semibold text-foreground">Share</span>
        </button>
      </div>

      {/* Primary CTA */}
      <button className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-bold text-base shadow-lg shadow-energy-emerald/30 hover:shadow-energy-emerald/50 hover:scale-[1.02] transition-all">
        <CreditCard className="w-5 h-5" />
        <span>Pay $154.08 Now</span>
      </button>
    </div>
  )
}
