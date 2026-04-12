"use client"

import { useState } from "react"
import { GoalsHeader } from "@/components/goals/goals-header"
import { GoalCarousel } from "@/components/goals/goal-carousel"
import { ConsumptionTabs } from "@/components/goals/consumption-tabs"
import { YourHomeView } from "@/components/goals/your-home-view"
import { DistrictView } from "@/components/goals/district-view"
import { SingaporeView } from "@/components/goals/singapore-view"
import { RenewablePromo } from "@/components/goals/renewable-promo"
import { ShareButton } from "@/components/goals/share-button"

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState<"home" | "district" | "singapore">("home")

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Ambient background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-energy-emerald/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/4 w-80 h-80 bg-energy-teal/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <GoalsHeader />
        
        <div className="px-4 space-y-6 pb-8">
          {/* Green Goal Cards Carousel */}
          <GoalCarousel />

          {/* Consumption Details Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">Consumption Details</h2>
            
            <ConsumptionTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Tab Content */}
            {activeTab === "home" && <YourHomeView />}
            {activeTab === "district" && <DistrictView />}
            {activeTab === "singapore" && <SingaporeView />}
          </div>

          {/* Renewable Energy Promo */}
          <RenewablePromo />

          {/* Thank You Message */}
          <div className="flex flex-col items-center gap-2 py-4">
            <div className="text-3xl">🌱</div>
            <p className="text-center text-foreground font-semibold text-lg">
              Thank You Everyone<br />For Your Green Effort!
            </p>
          </div>

          {/* Share Button */}
          <ShareButton />
        </div>
      </div>

    </div>
  )
}
