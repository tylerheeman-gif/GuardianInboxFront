'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function VerifyInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) { setError('Invalid link.'); return; }

    fetch(`https://guardianinboxback-production.up.railway.app/auth/verify?token=${token}`)
      .then(r => r.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('gi_session', data.token);
          router.replace('/account');
        } else {
          setError('This link is invalid or has expired. Please request a new one.');
        }
      })
      .catch(() => setError('Something went wrong. Please try again.'));
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <a href="/account/login" className="text-blue-600 hover:underline text-sm">Request a new sign-in link</a>
      </div>
    );
  }

  return <p className="text-slate-500 text-sm">Signing you in…</p>;
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <Suspense fallback={<p className="text-slate-500 text-sm">Loading…</p>}>
        <VerifyInner />
      </Suspense>
    </main>
  );
}
