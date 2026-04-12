"use client";

import Link from "next/link";
import { Activity, ArrowRight } from "lucide-react";

export function LiveEnergyBanner() {
  return (
    <Link
      href="/energy-flow"
      className="block w-full mb-4 group relative overflow-hidden rounded-2xl bg-gradient-to-r from-energy-emerald via-energy-teal to-energy-cyan p-[1px]"
    >
      <div className="relative flex items-center justify-between px-4 py-3.5 rounded-[15px] bg-gradient-to-r from-energy-emerald/90 via-energy-teal/90 to-energy-cyan/90 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 animate-ping bg-white/40 rounded-full" />
            <div className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Activity className="w-5 h-5 text-white" />
            </div>
          </div>

          <div className="text-left">
            <p className="text-sm font-semibold text-white">Live Energy Flow</p>
            <p className="text-xs text-white/80">See real-time consumption</p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors">
          <span className="text-xs font-medium text-white">View</span>
          <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
      </div>
    </Link>
  );
}
