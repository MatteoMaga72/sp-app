"use client"

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react"
import { Sparkles, Send, User } from "lucide-react"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
}

const quickChips = [
  "Why is water higher?",
  "Compare to neighbours",
  "How to save more?",
]

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "Your electricity dropped 18.8% because cooler weather in March reduced AC usage. Your washing machine ran 3 fewer cycles too.",
  sender: "bot",
}

function getBillResponse(input: string): string {
  const lower = input.toLowerCase()

  if (/why\b/.test(lower) && /bill\b/.test(lower) && /higher|more|increase/.test(lower)) {
    return "Your electricity was 19% higher because of warmer weather in late February, which increased AC usage. Your water also went up slightly due to an extra laundry cycle. The net impact was +$23.47 compared to January."
  }
  if (/water/.test(lower)) {
    return "Your water charges were $32.35 this month. That\u2019s based on tiered pricing: the first 40m\u00B3 at $1.21/m\u00B3 and any excess at $1.52/m\u00B3. Your usage was 7.3m\u00B3, well within the first tier."
  }
  if (/carbon|tax/.test(lower)) {
    return "The carbon tax is currently $28 per tonne of CO2e, adding approximately $1.40 to your monthly bill. This rate is set by the Singapore government and increases annually as part of the Green Plan 2030."
  }
  if (/save|reduce|tips/.test(lower)) {
    return "Based on your usage patterns: (1) Raise AC to 25\u00B0C \u2014 saves ~$8/month. (2) Use fan instead of AC before 2PM \u2014 saves ~$5/month. (3) Switch to LED bulbs if you haven\u2019t \u2014 saves ~$3/month. Total potential: $16/month."
  }
  if (/compare|neighbou?r/.test(lower)) {
    return "Your household used 324 kWh in March. The D2 (Tanjong Pagar) average is 385 kWh. You\u2019re using 16% less than your neighbours \u2014 keep it up!"
  }

  return "I can help you understand any part of your bill. Try asking about specific charges, comparisons with last month, or tips to save money."
}

export function AIExplanation() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const nextId = useRef(1)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = useCallback((text?: string) => {
    const msg = (text ?? inputValue).trim()
    if (!msg) return

    const userMsg: Message = { id: nextId.current++, text: msg, sender: "user" }
    setMessages((prev) => [...prev, userMsg])
    setInputValue("")
    setIsTyping(true)

    const response = getBillResponse(msg)
    const delay = 600 + Math.min(response.length * 2, 600)
    setTimeout(() => {
      const botMsg: Message = { id: nextId.current++, text: response, sender: "bot" }
      setIsTyping(false)
      setMessages((prev) => [...prev, botMsg])
    }, delay)
  }, [inputValue])

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="rounded-2xl bg-glass-bg/50 dark:bg-slate-800/50 backdrop-blur-xl border border-glass-border p-4 space-y-4">
      {/* Messages */}
      <div className="max-h-[300px] overflow-y-auto space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : ""}`}>
            {msg.sender === "bot" && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center shadow-lg shadow-energy-emerald/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm font-medium leading-relaxed ${
                msg.sender === "bot"
                  ? "rounded-tl-sm bg-gradient-to-br from-energy-emerald/10 to-energy-teal/10 dark:from-energy-emerald/20 dark:to-energy-teal/20 border border-energy-emerald/20 text-foreground"
                  : "rounded-tr-sm bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 text-foreground ml-auto"
              }`}
            >
              <p>{msg.text}</p>
            </div>
            {msg.sender === "user" && (
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center">
                <User className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-energy-emerald to-energy-teal flex items-center justify-center shadow-lg shadow-energy-emerald/30">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="p-3 rounded-2xl rounded-tl-sm bg-gradient-to-br from-energy-emerald/10 to-energy-teal/10 dark:from-energy-emerald/20 dark:to-energy-teal/20 border border-energy-emerald/20 flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-energy-emerald/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="inline-block w-2 h-2 rounded-full bg-energy-emerald/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="inline-block w-2 h-2 rounded-full bg-energy-emerald/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Chips */}
      <div className="flex flex-wrap gap-2">
        {quickChips.map((chip) => (
          <button
            key={chip}
            onClick={() => handleSend(chip)}
            className="px-3 py-1.5 rounded-full text-sm font-medium bg-muted/30 dark:bg-muted/20 text-foreground hover:bg-energy-emerald/10 hover:text-energy-emerald border border-transparent hover:border-energy-emerald/30 transition-all"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your bill..."
            className="w-full px-4 py-3 rounded-xl bg-muted/20 dark:bg-slate-700/50 border border-glass-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-energy-emerald/50 focus:border-energy-emerald/50 transition-all"
          />
        </div>
        <button
          onClick={() => handleSend()}
          className="w-12 h-12 rounded-xl bg-gradient-to-r from-energy-emerald to-energy-teal flex items-center justify-center shadow-lg shadow-energy-emerald/30 hover:shadow-energy-emerald/50 transition-shadow"
          disabled={!inputValue.trim()}
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )
}
