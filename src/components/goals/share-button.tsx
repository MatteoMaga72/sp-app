"use client"

import { Share2 } from "lucide-react"

export function ShareButton() {
  return (
    <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-semibold text-lg shadow-lg shadow-energy-emerald/25 hover:shadow-energy-emerald/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
      <Share2 className="w-5 h-5" />
      Share and Spread Sustainability
    </button>
  )
}
