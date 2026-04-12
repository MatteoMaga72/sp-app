'use client';

import { Zap } from 'lucide-react';

const columns = [
  {
    title: 'Services',
    links: ['Electricity & Gas', 'Water', 'EV Charging', 'Solar & Renewables', 'District Cooling'],
  },
  {
    title: 'About Us',
    links: ['Our Story', 'Leadership', 'Newsroom', 'Investor Relations', 'Partners'],
  },
  {
    title: 'Sustainability',
    links: ['Green Plan 2030', 'Carbon Offset', 'Community', 'ESG Report', 'Net Zero'],
  },
  {
    title: 'Support',
    links: ['Careers', 'Contact Us', 'FAQs', 'Service Status', 'Feedback'],
  },
];

function SocialIcon({ d }: { d: string }) {
  return (
    <a href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center hover:border-sp-teal/50 transition-colors">
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
        <path d={d} />
      </svg>
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-8 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Logo column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sp-teal to-sp-teal-dark flex items-center justify-center">
                <Zap size={16} className="text-white" />
              </div>
              <span className="font-bold text-lg">SP Group</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Powering Singapore&apos;s sustainable energy future.
            </p>
            <div className="flex gap-3">
              {/* Facebook */}
              <SocialIcon d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              {/* Twitter/X */}
              <SocialIcon d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              {/* LinkedIn */}
              <SocialIcon d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
              {/* Instagram */}
              <SocialIcon d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2zm-.2 2A3.6 3.6 0 004 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 2a3 3 0 100 6 3 3 0 000-6z" />
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-sp-teal transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
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
  );
}
