'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

interface SliderConfig {
  key: string;
  emoji: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  hint: string;
  gradient: string;
  thumbColor: string;
}

const SLIDERS: SliderConfig[] = [
  {
    key: 'acTemp',
    emoji: '\uD83C\uDF21\uFE0F',
    label: 'AC Temperature',
    min: 18,
    max: 30,
    step: 1,
    unit: '\u00B0C',
    hint: 'Each 1\u00B0C lower adds ~$8/month',
    gradient: 'linear-gradient(to right, #F44336, #FF9800, #4CAF50)',
    thumbColor: '#FF6D00',
  },
  {
    key: 'acHours',
    emoji: '\u23F0',
    label: 'AC Hours/Day',
    min: 0,
    max: 24,
    step: 1,
    unit: ' hrs',
    hint: 'Current average: 10 hrs/day',
    gradient: 'linear-gradient(to right, #E3F2FD, #2196F3)',
    thumbColor: '#2196F3',
  },
  {
    key: 'showers',
    emoji: '\uD83D\uDEBF',
    label: 'Showers/Day (household)',
    min: 0,
    max: 10,
    step: 1,
    unit: '',
    hint: 'Average shower: 8 minutes',
    gradient: 'linear-gradient(to right, #E0F7FA, #00BCD4)',
    thumbColor: '#00BCD4',
  },
  {
    key: 'laundry',
    emoji: '\uD83D\uDC55',
    label: 'Laundry Loads/Week',
    min: 0,
    max: 14,
    step: 1,
    unit: '',
    hint: 'Front-loader vs top-loader matters!',
    gradient: 'linear-gradient(to right, #F3E5F5, #9C27B0)',
    thumbColor: '#9C27B0',
  },
  {
    key: 'lights',
    emoji: '\uD83D\uDCA1',
    label: 'Lights Left On (hrs beyond needed)',
    min: 0,
    max: 12,
    step: 1,
    unit: ' hrs',
    hint: 'LED vs incandescent makes a big difference',
    gradient: 'linear-gradient(to right, #FFFDE7, #FFC107)',
    thumbColor: '#FFC107',
  },
  {
    key: 'entertainment',
    emoji: '\uD83D\uDCFA',
    label: 'Entertainment (TV, gaming, etc.)',
    min: 0,
    max: 16,
    step: 1,
    unit: ' hrs',
    hint: '$0.80 per hour',
    gradient: 'linear-gradient(to right, #EDE7F6, #7C4DFF)',
    thumbColor: '#7C4DFF',
  },
];

interface SliderValues {
  acTemp: number;
  acHours: number;
  showers: number;
  laundry: number;
  lights: number;
  entertainment: number;
}

const DEFAULTS: SliderValues = {
  acTemp: 24,
  acHours: 10,
  showers: 4,
  laundry: 4,
  lights: 2,
  entertainment: 5,
};

const PRESETS: { label: string; values: SliderValues }[] = [
  { label: '\uD83C\uDFE0 Current', values: { ...DEFAULTS } },
  {
    label: '\uD83C\uDF3F Eco Mode',
    values: { acTemp: 26, acHours: 6, showers: 3, laundry: 3, lights: 0, entertainment: 3 },
  },
  {
    label: '\uD83E\uDD76 Max Comfort',
    values: { acTemp: 20, acHours: 18, showers: 6, laundry: 7, lights: 6, entertainment: 12 },
  },
  {
    label: '\uD83C\uDFD6\uFE0F Vacation',
    values: { acTemp: 28, acHours: 0, showers: 1, laundry: 0, lights: 0, entertainment: 1 },
  },
];

/* ------------------------------------------------------------------ */
/*  Calculation                                                        */
/* ------------------------------------------------------------------ */

function calculate(v: SliderValues) {
  const baseElectricity = 45;
  const acTempCost = Math.max(0, (25 - v.acTemp) * 8);
  const acHoursCost = v.acHours * 0.65;
  const acCost = acTempCost + acHoursCost;
  const waterCost = v.showers * 1.8 * 30;
  const laundryCost = v.laundry * 1.2 * 4.3;
  const lightsCost = v.lights * 0.5 * 30;
  const entertainmentCost = v.entertainment * 0.8 * 30;
  const subtotal = baseElectricity + acCost + waterCost + laundryCost + lightsCost + entertainmentCost;
  const gst = subtotal * 0.09;
  const total = subtotal + gst;
  return { subtotal, gst, total };
}

function sliderCostImpact(key: string, value: number): number {
  const base = { ...DEFAULTS };
  const modified = { ...DEFAULTS, [key]: value };
  return calculate(modified).total - calculate(base).total;
}

/* ------------------------------------------------------------------ */
/*  Animated number hook                                               */
/* ------------------------------------------------------------------ */

function useAnimatedNumber(target: number, duration = 400) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef({ value: target, time: 0 });

  useEffect(() => {
    const startValue = display;
    const startTime = performance.now();
    startRef.current = { value: startValue, time: startTime };

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(startValue + (target - startValue) * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function SimulatorPage() {
  const [values, setValues] = useState<SliderValues>({ ...DEFAULTS });
  const [mounted] = useState(() => typeof window !== "undefined");

  const currentBill = 154.08;
  const predicted = calculate(values).total;
  const animatedPredicted = useAnimatedNumber(predicted);
  const diff = currentBill - predicted;

  const optimalValues = PRESETS[1].values; // Eco Mode
  const optimalBill = calculate(optimalValues).total;
  const potentialSavings = predicted - optimalBill;
  const potentialYearlySavings = potentialSavings * 12;
  const hawkerMeals = Math.floor(potentialSavings / 4);

  const handleSlider = useCallback((key: string, val: number) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  }, []);

  const applyPreset = useCallback((preset: SliderValues) => {
    setValues({ ...preset });
  }, []);

  return (
    <div className="min-h-screen bg-sp-gray pb-10">
      {/* Scoped slider styles */}
      <style>{`
        input[type='range'] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          outline: none;
          transition: none;
        }
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--thumb-color, #00BFA5);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: none;
        }
        input[type='range']::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          border: 3px solid var(--thumb-color, #00BFA5);
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type='range']::-moz-range-track {
          height: 6px;
          border-radius: 3px;
        }
        @keyframes spin-border {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {/* ---- Header ---- */}
      <div className="bg-white dark:bg-gray-900 px-5 pt-14 pb-3">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sp-teal">
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-sp-dark">Bill Simulator</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              See how your habits affect your bill
            </p>
          </div>
        </div>
      </div>

      {/* ---- Crystal Ball Hero ---- */}
      <div className="flex flex-col items-center pt-8 pb-6 bg-white dark:bg-gray-900">
        {/* Rotating gradient ring */}
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          {/* Spinning gradient border */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, #00BFA5, #4CAF50, #00BFA5)',
              animation: 'spin-border 4s linear infinite',
            }}
          />
          {/* Inner circle (mask) */}
          <div
            className="absolute rounded-full bg-white dark:bg-gray-900 glow-teal"
            style={{
              inset: '4px',
            }}
          />
          {/* Content */}
          <div className="relative z-10 text-center">
            <p className="text-4xl font-extrabold text-sp-dark">
              ${animatedPredicted.toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Predicted for April 2026
            </p>
          </div>
        </div>

        {/* Comparison badge */}
        <div className="mt-4">
          {diff >= 0 ? (
            <span className="inline-flex items-center gap-1 bg-green-50 dark:bg-green-900/30 text-sp-green text-sm font-semibold px-3 py-1 rounded-full">
              <span>\u2193</span> ${Math.abs(diff).toFixed(2)} less than current
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 bg-red-50 dark:bg-red-900/30 text-sp-red text-sm font-semibold px-3 py-1 rounded-full">
              <span>\u2191</span> ${Math.abs(diff).toFixed(2)} more than current
            </span>
          )}
        </div>
      </div>

      {/* ---- Scenario Presets ---- */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p.values)}
              className="shrink-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-xs font-semibold text-sp-dark px-3 py-2 rounded-full press-effect whitespace-nowrap"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* ---- Sliders ---- */}
      <div className="px-4 mt-4 space-y-3">
        {SLIDERS.map((s, idx) => {
          const val = values[s.key as keyof SliderValues];
          const impact = sliderCostImpact(s.key, val);
          const pct = ((val - s.min) / (s.max - s.min)) * 100;

          return (
            <div
              key={s.key}
              className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm dark:shadow-gray-900/30"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.4s ease ${idx * 80}ms, transform 0.4s ease ${idx * 80}ms`,
              }}
            >
              {/* Top row: label + impact */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-sp-dark">
                  {s.emoji} {s.label}
                </span>
                <span
                  className={`text-sm font-bold ${
                    impact > 0.01
                      ? 'text-sp-red'
                      : impact < -0.01
                      ? 'text-sp-green'
                      : 'text-gray-400'
                  }`}
                >
                  {impact > 0.01
                    ? `+$${impact.toFixed(2)}`
                    : impact < -0.01
                    ? `-$${Math.abs(impact).toFixed(2)}`
                    : '$0.00'}
                </span>
              </div>

              {/* Slider with floating bubble */}
              <div className="relative mt-1 mb-1">
                {/* Floating value bubble */}
                <div
                  className="absolute -top-6 text-xs font-bold text-white bg-sp-teal rounded-full px-2 py-0.5 pointer-events-none"
                  style={{
                    left: `calc(${pct}% - 16px + ${(50 - pct) * 0.16}px)`,
                    transition: 'left 0.05s linear',
                  }}
                >
                  {val}{s.unit}
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={val}
                  onChange={(e) => handleSlider(s.key, Number(e.target.value))}
                  style={
                    {
                      background: s.gradient,
                      '--thumb-color': s.thumbColor,
                    } as React.CSSProperties
                  }
                />
              </div>

              {/* Hint */}
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-1">
                {s.hint}
              </p>
            </div>
          );
        })}
      </div>

      {/* ---- Savings Summary Card ---- */}
      <div className="px-4 mt-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm dark:shadow-gray-900/30">
          <h3 className="text-sm font-bold text-sp-dark mb-3">
            If you optimize all settings:
          </h3>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500 dark:text-gray-400">Optimal bill</span>
            <span className="text-lg font-extrabold text-sp-green">
              ${optimalBill.toFixed(2)}
            </span>
          </div>

          {/* Progress bar: optimal to current */}
          <div className="relative h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-sp-green to-sp-teal"
              style={{
                width: `${Math.min(100, (optimalBill / predicted) * 100)}%`,
                transition: 'width 0.4s ease',
              }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
            <span>${optimalBill.toFixed(2)}</span>
            <span>${predicted.toFixed(2)}</span>
          </div>

          {potentialSavings > 0.5 && (
            <>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                <p className="text-sm font-bold text-sp-green">
                  You could save ${potentialSavings.toFixed(2)}/month (${potentialYearlySavings.toFixed(0)}/year)
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  That&apos;s equivalent to {hawkerMeals} meals at a hawker centre!
                </p>
              </div>
            </>
          )}

          {potentialSavings <= 0.5 && (
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
              <p className="text-sm font-bold text-sp-green">
                You&apos;re already at optimal settings!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ---- Share Button ---- */}
      <div className="px-4 mt-6">
        <button className="w-full bg-sp-teal text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 spring-button">
          <Share2 size={16} />
          Share your savings plan
        </button>
      </div>

      {/* Bottom spacer for nav */}
      <div className="h-20" />
    </div>
  );
}
