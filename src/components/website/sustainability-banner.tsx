'use client';

import { Leaf } from 'lucide-react';

const stats = [
  { value: '22%', label: 'average consumption reduction' },
  { value: '50,000', label: 'EV charge sessions/month' },
  { value: '8,400', label: 'tonnes CO\u2082 offset' },
];

export default function SustainabilityBanner() {
  return (
    <section className="py-20 px-8 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-sp-teal/20 via-sp-green/15 to-sp-teal/20" />
      <div
        className="absolute inset-0 opacity-20"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, rgba(0,191,165,0.3), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(76,175,80,0.3), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
          <Leaf size={16} className="text-sp-green" />
          <span className="text-sm font-medium text-sp-green">Singapore Green Plan 2030</span>
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
          We&apos;re leading the way
        </h2>
        <p className="text-lg text-gray-400 max-w-xl mx-auto mb-12">
          Driving Singapore&apos;s transition to a cleaner, greener energy future.
        </p>

        <div className="flex flex-wrap gap-8 lg:gap-16 justify-center mb-10">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-sp-green">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <button className="spring-button px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-gradient-to-r from-sp-green to-sp-teal shadow-lg">
          See Our Progress
        </button>
      </div>
    </section>
  );
}
