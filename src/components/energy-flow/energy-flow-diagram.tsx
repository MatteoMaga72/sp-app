"use client"

import { useState, useEffect } from "react"
import { Sun, Home, Battery, Zap } from "lucide-react"

interface FlowData {
  solarToHome: number
  solarToBattery: number
  solarToGrid: number
  batteryToHome: number
  gridToHome: number
  solarPower: number
  homePower: number
  batteryPercent: number
  gridPower: number
}

export function EnergyFlowDiagram() {
  const [flowData, setFlowData] = useState<FlowData>({
    solarToHome: 1.4,
    solarToBattery: 0.8,
    solarToGrid: 1.0,
    batteryToHome: 0,
    gridToHome: 0.4,
    solarPower: 3.2,
    homePower: 1.8,
    batteryPercent: 78,
    gridPower: 0.4,
  })

  // Simulate real-time flow updates
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowData(prev => ({
        ...prev,
        solarToHome: Math.max(0, prev.solarToHome + (Math.random() - 0.5) * 0.2),
        solarToBattery: Math.max(0, prev.solarToBattery + (Math.random() - 0.5) * 0.1),
        solarToGrid: Math.max(0, prev.solarToGrid + (Math.random() - 0.5) * 0.15),
        gridToHome: Math.max(0, prev.gridToHome + (Math.random() - 0.5) * 0.1),
        solarPower: Math.max(0, prev.solarPower + (Math.random() - 0.5) * 0.3),
        homePower: Math.max(0, prev.homePower + (Math.random() - 0.5) * 0.2),
        batteryPercent: Math.max(0, Math.min(100, prev.batteryPercent + (Math.random() - 0.3) * 0.5)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative p-6 rounded-3xl bg-glass-bg backdrop-blur-xl border border-glass-border overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* SVG Flow Lines */}
      <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
        <defs>
          <linearGradient id="flowGradientGreen" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="flowGradientCyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#14b8a6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          <linearGradient id="flowGradientAmber" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="flowGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Solar to Home flow */}
        {flowData.solarToHome > 0 && (
          <g filter="url(#flowGlow)">
            <path
              d="M 100 80 Q 180 60 195 150"
              fill="none"
              stroke="url(#flowGradientAmber)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-energy-flow"
              opacity="0.8"
            />
          </g>
        )}

        {/* Solar to Battery flow */}
        {flowData.solarToBattery > 0 && (
          <g filter="url(#flowGlow)">
            <path
              d="M 80 100 Q 60 180 80 240"
              fill="none"
              stroke="url(#flowGradientGreen)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-energy-flow"
              opacity="0.8"
            />
          </g>
        )}

        {/* Solar to Grid flow */}
        {flowData.solarToGrid > 0 && (
          <g filter="url(#flowGlow)">
            <path
              d="M 120 80 Q 220 40 300 80"
              fill="none"
              stroke="url(#flowGradientCyan)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-energy-flow"
              opacity="0.6"
            />
          </g>
        )}

        {/* Grid to Home flow */}
        {flowData.gridToHome > 0 && (
          <g filter="url(#flowGlow)">
            <path
              d="M 300 110 Q 260 130 225 150"
              fill="none"
              stroke="url(#flowGradientCyan)"
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-energy-flow-reverse"
              opacity="0.5"
            />
          </g>
        )}

        {/* Battery to Home flow */}
        {flowData.batteryToHome > 0 && (
          <g filter="url(#flowGlow)">
            <path
              d="M 100 240 Q 140 200 180 180"
              fill="none"
              stroke="url(#flowGradientGreen)"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-energy-flow"
              opacity="0.8"
            />
          </g>
        )}
      </svg>

      {/* Nodes Container */}
      <div className="relative z-10 h-[280px]">
        {/* Solar Panel Node - Top Left */}
        <div className="absolute top-0 left-4">
          <div className="relative">
            {/* Spinning rays */}
            <div className="absolute -inset-4 animate-spin-slow opacity-30">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-1/2 left-1/2 w-12 h-0.5 bg-gradient-to-r from-amber-400 to-transparent origin-left"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                />
              ))}
            </div>
            
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/30 animate-node-pulse">
              <Sun className="w-10 h-10 text-white" />
            </div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <p className="text-xl font-bold text-foreground">{flowData.solarPower.toFixed(1)} kW</p>
              <p className="text-xs text-muted-foreground">Generating</p>
            </div>
          </div>
        </div>

        {/* Home Node - Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -inset-3 rounded-full bg-energy-emerald/20 animate-ping opacity-30" />
            
            <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center shadow-lg shadow-energy-emerald/30 animate-node-pulse">
              <Home className="w-12 h-12 text-white" />
            </div>
            
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <p className="text-2xl font-bold text-foreground">{flowData.homePower.toFixed(1)} kW</p>
              <p className="text-xs text-muted-foreground">Consuming</p>
            </div>
          </div>
        </div>

        {/* Battery Node - Bottom Left */}
        <div className="absolute bottom-0 left-4">
          <div className="relative">
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-energy-teal to-energy-cyan flex items-center justify-center shadow-lg shadow-energy-teal/30">
              <div className="relative">
                <Battery className="w-10 h-10 text-white" />
                {/* Battery level indicator */}
                <div 
                  className="absolute bottom-1.5 left-1.5 right-2 h-5 bg-white/30 rounded-sm overflow-hidden"
                >
                  <div 
                    className="h-full bg-white animate-battery-charge transition-all duration-500"
                    style={{ width: `${flowData.batteryPercent}%` }}
                  />
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <p className="text-xl font-bold text-foreground">{flowData.batteryPercent.toFixed(0)}%</p>
              <p className="text-xs text-muted-foreground">Charging</p>
            </div>
          </div>
        </div>

        {/* Grid Node - Top Right */}
        <div className="absolute top-0 right-4">
          <div className="relative">
            <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-700 flex items-center justify-center shadow-lg animate-grid-pulse">
              <Zap className="w-10 h-10 text-white" />
            </div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
              <p className="text-xl font-bold text-energy-emerald">+{flowData.solarToGrid.toFixed(1)} kW</p>
              <p className="text-xs text-muted-foreground">Exporting</p>
            </div>
          </div>
        </div>
      </div>

      {/* Flow Legend */}
      <div className="relative z-10 mt-12 pt-4 border-t border-glass-border flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-amber-400 to-energy-emerald animate-energy-flow" style={{ backgroundSize: '16px 4px' }} />
          <span className="text-xs text-muted-foreground">Solar</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-energy-teal to-energy-cyan animate-energy-flow" style={{ backgroundSize: '16px 4px' }} />
          <span className="text-xs text-muted-foreground">Grid</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-1 rounded-full bg-gradient-to-r from-energy-emerald to-energy-teal animate-energy-flow" style={{ backgroundSize: '16px 4px' }} />
          <span className="text-xs text-muted-foreground">Battery</span>
        </div>
      </div>
    </div>
  )
}
