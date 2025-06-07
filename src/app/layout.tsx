import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Royal RWA - Where Sovereign Wealth Meets Individual Opportunity',
  description: 'Invest globally in African real-world assets with institutional-grade yields from tokenized assets.',
  keywords: 'Royal RWA, blockchain, DeFi, real world assets, tokenization, Africa, investment',
  authors: [{ name: 'Royal RWA Team' }],
  openGraph: {
    title: 'Royal RWA',
    description: 'Where Sovereign Wealth Meets Individual Opportunity',
    url: 'https://royalrwa.com',
    siteName: 'Royal RWA',
    images: [
      {
        url: 'https://royalrwa.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Royal RWA',
    description: 'Where Sovereign Wealth Meets Individual Opportunity',
    images: ['https://royalrwa.com/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}