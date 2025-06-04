# Royal RWA UI Patterns & Code Snippets

## High-Converting Component Patterns

### 1. Trust-Building Hero Section
```tsx
// Hero with real-time trust indicators
const TrustHero = () => {
  const { tvl, users, audits } = useRealTimeStats();
  
  return (
    <section className="relative overflow-hidden">
      {/* Background with subtle animation */}
      <div className="absolute inset-0">
        <GoldParticles />
        <GridPattern opacity={0.1} />
      </div>
      
      {/* Trust Bar - Above the fold */}
      <div className="flex justify-center gap-8 py-4 border-b border-gold/20">
        <TrustBadge icon={<ShieldCheck />} value="Audited" link="/audits" />
        <TrustBadge icon={<Lock />} value="$2M Insured" link="/insurance" />
        <TrustBadge icon={<Building />} value="Regulated" link="/compliance" />
      </div>
      
      {/* Main Hero Content */}
      <div className="container mx-auto px-4 py-20">
        <motion.h1 
          className="text-6xl font-bold text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Turn Real Assets Into{' '}
          <span className="text-gold">
            <CountUp end={14} duration={2} />% APY
          </span>
        </motion.h1>
        
        {/* Live Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          <StatCard 
            label="Total Value Locked"
            value={`$${(tvl / 1000000).toFixed(1)}M`}
            trend="+12%"
            live
          />
          <StatCard 
            label="Active Investors"
            value={users.toLocaleString()}
            trend="+847"
            live
          />
          <StatCard 
            label="Avg. APY"
            value="12.7%"
            trend="Stable"
            verified
          />
        </div>
      </div>
    </section>
  );
};
```

### 2. Conversion-Optimized Calculator
```tsx
// Yield calculator with psychological triggers
const YieldCalculator = () => {
  const [amount, setAmount] = useState(10000); // Start with aspirational amount
  const [period, setPeriod] = useState<'flexible' | '1year' | '2year'>('1year');
  
  const results = calculateYield(amount, period);
  
  return (
    <div className="bg-midnight-blue/5 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">
        See Your Potential Returns
      </h2>
      
      {/* Amount Input with Presets */}
      <div className="space-y-4">
        <label className="text-sm text-gray-600">Investment Amount</label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full px-4 py-3 text-2xl font-semibold"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            USD
          </div>
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="flex gap-2">
          {[1000, 5000, 10000, 25000, 100000].map(preset => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className="px-4 py-2 rounded-lg border hover:bg-gold/10"
            >
              ${(preset/1000)}k
            </button>
          ))}
        </div>
      </div>
      
      {/* Staking Period Selector */}
      <div className="mt-6">
        <label className="text-sm text-gray-600">Staking Period</label>
        <div className="grid grid-cols-3 gap-4 mt-2">
          <PeriodCard
            period="flexible"
            apy={10}
            selected={period === 'flexible'}
            onClick={() => setPeriod('flexible')}
            badge="Most Flexible"
          />
          <PeriodCard
            period="1year"
            apy={12}
            selected={period === '1year'}
            onClick={() => setPeriod('1year')}
            badge="Most Popular"
          />
          <PeriodCard
            period="2year"
            apy={14}
            selected={period === '2year'}
            onClick={() => setPeriod('2year')}
            badge="Best Returns"
          />
        </div>
      </div>
      
      {/* Results with Animation */}
      <motion.div 
        className="mt-8 p-6 bg-gradient-to-r from-gold/10 to-gold/5 rounded-xl"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600">Total Return</p>
            <p className="text-3xl font-bold text-gold">
              <CountUp
                start={amount}
                end={results.total}
                duration={1}
                prefix="$"
                separator=","
              />
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Profit</p>
            <p className="text-3xl font-bold text-green-500">
              +<CountUp
                end={results.profit}
                duration={1}
                prefix="$"
                separator=","
              />
            </p>
          </div>
        </div>
        
        {/* Daily Earnings Motivator */}
        <div className="mt-4 p-4 bg-white/5 rounded-lg">
          <p className="text-center">
            That's <span className="font-bold text-gold">
              ${(results.profit / 365).toFixed(2)}
            </span> earned every single day
          </p>
        </div>
      </motion.div>
      
      {/* CTA with Urgency */}
      <div className="mt-6 space-y-4">
        <button className="w-full py-4 bg-gold text-midnight-blue font-bold rounded-lg hover:bg-gold/90 transition-all">
          Start Earning {period === 'flexible' ? '10%' : period === '1year' ? '12%' : '14%'} APY
        </button>
        <p className="text-center text-sm text-gray-600">
          Join {Math.floor(Math.random() * 50) + 100} investors who started this week
        </p>
      </div>
    </div>
  );
};
```

### 3. Social Proof Activity Feed
```tsx
// Real-time activity with privacy
const ActivityFeed = () => {
  const activities = useWebSocket<Activity[]>('wss://api.royal-rwa.com/feed');
  
  return (
    <div className="space-y-3">
      <AnimatePresence>
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-4 p-4 bg-white/5 rounded-lg"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gold to-gold/50 flex items-center justify-center">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                {anonymizeUser(activity.user)} from {activity.country}
              </p>
              <p className="text-xs text-gray-500">
                {activity.action} • {timeAgo(activity.timestamp)}
              </p>
            </div>
            {activity.amount && (
              <div className="text-right">
                <p className="font-semibold text-gold">
                  ${formatAmount(activity.amount)}
                </p>
                {activity.yield && (
                  <p className="text-xs text-gray-500">
                    {activity.yield}% APY
                  </p>
                )}
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
```

### 4. Three-Token Ecosystem Visualizer
```tsx
// Interactive 3D token relationship display
const TokenEcosystem = () => {
  return (
    <div className="h-[600px] relative">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* RWA Token */}
        <Token
          position={[-2, 0, 0]}
          color="#d4af37"
          label="RWA TOKEN"
          description="Your gateway to the ecosystem"
          onClick={() => setSelected('rwa')}
        />
        
        {/* LP Token */}
        <Token
          position={[2, 1.5, 0]}
          color="#4a90e2"
          label="LP TOKEN"
          description="Earn yields from staking"
          onClick={() => setSelected('lp')}
        />
        
        {/* Stablecoin */}
        <Token
          position={[0, -1.5, 0]}
          color="#2ecc71"
          label="STABLECOIN"
          description="100% asset-backed stability"
          onClick={() => setSelected('stable')}
        />
        
        {/* Flowing connections */}
        <FlowingConnections />
        
        <OrbitControls enableZoom={false} />
      </Canvas>
      
      {/* Info Panel */}
      <TokenInfoPanel selected={selected} />
    </div>
  );
};
```

### 5. Progressive KYC Form
```tsx
// Reduce friction with smart forms
const ProgressiveKYC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useLocalStorage('kyc-progress', {});
  
  const steps = [
    {
      fields: ['email'],
      title: 'Start with just your email',
      incentive: 'Unlock yield calculator'
    },
    {
      fields: ['name', 'country'],
      title: 'Tell us a bit about you',
      incentive: 'Access investment guides'
    },
    {
      fields: ['phone', 'investmentRange'],
      title: 'Almost there!',
      incentive: 'Get personalized portfolio'
    },
    {
      fields: ['documents'],
      title: 'Final step for investing',
      incentive: 'Start earning immediately'
    }
  ];
  
  return (
    <div className="max-w-md mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm">Step {step + 1} of {steps.length}</span>
          <span className="text-sm text-gold">{((step + 1) / steps.length * 100).toFixed(0)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-gold to-gold/70"
            animate={{ width: `${(step + 1) / steps.length * 100}%` }}
          />
        </div>
      </div>
      
      {/* Current Step */}
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <h3 className="text-2xl font-bold mb-2">
          {steps[step].title}
        </h3>
        <p className="text-gray-600 mb-6">
          ✨ {steps[step].incentive}
        </p>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          if (step < steps.length - 1) {
            setStep(step + 1);
          } else {
            completeKYC();
          }
        }}>
          {/* Dynamic fields based on step */}
          <DynamicFields fields={steps[step].fields} />
          
          <button
            type="submit"
            className="w-full py-3 bg-gold text-midnight-blue font-semibold rounded-lg mt-6"
          >
            {step === steps.length - 1 ? 'Complete & Start Investing' : 'Continue'}
          </button>
        </form>
      </motion.div>
      
      {/* Skip Option (with consequence) */}
      {step < steps.length - 1 && (
        <button
          onClick={() => setStep(steps.length - 1)}
          className="w-full mt-4 text-sm text-gray-500 underline"
        >
          Skip to investment (some features limited)
        </button>
      )}
    </div>
  );
};
```

### 6. Mobile-Optimized Staking Flow
```tsx
// Touch-friendly staking interface
const MobileStaking = () => {
  const [amount, setAmount] = useState(1000);
  const [showConfirm, setShowConfirm] = useState(false);
  
  return (
    <div className="min-h-screen bg-midnight-blue text-white p-4">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 bg-midnight-blue/95 backdrop-blur z-50 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Stake RWA</h1>
          <button className="text-gold">Cancel</button>
        </div>
      </header>
      
      {/* Amount Selector with Haptic Feedback */}
      <div className="mt-20 space-y-6">
        <div className="text-center">
          <p className="text-gray-400">Amount to Stake</p>
          <div className="text-5xl font-bold text-gold mt-2">
            ${amount.toLocaleString()}
          </div>
        </div>
        
        {/* Slider with Snap Points */}
        <div className="px-4">
          <input
            type="range"
            min="100"
            max="100000"
            step="100"
            value={amount}
            onChange={(e) => {
              setAmount(Number(e.target.value));
              // Trigger haptic feedback
              if ('vibrate' in navigator) {
                navigator.vibrate(10);
              }
            }}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$100</span>
            <span>$100k</span>
          </div>
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-4 gap-2">
          {[500, 1000, 5000, 10000].map(preset => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className="py-3 bg-white/10 rounded-lg active:scale-95 transition-transform"
            >
              ${preset/1000}k
            </button>
          ))}
        </div>
        
        {/* Period Selection with Swipe */}
        <div className="mt-8">
          <p className="text-gray-400 mb-4">Select Staking Period</p>
          <SwipeableViews>
            <PeriodOption period="flexible" apy={10} />
            <PeriodOption period="1year" apy={12} />
            <PeriodOption period="2year" apy={14} />
          </SwipeableViews>
        </div>
        
        {/* Projected Returns */}
        <div className="bg-gold/10 rounded-2xl p-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Projected Return</span>
            <span className="text-2xl font-bold text-gold">
              ${(amount * 1.12).toLocaleString()}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            After 1 year at 12% APY
          </div>
        </div>
      </div>
      
      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-midnight-blue/95 backdrop-blur">
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full py-4 bg-gold text-midnight-blue font-bold rounded-lg active:scale-95 transition-transform"
        >
          Review Stake
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          No gas fees • Instant confirmation
        </p>
      </div>
      
      {/* Confirmation Sheet */}
      <Sheet open={showConfirm} onClose={() => setShowConfirm(false)}>
        <ConfirmationDetails amount={amount} onConfirm={executeStake} />
      </Sheet>
    </div>
  );
};
```

### 7. Trust-Building Asset Display
```tsx
// Show real assets with transparency
const AssetShowcase = () => {
  const assets = useAssetData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {assets.map(asset => (
        <motion.div
          key={asset.id}
          whileHover={{ y: -5 }}
          className="bg-white/5 rounded-xl overflow-hidden group"
        >
          {/* Real Asset Image */}
          <div className="relative h-48 overflow-hidden">
            <img
              src={asset.image}
              alt={asset.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-gold/20 backdrop-blur rounded-full text-sm">
                {asset.type}
              </span>
            </div>
          </div>
          
          {/* Asset Details */}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{asset.name}</h3>
            <p className="text-gray-400 text-sm mb-4">{asset.location}</p>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500">Value</p>
                <p className="font-semibold">${asset.value.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Yield</p>
                <p className="font-semibold text-green-500">{asset.yield}%</p>
              </div>
            </div>
            
            {/* Verification Status */}
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-400">
                Audited by {asset.auditor}
              </span>
            </div>
            
            {/* View Details */}
            <button className="mt-4 text-gold hover:text-gold/80 text-sm font-medium">
              View Asset Details →
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
```

## Performance Optimization Patterns

### 1. Intersection Observer for Animations
```tsx
// Trigger animations only when visible
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); // Only animate once
        }
      },
      { threshold }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => observer.disconnect();
  }, [threshold]);
  
  return { ref, inView };
};
```

### 2. Optimistic Updates
```tsx
// Update UI before server response
const useOptimisticStake = () => {
  const [staking, setStaking] = useState(false);
  const [optimisticBalance, setOptimisticBalance] = useState(null);
  
  const stake = async (amount: number) => {
    // Immediate UI update
    setStaking(true);
    setOptimisticBalance(prev => prev + amount);
    
    try {
      const result = await api.stake(amount);
      // Confirm with real data
      setOptimisticBalance(result.newBalance);
      return result;
    } catch (error) {
      // Rollback on error
      setOptimisticBalance(prev => prev - amount);
      throw error;
    } finally {
      setStaking(false);
    }
  };
  
  return { stake, staking, balance: optimisticBalance };
};
```

### 3. Smart Preloading
```tsx
// Preload based on user intent
const useIntentPreload = () => {
  useEffect(() => {
    // Preload calculator when hovering CTA
    const ctas = document.querySelectorAll('[data-preload]');
    
    ctas.forEach(cta => {
      cta.addEventListener('mouseenter', () => {
        const route = cta.getAttribute('data-preload');
        router.prefetch(route);
      });
    });
  }, []);
};
```

## Conversion Optimization Code

### 1. Exit Intent Detection
```tsx
// Show offer when user tries to leave
const useExitIntent = (callback: () => void) => {
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !sessionStorage.getItem('exitShown')) {
        callback();
        sessionStorage.setItem('exitShown', 'true');
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [callback]);
};
```

### 2. Scroll Depth Tracking
```tsx
// Track how far users scroll
const useScrollDepth = () => {
  const [maxScroll, setMaxScroll] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setMaxScroll(prev => Math.max(prev, scrollPercentage));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return maxScroll;
};
```

### 3. A/B Testing Hook
```tsx
// Simple A/B testing implementation
const useABTest = <T extends string>(testName: string, variants: T[]): T => {
  const [variant, setVariant] = useState<T>(() => {
    // Check if user already has a variant
    const stored = localStorage.getItem(`ab_${testName}`);
    if (stored && variants.includes(stored as T)) {
      return stored as T;
    }
    
    // Assign random variant
    const selected = variants[Math.floor(Math.random() * variants.length)];
    localStorage.setItem(`ab_${testName}`, selected);
    
    // Track assignment
    analytics.track('AB Test Assigned', {
      test: testName,
      variant: selected
    });
    
    return selected;
  });
  
  return variant;
};

// Usage
const headline = useABTest('hero_headline', [
  'Earn 14% APY on Real Assets',
  'Beat Inflation with Asset-Backed Yields',
  'Institutional Returns, Now Accessible'
]);
```

---

These patterns and code snippets represent best practices from high-converting fintech and DeFi platforms, adapted specifically for Royal RWA's unique value proposition.