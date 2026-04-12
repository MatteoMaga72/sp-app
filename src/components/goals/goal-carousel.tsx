"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Zap, Droplets, Flame, Info } from "lucide-react"

const goals = [
  {
    id: 1,
    icon: Zap,
    title: "GREEN GOAL 1",
    description: "Use 15% less electricity.",
    status: "ON TRACK" as const,
    progress: 75,
  },
  {
    id: 2,
    icon: Droplets,
    title: "GREEN GOAL 2", 
    description: "Reduce water usage by 10%.",
    status: "ACHIEVED" as const,
    progress: 100,
  },
  {
    id: 3,
    icon: Flame,
    title: "GREEN GOAL 3",
    description: "Lower gas consumption by 20%.",
    status: "NEEDS ATTENTION" as const,
    progress: 35,
  },
]

export function GoalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? goals.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === goals.length - 1 ? 0 : prev + 1))
  }

  const currentGoal = goals[currentIndex]

  return (
    <div className="relative pt-4">
      <div className="flex items-center gap-2">
        <button 
          onClick={goToPrevious}
          className="w-10 h-10 rounded-full glass-bg flex items-center justify-center hover:bg-muted/50 transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="flex-1 glass-bg rounded-2xl p-5 border border-border/50 relative overflow-hidden">
          {/* Status-based gradient accent */}
          <div className={`absolute top-0 left-0 right-0 h-1 ${
            currentGoal.status === "ACHIEVED" 
              ? "bg-gradient-to-r from-energy-emerald to-energy-teal"
              : currentGoal.status === "ON TRACK"
              ? "bg-gradient-to-r from-energy-teal to-energy-emerald"
              : "bg-gradient-to-r from-amber-500 to-orange-500"
          }`} />

          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              currentGoal.status === "ACHIEVED" 
                ? "bg-energy-emerald/20 text-energy-emerald"
                : currentGoal.status === "ON TRACK"
                ? "bg-energy-teal/20 text-energy-teal"
                : "bg-amber-500/20 text-amber-500"
            }`}>
              <currentGoal.icon className="w-6 h-6" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`font-bold text-sm ${
                  currentGoal.status === "ACHIEVED" 
                    ? "text-energy-emerald"
                    : currentGoal.status === "ON TRACK"
                    ? "text-energy-teal"
                    : "text-amber-500"
                }`}>
                  {currentGoal.title}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  currentGoal.status === "ACHIEVED"
                    ? "bg-energy-emerald/20 text-energy-emerald"
                    : currentGoal.status === "ON TRACK"
                    ? "bg-foreground text-background"
                    : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
                }`}>
                  {currentGoal.status}
                </span>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <Info className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-foreground mt-1">{currentGoal.description}</p>
              
              <button className="text-energy-emerald text-sm font-medium mt-2 hover:underline">
                View Details
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                currentGoal.status === "ACHIEVED" 
                  ? "bg-gradient-to-r from-energy-emerald to-energy-teal"
                  : currentGoal.status === "ON TRACK"
                  ? "bg-gradient-to-r from-energy-teal to-energy-emerald"
                  : "bg-gradient-to-r from-amber-500 to-orange-500"
              }`}
              style={{ width: `${currentGoal.progress}%` }}
            />
          </div>
        </div>

        <button 
          onClick={goToNext}
          className="w-10 h-10 rounded-full glass-bg flex items-center justify-center hover:bg-muted/50 transition-colors shrink-0"
        >
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {goals.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-energy-emerald w-6" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
