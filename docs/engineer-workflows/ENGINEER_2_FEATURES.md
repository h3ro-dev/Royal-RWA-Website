# Engineer 2: Feature Builder Workflow

## Mission
Build all user-facing features and flows that make Royal RWA valuable to users. You create the experiences that convert visitors into investors.

## Core Responsibilities

### 1. Page Structure Setup (Hours 0-4)
```typescript
// App directory structure
app/
├── page.tsx              // Homepage
├── calculator/page.tsx   // Yield calculator
├── tokens/page.tsx       // Token ecosystem
├── staking/page.tsx      // Staking interface
├── assets/page.tsx       // Asset portfolio
├── about/page.tsx        // Trust building
└── layout.tsx           // Root layout
```

### 2. Hero Section & Homepage (Hours 4-8)
```typescript
// Key elements to implement
- Animated headline with CountUp for APY
- Trust indicators bar
- Live stats display
- Dual CTA strategy
- Scroll incentive
- Social proof section
```

### 3. Yield Calculator Feature (Hours 8-12)
```typescript
interface CalculatorFeatures {
  // Core functionality
  amountInput: 'slider + manual entry';
  periodSelector: 'flexible | 1year | 2year';
  
  // Calculations
  simpleInterest: boolean;
  compoundInterest: boolean;
  
  // Visualizations
  projectionChart: 'line graph showing growth';
  comparisonTable: 'vs savings, stocks, bonds';
  
  // Engagement
  shareResults: 'social media + link';
  saveScenarios: 'local storage';
}
```

### 4. Three-Token Visualizer (Hours 12-16)
```typescript
// Interactive token ecosystem display
- 3D orbital system (using Three.js)
- Click to explore each token
- Animated value flows between tokens
- Mobile: 2D fallback with great UX
- Information panels for each token
```

### 5. Staking Interface (Hours 16-20)
```typescript
// Complete staking flow
1. Amount selection (presets + custom)
2. Period selection (visual timeline)
3. Projection display (earnings preview)
4. Confirmation modal (all details)
5. Success state (celebration)
```

### 6. Additional Features (Hours 20-24)
- Asset portfolio grid
- Activity feed
- Trust/About page
- Mobile navigation
- Search functionality

## Interface Contracts

### Feature Interfaces
```typescript
// Calculator API Contract
interface CalculatorInput {
  amount: number;
  period: 'flexible' | '1year' | '2year';
  compounding: boolean;
}

interface CalculatorOutput {
  totalReturn: number;
  profit: number;
  apy: number;
  dailyEarnings: number;
  projectionData: Array<{date: string; value: number}>;
}

// Staking Contract
interface StakingRequest {
  amount: number;
  lockPeriod: number; // in days
  walletAddress?: string;
}
```

### Data Requirements from Engineer 3
```typescript
// What you need from backend
- GET /api/yields/current
- GET /api/stats/tvl
- GET /api/stats/users
- POST /api/calculator/projection
- WebSocket for activity feed
```

## Implementation Strategy

### Use Static First, Enhance Later
```typescript
// Day 1: Static implementation
const MOCK_TVL = 125000000;
const MOCK_USERS = 12543;
const MOCK_APY = { flexible: 10, year1: 12, year2: 14 };

// Day 2-3: Replace with real data
const { tvl } = await fetch('/api/stats/tvl');
```

### Mobile-First Development
1. Build for mobile viewport first (375px)
2. Enhance for tablet (768px)
3. Optimize for desktop (1440px)
4. Test touch interactions constantly

### Component Usage from Engineer 1
```typescript
import { 
  Button, 
  Card, 
  Input, 
  StatCard,
  TokenCard 
} from '@/components';

// Use provided components, don't rebuild
// If missing something, use Tailwind temporarily
// Update interfaces.json with needs
```

## Day-by-Day Deliverables

### Day 1 (Core Structure)
- [ ] All page routes created
- [ ] Homepage with static content
- [ ] Calculator with basic math
- [ ] Navigation working

### Day 2 (Feature Complete)
- [ ] Calculator fully functional
- [ ] Token visualizer animated
- [ ] Staking flow complete
- [ ] All forms working

### Day 3 (Integration)
- [ ] Real data connected
- [ ] Loading states
- [ ] Error handling
- [ ] Success celebrations

### Day 4 (Polish)
- [ ] Animations refined
- [ ] Mobile perfected
- [ ] SEO optimized
- [ ] Final testing

## Success Metrics

### Conversion Metrics
- ✓ Calculator engagement > 60%
- ✓ Staking flow completion > 40%
- ✓ Mobile experience flawless
- ✓ Page load < 2s

### Feature Completeness
- ✓ All user flows working
- ✓ No dead ends
- ✓ Clear CTAs throughout
- ✓ Trust elements visible

## Communication Protocol

### Commit Pattern
```bash
feat(calculator): Implement compound interest calculations
feat(homepage): Add hero section with trust indicators
feat(staking): Complete multi-step staking flow
fix(mobile): Improve calculator UX on small screens
```

### Interface Documentation
```json
{
  "engineer2": {
    "features": {
      "calculator": {
        "status": "complete",
        "dataNeeds": ["currentAPY", "historicalYields"],
        "components": ["Input", "Button", "Chart"]
      },
      "staking": {
        "status": "in-progress",
        "dataNeeds": ["walletConnection", "stakingAPI"],
        "components": ["StakingCard", "Modal", "ProgressBar"]
      }
    }
  }
}
```

## Pro Tips for Speed

1. **Copy from the best** - Use patterns from `/docs/research/UI_PATTERNS_AND_CODE.md`
2. **Don't over-engineer** - Simple and working beats complex and theoretical
3. **Test real devices** - Chrome DevTools lies about mobile
4. **Use real content** - Lorem ipsum hides design flaws
5. **Celebrate small wins** - Micro-interactions matter

## Key Resources

- UI Patterns: `/docs/research/UI_PATTERNS_AND_CODE.md`
- Conversion Playbook: `/docs/research/CONVERSION_OPTIMIZATION_PLAYBOOK.md`
- Content Strategy: `/docs/CONTENT_STRATEGY.md`
- Mock Data: `/src/lib/mock-data.ts`

## Critical User Flows to Nail

### The 2-Minute Journey
1. Land on homepage → Understand value (30s)
2. Try calculator → See potential returns (45s)
3. Learn about tokens → Build trust (30s)
4. Start staking → Feel confident (15s)

Every feature should support this journey.

---

**Remember**: You're not just building features. You're crafting experiences that turn skeptics into believers, visitors into investors.