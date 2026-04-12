"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  CreditCard,
  Clock,
  Download,
  Zap,
  Droplets,
  Lightbulb,
  Leaf,
  TrendingDown,
  TrendingUp,
  Trophy,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import PortalNav from "@/components/website/portal-nav";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

type Period = "week" | "month" | "year";

const consumptionByPeriod: Record<
  Period,
  Array<{ label: string; electricity: number; water: number }>
> = {
  week: [
    { label: "Mon", electricity: 22, water: 0.85 },
    { label: "Tue", electricity: 15, water: 1.2 },
    { label: "Wed", electricity: 18, water: 0.65 },
    { label: "Thu", electricity: 20, water: 0.9 },
    { label: "Fri", electricity: 25, water: 1.1 },
    { label: "Sat", electricity: 30, water: 1.4 },
    { label: "Sun", electricity: 28, water: 1.3 },
  ],
  month: [
    { label: "W1", electricity: 95, water: 5.2 },
    { label: "W2", electricity: 88, water: 4.8 },
    { label: "W3", electricity: 102, water: 5.5 },
    { label: "W4", electricity: 78, water: 4.1 },
  ],
  year: [
    { label: "Jan", electricity: 412, water: 18.5 },
    { label: "Feb", electricity: 378, water: 17.3 },
    { label: "Mar", electricity: 395, water: 16.8 },
    { label: "Apr", electricity: 0, water: 0 },
    { label: "May", electricity: 0, water: 0 },
    { label: "Jun", electricity: 0, water: 0 },
    { label: "Jul", electricity: 0, water: 0 },
    { label: "Aug", electricity: 0, water: 0 },
    { label: "Sep", electricity: 0, water: 0 },
    { label: "Oct", electricity: 0, water: 0 },
    { label: "Nov", electricity: 0, water: 0 },
    { label: "Dec", electricity: 0, water: 0 },
  ],
};

const periodLabels: Record<Period, string> = {
  week: "This Week",
  month: "This Month",
  year: "This Year",
};

const periods: Period[] = ["week", "month", "year"];

const transactions = [
  {
    date: "06 Mar 2026",
    description: "March 2026 PDF Bill",
    type: "Bill",
    amount: "$154.08",
    status: "Unpaid" as const,
  },
  {
    date: "25 Feb 2026",
    description: "Bill Payment (GIRO)",
    type: "Payment",
    amount: "$177.55",
    status: "Success" as const,
  },
  {
    date: "11 Feb 2026",
    description: "February 2026 PDF Bill",
    type: "Bill",
    amount: "$177.55",
    status: "Paid" as const,
  },
  {
    date: "20 Jan 2026",
    description: "Bill Payment (GIRO)",
    type: "Payment",
    amount: "$163.09",
    status: "Success" as const,
  },
  {
    date: "06 Jan 2026",
    description: "January 2026 PDF Bill",
    type: "Bill",
    amount: "$163.09",
    status: "Paid" as const,
  },
];

const aiInsights = [
  {
    icon: TrendingDown,
    text: "Your electricity usage dropped 12% this month. Keep it up!",
    color: "text-sp-green",
  },
  {
    icon: Lightbulb,
    text: "Switching off standby appliances could save you $8/month.",
    color: "text-sp-orange",
  },
  {
    icon: Droplets,
    text: "Water usage is 5% above your neighbourhood average.",
    color: "text-blue-400",
  },
];

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { label: string; electricity: number; water: number } }>;
}

function DashboardTooltip({ active, payload }: ChartTooltipProps) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="glass-strong rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-sp-dark mb-1">{data.label}</p>
        <p className="text-sp-teal">
          Electricity: {data.electricity} kWh
        </p>
        <p className="text-blue-400">Water: {data.water} m&sup3;</p>
      </div>
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PortalDashboard() {
  const [activePeriod, setActivePeriod] = useState<Period>("week");
  const [activeUtility, setActiveUtility] = useState<"electricity" | "water">(
    "electricity"
  );

  const chartData = consumptionByPeriod[activePeriod];
  const dataKey = activeUtility;
  const accentColor = activeUtility === "electricity" ? "#00BFA5" : "#2196F3";

  const cyclePeriod = (direction: "left" | "right") => {
    const idx = periods.indexOf(activePeriod);
    if (direction === "left") {
      setActivePeriod(periods[(idx - 1 + periods.length) % periods.length]);
    } else {
      setActivePeriod(periods[(idx + 1) % periods.length]);
    }
  };

  const greeting = getGreeting();

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ maxWidth: "none" }}
    >
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 -z-10" />

      {/* Ambient orbs */}
      <div
        className="fixed top-20 right-1/4 w-[400px] h-[400px] rounded-full opacity-10 floating-orb pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(0,191,165,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <PortalNav />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome section */}
        <div className="flex items-center justify-between mb-8 animate-fade-in-up">
          <div>
            <h1 className="text-2xl font-bold text-white">
              {greeting}, Matteo
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Here&apos;s your utilities overview
            </p>
          </div>
          <button className="flex items-center gap-2 glass rounded-xl px-4 py-2.5 text-sm text-sp-dark font-medium hover:bg-white/5 transition-colors">
            <span>18 Everton Rd</span>
            <ChevronDown size={16} className="text-gray-400" />
          </button>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ---- Left column ---- */}
          <div className="space-y-6">
            {/* Outstanding bill card */}
            <div className="glass-strong rounded-2xl p-6 animate-fade-in-up delay-100" style={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-400">
                  Outstanding Bill
                </h2>
                <span className="text-xs font-semibold text-sp-orange bg-sp-orange/10 px-2.5 py-1 rounded-full">
                  Due 20 Apr
                </span>
              </div>
              <p className="text-4xl font-bold text-white mb-1">$130.20</p>
              <p className="text-xs text-gray-500 mb-4">
                March 2026 &middot; Electricity &amp; Water
              </p>
              <div className="flex items-center gap-2 text-xs text-sp-green mb-6">
                <TrendingDown size={14} />
                <span>$23.88 less than last month</span>
              </div>

              {/* Quick actions */}
              <div className="grid grid-cols-3 gap-2">
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-gradient-to-b from-sp-teal/20 to-sp-teal/5 border border-sp-teal/20 hover:border-sp-teal/40 transition-colors spring-button">
                  <CreditCard size={18} className="text-sp-teal" />
                  <span className="text-[11px] font-medium text-gray-300">
                    Pay Bill
                  </span>
                </button>
                <Link
                  href="/website/portal/bills"
                  className="flex flex-col items-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors spring-button"
                >
                  <Clock size={18} className="text-gray-400" />
                  <span className="text-[11px] font-medium text-gray-300">
                    History
                  </span>
                </Link>
                <button className="flex flex-col items-center gap-2 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors spring-button">
                  <Download size={18} className="text-gray-400" />
                  <span className="text-[11px] font-medium text-gray-300">
                    PDF
                  </span>
                </button>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass rounded-2xl p-4 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
                <Zap size={18} className="text-sp-teal mb-2" />
                <p className="text-xl font-bold text-white">412</p>
                <p className="text-[11px] text-gray-400">kWh this month</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown size={12} className="text-sp-green" />
                  <span className="text-[10px] text-sp-green">-8%</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-4 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
                <Droplets size={18} className="text-blue-400 mb-2" />
                <p className="text-xl font-bold text-white">7.3</p>
                <p className="text-[11px] text-gray-400">m&sup3; this month</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={12} className="text-sp-orange" />
                  <span className="text-[10px] text-sp-orange">+5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Center column: Consumption chart ---- */}
          <div className="glass-strong rounded-2xl p-6 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400">
                Consumption
              </h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveUtility(
                      activeUtility === "electricity" ? "water" : "electricity"
                    )
                  }
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    activeUtility === "electricity"
                      ? "bg-sp-teal/10 text-sp-teal"
                      : "bg-blue-500/10 text-blue-400"
                  }`}
                >
                  {activeUtility === "electricity" ? (
                    <Zap size={12} />
                  ) : (
                    <Droplets size={12} />
                  )}
                  {activeUtility === "electricity"
                    ? "Electricity"
                    : "Water"}
                </button>
              </div>
            </div>

            {/* Period selector */}
            <div className="flex items-center justify-center gap-4 mb-4">
              <button
                onClick={() => cyclePeriod("left")}
                className="p-1 rounded-full hover:bg-white/5 transition-colors"
              >
                <ChevronLeft size={16} className="text-gray-400" />
              </button>
              <span className="text-sm font-semibold text-white tracking-wide">
                {periodLabels[activePeriod]}
              </span>
              <button
                onClick={() => cyclePeriod("right")}
                className="p-1 rounded-full hover:bg-white/5 transition-colors"
              >
                <ChevronRight size={16} className="text-gray-400" />
              </button>
            </div>

            {/* Chart */}
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="label"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    width={40}
                  />
                  <Tooltip
                    content={<DashboardTooltip />}
                    cursor={{ fill: "rgba(255,255,255,0.02)" }}
                  />
                  <Bar
                    dataKey={dataKey}
                    radius={[4, 4, 0, 0]}
                    maxBarSize={36}
                  >
                    {chartData.map((entry) => {
                      const val =
                        activeUtility === "electricity"
                          ? entry.electricity
                          : entry.water;
                      return (
                        <Cell
                          key={entry.label}
                          fill={val > 0 ? accentColor : "rgba(255,255,255,0.05)"}
                          opacity={val > 0 ? 1 : 0.3}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-sm"
                  style={{ backgroundColor: accentColor }}
                />
                <span className="text-xs text-gray-500">
                  {activeUtility === "electricity"
                    ? "kWh per period"
                    : "m\u00B3 per period"}
                </span>
              </div>
              <span className="text-xs text-gray-600">
                Updated 11 Apr 2026
              </span>
            </div>
          </div>

          {/* ---- Right column ---- */}
          <div className="space-y-6">
            {/* AI Insights */}
            <div className="glass-strong rounded-2xl p-6 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-sp-teal" />
                <h2 className="text-sm font-semibold text-gray-400">
                  AI Insights
                </h2>
              </div>
              <div className="space-y-3">
                {aiInsights.map((insight) => (
                  <div
                    key={insight.text}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <insight.icon
                      size={16}
                      className={`${insight.color} flex-shrink-0 mt-0.5`}
                    />
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {insight.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Green Goals + GreenUP */}
            <div className="glass rounded-2xl p-6 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <Leaf size={16} className="text-sp-green" />
                <h2 className="text-sm font-semibold text-gray-400">
                  Green Goals
                </h2>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-300">
                      15% less electricity
                    </span>
                    <span className="text-sp-green font-semibold">72%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sp-green to-emerald-400"
                      style={{ width: "72%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-gray-300">18% less water</span>
                    <span className="text-sp-orange font-semibold">45%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sp-orange to-amber-400"
                      style={{ width: "45%" }}
                    />
                  </div>
                </div>
              </div>

              {/* GreenUP tier */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy size={16} className="text-amber-400" />
                  <div>
                    <p className="text-xs font-semibold text-white">
                      GreenUP Gold
                    </p>
                    <p className="text-[10px] text-gray-500">
                      1,240 / 2,000 pts
                    </p>
                  </div>
                </div>
                <Link
                  href="/website/portal/greenup"
                  className="text-sp-teal text-xs font-medium flex items-center gap-1 hover:underline"
                >
                  View
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Bottom row: Recent transactions ---- */}
        <div className="mt-8 glass-strong rounded-2xl p-6 animate-fade-in-up delay-500" style={{ opacity: 0 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-400">
              Recent Transactions
            </h2>
            <Link
              href="/website/portal/bills"
              className="text-sp-teal text-xs font-medium flex items-center gap-1 hover:underline"
            >
              View All
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">
                    Date
                  </th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">
                    Description
                  </th>
                  <th className="text-left text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">
                    Type
                  </th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">
                    Amount
                  </th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr
                    key={`${tx.date}-${tx.description}`}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 pr-4 text-xs text-gray-400">
                      {tx.date}
                    </td>
                    <td className="py-3 pr-4 text-sm text-white font-medium">
                      {tx.description}
                    </td>
                    <td className="py-3 pr-4 text-xs text-gray-400">
                      {tx.type}
                    </td>
                    <td className="py-3 pr-4 text-sm text-white text-right font-semibold">
                      {tx.amount}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                          tx.status === "Success"
                            ? "bg-sp-green/10 text-sp-green"
                            : tx.status === "Paid"
                              ? "bg-sp-teal/10 text-sp-teal"
                              : "bg-sp-orange/10 text-sp-orange"
                        }`}
                      >
                        {tx.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}
