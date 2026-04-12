"use client";

import { useState, useCallback, useRef } from "react";
import {
  Leaf,
  Sun,
  Zap,
  DropletIcon,
  Factory,
  TreePine,
  Target,
  Battery,
  Car,
  Award,
  Handshake,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CARBON_DATA = [
  { year: "2020", actual: 8.2, target: 8.2 },
  { year: "2021", actual: 7.8, target: 8.0 },
  { year: "2022", actual: 7.1, target: 7.5 },
  { year: "2023", actual: 6.3, target: 7.0 },
  { year: "2024", actual: 5.5, target: 6.2 },
  { year: "2025", actual: 4.8, target: 5.5 },
  { year: "2026", actual: 4.2, target: 5.0 },
  { year: "2027", actual: null, target: 4.3 },
  { year: "2028", actual: null, target: 3.5 },
  { year: "2029", actual: null, target: 2.8 },
  { year: "2030", actual: null, target: 2.0 },
];

const PILLARS = [
  {
    icon: TreePine,
    title: "City in Nature",
    description:
      "Expanding green infrastructure and integrating nature-based solutions into our energy network to create a resilient, green urban landscape.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: Sun,
    title: "Energy Reset",
    description:
      "Accelerating the transition to cleaner energy sources, deploying solar capacity, and advancing Singapore's energy efficiency targets.",
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: Factory,
    title: "Green Economy",
    description:
      "Building a sustainable economy through green financing, carbon credits, and supporting businesses in their decarbonisation journey.",
    color: "from-sp-teal to-teal-600",
  },
  {
    icon: DropletIcon,
    title: "Resilient Future",
    description:
      "Strengthening infrastructure against climate change impacts while ensuring continuous, reliable energy delivery to all customers.",
    color: "from-blue-500 to-cyan-600",
  },
] as const;

const COMMITMENTS = [
  {
    icon: Target,
    title: "Net Zero by 2050",
    description:
      "Committed to achieving net-zero carbon emissions across all operations by 2050, aligned with Singapore's Long-Term Low-Emissions Development Strategy.",
    metric: "2050",
    metricLabel: "Target Year",
  },
  {
    icon: Battery,
    title: "100% Smart Meters",
    description:
      "Completed nationwide rollout of Advanced Metering Infrastructure, enabling real-time energy monitoring and empowering consumers to manage usage.",
    metric: "1.6M",
    metricLabel: "Meters Deployed",
  },
  {
    icon: Car,
    title: "60,000 EV Charging Points",
    description:
      "Building Singapore's largest EV charging network to support the national target of phasing out internal combustion engine vehicles by 2040.",
    metric: "60K",
    metricLabel: "By 2030",
  },
] as const;

const IMPACT_STATS = [
  { label: "CO2 Offset (tonnes)", target: 125000, suffix: "", prefix: "" },
  { label: "Solar Capacity (MWp)", target: 850, suffix: "", prefix: "" },
  { label: "EV Charge Sessions", target: 2400000, suffix: "", prefix: "" },
  { label: "Green Credits Sold", target: 380000, suffix: "", prefix: "" },
] as const;

function formatNumber(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toLocaleString();
}

function useCountUp(target: number, duration: number = 2000): [number, (node: HTMLDivElement | null) => void] {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  const ref = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || hasAnimated.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const startTime = performance.now();

            function animate(currentTime: number) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * target));

              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            }

            requestAnimationFrame(animate);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(node);
    },
    [target, duration]
  );

  return [count, ref];
}

function ImpactCounter({ label, target }: { label: string; target: number }) {
  const [count, ref] = useCountUp(target);

  return (
    <div ref={ref} className="glass rounded-2xl p-6 text-center hover-lift">
      <p className="text-3xl md:text-4xl font-bold text-sp-teal">
        {formatNumber(count)}
      </p>
      <p className="text-gray-400 text-sm mt-2">{label}</p>
    </div>
  );
}

interface CarbonTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    value: number | null;
    color: string;
    name: string;
  }>;
  label?: string;
}

function CarbonTooltip({ active, payload, label }: CarbonTooltipProps) {
  if (active && payload && payload.length > 0) {
    return (
      <div className="glass-strong rounded-lg px-4 py-3 shadow-xl">
        <p className="text-white font-semibold text-sm mb-1">{label}</p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="text-xs" style={{ color: entry.color }}>
            {entry.name}: {entry.value !== null ? `${entry.value}M tonnes` : "Projected"}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function SustainabilityPage() {
  return (
    <div
      className="!max-w-none min-h-screen bg-gray-950 text-gray-100"
      style={{ maxWidth: "100%" }}
    >
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #022c22 0%, #064e3b 30%, #042f2e 60%, #030712 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-25">
          <div
            className="absolute top-10 right-40 w-[500px] h-[500px] rounded-full floating-orb"
            style={{
              background:
                "radial-gradient(circle, rgba(76,175,80,0.4) 0%, transparent 70%)",
              filter: "blur(120px)",
            }}
          />
          <div
            className="absolute bottom-0 left-20 w-[300px] h-[300px] rounded-full floating-orb"
            style={{
              background:
                "radial-gradient(circle, rgba(0,191,165,0.3) 0%, transparent 70%)",
              filter: "blur(80px)",
              animationDelay: "3s",
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-32 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 animate-fade-in-up">
            <Leaf className="w-4 h-4 text-sp-green" />
            <span className="text-sp-green text-sm font-medium">Sustainability</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight animate-fade-in-up delay-100">
            Leading Singapore&apos;s
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sp-green to-sp-teal">
              Green Energy Transition
            </span>
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Committed to building a sustainable energy future aligned with
            Singapore&apos;s Green Plan 2030 and net-zero ambitions.
          </p>
        </div>
      </section>

      {/* Green Plan Pillars */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Singapore Green Plan 2030
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Our sustainability strategy is anchored to the national Green Plan,
          driving action across four key pillars.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="glass rounded-2xl p-8 hover-lift group"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Impact Dashboard */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Our Impact
          </h2>
          <p className="text-gray-400 text-center mb-12">
            Real-time sustainability metrics as of 2026.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {IMPACT_STATS.map((stat) => (
              <ImpactCounter
                key={stat.label}
                label={stat.label}
                target={stat.target}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Reduction Chart */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Carbon Reduction Trajectory
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Tracking our progress towards Singapore&apos;s 2030 emissions target.
        </p>
        <div className="glass rounded-3xl p-8">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart
              data={CARBON_DATA}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00BFA5" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00BFA5" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4CAF50" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#4CAF50" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="year"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF" }}
                unit="M"
              />
              <Tooltip content={<CarbonTooltip />} />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#00BFA5"
                strokeWidth={3}
                fill="url(#colorActual)"
                name="Actual Emissions"
                connectNulls={false}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#4CAF50"
                strokeWidth={2}
                strokeDasharray="8 4"
                fill="url(#colorTarget)"
                name="Target Pathway"
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-8 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-sp-teal" />
              <span className="text-gray-400 text-xs">Actual Emissions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-sp-green border-dashed" style={{ borderTop: "2px dashed #4CAF50", height: 0 }} />
              <span className="text-gray-400 text-xs">Target Pathway</span>
            </div>
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Our Commitments
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Bold targets that drive our sustainability strategy forward.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {COMMITMENTS.map((commitment) => {
            const Icon = commitment.icon;
            return (
              <div
                key={commitment.title}
                className="glass rounded-2xl p-8 hover-lift text-center"
              >
                <Icon className="w-12 h-12 text-sp-teal mx-auto mb-4" />
                <div className="mb-4">
                  <p className="text-4xl font-bold text-white">
                    {commitment.metric}
                  </p>
                  <p className="text-sp-teal text-sm">{commitment.metricLabel}</p>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {commitment.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Partner Logos */}
      <section
        className="py-24"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,191,165,0.03) 50%, transparent 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Our Partners
          </h2>
          <p className="text-gray-400 mb-12 max-w-xl mx-auto">
            Collaborating with leading organisations to accelerate the green
            energy transition.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "EMA Singapore", icon: Zap },
              { name: "NEA Singapore", icon: Leaf },
              { name: "UN Global Compact", icon: Handshake },
              { name: "World Green Building Council", icon: Award },
            ].map((partner) => {
              const Icon = partner.icon;
              return (
                <div
                  key={partner.name}
                  className="glass rounded-2xl p-8 flex flex-col items-center justify-center min-h-[140px] hover-lift"
                >
                  <Icon className="w-10 h-10 text-gray-500 mb-3" />
                  <p className="text-gray-400 text-sm font-medium">
                    {partner.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="glass rounded-3xl p-12 glow-teal">
          <Leaf className="w-12 h-12 text-sp-green mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">
            Go Green with SP Group
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Switch to green energy credits and offset your carbon footprint today.
          </p>
          <a
            href="/website/contact"
            className="inline-flex items-center gap-2 bg-sp-green hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-colors spring-button"
          >
            Get Started
            <ChevronRight className="w-5 h-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
