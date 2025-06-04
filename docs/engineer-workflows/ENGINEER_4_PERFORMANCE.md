# Engineer 4: Performance Guardian Workflow

## Mission
Ensure the Royal RWA platform is fast, beautiful, tested, and production-ready. You are the final gatekeeper of quality, the optimizer of experiences, and the guardian of user delight.

## Core Responsibilities

### 1. Performance Infrastructure (Hours 0-4)
```typescript
// Performance monitoring setup
import { WebVitals } from '@/lib/analytics';

// Track Core Web Vitals
export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP': // First Contentful Paint
    case 'LCP': // Largest Contentful Paint
    case 'CLS': // Cumulative Layout Shift
    case 'FID': // First Input Delay
    case 'TTFB': // Time to First Byte
      analytics.track(metric);
      break;
  }
}

// Bundle analyzer configuration
// Performance budgets
const budgets = {
  javascript: 300 * 1024, // 300KB
  css: 100 * 1024,        // 100KB
  images: 500 * 1024,     // 500KB per image
  total: 1000 * 1024      // 1MB total
};
```

### 2. Animation & Polish System (Hours 4-12)
```typescript
// Global animation presets
export const animations = {
  // Micro-interactions
  hover: {
    scale: 1.02,
    transition: { type: "spring", stiffness: 400 }
  },
  
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  },
  
  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  
  // Success celebrations
  success: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.5 }
  }
};

// Particle effects for special moments
export class ParticleSystem {
  celebrate(type: 'stake' | 'yield' | 'milestone') {
    // Emit gold particles
    // Play success sound
    // Trigger haptic feedback
  }
}
```

### 3. Testing Suite (Hours 8-16)
```typescript
// Component testing
describe('YieldCalculator', () => {
  it('calculates simple interest correctly', () => {
    const result = calculateYield(10000, 'flexible');
    expect(result.total).toBe(11000);
  });
  
  it('handles edge cases gracefully', () => {
    const result = calculateYield(-100, 'flexible');
    expect(result.error).toBe('Invalid amount');
  });
});

// E2E testing
test('Complete staking flow', async ({ page }) => {
  await page.goto('/');
  await page.click('[data-testid="cta-start-earning"]');
  await page.fill('[data-testid="amount-input"]', '10000');
  await page.click('[data-testid="period-1year"]');
  await page.click('[data-testid="stake-button"]');
  
  await expect(page.locator('.success-message')).toBeVisible();
});

// Performance testing
test('Homepage loads under 3 seconds', async ({ page }) => {
  const metrics = await page.evaluate(() => performance.getEntriesByType('navigation'));
  expect(metrics[0].loadEventEnd).toBeLessThan(3000);
});
```

### 4. Optimization Techniques (Hours 12-20)
```typescript
// Image optimization
import Image from 'next/image';

export const OptimizedImage = ({ src, alt, priority = false }) => {
  return (
    <Image
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      placeholder="blur"
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
};

// Code splitting
const YieldCalculator = dynamic(
  () => import('@/components/YieldCalculator'),
  { 
    loading: () => <CalculatorSkeleton />,
    ssr: false 
  }
);

// Font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true
});
```

### 5. Production Readiness (Hours 20-24)
```typescript
// Security headers
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'"
  }
];

// Error boundary
export class ErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    // Log to monitoring service
    // Show user-friendly error
    // Offer recovery action
  }
}
```

## Testing Strategy

### Test Pyramid
```
         E2E Tests
        /    5%    \
       Integration Tests
      /      15%      \
     Unit Tests
    /       80%        \
```

### Critical User Flows to Test
1. **Homepage → Calculator → Results**
2. **Connect Wallet → Stake → Success**
3. **View Assets → Select Asset → Details**
4. **Mobile Navigation → All Pages**

### Performance Benchmarks
```yaml
Metrics to Achieve:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1
- Lighthouse Score: > 95
```

## Animation Guidelines

### When to Animate
- ✅ User interactions (hover, click)
- ✅ State changes (loading → success)
- ✅ Celebrations (staking, milestones)
- ✅ Scroll reveals (once per element)

### When NOT to Animate
- ❌ Every single element
- ❌ Continuous loops (distracting)
- ❌ Critical content (delays understanding)
- ❌ Mobile (reduce for performance)

## Day-by-Day Deliverables

### Day 1 (Foundation)
- [ ] Testing framework setup
- [ ] Performance monitoring
- [ ] Basic test coverage
- [ ] Animation system

### Day 2 (Enhancement)
- [ ] Component animations
- [ ] Loading states
- [ ] Error boundaries
- [ ] Image optimization

### Day 3 (Optimization)
- [ ] Bundle size reduction
- [ ] Lighthouse optimization
- [ ] Mobile performance
- [ ] SEO implementation

### Day 4 (Final Polish)
- [ ] Full E2E test suite
- [ ] Production build
- [ ] Security audit
- [ ] Deployment ready

## Quality Checklist

### Before Any Merge
- [ ] All tests passing
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] Mobile tested on real device
- [ ] Animations smooth (60fps)

### Production Checklist
- [ ] Environment variables set
- [ ] Error tracking configured
- [ ] Analytics implemented
- [ ] SEO meta tags complete
- [ ] Security headers active

## Integration Testing

### Daily Integration Builds
```bash
# Run every 6 hours
npm run test:all
npm run build
npm run lighthouse
npm run bundle-analyze
```

### Cross-Engineer Validation
- Verify Engineer 1's components render correctly
- Ensure Engineer 2's features perform well
- Confirm Engineer 3's APIs handle errors gracefully

## Performance Optimization Priorities

### 1. Initial Load
- Minimize JavaScript bundle
- Optimize critical rendering path
- Preload key resources
- Use CDN for assets

### 2. Runtime Performance
- Debounce expensive operations
- Use React.memo wisely
- Virtualize long lists
- Optimize re-renders

### 3. Perceived Performance
- Skeleton screens
- Optimistic updates
- Progressive enhancement
- Smooth animations

## Communication Protocol

### Performance Reports
```json
{
  "engineer4": {
    "metrics": {
      "lighthouse": 96,
      "bundleSize": "287KB",
      "coverage": "87%",
      "e2eTests": "42 passing"
    },
    "issues": [
      {
        "severity": "medium",
        "description": "Calculator bundle too large",
        "solution": "Code split the chart library"
      }
    ]
  }
}
```

## Pro Tips for Excellence

1. **Test the happy path first** - Most users follow it
2. **Optimize the critical path** - Homepage → Calculator → Stake
3. **Mobile performance is desktop performance** - If mobile is fast, desktop flies
4. **Animation is seasoning** - A little goes a long way
5. **Measure everything** - You can't improve what you don't track

## Final Quality Gates

Before marking the project complete:
- ✅ Lighthouse scores all green
- ✅ 0 console errors in production
- ✅ All critical paths tested
- ✅ Mobile experience flawless
- ✅ Animations enhance, not distract
- ✅ Load time < 3s on 3G
- ✅ Accessibility score > 95
- ✅ SEO score > 90

---

**Remember**: You're not just making it work, you're making it exceptional. Every millisecond saved is a user delighted. Every test written is a bug prevented. Every animation polished is trust earned.

**You are the guardian of excellence. Guard it well.**