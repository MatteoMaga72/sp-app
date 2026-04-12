"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  Settings,
  Leaf,
  Car,
  User,
  Bell,
  LogOut,
  ChevronDown,
} from "lucide-react";

const navItems = [
  { href: "/website/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/website/portal/bills", label: "Bills", icon: FileText },
  { href: "/website/portal/consumption", label: "Consumption", icon: BarChart3 },
  { href: "/website/portal/services", label: "Services", icon: Settings },
  { href: "/website/portal/greenup", label: "GreenUP", icon: Leaf },
  { href: "/website/portal/ev", label: "EV", icon: Car },
  { href: "/website/portal/profile", label: "Profile", icon: User },
];

export default function PortalNav() {
  const pathname = usePathname();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="glass-strong border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sp-teal to-emerald-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">SP</span>
          </div>
          <span className="text-sp-dark font-semibold text-lg hidden sm:block">
            SP Group
          </span>
        </div>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/website/portal"
                ? pathname === "/website/portal"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "text-sp-teal bg-sp-teal/10"
                    : "text-gray-400 hover:text-sp-dark hover:bg-white/5"
                }`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Right side: notifications + user */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-white/5 transition-colors">
            <Bell size={20} className="text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-sp-red rounded-full" />
          </button>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sp-teal to-emerald-400 flex items-center justify-center">
                <span className="text-white text-xs font-bold">MM</span>
              </div>
              <span className="text-sm text-sp-dark font-medium hidden md:block">
                Matteo
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {userMenuOpen && (
              <div className="absolute right-0 top-12 w-48 glass-strong rounded-xl shadow-2xl py-2 animate-fade-in-scale">
                <Link
                  href="/website/portal/profile"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-sp-dark hover:bg-white/5 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User size={16} className="text-gray-400" />
                  My Profile
                </Link>
                <Link
                  href="/website/login"
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-sp-red hover:bg-white/5 transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <LogOut size={16} />
                  Sign Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
