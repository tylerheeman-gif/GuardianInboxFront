'use client';

import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

interface Subscriber {
  id: number;
  Email: string;
  plan: string;
  status: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  created_at: string;
}

const PLAN_COLORS: Record<string, string> = {
  essential: 'bg-slate-100 text-slate-700',
  family: 'bg-blue-100 text-blue-700',
  guardian: 'bg-purple-100 text-purple-700',
};

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-slate-100 text-slate-500',
  past_due: 'bg-red-100 text-red-700',
  trialing: 'bg-amber-100 text-amber-700',
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [mrr, setMrr] = useState(0);
  const [loading, setLoading] = useState(false);

  const [universalContext, setUniversalContext] = useState('');
  const [contextSaving, setContextSaving] = useState(false);
  const [contextSaved, setContextSaved] = useState(false);

  useEffect(() => {
    if (session) {
      setLoading(true);
      fetch('/api/admin/subscribers')
        .then((r) => r.json())
        .then((data) => {
          setSubscribers(data.subscribers || []);
          setMrr(data.mrr || 0);
        })
        .finally(() => setLoading(false));

      fetch('/api/admin/settings')
        .then((r) => r.json())
        .then((data) => setUniversalContext(data.universal_context || ''));
    }
  }, [session]);

  async function saveContext() {
    setContextSaving(true);
    setContextSaved(false);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: 'universal_context', value: universalContext }),
    });
    setContextSaving(false);
    setContextSaved(true);
    setTimeout(() => setContextSaved(false), 3000);
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-slate-400 text-sm">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-10 text-center max-w-sm w-full">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-1">Guardian Inbox Admin</h1>
          <p className="text-slate-500 text-sm mb-6">Sign in with your Google account to continue.</p>
          <button
            onClick={() => signIn('google')}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  const active = subscribers.filter((s) => s.status === 'active').length;
  const trialing = subscribers.filter((s) => s.status === 'trialing').length;
  const pastDue = subscribers.filter((s) => s.status === 'past_due').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Nav */}
      <nav className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-bold text-slate-900">Guardian Inbox Admin</h1>
            <p className="text-slate-400 text-xs mt-0.5">{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="text-slate-400 hover:text-slate-700 text-sm transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Subscribers', value: subscribers.length },
            { label: 'Active', value: active, color: 'text-green-600' },
            { label: 'Trialing', value: trialing, color: 'text-amber-600' },
            { label: 'MRR', value: `$${mrr}`, color: 'text-blue-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className={`text-3xl font-extrabold mb-1 ${color || 'text-slate-900'}`}>{value}</div>
              <div className="text-slate-500 text-sm">{label}</div>
            </div>
          ))}
        </div>

        {/* Universal Context */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-slate-900">Universal Claude Prompt</h2>
            {contextSaved && <span className="text-xs text-green-600 font-medium">Saved!</span>}
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Applied to every reply Claude sends, on top of any per-user notes. Edit to tune tone, style, or behavior globally.
          </p>
          <textarea
            value={universalContext}
            onChange={e => setUniversalContext(e.target.value)}
            rows={6}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono"
          />
          <button
            onClick={saveContext}
            disabled={contextSaving}
            className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg text-sm transition-colors disabled:opacity-60"
          >
            {contextSaving ? 'Saving…' : 'Save prompt'}
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900">Subscribers</h2>
            {pastDue > 0 && (
              <span className="text-xs bg-red-100 text-red-700 font-semibold px-2.5 py-1 rounded-full">
                {pastDue} past due
              </span>
            )}
          </div>

          {loading ? (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">Loading subscribers...</div>
          ) : subscribers.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400 text-sm">No subscribers yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    {['Email', 'Plan', 'Status', 'Joined'].map((h) => (
                      <th key={h} className="text-left text-xs font-semibold text-slate-400 uppercase tracking-wide px-6 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {subscribers.map((s) => (
                    <tr key={s.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-slate-800 font-medium">{s.Email}</td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${PLAN_COLORS[s.plan] || 'bg-slate-100 text-slate-600'}`}>
                          {s.plan || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${STATUS_COLORS[s.status] || 'bg-slate-100 text-slate-600'}`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400">
                        {s.created_at ? new Date(s.created_at).toLocaleDateString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
