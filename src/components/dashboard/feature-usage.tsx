"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const FEATURE_DATA = [
  { name: "GIRO Setup", value: 92, label: "92% completion (was 34%)" },
  { name: "Bill Explainer", value: 78, label: "78% interactive mode" },
  { name: "GreenUP", value: 67, label: "67% completion rate" },
  { name: "SPBuddy", value: 89, label: "23.4k convos / 89% resolved" },
  { name: "EV Calculator", value: 42, label: "4,200 calcs this week" },
];

const BAR_COLORS = ["#00BFA5", "#34d399", "#22d3ee", "#fbbf24", "#a78bfa"];

interface CustomLabelProps {
  x?: number;
  y?: number;
  width?: number;
  value?: number;
}

function CustomLabel({ x = 0, y = 0, width = 0, value = 0 }: CustomLabelProps) {
  return (
    <text
      x={x + width + 6}
      y={y + 14}
      fill="#9ca3af"
      fontSize={10}
      fontWeight={500}
    >
      {value}%
    </text>
  );
}

export default function FeatureUsage() {
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-bold text-sp-dark mb-1">Feature Adoption</h3>
      <p className="text-[10px] text-gray-500 mb-3">Usage rates across key features</p>

      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={FEATURE_DATA}
            layout="vertical"
            margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
          >
            <XAxis type="number" domain={[0, 100]} hide />
            <YAxis
              type="category"
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "#9ca3af" }}
              width={80}
            />
            <Bar
              dataKey="value"
              radius={[0, 6, 6, 0]}
              maxBarSize={20}
              isAnimationActive={false}
            >
              {FEATURE_DATA.map((_, index) => (
                <Cell key={`cell-${index}`} fill={BAR_COLORS[index]} opacity={0.8} />
              ))}
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 space-y-1.5">
        {FEATURE_DATA.map((feature, i) => (
          <div key={feature.name} className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: BAR_COLORS[i] }}
            />
            <span className="text-[10px] text-gray-500">{feature.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
