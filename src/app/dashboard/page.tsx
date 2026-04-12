"use client";

import { Zap, Calendar } from "lucide-react";
import KpiCards from "@/components/dashboard/kpi-cards";
import PlatformHealth from "@/components/dashboard/platform-health";
import FeatureUsage from "@/components/dashboard/feature-usage";
import CallCenterImpact from "@/components/dashboard/call-center-impact";
import ReleaseVelocity from "@/components/dashboard/release-velocity";

const CURRENT_DATE = "11 Apr 2026, 09:42 SGT";

export default function DashboardPage() {
  return (
    <div className="bg-gradient-home min-h-screen relative overflow-hidden">
      {/* Floating gradient orbs */}
      <div
        className="absolute top-20 -right-10 w-[200px] h-[200px] rounded-full opacity-30 floating-orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,191,165,0.6) 0%, rgba(0,191,165,0) 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-40 -left-10 w-[160px] h-[160px] rounded-full opacity-20 floating-orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.5) 0%, rgba(34,211,238,0) 70%)",
          filter: "blur(60px)",
          animationDelay: "3s",
        }}
      />

      {/* Header */}
      <div className="glass-strong px-5 pt-12 pb-4 animate-fade-in-up relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sp-teal to-emerald-600 flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-sp-dark">
                Digital Command Center
              </p>
              <p className="text-[10px] text-gray-500">SP Group</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 glass-subtle rounded-xl px-2.5 py-1.5">
            <Calendar className="w-3 h-3 text-sp-teal" />
            <span className="text-[10px] text-gray-400 font-medium">
              {CURRENT_DATE}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-8 space-y-3 relative z-10">
        {/* KPI Cards */}
        <div className="opacity-0 animate-fade-in-up delay-100">
          <KpiCards />
        </div>

        {/* Platform Health */}
        <div className="opacity-0 animate-fade-in-up delay-200">
          <PlatformHealth />
        </div>

        {/* Feature Usage */}
        <div className="opacity-0 animate-fade-in-up delay-300">
          <FeatureUsage />
        </div>

        {/* Call Center Impact */}
        <div className="opacity-0 animate-fade-in-up delay-400">
          <CallCenterImpact />
        </div>

        {/* Release Velocity */}
        <div className="opacity-0 animate-fade-in-up delay-500">
          <ReleaseVelocity />
        </div>
      </div>
    </div>
  );
}
