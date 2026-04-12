"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  Fingerprint,
  Shield,
  Zap,
  Leaf,
  BarChart3,
  ArrowRight,
  Smartphone,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ maxWidth: "none" }}>
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950" />

      {/* Ambient orbs */}
      <div
        className="absolute top-20 left-1/4 w-[400px] h-[400px] rounded-full opacity-20 floating-orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,191,165,0.6) 0%, rgba(0,191,165,0) 70%)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-20 right-1/4 w-[350px] h-[350px] rounded-full opacity-15 floating-orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(33,150,243,0.5) 0%, rgba(33,150,243,0) 70%)",
          filter: "blur(80px)",
          animationDelay: "4s",
        }}
      />
      <div
        className="absolute top-1/2 right-10 w-[250px] h-[250px] rounded-full opacity-10 floating-orb pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(255,109,0,0.4) 0%, rgba(255,109,0,0) 70%)",
          filter: "blur(80px)",
          animationDelay: "2s",
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Login form */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {/* SP Group logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sp-teal to-emerald-400 flex items-center justify-center glow-teal">
                <span className="text-white font-bold text-xl">SP</span>
              </div>
              <div>
                <p className="text-white font-bold text-xl">SP Group</p>
                <p className="text-gray-400 text-xs">Customer Portal</p>
              </div>
            </div>

            {/* Login card */}
            <div className="glass-strong rounded-3xl p-8">
              <h1 className="text-2xl font-bold text-white mb-1">
                Welcome Back
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Sign in to manage your utilities account
              </p>

              {/* Email/phone input */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                    Email or Phone Number
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="matteo@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sp-teal focus:ring-1 focus:ring-sp-teal/30 transition-colors"
                  />
                </div>

                {/* Password input */}
                <div>
                  <label className="text-xs font-medium text-gray-400 mb-1.5 block">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full px-4 py-3 pr-12 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-sp-teal focus:ring-1 focus:ring-sp-teal/30 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div className="flex justify-end">
                  <button className="text-sp-teal text-xs font-medium hover:underline">
                    Forgot password?
                  </button>
                </div>

                {/* Sign in button */}
                <Link
                  href="/website/portal"
                  className="w-full block text-center py-3 rounded-xl bg-gradient-to-r from-sp-teal to-emerald-400 text-white font-semibold text-sm hover:opacity-90 transition-opacity spring-button"
                >
                  Sign In
                </Link>

                {/* Divider */}
                <div className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-gray-500 text-xs">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Singpass button */}
                <Link href="/website/login/singpass" className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity spring-button">
                  <Shield size={18} />
                  Login with Singpass
                </Link>

                {/* Biometric login */}
                <button className="w-full py-3 rounded-xl border border-white/10 text-gray-300 font-medium text-sm flex items-center justify-center gap-2 hover:bg-white/5 transition-colors spring-button">
                  <Fingerprint size={18} className="text-sp-teal" />
                  Biometric Login
                </button>
              </div>

              {/* Create account */}
              <p className="text-gray-400 text-xs text-center mt-6">
                Don&apos;t have an account?{" "}
                <button className="text-sp-teal font-medium hover:underline">
                  Create account
                </button>
              </p>
            </div>
          </div>

          {/* Right column: Marketing / app showcase */}
          <div className="hidden lg:flex flex-col items-center gap-8">
            {/* Hero text */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-3">
                Your Utilities,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sp-teal to-emerald-300">
                  Reimagined
                </span>
              </h2>
              <p className="text-gray-400 text-sm max-w-sm mx-auto">
                Monitor consumption, pay bills instantly, and make greener
                choices — all in one place.
              </p>
            </div>

            {/* App preview mock */}
            <div className="relative">
              {/* Phone frame */}
              <div className="w-[260px] h-[520px] rounded-[40px] border-2 border-white/10 bg-gray-900/80 p-3 shadow-2xl">
                <div className="w-full h-full rounded-[32px] bg-gradient-to-b from-gray-800 to-gray-900 overflow-hidden p-4">
                  {/* Mini dashboard mockup */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-sp-teal/20 flex items-center justify-center">
                      <span className="text-sp-teal text-xs font-bold">SP</span>
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold">
                        Hello, Matteo
                      </p>
                      <p className="text-gray-500 text-[10px]">18 Everton Rd</p>
                    </div>
                  </div>

                  {/* Bill card */}
                  <div className="bg-white/5 rounded-2xl p-3 mb-3 border border-white/5">
                    <p className="text-gray-400 text-[10px]">Outstanding Bill</p>
                    <p className="text-white text-xl font-bold mt-1">$154.08</p>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10">
                      <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-sp-teal to-emerald-400" />
                    </div>
                  </div>

                  {/* Chart bars mock */}
                  <div className="bg-white/5 rounded-2xl p-3 mb-3 border border-white/5">
                    <p className="text-gray-400 text-[10px] mb-2">This Week</p>
                    <div className="flex items-end gap-1.5 h-16">
                      {[60, 45, 80, 35, 70, 55, 40].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t bg-gradient-to-t from-sp-teal/60 to-sp-teal"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { icon: Zap, label: "Live Usage" },
                      { icon: Leaf, label: "Green Goals" },
                      { icon: BarChart3, label: "AI Insights" },
                    ].map((feat) => (
                      <div
                        key={feat.label}
                        className="flex items-center gap-1 bg-white/5 rounded-full px-2.5 py-1 border border-white/5"
                      >
                        <feat.icon size={10} className="text-sp-teal" />
                        <span className="text-[9px] text-gray-300">
                          {feat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Glow behind phone */}
              <div className="absolute inset-0 -z-10 blur-3xl opacity-20">
                <div className="w-full h-full bg-gradient-to-b from-sp-teal to-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Feature highlights */}
            <div className="flex gap-6">
              {[
                { icon: Smartphone, label: "Mobile-first" },
                { icon: Shield, label: "Secure" },
                { icon: Zap, label: "Real-time" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 text-gray-400 text-xs"
                >
                  <item.icon size={14} className="text-sp-teal" />
                  {item.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/website/portal"
              className="flex items-center gap-2 text-sp-teal text-sm font-medium hover:underline"
            >
              Explore the portal
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
