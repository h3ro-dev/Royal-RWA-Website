import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { reportWebVitals, analytics } from '@/lib/analytics';
import '@/app/globals.css';
import { useRouter } from 'next/router';

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

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
    router.events.on('routeChangeComplete', handleRouteChange);
    
    // Initial page view
    if (typeof window !== 'undefined') {
      analytics.track('page_view', { url: window.location.pathname });
    }

    return () => {
      // Cleanup
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

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