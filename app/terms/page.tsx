import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service — Guardian Inbox',
};

export default function TermsPage() {
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

      <section className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Terms of Service</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: May 1, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using Guardian Inbox, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Description of Service</h2>
            <p>Guardian Inbox provides an AI-powered email companion service. Users send emails to their personal Guardian Inbox address and receive automated responses powered by artificial intelligence. The service is designed to help users identify potentially fraudulent emails and answer general knowledge questions.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Important Limitations</h2>
            <p>Guardian Inbox is an AI service and has inherent limitations. You understand and agree that:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>AI responses may be inaccurate, incomplete, or outdated.</li>
              <li>Guardian Inbox is not a substitute for professional legal, financial, or medical advice.</li>
              <li>We cannot guarantee that all scam or phishing emails will be detected.</li>
              <li>You should always exercise independent judgment before acting on any response.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Subscriptions and Billing</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Subscriptions are billed monthly on the date of initial purchase.</li>
              <li>A 7-day free trial is included with all new subscriptions. You will not be charged until the trial period ends.</li>
              <li>You may cancel your subscription at any time from your account dashboard. Cancellation takes effect at the end of the current billing period.</li>
              <li>We do not offer refunds for partial billing periods.</li>
              <li>We reserve the right to change pricing with 30 days notice to active subscribers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Acceptable Use</h2>
            <p>You agree not to use Guardian Inbox to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Send spam, abusive, or harassing content</li>
              <li>Attempt to reverse engineer or exploit the service</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Impersonate any person or entity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Guardian Inbox shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. Our total liability for any claim shall not exceed the amount you paid us in the 3 months prior to the claim.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Disclaimer of Warranties</h2>
            <p>The service is provided &quot;as is&quot; without warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, error-free, or that results obtained will be accurate or reliable.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Termination</h2>
            <p>We reserve the right to suspend or terminate your access to the service at any time for violation of these terms. You may cancel your subscription at any time.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Changes to Terms</h2>
            <p>We may update these terms from time to time. We will notify active subscribers of material changes via email. Continued use of the service after changes constitutes acceptance of the updated terms.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">10. Contact</h2>
            <p>Questions about these terms? Email us at <a href="mailto:hello@guardianinbox.com" className="text-blue-600 hover:underline">hello@guardianinbox.com</a>.</p>
          </div>

        </div>
      </section>

      <footer className="border-t border-slate-100 px-6 py-8 text-center text-slate-400 text-sm">
        <div className="flex justify-center gap-6">
          <Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-slate-700 transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-slate-700 transition-colors">Contact</Link>
        </div>
        <p className="mt-4">© 2026 Guardian Inbox. All rights reserved.</p>
      </footer>
    </main>
  );
}
