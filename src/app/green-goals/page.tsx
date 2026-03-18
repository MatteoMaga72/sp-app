"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  HelpCircle,
  Zap,
  Droplets,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share2,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from "recharts";

const goalCards = [
  {
    id: 1,
    icon: Zap,
    status: "ON TRACK",
    statusColor: "bg-sp-green",
    title: "Use 15% less electricity.",
    description:
      "Reduce electricity consumption by 15% compared to 2018 levels.",
  },
  {
    id: 2,
    icon: Droplets,
    status: "OFF TRACK",
    statusColor: "bg-sp-orange",
    title: "Use 18% less water.",
    description: "Reduce water consumption by 18% compared to 2018 levels.",
  },
];

const districtMonthlyData = [
  { month: "Sep", value: 3450 },
  { month: "Oct", value: 3280 },
  { month: "Nov", value: 3520 },
  { month: "Dec", value: 3690 },
  { month: "Jan", value: 3930 },
  { month: "Feb", value: 3170 },
];

export default function GreenGoalsPage() {
  const [activeGoal, setActiveGoal] = useState(0);
  const [activeTab, setActiveTab] = useState<
    "Your Home" | "Your District" | "Singapore"
  >("Your Home");

  const tabs = ["Your Home", "Your District", "Singapore"] as const;

  const handlePrevGoal = () => {
    setActiveGoal((prev) => (prev === 0 ? goalCards.length - 1 : prev - 1));
  };

  const handleNextGoal = () => {
    setActiveGoal((prev) => (prev === goalCards.length - 1 ? 0 : prev + 1));
  };

  const currentGoal = goalCards[activeGoal];
  const GoalIcon = currentGoal.icon;

  return (
    <div className="min-h-screen bg-sp-gray pb-6">
      {/* Header */}
      <div className="bg-sp-teal px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-white text-lg font-semibold">Green Goals</h1>
        <button className="text-white">
          <HelpCircle className="w-6 h-6" />
        </button>
      </div>

      {/* Hero Illustration */}
      <div className="relative bg-gradient-to-b from-sp-teal to-sp-teal-dark overflow-hidden">
        <div className="px-6 pt-6 pb-20 relative z-10">
          <p className="text-white text-xl font-bold text-center">
            Achieve our Green Goals
            <br />
            by 2030!
          </p>
        </div>

        {/* Cityscape Illustration */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-4">
          {/* Tree left */}
          <div className="flex flex-col items-center mb-0">
            <div className="w-6 h-8 rounded-full bg-green-600 opacity-70" />
            <div className="w-1.5 h-3 bg-green-800 opacity-70" />
          </div>
          {/* Building 1 */}
          <div className="w-8 h-16 bg-white/20 rounded-t-sm relative">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
              <div className="bg-yellow-300/40 rounded-sm" />
              <div className="bg-yellow-300/20 rounded-sm" />
              <div className="bg-yellow-300/30 rounded-sm" />
              <div className="bg-yellow-300/40 rounded-sm" />
            </div>
          </div>
          {/* Building 2 */}
          <div className="w-10 h-24 bg-white/15 rounded-t-sm relative">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
              <div className="bg-yellow-300/30 rounded-sm" />
              <div className="bg-yellow-300/20 rounded-sm" />
              <div className="bg-yellow-300/40 rounded-sm" />
              <div className="bg-yellow-300/10 rounded-sm" />
              <div className="bg-yellow-300/30 rounded-sm" />
              <div className="bg-yellow-300/40 rounded-sm" />
            </div>
          </div>
          {/* Building 3 - tall */}
          <div className="w-12 h-32 bg-white/20 rounded-t-sm relative">
            <div className="absolute inset-1 grid grid-cols-3 gap-0.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-yellow-300/30 rounded-sm"
                  style={{ opacity: Math.random() * 0.5 + 0.2 }}
                />
              ))}
            </div>
          </div>
          {/* Tree middle */}
          <div className="flex flex-col items-center mb-0">
            <div className="w-8 h-10 rounded-full bg-green-500 opacity-60" />
            <div className="w-2 h-3 bg-green-700 opacity-60" />
          </div>
          {/* Building 4 */}
          <div className="w-10 h-20 bg-white/15 rounded-t-sm relative">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
              <div className="bg-yellow-300/30 rounded-sm" />
              <div className="bg-yellow-300/40 rounded-sm" />
              <div className="bg-yellow-300/20 rounded-sm" />
              <div className="bg-yellow-300/30 rounded-sm" />
              <div className="bg-yellow-300/40 rounded-sm" />
              <div className="bg-yellow-300/10 rounded-sm" />
            </div>
          </div>
          {/* Building 5 */}
          <div className="w-8 h-28 bg-white/20 rounded-t-sm relative">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-yellow-300/30 rounded-sm"
                  style={{ opacity: Math.random() * 0.5 + 0.2 }}
                />
              ))}
            </div>
          </div>
          {/* Building 6 */}
          <div className="w-7 h-14 bg-white/15 rounded-t-sm relative">
            <div className="absolute inset-1 grid grid-cols-2 gap-0.5">
              <div className="bg-yellow-300/30 rounded-sm" />
              <div className="bg-yellow-300/20 rounded-sm" />
              <div className="bg-yellow-300/40 rounded-sm" />
              <div className="bg-yellow-300/30 rounded-sm" />
            </div>
          </div>
          {/* Tree right */}
          <div className="flex flex-col items-center mb-0">
            <div className="w-7 h-9 rounded-full bg-green-600 opacity-70" />
            <div className="w-1.5 h-3 bg-green-800 opacity-70" />
          </div>
        </div>
      </div>

      {/* Goal Cards Carousel */}
      <div className="px-4 -mt-6 relative z-10">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/30 p-5 relative">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={handlePrevGoal}
              className="w-8 h-8 rounded-full bg-sp-gray flex items-center justify-center"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
            <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wide">
              Green Goal {currentGoal.id}
            </p>
            <button
              onClick={handleNextGoal}
              className="w-8 h-8 rounded-full bg-sp-gray flex items-center justify-center"
            >
              <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </button>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-14 h-14 rounded-full bg-sp-teal-light flex items-center justify-center mb-3">
              <GoalIcon className="w-7 h-7 text-sp-teal" />
            </div>
            <span
              className={`${currentGoal.statusColor} text-white text-xs font-bold px-3 py-1 rounded-full mb-3`}
            >
              {currentGoal.status}
            </span>
            <p className="text-sp-dark text-base font-semibold mb-1">
              {currentGoal.title}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              {currentGoal.description}
            </p>
            <button className="text-sp-teal text-sm font-semibold">
              View Details &rarr;
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {goalCards.map((_, idx) => (
              <div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx === activeGoal ? "bg-sp-teal" : "bg-gray-300 dark:bg-gray-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Consumption Details Section */}
      <div className="px-4 mt-6">
        <h2 className="text-sp-dark text-base font-bold mb-3">
          Consumption Details
        </h2>

        {/* Tab Bar */}
        <div className="flex bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm dark:shadow-gray-900/30 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                activeTab === tab
                  ? "text-sp-teal border-b-2 border-sp-teal bg-white dark:bg-gray-800"
                  : "text-gray-400 bg-white dark:bg-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "Your Home" && <YourHomeTab />}
        {activeTab === "Your District" && <YourDistrictTab />}
        {activeTab === "Singapore" && <SingaporeTab />}
      </div>

      {/* Share Button */}
      <div className="px-4 mt-6">
        <button className="w-full bg-sp-teal text-white py-4 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-md active:opacity-90">
          <Share2 className="w-5 h-5" />
          Share and Spread Sustainability
        </button>
      </div>
    </div>
  );
}

function YourHomeTab() {
  const usedKwh = 125.8;
  const targetKwh = 293.26;
  const progressPercent = Math.min((usedKwh / targetKwh) * 100, 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4 space-y-4">
      {/* Address Dropdown */}
      <button className="flex items-center gap-2 text-sp-dark font-semibold text-sm">
        <span>18 Everton Rd</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Total Usage */}
      <div>
        <p className="text-sp-teal text-2xl font-bold">401.00 kWh</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">used in Feb 2026</p>
      </div>

      {/* Comparison */}
      <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 rounded-lg p-3">
        <div className="mt-0.5">
          <TrendingUp className="w-5 h-5 text-sp-red" />
        </div>
        <div>
          <p className="text-sp-dark text-sm">
            <span className="font-bold text-sp-red">20.06% more</span>{" "}
            electricity used than Jan 2026
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Zap className="w-4 h-4 text-sp-orange" />
            <p className="text-sp-orange text-sm font-semibold">
              $21.32 estimated additional costs
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-sp-gray rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-sp-dark font-semibold">This Month</p>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 mb-2">
          <div
            className="bg-sp-teal h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>
            Used <span className="font-bold text-sp-dark">{usedKwh} kWh</span>
          </span>
          <span>
            Target{" "}
            <span className="font-bold text-sp-dark">&lt; {targetKwh} kWh</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function YourDistrictTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4 space-y-4">
      {/* District Dropdown */}
      <button className="flex items-center gap-2 text-sp-dark font-semibold text-sm">
        <span>D2 (Anson, Tanjong Pagar)</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>

      {/* Total Usage */}
      <div>
        <p className="text-sp-teal text-2xl font-bold">3,170.40 MWh</p>
        <p className="text-gray-500 dark:text-gray-400 text-sm">used in Feb 2026</p>
      </div>

      {/* Comparison */}
      <div className="flex items-start gap-2 bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
        <div className="mt-0.5">
          <TrendingDown className="w-5 h-5 text-sp-green" />
        </div>
        <div>
          <p className="text-sp-dark text-sm">
            <span className="font-bold text-sp-green">19.38% less</span>{" "}
            electricity used than Jan 2026
          </p>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mt-2">
        <p className="text-sm text-sp-dark font-semibold mb-3">
          Monthly Consumption (MWh)
        </p>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={districtMonthlyData}
              margin={{ top: 5, right: 5, left: -15, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#999" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#999" }}
                axisLine={false}
                tickLine={false}
                domain={[0, 4500]}
              />
              <Tooltip
                formatter={(value) => [`${value} MWh`, "Usage"]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                }}
              />
              <ReferenceLine
                y={3300}
                stroke="#FF6D00"
                strokeDasharray="4 4"
                label={{
                  value: "2030 Target",
                  position: "right",
                  fontSize: 10,
                  fill: "#FF6D00",
                }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={28}>
                {districtMonthlyData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      index === districtMonthlyData.length - 1
                        ? "#00BFA5"
                        : "#B2DFDB"
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function SingaporeTab() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
      <div className="text-center py-8">
        <Zap className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
        <p className="text-gray-400 text-sm">
          National consumption data coming soon.
        </p>
      </div>
    </div>
  );
}
