import { HelpCircle } from "lucide-react"

export function EVHeader() {
  return (
    <header className="sticky top-0 z-40 glass-bg border-b border-border/50 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="w-12" />
        <h1 className="text-lg font-semibold text-foreground">EV Charging</h1>
        <button className="text-energy-emerald hover:text-energy-teal transition-colors text-sm font-medium flex items-center gap-1">
          <HelpCircle className="w-4 h-4" />
          Help
        </button>
      </div>
    </header>
  )
}
