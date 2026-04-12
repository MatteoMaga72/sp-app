'use client';

import { Download, LogIn } from 'lucide-react';

const stats = [
  { value: '1.4M', label: 'Households' },
  { value: '630 GWh', label: 'managed monthly' },
  { value: '99.97%', label: 'uptime' },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="floating-orb absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-30 blur-[120px]"
          style={{ background: 'radial-gradient(circle, rgba(0,191,165,0.5), transparent 70%)' }}
        />
        <div
          className="floating-orb absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-25 blur-[100px]"
          style={{
            background: 'radial-gradient(circle, rgba(255,109,0,0.4), transparent 70%)',
            animationDelay: '3s',
          }}
        />
        <div
          className="floating-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 blur-[140px]"
          style={{
            background: 'radial-gradient(circle, rgba(0,150,136,0.4), transparent 70%)',
            animationDelay: '5s',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 text-center">
        <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-sp-teal via-sp-teal-dark to-sp-green bg-clip-text text-transparent">
            Empowering Singapore&apos;s
          </span>
          <br />
          <span className="text-foreground">Energy Future</span>
        </h1>

        <p className="text-xl lg:text-2xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
          Smart meters. AI insights. Green energy. All in one platform.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-up delay-300">
          <button className="spring-button flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark shadow-lg glow-teal">
            <Download size={20} />
            Download the App
          </button>
          <button className="spring-button flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg glass border border-white/20 hover:border-sp-teal/50">
            <LogIn size={20} />
            Login to My Account
          </button>
        </div>

        <div className="flex flex-wrap gap-8 lg:gap-16 justify-center animate-fade-in-up delay-500">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-sp-teal">{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
