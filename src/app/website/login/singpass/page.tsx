"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Smartphone, CheckCircle2, Loader2 } from "lucide-react";

type Step = "scan" | "authorizing" | "consent" | "success";

export default function SingpassMockPage() {
  const [step, setStep] = useState<Step>("scan");
  const router = useRouter();

  const handleScan = () => {
    setStep("authorizing");
    setTimeout(() => setStep("consent"), 2000);
  };

  const handleConsent = () => {
    setStep("success");
    setTimeout(() => router.push("/website/portal"), 1500);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] flex items-center justify-center" style={{ maxWidth: "100%" }}>
      <div className="w-full max-w-md mx-4">
        {/* Singpass Header */}
        <div className="bg-[#CF0023] rounded-t-2xl px-6 py-4 flex items-center gap-3">
          <Shield className="w-8 h-8 text-white" />
          <div>
            <p className="text-white font-bold text-lg tracking-wide">Singpass</p>
            <p className="text-white/80 text-xs">Your trusted digital identity</p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-b-2xl shadow-xl p-6">
          {step === "scan" && (
            <div className="text-center space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Log in with Singpass</h2>
              <p className="text-sm text-gray-600">SP Group wants to verify your identity</p>

              {/* QR Code Placeholder */}
              <div className="mx-auto w-48 h-48 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center">
                <div className="text-center">
                  <Smartphone className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-xs text-gray-500">Scan with Singpass app</p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleScan}
                  className="w-full py-3 rounded-xl bg-[#CF0023] text-white font-semibold hover:bg-[#B0001E] transition-colors"
                >
                  Simulate Singpass Scan
                </button>
                <p className="text-xs text-gray-400">
                  This is a simulated Singpass flow for demonstration purposes.
                </p>
              </div>
            </div>
          )}

          {step === "authorizing" && (
            <div className="text-center space-y-6 py-8">
              <Loader2 className="w-12 h-12 text-[#CF0023] mx-auto animate-spin" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Verifying Identity</h2>
                <p className="text-sm text-gray-600 mt-2">Connecting to MyInfo...</p>
              </div>
            </div>
          )}

          {step === "consent" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 text-center">Consent Required</h2>
              <p className="text-sm text-gray-600 text-center">
                SP Group is requesting access to your MyInfo data:
              </p>

              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                {["Full Name", "NRIC (masked)", "Email Address", "Mobile Number", "Residential Address"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#CF0023]" />
                    <span className="text-sm text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200">
                <p className="text-xs text-amber-800">
                  Your data will be used solely for SP Group utility account management in compliance with PDPA.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setStep("scan")}
                  className="py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50"
                >
                  Decline
                </button>
                <button
                  onClick={handleConsent}
                  className="py-3 rounded-xl bg-[#CF0023] text-white font-semibold hover:bg-[#B0001E] transition-colors"
                >
                  Allow
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center space-y-6 py-8">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Identity Verified</h2>
                <p className="text-sm text-gray-600 mt-2">Welcome, Maga Matteo Luca</p>
                <p className="text-xs text-gray-400 mt-1">Redirecting to your portal...</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-400">
              Powered by Singpass | Government Technology Agency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
