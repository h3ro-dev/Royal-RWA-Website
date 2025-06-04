# Engineer 3: Data Orchestrator Workflow

## Mission
Build the entire data layer that powers the Royal RWA platform. From Web3 integration to real-time feeds, you make the numbers real and the blockchain accessible.

## Core Responsibilities

### 1. API Architecture Setup (Hours 0-4)
```typescript
// API Route Structure
app/api/
├── auth/
│   ├── connect/route.ts    // Wallet connection
│   └── verify/route.ts     // Signature verification
├── stats/
│   ├── tvl/route.ts       // Total value locked
│   ├── users/route.ts     // User count
│   └── yields/route.ts    // Current yields
├── calculator/
│   └── projection/route.ts // Yield projections
├── staking/
│   ├── quote/route.ts     // Staking quotes
│   ├── execute/route.ts  // Execute stake
│   └── status/route.ts    // Check status
└── assets/
    ├── portfolio/route.ts  // Asset list
    └── [id]/route.ts      // Asset details
```

### 2. Mock Data System (Hours 4-8)
```typescript
// Comprehensive mock data that matches production structure
export const MOCK_DATA = {
  stats: {
    tvl: 127_543_000,
    tvlChange24h: 2.34,
    totalUsers: 14_782,
    activeStakers: 8_923,
    averageAPY: 12.7
  },
  yields: {
    flexible: 10.0,
    oneYear: 12.0,
    twoYear: 14.0,
    historical: [/* 30 days of data */]
  },
  assets: [
    {
      id: 'guinea-bissau-fisheries',
      name: 'Sustainable Fisheries Operation',
      location: 'Guinea-Bissau',
      value: 15_000_000,
      apy: 15.5,
      type: 'real-estate',
      images: ['/assets/fisheries-1.jpg'],
      verifications: ['Bureau Veritas', 'SGS']
    }
    // ... more assets
  ]
};
```

### 3. Web3 Integration (Hours 8-16)
```typescript
// Wallet Connection (using wagmi)
import { createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http()
  }
});

// Smart Contract Integration
const RWA_TOKEN = '0x...';
const STAKING_CONTRACT = '0x...';
const STABLECOIN = '0x...';

// Contract ABIs
export const contracts = {
  rwaToken: {
    address: RWA_TOKEN,
    abi: RWA_TOKEN_ABI
  },
  staking: {
    address: STAKING_CONTRACT,
    abi: STAKING_ABI
  }
};
```

### 4. Real-time Systems (Hours 16-20)
```typescript
// WebSocket for live data
export class RealtimeService {
  private ws: WebSocket;
  
  constructor() {
    this.ws = new WebSocket('wss://api.royal-rwa.com/realtime');
  }
  
  subscribeToPrices() {
    this.ws.send(JSON.stringify({
      type: 'subscribe',
      channels: ['prices', 'tvl', 'activity']
    }));
  }
  
  onMessage(callback: (data: any) => void) {
    this.ws.on('message', callback);
  }
}

// Server-Sent Events for activity feed
export async function GET(request: Request) {
  const stream = new ReadableStream({
    start(controller) {
      const interval = setInterval(() => {
        const activity = generateActivity();
        controller.enqueue(`data: ${JSON.stringify(activity)}\n\n`);
      }, 5000);
      
      request.signal.addEventListener('abort', () => {
        clearInterval(interval);
      });
    }
  });
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache'
    }
  });
}
```

### 5. State Management (Hours 12-18)
```typescript
// Zustand stores for global state
export const usePortfolioStore = create<PortfolioState>((set) => ({
  assets: [],
  isLoading: false,
  error: null,
  
  fetchAssets: async () => {
    set({ isLoading: true });
    try {
      const assets = await api.getAssets();
      set({ assets, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  }
}));

// React Query for server state
export const useYields = () => {
  return useQuery({
    queryKey: ['yields'],
    queryFn: fetchYields,
    refetchInterval: 30000, // Every 30 seconds
    staleTime: 10000
  });
};
```

## Interface Contracts

### API Response Standards
```typescript
// All API responses follow this structure
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  timestamp: number;
}

// Example: TVL endpoint
interface TVLResponse {
  current: number;
  change24h: number;
  change7d: number;
  history: Array<{
    timestamp: number;
    value: number;
  }>;
}
```

### Web3 Integration Points
```typescript
// What Engineer 2 can use
export const web3Hooks = {
  useAccount: () => { address, isConnected },
  useBalance: () => { data: balance },
  useStake: () => { write: stakeTokens },
  useWithdraw: () => { write: withdrawTokens }
};
```

## Implementation Strategy

### Progressive Enhancement
1. **Day 1**: Everything works with mock data
2. **Day 2**: Real APIs with fallback to mocks
3. **Day 3**: Web3 integration complete
4. **Day 4**: Production optimizations

### Error Handling Philosophy
```typescript
// Always graceful degradation
try {
  const data = await fetchRealData();
  return data;
} catch (error) {
  console.error('Falling back to mock data:', error);
  return MOCK_DATA;
}
```

## Day-by-Day Deliverables

### Day 1 (Foundation)
- [ ] All API routes created
- [ ] Comprehensive mock data
- [ ] Basic Web3 setup
- [ ] State management structure

### Day 2 (Integration)
- [ ] Real API endpoints working
- [ ] Wallet connection functional
- [ ] WebSocket server running
- [ ] Query caching implemented

### Day 3 (Production Features)
- [ ] Smart contract integration
- [ ] Real-time price feeds
- [ ] Activity stream working
- [ ] Error handling complete

### Day 4 (Optimization)
- [ ] Response caching
- [ ] Rate limiting
- [ ] Security headers
- [ ] Performance monitoring

## Success Metrics

### Performance
- ✓ API response time < 200ms
- ✓ WebSocket latency < 50ms
- ✓ 99.9% uptime
- ✓ Graceful fallbacks

### Functionality
- ✓ All endpoints documented
- ✓ Web3 integration seamless
- ✓ Real-time updates working
- ✓ State management efficient

## Communication Protocol

### API Documentation
```yaml
# Document every endpoint in interfaces.json
endpoint: /api/stats/tvl
method: GET
response:
  current: number
  change24h: number
  history: array
example: { current: 125000000, change24h: 2.34 }
```

### Status Updates
```json
{
  "engineer3": {
    "apis": {
      "/api/stats/tvl": "complete",
      "/api/calculator/projection": "complete",
      "/api/staking/execute": "in-progress",
      "web3-connection": "testing"
    }
  }
}
```

## Critical Success Factors

### 1. Mock Data Quality
Your mock data must be indistinguishable from production data. This allows Engineer 2 to build without waiting.

### 2. Error Resilience
Never let the app crash. Always have fallbacks. Log errors, don't show them.

### 3. Performance First
Every millisecond counts. Cache aggressively. Optimize queries. Use CDNs.

### 4. Security Always
- Validate all inputs
- Use rate limiting
- Implement CORS properly
- Never expose sensitive data

## Resources

- Web3 Setup: Use wagmi + viem (not web3.js)
- API Framework: Next.js App Router API routes
- State: Zustand for client, Redis for server
- Real-time: WebSockets or Server-Sent Events

## Pro Tips

1. **Start with the mock** - Perfect mock data makes everything easier
2. **Use TypeScript strictly** - Types are your documentation
3. **Test with slow networks** - Not everyone has fiber
4. **Cache everything** - But know when to invalidate
5. **Monitor from day 1** - You can't fix what you can't measure

---

**Remember**: You're the bridge between blockchain complexity and user simplicity. Make the impossible feel inevitable.