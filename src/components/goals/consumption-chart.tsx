"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface ChartData {
  month: string
  value: number
  neighbor: number
}

interface ConsumptionChartProps {
  data: ChartData[]
  unit: string
  maxValue: number
  showTooltipOnMonth?: string
}

export function ConsumptionChart({ data, unit, maxValue, showTooltipOnMonth }: ConsumptionChartProps) {
  const [activeBar, setActiveBar] = useState<number | null>(
    showTooltipOnMonth ? data.findIndex(d => d.month === showTooltipOnMonth) : null
  )

  // Calculate height percentages
  const getHeight = (value: number) => {
    if (value === 0) return 0
    return Math.max(8, (value / maxValue) * 100)
  }

  // Get neighbor line points
  const neighborPoints = data
    .filter(d => d.neighbor > 0)
    .map((d, i, arr) => {
      const x = (data.indexOf(d) / (data.length - 1)) * 100
      const y = 100 - getHeight(d.neighbor)
      return { x, y, index: data.indexOf(d) }
    })

  return (
    <div className="relative h-48">
      {/* Y-axis labels */}
      <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between text-xs text-muted-foreground">
        <span>{maxValue.toLocaleString()}</span>
        <span>{Math.round(maxValue / 2).toLocaleString()}</span>
        <span>0</span>
      </div>

      {/* Chart area */}
      <div className="absolute left-12 right-0 top-0 bottom-0">
        {/* Grid lines */}
        <div className="absolute inset-x-0 top-0 border-b border-dashed border-muted-foreground/20" />
        <div className="absolute inset-x-0 top-1/2 border-b border-dashed border-muted-foreground/20" />
        <div className="absolute inset-x-0 bottom-6 border-b border-muted-foreground/20" />

        {/* Neighbor average line (dashed) */}
        {neighborPoints.length > 1 && (
          <svg className="absolute inset-x-0 top-0 bottom-6 overflow-visible" preserveAspectRatio="none">
            <path
              d={neighborPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x}% ${p.y}%`).join(" ")}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 4"
              className="text-muted-foreground"
            />
          </svg>
        )}

        {/* Bars */}
        <div className="absolute inset-x-0 top-0 bottom-6 flex items-end justify-around px-2">
          {data.map((d, index) => (
            <div 
              key={index} 
              className="relative flex flex-col items-center gap-1 flex-1"
              onMouseEnter={() => d.value > 0 && setActiveBar(index)}
              onMouseLeave={() => !showTooltipOnMonth && setActiveBar(null)}
            >
              {/* Bar */}
              <div
                className={`w-full max-w-8 rounded-t-md transition-all cursor-pointer ${
                  d.value > 0 
                    ? "bg-gradient-to-t from-energy-teal/80 to-energy-emerald/60 hover:from-energy-teal hover:to-energy-emerald"
                    : "bg-muted/30"
                }`}
                style={{ height: `${getHeight(d.value)}%`, minHeight: d.value > 0 ? "8px" : "4px" }}
              />

              {/* Tooltip */}
              {activeBar === index && d.value > 0 && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-foreground text-background rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                    <div className="flex items-center justify-between gap-4 mb-1">
                      <span className="font-medium">{d.month === "A" ? "April" : d.month === "J" ? "January" : d.month === "F" ? "February" : d.month === "M" ? "March" : d.month}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveBar(null)
                        }}
                        className="hover:opacity-70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-energy-emerald" />
                        <span>{d.value.toLocaleString()} {unit}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-0.5 bg-muted-foreground" style={{ borderStyle: "dashed" }} />
                        <span>{d.neighbor.toLocaleString()} {unit}</span>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 inset-x-0 h-6 flex justify-around px-2">
          {data.map((d, index) => (
            <span 
              key={index} 
              className={`text-xs flex-1 text-center ${
                activeBar === index ? "text-energy-emerald font-medium" : "text-muted-foreground"
              }`}
            >
              {d.month}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
