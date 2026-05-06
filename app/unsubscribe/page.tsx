'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

const API = 'https://guardianinboxback-production.up.railway.app';

function UnsubscribeInner() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const encoded = searchParams.get('e');
    if (!encoded) { setStatus('error'); return; }

    let decoded: string;
    try {
      decoded = atob(encoded);
    } catch {
      setStatus('error');
      return;
    }

    setEmail(decoded);

    fetch(`${API}/unsubscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: decoded }),
    })
      .then(r => r.json())
      .then(data => setStatus(data.success ? 'success' : 'error'))
      .catch(() => setStatus('error'));
  }, [searchParams]);

  return (
    <div className="text-center max-w-md w-full">
      {status === 'loading' && (
        <p className="text-slate-400 text-sm">Processing your request...</p>
      )}
      {status === 'success' && (
        <>
          <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">You've been unsubscribed</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            {email} will no longer receive emails from Guardian Inbox.
          </p>
          <p className="text-slate-400 text-xs">
            Changed your mind? Ask your family member to re-add you through their account.
          </p>
        </>
      )}
      {status === 'error' && (
        <>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Something went wrong</h1>
          <p className="text-slate-500 text-sm mb-6">
            We couldn't process your request. Please try again or{' '}
            <Link href="/contact" className="text-blue-600 hover:underline">contact us</Link>.
          </p>
        </>
      )}
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <Suspense fallback={<p className="text-slate-400 text-sm">Loading...</p>}>
        <UnsubscribeInner />
      </Suspense>
    </main>
  );
}
