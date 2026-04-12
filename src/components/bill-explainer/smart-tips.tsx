"use client"

import { Lightbulb, Plug, TrendingUp, ThermometerSun } from "lucide-react"

const tips = [
  {
    id: 1,
    icon: Plug,
    title: "Standby Power",
    description: "Your standby power costs ~$4.20/month. Smart power strips could save $3.50/month",
    savings: "$3.50/mo",
    color: "#14b8a6",
    gradient: "from-energy-emerald/20 to-energy-emerald/5",
    borderColor: "border-l-energy-emerald",
  },
  {
    id: 2,
    icon: TrendingUp,
    title: "Annual Projection",
    description: "At this rate, you'll save ~$180 this year compared to 2025!",
    savings: "$180/yr",
    color: "#06b6d4",
    gradient: "from-energy-cyan/20 to-energy-cyan/5",
    borderColor: "border-l-energy-cyan",
  },
  {
    id: 3,
    icon: ThermometerSun,
    title: "AC Optimization",
    description: "Raising AC by 1°C could save $8/month. Current avg: 23°C",
    savings: "$8/mo",
    color: "#f97316",
    gradient: "from-orange-500/20 to-orange-500/5",
    borderColor: "border-l-orange-500",
  },
]

export function SmartTips() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 px-1">
        <Lightbulb className="w-5 h-5 text-energy-emerald" />
        <h3 className="text-lg font-bold text-foreground">Smart Tips</h3>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => {
          const Icon = tip.icon
          return (
            <div
              key={tip.id}
              className={`rounded-xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border ${tip.borderColor} border-l-4 p-4 hover:scale-[1.02] transition-transform cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${tip.color}20` }}
                >
                  <Icon className="w-5 h-5" style={{ color: tip.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-semibold text-foreground">{tip.title}</h4>
                    <span 
                      className="px-2 py-0.5 rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: tip.color }}
                    >
                      Save {tip.savings}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
