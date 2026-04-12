"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FileText, Leaf, Car, User } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/bills", label: "Bills", icon: FileText },
  { href: "/greenup", label: "GreenUP", icon: Leaf },
  { href: "/ev-charging", label: "EV", icon: Car },
  { href: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
      <div className="w-full max-w-[430px] px-4 pb-4">
        <div className="flex items-center justify-around px-2 py-2 rounded-2xl bg-glass-bg/90 backdrop-blur-2xl border border-glass-border shadow-xl shadow-black/10">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} aria-label={`Navigate to ${item.label}`}
                className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                  isActive ? "text-energy-emerald" : "text-muted-foreground hover:text-foreground"
                }`}>
                {isActive && <div className="absolute inset-0 bg-energy-emerald/10 rounded-xl" />}
                <Icon className={`relative w-5 h-5 transition-transform ${isActive ? "scale-110" : ""}`} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="relative text-xs font-medium">{item.label}</span>
                {isActive && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-energy-emerald" />}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
