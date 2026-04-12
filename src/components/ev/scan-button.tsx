"use client"

import { ScanLine } from "lucide-react"

export function ScanButton() {
  return (
    <button className="fixed bottom-24 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-semibold shadow-lg shadow-energy-emerald/30 hover:shadow-energy-emerald/50 hover:scale-105 transition-all">
      <ScanLine className="w-5 h-5" />
      Scan
    </button>
  )
}
