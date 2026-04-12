"use client"

import { useState } from "react"
import { BillDetailHeader } from "@/components/bill-explainer/bill-detail-header"
import { BillHeroChart } from "@/components/bill-explainer/bill-hero-chart"
import { CategoryBreakdown } from "@/components/bill-explainer/category-breakdown"
import { AIExplanation } from "@/components/bill-explainer/ai-explanation"
import { MonthComparison } from "@/components/bill-explainer/month-comparison"
import { DailyUsageTimeline } from "@/components/bill-explainer/daily-usage-timeline"
import { SmartTips } from "@/components/bill-explainer/smart-tips"
import { BillActions } from "@/components/bill-explainer/bill-actions"
import { BillExplainerWizard } from "@/components/bill-explainer/bill-explainer-wizard"

function getInitialWizardState() {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem("billExplainerWizardSeen");
}

export default function BillDetailPage() {
  const [showWizard, setShowWizard] = useState(getInitialWizardState)

  const handleWizardComplete = () => {
    localStorage.setItem("billExplainerWizardSeen", "true")
    setShowWizard(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-energy-emerald/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[200px] h-[200px] bg-energy-teal/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[150px] h-[150px] bg-energy-cyan/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="px-4 pb-24 pt-2 relative z-10 space-y-5">
        <BillDetailHeader month="March 2026" onShowWizard={() => setShowWizard(true)} />
        <BillHeroChart />
        <CategoryBreakdown />
        <AIExplanation />
        <MonthComparison />
        <DailyUsageTimeline />
        <SmartTips />
        <BillActions />
      </div>
      {showWizard && <BillExplainerWizard onComplete={handleWizardComplete} />}
    </div>
  )
}
