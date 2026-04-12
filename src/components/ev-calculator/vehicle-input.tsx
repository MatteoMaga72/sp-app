'use client';

import { useState, useCallback } from 'react';
import { Car, Fuel, Gauge } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & constants                                                  */
/* ------------------------------------------------------------------ */

export type FuelType = 'petrol95' | 'petrol98' | 'diesel';

export interface VehicleSelection {
  carModel: string;
  monthlyKm: number;
  fuelType: FuelType;
}

interface VehicleInputProps {
  value: VehicleSelection;
  onChange: (selection: VehicleSelection) => void;
}

const CAR_MODELS = [
  'Toyota Corolla',
  'Honda Civic',
  'BMW 3 Series',
  'Mercedes C-Class',
  'Mazda 3',
] as const;

const FUEL_OPTIONS: { key: FuelType; label: string }[] = [
  { key: 'petrol95', label: 'Petrol 95' },
  { key: 'petrol98', label: 'Petrol 98' },
  { key: 'diesel', label: 'Diesel' },
];

const MIN_KM = 500;
const MAX_KM = 3000;
const STEP_KM = 100;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function VehicleInput({ value, onChange }: VehicleInputProps) {
  const [isFuelOpen, setIsFuelOpen] = useState(false);

  const handleCarChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange({ ...value, carModel: e.target.value });
    },
    [value, onChange],
  );

  const handleKmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange({ ...value, monthlyKm: Number(e.target.value) });
    },
    [value, onChange],
  );

  const handleFuelSelect = useCallback(
    (fuel: FuelType) => {
      onChange({ ...value, fuelType: fuel });
      setIsFuelOpen(false);
    },
    [value, onChange],
  );

  const pct = ((value.monthlyKm - MIN_KM) / (MAX_KM - MIN_KM)) * 100;

  return (
    <div className="glass rounded-2xl p-5 animate-fade-in-up">
      <h2 className="text-sm font-bold text-sp-dark flex items-center gap-2 mb-4">
        <Car size={18} className="text-sp-teal" />
        Your Current Vehicle
      </h2>

      {/* Car model dropdown */}
      <label className="block mb-4">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
          Car Model
        </span>
        <div className="relative">
          <select
            value={value.carModel}
            onChange={handleCarChange}
            className="w-full appearance-none glass-subtle rounded-xl px-4 py-3 text-sm font-medium text-sp-dark bg-transparent outline-none cursor-pointer"
          >
            {CAR_MODELS.map((model) => (
              <option key={model} value={model} className="bg-gray-900 text-white">
                {model}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </label>

      {/* Monthly distance slider */}
      <label className="block mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <Gauge size={14} />
            Monthly Driving Distance
          </span>
          <span className="text-sm font-bold text-sp-teal">
            {value.monthlyKm.toLocaleString()} km
          </span>
        </div>

        <div className="relative">
          <div
            className="absolute top-1/2 left-0 h-1.5 rounded-full bg-gradient-to-r from-sp-teal to-sp-green -translate-y-1/2 pointer-events-none"
            style={{ width: `${pct}%` }}
          />
          <input
            type="range"
            min={MIN_KM}
            max={MAX_KM}
            step={STEP_KM}
            value={value.monthlyKm}
            onChange={handleKmChange}
            className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-sp-teal [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer"
          />
        </div>

        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>{MIN_KM} km</span>
          <span>{MAX_KM} km</span>
        </div>
      </label>

      {/* Fuel type selector */}
      <div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-1">
          <Fuel size={14} />
          Fuel Type
        </span>

        {/* Mobile-friendly pill selector */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsFuelOpen(!isFuelOpen)}
            className="w-full glass-subtle rounded-xl px-4 py-3 text-sm font-medium text-sp-dark text-left flex items-center justify-between"
          >
            {FUEL_OPTIONS.find((f) => f.key === value.fuelType)?.label}
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className={`text-gray-400 transition-transform ${isFuelOpen ? 'rotate-180' : ''}`}
            >
              <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {isFuelOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 glass-strong rounded-xl overflow-hidden z-20 shadow-lg">
              {FUEL_OPTIONS.map((fuel) => (
                <button
                  key={fuel.key}
                  type="button"
                  onClick={() => handleFuelSelect(fuel.key)}
                  className={`w-full px-4 py-3 text-sm text-left font-medium press-effect ${
                    value.fuelType === fuel.key
                      ? 'text-sp-teal bg-sp-teal/10'
                      : 'text-sp-dark hover:bg-white/10'
                  }`}
                >
                  {fuel.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
