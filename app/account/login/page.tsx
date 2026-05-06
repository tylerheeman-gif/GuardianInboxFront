'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function AccountLoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendLink() {
    setLoading(true);
    setError('');
    try {
      await fetch('https://guardianinboxback-production.up.railway.app/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendLink();
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <img src="/GuardianInboxLogo.png" alt="Guardian Inbox" className="h-10 mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Sign in to your account</h1>
          <p className="text-slate-500 text-sm">We'll email you a link to sign in. No password needed.</p>
        </div>

        {sent ? (
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="font-semibold text-slate-900 mb-1">Check your email</p>
            <p className="text-slate-500 text-sm mb-5">If <strong>{email}</strong> has a Guardian Inbox account, we sent a sign-in link. It expires in 24 hours.</p>
            <button
              onClick={sendLink}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm disabled:opacity-60 mb-2"
            >
              {loading ? 'Sending…' : 'Resend link'}
            </button>
            <button
              onClick={() => { setSent(false); setEmail(''); }}
              className="w-full text-slate-400 hover:text-slate-600 text-sm transition-colors"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
            >
              {loading ? 'Sending…' : 'Send sign-in link →'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
