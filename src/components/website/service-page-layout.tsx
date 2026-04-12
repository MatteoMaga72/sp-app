'use client';

import { Zap, ChevronRight, Download, LogIn, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { label: 'Services', href: '/website/services' },
  { label: 'About', href: '#' },
  { label: 'Sustainability', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Contact', href: '#' },
];

interface Breadcrumb {
  label: string;
  href?: string;
}

interface ServicePageLayoutProps {
  children: React.ReactNode;
  breadcrumbs: Breadcrumb[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
}

export default function ServicePageLayout({
  children,
  breadcrumbs,
  ctaTitle = 'Ready to get started?',
  ctaDescription = 'Open an account or download the SP App to manage your utilities on the go.',
  ctaPrimaryLabel = 'Download the App',
  ctaPrimaryHref = '#',
  ctaSecondaryLabel = 'Login to My Account',
  ctaSecondaryHref = '#',
}: ServicePageLayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="!max-w-none !mx-0 min-h-screen bg-background text-foreground"
      style={{ maxWidth: 'none', margin: 0 }}
    >
      {/* Desktop nav */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <Link href="/website" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sp-teal to-sp-teal-dark flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg">SP Group</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-400 hover:text-sp-teal transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button className="spring-button px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark">
              My Account
            </button>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden glass-strong border-t border-white/10 px-8 py-4 animate-fade-in-scale">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block py-2 text-sm font-medium text-gray-400 hover:text-sp-teal"
              >
                {link.label}
              </Link>
            ))}
            <button className="mt-2 w-full px-5 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark">
              My Account
            </button>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* Breadcrumbs */}
        <div className="max-w-7xl mx-auto px-8 py-4">
          <nav className="flex items-center gap-1 text-sm text-gray-400">
            <Link href="/website" className="hover:text-sp-teal transition-colors">
              Home
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight size={14} />
                {crumb.href && idx < breadcrumbs.length - 1 ? (
                  <Link href={crumb.href} className="hover:text-sp-teal transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-foreground font-medium">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {children}

        {/* CTA Footer Section */}
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="glass rounded-3xl p-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">{ctaTitle}</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">{ctaDescription}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href={ctaPrimaryHref}
                  className="spring-button flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-white bg-gradient-to-r from-sp-teal to-sp-teal-dark shadow-lg glow-teal"
                >
                  <Download size={20} />
                  {ctaPrimaryLabel}
                </Link>
                <Link
                  href={ctaSecondaryHref}
                  className="spring-button flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold glass border border-white/20 hover:border-sp-teal/50"
                >
                  <LogIn size={20} />
                  {ctaSecondaryLabel}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <span>&copy; 2026 SP Group. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-sp-teal transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-sp-teal transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-sp-teal transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
