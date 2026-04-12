"use client"

import { X, Zap, Check } from "lucide-react"
import { useState, useEffect } from "react"

interface FilterState {
  dc: boolean
  ac: boolean
  availableOnly: boolean
  spOnly: boolean
  powerRange: [number, number]
}

interface FilterSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function FilterSheet({ open, onOpenChange, filters, onFiltersChange }: FilterSheetProps) {
  const [localFilters, setLocalFilters] = useState(filters)

  useEffect(() => {
    if (open) {
      // Sync local state when sheet opens — filters is external prop
      const timeout = setTimeout(() => setLocalFilters(filters), 0)
      return () => clearTimeout(timeout)
    }
  }, [open, filters])

  const handleReset = () => {
    setLocalFilters({
      dc: true,
      ac: true,
      availableOnly: false,
      spOnly: false,
      powerRange: [0, 100]
    })
  }

  const handleApply = () => {
    onFiltersChange(localFilters)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[85vh] overflow-auto animate-in slide-in-from-bottom duration-300">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <button 
            onClick={() => onOpenChange(false)}
            className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
          <h2 className="text-lg font-semibold text-foreground">Filter</h2>
          <button 
            onClick={handleReset}
            className="text-energy-emerald text-sm font-medium hover:text-energy-teal transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Charger Types */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Types</h3>
            <div className="space-y-3">
              {/* DC Chargers */}
              <button
                onClick={() => setLocalFilters(f => ({ ...f, dc: !f.dc }))}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-energy-emerald/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                  </div>
                  <span className="text-sm font-medium text-foreground">DC Chargers</span>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  localFilters.dc 
                    ? "bg-energy-emerald border-energy-emerald" 
                    : "border-muted-foreground/30"
                }`}>
                  {localFilters.dc && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>

              {/* AC Chargers */}
              <button
                onClick={() => setLocalFilters(f => ({ ...f, ac: !f.ac }))}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-energy-emerald/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full border-2 border-slate-600 dark:border-slate-400 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-600 dark:bg-slate-400" />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-foreground">AC Chargers</span>
                </div>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  localFilters.ac 
                    ? "bg-energy-emerald border-energy-emerald" 
                    : "border-muted-foreground/30"
                }`}>
                  {localFilters.ac && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            </div>
          </div>

          {/* Charging Power */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Charging Power</h3>
              <span className="text-sm text-muted-foreground">
                {localFilters.powerRange[0]} - {localFilters.powerRange[1]}+ kW
              </span>
            </div>
            
            {/* Range slider track */}
            <div className="relative h-2 mt-6 mb-8">
              <div className="absolute inset-0 rounded-full bg-muted" />
              <div 
                className="absolute h-full rounded-full bg-gradient-to-r from-energy-emerald to-energy-teal"
                style={{ 
                  left: `${localFilters.powerRange[0]}%`, 
                  right: `${100 - localFilters.powerRange[1]}%` 
                }}
              />
              {/* Min handle */}
              <input
                type="range"
                min="0"
                max="100"
                value={localFilters.powerRange[0]}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (val < localFilters.powerRange[1]) {
                    setLocalFilters(f => ({ ...f, powerRange: [val, f.powerRange[1]] }))
                  }
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              {/* Max handle */}
              <input
                type="range"
                min="0"
                max="100"
                value={localFilters.powerRange[1]}
                onChange={(e) => {
                  const val = parseInt(e.target.value)
                  if (val > localFilters.powerRange[0]) {
                    setLocalFilters(f => ({ ...f, powerRange: [f.powerRange[0], val] }))
                  }
                }}
                className="absolute inset-0 w-full opacity-0 cursor-pointer"
              />
              {/* Visual handles */}
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-energy-emerald border-2 border-white shadow-md"
                style={{ left: `calc(${localFilters.powerRange[0]}% - 10px)` }}
              />
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-energy-emerald border-2 border-white shadow-md"
                style={{ left: `calc(${localFilters.powerRange[1]}% - 10px)` }}
              />
            </div>

            {/* Scale markers */}
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0</span>
              <span>20</span>
              <span>40</span>
              <span>60</span>
              <span>80</span>
              <span>100</span>
              <span>10...</span>
            </div>
          </div>

          {/* Additional filters */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Only show</h3>
            <div className="space-y-3">
              {/* Available Chargers */}
              <button
                onClick={() => setLocalFilters(f => ({ ...f, availableOnly: !f.availableOnly }))}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-energy-emerald/30 transition-all"
              >
                <span className="text-sm font-medium text-foreground">Available Chargers</span>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  localFilters.availableOnly 
                    ? "bg-energy-emerald border-energy-emerald" 
                    : "border-muted-foreground/30"
                }`}>
                  {localFilters.availableOnly && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>

              {/* SP Chargers */}
              <button
                onClick={() => setLocalFilters(f => ({ ...f, spOnly: !f.spOnly }))}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-border/50 hover:border-energy-emerald/30 transition-all"
              >
                <span className="text-sm font-medium text-foreground">SP Chargers</span>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  localFilters.spOnly 
                    ? "bg-energy-emerald border-energy-emerald" 
                    : "border-muted-foreground/30"
                }`}>
                  {localFilters.spOnly && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Apply button */}
        <div className="p-4 border-t border-border/50">
          <button
            onClick={handleApply}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-semibold text-sm shadow-lg shadow-energy-emerald/25 hover:shadow-energy-emerald/40 transition-all"
          >
            Apply
          </button>
        </div>
      </div>
    </>
  )
}
