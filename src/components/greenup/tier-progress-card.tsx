"use client"

import { ChevronRight, Leaf, Sparkles, Zap } from "lucide-react"
import { useState, useEffect } from "react"

const tiers = [
  { name: "Seed", icon: "seed", xpRequired: 0, color: "from-emerald-400 to-emerald-600", border: "#064e3b", shadow: "#022c22" },
  { name: "Seedling", icon: "seedling", xpRequired: 150, color: "from-teal-400 to-teal-600", border: "#134e4a", shadow: "#042f2e" },
  { name: "Sprout", icon: "sprout", xpRequired: 400, color: "from-cyan-400 to-cyan-600", border: "#155e75", shadow: "#083344" },
  { name: "Bloom", icon: "bloom", xpRequired: 800, color: "from-emerald-300 to-teal-500", border: "#047857", shadow: "#064e3b" },
]

export function TierProgressCard() {
  const [animatedXp, setAnimatedXp] = useState(0)
  const currentXp = 1
  const currentTierIndex = 0
  const currentTier = tiers[currentTierIndex]
  const nextTier = tiers[currentTierIndex + 1]
  const xpForNextTier = nextTier ? nextTier.xpRequired - currentTier.xpRequired : 0
  const xpProgress = currentXp - currentTier.xpRequired
  const progressPercent = xpForNextTier > 0 ? (xpProgress / xpForNextTier) * 100 : 100
  const xpNeeded = nextTier ? nextTier.xpRequired - currentXp : 0

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedXp(progressPercent)
    }, 300)
    return () => clearTimeout(timer)
  }, [progressPercent])

  return (
    <button className="w-full text-left group">
      {/* Main card - Light/Dark responsive Supercell style */}
      <div className="relative p-5 rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-4 border-t-white dark:border-t-slate-500 border-l-slate-200 dark:border-l-slate-500 border-r-slate-300 dark:border-r-slate-900 border-b-slate-300 dark:border-b-slate-900 shadow-[0_8px_0_#cbd5e1,0_12px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_0_#1e293b,0_12px_24px_rgba(0,0,0,0.4)]">
        {/* Inner highlight */}
        <div className="absolute inset-x-4 top-2 h-3 bg-gradient-to-r from-transparent via-white/50 dark:via-white/10 to-transparent rounded-full" />
        
        {/* XP counter top-right */}
        <div className="absolute -top-3 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-b from-emerald-300 to-emerald-500 rounded-full border-3 border-emerald-700 shadow-[0_3px_0_#047857]">
          <Leaf className="w-4 h-4 text-emerald-900 fill-emerald-900" />
          <span className="text-sm font-black text-emerald-900">1 XP</span>
        </div>

        <div className="relative flex items-center gap-4">
          {/* Tier badge */}
          <div className="relative flex-shrink-0">
            <div 
              className={`relative w-24 h-24 rounded-2xl bg-gradient-to-b ${currentTier.color} flex items-center justify-center border-4 animate-float`}
              style={{ 
                borderColor: `${currentTier.border}`,
                boxShadow: `0 6px 0 ${currentTier.shadow}, 0 10px 20px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)`
              }}
            >
              <div className="absolute inset-x-2 top-2 h-4 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
              <TierIcon tier="seed" className="w-14 h-14 drop-shadow-lg" />
              <Sparkles className="absolute -top-2 -right-2 w-5 h-5 text-teal-300 fill-teal-300 animate-pulse" />
              <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-emerald-300 fill-emerald-300 animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>
          </div>

          {/* Level info */}
          <div className="flex-1 min-w-0">
            {/* Level badge */}
            <div className="inline-flex items-center gap-1 px-3 py-1 mb-2 bg-gradient-to-b from-teal-500 to-teal-700 rounded-lg border-2 border-teal-900 shadow-[0_2px_0_#134e4a]">
              <Zap className="w-3 h-3 text-teal-200 fill-teal-200" />
              <span className="text-xs font-black text-white">LEVEL 1</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-800 dark:text-white drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] dark:drop-shadow-[0_2px_0_rgba(0,0,0,0.5)] tracking-tight mb-1">
              {currentTier.name}
            </h3>
            
            <div className="flex items-center gap-1.5 mb-3">
              <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400 drop-shadow-[0_1px_0_rgba(255,255,255,0.5)] dark:drop-shadow-[0_2px_0_rgba(0,0,0,0.5)]">{xpNeeded}</span>
              <span className="text-sm font-bold text-slate-500 dark:text-slate-300">XP to {nextTier?.name}</span>
            </div>

            {/* Chunky XP bar */}
            <div className="relative h-7 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-900 dark:to-slate-950 rounded-full border-4 border-t-slate-100 dark:border-t-slate-700 border-l-slate-100 dark:border-l-slate-700 border-r-slate-400 dark:border-r-slate-950 border-b-slate-400 dark:border-b-slate-950 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.5)] overflow-hidden">
              <div 
                className="absolute inset-y-1 left-1 rounded-full bg-gradient-to-b from-emerald-400 via-emerald-500 to-emerald-600 transition-all duration-1000 ease-out"
                style={{ 
                  width: `calc(${animatedXp}% - 8px)`,
                  minWidth: animatedXp > 0 ? "20px" : "0",
                  boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4), 0 0 12px rgba(52,211,153,0.6)"
                }}
              >
                <div className="absolute inset-x-2 top-1 h-2 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-slate-700 dark:text-white drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {currentXp} / {nextTier?.xpRequired} XP
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Ends: 30 Jun 2026</span>
            </div>
          </div>

          <ChevronRight className="w-8 h-8 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform drop-shadow-lg" />
        </div>

        {/* Tier progression */}
        <div className="relative flex items-center justify-center gap-2 mt-5 pt-4 border-t-2 border-slate-200/50 dark:border-slate-600/50">
          {tiers.map((tier, index) => {
            const isActive = index === currentTierIndex
            const isUnlocked = index <= currentTierIndex
            
            return (
              <div 
                key={tier.name}
                className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                  isActive ? "scale-110 z-10" : isUnlocked ? "opacity-90" : "opacity-50"
                }`}
              >
                {index < tiers.length - 1 && (
                  <div className={`absolute top-6 left-full w-4 h-1.5 rounded-full ${
                    isUnlocked ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-slate-300 dark:bg-slate-700"
                  }`} />
                )}
                
                <div 
                  className={`relative w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    isUnlocked 
                      ? `bg-gradient-to-b ${tier.color} border-3 shadow-[0_3px_0_var(--shadow)]` 
                      : "bg-slate-200 dark:bg-slate-700 border-3 border-slate-300 dark:border-slate-800 shadow-[0_3px_0_#94a3b8] dark:shadow-[0_3px_0_#1e293b]"
                  }`}
                  style={{ 
                    borderColor: isUnlocked ? tier.border : undefined,
                    "--shadow": tier.shadow 
                  } as React.CSSProperties}
                >
                  {isUnlocked && <div className="absolute inset-x-1 top-1 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />}
                  <TierIcon tier={tier.icon} className={`w-7 h-7 ${isUnlocked ? "" : "opacity-40 grayscale"}`} />
                  {isActive && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-b from-teal-300 to-teal-500 rounded-full border-2 border-teal-700 animate-pulse shadow-[0_2px_0_#0f766e]" />
                  )}
                </div>
                <span className={`text-[10px] font-black ${isActive ? "text-emerald-600 dark:text-emerald-400" : isUnlocked ? "text-slate-600 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}`}>
                  {tier.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </button>
  )
}

function TierIcon({ tier, className }: { tier: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      {tier === "seed" && (
        <>
          <path d="M6 13h12l-1.5 8H7.5L6 13z" fill="#5eead4" />
          <path d="M5 11h14v2H5v-2z" fill="#2dd4bf" />
          <path d="M5 11h14v1H5v-1z" fill="#99f6e4" />
          <ellipse cx="12" cy="12" rx="5" ry="2" fill="#475569" />
          <ellipse cx="12" cy="11.5" rx="4" ry="1.5" fill="#64748b" />
          <ellipse cx="12" cy="11" rx="2" ry="1" fill="#10b981" />
        </>
      )}
      {tier === "seedling" && (
        <>
          <path d="M6 14h12l-1.5 7H7.5L6 14z" fill="#5eead4" />
          <path d="M5 12h14v2H5v-2z" fill="#2dd4bf" />
          <path d="M12 12V6" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 8c-2.5-2.5-5-1-4 1.5s3 1.5 4-0.5z" fill="#34d399" />
          <path d="M12 6c2.5-2.5 5-1 4 1.5s-3 1.5-4-0.5z" fill="#6ee7b7" />
        </>
      )}
      {tier === "sprout" && (
        <>
          <path d="M6 15h12l-1.5 6H7.5L6 15z" fill="#5eead4" />
          <path d="M5 13h14v2H5v-2z" fill="#2dd4bf" />
          <path d="M12 13V4" stroke="#14b8a6" strokeWidth="3" strokeLinecap="round" />
          <path d="M12 9c-3-2-6 0-5 2.5s4 1.5 5-1z" fill="#2dd4bf" />
          <path d="M12 6c3-2 6 0 5 2.5s-4 1.5-5-1z" fill="#5eead4" />
          <path d="M12 4c-2-1.5-4 0-3.5 1.5s2.5 1 3.5-0.5z" fill="#99f6e4" />
        </>
      )}
      {tier === "bloom" && (
        <>
          <path d="M7 17h10l-1 4H8l-1-4z" fill="#5eead4" />
          <path d="M6 15h12v2H6v-2z" fill="#2dd4bf" />
          <path d="M12 15V8" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
          <circle cx="12" cy="5" r="3.5" fill="#2dd4bf" />
          <circle cx="8.5" cy="6.5" r="2.5" fill="#5eead4" />
          <circle cx="15.5" cy="6.5" r="2.5" fill="#5eead4" />
          <circle cx="12" cy="5" r="2" fill="#99f6e4" />
          <path d="M12 11c-3-1.5-5 1-4 2.5s3 0.5 4-1z" fill="#34d399" />
          <path d="M12 11c3-1.5 5 1 4 2.5s-3 0.5-4-1z" fill="#6ee7b7" />
        </>
      )}
    </svg>
  )
}
