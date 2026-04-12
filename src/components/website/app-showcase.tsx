'use client';

import { BrainCircuit, Activity, Calculator } from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Bill Explainer',
    description: 'Understand every line of your bill with natural language explanations powered by AI.',
  },
  {
    icon: Activity,
    title: 'Live Energy Flow',
    description: 'Watch your home energy consumption in real-time with beautiful animated visualisations.',
  },
  {
    icon: Calculator,
    title: 'EV Savings Calculator',
    description: 'Compare petrol vs. EV costs and discover how much you could save by switching.',
  },
];

export default function AppShowcase() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Your Energy, <span className="text-sp-teal">Reimagined</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            A mobile app that makes managing your energy effortless and even enjoyable.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Feature list */}
          <div className="space-y-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex gap-5 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-sp-teal to-sp-teal-dark flex items-center justify-center">
                    <Icon size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}

            {/* App store badges */}
            <div className="flex gap-4 pt-4">
              <div className="glass rounded-xl px-5 py-3 flex items-center gap-2 text-sm font-medium">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                iOS
              </div>
              <div className="glass rounded-xl px-5 py-3 flex items-center gap-2 text-sm font-medium">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" aria-hidden="true">
                  <path d="M3.18 23.49L14.09 12.6 3.18.49c-.1.08-.18.2-.18.36v22.28c0 .16.08.28.18.36zm14.48-14.48L5.47.62 16.5 10.17l1.16-1.16zm1.27 1.27l-1.89 1.89 1.89 1.89 2.12-1.23a.94.94 0 000-1.32l-2.12-1.23zm-1.89 5.25L5.47 23.38l12.19-9.39-1.62-1.46z" />
                </svg>
                Android
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center">
            <div className="relative w-[300px] h-[600px] rounded-[3rem] bg-gradient-to-b from-gray-800 to-gray-900 p-3 shadow-2xl">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-7 bg-gray-900 rounded-b-2xl z-10" />
              <div className="w-full h-full rounded-[2.4rem] overflow-hidden bg-gradient-to-br from-[#042f2e] via-[#064e3b] to-[#030712] flex flex-col items-center justify-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sp-teal to-sp-teal-dark flex items-center justify-center mb-4 animate-pulse-glow">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-none stroke-current" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <div className="text-white font-bold text-lg mb-1">SP App</div>
                <div className="text-gray-400 text-xs">Your energy companion</div>
                <div className="mt-8 w-full space-y-3">
                  <div className="h-3 rounded-full bg-white/10 w-full" />
                  <div className="h-3 rounded-full bg-white/10 w-3/4" />
                  <div className="h-8 rounded-xl bg-sp-teal/20 w-full mt-4" />
                  <div className="h-8 rounded-xl bg-white/5 w-full" />
                  <div className="h-8 rounded-xl bg-white/5 w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
