"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { TrendingUp, Zap } from "lucide-react";

export function CostTicker() {
  const [cost, setCost] = useState(2.45);
  const [displayCost, setDisplayCost] = useState("2.45");
  const animFrameRef = useRef<number>(0);
  const prevCostRef = useRef(2.45);

  useEffect(() => {
    const interval = setInterval(() => {
      setCost((prev) => {
        const newCost = prev + Math.random() * 0.02;
        return Math.round(newCost * 100) / 100;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const animateCost = useCallback((target: number) => {
    cancelAnimationFrame(animFrameRef.current);
    const start = prevCostRef.current;
    const duration = 500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setDisplayCost(current.toFixed(2));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        prevCostRef.current = target;
      }
    };
    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    animateCost(cost);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [cost, animateCost]);

  return (
    <div className="relative mt-2 mb-6 p-5 rounded-2xl bg-glass-bg backdrop-blur-xl border border-glass-border overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-energy-emerald/5 to-transparent pointer-events-none" />

      <div className="relative flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 rounded-lg bg-energy-emerald/20 flex items-center justify-center">
              <Zap className="w-4 h-4 text-energy-emerald" />
            </div>
            <span className="text-sm text-muted-foreground">Spent today</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-foreground tracking-tight tabular-nums">
              ${displayCost}
            </span>
            <span className="text-sm text-muted-foreground ml-1">SGD</span>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-energy-emerald/15">
            <TrendingUp className="w-3.5 h-3.5 text-energy-emerald" />
            <span className="text-xs font-medium text-energy-emerald">12% less</span>
          </div>
          <span className="text-xs text-muted-foreground mt-1">vs yesterday</span>
        </div>
      </div>

      <div className="mt-4 h-1.5 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-energy-emerald via-energy-teal to-energy-cyan transition-all duration-1000"
          style={{ width: `${Math.min((cost / 8) * 100, 100)}%` }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[10px] text-muted-foreground">Daily budget: $8.00</span>
        <span className="text-[10px] text-energy-emerald font-medium">
          {Math.round((cost / 8) * 100)}% used
        </span>
      </div>
    </div>
  );
}
