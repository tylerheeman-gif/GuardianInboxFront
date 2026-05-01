import Link from 'next/link';

export const metadata = {
  title: 'Contact — Guardian Inbox',
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white antialiased">
      <nav className="bg-white/95 backdrop-blur-sm border-b border-slate-100 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link href="/" className="font-bold text-slate-900 text-lg tracking-tight">Guardian Inbox</Link>
          <Link href="/#waitlist" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm">
            Join Waitlist
          </Link>
        </div>
      </nav>

      <section className="max-w-xl mx-auto px-6 py-24 text-center">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Get in touch</h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-8">
          Have a question about your subscription, need help getting set up, or just want to say hello? We&apos;d love to hear from you.
        </p>

        <a
          href="mailto:hello@guardianinbox.com"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-blue-600/20"
        >
          hello@guardianinbox.com
        </a>

        <p className="text-slate-400 text-sm mt-6">We typically respond within one business day.</p>

        <div className="mt-16 pt-8 border-t border-slate-100 flex justify-center gap-8 text-sm text-slate-400">
          <Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-700 transition-colors">Terms of Service</Link>
        </div>
      </section>
    </main>
  );
}
