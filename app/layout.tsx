import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guardian Inbox — AI for Your Parents, Delivered by Email',
  description:
    'Give your parents a trusted AI companion they can reach by simply sending an email. Scam detection, news, sports scores, and more — no apps, no passwords, no learning curve.',
  openGraph: {
    title: 'Guardian Inbox — AI for Your Parents, Delivered by Email',
    description:
      'Give your parents a trusted AI companion they can reach by email. No apps, no passwords, no learning curve.',
    url: 'https://guardianinbox.com',
    siteName: 'Guardian Inbox',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
