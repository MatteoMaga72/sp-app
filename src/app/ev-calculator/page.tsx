'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator } from 'lucide-react';
import VehicleInput from '@/components/ev-calculator/vehicle-input';
import CostComparison, { calculateCosts } from '@/components/ev-calculator/cost-comparison';
import EvRecommendations from '@/components/ev-calculator/ev-recommendations';
import SavingsSummary from '@/components/ev-calculator/savings-summary';
import type { VehicleSelection } from '@/components/ev-calculator/vehicle-input';

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const DEFAULT_SELECTION: VehicleSelection = {
  carModel: 'Toyota Corolla',
  monthlyKm: 1500,
  fuelType: 'petrol95',
};

export default function EvCalculatorPage() {
  const [selection, setSelection] = useState<VehicleSelection>(DEFAULT_SELECTION);

  const handleChange = useCallback((next: VehicleSelection) => {
    setSelection(next);
  }, []);

  const costs = calculateCosts(
    selection.carModel,
    selection.monthlyKm,
    selection.fuelType,
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-ev relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-20 -left-16 w-56 h-56 rounded-full bg-sp-teal/20 blur-3xl floating-orb pointer-events-none" />
      <div className="absolute top-80 -right-20 w-48 h-48 rounded-full bg-sp-green/15 blur-3xl floating-orb pointer-events-none" style={{ animationDelay: '3s' }} />
      <div className="absolute bottom-40 -left-10 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl floating-orb pointer-events-none" style={{ animationDelay: '5s' }} />

      {/* Header */}
      <div className="px-4 pt-12 pb-4 relative z-10">
        <div className="flex items-center gap-3">
          <Link href="/" className="text-sp-teal press-effect">
            <ArrowLeft size={22} />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-sp-dark flex items-center gap-2">
              <Calculator size={20} className="text-sp-teal" />
              Petrol vs. EV Calculator
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Compare your fuel costs with electric driving
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-24 pt-2 relative z-10 space-y-5">
        {/* Vehicle input form */}
        <VehicleInput value={selection} onChange={handleChange} />

        {/* Cost comparison */}
        <CostComparison
          carModel={selection.carModel}
          monthlyKm={selection.monthlyKm}
          fuelType={selection.fuelType}
        />

        {/* EV recommendations */}
        <EvRecommendations monthlyKm={selection.monthlyKm} />

        {/* Savings summary */}
        <SavingsSummary annualSavings={costs.annualSavings} />
      </div>
    </div>
  );
}
