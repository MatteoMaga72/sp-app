"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { QrCode, Home, Leaf, Grid3X3, X } from "lucide-react";

interface ComingSoonInfo {
  title: string;
  description: string;
}

const COMING_SOON_MAP: Record<string, ComingSoonInfo> = {
  "Scan QR": {
    title: "Scan QR",
    description: "Scan your meter or PayNow QR code to make instant payments",
  },
  "More": {
    title: "More",
    description: "Access all SP services including meter reading, GIRO setup, and more",
  },
};

const actions = [
  { icon: QrCode, label: "Scan QR", href: "", gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/30" },
  { icon: Home, label: "Services", href: "/utilities", gradient: "from-teal-500 to-cyan-500", shadow: "shadow-teal-500/30" },
  { icon: Leaf, label: "Green Goals", href: "/green-goals", gradient: "from-purple-500 to-violet-500", shadow: "shadow-purple-500/30" },
  { icon: Grid3X3, label: "More", href: "", gradient: "from-slate-500 to-slate-600", shadow: "shadow-slate-500/20" },
];

export function QuickActions() {
  const [overlay, setOverlay] = useState<ComingSoonInfo | null>(null);

  const handleComingSoon = useCallback((label: string) => {
    const info = COMING_SOON_MAP[label];
    if (info) {
      setOverlay(info);
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {actions.map((action) => {
          const content = (
            <>
              <div
                className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg ${action.shadow} transition-all group-hover:scale-110`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-[11px] font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </>
          );
          const className =
            "group flex flex-col items-center gap-2 p-3 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border transition-all hover:scale-105 hover:border-energy-emerald/40 active:scale-95";
          return action.href ? (
            <Link key={action.label} href={action.href} className={className}>
              {content}
            </Link>
          ) : (
            <button key={action.label} className={className} onClick={() => handleComingSoon(action.label)}>
              {content}
            </button>
          );
        })}
      </div>

      {/* Coming Soon Overlay */}
      {overlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOverlay(null)}
          />
          <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/50 p-6 shadow-2xl">
            <button
              onClick={() => setOverlay(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-muted/30 dark:bg-slate-700/50 flex items-center justify-center hover:bg-muted/50 dark:hover:bg-slate-600/50 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-energy-emerald/20 to-energy-teal/20 border border-energy-emerald/30">
                <Grid3X3 className="w-6 h-6 text-energy-emerald" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Coming Soon</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {overlay.description}
              </p>
              <button
                onClick={() => setOverlay(null)}
                className="mt-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal text-white text-sm font-medium shadow-lg shadow-energy-emerald/30 hover:shadow-energy-emerald/50 transition-shadow"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
