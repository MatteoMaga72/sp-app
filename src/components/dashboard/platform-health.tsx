"use client";

import { Activity, Clock, AlertTriangle, Rocket } from "lucide-react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const LATENCY_24H = [
  { h: "0", v: 135 }, { h: "1", v: 128 }, { h: "2", v: 122 }, { h: "3", v: 118 },
  { h: "4", v: 115 }, { h: "5", v: 120 }, { h: "6", v: 132 }, { h: "7", v: 145 },
  { h: "8", v: 162 }, { h: "9", v: 158 }, { h: "10", v: 148 }, { h: "11", v: 142 },
  { h: "12", v: 155 }, { h: "13", v: 150 }, { h: "14", v: 145 }, { h: "15", v: 140 },
  { h: "16", v: 148 }, { h: "17", v: 155 }, { h: "18", v: 160 }, { h: "19", v: 152 },
  { h: "20", v: 145 }, { h: "21", v: 138 }, { h: "22", v: 135 }, { h: "23", v: 142 },
];

export default function PlatformHealth() {
  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-sp-dark">Platform Health</h3>
        <span className="text-[10px] text-gray-500">Live</span>
      </div>

      <div className="space-y-3">
        {/* Uptime */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-gray-400">Uptime (90d)</span>
          </div>
          <span className="text-sm font-bold text-emerald-400">99.97%</span>
        </div>

        {/* API Latency */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Activity className="w-3 h-3 text-sp-teal" />
              <span className="text-xs text-gray-400">API p95 Latency</span>
            </div>
            <span className="text-sm font-bold text-sp-dark">142ms</span>
          </div>
          <div className="h-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={LATENCY_24H}>
                <Bar
                  dataKey="v"
                  fill="#00BFA5"
                  opacity={0.6}
                  radius={[1, 1, 0, 0]}
                  isAnimationActive={false}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Error Rate */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-400">Error Rate</span>
          </div>
          <span className="text-sm font-bold text-emerald-400">0.02%</span>
        </div>

        {/* Active Users */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Clock className="w-3 h-3 text-cyan-400" />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <span className="text-xs text-gray-400">Active Users Now</span>
          </div>
          <span className="text-sm font-bold text-sp-dark">12,847</span>
        </div>

        {/* Last Deployment */}
        <div className="glass-subtle rounded-xl p-2.5 mt-1">
          <div className="flex items-center gap-2">
            <Rocket className="w-3 h-3 text-sp-teal" />
            <span className="text-[10px] text-gray-400">Last Deploy</span>
          </div>
          <p className="text-xs text-sp-dark font-medium mt-1">
            2 hours ago &mdash; v2.4.1
          </p>
          <p className="text-[10px] text-gray-500 mt-0.5">
            3 features, 7 fixes
          </p>
        </div>
      </div>
    </div>
  );
}
