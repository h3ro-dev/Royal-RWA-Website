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

import React from 'react'
import { Inter, Space_Grotesk } from 'next/font/google'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: 'Royal RWA - Where Sovereign Wealth Meets Individual Opportunity',
  description: 'Invest globally in African real-world assets. Earn up to 14% APY with institutional-grade security and 100% asset backing.',
  keywords: 'Royal RWA, real world assets, blockchain, DeFi, tokenization, Africa, investment, staking',
  openGraph: {
    title: 'Royal RWA - Where Sovereign Wealth Meets Individual Opportunity',
    description: 'Invest globally in African real-world assets. Earn up to 14% APY.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal RWA',
    description: 'Invest globally in African real-world assets. Earn up to 14% APY.',
    images: ['/twitter-image.png'],
  },

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Royal RWA - Real-World Assets on Blockchain',
  description: 'Access global real-world assets through blockchain technology',
}

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
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen bg-royal-dark antialiased">
        <div className="relative">
          {/* Background gradient effect */}
          <div className="fixed inset-0 bg-gradient-to-br from-royal-midnight/20 via-royal-dark to-royal-deep-blue/20 pointer-events-none" />
          
          {/* Navigation */}
          <Navigation />
          
          {/* Main content with padding for fixed nav */}
          <main className="relative z-10 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 
