'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const API = 'https://guardianinbox-production.up.railway.app';

const PLAN_LABELS: Record<string, string> = {
  essential: 'Essential — $19/mo',
  family: 'Family — $49/mo',
  guardian: 'Guardian — $99/mo',
};

interface User { id: number; email: string; name: string | null; notes: string | null; }
interface Account { email: string; plan: string; status: string; }

export default function AccountPage() {
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [userLimit, setUserLimit] = useState(1);
  const [loading, setLoading] = useState(true);

  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [addError, setAddError] = useState('');
  const [addLoading, setAddLoading] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editEmail, setEditEmail] = useState('');
  const [editName, setEditName] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [editError, setEditError] = useState('');

  function getToken() {
    return localStorage.getItem('gi_session');
  }

  function authHeaders() {
    return { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` };
  }

  async function fetchAccount() {
    const token = getToken();
    if (!token) { router.replace('/account/login'); return; }
    try {
      const res = await fetch(`${API}/api/account`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.status === 401) { router.replace('/account/login'); return; }
      const data = await res.json();
      setAccount(data.account);
      setUsers(data.users);
      setUserLimit(data.userLimit);
    } catch {
      router.replace('/account/login');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchAccount(); }, []);

  async function addUser(e: React.FormEvent) {
    e.preventDefault();
    setAddLoading(true);
    setAddError('');
    try {
      const res = await fetch(`${API}/api/account/users`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ email: newEmail, name: newName, notes: newNotes }),
      });
      const data = await res.json();
      if (!res.ok) { setAddError(data.error); return; }
      setUsers(u => [...u, data.user]);
      setNewEmail('');
      setNewName('');
      setNewNotes('');
    } catch {
      setAddError('Something went wrong.');
    } finally {
      setAddLoading(false);
    }
  }

  async function saveEdit(id: number) {
    setEditError('');
    try {
      const res = await fetch(`${API}/api/account/users/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({ email: editEmail, name: editName, notes: editNotes }),
      });
      const data = await res.json();
      if (!res.ok) { setEditError(data.error); return; }
      setUsers(u => u.map(user => user.id === id ? data.user : user));
      setEditingId(null);
    } catch {
      setEditError('Something went wrong.');
    }
  }

  async function removeUser(id: number) {
    await fetch(`${API}/api/account/users/${id}`, { method: 'DELETE', headers: authHeaders() });
    setUsers(u => u.filter(user => user.id !== id));
  }

  function signOut() {
    localStorage.removeItem('gi_session');
    router.replace('/account/login');
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading your account…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 antialiased">
      <nav className="bg-white border-b border-slate-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600">
              <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.718-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-slate-900">Guardian Inbox</span>
          </Link>
          <button onClick={signOut} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
            Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {/* Plan card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Your plan</p>
          <p className="text-xl font-bold text-slate-900">{PLAN_LABELS[account?.plan || ''] || account?.plan}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className={`inline-block w-2 h-2 rounded-full ${account?.status === 'active' ? 'bg-green-500' : 'bg-amber-400'}`} />
            <span className="text-sm text-slate-500 capitalize">{account?.status}</span>
          </div>
          <p className="text-xs text-slate-400 mt-3">Account: {account?.email}</p>
        </div>

        {/* Users card */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Inbox users</p>
            <p className="text-xs text-slate-400">{users.length} / {userLimit} used</p>
          </div>
          <p className="text-sm text-slate-500 mb-5">
            These are the email addresses that can send to hello@guardianinbox.com and receive replies.
          </p>

          {users.length === 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-5 text-sm text-amber-700">
              No users added yet. Add your parent's email below to get started.
            </div>
          )}

          <div className="space-y-3 mb-6">
            {users.map(user => (
              <div key={user.id} className="border border-slate-100 rounded-xl p-4">
                {editingId === user.id ? (
                  <div className="space-y-2">
                    <input
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      placeholder="Name (optional)"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      value={editEmail}
                      onChange={e => setEditEmail(e.target.value)}
                      placeholder="Email address"
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      value={editNotes}
                      onChange={e => setEditNotes(e.target.value)}
                      placeholder="About this person — interests, health notes, location, favorite sports teams… Claude will use this to personalize replies."
                      rows={3}
                      className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    {editError && <p className="text-red-500 text-xs">{editError}</p>}
                    <div className="flex gap-2">
                      <button onClick={() => saveEdit(user.id)} className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition-colors">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-sm text-slate-400 hover:text-slate-600 px-4 py-1.5">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div>
                      {user.name && <p className="text-sm font-medium text-slate-900">{user.name}</p>}
                      <p className="text-sm text-slate-500">{user.email}</p>
                      {user.notes && <p className="text-xs text-slate-400 mt-1 leading-relaxed">{user.notes}</p>}
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => { setEditingId(user.id); setEditEmail(user.email); setEditName(user.name || ''); setEditNotes(user.notes || ''); setEditError(''); }}
                        className="text-xs text-blue-600 hover:text-blue-700"
                      >
                        Edit
                      </button>
                      <button onClick={() => removeUser(user.id)} className="text-xs text-red-400 hover:text-red-600">Remove</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {users.length < userLimit && (
            <form onSubmit={addUser} className="border-t border-slate-100 pt-5 space-y-3">
              <p className="text-sm font-medium text-slate-700">Add a user</p>
              <input
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="Their name (optional)"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                required
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Their email address"
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                value={newNotes}
                onChange={e => setNewNotes(e.target.value)}
                placeholder="About this person — interests, health notes, location, favorite sports teams… Claude will use this to personalize replies."
                rows={3}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              {addError && <p className="text-red-500 text-xs">{addError}</p>}
              <button
                type="submit"
                disabled={addLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors disabled:opacity-60"
              >
                {addLoading ? 'Adding…' : 'Add user →'}
              </button>
            </form>
          )}

          {users.length >= userLimit && (
            <div className="border-t border-slate-100 pt-5">
              <p className="text-sm text-slate-500 text-center">
                You've reached the limit for your plan.{' '}
                <Link href="/pricing" className="text-blue-600 hover:underline">Upgrade</Link> to add more users.
              </p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
