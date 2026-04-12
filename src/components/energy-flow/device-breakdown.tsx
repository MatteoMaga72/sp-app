"use client"

import { useState } from "react"
import { 
  Snowflake, 
  Tv, 
  Refrigerator, 
  Lightbulb, 
  WashingMachine,
  ChevronDown,
  ChevronUp
} from "lucide-react"

interface Device {
  id: string
  name: string
  icon: typeof Snowflake
  power: number
  percentage: number
  status: "on" | "off" | "standby"
  color: string
}

const devices: Device[] = [
  {
    id: "aircon",
    name: "Air Conditioner",
    icon: Snowflake,
    power: 0.85,
    percentage: 47,
    status: "on",
    color: "from-blue-400 to-blue-600"
  },
  {
    id: "tv",
    name: "Smart TV",
    icon: Tv,
    power: 0.12,
    percentage: 7,
    status: "on",
    color: "from-purple-400 to-purple-600"
  },
  {
    id: "fridge",
    name: "Refrigerator",
    icon: Refrigerator,
    power: 0.15,
    percentage: 8,
    status: "on",
    color: "from-energy-teal to-energy-cyan"
  },
  {
    id: "lights",
    name: "Lighting",
    icon: Lightbulb,
    power: 0.08,
    percentage: 4,
    status: "on",
    color: "from-amber-400 to-amber-600"
  },
  {
    id: "washer",
    name: "Washing Machine",
    icon: WashingMachine,
    power: 0,
    percentage: 0,
    status: "off",
    color: "from-slate-400 to-slate-600"
  },
]

export function DeviceBreakdown() {
  const [isExpanded, setIsExpanded] = useState(true)
  const activeDevices = devices.filter(d => d.status === "on")
  const totalPower = activeDevices.reduce((sum, d) => sum + d.power, 0)

  return (
    <div className="rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-semibold text-foreground">Device Breakdown</h3>
          <span className="px-2 py-0.5 rounded-full bg-energy-emerald/10 text-energy-emerald text-xs font-medium">
            {activeDevices.length} Active
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-foreground">{totalPower.toFixed(2)} kW</span>
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Device List */}
      {isExpanded && (
        <div className="px-4 pb-4 space-y-3">
          {/* Progress bar showing all devices */}
          <div className="h-3 rounded-full bg-secondary overflow-hidden flex">
            {devices.filter(d => d.percentage > 0).map((device, index) => (
              <div
                key={device.id}
                className={`h-full bg-gradient-to-r ${device.color} transition-all duration-500`}
                style={{ 
                  width: `${device.percentage}%`,
                  marginLeft: index > 0 ? '2px' : '0'
                }}
              />
            ))}
            <div 
              className="h-full bg-slate-300 dark:bg-slate-600"
              style={{ width: `${100 - devices.reduce((sum, d) => sum + d.percentage, 0)}%` }}
            />
          </div>

          {/* Device items */}
          <div className="space-y-2">
            {devices.map((device) => {
              const Icon = device.icon
              return (
                <div
                  key={device.id}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    device.status === "on" 
                      ? "bg-secondary/50" 
                      : "bg-secondary/20 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${device.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{device.name}</p>
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          device.status === "on" ? "bg-energy-emerald" : 
                          device.status === "standby" ? "bg-amber-400" : "bg-slate-400"
                        }`} />
                        <span className="text-xs text-muted-foreground capitalize">{device.status}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-bold text-foreground">
                      {device.power > 0 ? `${device.power.toFixed(2)} kW` : "—"}
                    </p>
                    {device.percentage > 0 && (
                      <p className="text-xs text-muted-foreground">{device.percentage}%</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Other usage */}
          <div className="pt-2 border-t border-glass-border flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Other / Standby</span>
            <span className="font-medium text-foreground">0.60 kW (34%)</span>
          </div>
        </div>
      )}
    </div>
  )
}
