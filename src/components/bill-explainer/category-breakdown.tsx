"use client"

import { useState } from "react"
import { ChevronDown, Zap, Droplets, Flame, Receipt } from "lucide-react"
import { AreaChart, Area, ResponsiveContainer } from "recharts"

interface Category {
  id: string
  name: string
  icon: React.ElementType
  amount: number
  percentage: number
  color: string
  bgColor: string
  lastMonth: number
  unitRate: string
  usage: string
  dailyAvg: string
  sparklineData: { value: number }[]
}

const categories: Category[] = [
  {
    id: "electricity",
    name: "Electricity",
    icon: Zap,
    amount: 98.52,
    percentage: 64,
    color: "#14b8a6",
    bgColor: "bg-teal-500/10",
    lastMonth: 121.35,
    unitRate: "412 kWh × $0.2391/kWh",
    usage: "412 kWh",
    dailyAvg: "$3.18/day",
    sparklineData: Array.from({ length: 31 }, (_, i) => ({ 
      value: 10 + Math.sin(i / 3) * 5 + Math.random() * 3 
    })),
  },
  {
    id: "water",
    name: "Water",
    icon: Droplets,
    amount: 32.35,
    percentage: 21,
    color: "#06b6d4",
    bgColor: "bg-cyan-500/10",
    lastMonth: 28.90,
    unitRate: "18.2 cu m × $1.78/cu m",
    usage: "18.2 cu m",
    dailyAvg: "$1.04/day",
    sparklineData: Array.from({ length: 31 }, (_, i) => ({ 
      value: 5 + Math.cos(i / 4) * 2 + Math.random() * 2 
    })),
  },
  {
    id: "gas",
    name: "Gas",
    icon: Flame,
    amount: 12.32,
    percentage: 8,
    color: "#f97316",
    bgColor: "bg-orange-500/10",
    lastMonth: 14.80,
    unitRate: "8.4 cu m × $1.47/cu m",
    usage: "8.4 cu m",
    dailyAvg: "$0.40/day",
    sparklineData: Array.from({ length: 31 }, (_, i) => ({ 
      value: 3 + Math.sin(i / 5) * 1 + Math.random() * 1 
    })),
  },
  {
    id: "gst",
    name: "GST",
    icon: Receipt,
    amount: 10.89,
    percentage: 7,
    color: "#6b7280",
    bgColor: "bg-gray-500/10",
    lastMonth: 12.56,
    unitRate: "9% of subtotal",
    usage: "Tax",
    dailyAvg: "$0.35/day",
    sparklineData: Array.from({ length: 31 }, (_, i) => ({ 
      value: 3 + Math.random() * 1 
    })),
  },
]

export function CategoryBreakdown() {
  const [expandedId, setExpandedId] = useState<string>("electricity")

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-foreground px-1">Breakdown</h3>
      
      {categories.map((category) => {
        const isExpanded = expandedId === category.id
        const Icon = category.icon
        const changePercent = ((category.amount - category.lastMonth) / category.lastMonth * 100).toFixed(1)
        const isDecrease = category.amount < category.lastMonth

        return (
          <button
            key={category.id}
            onClick={() => setExpandedId(isExpanded ? "" : category.id)}
            className="w-full text-left rounded-2xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border overflow-hidden transition-all duration-300"
          >
            {/* Main Row */}
            <div className="flex items-center gap-3 p-4">
              {/* Icon */}
              <div 
                className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center`}
                style={{ boxShadow: `0 0 20px ${category.color}20` }}
              >
                <Icon className="w-6 h-6" style={{ color: category.color }} />
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-foreground">{category.name}</span>
                  <span className="text-lg font-bold text-foreground">${category.amount.toFixed(2)}</span>
                </div>
                
                {/* Comparison Bar */}
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 rounded-full bg-muted/30 overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${(category.amount / Math.max(category.amount, category.lastMonth)) * 100}%`,
                          backgroundColor: category.color 
                        }}
                      />
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${isDecrease ? 'text-energy-emerald' : 'text-orange-500'}`}>
                    {isDecrease ? '' : '+'}{changePercent}%
                  </span>
                </div>
              </div>

              {/* Expand Arrow */}
              <ChevronDown 
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              />
            </div>

            {/* Expanded Details */}
            {isExpanded && (
              <div className="px-4 pb-4 pt-0 border-t border-border/30 space-y-4 animate-in slide-in-from-top-2 duration-300">
                {/* Usage Details */}
                <div className="grid grid-cols-3 gap-3 pt-3">
                  <div className="text-center p-2 rounded-xl bg-muted/20">
                    <span className="text-xs text-muted-foreground block">Unit Rate</span>
                    <span className="text-sm font-semibold text-foreground">{category.unitRate.split('×')[1]}</span>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-muted/20">
                    <span className="text-xs text-muted-foreground block">Usage</span>
                    <span className="text-sm font-semibold text-foreground">{category.usage}</span>
                  </div>
                  <div className="text-center p-2 rounded-xl bg-muted/20">
                    <span className="text-xs text-muted-foreground block">Daily Avg</span>
                    <span className="text-sm font-semibold text-foreground">{category.dailyAvg}</span>
                  </div>
                </div>

                {/* Sparkline */}
                <div className="h-16 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={category.sparklineData}>
                      <defs>
                        <linearGradient id={`gradient-${category.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={category.color} stopOpacity={0.4} />
                          <stop offset="100%" stopColor={category.color} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={category.color}
                        strokeWidth={2}
                        fill={`url(#gradient-${category.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-muted-foreground text-center">Daily usage pattern this month</p>
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
