"use client"

import { User, Mail, Phone, QrCode, ChevronRight, Camera } from "lucide-react"

export function UserCard() {
  return (
    <div className="glass-card rounded-2xl p-5 mt-4">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center">
            <User className="w-10 h-10 text-white" />
          </div>
          <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-card border-2 border-background flex items-center justify-center shadow-lg hover:bg-muted transition-colors">
            <Camera className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
          {/* Verified badge */}
          <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground">LUCA</h2>
          
          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="truncate">matteolmaga@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span>+65 8972 7679</span>
            </div>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
      </div>

      {/* QR Code button */}
      <button className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-energy-emerald/10 to-energy-teal/10 border border-energy-emerald/20 hover:border-energy-emerald/40 transition-colors">
        <QrCode className="w-4 h-4 text-energy-emerald" />
        <span className="text-sm font-medium text-energy-emerald">My QR Code</span>
      </button>
    </div>
  )
}
