"use client"

import { Zap, Droplet, Recycle, Leaf, Timer, CheckCircle2, ChevronRight, Flame, Star, Sparkles } from "lucide-react"
import { useState } from "react"

const limitedTimeChallenges = [
  {
    id: "waste-less",
    title: "Say YES to Waste Less",
    description: "Complete daily waste reduction tasks",
    progress: 0,
    total: 21,
    xpReward: 50,
    icon: Recycle,
    endsIn: "5 days",
  },
]

const challenges = [
  {
    id: "link-utilities",
    title: "Link Utilities Account",
    xpReward: 10,
    icon: Zap,
    color: "from-cyan-400 to-cyan-600",
    border: "#0891b2",
    shadow: "#155e75",
    completed: false,
    type: "one-time",
    rarity: "epic",
  },
  {
    id: "fan-savings",
    title: "Fan-tastic Savings!",
    xpReward: 2,
    icon: Leaf,
    color: "from-emerald-400 to-emerald-600",
    border: "#047857",
    shadow: "#064e3b",
    completed: false,
    type: "daily",
    rarity: "common",
  },
  {
    id: "off-peak",
    title: "Off-Peak Power",
    xpReward: 3,
    icon: Timer,
    color: "from-teal-400 to-teal-600",
    border: "#0f766e",
    shadow: "#134e4a",
    completed: false,
    type: "daily",
    rarity: "uncommon",
  },
  {
    id: "water-saver",
    title: "Water Saver",
    xpReward: 2,
    icon: Droplet,
    color: "from-cyan-400 to-cyan-600",
    border: "#0891b2",
    shadow: "#155e75",
    completed: true,
    type: "daily",
    rarity: "common",
  },
  {
    id: "green-commute",
    title: "Green Commute",
    xpReward: 5,
    icon: Leaf,
    color: "from-teal-400 to-teal-600",
    border: "#0f766e",
    shadow: "#134e4a",
    completed: false,
    type: "daily",
    rarity: "rare",
  },
  {
    id: "recycle-hero",
    title: "Recycle Hero",
    xpReward: 3,
    icon: Recycle,
    color: "from-emerald-400 to-emerald-600",
    border: "#047857",
    shadow: "#064e3b",
    completed: false,
    type: "weekly",
    rarity: "uncommon",
  },
]

const rarityConfig = {
  common: { color: "from-slate-400 to-slate-500", border: "#475569", shadow: "#1e293b", label: "COMMON", stars: 1 },
  uncommon: { color: "from-teal-400 to-teal-600", border: "#0f766e", shadow: "#134e4a", label: "UNCOMMON", stars: 2 },
  rare: { color: "from-cyan-400 to-cyan-600", border: "#0891b2", shadow: "#155e75", label: "RARE", stars: 3 },
  epic: { color: "from-emerald-300 to-teal-500", border: "#047857", shadow: "#064e3b", label: "EPIC", stars: 4 },
}

export function ChallengesGrid() {
  const [completedChallenges, setCompletedChallenges] = useState<string[]>(
    challenges.filter(c => c.completed).map(c => c.id)
  )
  const [animatingId, setAnimatingId] = useState<string | null>(null)

  const handleComplete = (id: string) => {
    if (!completedChallenges.includes(id)) {
      setAnimatingId(id)
      setTimeout(() => {
        setCompletedChallenges([...completedChallenges, id])
        setAnimatingId(null)
      }, 600)
    }
  }

  const completedCount = completedChallenges.length
  const totalCount = challenges.length

  return (
    <div className="space-y-4">
      {/* Daily streak */}
      <div className="relative p-4 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-700 border-4 border-t-emerald-400 border-l-emerald-400 border-r-emerald-800 border-b-emerald-800 shadow-[0_6px_0_#064e3b,0_8px_16px_rgba(0,0,0,0.3)]">
        <div className="absolute inset-x-3 top-2 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
        
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-b from-teal-300 to-teal-500 border-3 border-teal-700 shadow-[0_4px_0_#0f766e,inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center">
              <Flame className="w-8 h-8 text-teal-800 animate-wiggle" />
            </div>
            <div>
              <p className="text-base font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">DAILY STREAK</p>
              <p className="text-xs font-bold text-emerald-200">Keep it going!</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-black text-white drop-shadow-[0_3px_0_rgba(0,0,0,0.3)]">0</span>
            <Flame className="w-8 h-8 text-teal-300 fill-teal-300 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Limited time challenge */}
      {limitedTimeChallenges.map((challenge) => (
        <button 
          key={challenge.id}
          className="w-full text-left group"
        >
          <div className="relative p-4 rounded-2xl bg-gradient-to-b from-teal-500 to-teal-700 border-4 border-t-teal-400 border-l-teal-400 border-r-teal-800 border-b-teal-800 shadow-[0_6px_0_#134e4a,0_8px_16px_rgba(0,0,0,0.3)] overflow-hidden">
            <div className="absolute inset-x-3 top-2 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
            <Sparkles className="absolute top-3 right-8 w-4 h-4 text-cyan-300 animate-pulse" />
            <Sparkles className="absolute bottom-4 right-20 w-3 h-3 text-emerald-200 animate-pulse" style={{ animationDelay: "0.5s" }} />
            
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-xl bg-gradient-to-b from-emerald-300 to-emerald-500 border-4 border-emerald-700 shadow-[0_4px_0_#064e3b,inset_0_2px_0_rgba(255,255,255,0.4)] flex items-center justify-center">
                  <challenge.icon className="w-9 h-9 text-emerald-800" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-2 mb-1 px-2 py-0.5 bg-black/30 rounded-full">
                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider animate-pulse">
                      LIMITED EVENT
                    </span>
                    <span className="text-[10px] font-bold text-white">{challenge.endsIn}</span>
                  </div>
                  <p className="text-base font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">{challenge.title}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="flex items-center gap-1 px-2 py-1 bg-black/30 rounded-lg">
                  <Zap className="w-5 h-5 text-emerald-300 fill-emerald-300" />
                  <span className="text-xl font-black text-white">+{challenge.xpReward}</span>
                </div>
                <ChevronRight className="w-6 h-6 text-white/80 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            <div className="relative mt-3 h-5 bg-black/40 rounded-full border-2 border-white/20 overflow-hidden">
              <div 
                className="absolute inset-y-0.5 left-0.5 rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500"
                style={{ width: `${Math.max((challenge.progress / challenge.total) * 100, 2)}%` }}
              >
                <div className="absolute inset-x-1 top-0.5 h-1.5 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-black text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {challenge.progress} / {challenge.total}
                </span>
              </div>
            </div>
          </div>
        </button>
      ))}

      {/* Quest progress header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-lg border-2 border-emerald-800 shadow-[0_2px_0_#064e3b]">
            <span className="text-xs font-black text-white">QUESTS</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-800 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
            <div 
              className="h-full rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 transition-all"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
          <span className="text-sm font-black text-slate-700 dark:text-white">{completedCount}/{totalCount}</span>
        </div>
      </div>

      {/* Challenges grid */}
      <div className="grid grid-cols-2 gap-3">
        {challenges.map((challenge) => {
          const isCompleted = completedChallenges.includes(challenge.id)
          const isAnimating = animatingId === challenge.id
          const rarity = rarityConfig[challenge.rarity as keyof typeof rarityConfig]

          return (
            <button
              key={challenge.id}
              onClick={() => handleComplete(challenge.id)}
              disabled={isCompleted}
              className={`relative text-left transition-all ${
                isAnimating ? "animate-bounce-pop" : ""
              } ${isCompleted ? "opacity-70" : "active:translate-y-1"}`}
            >
              <div 
                className={`relative p-4 rounded-2xl border-4 overflow-hidden ${
                  isCompleted 
                    ? "bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700" 
                    : "bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800"
                }`}
                style={{
                  borderColor: isCompleted 
                    ? "" 
                    : "",
                  boxShadow: isCompleted 
                    ? "0 4px 0 #94a3b8" 
                    : "0 6px 0 #94a3b8, 0 8px 16px rgba(0,0,0,0.15)"
                }}
                // Adding proper border classes
              >
                {/* Shine */}
                {!isCompleted && (
                  <div className="absolute inset-x-2 top-1 h-2 bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent rounded-full" />
                )}

                {/* Completed checkmark */}
                {isCompleted && (
                  <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 border-2 border-emerald-800 shadow-[0_2px_0_#064e3b] flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                )}

                {/* Rarity stars */}
                {!isCompleted && (
                  <div className="absolute top-2 right-2 flex gap-0.5">
                    {Array.from({ length: rarity.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-teal-500 dark:text-teal-400 fill-teal-500 dark:fill-teal-400" />
                    ))}
                  </div>
                )}

                {/* Icon */}
                <div 
                  className={`relative w-14 h-14 rounded-xl bg-gradient-to-b ${challenge.color} flex items-center justify-center mb-3 border-3`}
                  style={{
                    borderColor: challenge.border,
                    boxShadow: `0 4px 0 ${challenge.shadow}, inset 0 2px 0 rgba(255,255,255,0.3)`
                  }}
                >
                  <div className="absolute inset-x-1 top-1 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
                  <challenge.icon className={`w-7 h-7 text-white drop-shadow-md ${isCompleted ? "opacity-60" : ""}`} />
                </div>

                {/* XP reward */}
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-slate-200/80 dark:bg-black/30 rounded-full">
                    <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
                    <span className={`text-lg font-black ${isCompleted ? "text-slate-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                      +{challenge.xpReward}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <p className={`text-sm font-black leading-tight drop-shadow-sm ${
                  isCompleted 
                    ? "text-slate-400 dark:text-slate-500 line-through" 
                    : "text-slate-700 dark:text-white"
                }`}>
                  {challenge.title}
                </p>

                {/* Type badge */}
                <div className="mt-2">
                  <span 
                    className={`inline-block text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-lg border-2`}
                    style={{
                      background: `linear-gradient(180deg, ${challenge.type === "one-time" ? "#2dd4bf, #14b8a6" : challenge.type === "weekly" ? "#22d3ee, #06b6d4" : "#34d399, #10b981"})`,
                      borderColor: challenge.type === "one-time" ? "#0f766e" : challenge.type === "weekly" ? "#0891b2" : "#047857",
                      boxShadow: `0 2px 0 ${challenge.type === "one-time" ? "#134e4a" : challenge.type === "weekly" ? "#155e75" : "#064e3b"}`,
                      color: "white"
                    }}
                  >
                    {challenge.type}
                  </span>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
