'use client';

import { Wifi, Gauge, Brain, BarChart3, Home, Lightbulb, Shield } from 'lucide-react';
import ServicePageLayout from '@/components/website/service-page-layout';

const meterBenefits = [
  {
    icon: Gauge,
    title: 'Real-Time Readings',
    description: 'Half-hourly consumption data streamed to your SP App. No more estimated bills.',
  },
  {
    icon: BarChart3,
    title: 'Usage Breakdown',
    description: 'See which appliances use the most energy with device-level disaggregation.',
  },
  {
    icon: Lightbulb,
    title: 'Savings Recommendations',
    description: 'AI analyses your patterns and suggests actionable ways to cut consumption by up to 20%.',
  },
  {
    icon: Shield,
    title: 'Anomaly Detection',
    description: 'Instant alerts if unusual spikes are detected, helping prevent billing surprises.',
  },
];

const automationFeatures = [
  {
    title: 'Scene Control',
    description: 'Create custom scenes like "Good Morning" or "Away" that adjust lights, AC, and appliances in one tap.',
  },
  {
    title: 'Smart Scheduling',
    description: 'Schedule appliances to run during off-peak hours automatically, reducing costs without effort.',
  },
  {
    title: 'Voice Integration',
    description: 'Works with Google Home, Amazon Alexa, and Apple HomeKit for hands-free control.',
  },
  {
    title: 'Energy Budget',
    description: 'Set monthly energy budgets and receive alerts before you exceed your target.',
  },
];

export default function SmartHomePage() {
  return (
    <ServicePageLayout
      breadcrumbs={[
        { label: 'Services', href: '/website/services' },
        { label: 'Smart Home' },
      ]}
      ctaTitle="Make your home smarter"
      ctaDescription="Download the SP App to access smart meter data, energy insights, and home automation features."
      ctaPrimaryLabel="Download the App"
      ctaSecondaryLabel="Learn More"
    >
      {/* Hero */}
      <section className="relative py-24 px-8 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div
            className="floating-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 blur-[140px]"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.4), transparent 70%)' }}
          />
          <div
            className="floating-orb absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full opacity-20 blur-[100px]"
            style={{
              background: 'radial-gradient(circle, rgba(0,191,165,0.35), transparent 70%)',
              animationDelay: '4s',
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-purple-400 mb-6 animate-fade-in-up">
              <Wifi size={16} />
              <span>Smart Home</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100">
              Your Home,
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-sp-teal bg-clip-text text-transparent">
                Smarter
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-xl animate-fade-in-up delay-200">
              Smart meters, AI-powered insights, and seamless home automation to optimise comfort and cut energy waste.
            </p>
          </div>
        </div>
      </section>

      {/* Smart Meter Benefits */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Smart Meter <span className="text-purple-400">Benefits</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Your smart meter is the foundation of an intelligent home energy system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {meterBenefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="glass rounded-2xl p-6 flex gap-4 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400/20 to-sp-teal/20 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Home Automation Integration */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4">
            Home <span className="text-purple-400">Automation</span>
          </h2>
          <p className="text-gray-400 text-center max-w-xl mx-auto mb-12">
            Integrate with your favourite smart home ecosystem for effortless control.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {automationFeatures.map((feature, idx) => (
              <div
                key={feature.title}
                className="glass rounded-3xl p-8 animate-fade-in-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPBuddy AI Assistant */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 flex flex-col lg:flex-row items-center gap-10 glow-teal">
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-purple-400 to-sp-teal flex items-center justify-center">
                <Brain size={40} className="text-white" />
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 glass-subtle rounded-full px-3 py-1 text-xs text-sp-teal mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sp-green animate-pulse" />
                Coming Soon
              </div>
              <h3 className="text-2xl font-bold mb-3">SPBuddy AI Assistant</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Your personal energy concierge powered by AI. Ask SPBuddy to explain your bill,
                suggest ways to save, compare your usage with neighbours, or troubleshoot appliance issues.
              </p>
              <div className="glass-subtle rounded-2xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-sp-teal flex items-center justify-center shrink-0">
                    <Brain size={14} className="text-white" />
                  </div>
                  <div className="glass rounded-xl px-3 py-2 text-sm text-gray-300">
                    &ldquo;Your AC used 35% of your energy last month. Raising the thermostat by 1 degree C could save you $12/month.&rdquo;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy Insights */}
      <section className="py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
            Energy <span className="text-purple-400">Insights</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BarChart3,
                title: 'Daily & Monthly Trends',
                description: 'Visualise consumption patterns with interactive charts. Spot seasonal trends and identify high-usage days.',
              },
              {
                icon: Home,
                title: 'Neighbour Comparison',
                description: 'See how your usage compares with similar homes in your district. Benchmark and improve.',
              },
              {
                icon: Lightbulb,
                title: 'Personalised Tips',
                description: 'Receive tailored recommendations based on your actual usage data, not generic advice.',
              },
            ].map((insight, idx) => {
              const Icon = insight.icon;
              return (
                <div
                  key={insight.title}
                  className="glass rounded-3xl p-8 text-center animate-fade-in-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-400 to-sp-teal mb-6">
                    <Icon size={28} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{insight.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{insight.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </ServicePageLayout>
  );
}
