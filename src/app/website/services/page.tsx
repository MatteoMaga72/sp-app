'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Zap, Droplets, Car, Sun, Snowflake, Wifi } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const services = [
  {
    icon: Zap,
    title: 'Electricity & Gas',
    description: 'Reliable power and gas supply for every home and business across Singapore. Open Electricity Market ready.',
    gradient: 'from-sp-teal to-sp-green',
    href: '/website/services/electricity',
    audience: 'both' as const,
  },
  {
    icon: Droplets,
    title: 'Water',
    description: 'Smart water management with real-time monitoring, leak detection, and tiered tariff transparency.',
    gradient: 'from-blue-400 to-blue-600',
    href: '/website/services/water',
    audience: 'both' as const,
  },
  {
    icon: Car,
    title: 'EV Charging',
    description: 'Singapore\'s largest EV charging network with 2,000+ charging points and flexible payment plans.',
    gradient: 'from-sp-teal to-teal-400',
    href: '/website/services/ev-charging',
    audience: 'both' as const,
  },
  {
    icon: Sun,
    title: 'Solar & Renewables',
    description: 'Rooftop solar PPA solutions and Renewable Energy Certificates for a sustainable future.',
    gradient: 'from-sp-orange to-yellow-400',
    href: '/website/services/solar',
    audience: 'business' as const,
  },
  {
    icon: Snowflake,
    title: 'District Cooling',
    description: 'Energy-efficient centralised cooling for Tengah and other next-generation districts.',
    gradient: 'from-cyan-400 to-blue-500',
    href: '/website/services/district-cooling',
    audience: 'home' as const,
  },
  {
    icon: Wifi,
    title: 'Smart Home',
    description: 'IoT-enabled energy management, smart meters, and AI-powered home automation.',
    gradient: 'from-purple-400 to-sp-teal',
    href: '/website/services/smart-home',
    audience: 'home' as const,
  },
];

type AudienceFilter = 'all' | 'home' | 'business';

export default function ServicesHubPage() {
  const [audience, setAudience] = useState<AudienceFilter>('all');

  const filteredServices = services.filter((s) => {
    if (audience === 'all') return true;
    return s.audience === audience || s.audience === 'both';
  });

  return (
    <ServicePageLayout
      breadcrumbs={[{ label: 'Services' }]}
      ctaTitle="Not sure which service you need?"
      ctaDescription="Contact our team and we will help you find the right solution for your home or business."
      ctaPrimaryLabel="Contact Us"
      ctaSecondaryLabel="Download the App"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full opacity-25 blur-[120px]"
            style={{ background: 'radial-gradient(circle, rgba(0,191,165,0.5), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(255,109,0,0.35), transparent 70%)',
              animationDelay: '3s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Our{' '}
            <span className="bg-gradient-to-r from-sp-teal via-sp-teal-dark to-sp-green bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Powering Every Aspect of Your Life
          </p>
        </div>
      </section>

      {/* Audience Toggle */}
      <section className="px-8 pb-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="glass rounded-2xl p-1 inline-flex gap-1">
            {([
              { key: 'all', label: 'All Services' },
              { key: 'home', label: 'For Homes' },
              { key: 'business', label: 'For Businesses' },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setAudience(tab.key)}
                className={`spring-button px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  audience === tab.key
                    ? 'bg-gradient-to-r from-sp-teal to-sp-teal-dark text-white shadow-lg'
                    : 'text-gray-400 hover:text-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.title}
                  href={service.href}
                  className="group glass rounded-3xl p-8 hover-lift cursor-pointer animate-fade-in-up block"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`inline-flex p-3 rounded-2xl bg-gradient-to-br ${service.gradient} mb-5`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <span className="text-sp-teal text-sm font-medium group-hover:underline">
                    Learn more &rarr;
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
