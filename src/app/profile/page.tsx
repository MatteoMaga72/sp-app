'use client';

import { useState, useEffect } from 'react';
import {
  ChevronRight,
  UserPlus,
  Shield,
  CreditCard,
  Gift,
  Bell,
  QrCode,
  Plus,
  Sun,
  Moon,
} from 'lucide-react';

const members = [
  { initials: 'AL', color: 'bg-gray-300 dark:bg-gray-600' },
  { initials: 'JT', color: 'bg-gray-300 dark:bg-gray-600' },
  { initials: 'KW', color: 'bg-gray-300 dark:bg-gray-600' },
  { initials: 'SL', color: 'bg-gray-300 dark:bg-gray-600' },
];

const settingsItems = [
  { icon: UserPlus, label: 'Invite a Friend', badge: '+10', badgeColor: 'bg-sp-green' },
  { icon: Shield, label: 'Privacy and Security', badge: null, badgeColor: null },
  { icon: CreditCard, label: 'Payment Methods', badge: null, badgeColor: null },
  { icon: Gift, label: 'Rewards', badge: null, badgeColor: null },
  { icon: Bell, label: 'Communication Preferences', badge: null, badgeColor: null },
];

export default function ProfilePage() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains('dark');
  });
  const [mounted] = useState(() => typeof window !== "undefined");

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('sp-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('sp-theme', 'light');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-profile relative overflow-hidden">
      <div className="bg-sp-teal px-4 pt-12 pb-6 relative z-10">
        <h1 className="text-xl font-bold text-white">Profile</h1>
      </div>

      <div className="mx-4 -mt-2 glass-strong rounded-3xl p-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-sp-teal-light flex items-center justify-center shrink-0">
            <span className="text-sp-teal font-bold text-xl">ML</span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold text-sp-dark truncate">MAGA MATTEO LUCA</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">matteolmaga@gmail.com</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">+65 8972 7679</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 mt-3 text-sp-teal text-sm font-semibold">
          <QrCode size={16} />
          My QR Code
        </button>
      </div>

      <div className="px-4 mt-6 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold text-sp-dark">Premises</h3>
          <button className="text-sp-teal text-sm font-semibold">See all (1)</button>
        </div>

        <div className="glass rounded-3xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sp-orange flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-sm">MM</span>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-bold text-sp-dark">18 Everton Rd</h4>
              <span className="inline-block mt-1 text-xs font-semibold text-sp-orange bg-sp-orange/10 px-2 py-0.5 rounded-full uppercase">Owner</span>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-gray-700 my-3" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">Members</span>
              <div className="flex -space-x-2">
                {members.map((member, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center border-2 border-white dark:border-gray-800`}>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">{member.initials}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-sp-green/10 px-2 py-1 rounded-full">
                <span className="text-xs font-bold text-sp-green">+50</span>
                <span className="text-xs text-sp-green">pts</span>
              </div>
              <button className="w-8 h-8 rounded-full bg-sp-teal-light flex items-center justify-center">
                <Plus size={16} className="text-sp-teal" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6 pb-6 relative z-10">
        <h3 className="text-sm font-bold text-sp-dark mb-3">Settings</h3>
        <div className="glass rounded-3xl overflow-hidden">
          {/* Dark Mode Toggle */}
          {mounted && (
            <button
              onClick={toggleDark}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:glass-subtle transition-colors border-b border-gray-50/50 dark:border-gray-700/50"
            >
              {dark ? (
                <Sun size={20} className="text-yellow-400 shrink-0" />
              ) : (
                <Moon size={20} className="text-gray-500 dark:text-gray-400 shrink-0" />
              )}
              <span className="flex-1 text-sm text-sp-dark text-left">
                {dark ? 'Light Mode' : 'Dark Mode'}
              </span>
              <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${dark ? 'bg-sp-teal' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${dark ? 'translate-x-5.5 left-0.5' : 'left-0.5'}`}
                  style={{ transform: dark ? 'translateX(20px)' : 'translateX(0)' }}
                />
              </div>
            </button>
          )}
          {settingsItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3.5 hover:glass-subtle transition-colors ${index < settingsItems.length - 1 ? 'border-b border-gray-50/50 dark:border-gray-700/50' : ''}`}
            >
              <item.icon size={20} className="text-gray-500 dark:text-gray-400 shrink-0" />
              <span className="flex-1 text-sm text-sp-dark text-left">{item.label}</span>
              {item.badge && (
                <span className={`${item.badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded-full`}>{item.badge}</span>
              )}
              <ChevronRight size={18} className="text-gray-400 shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
