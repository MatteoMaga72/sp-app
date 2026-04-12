"use client"

import { useState } from "react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from "recharts"

const timelineData = [
  { time: "6AM", solar: 0, consumption: 0.3, grid: 0.3 },
  { time: "7AM", solar: 0.5, consumption: 0.8, grid: 0.3 },
  { time: "8AM", solar: 1.2, consumption: 1.0, grid: -0.2 },
  { time: "9AM", solar: 2.1, consumption: 0.9, grid: -1.2 },
  { time: "10AM", solar: 2.8, consumption: 1.1, grid: -1.7 },
  { time: "11AM", solar: 3.2, consumption: 1.4, grid: -1.8 },
  { time: "12PM", solar: 3.5, consumption: 1.8, grid: -1.7 },
  { time: "1PM", solar: 3.3, consumption: 1.6, grid: -1.7 },
  { time: "2PM", solar: 3.0, consumption: 1.5, grid: -1.5 },
  { time: "3PM", solar: 2.5, consumption: 1.4, grid: -1.1 },
  { time: "4PM", solar: 1.8, consumption: 1.6, grid: -0.2 },
  { time: "5PM", solar: 0.8, consumption: 1.9, grid: 1.1 },
  { time: "6PM", solar: 0.2, consumption: 2.2, grid: 2.0 },
]

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-xl bg-popover/95 backdrop-blur-xl border border-glass-border shadow-xl">
        <p className="text-sm font-semibold text-foreground mb-2">{label}</p>
        <div className="space-y-1.5">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground capitalize">{entry.dataKey}:</span>
              <span className="text-xs font-semibold text-foreground">
                {Math.abs(entry.value).toFixed(1)} kW
                {entry.dataKey === "grid" && entry.value < 0 && " (export)"}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function FlowTimeline() {
  const [selectedRange, setSelectedRange] = useState<"today" | "week" | "month">("today")

  return (
    <div className="p-4 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Energy Timeline</h3>
        
        {/* Range selector */}
        <div className="flex rounded-lg bg-secondary p-0.5">
          {(["today", "week", "month"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-all ${
                selectedRange === range
                  ? "bg-energy-emerald text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="text-xs text-muted-foreground">Solar</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-energy-emerald" />
          <span className="text-xs text-muted-foreground">Consumption</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-energy-cyan" />
          <span className="text-xs text-muted-foreground">Grid</span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[180px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="consumptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gridGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
              </linearGradient>
            </defs>
            
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 10 }}
              dy={8}
              interval={2}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748b", fontSize: 10 }}
              width={35}
              tickFormatter={(value) => `${value}`}
              domain={[-2, 4]}
            />
            <Tooltip content={<CustomTooltip />} />
            <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" strokeOpacity={0.3} />
            
            <Area
              type="monotone"
              dataKey="solar"
              stroke="#f59e0b"
              strokeWidth={2}
              fill="url(#solarGradient)"
            />
            <Area
              type="monotone"
              dataKey="consumption"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#consumptionGradient)"
            />
            <Area
              type="monotone"
              dataKey="grid"
              stroke="#06b6d4"
              strokeWidth={2}
              fill="url(#gridGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary stats */}
      <div className="mt-4 pt-4 border-t border-glass-border grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-lg font-bold text-amber-500">18.2 kWh</p>
          <p className="text-xs text-muted-foreground">Generated</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-energy-emerald">12.5 kWh</p>
          <p className="text-xs text-muted-foreground">Consumed</p>
        </div>
        <div className="text-center">
          <p className="text-lg font-bold text-energy-cyan">5.7 kWh</p>
          <p className="text-xs text-muted-foreground">Exported</p>
        </div>
      </div>
    </div>
  )
}
