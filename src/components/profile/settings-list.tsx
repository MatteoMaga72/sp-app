"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import {
  UserPlus,
  Shield,
  CreditCard,
  Gift,
  Bell,
  Moon,
  Sun,
  ChevronRight,
  Leaf,
  HelpCircle,
  FileText,
  LogOut,
} from "lucide-react"

const settingsItems = [
  {
    id: "invite",
    icon: UserPlus,
    label: "Invite a Friend",
    points: 10,
    href: "/profile/invite",
  },
  {
    id: "privacy",
    icon: Shield,
    label: "Privacy and Security",
    href: "/profile/privacy",
  },
  {
    id: "payment",
    icon: CreditCard,
    label: "Payment Methods",
    href: "/profile/payment",
  },
  {
    id: "rewards",
    icon: Gift,
    label: "Rewards",
    href: "/profile/rewards",
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Communication Preferences",
    href: "/profile/notifications",
  },
]

const footerItems = [
  { id: "help", icon: HelpCircle, label: "Help" },
  { id: "terms", icon: FileText, label: "Terms and Conditions" },
  { id: "logout", icon: LogOut, label: "Logout", danger: true },
]

export function SettingsList() {
  const { theme, setTheme } = useTheme()
  const [mounted] = useState(() => typeof window !== "undefined")

  const isDark = mounted && theme === "dark"

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-foreground">Settings</h3>

      <div className="glass-card rounded-2xl divide-y divide-border/50">
        {settingsItems.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
          >
            <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="flex-1 text-left text-sm font-medium text-foreground">
              {item.label}
            </span>
            {item.points && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-energy-emerald/10 text-energy-emerald text-xs font-semibold">
                + {item.points}
                <Leaf className="w-3 h-3" />
              </span>
            )}
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}

        {/* Dark Mode Toggle */}
        <div className="flex items-center gap-3 px-4 py-3.5">
          <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center">
            {isDark ? (
              <Moon className="w-5 h-5 text-muted-foreground" />
            ) : (
              <Sun className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
          <span className="flex-1 text-left text-sm font-medium text-foreground">
            Dark Mode
          </span>
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`relative w-12 h-7 rounded-full transition-colors ${
              isDark ? "bg-energy-emerald" : "bg-muted"
            }`}
          >
            <div
              className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                isDark ? "left-6" : "left-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Footer links */}
      <div className="glass-card rounded-2xl divide-y divide-border/50">
        {footerItems.map((item) => (
          <button
            key={item.id}
            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors first:rounded-t-2xl last:rounded-b-2xl ${
              item.danger ? "text-red-500" : "text-foreground"
            }`}
          >
            <div className={`w-9 h-9 rounded-xl ${item.danger ? "bg-red-500/10" : "bg-muted/50"} flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.danger ? "text-red-500" : "text-muted-foreground"}`} />
            </div>
            <span className="flex-1 text-left text-sm font-medium">
              {item.label}
            </span>
            {!item.danger && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
          </button>
        ))}
      </div>
    </div>
  )
}
