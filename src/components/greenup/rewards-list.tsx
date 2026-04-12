"use client"

import { Gift, Sparkles, Check } from "lucide-react"
import { useState } from "react"

const rewards = [
  {
    id: 1,
    title: "$4 Voucher TW Food",
    subtitle: "Min. spend $20",
    partner: "8DEGREES",
    logo: "8D",
    rarity: "rare",
  },
  {
    id: 2,
    title: "$1 Off Omu Rice Set",
    subtitle: "No min. spend",
    partner: "BBQ EXPRESS",
    logo: "BBQ",
    rarity: "common",
  },
  {
    id: 3,
    title: "$10 Northern Indian",
    subtitle: "Min. spend $50",
    partner: "NALAN",
    logo: "NR",
    rarity: "epic",
  },
  {
    id: 4,
    title: "15% OFF 2 Items",
    subtitle: "Selected items",
    partner: "WHITTARD",
    logo: "W",
    rarity: "uncommon",
  },
  {
    id: 5,
    title: "20% Off Brunch",
    subtitle: "Weekends only",
    partner: "RISE & GRIND",
    logo: "RG",
    rarity: "rare",
  },
  {
    id: 6,
    title: "$2 Health Meal",
    subtitle: "Min. spend $15",
    partner: "VIBEZ",
    logo: "VB",
    rarity: "common",
  },
]

const rarityConfig = {
  common: { color: "from-slate-400 to-slate-500", border: "#475569", shadow: "#1e293b", stars: 1 },
  uncommon: { color: "from-teal-400 to-teal-600", border: "#0f766e", shadow: "#134e4a", stars: 2 },
  rare: { color: "from-cyan-400 to-cyan-600", border: "#0891b2", shadow: "#155e75", stars: 3 },
  epic: { color: "from-emerald-300 to-teal-500", border: "#047857", shadow: "#064e3b", stars: 4 },
}

export function RewardsList() {
  const [claimedCount, setClaimedCount] = useState(0)
  const [claimedIds, setClaimedIds] = useState<number[]>([])
  const [animatingId, setAnimatingId] = useState<number | null>(null)

  const handleClaim = (id: number) => {
    if (claimedCount < 3 && !claimedIds.includes(id)) {
      setAnimatingId(id)
      setTimeout(() => {
        setClaimedIds([...claimedIds, id])
        setClaimedCount(claimedCount + 1)
        setAnimatingId(null)
      }, 500)
    }
  }

  return (
    <div className="space-y-4">
      {/* Loot chest header */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-700 border-4 border-t-emerald-400 border-l-emerald-400 border-r-emerald-800 border-b-emerald-800 shadow-[0_6px_0_#064e3b,0_8px_16px_rgba(0,0,0,0.3)] overflow-hidden">
        <div className="absolute inset-x-3 top-2 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        <Sparkles className="absolute top-3 right-8 w-4 h-4 text-teal-200 animate-pulse" />
        <Sparkles className="absolute bottom-3 right-16 w-3 h-3 text-emerald-200 animate-pulse" style={{ animationDelay: "0.5s" }} />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-teal-300 to-teal-500 border-4 border-teal-700 shadow-[0_4px_0_#0f766e,inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center">
              <Gift className="w-9 h-9 text-teal-800" />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-emerald-200 animate-pulse" />
            </div>
            <div>
              <p className="text-xl font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">LOOT BOX</p>
              <p className="text-sm font-bold text-emerald-200">Claim monthly rewards!</p>
            </div>
          </div>
          <div className="px-3 py-2 bg-black/30 rounded-xl">
            <p className="text-2xl font-black text-white">{claimedCount}<span className="text-teal-300">/3</span></p>
            <p className="text-[10px] font-bold text-emerald-200 text-center">CLAIMED</p>
          </div>
        </div>
      </div>

      {/* Rewards grid */}
      <div className="grid grid-cols-2 gap-3">
        {rewards.map((reward) => {
          const isClaimed = claimedIds.includes(reward.id)
          const canClaim = claimedCount < 3 && !isClaimed
          const isAnimating = animatingId === reward.id
          const rarity = rarityConfig[reward.rarity as keyof typeof rarityConfig]

          return (
            <div
              key={reward.id}
              className={`relative transition-all ${isAnimating ? "animate-bounce-pop" : ""} ${isClaimed ? "opacity-70" : ""}`}
            >
              <div 
                className={`relative p-3 rounded-2xl border-4 overflow-hidden ${
                  isClaimed 
                    ? "bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" 
                    : "bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800"
                }`}
                style={{
                  borderColor: isClaimed 
                    ? "" 
                    : "",
                  boxShadow: isClaimed 
                    ? "0 3px 0 #94a3b8" 
                    : "0 5px 0 #94a3b8, 0 6px 12px rgba(0,0,0,0.15)"
                }}
              >
                {/* Shine */}
                {!isClaimed && (
                  <div className="absolute inset-x-2 top-1 h-2 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent rounded-full" />
                )}

                {/* Claimed badge */}
                {isClaimed && (
                  <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 border-2 border-emerald-800 shadow-[0_2px_0_#064e3b] flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}

                {/* Rarity indicator */}
                {!isClaimed && (
                  <div className="absolute top-2 right-2 flex gap-0.5">
                    {Array.from({ length: rarity.stars }).map((_, i) => (
                      <div key={i} className="w-2.5 h-2.5 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 border border-teal-700" />
                    ))}
                  </div>
                )}

                {/* Partner logo */}
                <div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-b ${rarity.color} flex items-center justify-center mb-2 border-3 relative`}
                  style={{
                    borderColor: rarity.border,
                    boxShadow: `0 3px 0 ${rarity.shadow}, inset 0 2px 0 rgba(255,255,255,0.3)`
                  }}
                >
                  <div className="absolute inset-x-1 top-1 h-1.5 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                  <span className={`text-xs font-black text-white drop-shadow-md ${isClaimed ? "opacity-60" : ""}`}>
                    {reward.logo}
                  </span>
                </div>

                {/* Reward info */}
                <p className={`text-sm font-black leading-tight mb-1 ${
                  isClaimed 
                    ? "text-slate-400 dark:text-slate-500 line-through" 
                    : "text-slate-700 dark:text-white"
                }`}>
                  {reward.title}
                </p>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-400 mb-3">{reward.partner}</p>

                {/* Claim button */}
                <button
                  onClick={() => handleClaim(reward.id)}
                  disabled={!canClaim}
                  className={`relative w-full py-2 rounded-xl text-sm font-black transition-all ${
                    isClaimed
                      ? "bg-slate-300 dark:bg-slate-600 text-slate-400 dark:text-slate-400 cursor-default"
                      : canClaim
                        ? "bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-3 border-emerald-800 shadow-[0_4px_0_#064e3b] active:translate-y-1 active:shadow-[0_2px_0_#064e3b]"
                        : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  }`}
                >
                  {canClaim && (
                    <div className="absolute inset-x-2 top-1 h-1.5 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
                  )}
                  {isClaimed ? "CLAIMED" : canClaim ? "CLAIM" : "LOCKED"}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
