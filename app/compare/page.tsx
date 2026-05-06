import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Guardian Inbox vs. ChatGPT | Why Email Wins for Seniors',
  description: 'ChatGPT is powerful. But your parent will never use it. See why Guardian Inbox is the only AI built around how seniors actually live.',
};

function XIcon() {
  return (
    <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="none">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 20 20" fill="none">
      <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const chatgptSteps = [
  { step: 1, text: 'Open a browser and navigate to chatgpt.com' },
  { step: 2, text: 'Create an OpenAI account with a new email and password' },
  { step: 3, text: 'Verify the email address' },
  { step: 4, text: 'Log in and learn the chat interface' },
  { step: 5, text: 'Switch back to their email app to find the suspicious message' },
  { step: 6, text: 'Select all, copy the email text' },
  { step: 7, text: 'Switch back to ChatGPT and paste it in' },
  { step: 8, text: 'Type a question and wait for a response' },
  { step: 9, text: 'Try to understand a response written for a general audience' },
  { step: 10, text: 'Remember to do all of this next time something comes up' },
];

const guardianSteps = [
  { step: 1, text: 'Forward the email to their Guardian Inbox address' },
  { step: 2, text: 'A clear, warm reply arrives in seconds' },
];

const comparisons = [
  {
    feature: 'Setup required from your parent',
    chatgpt: 'New account, password, interface to learn',
    guardian: 'None. Zero. They just use their existing email.',
  },
  {
    feature: 'Works with their existing email',
    chatgpt: false,
    guardian: true,
  },
  {
    feature: 'Catches scams they forget to ask about',
    chatgpt: false,
    guardian: true,
  },
  {
    feature: 'Requires a smartphone or web browser',
    chatgpt: true,
    guardian: false,
  },
  {
    feature: 'Password to remember',
    chatgpt: true,
    guardian: false,
  },
  {
    feature: 'Response written in plain, warm language',
    chatgpt: false,
    guardian: true,
  },
  {
    feature: 'Works with Gmail, Yahoo, AOL, Outlook, iCloud',
    chatgpt: false,
    guardian: true,
  },
  {
    feature: 'Your parent will still be using it in 6 months',
    chatgpt: false,
    guardian: true,
  },
];

export default function ComparePage() {
  return (
    <main className="min-h-screen bg-white antialiased">

      {/* Nav */}
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-1 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/">
            <img src="/GuardianInboxLogo.png" alt="Guardian Inbox" className="h-[84px]" />
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/#pricing" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors hidden sm:block">
              Pricing
            </Link>
            <Link href="/account/login" className="text-slate-500 hover:text-slate-900 text-sm font-medium transition-colors hidden sm:block">
              Sign in
            </Link>
            <Link
              href="/#pricing"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shadow-sm"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-white px-6 pt-16 pb-20 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Guardian Inbox vs. ChatGPT / Claude
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-[1.1] mb-5 tracking-tight">
            Great AI. Wrong delivery.
          </h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            ChatGPT and Claude are incredible tools. But they were built for people who are comfortable with technology.
            Your parent isn&apos;t going to open a browser, create an account, and paste in a suspicious email.
            They are going to call you.
          </p>
        </div>
      </section>

      {/* Scenario walkthrough */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">
              Same task. Very different experience.
            </h2>
            <p className="text-slate-500 text-lg">
              Your mom gets a suspicious email and wants to know if it&apos;s a scam.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            {/* ChatGPT path */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
              <div className="bg-slate-800 px-6 py-4">
                <p className="text-white font-bold text-lg">Using ChatGPT</p>
                <p className="text-slate-400 text-sm mt-0.5">{chatgptSteps.length} steps</p>
              </div>
              <div className="p-6 space-y-4">
                {chatgptSteps.map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0 mt-0.5">
                      {step}
                    </div>
                    <p className={`text-sm leading-relaxed ${step > 4 ? 'text-red-600' : 'text-slate-600'}`}>
                      {text}
                    </p>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-100 mt-4">
                  <p className="text-slate-400 text-xs italic">
                    Realistically: she calls you instead and asks you to handle it.
                  </p>
                </div>
              </div>
            </div>

            {/* Guardian Inbox path */}
            <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <p className="text-white font-bold text-lg">Using Guardian Inbox</p>
                <p className="text-blue-200 text-sm mt-0.5">{guardianSteps.length} steps</p>
              </div>
              <div className="p-6 space-y-4">
                {guardianSteps.map(({ step, text }) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold shrink-0 mt-0.5">
                      {step}
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">{text}</p>
                  </div>
                ))}

                {/* Spacer to show the contrast */}
                <div className="py-8 text-center">
                  <p className="text-6xl font-extrabold text-blue-600 mb-2">Done.</p>
                  <p className="text-slate-400 text-sm">No follow-up call from your parent required.</p>
                </div>

                <div className="pt-2 border-t border-blue-100">
                  <p className="text-slate-400 text-xs italic">
                    She already knows how to forward an email. That&apos;s the only skill this takes.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* The hidden problem with chatgpt */}
      <section className="bg-slate-900 px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            The scam your parent never thinks to check
          </h2>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            ChatGPT only helps when your parent thinks to use it. But the most dangerous scam emails are the ones that look real enough that she doesn&apos;t realize she should be suspicious.
          </p>
          <p className="text-slate-300 text-xl leading-relaxed mb-8">
            With Guardian Inbox, the barrier is one forward. And when something feels even slightly off, she already has someone to ask. The habit is built in.
          </p>
          <div className="bg-slate-800 rounded-2xl p-6 text-left max-w-xl mx-auto">
            <p className="text-slate-400 text-sm font-semibold uppercase tracking-widest mb-4">The difference</p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🤔</span>
                <div>
                  <p className="text-white text-sm font-semibold">ChatGPT</p>
                  <p className="text-slate-400 text-sm">"I should probably check if this is a scam... I&apos;ll figure out ChatGPT later."</p>
                </div>
              </div>
              <div className="flex items-start gap-3 pt-3 border-t border-slate-700">
                <span className="text-2xl">✉️</span>
                <div>
                  <p className="text-white text-sm font-semibold">Guardian Inbox</p>
                  <p className="text-slate-400 text-sm">"I&apos;ll just forward this to my Guardian Inbox like I always do."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="bg-white px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-3">Side by side</h2>
            <p className="text-slate-500 text-lg">For seniors specifically -- not for tech-savvy users in general.</p>
          </div>
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">

            {/* Table header */}
            <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200">
              <div className="px-6 py-4 text-sm font-semibold text-slate-500 uppercase tracking-wide"></div>
              <div className="px-6 py-4 text-center">
                <p className="text-sm font-bold text-slate-700">ChatGPT / Claude</p>
                <p className="text-xs text-slate-400 mt-0.5">General AI tools</p>
              </div>
              <div className="px-6 py-4 text-center bg-blue-50">
                <p className="text-sm font-bold text-blue-700">Guardian Inbox</p>
                <p className="text-xs text-blue-400 mt-0.5">Built for seniors</p>
              </div>
            </div>

            {comparisons.map(({ feature, chatgpt, guardian }, i) => (
              <div
                key={feature}
                className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
              >
                <div className="px-6 py-4 text-sm text-slate-700 font-medium flex items-center">{feature}</div>
                <div className="px-6 py-4 flex items-center justify-center">
                  {typeof chatgpt === 'boolean' ? (
                    chatgpt ? <XIcon /> : <CheckIcon />
                  ) : (
                    <p className="text-xs text-slate-500 text-center leading-relaxed">{chatgpt}</p>
                  )}
                </div>
                <div className="px-6 py-4 flex items-center justify-center bg-blue-50/50">
                  {typeof guardian === 'boolean' ? (
                    guardian ? <CheckIcon /> : <XIcon />
                  ) : (
                    <p className="text-xs text-blue-700 font-medium text-center leading-relaxed">{guardian}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-6">
            ChatGPT is a great tool. It just wasn&apos;t built for this.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-6 py-20 border-t border-slate-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4 leading-tight">
            The best AI for your parent is the one they will actually use.
          </h2>
          <p className="text-slate-500 text-lg mb-8 leading-relaxed">
            Guardian Inbox requires nothing new from them. No accounts, no apps, no passwords.
            Just the email they have used for years.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/#pricing"
              className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-600/20"
            >
              Protect your parent today →
            </Link>
            <Link
              href="/"
              className="inline-block text-center bg-white hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl transition-colors text-base border border-slate-200"
            >
              See how it works
            </Link>
          </div>
          <p className="text-slate-400 text-sm mt-6">7-day free trial. No contracts. Cancel anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 px-6 py-10">
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
