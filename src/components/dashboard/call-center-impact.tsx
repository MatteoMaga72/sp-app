"use client";

import { PhoneOff, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";

const CALL_VOLUME_TREND = [
  { month: "Jul", calls: 82000 },
  { month: "Aug", calls: 79500 },
  { month: "Sep", calls: 76000 },
  { month: "Oct", calls: 71000 },
  { month: "Nov", calls: 68000 },
  { month: "Dec", calls: 65500 },
  { month: "Jan", calls: 62000 },
  { month: "Feb", calls: 58000 },
  { month: "Mar", calls: 54000 },
  { month: "Apr", calls: 51200 },
];

const DEFLECTION_REASONS = [
  { reason: "Bill inquiry", pct: 42, color: "#00BFA5" },
  { reason: "GIRO setup", pct: 18, color: "#34d399" },
  { reason: "Outage status", pct: 15, color: "#22d3ee" },
  { reason: "Payment", pct: 12, color: "#fbbf24" },
  { reason: "Other", pct: 13, color: "#6b7280" },
];

interface CallTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { month: string; calls: number } }>;
}

function CallTooltip({ active, payload }: CallTooltipProps) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="bg-sp-dark text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-medium">
          {data.month}: {data.calls.toLocaleString()} calls
        </p>
      </div>
    );
  }
  return null;
}

export default function CallCenterImpact() {
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-bold text-sp-dark mb-3">
        Call Center Impact
      </h3>

      {/* Headline metrics */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="glass-subtle rounded-xl p-3 text-center">
          <PhoneOff className="w-5 h-5 text-sp-teal mx-auto mb-1" />
          <p className="text-lg font-bold text-sp-dark">18,420</p>
          <p className="text-[10px] text-gray-500">Calls Deflected</p>
          <p className="text-[9px] text-gray-400">this month</p>
        </div>
        <div className="glass-subtle rounded-xl p-3 text-center">
          <DollarSign className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <p className="text-lg font-bold text-emerald-400">$184,200</p>
          <p className="text-[10px] text-gray-500">Est. Savings</p>
          <p className="text-[9px] text-gray-400">~$10/call</p>
        </div>
      </div>

      {/* Call volume trend */}
      <p className="text-[10px] text-gray-500 mb-1 font-medium">
        Call Volume Trend (since platform launch)
      </p>
      <div className="h-[140px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={CALL_VOLUME_TREND}
            margin={{ top: 5, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="rgba(255,255,255,0.05)"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#6b7280" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "#6b7280" }}
              tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              width={35}
            />
            <Tooltip content={<CallTooltip />} />
            <defs>
              <linearGradient id="callLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#00BFA5" />
              </linearGradient>
            </defs>
            <Line
              type="monotone"
              dataKey="calls"
              stroke="url(#callLine)"
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Deflection reasons */}
      <p className="text-[10px] text-gray-500 mt-3 mb-2 font-medium">
        Top Deflected Call Reasons
      </p>
      <div className="space-y-2">
        {DEFLECTION_REASONS.map((item) => (
          <div key={item.reason}>
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] text-gray-400">{item.reason}</span>
              <span className="text-[10px] font-semibold text-sp-dark">
                {item.pct}%
              </span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.pct}%`,
                  backgroundColor: item.color,
                  opacity: 0.8,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
