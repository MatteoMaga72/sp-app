'use client';

import { Battery, Gauge, DollarSign } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  EV data — Singapore market                                         */
/* ------------------------------------------------------------------ */

interface EvModel {
  name: string;
  brand: string;
  priceSGD: number;
  rangeKm: number;
  kwhPer100km: number;
  accent: string;
}

const SP_TARIFF_PER_KWH = 0.2691;

const EV_MODELS: EvModel[] = [
  { name: 'Model 3', brand: 'Tesla', priceSGD: 150000, rangeKm: 510, kwhPer100km: 14.4, accent: 'from-red-500 to-red-700' },
  { name: 'Atto 3', brand: 'BYD', priceSGD: 155000, rangeKm: 420, kwhPer100km: 15.7, accent: 'from-blue-500 to-blue-700' },
  { name: 'Ioniq 5', brand: 'Hyundai', priceSGD: 230000, rangeKm: 481, kwhPer100km: 16.8, accent: 'from-cyan-400 to-cyan-600' },
  { name: 'MG4', brand: 'MG', priceSGD: 120000, rangeKm: 450, kwhPer100km: 15.8, accent: 'from-orange-400 to-orange-600' },
  { name: 'iX1', brand: 'BMW', priceSGD: 210000, rangeKm: 440, kwhPer100km: 16.3, accent: 'from-indigo-400 to-indigo-600' },
  { name: 'Seal', brand: 'BYD', priceSGD: 175000, rangeKm: 570, kwhPer100km: 14.0, accent: 'from-emerald-400 to-emerald-600' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface EvRecommendationsProps {
  monthlyKm: number;
}

export default function EvRecommendations({ monthlyKm }: EvRecommendationsProps) {
  return (
    <div className="animate-fade-in-up delay-400">
      <h2 className="text-sm font-bold text-sp-dark mb-3 flex items-center gap-2">
        <Battery size={18} className="text-sp-teal" />
        Popular EVs in Singapore
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {EV_MODELS.map((ev) => {
          const monthlyCost =
            (monthlyKm / 100) * ev.kwhPer100km * SP_TARIFF_PER_KWH;

          return (
            <div
              key={`${ev.brand}-${ev.name}`}
              className="glass rounded-2xl p-4 relative overflow-hidden hover-lift"
            >
              {/* Gradient accent bar */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${ev.accent}`}
              />

              {/* Brand + model */}
              <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                {ev.brand}
              </p>
              <p className="text-sm font-bold text-sp-dark leading-tight mt-0.5">
                {ev.name}
              </p>

              {/* Price */}
              <p className="text-xs text-sp-teal font-semibold mt-2">
                ~${(ev.priceSGD / 1000).toFixed(0)}k
              </p>

              {/* Stats */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <Gauge size={10} className="shrink-0" />
                  <span>{ev.rangeKm} km range</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                  <Battery size={10} className="shrink-0" />
                  <span>{ev.kwhPer100km} kWh/100km</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-sp-green font-semibold">
                  <DollarSign size={10} className="shrink-0" />
                  <span>~${monthlyCost.toFixed(0)}/mo running</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
