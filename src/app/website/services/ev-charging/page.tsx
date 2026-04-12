'use client';

import { Car, MapPin, Gift, Download } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const stats = [
  { value: '2,000+', label: 'Charging Points' },
  { value: '500+', label: 'Locations' },
  { value: 'AC & DC', label: 'Charging Types' },
];

const plans = [
  {
    name: 'Pay-Per-Use',
    price: '$0.55',
    unit: '/kWh',
    features: [
      'No commitment or monthly fee',
      'Pay only when you charge',
      'Accepts credit/debit cards',
      'Real-time pricing via app',
    ],
    recommended: false,
  },
  {
    name: 'ChargeUP Subscription',
    price: '$29.90',
    unit: '/month',
    features: [
      '$0.42/kWh discounted rate',
      'Priority access to DC fast chargers',
      'Free ChargeUP Rewards membership',
      'Monthly usage reports & insights',
    ],
    recommended: true,
  },
];

export default function EVChargingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[
        { label: 'Services', href: '/website/services' },
        { label: 'EV Charging' },
      ]}
      ctaTitle="Start charging with SP"
      ctaDescription="Download the SP App to locate chargers, start sessions, and track your charging history."
      ctaPrimaryLabel="Download SP App"
      ctaSecondaryLabel="View Charging Map"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-30 blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(0,191,165,0.5), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(0,150,136,0.4), transparent 70%)',
              animationDelay: '4s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-sp-teal mb-6 animate-fade-in-up">
              <Car size={16} />
              <span>EV Charging</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
              Singapore&apos;s Largest
              <br />
              <span className="bg-gradient-to-r from-sp-teal to-teal-400 bg-clip-text text-transparent">
                EV Charging Network
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl animate-fade-in-up delay-200">
              Charge anywhere, anytime. From neighbourhood HDB car parks to premium malls and office buildings.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="glass rounded-3xl p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl lg:text-5xl font-bold text-sp-teal mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Placeholder */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Find a <span className="text-sp-teal">Charger</span> Near You
          </h2>
          <div className="relative rounded-3xl overflow-hidden h-[400px] bg-gradient-to-br from-sp-teal/10 via-background to-teal-900/20 border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="flex justify-center gap-8 mb-6">
                  {[
                    { top: '25%', left: '20%' },
                    { top: '40%', left: '45%' },
                    { top: '30%', left: '70%' },
                    { top: '60%', left: '35%' },
                    { top: '55%', left: '60%' },
                  ].map((pos, idx) => (
                    <div
                      key={idx}
                      className="absolute animate-pulse-glow"
                      style={{ top: pos.top, left: pos.left }}
                    >
                      <div className="w-8 h-8 rounded-full bg-sp-teal/30 flex items-center justify-center">
                        <MapPin size={16} className="text-sp-teal" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="glass rounded-2xl px-6 py-4 inline-flex items-center gap-3">
                  <MapPin size={20} className="text-sp-teal" />
                  <span className="text-sm">Interactive map available in the SP App</span>
                </div>
              </div>
            </div>
            {/* Grid overlay */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'linear-gradient(rgba(0,191,165,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,165,0.3) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />
          </div>
        </div>
      </section>

      {/* Charging Plans */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Charging <span className="text-sp-teal">Plans</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Flexible options for occasional and frequent EV drivers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`glass rounded-3xl p-8 relative ${plan.recommended ? 'glow-teal' : ''}`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-8 px-4 py-1 rounded-full bg-gradient-to-r from-sp-teal to-sp-teal-dark text-white text-xs font-semibold">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold text-sp-teal">{plan.price}</span>
                  <span className="text-gray-400 mb-0.5">{plan.unit}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-sp-teal shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full spring-button py-3 rounded-xl font-semibold text-sm ${
                  plan.recommended
                    ? 'bg-gradient-to-r from-sp-teal to-sp-teal-dark text-white'
                    : 'glass border border-white/20 hover:border-sp-teal/50'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ChargeUP Rewards */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-sp-teal to-sp-green flex items-center justify-center">
                <Gift size={40} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">ChargeUP Rewards</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Earn points every time you charge. Redeem for free charging sessions, parking credits,
                and partner vouchers from FairPrice, Grab, and more.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="glass-subtle rounded-xl px-4 py-2 text-sm">
                  <span className="text-sp-teal font-semibold">1 kWh</span> = <span className="text-gray-300">10 points</span>
                </div>
                <div className="glass-subtle rounded-xl px-4 py-2 text-sm">
                  <span className="text-sp-teal font-semibold">500 pts</span> = <span className="text-gray-300">Free session</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download CTA */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="glass rounded-3xl p-10 bg-gradient-to-r from-sp-teal/10 to-teal-900/10">
            <h3 className="text-2xl font-bold mb-3">Download SP App to Start Charging</h3>
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Locate chargers, start and stop sessions, track history, and manage payments all from your phone.
            </p>
            <button className="spring-button flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark shadow-lg glow-teal mx-auto">
              <Download size={20} />
              Download Now
            </button>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
