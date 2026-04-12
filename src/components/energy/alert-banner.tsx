"use client";

import { Info, X } from "lucide-react";
import { useState } from "react";

export function AlertBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative mx-0 mb-4 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-orange-500/5 pointer-events-none" />

      <div className="relative flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-300">
            Scheduled Maintenance
          </p>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-0.5">
            System upgrade on Apr 15, 9AM-1PM. Services may be briefly unavailable.
          </p>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="flex-shrink-0 p-1.5 rounded-lg hover:bg-amber-500/20 transition-colors"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4 text-amber-600 dark:text-amber-400" />
        </button>
      </div>
    </div>
  );
}
