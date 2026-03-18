'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Leaf, Car, User } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/bills', label: 'Bills', icon: FileText },
  { href: '/greenup', label: 'GreenUP', icon: Leaf },
  { href: '/ev-charging', label: 'EV Charging', icon: Car },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] glass-strong glass-nav-highlight z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 text-xs font-medium min-w-[60px] ${
                isActive ? 'text-sp-teal' : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
