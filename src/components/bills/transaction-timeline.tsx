"use client"

import { ChevronRight, FileText, CreditCard, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface Transaction {
  id: number
  date: string
  type: "bill" | "payment"
  description: string
  amount: string
  status?: "success" | "pending" | "failed"
  recurring?: boolean
}

const transactions: Transaction[] = [
  {
    id: 1,
    date: "02 Apr",
    type: "bill",
    description: "Apr 2026 PDF Bill",
    amount: "$130.20",
  },
  {
    id: 2,
    date: "19 Mar",
    type: "payment",
    description: "Bill Payment (Recurring)",
    amount: "$154.08",
    status: "success",
    recurring: true,
  },
  {
    id: 3,
    date: "05 Mar",
    type: "bill",
    description: "Mar 2026 PDF Bill",
    amount: "$154.08",
  },
  {
    id: 4,
    date: "24 Feb",
    type: "payment",
    description: "Bill Payment (Recurring)",
    amount: "$177.55",
    status: "success",
    recurring: true,
  },
  {
    id: 5,
    date: "10 Feb",
    type: "bill",
    description: "Feb 2026 PDF Bill",
    amount: "$177.55",
  },
  {
    id: 6,
    date: "28 Jan",
    type: "payment",
    description: "Bill Payment (One-time)",
    amount: "$142.30",
    status: "success",
  },
]

export function TransactionTimeline() {
  return (
    <div className="rounded-2xl bg-glass-bg/50 backdrop-blur-xl border border-glass-border overflow-hidden">
      {/* Year Header */}
      <div className="px-4 py-3 border-b border-border/50">
        <h3 className="text-lg font-bold text-foreground">2026</h3>
      </div>

      {/* Transaction List */}
      <div className="divide-y divide-border/30">
        {transactions.map((transaction, index) => (
          <Link
            key={transaction.id}
            href={transaction.type === "bill" ? `/bills/${transaction.id}` : "#"}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-energy-emerald/5 transition-colors group"
          >
            {/* Date Column */}
            <div className="w-14 text-left">
              <span className="text-sm font-medium text-muted-foreground">
                {transaction.date}
              </span>
            </div>

            {/* Timeline Indicator */}
            <div className="relative flex flex-col items-center">
              <div className={`w-2.5 h-2.5 rounded-full ${
                transaction.type === "payment" 
                  ? "bg-energy-emerald" 
                  : "bg-energy-teal"
              }`} />
              {index < transactions.length - 1 && (
                <div className="absolute top-3 w-px h-10 bg-gradient-to-b from-border to-transparent" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                {transaction.type === "bill" ? (
                  <FileText className="w-4 h-4 text-energy-teal" />
                ) : (
                  <CreditCard className="w-4 h-4 text-energy-emerald" />
                )}
                <span className="text-sm font-medium text-foreground">
                  {transaction.description}
                </span>
              </div>
              {transaction.status === "success" && (
                <div className="flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 text-energy-emerald" />
                  <span className="text-xs font-medium text-energy-emerald uppercase">
                    Success
                  </span>
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${
                transaction.type === "payment" 
                  ? "text-energy-emerald" 
                  : "text-foreground"
              }`}>
                {transaction.type === "payment" ? "-" : ""}{transaction.amount}
              </span>
              <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-energy-emerald transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <button className="w-full py-3 text-center text-sm font-medium text-energy-emerald hover:text-energy-teal hover:bg-energy-emerald/5 transition-colors border-t border-border/30">
        View All Transactions
      </button>
    </div>
  )
}
