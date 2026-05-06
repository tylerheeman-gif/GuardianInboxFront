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
    priceId: 'price_1TTVIyKQPGqaPMc8hJk3lwRm',
    price: '$29',
    desc: '1 parent',
    highlight: false,
  },
  {
    name: 'Family',
    priceId: 'price_1TTVJDKQPGqaPMc8rMzcini8',
    price: '$49',
    desc: 'Up to 2 parents',
    highlight: true,
  },
  {
    name: 'Guardian',
    priceId: 'price_1TTVJ1KQPGqaPMc8i0UjOB4q',
    price: '$99',
    desc: 'Up to 5 family members',
    highlight: false,
  },
];

const features = [
  {
    icon: '🛡️',
    title: 'Scam Detection',
    desc: 'Forward any suspicious email and get an immediate, plain-English verdict. No jargon. Just: "This is a scam. Delete it."',
    highlight: true,
  },
  {
    icon: '📰',
    title: 'News & Current Events',
    desc: 'Ask about any headline. Get a clear, balanced summary without ever opening a browser or fighting through ads.',
  },
  {
    icon: '🏈',
    title: 'Sports Scores',
    desc: '"Did the Cubs win last night?" "Who starts Sunday?" Answered in seconds, every time.',
  },
  {
    icon: '💊',
    title: 'Health Questions',
    desc: 'Clear information to bring to a doctor visit. Always a helpful guide, never a replacement for professional care.',
  },
  {
    icon: '🍽️',
    title: 'Recipes',
    desc: 'Full step-by-step instructions for anything they want to cook. No ads, no videos, no scrolling.',
  },
  {
    icon: '❓',
    title: 'Ask Anything',
    desc: 'Crossword clues. Trivia. How to spell something. No question is too small or too simple.',
  },
];

const steps = [
  {
    n: '1',
    icon: '💳',
    title: 'You sign up in minutes',
    desc: 'Choose a plan. We handle everything else. Your parent does not have to lift a finger.',
  },
  {
    n: '2',
    icon: '📬',
    title: 'They get a personal address',
    desc: 'Your parent receives a dedicated Guardian Inbox email address. That is all they need.',
  },
  {
    n: '3',
    icon: '✉️',
    title: 'They just send an email',
    desc: 'That is it. No tutorial. No password. No app. They write an email exactly like they always have, and a warm reply arrives in minutes.',
  },
];

const stats = [
  { stat: '$3.4B', label: 'Lost to elder fraud in the US in 2023', src: 'FBI IC3 2023 Report' },
  { stat: '101K+', label: 'Fraud complaints filed by adults over 60', src: 'FBI IC3 2023 Report' },
  { stat: '$33K', label: 'Average loss per victim over age 60', src: 'FBI IC3 2023 Report' },
];

const testimonials = [
  {
    quote: "My dad forwarded a scam email last week. Guardian Inbox flagged it in two minutes and told him exactly what to do. I can't explain how much peace of mind that gives me.",
    name: 'Sarah M.',
    role: 'Daughter, Tampa FL',
    initial: 'S',
    color: 'bg-rose-500',
  },
  {
    quote: "My mom emails it every morning about the news, weather, her Phillies. She thinks it's just a really smart pen pal. Best thing I've ever done for her.",
    name: 'James T.',
    role: 'Son, Phoenix AZ',
    initial: 'J',
    color: 'bg-indigo-500',
  },
  {
    quote: "I set it up for both of my parents in about five minutes. They use it constantly now. My mom calls it her 'email helper.' Dad just calls it brilliant.",
    name: 'Carol B.',
    role: 'Daughter, Chicago IL',
    initial: 'C',
    color: 'bg-emerald-500',
  },
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
                {checkoutLoading ? 'Redirecting to checkout...' : 'Continue to checkout →'}
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
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-1 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/GuardianInboxLogo.png" alt="Guardian Inbox" className="h-[84px]" />
          </Link>
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
      <section className="bg-white px-6 pt-8 pb-20 lg:pt-10 lg:pb-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-amber-200">
              ⚠️ Seniors lost $3.4 billion to fraud last year
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
              Be there for your parents,
              <span className="text-blue-600 block mt-2">even when you can&apos;t be.</span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              Guardian Inbox gives your parent a trusted companion they can reach by simply sending an email.
              They get answers, scam protection, and someone who always writes back.
              No apps. No passwords. No learning curve.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href="#pricing"
                className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-600/20"
              >
                Protect your parent today →
              </a>
              <a
                href="#how-it-works"
                className="inline-block text-center bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold px-8 py-4 rounded-xl transition-colors text-base"
              >
                See how it works
              </a>
            </div>
            <p className="text-slate-400 text-sm mb-4">Plans from $29/month. 7-day free trial. Cancel anytime.</p>
            <div className="flex flex-wrap items-center gap-5 mb-5">
              {['No tech setup for your parent', 'No new account for them to create', 'Easy to gift online'].map((item) => (
                <div key={item} className="flex items-center gap-1.5 text-slate-500 text-sm">
                  <CheckIcon className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-400 text-xs uppercase tracking-widest font-semibold mr-1">Works with</span>
              {['Gmail', 'Yahoo', 'AOL', 'Outlook', 'iCloud', 'any inbox'].map((p) => (
                <span key={p} className="text-xs font-medium bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">{p}</span>
              ))}
            </div>
          </div>

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
                    This is a phishing email. Do not click any links or reply. You are safe.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Story section */}
      <section className="bg-slate-900 px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-6">Picture this</p>
          <p className="text-white text-2xl sm:text-3xl font-light leading-relaxed mb-6">
            It&apos;s Tuesday morning. Your mom gets an email:
          </p>
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-8 text-left max-w-lg mx-auto">
            <p className="text-slate-300 text-sm font-mono leading-relaxed">
              <span className="text-slate-500">From:</span> security-alert@amazon-verify-account.net<br />
              <span className="text-slate-500">Subject:</span> Urgent: Your account has been suspended<br /><br />
              <span className="text-red-400">Your Social Security number has been flagged for suspicious activity. You must call 1-800-555-0192 immediately to avoid account closure.</span>
            </p>
          </div>
          <p className="text-slate-300 text-xl sm:text-2xl font-light leading-relaxed mb-4">
            She doesn&apos;t know it&apos;s a scam. She&apos;s home alone. And you&apos;re at work.
          </p>
          {/* Step arrow */}
          <div className="flex flex-col items-center my-8 gap-2">
            <div className="w-px h-8 bg-slate-700" />
            <div className="bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 text-slate-400 text-xs font-semibold uppercase tracking-widest">
              She hits forward
            </div>
            <div className="w-px h-8 bg-slate-700" />
          </div>

          {/* Forward compose window */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-2xl max-w-lg mx-auto mb-6 text-left">
            {/* Email client chrome */}
            <div className="bg-slate-100 px-4 py-2.5 flex items-center gap-2 border-b border-slate-200">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              </div>
              <span className="text-slate-400 text-xs mx-auto">New Message</span>
            </div>
            {/* To field */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <span className="text-slate-400 text-xs font-medium w-10 shrink-0">To</span>
              <div className="bg-blue-50 border border-blue-200 rounded-full px-3 py-0.5 text-blue-700 text-sm font-medium">
                bonni@guardianinbox.com
              </div>
            </div>
            {/* Subject field */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-100">
              <span className="text-slate-400 text-xs font-medium w-10 shrink-0">Subject</span>
              <span className="text-slate-700 text-sm">Fwd: Urgent: Your account has been suspended</span>
            </div>
            {/* Body */}
            <div className="px-4 py-4">
              <p className="text-slate-400 text-xs mb-3 border-b border-slate-100 pb-3">Is this real? Should I be worried?</p>
              <div className="text-slate-400 text-xs font-mono leading-relaxed">
                <p className="mb-1">-------- Forwarded Message --------</p>
                <p><span className="text-slate-500">From:</span> security-alert@amazon-verify-account.net</p>
                <p className="mb-2"><span className="text-slate-500">Subject:</span> Urgent: Your account has been suspended</p>
                <p className="text-slate-400">Your Social Security number has been flagged...</p>
              </div>
            </div>
            {/* Send button */}
            <div className="px-4 pb-4">
              <div className="inline-flex items-center gap-2 bg-blue-600 rounded-lg px-4 py-2">
                <span className="text-white text-sm font-semibold">Send</span>
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Reply arrives arrow */}
          <div className="flex flex-col items-center my-6 gap-2">
            <div className="w-px h-8 bg-slate-700" />
            <div className="bg-blue-600/20 border border-blue-600/40 rounded-full px-4 py-1.5 text-blue-400 text-xs font-semibold uppercase tracking-widest">
              Reply arrives in seconds
            </div>
            <div className="w-px h-8 bg-slate-700" />
          </div>

          {/* Guardian Inbox reply */}
          <div className="bg-blue-900/40 border border-blue-700/50 rounded-2xl p-6 mb-8 text-left max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-blue-700/40">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">GI</div>
              <div>
                <p className="text-blue-100 text-sm font-semibold">Guardian Inbox</p>
                <p className="text-blue-400 text-xs">to bonni@email.com</p>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed">
              <span className="font-semibold">Hi there!</span> This email is a scam. The real Amazon will never ask you to call a phone number or provide your Social Security number. You are completely safe. Just delete this email and do nothing else. Let me know if you have any other questions!<br /><br />
              <span className="text-blue-300">Warmly, Guardian Inbox</span>
            </p>
          </div>
          <p className="text-white text-2xl sm:text-3xl font-semibold leading-relaxed">
            That is what peace of mind looks like.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              The threat is real. And it is getting worse.
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              The emails look legitimate. The callers sound official. And when your parent is unsure,
              there is often no one right there to ask.
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
          <p className="text-center text-slate-400 text-sm mt-8">
            Guardian Inbox costs $29 a month. One scam costs $33,000.
          </p>
        </div>
      </section>

      {/* Email Examples */}
      <section className="bg-gradient-to-b from-white to-slate-50 px-6 py-20 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">See it in action</h2>
            <p className="text-slate-500 text-lg">Your parent sends an email. A warm, clear reply arrives in minutes.</p>
          </div>

          {/* Laptop mockup */}
          <div className="relative shadow-[0_30px_80px_rgba(0,0,0,0.35)]">

            {/* Screen lid */}
            <div className="bg-[#1D1D1F] rounded-t-[16px] px-[14px] pt-[14px] pb-0">

              {/* Camera dot */}
              <div className="flex justify-center mb-[10px]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#3A3A3C]" />
              </div>

              {/* Screen content */}
              <div className="rounded-t-[4px] overflow-hidden" style={{maxHeight: '520px'}}>

                {/* Browser chrome */}
                <div className="bg-[#DEE1E6] px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                    <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                  </div>
                  <div className="flex-1 mx-3 bg-white rounded-md px-3 py-1 text-xs text-slate-400 text-center">mail.google.com</div>
                </div>

                {/* Gmail UI */}
                <div className="flex bg-[#F6F8FC] min-h-[520px]">

                  {/* Sidebar */}
                  <div className="w-52 bg-[#F6F8FC] py-4 shrink-0 hidden sm:block">
                    <button className="mx-3 mb-4 flex items-center gap-3 bg-white rounded-2xl shadow px-4 py-3 text-sm font-medium text-slate-700 w-[calc(100%-24px)]">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4h16v16H4z" fill="none" />
                        <path d="M20 4H4v2h16V4zm0 7H4v2h16v-2zm0 7H4v2h16v-2z" fill="currentColor" />
                      </svg>
                      Compose
                    </button>
                    {[
                      { label: 'Inbox', count: '3', active: true },
                      { label: 'Starred', count: '' },
                      { label: 'Sent', count: '' },
                      { label: 'Drafts', count: '1' },
                    ].map(({ label, count, active }) => (
                      <div key={label} className={`flex items-center justify-between px-4 py-1.5 rounded-r-full mr-3 text-sm cursor-pointer ${active ? 'bg-blue-100 font-bold text-blue-900' : 'text-slate-600 hover:bg-slate-200'}`}>
                        <span>{label}</span>
                        {count && <span className="text-xs font-semibold">{count}</span>}
                      </div>
                    ))}
                  </div>

                  {/* Main panel */}
                  <div className="flex-1 bg-white m-2 rounded-2xl overflow-hidden flex flex-col">

                    {/* Thread header */}
                    <div className="px-6 pt-5 pb-3 border-b border-slate-100">
                      <h3 className="text-xl font-semibold text-slate-800">Rays game</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">Inbox</span>
                        <span className="text-xs text-slate-400">2 messages</span>
                      </div>
                    </div>

                    {/* Email thread */}
                    <div className="overflow-y-auto flex-1 px-6 py-4 space-y-4">

                      {/* Email 1 */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100">
                          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">B</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold text-slate-800">Bonni</span>
                              <span className="text-xs text-slate-400 shrink-0 ml-2">7:42 AM</span>
                            </div>
                            <p className="text-xs text-slate-400 truncate">to hello@guardianinbox.com</p>
                          </div>
                        </div>
                        <div className="px-4 py-4 text-sm text-slate-700">
                          Did the Rays win last night? I fell asleep before it ended.
                        </div>
                      </div>

                      {/* Reply 1 */}
                      <div className="border border-blue-100 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border-b border-blue-100">
                          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">GI</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold text-slate-800">Guardian Inbox</span>
                              <span className="text-xs text-slate-400 shrink-0 ml-2">7:44 AM</span>
                            </div>
                            <p className="text-xs text-slate-400 truncate">to Bonni</p>
                          </div>
                        </div>
                        <div className="px-4 py-4 text-sm text-slate-700 space-y-2 leading-relaxed">
                          <p>Hi Bonni! Good news -- the Rays won last night! They beat the Boston Red Sox 6 to 4.</p>
                          <p>It was a great game. The Rays scored three runs in the seventh inning to pull ahead. Randy Arozarena had a big night with two hits and two runs batted in.</p>
                          <p>They are now 27 wins and 20 losses on the season. Things are looking up! Go Rays!</p>
                          <p className="text-slate-400 pt-1">Warmly, Guardian Inbox</p>
                        </div>
                      </div>

                      {/* Email 2 */}
                      <div className="border border-slate-200 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 border-b border-slate-100">
                          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold shrink-0">B</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold text-slate-800">Bonni</span>
                              <span className="text-xs text-slate-400 shrink-0 ml-2">7:46 AM</span>
                            </div>
                            <p className="text-xs text-slate-400 truncate">to hello@guardianinbox.com</p>
                          </div>
                        </div>
                        <div className="px-4 py-4 text-sm text-slate-700">
                          Oh wonderful! Do you know who is pitching tonight?
                        </div>
                      </div>

                      {/* Reply 2 */}
                      <div className="border border-blue-100 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 border-b border-blue-100">
                          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">GI</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline justify-between">
                              <span className="text-sm font-semibold text-slate-800">Guardian Inbox</span>
                              <span className="text-xs text-slate-400 shrink-0 ml-2">7:47 AM</span>
                            </div>
                            <p className="text-xs text-slate-400 truncate">to Bonni</p>
                          </div>
                        </div>
                        <div className="px-4 py-4 text-sm text-slate-700 space-y-2 leading-relaxed">
                          <p>Hi Bonni! Zach Eflin is scheduled to start on the mound tonight for the Rays. He has been one of their most reliable pitchers this season.</p>
                          <p>First pitch is at 6:40 PM Eastern Time, also against the Red Sox at Tropicana Field in St. Petersburg. Should be a fun one to watch!</p>
                          <p className="text-slate-400 pt-1">Warmly, Guardian Inbox</p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="relative">
              <div className="h-[4px] bg-[#141414] w-full" />
              <div className="bg-gradient-to-b from-[#E0E0E0] to-[#C8C8C8] rounded-b-[10px] h-[52px] flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.2)]">
                <div className="w-[140px] h-[36px] bg-[#D4D4D4] rounded-[6px] border border-[#BBBBBB] shadow-inner" />
              </div>
            </div>

          </div>

          <p className="text-center text-slate-400 text-sm mt-10">
            If they can send an email, they are already set up.
          </p>
        </div>
      </section>

      {/* Zero effort section */}
      <section className="bg-slate-900 px-6 py-24">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-4">The bar is zero</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              They already know<br className="hidden sm:block" /> exactly how to use it.
            </h2>
            <p className="text-slate-400 text-xl max-w-2xl mx-auto leading-relaxed">
              They have been sending emails for years. That is the only skill this takes.
              Guardian Inbox fits perfectly into the life they already live.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-start mb-12">

            {/* Not required */}
            <div className="bg-slate-800 rounded-2xl p-8">
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-6">Not required from your parent</p>
              <div className="space-y-4">
                {[
                  'Download an app',
                  'Create a new account',
                  'Remember a password',
                  'Own a smartphone',
                  'Watch a tutorial',
                  'Call tech support',
                  'Know what AI is',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-red-400" viewBox="0 0 12 12" fill="none">
                        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-slate-400 text-base line-through decoration-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What they need */}
            <div className="flex flex-col gap-5">
              <div className="bg-blue-600 rounded-2xl p-8 text-center">
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest mb-4">All they need</p>
                <p className="text-white text-5xl font-extrabold mb-3">Their inbox.</p>
                <p className="text-blue-200 text-lg">The one they&apos;ve used for years.</p>
              </div>
              <div className="bg-slate-800 rounded-2xl p-6">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-4 text-center">Works with every email provider</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Gmail', 'Yahoo Mail', 'AOL Mail', 'Outlook', 'iCloud Mail', 'Any inbox'].map((provider) => (
                    <div key={provider} className="bg-slate-700 rounded-xl px-3 py-2.5 text-slate-300 text-sm text-center font-medium">
                      {provider}
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          <div className="text-center">
            <p className="text-slate-400 text-xl italic">
              &ldquo;If they can type &lsquo;Did the Rays win?&rsquo; and press send,<br className="hidden sm:block" /> they can use Guardian Inbox.&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white px-6 py-20 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Set up in five minutes</h2>
            <p className="text-slate-500 text-lg">You do the setup. Your parent just sends emails.</p>
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

      {/* Testimonials */}
      <section className="bg-slate-50 px-6 py-20 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Families who finally stopped worrying
            </h2>
            <p className="text-slate-500 text-lg">What it feels like when your parent has Guardian Inbox.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map(({ quote, name, role, initial, color }) => (
              <div key={name} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full ${color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{name}</p>
                    <p className="text-xs text-slate-400">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-20 border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              More than just protection
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Guardian Inbox becomes the first thing your parent reaches for when they have a question,
              a worry, or just something to share.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map(({ icon, title, desc, highlight }) => (
              <div
                key={title}
                className={`rounded-2xl p-6 border transition-shadow hover:shadow-md ${
                  highlight ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'
                }`}
              >
                <div className="text-2xl mb-3">{icon}</div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-base font-semibold text-slate-900">{title}</h3>
                  {highlight && (
                    <span className="text-xs font-semibold bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">
                      Most used
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
      <section id="pricing" className="bg-slate-50 px-6 py-20 border-t border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Simple, honest pricing
          </h2>
          <p className="text-slate-500 text-lg mb-2 max-w-2xl mx-auto leading-relaxed">
            The average senior scam costs $33,000. Guardian Inbox costs $29 a month.
          </p>
          <p className="text-slate-400 text-sm mb-12">7-day free trial included. No contracts. Cancel anytime.</p>
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
                  Start free trial
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-6 flex-wrap mb-4">
            {['7-day free trial', 'No tech setup for your parent', 'Cancel anytime'].map((item) => (
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
      <section className="bg-white px-6 py-20 border-t border-slate-100">
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
              They already know how to use it.
            </h2>
            <p className="text-slate-500 text-lg mb-4 leading-relaxed">
              If your parent can send an email, they are already set up. No downloads. No accounts for them to create. No learning curve.
            </p>
            <p className="text-slate-500 text-lg mb-8 leading-relaxed">
              You set it up once. They have someone to ask for the rest of their lives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {PLANS.map((plan) => (
                <button
                  key={plan.name}
                  onClick={() => openModal(plan)}
                  className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    plan.highlight
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {plan.name}: {plan.price}/mo
                </button>
              ))}
            </div>
            <p className="text-slate-400 text-sm mt-4">7-day free trial. No commitment.</p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-100 px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
          <img src="/GuardianInboxLogo.png" alt="Guardian Inbox" className="h-7" />
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
