"use client"

import { ChevronRight, Plus, Leaf } from "lucide-react"

const premises = [
  {
    id: 1,
    address: "18 Everton Rd",
    owner: { initials: "MM", color: "bg-energy-emerald" },
    members: [
      { initials: "JL", color: "bg-blue-400" },
      { initials: "SK", color: "bg-purple-400" },
    ],
    maxMembers: 5,
  },
]

export function PremisesSection() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-foreground">Premises</h3>
        <button className="text-sm font-medium text-energy-emerald hover:text-energy-teal transition-colors">
          See all ({premises.length})
        </button>
      </div>

      {premises.map((premise) => (
        <div key={premise.id} className="glass-card rounded-2xl p-4">
          <button className="w-full flex items-center justify-between mb-4">
            <span className="text-base font-medium text-foreground">{premise.address}</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          <div className="flex items-center gap-6">
            {/* Owner */}
            <div className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Owner</span>
              <div className={`w-10 h-10 rounded-full ${premise.owner.color} flex items-center justify-center`}>
                <span className="text-xs font-bold text-white">{premise.owner.initials}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="w-px h-12 bg-border" />

            {/* Members */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Members</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-energy-emerald/10 text-energy-emerald text-[10px] font-semibold">
                  + 50
                  <Leaf className="w-3 h-3" />
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                {premise.members.map((member, idx) => (
                  <div
                    key={idx}
                    className={`w-10 h-10 rounded-full ${member.color} flex items-center justify-center`}
                  >
                    <span className="text-xs font-bold text-white">{member.initials}</span>
                  </div>
                ))}
                
                {/* Empty slots */}
                {Array.from({ length: premise.maxMembers - premise.members.length - 1 }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="w-10 h-10 rounded-full bg-muted/50 border-2 border-dashed border-muted-foreground/30"
                  />
                ))}

                {/* Add button */}
                <button className="w-10 h-10 rounded-full border-2 border-energy-emerald border-dashed flex items-center justify-center hover:bg-energy-emerald/10 transition-colors">
                  <Plus className="w-5 h-5 text-energy-emerald" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
