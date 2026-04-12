"use client"

interface ConsumptionTabsProps {
  activeTab: "home" | "district" | "singapore"
  onTabChange: (tab: "home" | "district" | "singapore") => void
}

const tabs = [
  { id: "home" as const, label: "Your Home" },
  { id: "district" as const, label: "Your District" },
  { id: "singapore" as const, label: "Singapore" },
]

export function ConsumptionTabs({ activeTab, onTabChange }: ConsumptionTabsProps) {
  return (
    <div className="flex gap-2 p-1 glass-bg rounded-xl border border-border/50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === tab.id
              ? "bg-foreground text-background shadow-md"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
