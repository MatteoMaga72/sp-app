'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowDown,
  TrendingDown,
  TrendingUp,
  Lightbulb,
  Download,
  Share2,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const billTotal = 154.08;
const previousTotal = 177.55;
const savings = previousTotal - billTotal;

const breakdownData = [
  {
    key: 'electricity',
    label: 'Electricity',
    icon: '\u26A1',
    amount: 98.5,
    color: '#00BFA5',
    detail: '412 kWh \u00D7 $0.2391/kWh',
    pct: 64,
  },
  {
    key: 'water',
    label: 'Water',
    icon: '\uD83D\uDCA7',
    amount: 32.2,
    color: '#2196F3',
    detail: '7.3 Cu M \u00D7 various tariff tiers',
    pct: 21,
  },
  {
    key: 'gas',
    label: 'Gas',
    icon: '\uD83D\uDD25',
    amount: 12.8,
    color: '#FF9800',
    detail: 'Piped gas usage',
    pct: 8,
  },
  {
    key: 'gst',
    label: 'GST (9%)',
    icon: '\uD83D\uDCCB',
    amount: 10.58,
    color: '#9E9E9E',
    detail: '9% Goods & Services Tax',
    pct: 7,
  },
];

const comparison = [
  {
    label: 'Electricity',
    prev: 121.3,
    curr: 98.5,
    change: -18.8,
    color: '#00BFA5',
  },
  {
    label: 'Water',
    prev: 38.9,
    curr: 32.2,
    change: -17.2,
    color: '#2196F3',
  },
  {
    label: 'Gas',
    prev: 17.35,
    curr: 12.8,
    change: -26.2,
    color: '#FF9800',
  },
];

const insights = [
  {
    icon: '\uD83C\uDF21\uFE0F',
    text: 'Cooler weather in March reduced AC usage by ~18%, saving you about $15',
    border: '#4CAF50',
  },
  {
    icon: '\uD83D\uDCC9',
    text: 'Your washing machine ran 3 fewer cycles this month compared to February',
    border: '#2196F3',
  },
  {
    icon: '\uD83D\uDCA1',
    text: 'Tip: Your standby power consumption is ~$4.20/month. Smart power strips could save you $3.50/month',
    border: '#FF9800',
  },
  {
    icon: '\uD83C\uDFAF',
    text: "At this rate, you'll save ~$180 this year compared to 2025!",
    border: '#4CAF50',
  },
];

// Generate daily usage data for the month (31 days)
const dailyUsage = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  kWh: +(10 + Math.random() * 8 + (i > 5 && i < 15 ? 3 : 0)).toFixed(1),
}));
const avgUsage = +(dailyUsage.reduce((s, d) => s + d.kWh, 0) / dailyUsage.length).toFixed(1);
const targetUsage = 12;

/* ------------------------------------------------------------------ */
/*  Animated counter hook                                              */
/* ------------------------------------------------------------------ */

function useCountUp(target: number, duration = 1200, delay = 0) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(+(eased * target).toFixed(2));
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDone(true);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };
    if (delay > 0) {
      timeout = setTimeout(run, delay);
    } else {
      run();
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
    };
  }, [target, duration, delay]);

  return { value, done };
}

/* ------------------------------------------------------------------ */
/*  Progress Ring component                                            */
/* ------------------------------------------------------------------ */

function ProgressRing({ progress, size = 220, strokeWidth = 10 }: { progress: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - progress * circumference;

  return (
    <svg width={size} height={size} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00BFA5" />
          <stop offset="100%" stopColor="#4CAF50" />
        </linearGradient>
      </defs>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="rgba(0,191,165,0.1)"
        strokeWidth={strokeWidth}
      />
      {/* Progress */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{
          transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: 'rotate(-90deg)',
          transformOrigin: '50% 50%',
        }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Confetti burst component                                           */
/* ------------------------------------------------------------------ */

function ConfettiBurst({ active }: { active: boolean }) {
  if (!active) return null;
  const particles = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * 360;
    const distance = 30 + Math.random() * 30;
    const colors = ['#00BFA5', '#4CAF50', '#FF9800', '#2196F3', '#E91E63'];
    const color = colors[i % colors.length];
    const size = 3 + Math.random() * 4;
    return { angle, distance, color, size, delay: Math.random() * 200 };
  });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-burst 0.8s ease-out ${p.delay}ms forwards`,
            ['--angle' as string]: `${p.angle}deg`,
            ['--distance' as string]: `${p.distance}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-burst {
          0% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sparkle effect                                                     */
/* ------------------------------------------------------------------ */

function Sparkle({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <span
      className="absolute -right-1 -top-1 w-2 h-2 rounded-full"
      style={{
        backgroundColor: color,
        animation: `sparkle-pop 0.6s ease-out ${delay}ms forwards`,
        opacity: 0,
        boxShadow: `0 0 6px ${color}`,
      }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Floating background particles                                      */
/* ------------------------------------------------------------------ */

function FloatingParticles() {
  const particles = [
    { size: 4, left: '10%', top: '20%', duration: 7, delay: 0, color: 'rgba(0,191,165,0.2)' },
    { size: 6, left: '85%', top: '35%', duration: 9, delay: 1, color: 'rgba(33,150,243,0.15)' },
    { size: 3, left: '60%', top: '55%', duration: 8, delay: 2, color: 'rgba(255,152,0,0.2)' },
    { size: 5, left: '25%', top: '70%', duration: 10, delay: 0.5, color: 'rgba(0,191,165,0.15)' },
    { size: 4, left: '75%', top: '80%', duration: 7, delay: 3, color: 'rgba(76,175,80,0.2)' },
    { size: 3, left: '45%', top: '15%', duration: 11, delay: 1.5, color: 'rgba(33,150,243,0.15)' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            backgroundColor: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom pie tooltip                                                 */
/* ------------------------------------------------------------------ */

function PieTooltipContent({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { fill: string } }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="glass-strong shadow-lg rounded-xl px-3 py-2 text-xs">
      <p className="font-semibold" style={{ color: d.payload.fill }}>
        {d.name}
      </p>
      <p className="text-sp-dark font-bold">${d.value.toFixed(2)}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Custom active dot for sparkline                                    */
/* ------------------------------------------------------------------ */

function GlowingDot(props: { cx?: number; cy?: number; index?: number }) {
  const { cx, cy, index } = props;
  const currentDay = 17; // today
  if (index !== currentDay - 1) return null;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="rgba(0,191,165,0.3)" className="animate-pulse" />
      <circle cx={cx} cy={cy} r={3} fill="#00BFA5" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BillDetailPage() {
  const { value: animatedTotal, done: totalDone } = useCountUp(billTotal, 1400);
  const { value: animatedSavings } = useCountUp(savings, 1200, 1500);
  const [mounted, setMounted] = useState(false);
  const [compBarsPhase, setCompBarsPhase] = useState(0); // 0: none, 1: prev bars, 2: curr bars, 3: badges
  const [hoveredPieIndex, setHoveredPieIndex] = useState<number | null>(null);
  const [barFills, setBarFills] = useState(false);
  const [showSavingsBadge, setShowSavingsBadge] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [insightReveals, setInsightReveals] = useState<boolean[]>(insights.map(() => false));
  const [sparkleKeys, setSparkleKeys] = useState<number[]>([]);

  useEffect(() => {
    setMounted(true);

    // Comparison bar race sequence
    const t1 = setTimeout(() => setCompBarsPhase(1), 800);
    const t2 = setTimeout(() => setCompBarsPhase(2), 1400);
    const t3 = setTimeout(() => setCompBarsPhase(3), 2000);

    // Horizontal bar fills
    const t4 = setTimeout(() => setBarFills(true), 600);

    // Sparkles when bars finish
    const t5 = setTimeout(() => setSparkleKeys([0, 1, 2, 3]), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  // Show savings badge + confetti after total count finishes
  useEffect(() => {
    if (totalDone) {
      const t = setTimeout(() => {
        setShowSavingsBadge(true);
        if (savings > 0) setShowConfetti(true);
      }, 200);
      const t2 = setTimeout(() => setShowConfetti(false), 1200);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [totalDone]);

  // Staggered insight reveal
  useEffect(() => {
    const timers = insights.map((_, i) =>
      setTimeout(() => {
        setInsightReveals((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, 800 + i * 400)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const pieData = breakdownData.map((d) => ({
    name: d.label,
    value: d.amount,
    fill: d.color,
  }));

  const onPieEnter = useCallback((_: unknown, index: number) => {
    setHoveredPieIndex(index);
  }, []);

  const onPieLeave = useCallback(() => {
    setHoveredPieIndex(null);
  }, []);

  const ringProgress = totalDone ? 1 : animatedTotal / billTotal;

  return (
    <div className="min-h-screen bg-gradient-detail pb-10 relative overflow-hidden">
      {/* Floating background particles */}
      <FloatingParticles />

      {/* Floating gradient orbs */}
      <div
        className="absolute top-60 -left-10 w-[160px] h-[160px] rounded-full opacity-20 floating-orb pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(0,191,165,0.5) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDelay: '2s',
        }}
      />
      <div
        className="absolute top-[500px] -right-10 w-[120px] h-[120px] rounded-full opacity-15 floating-orb pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(33,150,243,0.4) 0%, transparent 70%)',
          filter: 'blur(50px)',
          animationDelay: '4s',
        }}
      />

      {/* Global sparkle keyframe */}
      <style>{`
        @keyframes sparkle-pop {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(0); }
        }
        @keyframes typewriter-reveal {
          from { clip-path: inset(0 100% 0 0); }
          to { clip-path: inset(0 0 0 0); }
        }
        @keyframes bar-fill-horizontal {
          from { width: 0%; }
        }
        @keyframes glow-icon {
          0%, 100% { filter: drop-shadow(0 0 2px var(--glow-color)); }
          50% { filter: drop-shadow(0 0 8px var(--glow-color)); }
        }
      `}</style>

      {/* ---- Header ---- */}
      <div className="glass-strong px-5 pt-14 pb-4 flex items-center gap-3 relative z-10 opacity-0 animate-fade-in-up">
        <Link href="/bills" className="text-sp-teal press-effect">
          <ArrowLeft size={22} />
        </Link>
        <h1 className="text-lg font-bold text-sp-dark">
          Bill Details &ndash; Mar 2026
        </h1>
      </div>

      {/* ---- Hero amount with progress ring ---- */}
      <div className="glass-strong px-5 pb-6 text-center relative z-10 opacity-0 animate-fade-in-up delay-100">
        <div className="relative inline-block mt-4 mb-2" style={{ width: 220, height: 220 }}>
          <ProgressRing progress={ringProgress} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-1">Total Due</p>
            <p className="text-4xl font-extrabold text-sp-dark tabular-nums">
              ${animatedTotal.toFixed(2)}
            </p>
            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">Mar 2026</p>
          </div>
          <ConfettiBurst active={showConfetti} />
        </div>

        {/* Savings badge - bounces in after count */}
        <div
          className={`inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-sp-green text-sm font-semibold px-3 py-1 rounded-full ${
            showSavingsBadge ? 'animate-bounce-in' : 'opacity-0 scale-0'
          }`}
        >
          <ArrowDown size={14} />
          <span>${animatedSavings.toFixed(2)} less than last month</span>
        </div>
      </div>

      {/* ---- Donut chart with center text ---- */}
      <div className="px-4 mt-4 relative z-10 opacity-0 animate-fade-in-up delay-200">
        <div className="glass rounded-3xl p-4">
          <h2 className="text-sm font-bold text-sp-dark mb-3">
            Cost Breakdown
          </h2>
          <div className="h-52 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                  animationDuration={800}
                  onMouseEnter={onPieEnter}
                  onMouseLeave={onPieLeave}
                >
                  {pieData.map((entry, i) => (
                    <Cell
                      key={i}
                      fill={entry.fill}
                      stroke="none"
                      style={{
                        filter: hoveredPieIndex === i ? `drop-shadow(0 0 6px ${entry.fill})` : 'none',
                        transition: 'filter 0.3s ease',
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltipContent />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text for donut */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                {hoveredPieIndex !== null ? (
                  <>
                    <p className="text-xs font-semibold" style={{ color: breakdownData[hoveredPieIndex].color }}>
                      {breakdownData[hoveredPieIndex].label}
                    </p>
                    <p className="text-lg font-bold text-sp-dark">
                      ${breakdownData[hoveredPieIndex].amount.toFixed(2)}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs text-gray-400">Total</p>
                    <p className="text-lg font-bold text-sp-dark">${billTotal.toFixed(2)}</p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Legend row */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {breakdownData.map((d) => (
              <div key={d.key} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-300">
                <div
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: d.color }}
                />
                {d.label}
              </div>
            ))}
          </div>

          {/* Animated horizontal bars below chart */}
          <div className="mt-4 space-y-2">
            {breakdownData.map((d, idx) => (
              <div key={d.key} className="flex items-center gap-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-16 truncate">{d.label}</span>
                <div className="flex-1 h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: d.color,
                      width: barFills ? `${d.pct}%` : '0%',
                      transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${400 + idx * 200}ms`,
                    }}
                  />
                  {sparkleKeys.includes(idx) && (
                    <Sparkle color={d.color} delay={400 + idx * 200 + 1000} />
                  )}
                </div>
                <span className="text-xs font-bold tabular-nums" style={{ color: d.color }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Waterfall breakdown cards ---- */}
      <div className="px-4 mt-4 space-y-2.5 relative z-10">
        {breakdownData.map((item, idx) => {
          const { value: itemVal } = useCountUp(item.amount, 1000, 300 + idx * 150);
          return (
            <div
              key={item.key}
              className="glass rounded-3xl p-4 opacity-0 animate-slide-in-right"
              style={{ animationDelay: `${300 + idx * 120}ms` }}
            >
              <div className="flex items-center gap-3">
                {/* Pulsing icon */}
                <span
                  className="text-2xl"
                  style={{
                    ['--glow-color' as string]: item.color,
                    animation: 'glow-icon 2s ease-in-out infinite',
                    animationDelay: `${idx * 300}ms`,
                  }}
                >
                  {item.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-sp-dark">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-sp-dark tabular-nums">
                      ${itemVal.toFixed(2)}
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.detail}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden relative">
                      <div
                        className="h-full rounded-full"
                        style={{
                          backgroundColor: item.color,
                          width: mounted ? `${item.pct}%` : '0%',
                          transition: `width 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${400 + idx * 100}ms`,
                        }}
                      />
                      {sparkleKeys.includes(idx) && (
                        <Sparkle color={item.color} delay={400 + idx * 100 + 800} />
                      )}
                    </div>
                    <span className="text-[11px] font-semibold" style={{ color: item.color }}>
                      {item.pct}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ---- Month-over-Month Comparison — Bar Race ---- */}
      <div className="px-4 mt-6 relative z-10 opacity-0 animate-fade-in-up delay-400">
        <div className="glass-strong rounded-3xl p-4">
          <h2 className="text-sm font-bold text-sp-dark mb-4">
            Month-over-Month
          </h2>
          <div className="grid grid-cols-[1fr_auto_1fr] text-center text-xs font-semibold text-gray-400 mb-3">
            <span>Feb 2026</span>
            <span className="px-3">vs</span>
            <span>Mar 2026</span>
          </div>

          <div className="space-y-3">
            {comparison.map((c, idx) => {
              const maxVal = Math.max(c.prev, c.curr);
              const isDown = c.change < 0;
              return (
                <div key={c.label}>
                  <p className="text-xs font-semibold text-sp-dark mb-1.5">
                    {c.label}
                  </p>
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                    {/* Previous month bar */}
                    <div>
                      <p className="text-sm font-bold text-gray-500 dark:text-gray-400 tabular-nums">
                        ${c.prev.toFixed(2)}
                      </p>
                      <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: c.color,
                            opacity: 0.35,
                            width: compBarsPhase >= 1 ? `${(c.prev / maxVal) * 100}%` : '0%',
                            transition: `width 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                    {/* Percentage badge */}
                    <div
                      className={`flex items-center gap-0.5 text-xs font-bold px-2 py-1 rounded-full ${
                        isDown
                          ? 'bg-green-50 dark:bg-green-900/30 text-sp-green'
                          : 'bg-red-50 dark:bg-red-900/30 text-sp-red'
                      } ${compBarsPhase >= 3 ? 'animate-bounce-in' : 'opacity-0 scale-0'}`}
                      style={{
                        animationDelay: compBarsPhase >= 3 ? `${idx * 150}ms` : undefined,
                        animation: compBarsPhase >= 3
                          ? `bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) ${idx * 150}ms forwards, pulseGlow 2s ease-in-out ${1 + idx * 0.3}s infinite`
                          : undefined,
                      }}
                    >
                      {isDown ? (
                        <TrendingDown size={12} />
                      ) : (
                        <TrendingUp size={12} />
                      )}
                      {Math.abs(c.change)}%
                    </div>
                    {/* Current month bar */}
                    <div>
                      <p className="text-sm font-bold text-sp-dark tabular-nums">
                        ${c.curr.toFixed(2)}
                      </p>
                      <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
                        <div
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: c.color,
                            width: compBarsPhase >= 2 ? `${(c.curr / maxVal) * 100}%` : '0%',
                            transition: `width 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${idx * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ---- AI Insights — Typewriter Effect ---- */}
      <div className="px-4 mt-6 relative z-10 opacity-0 animate-fade-in-up delay-500">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-sp-orange" />
            <h2 className="text-sm font-bold text-sp-dark">
              What Changed This Month?
            </h2>
          </div>
          <div className="space-y-2.5">
            {insights.map((ins, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-subtle p-3 flex items-start gap-2.5"
                style={{
                  borderLeft: `3px solid ${ins.border}`,
                  opacity: insightReveals[idx] ? 1 : 0,
                  transform: insightReveals[idx] ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                }}
              >
                <span
                  className={`text-lg leading-none mt-0.5 ${insightReveals[idx] ? 'animate-bounce-in' : 'opacity-0'}`}
                  style={{ animationDelay: '100ms' }}
                >
                  {ins.icon}
                </span>
                <p
                  className="text-xs text-sp-dark leading-relaxed"
                  style={{
                    animation: insightReveals[idx]
                      ? `typewriter-reveal 0.8s ease-out 0.2s both`
                      : 'none',
                    clipPath: insightReveals[idx] ? undefined : 'inset(0 100% 0 0)',
                  }}
                >
                  {ins.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ---- Daily Usage Sparkline — Enhanced ---- */}
      <div className="px-4 mt-6 relative z-10 opacity-0 animate-fade-in-up delay-600">
        <div className="glass rounded-3xl p-4">
          <h2 className="text-sm font-bold text-sp-dark mb-3">
            Daily Electricity Usage (kWh)
          </h2>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dailyUsage}
                margin={{ top: 5, right: 5, bottom: 0, left: -20 }}
              >
                <defs>
                  <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00BFA5" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00BFA5" stopOpacity={0.03} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#eee"
                />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: '#999' }}
                  axisLine={false}
                  tickLine={false}
                  interval={4}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: '#999' }}
                  axisLine={false}
                  tickLine={false}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  }}
                  labelFormatter={(v) => `Day ${v}`}
                  formatter={(value) => [`${value} kWh`, 'Usage']}
                />
                <ReferenceLine
                  y={avgUsage}
                  stroke="#FF9800"
                  strokeDasharray="4 4"
                  strokeWidth={1}
                  label={{
                    value: `Avg: ${avgUsage}`,
                    position: 'insideTopRight',
                    fontSize: 9,
                    fill: '#FF9800',
                  }}
                />
                <ReferenceLine
                  y={targetUsage}
                  stroke="#4CAF50"
                  strokeDasharray="6 3"
                  strokeWidth={1}
                  label={{
                    value: `Target: ${targetUsage}`,
                    position: 'insideBottomRight',
                    fontSize: 9,
                    fill: '#4CAF50',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="kWh"
                  stroke="#00BFA5"
                  strokeWidth={2}
                  fill="url(#sparkGrad)"
                  animationDuration={1500}
                  activeDot={<GlowingDot />}
                  dot={(props: { cx?: number; cy?: number; index?: number }) => {
                    const { cx, cy, index } = props;
                    if (index !== 16) return <g key={index} />;
                    return (
                      <g key={index}>
                        <circle cx={cx} cy={cy} r={5} fill="rgba(0,191,165,0.3)">
                          <animate attributeName="r" values="4;7;4" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0.2;0.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx={cx} cy={cy} r={3} fill="#00BFA5" />
                      </g>
                    );
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-gray-400">
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-[#FF9800] inline-block" style={{ borderTop: '1px dashed #FF9800' }} /> Average
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-0.5 bg-[#4CAF50] inline-block" style={{ borderTop: '1px dashed #4CAF50' }} /> Target
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sp-teal inline-block" /> Today
            </span>
          </div>
        </div>
      </div>

      {/* ---- Action Buttons ---- */}
      <div className="px-4 mt-6 space-y-3 relative z-10 opacity-0 animate-fade-in-up delay-700">
        <button className="w-full bg-sp-teal glow-teal animate-pulse-glow text-white font-semibold text-sm py-3.5 rounded-2xl spring-button active:bg-sp-teal-dark transition-colors">
          Pay This Bill
        </button>
        <button className="w-full glass border-2 border-sp-teal text-sp-teal font-semibold text-sm py-3 rounded-2xl flex items-center justify-center gap-2 spring-button active:bg-sp-teal-light transition-colors">
          <Download size={16} />
          Download PDF
        </button>
        <button className="w-full text-sp-teal font-medium text-sm py-2 flex items-center justify-center gap-1.5 press-effect">
          <Share2 size={14} />
          Share Bill Summary
        </button>
      </div>
    </div>
  );
}
