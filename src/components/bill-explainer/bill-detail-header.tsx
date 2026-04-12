"use client"

import { ChevronLeft, ChevronRight, Share2, HelpCircle } from "lucide-react"
import Link from "next/link"

interface BillDetailHeaderProps {
  month: string
  onShowWizard: () => void
}

export function BillDetailHeader({ month, onShowWizard }: BillDetailHeaderProps) {
  return (
    <div className="flex items-center justify-between py-2">
      {/* Back Button */}
      <Link 
        href="/bills"
        className="w-10 h-10 rounded-xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-sm border border-glass-border flex items-center justify-center hover:bg-energy-emerald/10 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-foreground" />
      </Link>

      {/* Month Selector */}
      <div className="flex items-center gap-2">
        <button className="w-8 h-8 rounded-lg bg-glass-bg/30 dark:bg-slate-800/30 flex items-center justify-center hover:bg-energy-emerald/10 transition-colors">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="px-4 py-2 rounded-xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-sm border border-glass-border">
          <span className="text-base font-bold text-foreground">{month}</span>
        </div>
        <button className="w-8 h-8 rounded-lg bg-glass-bg/30 dark:bg-slate-800/30 flex items-center justify-center hover:bg-energy-emerald/10 transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button 
          onClick={onShowWizard}
          className="w-10 h-10 rounded-xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-sm border border-glass-border flex items-center justify-center hover:bg-energy-emerald/10 transition-colors"
        >
          <HelpCircle className="w-5 h-5 text-energy-emerald" />
        </button>
      </div>
    </div>
  )
}
