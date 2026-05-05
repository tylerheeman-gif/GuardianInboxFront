import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Guardian Inbox',
};

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-slate-400 text-sm mb-10">Last updated: May 1, 2026</p>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-600 leading-relaxed">

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Who We Are</h2>
            <p>Guardian Inbox is a personal AI email companion service operated as a sole proprietorship. We can be reached at <a href="mailto:hello@guardianinbox.com" className="text-blue-600 hover:underline">hello@guardianinbox.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Account information:</strong> Your name and email address when you sign up for the waitlist or subscribe.</li>
              <li><strong>Payment information:</strong> Billing details processed securely through Stripe. We never store your full card number.</li>
              <li><strong>Email content:</strong> Emails sent to your Guardian Inbox address are processed to generate a reply. We do not permanently store the content of these emails.</li>
              <li><strong>Usage data:</strong> Basic logs such as timestamps of email interactions for debugging and service improvement.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To provide and operate the Guardian Inbox service</li>
              <li>To process payments and manage your subscription</li>
              <li>To send service-related emails (welcome emails, subscription confirmations)</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To improve the quality of our AI responses</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services to operate Guardian Inbox:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Anthropic:</strong> Processes email content to generate AI responses. Subject to Anthropic&apos;s privacy policy.</li>
              <li><strong>Postmark:</strong> Handles email delivery. Subject to Postmark&apos;s privacy policy.</li>
              <li><strong>Stripe:</strong> Processes all payments. Subject to Stripe&apos;s privacy policy.</li>
              <li><strong>Railway:</strong> Hosts our servers. Subject to Railway&apos;s privacy policy.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Data Retention</h2>
            <p>We retain your account information for as long as your subscription is active. Email content is processed in real time and not stored beyond what is necessary to generate a reply. You may request deletion of your account data at any time by emailing us.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Your Rights</h2>
            <p>You have the right to access, correct, or delete your personal data. To make a request, email us at <a href="mailto:hello@guardianinbox.com" className="text-blue-600 hover:underline">hello@guardianinbox.com</a> and we will respond within 30 days.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Security</h2>
            <p>We use industry-standard security practices including encrypted connections (HTTPS) and secure payment processing through Stripe. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify active subscribers of material changes via email. Continued use of the service after changes constitutes acceptance of the updated policy.</p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contact</h2>
            <p>Questions about this policy? Email us at <a href="mailto:hello@guardianinbox.com" className="text-blue-600 hover:underline">hello@guardianinbox.com</a>.</p>
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
