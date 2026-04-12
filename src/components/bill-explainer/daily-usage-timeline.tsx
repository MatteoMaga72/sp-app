"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Tooltip } from "recharts"
import { Info } from "lucide-react"

// Generate 31 days of mock data
const dailyData = Array.from({ length: 31 }, (_, i) => {
  const baseUsage = 12 + Math.sin(i / 5) * 4
  const weekendBoost = (i % 7 === 0 || i % 7 === 6) ? 3 : 0
  return {
    day: i + 1,
    usage: Math.round((baseUsage + weekendBoost + Math.random() * 3) * 10) / 10,
  }
})

const targetUsage = 13.5

function UsageTooltip({ active, payload }: { active?: boolean; payload?: Array<{ value: number; payload: { day: number } }> }) {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-lg bg-slate-800/95 border border-glass-border shadow-xl">
        <p className="text-xs text-muted-foreground">Day {payload[0].payload.day}</p>
        <p className="text-sm font-bold text-foreground">{payload[0].value} kWh</p>
        <p className="text-xs text-muted-foreground">
          {payload[0].value > targetUsage ? (
            <span className="text-orange-400">Above target</span>
          ) : (
            <span className="text-energy-emerald">On target</span>
          )}
        </p>
      </div>
    )
  }
  return null
}

export function DailyUsageTimeline() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  return (
    <div className="rounded-2xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Daily Usage</h3>
        <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-muted/20">
          <div className="w-8 h-0.5 bg-orange-400" style={{ borderStyle: 'dashed' }} />
          <span className="text-xs text-muted-foreground">Target: {targetUsage} kWh/day</span>
        </div>
      </div>

      <div className="h-[160px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="usageGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
              tickFormatter={(value) => value % 5 === 1 ? value : ''}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 10 }}
              domain={[0, 'auto']}
            />
            <Tooltip content={<UsageTooltip />} />
            <ReferenceLine 
              y={targetUsage} 
              stroke="#f97316" 
              strokeDasharray="5 5"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="usage"
              stroke="#14b8a6"
              strokeWidth={2}
              fill="url(#usageGradient)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: '#14b8a6', 
                stroke: '#fff', 
                strokeWidth: 2,
                filter: 'drop-shadow(0 0 8px #14b8a6)'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-2 rounded-xl bg-energy-emerald/10 dark:bg-energy-emerald/20 border border-energy-emerald/20">
          <span className="text-xs text-muted-foreground block">Avg Daily</span>
          <span className="text-base font-bold text-foreground">13.3 kWh</span>
        </div>
        <div className="text-center p-2 rounded-xl bg-energy-teal/10 dark:bg-energy-teal/20 border border-energy-teal/20">
          <span className="text-xs text-muted-foreground block">Peak Day</span>
          <span className="text-base font-bold text-foreground">Day 22</span>
        </div>
        <div className="text-center p-2 rounded-xl bg-energy-cyan/10 dark:bg-energy-cyan/20 border border-energy-cyan/20">
          <span className="text-xs text-muted-foreground block">Below Target</span>
          <span className="text-base font-bold text-energy-emerald">18 days</span>
        </div>
      </div>
    </div>
  )
}
