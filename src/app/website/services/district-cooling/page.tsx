'use client';

import { Snowflake, Building2, TrendingDown, Leaf, Smartphone } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const EFFICIENCY_MIN = 30;
const EFFICIENCY_MAX = 40;

const stats = [
  { value: `${EFFICIENCY_MIN}-${EFFICIENCY_MAX}%`, label: 'More Energy Efficient' },
  { value: '3,000', label: 'Homes in Tengah' },
  { value: '24/7', label: 'Centralised Monitoring' },
];

export default function DistrictCoolingPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[
        { label: 'Services', href: '/website/services' },
        { label: 'District Cooling' },
      ]}
      ctaTitle="Moving to Tengah?"
      ctaDescription="Learn how district cooling is integrated into your new home and how to manage it with the MyTengah app."
      ctaPrimaryLabel="Download MyTengah App"
      ctaSecondaryLabel="Contact Us"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full opacity-30 blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(59,130,246,0.35), transparent 70%)',
              animationDelay: '4s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-cyan-400 mb-6 animate-fade-in-up">
              <Snowflake size={16} />
              <span>District Cooling</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Centralised Cooling
              </span>
              <br />
              for Tengah New Town
            </h1>
            <p className="text-xl text-gray-400 max-w-xl animate-fade-in-up delay-200">
              Singapore&apos;s first HDB town with a district cooling system, delivering {EFFICIENCY_MIN}-{EFFICIENCY_MAX}% energy savings compared to conventional air conditioning.
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
                <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How District Cooling Works */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            How District Cooling <span className="text-cyan-400">Works</span>
          </h2>

          {/* Diagram Placeholder */}
          <div className="relative rounded-3xl overflow-hidden h-[350px] bg-gradient-to-br from-cyan-900/10 via-background to-blue-900/10 border border-white/10 mb-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-8 lg:gap-16">
                {[
                  { icon: Building2, label: 'Central Plant', desc: 'Chilled water production' },
                  { icon: TrendingDown, label: 'Distribution', desc: 'Underground pipe network' },
                  { icon: Snowflake, label: 'Your Home', desc: 'Fan coil units for cooling' },
                ].map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="text-center relative">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto mb-3">
                        <Icon size={28} className="text-white" />
                      </div>
                      <div className="font-semibold text-sm">{step.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{step.desc}</div>
                      {idx < 2 && (
                        <div className="hidden lg:block absolute top-8 -right-12 text-cyan-400/30">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingDown,
                title: 'Energy Savings',
                description: `${EFFICIENCY_MIN}-${EFFICIENCY_MAX}% more efficient than individual split units. Centralised chiller plants operate at optimal load, reducing per-unit energy consumption.`,
              },
              {
                icon: Leaf,
                title: 'Lower Carbon Footprint',
                description: 'Reduced refrigerant usage and higher system efficiency translate to significantly lower greenhouse gas emissions per household.',
              },
              {
                icon: Snowflake,
                title: 'No Outdoor Units',
                description: 'Residents enjoy a quieter, cleaner facade with no bulky outdoor condenser units cluttering the building exterior.',
              },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="glass rounded-3xl p-8 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 mb-5">
                    <Icon size={24} className="text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MyTengah App */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-10">
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                <Smartphone size={40} className="text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">MyTengah App</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Manage your district cooling from your phone. Set room temperatures, view real-time
                energy consumption, schedule cooling hours, and pay your bills seamlessly.
              </p>
              <ul className="space-y-2">
                {['Room-by-room temperature control', 'Usage history and cost tracking', 'Maintenance request submission', 'Push notifications for service updates'].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
