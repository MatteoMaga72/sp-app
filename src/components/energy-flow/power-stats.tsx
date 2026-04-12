"use client"

import { useState, useEffect } from "react"
import { Sun, Home, Battery, Zap, TrendingDown, TrendingUp } from "lucide-react"

interface PowerStat {
  id: string
  label: string
  value: number
  unit: string
  icon: typeof Sun
  color: string
  bgColor: string
  trend?: "up" | "down"
  trendValue?: string
}

export function PowerStats() {
  const [stats, setStats] = useState<PowerStat[]>([
    {
      id: "solar",
      label: "Solar",
      value: 3.2,
      unit: "kW",
      icon: Sun,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10 dark:bg-amber-500/20",
      trend: "up",
      trendValue: "+12%"
    },
    {
      id: "home",
      label: "Home",
      value: 1.8,
      unit: "kW",
      icon: Home,
      color: "text-energy-emerald",
      bgColor: "bg-energy-emerald/10 dark:bg-energy-emerald/20",
      trend: "down",
      trendValue: "-8%"
    },
    {
      id: "battery",
      label: "Battery",
      value: 78,
      unit: "%",
      icon: Battery,
      color: "text-energy-teal",
      bgColor: "bg-energy-teal/10 dark:bg-energy-teal/20",
    },
    {
      id: "grid",
      label: "Grid",
      value: 0.4,
      unit: "kW",
      icon: Zap,
      color: "text-energy-cyan",
      bgColor: "bg-energy-cyan/10 dark:bg-energy-cyan/20",
      trend: "down",
      trendValue: "-45%"
    },
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => prev.map(stat => {
        const variance = stat.unit === "%" ? 1 : 0.1
        const change = (Math.random() - 0.5) * variance
        let newValue = stat.value + change
        if (stat.unit === "%") {
          newValue = Math.max(0, Math.min(100, newValue))
        } else {
          newValue = Math.max(0, newValue)
        }
        return { ...stat, value: Number(newValue.toFixed(1)) }
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.id}
            className="relative p-3 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border overflow-hidden group"
          >
            {/* Glow effect */}
            <div className={`absolute inset-0 ${stat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
            
            <div className="relative space-y-2">
              {/* Icon */}
              <div className={`w-8 h-8 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              
              {/* Value */}
              <div>
                <p className="text-lg font-bold text-foreground">
                  {stat.value}
                  <span className="text-xs font-normal text-muted-foreground ml-0.5">{stat.unit}</span>
                </p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
              
              {/* Trend */}
              {stat.trend && (
                <div className={`flex items-center gap-0.5 ${stat.trend === "up" ? "text-energy-emerald" : "text-energy-cyan"}`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                  <span className="text-[10px] font-medium">{stat.trendValue}</span>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
