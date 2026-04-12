'use client';

import { Sparkles, Coffee, Tv, Leaf, Zap } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COFFEE_PRICE_SGD = 6.5;
const NETFLIX_MONTHLY_SGD = 15.98;
const SP_GREEN_CREDIT_SGD = 8;

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface SavingsSummaryProps {
  annualSavings: number;
}

export default function SavingsSummary({ annualSavings }: SavingsSummaryProps) {
  const coffees = Math.floor(annualSavings / COFFEE_PRICE_SGD);
  const netflixMonths = Math.floor(annualSavings / NETFLIX_MONTHLY_SGD);
  const greenCredits = Math.floor(annualSavings / SP_GREEN_CREDIT_SGD);

  return (
    <div className="glass rounded-2xl p-5 glow-teal animate-fade-in-up delay-500">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-sp-teal" />
        <h2 className="text-sm font-bold text-sp-dark">Your EV Savings</h2>
      </div>

      {/* Main savings callout */}
      <div className="bg-gradient-to-r from-sp-teal/10 to-sp-green/10 rounded-xl p-4 text-center mb-4">
        <p className="text-xs text-gray-400 mb-1">
          By switching to EV, you could save
        </p>
        <p className="text-3xl font-extrabold text-sp-green">
          ${annualSavings.toLocaleString('en-SG', { maximumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">per year</p>
      </div>

      {/* Equivalents */}
      <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold mb-2">
        That&apos;s equivalent to
      </p>

      <div className="space-y-2 mb-5">
        <div className="flex items-center gap-3 glass-subtle rounded-xl px-3 py-2.5">
          <Coffee size={16} className="text-amber-500 shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-bold text-sp-dark">{coffees.toLocaleString()}</span>
            <span className="text-xs text-gray-400 ml-1">cups of coffee</span>
          </div>
        </div>

        <div className="flex items-center gap-3 glass-subtle rounded-xl px-3 py-2.5">
          <Tv size={16} className="text-red-500 shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-bold text-sp-dark">{netflixMonths.toLocaleString()}</span>
            <span className="text-xs text-gray-400 ml-1">months of Netflix</span>
          </div>
        </div>

        <div className="flex items-center gap-3 glass-subtle rounded-xl px-3 py-2.5">
          <Leaf size={16} className="text-sp-green shrink-0" />
          <div className="flex-1">
            <span className="text-sm font-bold text-sp-dark">{greenCredits.toLocaleString()}</span>
            <span className="text-xs text-gray-400 ml-1">SP Green Credits</span>
          </div>
        </div>
      </div>

      {/* CTA button */}
      <button className="w-full bg-gradient-to-r from-sp-teal to-sp-green text-white font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 spring-button shadow-lg">
        <Zap size={16} />
        Start Charging with SP
      </button>
    </div>
  );
}
