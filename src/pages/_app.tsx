import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { reportWebVitals, analytics } from '@/lib/analytics';
import '@/styles/globals.css';

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Initialize analytics on mount
    analytics.initialize();

    // Report Web Vitals
    reportWebVitals();

    // Track page views
    const handleRouteChange = (url: string) => {
      analytics.track('page_view', { url });
    };

    // Listen to route changes
    if (typeof window !== 'undefined') {
      // Initial page view
      analytics.track('page_view', { url: window.location.pathname });
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </ErrorBoundary>
  );
}

// Export reportWebVitals for Next.js
export { reportWebVitals };