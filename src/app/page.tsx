"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  Bell,
  QrCode,
  Zap,
  Leaf,
  MoreHorizontal,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Droplets,
  AlertCircle,
  Users,
  Activity,
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

type Period = "today" | "week" | "month" | "year";

const electricityByPeriod: Record<Period, Array<{ day: string; value: number; date: string }>> = {
  year: [
    { day: "J*", value: 8.2, date: "Jan 2026" },
    { day: "F*", value: 7.3, date: "Feb 2026" },
    { day: "M*", value: 3.8, date: "Mar 2026" },
    { day: "A", value: 0, date: "Apr 2026" },
    { day: "M", value: 0, date: "May 2026" },
    { day: "J", value: 0, date: "Jun 2026" },
    { day: "J", value: 0, date: "Jul 2026" },
    { day: "A", value: 0, date: "Aug 2026" },
    { day: "S", value: 0, date: "Sep 2026" },
    { day: "O", value: 0, date: "Oct 2026" },
    { day: "N", value: 0, date: "Nov 2026" },
    { day: "D", value: 0, date: "Dec 2026" },
  ],
  today: [
    { day: "12am", value: 0.3, date: "18 Mar 12:00am" },
    { day: "4am", value: 0.2, date: "18 Mar 4:00am" },
    { day: "8am", value: 1.8, date: "18 Mar 8:00am" },
    { day: "12pm", value: 2.5, date: "18 Mar 12:00pm" },
    { day: "4pm", value: 3.1, date: "18 Mar 4:00pm" },
    { day: "8pm", value: 2.2, date: "18 Mar 8:00pm" },
    { day: "Now", value: 0.95, date: "18 Mar 10:45pm" },
  ],
  week: [
    { day: "Mon", value: 22, date: "16 Mar (Mon)" },
    { day: "Tue", value: 15, date: "17 Mar (Tue)" },
    { day: "Wed", value: 0.95, date: "18 Mar (Wed)" },
    { day: "Thu", value: 0, date: "19 Mar (Thu)" },
    { day: "Fri", value: 0, date: "20 Mar (Fri)" },
    { day: "Sat", value: 0, date: "21 Mar (Sat)" },
    { day: "Sun", value: 0, date: "22 Mar (Sun)" },
  ],
  month: [
    { day: "W1", value: 95, date: "1-7 Mar" },
    { day: "W2", value: 88, date: "8-14 Mar" },
    { day: "W3", value: 37.95, date: "15-18 Mar" },
    { day: "W4", value: 0, date: "19-25 Mar" },
    { day: "W5", value: 0, date: "26-31 Mar" },
  ],
};

const waterByPeriod: Record<Period, Array<{ day: string; value: number; date: string }>> = {
  year: [
    { day: "J*", value: 7.5, date: "Jan 2026" },
    { day: "F*", value: 7.3, date: "Feb 2026" },
    { day: "M*", value: 3.2, date: "Mar 2026" },
    { day: "A", value: 0, date: "Apr 2026" },
    { day: "M", value: 0, date: "May 2026" },
    { day: "J", value: 0, date: "Jun 2026" },
    { day: "J", value: 0, date: "Jul 2026" },
    { day: "A", value: 0, date: "Aug 2026" },
    { day: "S", value: 0, date: "Sep 2026" },
    { day: "O", value: 0, date: "Oct 2026" },
    { day: "N", value: 0, date: "Nov 2026" },
    { day: "D", value: 0, date: "Dec 2026" },
  ],
  today: [
    { day: "12am", value: 0, date: "18 Mar 12:00am" },
    { day: "4am", value: 0, date: "18 Mar 4:00am" },
    { day: "8am", value: 0.3, date: "18 Mar 8:00am" },
    { day: "12pm", value: 0.15, date: "18 Mar 12:00pm" },
    { day: "4pm", value: 0.1, date: "18 Mar 4:00pm" },
    { day: "8pm", value: 0.25, date: "18 Mar 8:00pm" },
    { day: "Now", value: 0.05, date: "18 Mar 10:45pm" },
  ],
  week: [
    { day: "Mon", value: 0.85, date: "16 Mar (Mon)" },
    { day: "Tue", value: 1.2, date: "17 Mar (Tue)" },
    { day: "Wed", value: 0.65, date: "18 Mar (Wed)" },
    { day: "Thu", value: 0, date: "19 Mar (Thu)" },
    { day: "Fri", value: 0, date: "20 Mar (Fri)" },
    { day: "Sat", value: 0, date: "21 Mar (Sat)" },
    { day: "Sun", value: 0, date: "22 Mar (Sun)" },
  ],
  month: [
    { day: "W1", value: 5.2, date: "1-7 Mar" },
    { day: "W2", value: 4.8, date: "8-14 Mar" },
    { day: "W3", value: 2.7, date: "15-18 Mar" },
    { day: "W4", value: 0, date: "19-25 Mar" },
    { day: "W5", value: 0, date: "26-31 Mar" },
  ],
};

const periodLabels: Record<Period, string> = {
  today: "TODAY",
  week: "THIS WEEK",
  month: "THIS MONTH",
  year: "THIS YEAR",
};

const periods: Period[] = ["today", "week", "month", "year"];

const promoCards = [
  {
    id: 1,
    title: "Pledge to waste less with GreenUP now",
    subtitle: "Make a difference today",
    bg: "bg-emerald-50 dark:bg-emerald-950",
    accent: "text-sp-green",
  },
  {
    id: 2,
    title: "Up to 4.33% cashback on bills",
    subtitle: "Pay with DBS/POSB Cards",
    bg: "bg-orange-50 dark:bg-orange-950",
    accent: "text-sp-orange",
  },
  {
    id: 3,
    title: "Refer a friend & earn rewards",
    subtitle: "Share the SP experience",
    bg: "bg-teal-50 dark:bg-teal-950",
    accent: "text-sp-teal",
  },
];

interface ChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { date: string; value: number } }>;
  unit: string;
}

function ChartTooltip({ active, payload, unit }: ChartTooltipProps) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-sp-dark text-white text-xs px-3 py-2 rounded-lg shadow-lg">
        <p className="font-medium">
          {data.date} {data.value} {unit}
        </p>
      </div>
    );
  }
  return null;
}

export default function Home() {
  const [activeUtility, setActiveUtility] = useState<"electricity" | "water">(
    "electricity"
  );
  const [activePeriod, setActivePeriod] = useState<Period>("week");
  const [showPeriodMenu, setShowPeriodMenu] = useState(false);
  const [activePromo, setActivePromo] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const chartData =
    activeUtility === "electricity"
      ? electricityByPeriod[activePeriod]
      : waterByPeriod[activePeriod];
  const unit = activeUtility === "electricity" ? "kWh" : "m\u00B3";
  const accentColor = activeUtility === "electricity" ? "#00BFA5" : "#2196F3";

  const cyclePeriod = (direction: "left" | "right") => {
    const idx = periods.indexOf(activePeriod);
    if (direction === "left") {
      setActivePeriod(periods[(idx - 1 + periods.length) % periods.length]);
    } else {
      setActivePeriod(periods[(idx + 1) % periods.length]);
    }
  };

  const scrollCarousel = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 260;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-gradient-home min-h-screen relative overflow-hidden">
      {/* Floating gradient orbs for depth */}
      <div
        className="absolute top-20 -right-10 w-[200px] h-[200px] rounded-full opacity-30 floating-orb pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,191,165,0.6) 0%, rgba(0,191,165,0) 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute bottom-40 -left-10 w-[160px] h-[160px] rounded-full opacity-20 floating-orb pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(33,150,243,0.5) 0%, rgba(33,150,243,0) 70%)",
          filter: "blur(60px)",
          animationDelay: "3s",
        }}
      />

      {/* Header */}
      <div className="glass-strong px-5 pt-12 pb-4 animate-fade-in-up relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sp-teal flex items-center justify-center text-white font-bold text-sm">
              MM
            </div>
            <div>
              <p className="text-lg font-semibold text-sp-dark">Hello, MML</p>
            </div>
          </div>
          <div className="relative glow-teal rounded-full p-1 animate-bounce-in delay-300" style={{ opacity: 0 }}>
            <Bell className="w-6 h-6 text-sp-dark" />
            <span className="absolute -top-2 -right-2 bg-sp-red text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              20
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5">
          <Users className="w-4 h-4 text-sp-green" />
          <Link
            href="#"
            className="text-sp-green text-sm font-medium underline"
          >
            Share your utilities account with your family
          </Link>
        </div>
      </div>

      {/* Energy Flow Banner */}
      <Link
        href="/energy-flow"
        className="mx-4 mt-3 block rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-600 dark:to-emerald-600 px-4 py-3 shadow-sm active:opacity-90 press-effect opacity-0 animate-fade-in-up delay-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Activity className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-bold tracking-wide">NEW: Live Energy Flow Dashboard</p>
              <p className="text-white/80 text-[10px] mt-0.5">Watch energy flowing through your home in real-time</p>
            </div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/80 flex-shrink-0" />
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="glass rounded-3xl mx-4 mt-3 p-4 opacity-0 animate-fade-in-up delay-100 relative z-10">
        <div className="grid grid-cols-4 gap-2">
          <button className="flex flex-col items-center gap-2 p-2 rounded-xl active:bg-gray-50 dark:active:bg-gray-700 press-effect">
            <div className="w-12 h-12 rounded-xl bg-sp-teal-light flex items-center justify-center">
              <QrCode className="w-6 h-6 text-sp-teal" />
            </div>
            <span className="text-xs text-sp-dark font-medium">Scan QR</span>
          </button>
          <Link
            href="/utilities"
            className="flex flex-col items-center gap-2 p-2 rounded-xl active:bg-gray-50 dark:active:bg-gray-700 press-effect"
          >
            <div className="w-12 h-12 rounded-xl bg-sp-teal-light flex items-center justify-center">
              <Zap className="w-6 h-6 text-sp-teal" />
            </div>
            <span className="text-xs text-sp-dark font-medium text-center">
              Utilities Services
            </span>
          </Link>
          <Link
            href="/green-goals"
            className="flex flex-col items-center gap-2 p-2 rounded-xl active:bg-gray-50 dark:active:bg-gray-700 press-effect"
          >
            <div className="w-12 h-12 rounded-xl bg-sp-teal-light flex items-center justify-center">
              <Leaf className="w-6 h-6 text-sp-teal" />
            </div>
            <span className="text-xs text-sp-dark font-medium text-center">
              Green Goals
            </span>
          </Link>
          <button className="flex flex-col items-center gap-2 p-2 rounded-xl active:bg-gray-50 dark:active:bg-gray-700 press-effect">
            <div className="w-12 h-12 rounded-xl bg-sp-teal-light flex items-center justify-center">
              <MoreHorizontal className="w-6 h-6 text-sp-teal" />
            </div>
            <span className="text-xs text-sp-dark font-medium">More</span>
          </button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="mx-4 mt-3 relative z-10 opacity-0 animate-slide-in-right delay-200">
        <button className="w-full glass-subtle border-l-4 border-sp-orange rounded-2xl px-4 py-3 flex items-center gap-3 active:bg-gray-50 dark:active:bg-gray-700 press-effect">
          <AlertCircle className="w-5 h-5 text-sp-orange flex-shrink-0" />
          <p className="text-xs text-sp-dark text-left leading-relaxed">
            <span className="font-semibold">Important</span> Scheduled
            Maintenance for 21-22 March &amp; Scam Alert.{" "}
            <span className="text-sp-orange font-semibold">Tap Here</span>
          </p>
        </button>
      </div>

      {/* Consumption Card */}
      <div className="glass-strong rounded-3xl mx-4 mt-3 overflow-hidden relative z-10 opacity-0 animate-fade-in-up delay-300">
        {/* Address selector */}
        <div className="px-4 pt-4 pb-2">
          <button className="flex items-center gap-1 text-sp-dark">
            <span className="font-semibold text-sm">18 Everton Rd</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Utility Toggle */}
        <div className="px-4 flex gap-2">
          <button
            onClick={() => setActiveUtility("electricity")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors spring-button ${
              activeUtility === "electricity"
                ? "bg-sp-teal text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            <Zap className="w-4 h-4" />
            Electricity
          </button>
          <button
            onClick={() => setActiveUtility("water")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors spring-button ${
              activeUtility === "water"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
            }`}
          >
            <Droplets className="w-4 h-4" />
            Water
          </button>
        </div>

        {/* Period Selector */}
        <div className="flex items-center justify-center gap-4 mt-3 px-4 relative">
          <button
            onClick={() => cyclePeriod("left")}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 press-effect"
          >
            <ChevronLeft className="w-5 h-5 text-gray-400" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowPeriodMenu(!showPeriodMenu)}
              className="flex items-center gap-1 text-sm font-semibold text-sp-dark tracking-wide spring-button"
            >
              {periodLabels[activePeriod]}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showPeriodMenu && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 glass-strong rounded-xl shadow-lg py-1 z-20 min-w-[140px] animate-fade-in-scale">
                {periods.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setActivePeriod(p);
                      setShowPeriodMenu(false);
                    }}
                    className={`w-full px-4 py-2.5 text-sm font-medium text-left hover:bg-sp-teal-light dark:hover:bg-sp-teal/20 transition-colors ${
                      activePeriod === p
                        ? "text-sp-teal font-bold"
                        : "text-sp-dark"
                    }`}
                  >
                    {periodLabels[p]}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => cyclePeriod("right")}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:bg-gray-200 dark:active:bg-gray-600 press-effect"
          >
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Bar Chart */}
        <div className="px-2 pt-2 pb-4">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 20, left: -10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#eee"
              />
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#999" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#999" }}
                width={40}
              />
              <Tooltip
                content={<ChartTooltip unit={unit} />}
                cursor={{ fill: "rgba(0,0,0,0.04)" }}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]} maxBarSize={32}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.value > 0 ? accentColor : "#E0E0E0"}
                    opacity={entry.value > 0 ? 1 : 0.3}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart Legend */}
        <div className="px-4 pb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: accentColor }}
            />
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Daily usage ({unit})
            </span>
          </div>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Updated as of 18 Mar 2026
          </span>
        </div>
      </div>

      {/* Energy Insights Banner */}
      <div className="mx-4 mt-3 relative z-10 opacity-0 animate-fade-in-up delay-400">
        <button className="w-full bg-sp-teal glow-teal rounded-3xl px-4 py-4 flex items-center justify-between active:opacity-90 spring-button">
          <div className="flex-1">
            <p className="text-white text-sm font-semibold leading-snug">
              Learn more about energy insights to start optimising!
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-white flex-shrink-0 ml-3" />
        </button>
      </div>

      {/* Promotional Carousel */}
      <div className="mt-3 pb-6 relative z-10 opacity-0 animate-fade-in-up delay-500">
        <div className="flex items-center justify-between px-4 mb-2">
          <h3 className="text-sm font-semibold text-sp-dark">For You</h3>
          <div className="flex gap-1">
            <button
              onClick={() => scrollCarousel("left")}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => scrollCarousel("right")}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto px-4 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {promoCards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => setActivePromo(index)}
              className={`flex-shrink-0 w-[240px] snap-start glass rounded-3xl p-4 ${card.bg} active:scale-[0.98] transition-transform text-left`}
            >
              <div className="h-24 flex flex-col justify-between">
                <div>
                  <p
                    className={`text-sm font-semibold ${card.accent} leading-snug`}
                  >
                    {card.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{card.subtitle}</p>
                </div>
                <div className="flex justify-end">
                  <ArrowRight className={`w-4 h-4 ${card.accent}`} />
                </div>
              </div>
            </button>
          ))}
        </div>
        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {promoCards.map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                index === activePromo ? "bg-sp-teal" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
