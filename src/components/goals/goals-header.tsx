"use client"

import { X, HelpCircle } from "lucide-react"
import Link from "next/link"

export function GoalsHeader() {
  return (
    <header className="sticky top-0 z-50 glass-bg border-b border-border/50">
      <div className="flex items-center justify-between px-4 py-4">
        <Link 
          href="/"
          className="w-10 h-10 rounded-full glass-bg flex items-center justify-center hover:bg-muted/50 transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </Link>
        
        <h1 className="text-lg font-semibold text-foreground">Green Goals</h1>
        
        <button className="w-10 h-10 rounded-full flex items-center justify-center text-energy-emerald hover:bg-energy-emerald/10 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
}
