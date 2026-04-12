import { Bell } from "lucide-react"

export function ProfileHeader() {
  return (
    <header className="sticky top-0 z-50 px-4 py-3 glass-bg border-b border-border/50">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-foreground">Profile</h1>
        <button className="relative p-2 rounded-full hover:bg-muted/50 transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-energy-emerald rounded-full" />
        </button>
      </div>
    </header>
  )
}
