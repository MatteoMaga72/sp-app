"use client";

import { Rocket, TestTube, Timer, CheckCircle } from "lucide-react";

const METRICS = [
  {
    label: "Releases This Month",
    value: "4",
    sub: "weekly cadence",
    icon: <Rocket className="w-4 h-4 text-sp-teal" />,
  },
  {
    label: "Test Coverage",
    value: "94.2%",
    sub: "unit + integration",
    icon: <TestTube className="w-4 h-4 text-emerald-400" />,
  },
  {
    label: "Build Time",
    value: "3m 42s",
    sub: "p50 CI pipeline",
    icon: <Timer className="w-4 h-4 text-cyan-400" />,
  },
  {
    label: "Deploy Success",
    value: "100%",
    sub: "zero rollbacks",
    icon: <CheckCircle className="w-4 h-4 text-amber-400" />,
  },
];

// April 2026 mini calendar with release dates marked
const CALENDAR_DAYS = (() => {
  // April 2026 starts on Wednesday (day index 3)
  const startDay = 3;
  const totalDays = 30;
  const releaseDates = new Set([3, 10, 17, 24]); // Fridays
  const days: Array<{ day: number | null; isRelease: boolean }> = [];

  // Pad start
  for (let i = 0; i < startDay; i++) {
    days.push({ day: null, isRelease: false });
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push({ day: d, isRelease: releaseDates.has(d) });
  }
  return days;
})();

export default function ReleaseVelocity() {
  return (
    <div className="glass rounded-2xl p-4">
      <h3 className="text-sm font-bold text-sp-dark mb-3">
        Engineering Velocity
      </h3>

      <div className="grid grid-cols-2 gap-2 mb-4">
        {METRICS.map((m) => (
          <div key={m.label} className="glass-subtle rounded-xl p-2.5">
            <div className="flex items-center gap-1.5 mb-1">
              {m.icon}
              <span className="text-[10px] text-gray-400">{m.label}</span>
            </div>
            <p className="text-base font-bold text-sp-dark">{m.value}</p>
            <p className="text-[9px] text-gray-500">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Mini calendar */}
      <p className="text-[10px] text-gray-500 mb-2 font-medium">
        April 2026 Release Calendar
      </p>
      <div className="grid grid-cols-7 gap-1">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={`header-${i}`}
            className="text-[8px] text-gray-500 text-center font-medium"
          >
            {d}
          </div>
        ))}
        {CALENDAR_DAYS.map((cell, i) => (
          <div
            key={`day-${i}`}
            className={`text-[9px] text-center py-0.5 rounded ${
              cell.day === null
                ? ""
                : cell.isRelease
                ? "bg-sp-teal/20 text-sp-teal font-bold"
                : cell.day <= 11
                ? "text-gray-400"
                : "text-gray-600"
            }`}
          >
            {cell.day ?? ""}
            {cell.isRelease && (
              <div className="w-1 h-1 rounded-full bg-sp-teal mx-auto mt-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
