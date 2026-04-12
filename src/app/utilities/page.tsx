'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Search, Home, Package, CreditCard, Clock, ChevronRight, ChevronDown,
  CalendarClock, Plug, MapPin, Receipt, ToggleLeft, Landmark, BarChart3,
  ArrowRightLeft, Zap, Car, Check, Plus, Minus,
} from 'lucide-react';

const moreServices = [
  {
    group: 'Account Management',
    items: [
      { icon: CalendarClock, label: 'Reschedule Appointment' },
      { icon: Plug, label: 'Grid Connection' },
      { icon: MapPin, label: 'Update Mailing Address' },
    ],
  },
  {
    group: 'Billing',
    items: [
      { icon: Receipt, label: 'View Past Transactions' },
      { icon: ToggleLeft, label: 'Switch to Regulated Tariff' },
      { icon: Landmark, label: 'Set up GIRO' },
    ],
  },
  {
    group: 'Electricity Market',
    items: [
      { icon: BarChart3, label: 'Compare plans' },
      { icon: ArrowRightLeft, label: 'Switch retailer' },
    ],
  },
];

function useAnimatedProgress(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setValue(Math.round(t * target));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function UtilitiesPage() {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [pressed, setPressed] = useState<string | null>(null);
  const progress = useAnimatedProgress(50);

  const toggle = (group: string) =>
    setExpandedGroups((prev) => ({ ...prev, [group]: !prev[group] }));

  return (
    <div className="flex flex-col min-h-screen bg-gradient-utilities pb-8 relative overflow-hidden">
      <div className="glass-strong px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 z-30">
        <Link href="/" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-transform">
          <ArrowLeft size={22} className="text-sp-dark" />
        </Link>
        <h1 className="text-lg font-bold text-sp-dark">Services</h1>
        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-transform">
          <Search size={20} className="text-sp-teal" />
        </button>
      </div>

      <div className="px-4 mt-4 flex flex-col gap-4 relative z-10">
        {/* Moving House Card */}
        <Link
          href="/utilities/moving"
          onPointerDown={() => setPressed('moving')}
          onPointerUp={() => setPressed(null)}
          onPointerLeave={() => setPressed(null)}
          className={`relative block rounded-3xl overflow-hidden shadow-lg transition-transform duration-150 ${pressed === 'moving' ? 'scale-[0.97]' : ''}`}
        >
          <div className="bg-gradient-to-br from-sp-teal to-emerald-600 p-5 pb-6 text-white relative">
            <div className="absolute inset-0 backdrop-blur-[2px]" />
            <div className="relative z-10">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-xs font-semibold px-2.5 py-0.5 rounded-full mb-3">Most Used</span>
              <div className="flex items-start gap-4">
                <div className="shrink-0 relative w-16 h-16">
                  <div className="absolute inset-0 rounded-xl bg-white/15 flex items-center justify-center">
                    <Home size={28} className="text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-md bg-white/25 flex items-center justify-center">
                    <Package size={14} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold leading-tight">Moving House?</h2>
                  <p className="text-sm text-white/80 mt-1">We&rsquo;ll handle everything</p>
                  <p className="text-xs text-white/60 mt-0.5">Close, open &amp; transfer GIRO in one go</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 bg-white rounded-xl px-4 py-3 shadow">
                <span className="text-sm font-semibold text-sp-teal flex-1">Start Moving Flow</span>
                <ChevronRight size={18} className="text-sp-teal" />
              </div>
            </div>
          </div>
        </Link>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <QuickCard icon={<Plus size={20} className="text-sp-green" />} accent="border-sp-green" title="Open Account" subtitle="New place? Set up in 3 mins" pressed={pressed} id="open" setPressed={setPressed} />
          <QuickCard icon={<Minus size={20} className="text-sp-orange" />} accent="border-sp-orange" title="Close Account" subtitle="Moving out? Quick closure" pressed={pressed} id="close" setPressed={setPressed} />
          <QuickCard icon={<CreditCard size={20} className="text-sp-teal" />} accent="border-sp-teal" title="Pay Bill" subtitle="PayNow, GIRO, card" pressed={pressed} id="pay" setPressed={setPressed} />
          <QuickCard icon={<Clock size={20} className="text-blue-500" />} accent="border-blue-500" title="Check Status" subtitle="Track applications" pressed={pressed} id="status" setPressed={setPressed} />
        </div>

        {/* Applications Tracker */}
        <div className="glass-strong rounded-3xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-sm font-bold text-sp-dark">Your Applications</h3>
            <span className="bg-sp-teal text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">1</span>
          </div>
          <div className="border border-gray-100 dark:border-gray-700 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap size={16} className="text-sp-teal" />
              <span className="text-sm font-semibold text-sp-dark">Utilities Opening</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">18 Everton Rd</p>
            <div className="flex items-center gap-1 mb-3">
              {['Applied', 'Reviewing', 'Approved', 'Active'].map((step, i) => {
                const done = i === 0;
                const current = i === 1;
                return (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${done ? 'bg-sp-green text-white' : ''} ${current ? 'bg-sp-teal text-white animate-pulse' : ''} ${!done && !current ? 'bg-gray-200 dark:bg-gray-600 text-gray-400' : ''}`}>
                        {done ? <Check size={12} /> : i + 1}
                      </div>
                      <span className={`text-[9px] mt-1 ${current ? 'text-sp-teal font-semibold' : 'text-gray-400'}`}>{step}</span>
                    </div>
                    {i < 3 && <div className={`flex-1 h-0.5 mx-1 rounded ${done ? 'bg-sp-green' : 'bg-gray-200 dark:bg-gray-600'}`} />}
                  </div>
                );
              })}
            </div>
            <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-sp-teal rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>Submitted 15 Mar 2026</span>
              <span>Est. 20 Mar 2026</span>
            </div>
          </div>
        </div>

        {/* More Services */}
        <div className="glass-subtle rounded-3xl overflow-hidden">
          <h3 className="text-sm font-bold text-sp-dark px-4 pt-4 pb-2">More Services</h3>
          {moreServices.map((section) => {
            const open = !!expandedGroups[section.group];
            return (
              <div key={section.group}>
                <button onClick={() => toggle(section.group)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/30 dark:hover:bg-gray-700/30 active:bg-white/50 dark:active:bg-gray-600/50 transition-colors">
                  <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{section.group}</span>
                  <ChevronDown size={16} className={`text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                </button>
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: open ? `${section.items.length * 56}px` : '0px', opacity: open ? 1 : 0 }}>
                  {section.items.map((item) => (
                    <button key={item.label} className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/30 dark:hover:bg-gray-700/30 active:bg-white/50 dark:active:bg-gray-600/50 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-sp-teal-light flex items-center justify-center">
                        <item.icon size={16} className="text-sp-teal" />
                      </div>
                      <span className="flex-1 text-sm text-sp-dark text-left">{item.label}</span>
                      <ChevronRight size={16} className="text-gray-300 dark:text-gray-600" />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Smart Suggestion */}
        <div className="glass rounded-3xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow flex items-center justify-center shrink-0">
            <Car size={20} className="text-sp-teal" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-sp-dark leading-tight">We noticed you may have an EV</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Set up home charging with SP?</p>
          </div>
          <ChevronRight size={18} className="text-sp-teal shrink-0" />
        </div>
      </div>
    </div>
  );
}

function QuickCard({ icon, accent, title, subtitle, pressed, id, setPressed }: {
  icon: React.ReactNode; accent: string; title: string; subtitle: string;
  pressed: string | null; id: string; setPressed: (v: string | null) => void;
}) {
  return (
    <button
      onPointerDown={() => setPressed(id)}
      onPointerUp={() => setPressed(null)}
      onPointerLeave={() => setPressed(null)}
      className={`glass rounded-2xl p-3.5 text-left border-l-4 ${accent} transition-transform duration-150 ${pressed === id ? 'scale-[0.96]' : ''}`}
    >
      <div className="mb-2">{icon}</div>
      <p className="text-sm font-semibold text-sp-dark leading-tight">{title}</p>
      <p className="text-[11px] text-gray-400 mt-0.5 leading-snug">{subtitle}</p>
    </button>
  );
}
