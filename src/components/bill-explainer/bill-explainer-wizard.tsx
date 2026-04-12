"use client"

import { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Trophy, Zap, Droplets, Flame, Receipt, Check, Bell, ThermometerSun, Plug, Clock } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"

interface BillExplainerWizardProps {
  onComplete: () => void
}

const billData = [
  { name: "Electricity", value: 98.52, color: "#14b8a6", icon: Zap },
  { name: "Water", value: 32.35, color: "#06b6d4", icon: Droplets },
  { name: "Gas", value: 12.32, color: "#f97316", icon: Flame },
  { name: "GST", value: 10.89, color: "#6b7280", icon: Receipt },
]

const comparisonData = [
  { name: "You", value: 412, fill: "#14b8a6" },
  { name: "Neighbours", value: 528, fill: "#64748b" },
  { name: "SG Average", value: 485, fill: "#94a3b8" },
]

const heatmapData = Array.from({ length: 7 }, (_, day) =>
  Array.from({ length: 24 }, (_, hour) => {
    const isPeak = hour >= 14 && hour <= 17 && day < 5
    const baseValue = Math.random() * 0.5
    return isPeak ? 0.7 + Math.random() * 0.3 : baseValue
  })
)

const savingsTips = [
  { id: 1, icon: Plug, title: "Reduce standby power", savings: "$3.50/month", enabled: false },
  { id: 2, icon: Clock, title: "Shift laundry to off-peak", savings: "$2.10/month", enabled: false },
  { id: 3, icon: ThermometerSun, title: "Set AC to 25°C", savings: "$8.00/month", enabled: false },
]

export function BillExplainerWizard({ onComplete }: BillExplainerWizardProps) {
  const [step, setStep] = useState(1)
  const [animatedSegments, setAnimatedSegments] = useState<number[]>([])
  const [showTotal, setShowTotal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [tipsEnabled, setTipsEnabled] = useState<Record<number, boolean>>({})

  // Step 1: Animate segments one by one
  useEffect(() => {
    if (step === 1) {
      const timeouts: ReturnType<typeof setTimeout>[] = []

      billData.forEach((_, index) => {
        timeouts.push(setTimeout(() => {
          setAnimatedSegments((prev) => [...prev, index])
        }, (index + 1) * 600))
      })

      timeouts.push(setTimeout(() => {
        setShowTotal(true)
      }, billData.length * 600 + 400))
    }
  }, [step])

  const totalSavings = Object.entries(tipsEnabled)
    .filter(([_, enabled]) => enabled)
    .reduce((sum, [id]) => {
      const tip = savingsTips.find((t) => t.id === Number(id))
      return sum + (tip ? parseFloat(tip.savings.replace('$', '').replace('/month', '')) : 0)
    }, 0)

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col items-center justify-center h-full px-6 py-8">
            <h2 className="text-2xl font-black text-foreground mb-2">{"Let's break down your bill"}</h2>
            <p className="text-muted-foreground text-center mb-8">Watch how your charges add up</p>

            {/* Animated Donut Chart */}
            <div className="relative w-[240px] h-[240px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={billData.filter((_, i) => animatedSegments.includes(i))}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {billData.map((entry, index) => (
                      animatedSegments.includes(index) && (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          style={{
                            filter: `drop-shadow(0 0 12px ${entry.color})`,
                            animation: 'pulse 1s ease-out'
                          }}
                        />
                      )
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              {/* Center Total */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {showTotal ? (
                  <div className="animate-bounce-pop">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <p className="text-3xl font-black text-foreground">$154.08</p>
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full border-2 border-energy-emerald border-t-transparent animate-spin" />
                )}
              </div>
            </div>

            {/* Savings Message */}
            {showTotal && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-full bg-energy-emerald/10 border border-energy-emerald/30 animate-bounce-pop">
                <Trophy className="w-5 h-5 text-energy-emerald" />
                <span className="text-sm font-semibold text-foreground">
                  $23.47 less than February!
                </span>
              </div>
            )}
          </div>
        )

      case 2:
        return (
          <div className="flex flex-col h-full px-6 py-8">
            <h2 className="text-2xl font-black text-foreground mb-2">Where does the money go?</h2>
            <p className="text-muted-foreground mb-6">Tap any category to see details</p>

            {/* Mini Donut */}
            <div className="w-20 h-20 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={billData}
                    cx="50%"
                    cy="50%"
                    innerRadius={25}
                    outerRadius={38}
                    paddingAngle={2}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {billData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        opacity={selectedCategory === null || selectedCategory === index ? 1 : 0.3}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Category Cards */}
            <div className="space-y-3 flex-1">
              {billData.map((category, index) => {
                const Icon = category.icon
                const percentage = Math.round((category.value / 154.08) * 100)
                const isLargest = index === 0

                return (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(selectedCategory === index ? null : index)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl bg-glass-bg/50 dark:bg-slate-700/50 border transition-all duration-300 ${
                      selectedCategory === index 
                        ? 'border-energy-emerald shadow-lg shadow-energy-emerald/20' 
                        : isLargest 
                          ? 'border-energy-emerald/50 animate-pulse' 
                          : 'border-glass-border'
                    }`}
                    style={{ 
                      animationDelay: `${index * 150}ms`,
                      animation: 'slideInRight 0.4s ease-out forwards',
                      opacity: 0,
                    }}
                  >
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div className="flex-1 text-left">
                      <span className="text-base font-semibold text-foreground block">{category.name}</span>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex-1 h-2 rounded-full bg-muted/30 overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${percentage}%`, 
                              backgroundColor: category.color 
                            }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">{percentage}%</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-foreground">${category.value.toFixed(2)}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="flex flex-col items-center h-full px-6 py-8">
            <h2 className="text-2xl font-black text-foreground mb-2">How do you compare?</h2>
            <p className="text-muted-foreground text-center mb-6">Your electricity vs others in D2 (Tanjong Pagar)</p>

            {/* Comparison Chart */}
            <div className="w-full h-[200px] mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: 'var(--foreground)', fontSize: 13, fontWeight: 500 }}
                  />
                  <YAxis hide domain={[0, 600]} />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={50}>
                    {comparisonData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.fill}
                        style={index === 0 ? { filter: 'drop-shadow(0 0 12px #14b8a6)' } : {}}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Trophy Badge */}
            <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-gradient-to-r from-energy-emerald/20 to-energy-teal/20 border border-energy-emerald/30 mb-4 animate-glow-gold">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-foreground">22% below average!</p>
                <p className="text-sm text-muted-foreground">{"You're doing great!"}</p>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="flex flex-col h-full px-6 py-8">
            <h2 className="text-2xl font-black text-foreground mb-2">Your daily pattern</h2>
            <p className="text-muted-foreground mb-6">When do you use the most energy?</p>

            {/* Heatmap */}
            <div className="rounded-xl bg-glass-bg/30 dark:bg-slate-800/30 p-4 mb-6">
              <div className="grid grid-cols-[auto_repeat(24,1fr)] gap-0.5 text-xs">
                {/* Hour labels */}
                <div />
                {[0, 6, 12, 18].map((h) => (
                  <div key={h} className="col-span-6 text-center text-muted-foreground">
                    {h === 0 ? '12AM' : h === 6 ? '6AM' : h === 12 ? '12PM' : '6PM'}
                  </div>
                ))}

                {/* Days and cells */}
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                  <>
                    <div key={day} className="text-muted-foreground text-right pr-2 py-1">{day}</div>
                    {heatmapData[dayIndex].map((value, hourIndex) => (
                      <div
                        key={`${day}-${hourIndex}`}
                        className="aspect-square rounded-sm transition-colors"
                        style={{
                          backgroundColor: `rgba(20, 184, 166, ${value})`,
                        }}
                      />
                    ))}
                  </>
                ))}
              </div>
            </div>

            {/* Peak Callout */}
            <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <p className="text-sm font-semibold text-foreground mb-1">
                Peak: Weekdays 2-5 PM
              </p>
              <p className="text-sm text-muted-foreground">
                Likely AC usage. Raising thermostat by 1°C could save ~$8/month
              </p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="flex flex-col h-full px-6 py-8">
            <h2 className="text-2xl font-black text-foreground mb-2">Your savings plan</h2>
            <p className="text-muted-foreground mb-6">Based on your usage, here are 3 ways to save:</p>

            {/* Savings Tips */}
            <div className="space-y-3 flex-1">
              {savingsTips.map((tip) => {
                const Icon = tip.icon
                const isEnabled = tipsEnabled[tip.id]

                return (
                  <div
                    key={tip.id}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                      isEnabled 
                        ? 'bg-energy-emerald/10 border-energy-emerald/50' 
                        : 'bg-glass-bg/50 dark:bg-slate-700/50 border-glass-border'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-energy-emerald/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-energy-emerald" />
                    </div>
                    <div className="flex-1">
                      <span className="text-sm font-semibold text-foreground block">{tip.title}</span>
                      <span className="text-sm text-energy-emerald font-bold">Save {tip.savings}</span>
                    </div>
                    <button
                      onClick={() => setTipsEnabled((prev) => ({ ...prev, [tip.id]: !prev[tip.id] }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                        isEnabled 
                          ? 'bg-energy-emerald text-white' 
                          : 'bg-muted/30 text-foreground hover:bg-energy-emerald/20'
                      }`}
                    >
                      {isEnabled ? <Check className="w-4 h-4" /> : 'Set reminder'}
                    </button>
                  </div>
                )
              })}
            </div>

            {/* Total Savings */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-energy-emerald/20 to-energy-teal/20 border border-energy-emerald/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Potential savings</span>
                <div className="text-right">
                  <p className="text-2xl font-black text-energy-emerald">
                    Up to $13.60/month
                  </p>
                  <p className="text-sm text-muted-foreground">($163/year)</p>
                </div>
              </div>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-[400px] h-[85vh] mx-4 rounded-3xl bg-background border border-glass-border shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/30">
          {step > 1 ? (
            <button 
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 rounded-xl bg-glass-bg/50 flex items-center justify-center hover:bg-energy-emerald/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>
          ) : (
            <div className="w-10" />
          )}
          
          {/* Progress Dots */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`w-2 h-2 rounded-full transition-all ${
                  s === step 
                    ? 'w-6 bg-energy-emerald' 
                    : s < step 
                      ? 'bg-energy-emerald/50' 
                      : 'bg-muted/30'
                }`}
              />
            ))}
          </div>

          <button 
            onClick={onComplete}
            className="w-10 h-10 rounded-xl bg-glass-bg/50 flex items-center justify-center hover:bg-red-500/10 transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border/30">
          {step < 5 ? (
            <button 
              onClick={() => setStep(step + 1)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-bold text-base shadow-lg shadow-energy-emerald/30 hover:shadow-energy-emerald/50 transition-all"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <div className="space-y-2">
              <button 
                onClick={onComplete}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white font-bold text-base shadow-lg shadow-energy-emerald/30 hover:shadow-energy-emerald/50 transition-all"
              >
                <span>Got it!</span>
              </button>
              <button 
                onClick={onComplete}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-energy-emerald hover:text-energy-teal transition-colors"
              >
                <Bell className="w-4 h-4" />
                <span>Set up monthly bill alerts</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
