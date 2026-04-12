"use client";

import { Header } from "@/components/energy/header";
import { AlertBanner } from "@/components/energy/alert-banner";
import { CostTicker } from "@/components/energy/cost-ticker";
import { QuickActions } from "@/components/energy/quick-actions";
import { LiveEnergyBanner } from "@/components/energy/live-energy-banner";
import { AIInsightCard } from "@/components/energy/ai-insight-card";
import { EnergyChart } from "@/components/energy/energy-chart";
import { PropertySelector } from "@/components/energy/property-selector";
import { PromoCarousel } from "@/components/energy/promo-carousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-energy-emerald/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[200px] h-[200px] bg-energy-teal/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="px-4 pb-24 pt-2 relative z-10">
        <Header />
        <AlertBanner />
        <CostTicker />
        <LiveEnergyBanner />
        <QuickActions />
        <PropertySelector />
        <EnergyChart />
        <AIInsightCard />
        <PromoCarousel />
      </div>
    </div>
  );
}
