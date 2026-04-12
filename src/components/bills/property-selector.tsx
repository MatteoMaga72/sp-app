"use client"

import { useState } from "react"
import { ChevronDown, Home, Car, Tv } from "lucide-react"

const properties = [
  { id: 1, name: "18 Everton Rd", address: "Singapore 089374" },
  { id: 2, name: "45 Marina Bay", address: "Singapore 018956" },
]

const serviceTypes = [
  { icon: Home, label: "Home", active: true },
  { icon: Car, label: "EV", active: false },
  { icon: Tv, label: "Media", active: false },
]

export function PropertySelector() {
  const [selectedProperty, setSelectedProperty] = useState(properties[0])
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 rounded-2xl bg-glass-bg/50 backdrop-blur-xl border border-glass-border p-4">
      <div className="flex items-center justify-between">
        {/* Property Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 text-foreground font-semibold text-lg hover:text-energy-emerald transition-colors"
          >
            {selectedProperty.name}
            <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 rounded-xl bg-glass-bg backdrop-blur-xl border border-glass-border shadow-xl z-50">
              {properties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => {
                    setSelectedProperty(property)
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-energy-emerald/10 first:rounded-t-xl last:rounded-b-xl transition-colors ${
                    selectedProperty.id === property.id ? "bg-energy-emerald/5" : ""
                  }`}
                >
                  <p className="text-sm font-medium text-foreground">{property.name}</p>
                  <p className="text-xs text-muted-foreground">{property.address}</p>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Service Type Icons */}
        <div className="flex items-center gap-2">
          {serviceTypes.map((service, index) => (
            <button
              key={index}
              className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${
                service.active
                  ? "bg-energy-emerald/20 text-energy-emerald border border-energy-emerald/30"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <service.icon className="w-4.5 h-4.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
