'use client';

import { Droplets, TrendingDown, Leaf, ExternalLink } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const waterTiers = [
  {
    tier: 'Tier 1',
    range: '0 - 40 m\u00B3',
    rate: '$1.21',
    unit: '/m\u00B3',
    note: 'Covers typical household consumption',
  },
  {
    tier: 'Tier 2',
    range: 'Above 40 m\u00B3',
    rate: '$1.52',
    unit: '/m\u00B3',
    note: 'Higher rate encourages conservation',
  },
];

const conservationTips = [
  {
    title: 'Fix Leaks Promptly',
    description: 'A dripping tap wastes up to 17 litres per day. Check taps and pipes regularly.',
  },
  {
    title: 'Shorter Showers',
    description: 'Reducing shower time by 2 minutes saves 20 litres per session.',
  },
  {
    title: 'Full Loads Only',
    description: 'Run washing machines and dishwashers only with full loads to maximise efficiency.',
  },
  {
    title: 'Smart Irrigation',
    description: 'Water plants in the early morning or evening to minimise evaporation loss.',
  },
];

export default function WaterPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[
        { label: 'Services', href: '/website/services' },
        { label: 'Water' },
      ]}
      ctaTitle="Monitor your water usage"
      ctaDescription="Download the SP App to track consumption, detect leaks early, and save on your water bill."
      ctaPrimaryLabel="Download the App"
      ctaSecondaryLabel="Open an Account"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(0,191,165,0.4), transparent 70%)',
              animationDelay: '3s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-blue-400 mb-6 animate-fade-in-up">
              <Droplets size={16} />
              <span>Water Services</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Smart Water
              </span>
              <br />
              Management
            </h1>
            <p className="text-xl text-gray-400 max-w-xl animate-fade-in-up delay-200">
              Real-time monitoring, leak detection, and transparent tiered pricing to help you conserve and save.
            </p>
          </div>
        </div>
      </section>

      {/* Water Tariff Tiers */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Water <span className="text-blue-400">Tariff</span> Tiers
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Singapore uses a tiered pricing model to encourage responsible water usage.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {waterTiers.map((tier) => (
              <div key={tier.tier} className="glass rounded-3xl p-8">
                <div className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-1">
                  {tier.tier}
                </div>
                <div className="text-sm text-gray-400 mb-4">{tier.range}</div>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold">{tier.rate}</span>
                  <span className="text-gray-400 text-lg mb-0.5">{tier.unit}</span>
                </div>
                <p className="text-gray-400 text-sm">{tier.note}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            Rates include water tariff, water conservation tax, and waterborne fee.
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            How it <span className="text-blue-400">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Droplets,
                title: 'Smart Meter',
                description: 'Advanced meters provide half-hourly readings streamed directly to your SP App.',
              },
              {
                icon: TrendingDown,
                title: 'Leak Alerts',
                description: 'AI-powered anomaly detection notifies you instantly if unusual usage patterns occur.',
              },
              {
                icon: Leaf,
                title: 'Conservation Score',
                description: 'Earn green credits by staying within efficient usage thresholds each month.',
              },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="glass rounded-3xl p-8 text-center animate-fade-in-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conservation Tips */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Conservation <span className="text-blue-400">Tips</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Small changes in daily habits make a big difference for Singapore&apos;s water security.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {conservationTips.map((tip, idx) => (
              <div
                key={tip.title}
                className="glass rounded-2xl p-6 flex gap-4 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400/20 to-blue-600/20 flex items-center justify-center shrink-0">
                  <Droplets size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{tip.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUB Partnership */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 text-center">
            <h3 className="text-2xl font-bold mb-4">In Partnership with PUB</h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto">
              SP Group works closely with PUB, Singapore&apos;s National Water Agency, to deliver reliable water
              supply and promote water conservation across the island. Together, we ensure every drop counts.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-blue-400 text-sm font-medium hover:underline"
            >
              Visit PUB website
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
