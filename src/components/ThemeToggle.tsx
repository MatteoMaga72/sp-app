'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('sp-theme');
    if (saved === 'dark') {
      setDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggle = () => {
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

  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="fixed top-3 right-3 z-[60] flex items-center gap-1.5 px-3 py-1.5 rounded-full glass active:scale-95 transition-transform"
    >
      {dark ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-gray-600" />
      )}
      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
        {dark ? 'Light' : 'Dark'}
      </span>
    </button>
  );
}
