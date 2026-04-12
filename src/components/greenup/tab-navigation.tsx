"use client"

import { Gift, Swords, Trophy } from "lucide-react"

interface TabNavigationProps {
  activeTab: "rewards" | "challenges" | "leaderboard"
  onTabChange: (tab: "rewards" | "challenges" | "leaderboard") => void
}

const tabs = [
  { id: "rewards" as const, label: "LOOT", icon: Gift },
  { id: "challenges" as const, label: "QUESTS", icon: Swords },
  { id: "leaderboard" as const, label: "RANKS", icon: Trophy },
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="mt-5">
      <div className="flex gap-2 p-1.5 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-4 border-t-white dark:border-t-slate-500 border-l-white dark:border-l-slate-500 border-r-slate-300 dark:border-r-slate-900 border-b-slate-300 dark:border-b-slate-900 shadow-[0_4px_0_#cbd5e1,inset_0_2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_0_#1e293b,inset_0_2px_4px_rgba(0,0,0,0.3)]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          const Icon = tab.icon
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex-1 flex items-center justify-center gap-2 py-3 px-2 rounded-xl font-black text-sm transition-all ${
                isActive
                  ? "bg-gradient-to-b from-emerald-400 to-emerald-600 text-white border-3 border-emerald-800 shadow-[0_4px_0_#064e3b,inset_0_2px_0_rgba(255,255,255,0.3)] -translate-y-0.5"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 active:translate-y-0.5"
              }`}
            >
              {isActive && (
                <div className="absolute inset-x-2 top-1 h-2 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" />
              )}
              <Icon className={`w-5 h-5 ${isActive ? "text-white drop-shadow-md" : ""}`} />
              <span className="drop-shadow-sm tracking-wide">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
