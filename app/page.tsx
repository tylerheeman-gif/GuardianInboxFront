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

const PLANS = [
  {
    name: 'Essential',
    priceId: 'price_1TSnSUKmZi8GlCMvlPgmVA4H',
    price: '$29',
    desc: '1 user',
    highlight: false,
  },
  {
    name: 'Family',
    priceId: 'price_1TSNDUKmZi8GlCMvlhJ1XPTN',
    price: '$49',
    desc: 'Up to 2 users',
    highlight: true,
  },
  {
    name: 'Guardian',
    priceId: 'price_1TSNDUKmZi8GlCMvVOPHZIuz',
    price: '$99',
    desc: 'Up to 5 users',
    highlight: false,
  },
];

const features = [
  {
    icon: '🛡️',
    title: 'Scam & Fraud Detection',
    desc: "Forward any suspicious email and get an immediate verdict. No jargon. Just: \"This is a scam. Here's exactly what to do.\"",
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
    desc: "Get clear information to bring to a doctor's appointment. Always a guide, never a replacement for professional care.",
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
    desc: "Choose a plan online. We handle the rest. Your parent doesn't have to lift a finger.",
  },
  {
    n: '2',
    icon: '📬',
    title: 'They get a personal address',
    desc: 'Your parent receives a dedicated Guardian Inbox email address, their direct line to a trusted AI companion.',
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
  const [modal, setModal] = useState<{ priceId: string; planName: string; price: string } | null>(null);
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    if (!modal) return;
    setCheckoutLoading(true);
    setCheckoutError('');
    try {
      const res = await fetch('https://guardianinboxback-production.up.railway.app/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: modal.priceId, email: checkoutEmail }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError('Something went wrong. Please try again.');
      }
    } catch {
      setCheckoutError('Something went wrong. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  }

  function openModal(plan: typeof PLANS[0]) {
    setModal({ priceId: plan.priceId, planName: plan.name, price: plan.price });
    setCheckoutEmail('');
    setCheckoutError('');
  }

  return (
    <main className="min-h-screen bg-white antialiased">

      {/* Checkout modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-slate-900 mb-1">Get started</h2>
            <p className="text-slate-500 text-sm mb-6">
              {modal.price}/month for the {modal.planName} plan. Cancel anytime.
            </p>
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your email address</label>
                <input
                  type="email"
                  required
                  value={checkoutEmail}
                  onChange={e => setCheckoutEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {checkoutError && <p className="text-red-500 text-sm">{checkoutError}</p>}
              <button
                type="submit"
                disabled={checkoutLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm disabled:opacity-60"
              >
                {checkoutLoading ? 'Redirecting to checkout…' : 'Continue to checkout →'}
              </button>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="w-full text-slate-400 hover:text-slate-600 text-sm transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-slate-900 text-lg tracking-tight">Guardian Inbox</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="#pricing" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors hidden sm:block">
              Pricing
            </a>
            <Link href="/account/login" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors hidden sm:block">
              Sign in
            </Link>
            <a
              href="#pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shadow-sm"
            >
              Get Started
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
              🛡️ Protecting families since 2026
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
              Your mom got another scam email.
              <span className="text-blue-600 block mt-2">What if she had someone to ask?</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Guardian Inbox gives your parents a trusted AI companion they can reach simply by
              sending an email. No apps, no passwords, no learning curve. Just answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href="#pricing"
                className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-600/20"
              >
                Get started →
              </a>
              <a
                href="#how-it-works"
                className="inline-block text-center bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-4 rounded-xl transition-colors text-base"
              >
                See how it works
              </a>
            </div>
            <p className="text-slate-400 text-sm mb-4">Plans from $29/month. Cancel anytime.</p>
            <div className="flex flex-wrap items-center gap-5">
              {['Cancel anytime', 'No tech setup for your parent', 'Easy to gift online'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <CheckIcon className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Right: photo + floating badge */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80">
              <Image
                src="https://images.unsplash.com/photo-1758686254525-2c5e9698e478?auto=format&fit=crop&w=900&q=80"
                alt="Senior couple happily using a laptop together at home"
                width={900}
                height={650}
                className="w-full h-auto object-cover"
                priority
                unoptimized
              />
            </div>
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
      <section id="how-it-works" className="bg-white px-6 py-20">
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
      <section id="pricing" className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-500 text-lg mb-12 max-w-xl mx-auto leading-relaxed">
            No contracts. Cancel anytime.
          </p>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border flex flex-col ${
                  plan.highlight
                    ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-600/20'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {plan.highlight && (
                  <div className="text-xs font-bold text-amber-400 mb-2 uppercase tracking-wide">Most Popular</div>
                )}
                <div className={`text-base font-semibold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</div>
                <div className={`text-4xl font-extrabold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</div>
                <div className={`text-sm mb-4 ${plan.highlight ? 'text-blue-200' : 'text-slate-400'}`}>per month</div>
                <div className={`text-sm mb-6 flex-1 ${plan.highlight ? 'text-blue-100' : 'text-slate-500'}`}>{plan.desc}</div>
                <button
                  onClick={() => openModal(plan)}
                  className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-white text-blue-600 hover:bg-blue-50'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Get started
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
            {['Cancel anytime', 'No tech setup for your parent', 'Easy to gift online'].map((item) => (
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

      {/* Bottom CTA */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div className="hidden lg:block rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/80">
            <Image
              src="https://images.unsplash.com/photo-1758686254493-7b3e49a8f325?auto=format&fit=crop&w=900&q=80"
              alt="Elderly couple relaxing at home"
              width={900}
              height={650}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>

          <div>
            <ShieldCheckIcon className="w-10 h-10 text-blue-600 mb-5" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
              Ready to protect someone you love?
            </h2>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              Give your parent a trusted companion in their inbox. No contracts, cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {PLANS.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => openModal(plan)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {plan.name}: {plan.price}
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-4">No spam, ever. Cancel anytime.</p>
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
            <Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-700 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-700 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
