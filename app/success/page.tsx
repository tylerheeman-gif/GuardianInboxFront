import Link from 'next/link';

export const metadata = {
  title: 'Welcome to Guardian Inbox!',
};

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-white antialiased flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">
          Welcome to Guardian Inbox!
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-8">
          Check your email -- we&apos;ve sent you instructions to add your parent and get them set up.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
          <p className="text-sm font-semibold text-slate-700">What happens next:</p>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <p className="text-sm text-slate-600">Head to your account page and add your parent&apos;s email address.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <p className="text-sm text-slate-600">They&apos;ll receive a welcome email with their personal Guardian Inbox address -- nothing else required from them.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <p className="text-sm text-slate-600">They email that address any time they have a question or want to check something suspicious. A clear reply arrives in seconds.</p>
          </div>
        </div>

        <Link
          href="/account"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors text-sm shadow-sm mb-4"
        >
          Set up your parent&apos;s account →
        </Link>
        <div>
          <Link
            href="/"
            className="inline-block text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
