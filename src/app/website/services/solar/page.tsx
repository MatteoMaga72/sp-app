'use client';

import { Sun, FileText, Leaf, ArrowRight, Calculator, Award } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const ppaSteps = [
  {
    icon: FileText,
    title: 'Site Assessment',
    description: 'Our engineers assess your rooftop suitability, orientation, and shading for optimal panel placement.',
  },
  {
    icon: Sun,
    title: 'Installation & PPA',
    description: 'We install solar panels at no upfront cost. You sign a Power Purchase Agreement and pay only for energy generated.',
  },
  {
    icon: Leaf,
    title: 'Generate & Save',
    description: 'Enjoy lower electricity costs with clean solar energy. Excess power is exported to the grid for credits.',
  },
];

export default function SolarPage() {
  return (
    <ServicePageLayout
      breadcrumbs={[
        { label: 'Services', href: '/website/services' },
        { label: 'Solar & Renewables' },
      ]}
      ctaTitle="Go solar with SP"
      ctaDescription="Get a free site assessment and discover how much you can save with rooftop solar."
      ctaPrimaryLabel="Get a Solar Quote"
      ctaSecondaryLabel="Contact Us"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(255,109,0,0.4), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,193,7,0.35), transparent 70%)',
              animationDelay: '4s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-sp-orange mb-6 animate-fade-in-up">
              <Sun size={16} />
              <span>Solar & Renewables</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
              Harness the Power
              <br />
              <span className="bg-gradient-to-r from-sp-orange to-yellow-400 bg-clip-text text-transparent">
                of the Sun
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl animate-fade-in-up delay-200">
              Zero upfront cost solar installations, Renewable Energy Certificates, and carbon offset programmes for a greener Singapore.
            </p>
          </div>
        </div>
      </section>

      {/* Solar Panel Illustration Placeholder */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden h-[300px] bg-gradient-to-br from-sp-orange/10 via-yellow-900/10 to-background border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sp-orange to-yellow-400 flex items-center justify-center mx-auto mb-4">
                  <Sun size={40} className="text-white" />
                </div>
                <p className="text-gray-400 text-sm">Rooftop Solar Installation Illustration</p>
              </div>
            </div>
            {/* Decorative grid */}
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,109,0,0.3) 0px, rgba(255,109,0,0.3) 1px, transparent 1px, transparent 30px), repeating-linear-gradient(90deg, rgba(255,109,0,0.3) 0px, rgba(255,109,0,0.3) 1px, transparent 1px, transparent 30px)',
              }}
            />
          </div>
        </div>
      </section>

      {/* How Solar PPA Works */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-16">
            How Solar PPA <span className="text-sp-orange">Works</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ppaSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative text-center animate-fade-in-up" style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-sp-orange to-yellow-400 mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="text-sm text-sp-orange font-semibold mb-2">Step {idx + 1}</div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                  {idx < ppaSteps.length - 1 && (
                    <div className="hidden md:block absolute top-10 right-0 translate-x-1/2">
                      <ArrowRight size={24} className="text-sp-orange/30" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Green Credits (RECs) */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass rounded-3xl p-10">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-sp-green/20 to-sp-teal/20 mb-6">
                <Award size={28} className="text-sp-green" />
              </div>
              <h3 className="text-2xl font-bold mb-4">My Green Credits</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Renewable Energy Certificates (RECs) allow businesses to claim the environmental
                attributes of clean energy, even if not directly connected to a solar farm.
              </p>
              <ul className="space-y-3">
                {[
                  '1 REC = 1 MWh of renewable energy',
                  'Internationally recognised I-REC standard',
                  'Support your ESG reporting goals',
                  'Bundle with carbon offsets for net zero',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-sp-green shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Carbon Offset Calculator Placeholder */}
            <div className="glass rounded-3xl p-10">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-sp-teal/20 to-sp-green/20 mb-6">
                <Calculator size={28} className="text-sp-teal" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Carbon Offset Calculator</h3>
              <p className="text-gray-400 leading-relaxed mb-6">
                Estimate how much CO2 you can offset by switching to solar energy.
              </p>
              <div className="glass-subtle rounded-2xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Monthly electricity bill</label>
                    <div className="glass rounded-xl px-4 py-3 text-gray-500 text-sm">
                      $200 - $500 / month
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 block mb-2">Roof area (approx)</label>
                    <div className="glass rounded-xl px-4 py-3 text-gray-500 text-sm">
                      100 - 500 sqm
                    </div>
                  </div>
                  <div className="pt-2">
                    <div className="text-sm text-gray-400 mb-1">Estimated annual offset</div>
                    <div className="text-3xl font-bold text-sp-green">12 - 30 tonnes CO2</div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Placeholder calculator. Get a detailed quote for accurate estimates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
