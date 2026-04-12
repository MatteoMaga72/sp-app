'use client';

import { Zap, Droplets, Car, Sun, Snowflake, Wifi } from 'lucide-react';

const services = [
  {
    icon: Zap,
    title: 'Electricity & Gas',
    description: 'Reliable power and gas supply for every home and business across Singapore.',
    gradient: 'from-sp-teal to-sp-green',
  },
  {
    icon: Droplets,
    title: 'Water',
    description: 'Smart water management with real-time monitoring and leak detection.',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: Car,
    title: 'EV Charging',
    description: 'Island-wide EV charging network with dynamic pricing and route planning.',
    gradient: 'from-sp-teal to-teal-400',
  },
  {
    icon: Sun,
    title: 'Solar & Renewables',
    description: 'Rooftop solar solutions and green energy credits for a sustainable future.',
    gradient: 'from-sp-orange to-yellow-400',
  },
  {
    icon: Snowflake,
    title: 'District Cooling',
    description: 'Energy-efficient centralised cooling for commercial and residential districts.',
    gradient: 'from-cyan-400 to-blue-500',
  },
  {
    icon: Wifi,
    title: 'Smart Home',
    description: 'IoT-enabled energy management, smart meters, and home automation.',
    gradient: 'from-purple-400 to-sp-teal',
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Our <span className="text-sp-teal">Services</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Comprehensive utility solutions for Singapore&apos;s homes and businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group glass rounded-3xl p-8 hover-lift cursor-pointer animate-fade-in-up"
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
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
