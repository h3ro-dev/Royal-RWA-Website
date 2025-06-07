import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../src/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Royal RWA - Real Assets, Royal Returns',
  description: 'Invest in tokenized real world assets. Earn up to 14% APY with institutional-grade fisheries, gold mines, and real estate.',
  keywords: 'RWA, tokenization, real world assets, DeFi, yield, staking',
  openGraph: {
    title: 'Royal RWA - Real Assets, Royal Returns',
    description: 'Earn up to 14% APY with tokenized real world assets',
    type: 'website',
    locale: 'en_US',
    url: 'https://royal-rwa.com',
    siteName: 'Royal RWA',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Royal RWA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal RWA - Real Assets, Royal Returns',
    description: 'Earn up to 14% APY with tokenized real world assets',
    images: ['/twitter-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Navigation will be added here when available from Engineer 1 */}
        {children}
        {/* Footer will be added here when available from Engineer 1 */}
      </body>
    </html>
  );
}