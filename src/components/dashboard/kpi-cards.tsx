"use client";

import { TrendingUp, Phone, Star, Users } from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";

interface KpiCardProps {
  title: string;
  value: string;
  trend: string;
  trendPositive: boolean;
  target?: string;
  icon: React.ReactNode;
  sparklineData: Array<{ v: number }>;
  gradientId: string;
  gradientColors: [string, string];
  highlight?: boolean;
}

function KpiCard({
  title,
  value,
  trend,
  trendPositive,
  target,
  icon,
  sparklineData,
  gradientId,
  gradientColors,
  highlight,
}: KpiCardProps) {
  return (
    <div
      className={`glass rounded-2xl p-3.5 relative overflow-hidden hover-lift ${
        highlight ? "ring-1 ring-sp-teal/40 glow-teal" : ""
      }`}
    >
      {highlight && (
        <div className="absolute top-0 right-0 bg-sp-teal text-white text-[8px] font-bold px-2 py-0.5 rounded-bl-lg">
          TOP WIN
        </div>
      )}

      <div className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-sp-teal/20 to-sp-teal/5">
          {icon}
        </div>
        <div
          className={`flex items-center gap-0.5 text-[11px] font-semibold ${
            trendPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          <TrendingUp className={`w-3 h-3 ${!trendPositive ? "rotate-180" : ""}`} />
          {trend}
        </div>
      </div>

      <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-0.5">
        {title}
      </p>
      <p className="text-xl font-bold text-sp-dark">{value}</p>

      {target && (
        <p className="text-[10px] text-gray-500 mt-0.5">
          Target: <span className="text-sp-teal font-medium">{target}</span>
        </p>
      )}

      <div className="h-8 mt-1 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={sparklineData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.4} />
                <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="v"
              stroke={gradientColors[0]}
              strokeWidth={1.5}
              fill={`url(#${gradientId})`}
              dot={false}
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const ADOPTION_SPARKLINE = [
  { v: 45 }, { v: 47 }, { v: 48 }, { v: 50 }, { v: 49 }, { v: 52 }, { v: 53 },
  { v: 55 }, { v: 54 }, { v: 56 }, { v: 58 }, { v: 57 }, { v: 59 }, { v: 60 },
  { v: 58 }, { v: 61 }, { v: 62 }, { v: 60 }, { v: 63 }, { v: 64 }, { v: 63 },
  { v: 65 }, { v: 64 }, { v: 66 }, { v: 65 }, { v: 67 }, { v: 66 }, { v: 67 },
  { v: 67 }, { v: 67.3 },
];

const DEFLECTION_SPARKLINE = [
  { v: 18 }, { v: 19 }, { v: 20 }, { v: 21 }, { v: 22 }, { v: 23 }, { v: 24 },
  { v: 25 }, { v: 26 }, { v: 27 }, { v: 28 }, { v: 27 }, { v: 29 }, { v: 30 },
  { v: 29 }, { v: 31 }, { v: 30 }, { v: 32 }, { v: 31 }, { v: 33 }, { v: 32 },
  { v: 33 }, { v: 34 }, { v: 33 }, { v: 34 }, { v: 35 }, { v: 34 }, { v: 34 },
  { v: 35 }, { v: 34.8 },
];

const RATING_SPARKLINE = [
  { v: 3.8 }, { v: 3.8 }, { v: 3.9 }, { v: 3.9 }, { v: 4.0 }, { v: 4.0 }, { v: 4.0 },
  { v: 4.1 }, { v: 4.1 }, { v: 4.1 }, { v: 4.2 }, { v: 4.2 }, { v: 4.2 }, { v: 4.3 },
  { v: 4.3 }, { v: 4.3 }, { v: 4.3 }, { v: 4.4 }, { v: 4.4 }, { v: 4.4 }, { v: 4.4 },
  { v: 4.5 }, { v: 4.5 }, { v: 4.5 }, { v: 4.5 }, { v: 4.5 }, { v: 4.6 }, { v: 4.6 },
  { v: 4.6 }, { v: 4.6 },
];

const ENGAGEMENT_SPARKLINE = [
  { v: 28 }, { v: 29 }, { v: 30 }, { v: 30 }, { v: 31 }, { v: 32 }, { v: 31 },
  { v: 33 }, { v: 34 }, { v: 33 }, { v: 35 }, { v: 34 }, { v: 36 }, { v: 35 },
  { v: 37 }, { v: 36 }, { v: 38 }, { v: 37 }, { v: 39 }, { v: 38 }, { v: 39 },
  { v: 40 }, { v: 39 }, { v: 40 }, { v: 41 }, { v: 40 }, { v: 41 }, { v: 42 },
  { v: 42 }, { v: 42.1 },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <KpiCard
        title="Digital Adoption"
        value="67.3%"
        trend="+4.2%"
        trendPositive
        target="80%"
        icon={<Users className="w-4 h-4 text-sp-teal" />}
        sparklineData={ADOPTION_SPARKLINE}
        gradientId="adoption-grad"
        gradientColors={["#00BFA5", "#00BFA5"]}
      />
      <KpiCard
        title="Call Deflection"
        value="34.8%"
        trend="+12.1%"
        trendPositive
        target="50%"
        icon={<Phone className="w-4 h-4 text-emerald-400" />}
        sparklineData={DEFLECTION_SPARKLINE}
        gradientId="deflection-grad"
        gradientColors={["#34d399", "#34d399"]}
        highlight
      />
      <KpiCard
        title="App Store Rating"
        value="4.6"
        trend="+0.3"
        trendPositive
        icon={<Star className="w-4 h-4 text-amber-400" />}
        sparklineData={RATING_SPARKLINE}
        gradientId="rating-grad"
        gradientColors={["#fbbf24", "#fbbf24"]}
      />
      <KpiCard
        title="DAU / MAU"
        value="42.1%"
        trend="+8.7%"
        trendPositive
        icon={<Users className="w-4 h-4 text-cyan-400" />}
        sparklineData={ENGAGEMENT_SPARKLINE}
        gradientId="engagement-grad"
        gradientColors={["#22d3ee", "#22d3ee"]}
      />
    </div>
  );
}
