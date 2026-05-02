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
          You&apos;re all set!
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed mb-8">
          Welcome to Guardian Inbox. Check your email — we&apos;ve sent your parent their personal Guardian Inbox address so they can start using it right away.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 mb-8 text-left space-y-3">
          <p className="text-sm font-semibold text-slate-700">What happens next:</p>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
            <p className="text-sm text-slate-600">Your parent receives a welcome email with their personal Guardian Inbox address.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
            <p className="text-sm text-slate-600">They email that address any time they have a question or want to check a suspicious email.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">3</span>
            <p className="text-sm text-slate-600">Guardian Inbox replies within minutes with a clear, friendly answer.</p>
          </div>
        </div>

        <Link
          href="/"
          className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          ← Back to home
        </Link>
      </div>
    </main>
  );
}
