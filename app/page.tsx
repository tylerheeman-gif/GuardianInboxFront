'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function ShieldCheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.718-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );
}

interface FormProps {
  submitted: boolean;
  loading: boolean;
  error: string;
  email: string;
  setEmail: (v: string) => void;
  name: string;
  setName: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function WaitlistForm({ submitted, loading, error, email, setEmail, name, setName, onSubmit }: FormProps) {
  if (submitted) {
    return (
      <div className="rounded-2xl p-6 text-center bg-green-50 border border-green-100">
        <CheckIcon className="w-8 h-8 text-green-500 mx-auto mb-2" />
        <p className="font-semibold text-green-800 text-lg">You&apos;re on the list!</p>
        <p className="text-green-600 text-sm mt-1">We&apos;ll reach out the moment early access opens.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-slate-400"
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-800 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-base disabled:opacity-60 shadow-lg shadow-blue-600/20"
      >
        {loading ? 'Joining...' : 'Join the Early Access Waitlist →'}
      </button>
      {error && <p className="text-red-500 text-sm text-center">{error}</p>}
    </form>
  );
}

const features = [
  {
    icon: '🛡️',
    title: 'Scam & Fraud Detection',
    desc: "Forward any suspicious email and get an immediate verdict. No jargon — just: \"This is a scam. Here's exactly what to do.\"",
    highlight: true,
  },
  {
    icon: '📰',
    title: 'News & Current Events',
    desc: 'Ask about any headline or story. Get a clear, balanced summary without ever opening a browser.',
  },
  {
    icon: '🏈',
    title: 'Sports Scores & Lineups',
    desc: '"Did the Cubs win last night?" "Who\'s pitching Sunday?" Answered in seconds.',
  },
  {
    icon: '💊',
    title: 'Health Questions',
    desc: "Get clear information to bring to a doctor's appointment. Always a guide — never a replacement for professional care.",
  },
  {
    icon: '🍽️',
    title: 'Recipes & Cooking',
    desc: 'Ask for any recipe, get full step-by-step instructions. No websites, no ads, no videos to scroll through.',
  },
  {
    icon: '❓',
    title: 'Ask Anything',
    desc: 'Crossword clues. Trivia. Directions. How to spell something. No question is too small.',
  },
];

const steps = [
  {
    n: '1',
    icon: '💳',
    title: 'You sign up in minutes',
    desc: "Choose a plan online. We handle the rest — your parent doesn't have to lift a finger.",
  },
  {
    n: '2',
    icon: '📬',
    title: 'They get a personal address',
    desc: 'Your parent receives a dedicated Guardian Inbox email address — their direct line to a trusted AI companion.',
  },
  {
    n: '3',
    icon: '✉️',
    title: 'They just send an email',
    desc: 'Forward a suspicious message. Ask about a game. Get a recipe. A clear, warm reply arrives right back in their inbox.',
  },
];

const stats = [
  { stat: '$3.4B', label: 'Lost to elder fraud in the US in 2023', src: 'FBI IC3 2023 Report' },
  { stat: '101K+', label: 'Fraud complaints filed by adults over 60', src: 'FBI IC3 2023 Report' },
  { stat: '$33K', label: 'Average loss per victim over age 60', src: 'FBI IC3 2023 Report' },
];

export default function Home() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      const url = process.env.NEXT_PUBLIC_SHEETS_URL;
      if (url && url !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name: name || '', timestamp: new Date().toISOString() }),
        });
      }
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formProps = { submitted, loading, error, email, setEmail, name, setName, onSubmit: handleSubmit };

  return (
    <main className="min-h-screen bg-white antialiased">

      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-slate-900 text-lg tracking-tight">Guardian Inbox</span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/pricing" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors hidden sm:block">
              Pricing
            </Link>
            <a
              href="#waitlist"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shadow-sm"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white px-6 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ⚡ Early Access — Coming Soon
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
              Your mom got another scam email.
              <span className="text-blue-600 block mt-2">What if she had someone to ask?</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Guardian Inbox gives your parents a trusted AI companion they can reach simply by
              sending an email — no apps, no passwords, no learning curve. Just answers.
            </p>
            <WaitlistForm {...formProps} />
            <p className="text-slate-400 text-sm mt-3">No credit card required. Plans from $20/month at launch.</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              {['Cancel anytime', 'No tech setup for your parent', 'Easy to gift online'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <CheckIcon className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right — photo + floating badge */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80">
              <Image
                src="https://images.unsplash.com/photo-WpiWnDCu82Q?auto=format&fit=crop&w=900&q=80"
                alt="Senior couple happily using a laptop together at home"
                width={900}
                height={650}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
            </div>
            {/* Floating scam badge */}
            <div className="absolute -bottom-5 -left-6 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 max-w-[260px]">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-base">🚨</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Scam Detected</p>
                  <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                    This is a phishing email. Do not click any links or reply.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Scams targeting seniors are at an all-time high
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              The emails look real. The calls sound legitimate. And when your parent is unsure,
              there&apos;s often no one right there to ask.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {stats.map(({ stat, label, src }) => (
              <div key={stat} className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm">
                <div className="text-4xl font-extrabold text-blue-600 mb-2">{stat}</div>
                <div className="text-slate-700 font-medium text-sm leading-snug mb-1">{label}</div>
                <div className="text-slate-400 text-xs">{src}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">How it works</h2>
            <p className="text-slate-500 text-lg">Simple enough for any generation.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-10">
            {steps.map(({ n, icon, title, desc }) => (
              <div key={n}>
                <div className="text-4xl mb-4">{icon}</div>
                <div className="inline-flex items-center justify-center w-7 h-7 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">
                  {n}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              More than just protection
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Guardian Inbox is your parent&apos;s always-available, always-patient companion for
              everything life throws at them.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon, title, desc, highlight }) => (
              <div
                key={title}
                className={`rounded-2xl p-6 border transition-shadow hover:shadow-md ${
                  highlight ? 'bg-blue-50 border-blue-200' : 'bg-white border-slate-100 shadow-sm'
                }`}
              >
                <div className="text-2xl mb-3">{icon}</div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  {highlight && (
                    <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">
                      #1
                    </span>
                  )}
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            A gift they&apos;ll use every single day
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            Designed to be gifted — by adult children who want their parents to feel supported and
            protected without asking them to learn new technology.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { name: 'Essential', price: '$19', desc: '1 user', highlight: false },
              { name: 'Family', price: '$49', desc: 'Up to 2 users', highlight: true },
              { name: 'Guardian', price: '$99', desc: 'Up to 5 users', highlight: false },
            ].map(({ name, price, desc, highlight }) => (
              <div
                key={name}
                className={`rounded-2xl p-6 border ${
                  highlight
                    ? 'bg-blue-600 border-blue-600'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {highlight && (
                  <div className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">Most Popular</div>
                )}
                <div className={`text-base font-semibold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{name}</div>
                <div className={`text-4xl font-extrabold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>{price}</div>
                <div className={`text-sm mb-3 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>per month</div>
                <div className={`text-sm ${highlight ? 'text-blue-100' : 'text-slate-500'}`}>{desc}</div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
            {['Cancel anytime', 'No tech setup for your parent', '7-day free trial'].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-slate-500 text-sm">
                <CheckIcon className="w-4 h-4 text-green-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
          <Link href="/pricing" className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            View full plan details →
          </Link>
        </div>
      </section>

      {/* Bottom CTA — split layout with second photo */}
      <section id="waitlist" className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — second photo */}
          <div className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80">
            <Image
              src="https://images.unsplash.com/photo-mYFWPgZqz0E?auto=format&fit=crop&w=900&q=80"
              alt="Elderly couple relaxing at home"
              width={900}
              height={650}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>

          {/* Right — form */}
          <div>
            <ShieldCheckIcon className="w-10 h-10 text-blue-600 mb-5" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              Be among the first families to protect and connect
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Join our early access waitlist. We&apos;ll reach out the moment Guardian Inbox is
              ready — waitlist members get priority access and an exclusive introductory rate.
            </p>
            <WaitlistForm {...formProps} />
            <p className="text-slate-400 text-sm mt-3">No spam, ever. No credit card required.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
            <span className="font-bold text-slate-800">Guardian Inbox</span>
          </div>
          <p className="text-slate-400 text-sm">© 2026 Guardian Inbox. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-slate-700 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-700 transition-colors">Terms of Service</a>
            <a href="mailto:hello@guardianinbox.com" className="hover:text-slate-700 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
