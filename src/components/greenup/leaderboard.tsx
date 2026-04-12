"use client"

import { Trophy, Crown, Zap, TrendingUp, TrendingDown, Minus, Sparkles, Flame } from "lucide-react"

const leaderboardData = [
  { rank: 1, name: "Sarah L.", xp: 2450, tier: "Bloom", change: "up", avatar: "SL", streak: 15 },
  { rank: 2, name: "James K.", xp: 2180, tier: "Bloom", change: "same", avatar: "JK", streak: 12 },
  { rank: 3, name: "Emily W.", xp: 1920, tier: "Sprout", change: "up", avatar: "EW", streak: 8 },
  { rank: 4, name: "David C.", xp: 1650, tier: "Sprout", change: "down", avatar: "DC", streak: 5 },
  { rank: 5, name: "Lisa M.", xp: 1420, tier: "Sprout", change: "up", avatar: "LM", streak: 10 },
  { rank: 6, name: "Michael T.", xp: 890, tier: "Seedling", change: "same", avatar: "MT", streak: 3 },
  { rank: 7, name: "Anna R.", xp: 720, tier: "Seedling", change: "up", avatar: "AR", streak: 7 },
  { rank: 8, name: "You", xp: 1, tier: "Seed", change: "same", avatar: "ME", isCurrentUser: true, streak: 0 },
]

function getChangeIcon(change: string) {
  if (change === "up") return <TrendingUp className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
  if (change === "down") return <TrendingDown className="w-4 h-4 text-red-500 dark:text-red-400" />
  return <Minus className="w-4 h-4 text-slate-400" />
}

function getTierConfig(tier: string) {
  switch (tier) {
    case "Bloom": return { color: "from-emerald-300 to-teal-500", border: "#047857", shadow: "#064e3b" }
    case "Sprout": return { color: "from-cyan-400 to-cyan-600", border: "#0891b2", shadow: "#155e75" }
    case "Seedling": return { color: "from-teal-400 to-teal-600", border: "#0f766e", shadow: "#134e4a" }
    default: return { color: "from-emerald-400 to-emerald-600", border: "#047857", shadow: "#064e3b" }
  }
}

export function Leaderboard() {
  const currentUser = leaderboardData.find(u => u.isCurrentUser)

  return (
    <div className="space-y-4">
      {/* Champion podium */}
      <div className="relative p-5 pb-2 rounded-3xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-4 border-t-white dark:border-t-slate-500 border-l-slate-200 dark:border-l-slate-500 border-r-slate-300 dark:border-r-slate-900 border-b-slate-300 dark:border-b-slate-900 shadow-[0_8px_0_#cbd5e1,0_12px_24px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_0_#1e293b,0_12px_24px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Header ribbon */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-b-xl border-4 border-t-0 border-emerald-700 shadow-[0_4px_0_#064e3b]">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-emerald-100" />
            <span className="text-sm font-black text-white">TOP PLAYERS</span>
          </div>
        </div>
        
        {/* Decorative sparkles */}
        <Sparkles className="absolute top-12 left-4 w-4 h-4 text-teal-500 dark:text-teal-400 animate-pulse" />
        <Sparkles className="absolute top-16 right-6 w-3 h-3 text-emerald-500 dark:text-emerald-300 animate-pulse" style={{ animationDelay: "0.5s" }} />
        
        <div className="relative flex items-end justify-center gap-2 pt-10 pb-4">
          {/* 2nd place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-teal-300 to-teal-500 border-4 border-t-teal-200 border-l-teal-200 border-r-teal-600 border-b-teal-600 shadow-[0_4px_0_#0f766e] flex items-center justify-center text-lg font-black text-teal-900">
                {leaderboardData[1].avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-b from-teal-300 to-teal-500 border-3 border-teal-700 shadow-[0_2px_0_#0f766e] flex items-center justify-center">
                <span className="text-xs font-black text-teal-900">2</span>
              </div>
              {leaderboardData[1].streak > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-lg border-2 border-emerald-700 shadow-[0_2px_0_#064e3b] text-[9px] font-black text-white">
                  <Flame className="w-3 h-3" />
                  {leaderboardData[1].streak}
                </div>
              )}
            </div>
            <p className="text-xs font-black text-slate-700 dark:text-white mt-3">{leaderboardData[1].name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Zap className="w-3 h-3 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-300">{leaderboardData[1].xp.toLocaleString()}</span>
            </div>
            <div className="w-20 h-14 mt-2 rounded-t-xl bg-gradient-to-b from-teal-500 to-teal-600 border-4 border-b-0 border-t-teal-400 border-l-teal-400 border-r-teal-700 flex items-center justify-center">
              <span className="text-2xl font-black text-teal-300">2</span>
            </div>
          </div>

          {/* 1st place */}
          <div className="flex flex-col items-center -mb-2 z-10">
            <Crown className="w-10 h-10 text-emerald-500 dark:text-emerald-400 fill-emerald-500/30 dark:fill-emerald-400/30 mb-1 animate-float drop-shadow-lg" />
            <div className="relative mb-2">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-b from-emerald-300 via-emerald-400 to-emerald-500 border-4 border-t-emerald-200 border-l-emerald-200 border-r-emerald-600 border-b-emerald-600 shadow-[0_6px_0_#047857,0_0_30px_rgba(52,211,153,0.5)] flex items-center justify-center text-xl font-black text-emerald-900 animate-level-up-glow">
                {leaderboardData[0].avatar}
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-gradient-to-b from-emerald-300 to-emerald-500 border-4 border-emerald-700 shadow-[0_3px_0_#064e3b] flex items-center justify-center">
                <span className="text-sm font-black text-emerald-900">1</span>
              </div>
              {leaderboardData[0].streak > 0 && (
                <div className="absolute -top-1 -right-2 flex items-center gap-0.5 px-2 py-1 bg-gradient-to-b from-teal-400 to-teal-600 rounded-lg border-2 border-teal-700 shadow-[0_3px_0_#0f766e] text-[10px] font-black text-white">
                  <Flame className="w-3.5 h-3.5" />
                  {leaderboardData[0].streak}
                </div>
              )}
            </div>
            <p className="text-sm font-black text-slate-700 dark:text-white mt-4">{leaderboardData[0].name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{leaderboardData[0].xp.toLocaleString()}</span>
            </div>
            <div className="w-24 h-20 mt-2 rounded-t-xl bg-gradient-to-b from-emerald-500 to-emerald-600 border-4 border-b-0 border-t-emerald-400 border-l-emerald-400 border-r-emerald-700 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              <Trophy className="w-10 h-10 text-emerald-300" />
            </div>
          </div>

          {/* 3rd place */}
          <div className="flex flex-col items-center">
            <div className="relative mb-2">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-b from-cyan-400 to-cyan-600 border-4 border-t-cyan-300 border-l-cyan-300 border-r-cyan-700 border-b-cyan-700 shadow-[0_4px_0_#0891b2] flex items-center justify-center text-lg font-black text-cyan-900">
                {leaderboardData[2].avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-600 border-3 border-cyan-700 shadow-[0_2px_0_#0891b2] flex items-center justify-center">
                <span className="text-xs font-black text-cyan-900">3</span>
              </div>
              {leaderboardData[2].streak > 0 && (
                <div className="absolute -top-1 -right-1 flex items-center gap-0.5 px-1.5 py-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-lg border-2 border-emerald-700 shadow-[0_2px_0_#064e3b] text-[9px] font-black text-white">
                  <Flame className="w-3 h-3" />
                  {leaderboardData[2].streak}
                </div>
              )}
            </div>
            <p className="text-xs font-black text-slate-700 dark:text-white mt-3">{leaderboardData[2].name}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Zap className="w-3 h-3 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
              <span className="text-xs font-bold text-slate-500 dark:text-slate-300">{leaderboardData[2].xp.toLocaleString()}</span>
            </div>
            <div className="w-20 h-10 mt-2 rounded-t-xl bg-gradient-to-b from-cyan-500 to-cyan-600 border-4 border-b-0 border-t-cyan-400 border-l-cyan-400 border-r-cyan-700 flex items-center justify-center">
              <span className="text-2xl font-black text-cyan-300">3</span>
            </div>
          </div>
        </div>
      </div>

      {/* Your position card */}
      {currentUser && (
        <div className="relative p-4 rounded-2xl bg-gradient-to-b from-emerald-500 to-emerald-700 border-4 border-t-emerald-400 border-l-emerald-400 border-r-emerald-800 border-b-emerald-800 shadow-[0_6px_0_#064e3b,0_8px_16px_rgba(0,0,0,0.3)]">
          <div className="absolute inset-x-3 top-2 h-3 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full" />
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/20 border-3 border-white/30 shadow-[0_3px_0_rgba(0,0,0,0.2)] flex items-center justify-center">
                <span className="text-lg font-black text-white">#{currentUser.rank}</span>
              </div>
              <div 
                className={`w-14 h-14 rounded-xl bg-gradient-to-b ${getTierConfig(currentUser.tier).color} border-4 flex items-center justify-center text-base font-black text-white`}
                style={{
                  borderColor: `${getTierConfig(currentUser.tier).border}`,
                  boxShadow: `0 4px 0 ${getTierConfig(currentUser.tier).shadow}`
                }}
              >
                {currentUser.avatar}
              </div>
              <div>
                <p className="text-lg font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">YOUR RANK</p>
                <p className="text-sm font-bold text-emerald-200">{currentUser.tier} Tier</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 justify-end">
                <Zap className="w-6 h-6 text-teal-300 fill-teal-300" />
                <span className="text-3xl font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">{currentUser.xp}</span>
              </div>
              <p className="text-xs font-bold text-emerald-200">149 XP to level up</p>
            </div>
          </div>
        </div>
      )}

      {/* Rankings list header */}
      <div className="flex items-center justify-between px-1">
        <div className="px-3 py-1.5 bg-gradient-to-b from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700 rounded-xl border-3 border-slate-400 dark:border-slate-800 shadow-[0_3px_0_#94a3b8] dark:shadow-[0_3px_0_#1e293b]">
          <span className="text-xs font-black text-slate-700 dark:text-white">ALL PLAYERS</span>
        </div>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400">This Season</span>
      </div>
      
      {/* Rankings list */}
      <div className="space-y-2">
        {leaderboardData.slice(3).map((user) => {
          const tierConfig = getTierConfig(user.tier)
          
          return (
            <div
              key={user.rank}
              className={`relative flex items-center gap-3 p-3 rounded-xl border-4 ${
                user.isCurrentUser
                  ? "bg-gradient-to-b from-emerald-600 to-emerald-700 border-t-emerald-500 border-l-emerald-500 border-r-emerald-800 border-b-emerald-800 shadow-[0_4px_0_#064e3b]"
                  : "bg-gradient-to-b from-white to-slate-100 dark:from-slate-700 dark:to-slate-800 border-t-white dark:border-t-slate-600 border-l-slate-200 dark:border-l-slate-600 border-r-slate-300 dark:border-r-slate-900 border-b-slate-300 dark:border-b-slate-900 shadow-[0_4px_0_#cbd5e1] dark:shadow-[0_4px_0_#1e293b]"
              }`}
            >
              <div className="absolute inset-x-2 top-1 h-2 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent rounded-full" />
              
              {/* Rank */}
              <div className={`relative w-10 h-10 rounded-lg flex items-center justify-center font-black text-sm ${
                user.isCurrentUser 
                  ? "bg-white/20 text-white" 
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-2 border-slate-200 dark:border-slate-700"
              }`}>
                #{user.rank}
              </div>

              {/* Avatar */}
              <div 
                className={`relative w-12 h-12 rounded-xl bg-gradient-to-b ${tierConfig.color} flex items-center justify-center text-sm font-black text-white border-3`}
                style={{
                  borderColor: tierConfig.border,
                  boxShadow: `0 3px 0 ${tierConfig.shadow}`
                }}
              >
                {user.avatar}
                {user.streak > 0 && (
                  <div className="absolute -top-1 -right-1 flex items-center px-1 py-0.5 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded border border-emerald-700 text-[8px] font-bold text-white">
                    <Flame className="w-2 h-2" />
                    {user.streak}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-black ${user.isCurrentUser ? "text-white" : "text-slate-700 dark:text-white"}`}>
                  {user.name}
                </p>
                <span 
                  className="inline-block text-[9px] font-black uppercase px-1.5 py-0.5 rounded mt-0.5"
                  style={{
                    background: `linear-gradient(180deg, ${tierConfig.color.replace("from-", "").replace(" to-", ", ")})`,
                    color: "white",
                    textShadow: "0 1px 0 rgba(0,0,0,0.3)"
                  }}
                >
                  {user.tier}
                </span>
              </div>

              {/* Change */}
              <div className="w-6 flex justify-center">
                {getChangeIcon(user.change)}
              </div>

              {/* XP */}
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-500 dark:text-emerald-400 fill-emerald-500 dark:fill-emerald-400" />
                <span className={`text-base font-black ${user.isCurrentUser ? "text-white" : "text-slate-700 dark:text-white"}`}>{user.xp.toLocaleString()}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
