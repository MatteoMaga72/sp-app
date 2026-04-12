"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
  Lightbulb,
  Send,
  TrendingDown,
  TrendingUp,
  Zap,
  Droplets,
  Flame,
  FileText,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PortalNav from "@/components/website/portal-nav";

/* ------------------------------------------------------------------ */
/*  Mock Data                                                          */
/* ------------------------------------------------------------------ */

const BILL_TOTAL = 154.08;
const PREVIOUS_TOTAL = 177.55;

const breakdownData = [
  {
    key: "electricity",
    label: "Electricity",
    icon: Zap,
    amount: 98.5,
    color: "#00BFA5",
    detail: "412 kWh x $0.2391/kWh",
    pct: 64,
  },
  {
    key: "water",
    label: "Water",
    icon: Droplets,
    amount: 32.2,
    color: "#2196F3",
    detail: "7.3 Cu M x various tariff tiers",
    pct: 21,
  },
  {
    key: "gas",
    label: "Gas",
    icon: Flame,
    amount: 12.8,
    color: "#FF9800",
    detail: "Piped gas usage",
    pct: 8,
  },
  {
    key: "gst",
    label: "GST (9%)",
    icon: FileText,
    amount: 10.58,
    color: "#9E9E9E",
    detail: "9% Goods & Services Tax",
    pct: 7,
  },
];

const pieData = breakdownData.map((item) => ({
  name: item.label,
  value: item.amount,
  color: item.color,
}));

const comparison = [
  { label: "Electricity", prev: 121.3, curr: 98.5, change: -18.8 },
  { label: "Water", prev: 35.1, curr: 32.2, change: -8.3 },
  { label: "Gas", prev: 14.2, curr: 12.8, change: -9.9 },
];

const chatMessages = [
  {
    role: "assistant" as const,
    text: "Your March bill is $154.08, which is $23.47 less than February. Your electricity usage dropped 18.8% -- great job! Your biggest saving came from reduced AC usage during cooler weather.",
  },
  {
    role: "user" as const,
    text: "Why is my water bill still high?",
  },
  {
    role: "assistant" as const,
    text: "Your water usage at 7.3 Cu M is 5% above your neighbourhood average of 6.9 Cu M. I noticed higher usage on weekends -- this could be from laundry or extended showers. Try running full loads only to optimise.",
  },
];

const tips = [
  "Set your AC to 25 C instead of 22 C to save up to 15% on cooling costs.",
  "Switch to LED bulbs -- they use 75% less energy than incandescent.",
  "Fix leaky taps -- a drip per second wastes 19 litres per day.",
];

const transactionHistory = [
  {
    date: "06 Mar 2026",
    desc: "March 2026 PDF Bill",
    amount: "$154.08",
    status: "Unpaid" as const,
  },
  {
    date: "25 Feb 2026",
    desc: "Bill Payment (GIRO)",
    amount: "$177.55",
    status: "Paid" as const,
  },
  {
    date: "11 Feb 2026",
    desc: "February 2026 PDF Bill",
    amount: "$177.55",
    status: "Paid" as const,
  },
  {
    date: "20 Jan 2026",
    desc: "Bill Payment (GIRO)",
    amount: "$163.09",
    status: "Paid" as const,
  },
  {
    date: "06 Jan 2026",
    desc: "January 2026 PDF Bill",
    amount: "$163.09",
    status: "Paid" as const,
  },
  {
    date: "20 Dec 2025",
    desc: "Bill Payment (GIRO)",
    amount: "$158.42",
    status: "Paid" as const,
  },
];

interface PieTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; value: number } }>;
}

function BillPieTooltip({ active, payload }: PieTooltipProps) {
  if (active && payload && payload.length > 0) {
    const data = payload[0].payload;
    return (
      <div className="glass-strong rounded-lg px-3 py-2 shadow-lg text-xs">
        <p className="font-semibold text-white">{data.name}</p>
        <p className="text-sp-teal">${data.value.toFixed(2)}</p>
      </div>
    );
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function BillsPage() {
  const [chatInput, setChatInput] = useState("");

  const savings = PREVIOUS_TOTAL - BILL_TOTAL;

  return (
    <div
      className="min-h-screen w-full relative"
      style={{ maxWidth: "none" }}
    >
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 -z-10" />

      {/* Ambient orb */}
      <div
        className="fixed top-40 left-1/3 w-[350px] h-[350px] rounded-full opacity-10 floating-orb pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(76,175,80,0.5) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      <PortalNav />

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Back nav + actions */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <Link
              href="/website/portal"
              className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <ArrowLeft size={20} className="text-gray-400" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white">
                March 2026 Bill
              </h1>
              <p className="text-gray-400 text-sm">
                18 Everton Rd Singapore 089374
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:bg-white/5 transition-colors spring-button">
              <Download size={16} />
              Download
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:bg-white/5 transition-colors spring-button">
              <Printer size={16} />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:bg-white/5 transition-colors spring-button">
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        {/* Total + savings bar */}
        <div className="glass-strong rounded-2xl p-6 mb-6 flex items-center justify-between animate-fade-in-up delay-100" style={{ opacity: 0 }}>
          <div>
            <p className="text-gray-400 text-xs mb-1">Total Amount</p>
            <p className="text-4xl font-bold text-white">
              ${BILL_TOTAL.toFixed(2)}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-gray-500 text-xs">Previous Month</p>
              <p className="text-gray-400 text-lg font-semibold">
                ${PREVIOUS_TOTAL.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 bg-sp-green/10 px-3 py-1.5 rounded-full">
              <TrendingDown size={14} className="text-sp-green" />
              <span className="text-sm font-semibold text-sp-green">
                -${savings.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Two-column: Breakdown + AI */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left: Donut chart + breakdown */}
          <div className="glass-strong rounded-2xl p-6 animate-fade-in-up delay-200" style={{ opacity: 0 }}>
            <h2 className="text-sm font-semibold text-gray-400 mb-4">
              Bill Breakdown
            </h2>

            <div className="flex items-center gap-6">
              {/* Donut chart */}
              <div className="w-[180px] h-[180px] flex-shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<BillPieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Breakdown list */}
              <div className="flex-1 space-y-3">
                {breakdownData.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.key}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <Icon size={14} style={{ color: item.color }} />
                        <div>
                          <p className="text-sm text-white font-medium">
                            {item.label}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {item.detail}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white">
                          ${item.amount.toFixed(2)}
                        </p>
                        <p className="text-[10px] text-gray-500">
                          {item.pct}%
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Month-over-month comparison */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <h3 className="text-xs font-semibold text-gray-500 mb-3">
                MONTH-OVER-MONTH
              </h3>
              <div className="space-y-2">
                {comparison.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-xs"
                  >
                    <span className="text-gray-300 w-24">{item.label}</span>
                    <div className="flex-1 mx-3 flex items-center gap-2">
                      <span className="text-gray-500">
                        ${item.prev.toFixed(2)}
                      </span>
                      <ChevronRight size={12} className="text-gray-600" />
                      <span className="text-white font-medium">
                        ${item.curr.toFixed(2)}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        item.change < 0 ? "text-sp-green" : "text-sp-red"
                      }`}
                    >
                      {item.change < 0 ? (
                        <TrendingDown size={12} />
                      ) : (
                        <TrendingUp size={12} />
                      )}
                      <span className="font-semibold">
                        {item.change.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: AI chat + tips */}
          <div className="space-y-6">
            {/* AI Bill Explainer Chat */}
            <div className="glass-strong rounded-2xl p-6 animate-fade-in-up delay-300" style={{ opacity: 0 }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-sp-teal to-emerald-400 flex items-center justify-center">
                  <Lightbulb size={14} className="text-white" />
                </div>
                <h2 className="text-sm font-semibold text-gray-400">
                  AI Bill Explainer
                </h2>
              </div>

              {/* Chat messages */}
              <div className="space-y-3 max-h-[260px] overflow-y-auto mb-4">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "bg-sp-teal text-white rounded-br-md"
                          : "bg-white/5 text-gray-300 border border-white/5 rounded-bl-md"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about your bill..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sp-teal/50 transition-colors"
                />
                <button className="p-2.5 rounded-xl bg-sp-teal text-white hover:opacity-90 transition-opacity spring-button">
                  <Send size={16} />
                </button>
              </div>
            </div>

            {/* Energy-saving tips */}
            <div className="glass rounded-2xl p-6 animate-fade-in-up delay-400" style={{ opacity: 0 }}>
              <h2 className="text-sm font-semibold text-gray-400 mb-3">
                Energy-Saving Tips
              </h2>
              <div className="space-y-2.5">
                {tips.map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5"
                  >
                    <Lightbulb
                      size={14}
                      className="text-sp-orange flex-shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Transaction history table */}
        <div className="glass-strong rounded-2xl p-6 animate-fade-in-up delay-500" style={{ opacity: 0 }}>
          <h2 className="text-sm font-semibold text-gray-400 mb-4">
            Transaction History
          </h2>
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
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3 pr-4">
                    Amount
                  </th>
                  <th className="text-right text-[11px] font-semibold text-gray-500 uppercase tracking-wider pb-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactionHistory.map((tx) => (
                  <tr
                    key={`${tx.date}-${tx.desc}`}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <td className="py-3 pr-4 text-xs text-gray-400">
                      {tx.date}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        {tx.status === "Paid" || tx.status === "Unpaid" ? (
                          <FileText size={14} className="text-gray-500" />
                        ) : (
                          <CheckCircle
                            size={14}
                            className="text-sp-green"
                          />
                        )}
                        <span className="text-sm text-white font-medium">
                          {tx.desc}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 pr-4 text-sm text-white text-right font-semibold">
                      {tx.amount}
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                          tx.status === "Paid"
                            ? "bg-sp-green/10 text-sp-green"
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
