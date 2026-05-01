'use client';

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

const tiers = [
  {
    name: 'Essential',
    price: 19,
    description: 'Perfect for a single parent who needs a trusted companion in their inbox.',
    highlight: false,
    features: [
      '1 user (1 personal email address)',
      'Scam & fraud detection',
      'General Q&A, sports, news & recipes',
      'Standard response time',
      'Cancel anytime',
    ],
    cta: 'Join Waitlist',
  },
  {
    name: 'Family',
    price: 49,
    description: 'Ideal for couples or two parents who both deserve peace of mind.',
    highlight: true,
    badge: 'Most Popular',
    features: [
      'Up to 2 users (both parents)',
      'Everything in Essential',
      'Monthly summary emailed to you',
      'Proactive scam alerts to adult child',
      'Priority response time',
      'Cancel anytime',
    ],
    cta: 'Join Waitlist',
  },
  {
    name: 'Guardian',
    price: 99,
    description: 'Full-service care for larger families or those who want the most.',
    highlight: false,
    features: [
      'Up to 5 users',
      'Everything in Family',
      'AI remembers preferences & interests',
      'Weekly check-in email to your senior',
      'Dedicated onboarding support',
      'White-glove customer service',
      'Cancel anytime',
    ],
    cta: 'Join Waitlist',
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white antialiased">

      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            <span className="font-bold text-slate-900 text-lg tracking-tight">Guardian Inbox</span>
          </Link>
          <Link
            href="/#waitlist"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shadow-sm"
          >
            Join Waitlist
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-white px-6 pt-20 pb-12 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            ⚡ Early Access — Coming Soon
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed">
            Gift your parent the protection and companionship they deserve. No contracts, cancel anytime.
          </p>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="bg-slate-50 px-6 py-16">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-6 items-stretch">
          {tiers.map(({ name, price, description, highlight, badge, features, cta }) => (
            <div
              key={name}
              className={`relative rounded-3xl p-8 flex flex-col border ${
                highlight
                  ? 'bg-blue-600 border-blue-600 shadow-2xl shadow-blue-600/20'
                  : 'bg-white border-slate-100 shadow-sm'
              }`}
            >
              {badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-amber-400 text-slate-900 text-xs font-bold px-4 py-1 rounded-full shadow-sm">
                    {badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className={`text-lg font-bold mb-1 ${highlight ? 'text-white' : 'text-slate-900'}`}>
                  {name}
                </h2>
                <p className={`text-sm leading-relaxed ${highlight ? 'text-blue-200' : 'text-slate-500'}`}>
                  {description}
                </p>
              </div>

              <div className="mb-8">
                <div className="flex items-end gap-1">
                  <span className={`text-5xl font-extrabold ${highlight ? 'text-white' : 'text-slate-900'}`}>
                    ${price}
                  </span>
                  <span className={`text-sm mb-2 ${highlight ? 'text-blue-200' : 'text-slate-400'}`}>
                    /month
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckIcon className={`w-4 h-4 shrink-0 mt-0.5 ${highlight ? 'text-blue-200' : 'text-green-500'}`} />
                    <span className={`text-sm ${highlight ? 'text-blue-100' : 'text-slate-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/#waitlist"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-colors ${
                  highlight
                    ? 'bg-white text-blue-600 hover:bg-blue-50'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <p className="text-center text-slate-400 text-sm mt-10">
          All plans include a 7-day free trial. No credit card required to join the waitlist.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
            Common questions
          </h2>
          <div className="space-y-8">
            {[
              {
                q: 'Does my parent need to set anything up?',
                a: 'No. Once you sign up, we send your parent a welcome email with their new Guardian Inbox address. They just start emailing it — no accounts, no passwords, no apps.',
              },
              {
                q: 'What counts as a "user"?',
                a: 'Each user gets their own personal Guardian Inbox email address. A household with two parents who both want access would need at least the Family plan.',
              },
              {
                q: 'What are proactive scam alerts?',
                a: 'On the Family and Guardian plans, if your parent forwards us an email that looks like an active scam attempt, we immediately notify you by email so you can follow up with them directly.',
              },
              {
                q: 'Can I cancel anytime?',
                a: 'Yes, absolutely. No contracts, no cancellation fees. Cancel from your account dashboard at any time.',
              },
              {
                q: 'What is the weekly check-in email?',
                a: 'On the Guardian plan, we send your parent a friendly weekly email with a few news stories, sports highlights, or topics we know they enjoy — keeping them informed and engaged without any effort on their part.',
              },
            ].map(({ q, a }) => (
              <div key={q} className="border-b border-slate-100 pb-8">
                <h3 className="text-base font-semibold text-slate-900 mb-2">{q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-slate-50 px-6 py-20 text-center">
        <div className="max-w-xl mx-auto">
          <ShieldCheckIcon className="w-10 h-10 text-blue-600 mx-auto mb-4" />
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3">
            Ready to protect someone you love?
          </h2>
          <p className="text-slate-500 text-lg mb-8">
            Join the waitlist today and get early access pricing when we launch.
          </p>
          <Link
            href="/#waitlist"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-600/20"
          >
            Join the Early Access Waitlist →
          </Link>
          <p className="text-slate-400 text-sm mt-4">No credit card required. No spam, ever.</p>
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
