"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, LabelList } from "recharts"

const comparisonData = [
  { 
    name: "Electricity", 
    thisMonth: 98.52, 
    lastMonth: 121.35,
    change: -18.8,
  },
  { 
    name: "Water", 
    thisMonth: 32.35, 
    lastMonth: 28.90,
    change: 11.9,
  },
  { 
    name: "Gas", 
    thisMonth: 12.32, 
    lastMonth: 14.80,
    change: -16.8,
  },
]

export function MonthComparison() {
  return (
    <div className="rounded-2xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-foreground">Month-over-Month</h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-energy-emerald" />
            <span className="text-xs text-muted-foreground">This month</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-muted/50" />
            <span className="text-xs text-muted-foreground">Last month</span>
          </div>
        </div>
      </div>

      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={comparisonData}
            layout="vertical"
            margin={{ top: 10, right: 60, left: 70, bottom: 10 }}
            barGap={4}
          >
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--foreground)', fontSize: 13, fontWeight: 500 }}
              width={65}
            />
            <Bar 
              dataKey="lastMonth" 
              radius={[0, 6, 6, 0]}
              barSize={16}
            >
              {comparisonData.map((entry, index) => (
                <Cell key={`last-${index}`} fill="var(--muted)" opacity={0.4} />
              ))}
            </Bar>
            <Bar 
              dataKey="thisMonth" 
              radius={[0, 6, 6, 0]}
              barSize={16}
            >
              {comparisonData.map((entry, index) => (
                <Cell 
                  key={`this-${index}`} 
                  fill={entry.change < 0 ? "#14b8a6" : "#f97316"}
                  filter="url(#bar-glow)"
                />
              ))}
              <LabelList
                dataKey="change"
                position="right"
                formatter={(value: unknown) => { const v = Number(value); return `${v > 0 ? '+' : ''}${v}%`; }}
                style={{ 
                  fill: 'var(--foreground)',
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />
            </Bar>
            <defs>
              <filter id="bar-glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
