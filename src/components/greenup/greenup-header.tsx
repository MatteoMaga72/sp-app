"use client"

import { HelpCircle, Leaf } from "lucide-react"

export function GreenUpHeader() {
  return (
    <header className="flex items-center justify-between py-4 pt-6">
      {/* Logo with Supercell style */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <div className="relative px-4 py-2 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-xl border-4 border-emerald-800 shadow-[0_4px_0_#064e3b,0_6px_12px_rgba(0,0,0,0.3)]">
            <div className="absolute inset-x-2 top-1 h-2 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
            <span className="text-2xl font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)] tracking-tight">
              Green<span className="text-teal-200">UP</span>
            </span>
          </div>
          <Leaf className="absolute -top-2 -right-2 w-5 h-5 text-teal-300 fill-teal-300" />
        </div>
      </div>

      {/* Help button */}
      <button className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-teal-400 dark:to-teal-500 rounded-xl border-4 border-slate-300 dark:border-teal-700 shadow-[0_4px_0_#94a3b8,0_6px_12px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_0_#0f766e,0_6px_12px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-[0_2px_0_#94a3b8] dark:active:shadow-[0_2px_0_#0f766e] transition-all">
        <div className="absolute inset-x-2 top-1 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
        <HelpCircle className="w-4 h-4 text-slate-600 dark:text-teal-900" />
        <span className="text-sm font-black text-slate-600 dark:text-teal-900">HELP</span>
      </button>
    </header>
  )
}
