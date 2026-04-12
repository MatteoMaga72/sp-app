"use client"

import { useState } from "react"
import { ChevronRight, QrCode, CreditCard, Smartphone } from "lucide-react"

const bannerSlides = [
  {
    icon: QrCode,
    title: "Pay your bills via PayNow QR",
    subtitle: "Learn more",
    gradient: "from-energy-emerald/20 to-energy-teal/10",
  },
  {
    icon: CreditCard,
    title: "Set up recurring payments",
    subtitle: "Auto-pay your bills",
    gradient: "from-energy-teal/20 to-energy-cyan/10",
  },
  {
    icon: Smartphone,
    title: "Download your e-Bill anytime",
    subtitle: "Go paperless",
    gradient: "from-energy-cyan/20 to-energy-emerald/10",
  },
]

export function PayNowBanner() {
  const [activeSlide, setActiveSlide] = useState(0)

  return (
    <div className="mb-4">
      {/* Banner Card */}
      <div 
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${bannerSlides[activeSlide].gradient} backdrop-blur-xl border border-glass-border p-4`}
      >
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="relative w-16 h-16 rounded-xl bg-gradient-to-br from-energy-emerald/20 to-energy-teal/20 flex items-center justify-center border border-energy-emerald/30">
            {(() => {
              const IconComponent = bannerSlides[activeSlide].icon
              return <IconComponent className="w-8 h-8 text-energy-emerald" />
            })()}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-energy-emerald rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1">
            <p className="text-foreground font-medium text-sm">
              {bannerSlides[activeSlide].title}
            </p>
            <button className="flex items-center gap-1 text-energy-emerald text-sm font-medium mt-1 hover:text-energy-teal transition-colors">
              {bannerSlides[activeSlide].subtitle}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center gap-2 mt-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeSlide 
                ? "bg-energy-emerald w-4" 
                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  )
}
