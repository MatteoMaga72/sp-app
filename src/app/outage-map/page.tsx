"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Zap,
  Phone,
  Bell,
} from "lucide-react";

const outages = [
  {
    id: 1,
    area: "D2 — Anson, Tanjong Pagar",
    status: "resolved" as const,
    affected: 320,
    start: "11 Apr, 2:15 PM",
    resolved: "11 Apr, 3:42 PM",
    cause: "Underground cable fault",
    eta: null,
  },
  {
    id: 2,
    area: "D5 — Buona Vista, Pasir Panjang",
    status: "active" as const,
    affected: 1240,
    start: "12 Apr, 6:30 AM",
    resolved: null,
    cause: "Substation maintenance (unplanned)",
    eta: "12 Apr, 10:00 AM",
  },
  {
    id: 3,
    area: "D15 — East Coast, Marine Parade",
    status: "scheduled" as const,
    affected: 560,
    start: "13 Apr, 9:00 AM",
    resolved: null,
    cause: "Planned infrastructure upgrade",
    eta: "13 Apr, 5:00 PM",
  },
];

const statusConfig = {
  active: {
    color: "text-red-500",
    bg: "bg-red-500/10 border-red-500/30",
    icon: AlertTriangle,
    label: "Active Outage",
    dot: "bg-red-500 animate-pulse",
  },
  scheduled: {
    color: "text-amber-500",
    bg: "bg-amber-500/10 border-amber-500/30",
    icon: Clock,
    label: "Scheduled Maintenance",
    dot: "bg-amber-500",
  },
  resolved: {
    color: "text-energy-emerald",
    bg: "bg-energy-emerald/10 border-energy-emerald/30",
    icon: CheckCircle2,
    label: "Resolved",
    dot: "bg-energy-emerald",
  },
};

export default function OutageMapPage() {
  const [filter, setFilter] = useState<"all" | "active" | "scheduled" | "resolved">("all");

  const filtered = filter === "all" ? outages : outages.filter((o) => o.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="px-4 pb-24 pt-2 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="w-10 h-10 rounded-xl bg-glass-bg backdrop-blur-sm border border-glass-border flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Outage Map</h1>
          <button className="w-10 h-10 rounded-xl bg-glass-bg backdrop-blur-sm border border-glass-border flex items-center justify-center" aria-label="Outage notifications">
            <Bell className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Map Placeholder */}
        <div className="rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border overflow-hidden mb-4">
          <div className="relative h-[200px] bg-gradient-to-br from-energy-teal/5 to-energy-cyan/5 flex items-center justify-center">
            {/* Singapore outline placeholder */}
            <div className="absolute inset-4 rounded-xl border border-dashed border-muted-foreground/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Singapore Outage Map</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Interactive map loading...</p>
              </div>
            </div>
            {/* Mock outage pins */}
            <div className="absolute top-[40%] left-[45%] w-4 h-4 rounded-full bg-red-500 animate-pulse shadow-lg shadow-red-500/50" />
            <div className="absolute top-[55%] left-[60%] w-3 h-3 rounded-full bg-amber-500 shadow-lg shadow-amber-500/50" />
            <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full bg-energy-emerald shadow-lg shadow-energy-emerald/50" />
          </div>

          {/* Summary bar */}
          <div className="flex items-center justify-around px-4 py-3 border-t border-glass-border">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-medium text-foreground">1 Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-medium text-foreground">1 Scheduled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-energy-emerald" />
              <span className="text-xs font-medium text-foreground">1 Resolved</span>
            </div>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {(["all", "active", "scheduled", "resolved"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-energy-emerald to-energy-teal text-white shadow-md"
                  : "bg-glass-bg border border-glass-border text-muted-foreground"
              }`}
            >
              {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Your Area Status */}
        <div className="rounded-2xl bg-energy-emerald/10 border border-energy-emerald/30 p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-energy-emerald/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-energy-emerald" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Your Area: D2 — Tanjong Pagar</p>
              <p className="text-xs text-energy-emerald font-medium">No active outages. All systems normal.</p>
            </div>
          </div>
        </div>

        {/* Outage List */}
        <div className="space-y-3">
          {filtered.map((outage) => {
            const config = statusConfig[outage.status];
            const Icon = config.icon;
            return (
              <div
                key={outage.id}
                className={`rounded-2xl bg-glass-bg backdrop-blur-xl border ${config.bg} p-4`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${config.dot}`} />
                    <span className={`text-xs font-bold ${config.color} uppercase tracking-wide`}>
                      {config.label}
                    </span>
                  </div>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>

                <h3 className="text-sm font-semibold text-foreground mb-1">{outage.area}</h3>
                <p className="text-xs text-muted-foreground mb-3">{outage.cause}</p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-muted-foreground">Started: </span>
                    <span className="text-foreground font-medium">{outage.start}</span>
                  </div>
                  {outage.eta && (
                    <div>
                      <span className="text-muted-foreground">ETA: </span>
                      <span className="text-foreground font-medium">{outage.eta}</span>
                    </div>
                  )}
                  {outage.resolved && (
                    <div>
                      <span className="text-muted-foreground">Resolved: </span>
                      <span className="text-energy-emerald font-medium">{outage.resolved}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Affected: </span>
                    <span className="text-foreground font-medium">{outage.affected.toLocaleString()} premises</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Report Outage */}
        <div className="mt-4 space-y-3">
          <button className="w-full py-3 rounded-xl bg-gradient-to-r from-sp-brand to-sp-brand-dark text-white font-semibold flex items-center justify-center gap-2 shadow-lg">
            <AlertTriangle className="w-4 h-4" />
            Report an Outage
          </button>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Emergency? Call <a href="tel:18007788888" className="text-sp-brand font-semibold">1800-778-8888</a>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Gas leak? Call <a href="tel:18007521800" className="text-sp-brand font-semibold">1800-752-1800</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
