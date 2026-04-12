'use client';

import { Zap, UserPlus, Gauge, BarChart3, ExternalLink, ArrowRight } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const CURRENT_TARIFF_RATE = 0.2691;
const TARIFF_EFFECTIVE_DATE = '1 January 2026';

const steps = [
  {
    icon: UserPlus,
    title: 'Sign Up',
    description: 'Open an SP account online in minutes. Just your NRIC and address.',
  },
  {
    icon: Gauge,
    title: 'Smart Meter Installed',
    description: 'We install a smart meter at no cost. Real-time data starts flowing.',
  },
  {
    icon: BarChart3,
    title: 'Monitor Usage',
    description: 'Track consumption, set budgets, and receive AI-powered savings tips.',
  },
];

export default function ElectricityPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[
        { label: 'Services', href: '/website/services' },
        { label: 'Electricity & Gas' },
      ]}
      ctaTitle="Switch to SP today"
      ctaDescription="Open an electricity account in minutes or download the SP App for real-time monitoring."
      ctaPrimaryLabel="Open an Account"
      ctaSecondaryLabel="Download the App"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(0,191,165,0.5), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(76,175,80,0.4), transparent 70%)',
              animationDelay: '4s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-sp-teal mb-6 animate-fade-in-up">
              <Zap size={16} />
              <span>Electricity & Gas</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
              <span className="bg-gradient-to-r from-sp-teal to-sp-green bg-clip-text text-transparent">
                Reliable Power
              </span>
              <br />
              for Every Need
            </h1>
            <p className="text-xl text-gray-400 max-w-xl animate-fade-in-up delay-200">
              From households to enterprises, SP delivers 99.97% uptime electricity and gas across Singapore.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            How it <span className="text-sp-teal">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-sp-teal to-sp-green mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="text-sm text-sp-teal font-semibold mb-2">Step {idx + 1}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 right-0 translate-x-1/2">
                      <ArrowRight size={24} className="text-sp-teal/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tariff Card */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-10 glow-teal">
              <h3 className="text-sm font-semibold text-sp-teal uppercase tracking-wider mb-2">Current Tariff</h3>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-5xl font-bold text-foreground">${CURRENT_TARIFF_RATE}</span>
                <span className="text-gray-400 text-lg mb-1">/kWh</span>
              </div>
              <p className="text-gray-400 text-sm mb-6">
                Effective from {TARIFF_EFFECTIVE_DATE}. Tariffs are reviewed quarterly by the Energy Market Authority.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="glass-subtle rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-400">Peak Hours</div>
                  <div className="font-semibold">7am - 11pm</div>
                </div>
                <div className="glass-subtle rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-400">Off-Peak</div>
                  <div className="font-semibold">11pm - 7am</div>
                </div>
                <div className="glass-subtle rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-400">Review Cycle</div>
                  <div className="font-semibold">Quarterly</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-10">
              <h3 className="text-2xl font-bold mb-4">Open Electricity Market</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Since 2019, Singapore households can choose their electricity retailer under the Open Electricity Market (OEM).
                Compare plans from multiple retailers or stay with SP at the regulated tariff.
              </p>
              <ul className="space-y-3 mb-6">
                {['Choose from 10+ licensed retailers', 'Fixed or variable rate plans', 'Green energy options available', 'Switch anytime with no penalty'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-sp-teal shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className="inline-flex items-center gap-2 text-sp-teal text-sm font-medium hover:underline"
              >
                Compare retailers on OEM
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
