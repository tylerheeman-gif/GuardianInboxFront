'use client';
import { useState } from 'react';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="bg-blue-600 text-white text-sm text-center px-4 py-2.5 flex items-center justify-center gap-3 relative z-50">
      <span>
        Every plan includes a <strong>7-day free trial</strong> — no charge until day 8. Cancel anytime.
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors"
        aria-label="Dismiss"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}
