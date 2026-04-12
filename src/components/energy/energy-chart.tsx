"use client";

import { useState } from "react";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const monthlyData = [
  { month: "Jan", consumption: 380, neighborAvg: 461 },
  { month: "Feb", consumption: 324, neighborAvg: 461 },
  { month: "Mar", consumption: 359, neighborAvg: 461 },
  { month: "Apr", consumption: 128, neighborAvg: 461 },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    const monthNames: Record<string, string> = { Jan: "January", Feb: "February", Mar: "March", Apr: "April", May: "May", Jun: "June", Jul: "July", Aug: "August", Sep: "September", Oct: "October", Nov: "November", Dec: "December" };
    return (
      <div className="p-3 rounded-xl bg-popover/95 backdrop-blur-xl border border-glass-border shadow-xl">
        <p className="text-sm font-semibold text-foreground mb-2">{monthNames[label || ""] || label}</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-energy-emerald" />
            <span className="text-xs text-muted-foreground">Usage:</span>
            <span className="text-xs font-semibold text-foreground">{payload[0]?.value} kWh</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

function GradientBar(props: { x?: number; y?: number; width?: number; height?: number }) {
  const { x = 0, y = 0, width = 0, height = 0 } = props;
  if (height <= 0) return null;
  return (
    <g>
      <defs>
        <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect x={x} y={y} width={width} height={height} rx={6} ry={6} fill="url(#barGrad)" filter="url(#glow)" style={{ transition: "all 0.3s ease" }} />
    </g>
  );
}

export function EnergyChart() {
  const [, setSelectedYear] = useState(2026);

  return (
    <div className="p-4 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">kWh</span>
          <button className="w-5 h-5 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
            <Info className="w-3 h-3 text-muted-foreground" />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-energy-emerald to-energy-teal" />
            <span className="text-[10px] text-muted-foreground">Your usage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-0.5 border-t border-dashed border-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground">Neighbour</span>
          </div>
        </div>
      </div>

      <div className="h-[180px] -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData} barCategoryGap="20%">
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 11 }} dy={8} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: "#64748b", fontSize: 10 }} width={35} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(241, 245, 249, 0.5)" }} />
            <ReferenceLine y={461} stroke="#64748b" strokeDasharray="4 4" strokeOpacity={0.5} />
            <Bar dataKey="consumption" shape={(props: { x?: number; y?: number; width?: number; height?: number }) => <GradientBar {...props} />} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-glass-border">
        <button onClick={() => setSelectedYear((prev) => prev - 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">THIS YEAR</span>
        </div>
        <button onClick={() => setSelectedYear((prev) => prev + 1)} className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
