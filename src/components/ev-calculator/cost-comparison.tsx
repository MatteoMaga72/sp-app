'use client';

import { useEffect, useRef, useState } from 'react';
import { Fuel, Zap, TrendingDown, Leaf } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import type { FuelType } from './vehicle-input';

/* ------------------------------------------------------------------ */
/*  Constants — Singapore prices                                       */
/* ------------------------------------------------------------------ */

const FUEL_PRICE_SGD: Record<FuelType, number> = {
  petrol95: 2.65,
  petrol98: 3.05,
  diesel: 2.35,
};

const FUEL_CONSUMPTION_L_PER_100KM: Record<string, number> = {
  'Toyota Corolla': 6.5,
  'Honda Civic': 6.8,
  'BMW 3 Series': 7.9,
  'Mercedes C-Class': 7.5,
  'Mazda 3': 6.3,
};

const FUEL_LABEL: Record<FuelType, string> = {
  petrol95: 'Petrol 95',
  petrol98: 'Petrol 98',
  diesel: 'Diesel',
};

const SP_TARIFF_PER_KWH = 0.2691;
const EV_KWH_PER_100KM = 15;
const CO2_PER_LITRE_PETROL = 2.3;
const CO2_PER_LITRE_DIESEL = 2.68;
const SG_GRID_EMISSION_FACTOR = 0.4085;

/* ------------------------------------------------------------------ */
/*  Calculation helpers                                                */
/* ------------------------------------------------------------------ */

export interface CostResult {
  petrolMonthly: number;
  evMonthly: number;
  monthlySavings: number;
  annualSavings: number;
  fiveYearSavings: number;
  co2PetrolKgYear: number;
  co2EvKgYear: number;
  co2ReductionKgYear: number;
}

export function calculateCosts(
  carModel: string,
  monthlyKm: number,
  fuelType: FuelType,
): CostResult {
  const fuelConsumption = FUEL_CONSUMPTION_L_PER_100KM[carModel] ?? 7.0;
  const fuelPrice = FUEL_PRICE_SGD[fuelType];

  const litresPerMonth = (monthlyKm / 100) * fuelConsumption;
  const petrolMonthly = litresPerMonth * fuelPrice;

  const kwhPerMonth = (monthlyKm / 100) * EV_KWH_PER_100KM;
  const evMonthly = kwhPerMonth * SP_TARIFF_PER_KWH;

  const monthlySavings = petrolMonthly - evMonthly;
  const annualSavings = monthlySavings * 12;
  const fiveYearSavings = annualSavings * 5;

  const co2PerLitre = fuelType === 'diesel' ? CO2_PER_LITRE_DIESEL : CO2_PER_LITRE_PETROL;
  const co2PetrolKgYear = litresPerMonth * 12 * co2PerLitre;
  const co2EvKgYear = kwhPerMonth * 12 * SG_GRID_EMISSION_FACTOR;
  const co2ReductionKgYear = co2PetrolKgYear - co2EvKgYear;

  return {
    petrolMonthly,
    evMonthly,
    monthlySavings,
    annualSavings,
    fiveYearSavings,
    co2PetrolKgYear,
    co2EvKgYear,
    co2ReductionKgYear,
  };
}

/* ------------------------------------------------------------------ */
/*  Animated number hook                                               */
/* ------------------------------------------------------------------ */

function useAnimatedNumber(target: number, duration = 500) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef<number | null>(null);
  const prevRef = useRef(target);

  useEffect(() => {
    const startValue = prevRef.current;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startValue + (target - startValue) * eased;
      setDisplay(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        prevRef.current = target;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return display;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface CostComparisonProps {
  carModel: string;
  monthlyKm: number;
  fuelType: FuelType;
}

export default function CostComparison({
  carModel,
  monthlyKm,
  fuelType,
}: CostComparisonProps) {
  const costs = calculateCosts(carModel, monthlyKm, fuelType);

  const animatedPetrol = useAnimatedNumber(costs.petrolMonthly);
  const animatedEv = useAnimatedNumber(costs.evMonthly);
  const animatedSavings = useAnimatedNumber(costs.monthlySavings);

  const chartData = [
    { name: FUEL_LABEL[fuelType], cost: Math.round(costs.petrolMonthly) },
    { name: 'EV (SP Tariff)', cost: Math.round(costs.evMonthly) },
  ];

  const CHART_COLORS = ['#FF6D00', '#00BFA5'];

  return (
    <div className="space-y-4 animate-fade-in-up delay-200">
      {/* Side-by-side cards */}
      <div className="grid grid-cols-2 gap-3">
        {/* Petrol card */}
        <div className="glass rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sp-orange to-sp-red" />
          <div className="flex items-center gap-1.5 mb-2">
            <Fuel size={14} className="text-sp-orange" />
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
              {FUEL_LABEL[fuelType]}
            </span>
          </div>
          <p className="text-2xl font-extrabold text-sp-dark">
            ${animatedPetrol.toFixed(0)}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">/month</p>
        </div>

        {/* EV card */}
        <div className="glass rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sp-teal to-sp-green" />
          <div className="flex items-center gap-1.5 mb-2">
            <Zap size={14} className="text-sp-teal" />
            <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
              EV (SP Tariff)
            </span>
          </div>
          <p className="text-2xl font-extrabold text-sp-teal">
            ${animatedEv.toFixed(0)}
          </p>
          <p className="text-[10px] text-gray-400 mt-0.5">/month</p>
        </div>
      </div>

      {/* Monthly savings highlight */}
      <div className="glass rounded-2xl p-4 glow-teal">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingDown size={18} className="text-sp-green" />
            <span className="text-sm font-semibold text-sp-dark">Monthly Savings</span>
          </div>
          <span className="text-xl font-extrabold text-sp-green">
            ${animatedSavings.toFixed(0)}
          </span>
        </div>
      </div>

      {/* Bar chart comparison */}
      <div className="glass rounded-2xl p-4">
        <h3 className="text-xs font-bold text-sp-dark mb-3">Monthly Cost Comparison</h3>
        <ResponsiveContainer width="100%" height={120}>
          <BarChart data={chartData} layout="vertical" barCategoryGap={12}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={90}
              tick={{ fontSize: 11, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="cost" radius={[0, 8, 8, 0]} barSize={28} label={{ position: 'right', formatter: (v) => `$${v}`, fontSize: 12, fontWeight: 700, fill: '#f3f4f6' }}>
              {chartData.map((_, idx) => (
                <Cell key={idx} fill={CHART_COLORS[idx]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Projections row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="glass-subtle rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">Annual</p>
          <p className="text-sm font-extrabold text-sp-green">
            ${costs.annualSavings.toLocaleString('en-SG', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="glass-subtle rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1">5-Year</p>
          <p className="text-sm font-extrabold text-sp-green">
            ${costs.fiveYearSavings.toLocaleString('en-SG', { maximumFractionDigits: 0 })}
          </p>
        </div>
        <div className="glass-subtle rounded-xl p-3 text-center">
          <p className="text-xs text-gray-400 mb-1 flex items-center justify-center gap-1">
            <Leaf size={10} className="text-sp-green" />
            CO2/yr
          </p>
          <p className="text-sm font-extrabold text-sp-green">
            -{costs.co2ReductionKgYear.toLocaleString('en-SG', { maximumFractionDigits: 0 })} kg
          </p>
        </div>
      </div>
    </div>
  );
}
