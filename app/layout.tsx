import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import SessionProvider from './SessionProvider';
import AnnouncementBar from './AnnouncementBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Guardian Inbox | AI for Your Parents, Delivered by Email',
  description:
    'Give your parents a trusted AI companion they can reach by simply sending an email. Scam detection, news, sports scores, and more. No apps, no passwords, no learning curve.',
  openGraph: {
    title: 'Guardian Inbox | AI for Your Parents, Delivered by Email',
    description:
      'Give your parents a trusted AI companion they can reach by email. No apps, no passwords, no learning curve.',
    url: 'https://guardianinbox.com',
    siteName: 'Guardian Inbox',
    type: 'website',
    images: [{ url: 'https://guardianinbox.com/stock3.jpg', width: 1200, height: 630 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-B9RS9M61DR" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-B9RS9M61DR');
        `}</Script>
        <AnnouncementBar />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
