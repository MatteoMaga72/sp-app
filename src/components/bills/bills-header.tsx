"use client"

import { HelpCircle } from "lucide-react"

export function BillsHeader() {
  return (
    <header className="flex items-center justify-between py-4">
      <div className="w-12" />
      <h1 className="text-xl font-semibold text-foreground">Bills</h1>
      <button className="flex items-center gap-1 text-energy-emerald hover:text-energy-teal transition-colors">
        <span className="text-sm font-medium">Help</span>
      </button>
    </header>
  )
}
