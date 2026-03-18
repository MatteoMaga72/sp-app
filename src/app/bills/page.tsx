'use client';

import Link from 'next/link';
import {
  ChevronRight,
  ChevronDown,
  Home,
  Zap,
  Filter,
  HelpCircle,
  FileText,
  CheckCircle,
  Car,
} from 'lucide-react';

const transactions = [
  {
    date: '06 Mar',
    label: 'Mar 2026 PDF Bill',
    amount: '$154.08',
    type: 'bill' as const,
    slug: 'mar-2026',
  },
  {
    date: '25 Feb',
    label: 'Bill Payment (Recurring)',
    amount: '$177.55',
    type: 'payment' as const,
  },
  {
    date: '11 Feb',
    label: 'Feb 2026 PDF Bill',
    amount: '$177.55',
    type: 'bill' as const,
    slug: 'feb-2026',
  },
  {
    date: '20 Jan',
    label: 'Bill Payment (Recurring)',
    amount: '$163.09',
    type: 'payment' as const,
  },
  {
    date: '06 Jan',
    label: 'Jan 2026 PDF Bill',
    amount: '$163.09',
    type: 'bill' as const,
    slug: 'jan-2026',
  },
];

export default function BillsPage() {
  return (
    <div className="min-h-screen bg-gradient-bills pb-8 relative overflow-hidden">
      {/* Floating gradient orb */}
      <div
        className="absolute top-40 -right-16 w-[180px] h-[180px] rounded-full opacity-25 floating-orb pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(76,175,80,0.5) 0%, rgba(0,191,165,0.3) 50%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />

      {/* Header */}
      <div className="glass-strong px-5 pt-14 pb-4 flex items-center justify-between relative z-10">
        <h1 className="text-xl font-bold text-sp-dark">Bills</h1>
        <button className="flex items-center gap-1 text-sp-teal text-sm font-medium">
          <HelpCircle size={16} />
          Help
        </button>
      </div>

      {/* PayNow Banner */}
      <div className="px-4 mt-3 relative z-10 opacity-0 animate-slide-in-right">
        <div className="glass rounded-3xl p-4">
          <div className="flex items-center gap-3">
            {/* PayNow Logo Placeholder */}
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold leading-tight text-center">
                Pay<br />Now
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-sp-dark">
                Pay your bills via PayNow QR
              </p>
              <button className="text-sp-teal text-xs font-medium mt-0.5 flex items-center gap-0.5">
                Learn more <ChevronRight size={12} />
              </button>
            </div>
          </div>
          {/* Carousel Dots */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <div className="w-1.5 h-1.5 rounded-full bg-sp-teal" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600" />
          </div>
        </div>
      </div>

      {/* Outstanding Amount Card */}
      <div className="px-4 mt-3 relative z-10 opacity-0 animate-fade-in-up delay-100">
        <div className="glass-strong rounded-3xl p-4">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-semibold text-sp-dark">
              Outstanding Amount
            </h2>
            <button className="text-sp-teal text-xs font-medium flex items-center gap-0.5">
              Understanding Your Bill <ChevronRight size={12} />
            </button>
          </div>

          <div className="mt-3 flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                18 Everton Rd Singapore 089374
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Electricity &amp; Water
                </span>
                <span className="text-[10px] font-semibold text-sp-teal bg-sp-teal-light px-2 py-0.5 rounded-full">
                  RECURRING
                </span>
              </div>
            </div>
            <p className="text-xl font-bold text-sp-dark animate-fade-in-scale">$154.08</p>
          </div>
        </div>
      </div>

      {/* Address Filter */}
      <div className="px-4 mt-4 relative z-10">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-1.5 glass rounded-full px-3 py-2 text-sm font-medium text-sp-dark">
            18 Everton Rd
            <ChevronDown size={16} className="text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-sp-teal">
              <Home size={18} />
            </button>
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400">
              <Car size={18} />
            </button>
            <button className="w-9 h-9 rounded-full glass flex items-center justify-center text-gray-400">
              <Filter size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="px-4 mt-4 relative z-10">
        <p className="text-xs font-semibold text-gray-400 mb-3">2026</p>

        <div className="glass rounded-3xl overflow-hidden">
          {transactions.map((tx, idx) => {
            const delayClass = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'][idx] || 'delay-500';
            const inner = (
              <>
                {/* Timeline dot */}
                <div className="flex flex-col items-center self-stretch">
                  <div className="w-2.5 h-2.5 rounded-full bg-sp-teal flex-shrink-0 mt-1" />
                  {idx < transactions.length - 1 && (
                    <div className="w-px flex-1 bg-gray-200 dark:bg-gray-700 mt-1" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-sp-dark truncate">
                      {tx.date} - {tx.label}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{tx.amount}</span>
                    {tx.type === 'payment' && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-sp-green bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                        <CheckCircle size={10} />
                        SUCCESS
                      </span>
                    )}
                  </div>
                  {tx.type === 'bill' && (
                    <p className="text-[11px] text-sp-teal font-medium mt-1">
                      View breakdown &rarr;
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 flex-shrink-0" />
              </>
            );

            if (tx.type === 'bill' && tx.slug) {
              return (
                <Link
                  key={idx}
                  href={`/bills/${tx.slug}`}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-gray-50/50 dark:border-gray-700/50 last:border-b-0 active:bg-sp-teal-light hover:glass-subtle transition-colors press-effect hover-lift opacity-0 animate-fade-in-up ${delayClass}`}
                >
                  {inner}
                </Link>
              );
            }

            return (
              <button
                key={idx}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-gray-50/50 dark:border-gray-700/50 last:border-b-0 active:bg-gray-50 dark:active:bg-gray-700 hover:glass-subtle transition-colors press-effect opacity-0 animate-fade-in-up ${delayClass}`}
              >
                {inner}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
