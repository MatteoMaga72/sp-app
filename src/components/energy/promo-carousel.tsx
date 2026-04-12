"use client";

import { useRef } from "react";
import { Car, Leaf, Gift, ChevronRight } from "lucide-react";

const promos = [
  {
    id: "ev-savings",
    icon: Car,
    title: "EV Savings",
    subtitle: "Save up to $180/mo",
    description: "See petrol vs electric comparison",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    iconBg: "bg-violet-400/30",
  },
  {
    id: "greenup",
    icon: Leaf,
    title: "GreenUP Challenge",
    subtitle: "Earn 500 points",
    description: "Reduce usage by 10%",
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    iconBg: "bg-emerald-400/30",
  },
  {
    id: "referral",
    icon: Gift,
    title: "Refer a Friend",
    subtitle: "Get $50 credit",
    description: "Share the savings",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    iconBg: "bg-orange-400/30",
  },
];

export function PromoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-4 -mx-4">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto px-4 pb-2 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {promos.map((promo) => (
          <button key={promo.id} className="group relative flex-shrink-0 w-[200px] snap-start overflow-hidden rounded-2xl text-left">
            <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-black/10" />

            <div className="relative p-4 h-[140px] flex flex-col">
              <div className={`w-10 h-10 rounded-xl ${promo.iconBg} backdrop-blur-sm flex items-center justify-center mb-3`}>
                <promo.icon className="w-5 h-5 text-white" />
              </div>

              <div className="flex-1">
                <p className="text-sm font-bold text-white">{promo.title}</p>
                <p className="text-xs font-semibold text-white/90 mt-0.5">{promo.subtitle}</p>
                <p className="text-[10px] text-white/70 mt-1">{promo.description}</p>
              </div>

              <div className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <ChevronRight className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 pointer-events-none" />
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 mt-2">
        {promos.map((promo, index) => (
          <div
            key={promo.id}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${index === 0 ? "bg-primary" : "bg-muted-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
