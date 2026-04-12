'use client';

import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import HeroSection from '@/components/website/hero-section';
import ServicesGrid from '@/components/website/services-grid';
import AppShowcase from '@/components/website/app-showcase';
import SustainabilityBanner from '@/components/website/sustainability-banner';
import Footer from '@/components/website/footer';

const navLinks = ['Services', 'About', 'Sustainability', 'Careers', 'Contact'];

export default function WebsitePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="!max-w-none !mx-0 min-h-screen bg-background text-foreground" style={{ maxWidth: 'none', margin: 0 }}>
      {/* Desktop nav */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sp-teal to-sp-teal-dark flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">SP Group</span>
          </div>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-gray-400 hover:text-sp-teal transition-colors"
              >
                {link}
              </a>
            ))}
            <button className="spring-button px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark">
              My Account
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden glass-strong border-t border-white/10 px-8 py-4 animate-fade-in-scale">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="block py-2 text-sm font-medium text-gray-400 hover:text-sp-teal"
              >
                {link}
              </a>
            ))}
            <button className="mt-2 w-full px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark">
              My Account
            </button>
          </div>
        )}
      </header>

      <main className="pt-16">
        <HeroSection />
        <ServicesGrid />
        <AppShowcase />
        <SustainabilityBanner />
      </main>

      <Footer />
    </div>
  );
}
