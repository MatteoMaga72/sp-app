"use client"

import { BillsHeader } from "@/components/bills/bills-header"
import { PayNowBanner } from "@/components/bills/paynow-banner"
import { OutstandingAmount } from "@/components/bills/outstanding-amount"
import { PropertySelector } from "@/components/bills/property-selector"
import { TransactionTimeline } from "@/components/bills/transaction-timeline"

export default function BillsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/30 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-energy-emerald/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[200px] h-[200px] bg-energy-teal/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="px-4 pb-24 pt-2 relative z-10">
        <BillsHeader />
        <PayNowBanner />
        <OutstandingAmount />
        <PropertySelector />
        <TransactionTimeline />
      </div>
    </div>
  )
}
