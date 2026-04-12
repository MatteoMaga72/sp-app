"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { TrendingDown, Sparkles } from "lucide-react"

const billData = [
  { name: "Electricity", value: 98.52, color: "#14b8a6", percentage: 64 },
  { name: "Water", value: 32.35, color: "#06b6d4", percentage: 21 },
  { name: "Gas", value: 12.32, color: "#f97316", percentage: 8 },
  { name: "GST", value: 10.89, color: "#6b7280", percentage: 7 },
]

const totalAmount = 154.08
const savedAmount = 23.47

export function BillHeroChart() {
  const [displayAmount, setDisplayAmount] = useState(0)
  const [showSparkle, setShowSparkle] = useState(false)

  // Animated count-up effect
  useEffect(() => {
    const duration = 1500
    const steps = 60
    const increment = totalAmount / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= totalAmount) {
        setDisplayAmount(totalAmount)
        setShowSparkle(true)
        clearInterval(timer)
      } else {
        setDisplayAmount(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="rounded-2xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border p-5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-energy-emerald/20 rounded-full blur-[60px] pointer-events-none" />
      
      {/* Donut Chart */}
      <div className="relative h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {billData.map((entry, index) => (
                <filter key={`glow-${index}`} id={`glow-${entry.name}`}>
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              ))}
            </defs>
            <Pie
              data={billData}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={95}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {billData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  filter={`url(#glow-${entry.name})`}
                  className="drop-shadow-lg"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-sm font-medium text-muted-foreground mb-1">Total Bill</span>
          <div className="relative">
            <span className="text-4xl font-black text-foreground">
              ${displayAmount.toFixed(2)}
            </span>
            {showSparkle && (
              <div className="absolute -top-1 -right-3">
                <Sparkles className="w-5 h-5 text-energy-emerald animate-pulse" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Savings Badge */}
      <div className="flex items-center justify-center gap-2 mt-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-energy-emerald/10 dark:bg-energy-emerald/20 border border-energy-emerald/30">
          <TrendingDown className="w-4 h-4 text-energy-emerald" />
          <span className="text-sm font-semibold text-energy-emerald">
            You saved ${savedAmount.toFixed(2)} vs last month
          </span>
          {showSparkle && (
            <div className="flex gap-0.5">
              {[...Array(3)].map((_, i) => (
                <span 
                  key={i} 
                  className="w-1.5 h-1.5 rounded-full bg-energy-emerald animate-ping"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-4 gap-2 mt-4">
        {billData.map((item) => (
          <div key={item.name} className="flex flex-col items-center gap-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }}
            />
            <span className="text-xs font-medium text-muted-foreground">{item.name}</span>
            <span className="text-xs font-bold text-foreground">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
