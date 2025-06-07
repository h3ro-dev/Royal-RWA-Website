import type { RWAAsset, StakePosition, YieldData, TokenInfo } from '../types/engineer3'

// Comprehensive mock data system
export const MOCK_DATA = {
  stats: {
    tvl: 127_543_000,
    tvlChange24h: 2.34,
    totalUsers: 14_782,
    activeStakers: 8_923,
    averageAPY: 12.7,
    totalTransactions: 156_234,
    totalRewardsPaid: 18_500_000,
  },
  
  yields: {
    flexible: 10.0,
    oneYear: 12.0,
    twoYear: 14.0,
    historical: generateYieldHistory(30),
  },
  
  assets: [
    {
      id: 'guinea-bissau-fisheries',
      name: 'Sustainable Fisheries Operation',
      location: 'Bissau',
      country: 'Guinea-Bissau',
      value: BigInt('15000000000000000000000000'), // $15M
      yield: 15.5,
      type: 'infrastructure' as const,
      active: true,
      description: 'Modern sustainable fishing fleet with processing facilities',
      images: ['/assets/fisheries-1.jpg', '/assets/fisheries-2.jpg'],
      documents: ['verification-bv.pdf', 'certification-sgs.pdf'],
    },
    {
      id: 'kenya-tech-hub',
      name: 'Nairobi Innovation Center',
      location: 'Nairobi',
      country: 'Kenya',
      value: BigInt('25000000000000000000000000'), // $25M
      yield: 14.2,
      type: 'real-estate' as const,
      active: true,
      description: 'State-of-the-art technology and innovation hub',
      images: ['/assets/tech-hub-1.jpg', '/assets/tech-hub-2.jpg'],
      documents: ['deed-title.pdf', 'valuation-report.pdf'],
    },
    {
      id: 'egypt-solar-farm',
      name: 'Aswan Solar Energy Project',
      location: 'Aswan',
      country: 'Egypt',
      value: BigInt('35000000000000000000000000'), // $35M
      yield: 13.8,
      type: 'energy' as const,
      active: true,
      description: '50MW solar farm with battery storage',
      images: ['/assets/solar-farm-1.jpg', '/assets/solar-farm-2.jpg'],
      documents: ['environmental-impact.pdf', 'energy-audit.pdf'],
    },
    {
      id: 'nigeria-agritech',
      name: 'Lagos AgriTech Complex',
      location: 'Lagos',
      country: 'Nigeria',
      value: BigInt('20000000000000000000000000'), // $20M
      yield: 16.0,
      type: 'agriculture' as const,
      active: true,
      description: 'Vertical farming and agricultural processing facility',
      images: ['/assets/agritech-1.jpg', '/assets/agritech-2.jpg'],
      documents: ['organic-certification.pdf', 'export-license.pdf'],
    },
    {
      id: 'morocco-logistics',
      name: 'Casablanca Logistics Hub',
      location: 'Casablanca',
      country: 'Morocco',
      value: BigInt('30000000000000000000000000'), // $30M
      yield: 12.5,
      type: 'infrastructure' as const,
      active: true,
      description: 'Modern logistics and warehousing facility',
      images: ['/assets/logistics-1.jpg', '/assets/logistics-2.jpg'],
      documents: ['iso-certification.pdf', 'customs-approval.pdf'],
    },
  ] as RWAAsset[],
  
  stakePositions: [
    {
      id: '1',
      amount: BigInt('50000000000000000000000'), // 50,000 tokens
      startTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      lockPeriod: 365,
      apy: 12.0,
      rewards: BigInt('500000000000000000000'), // 500 tokens
      status: 'active' as const,
    },
    {
      id: '2',
      amount: BigInt('100000000000000000000000'), // 100,000 tokens
      startTime: Date.now() - 60 * 24 * 60 * 60 * 1000, // 60 days ago
      lockPeriod: 730,
      apy: 14.0,
      rewards: BigInt('2300000000000000000000'), // 2,300 tokens
      status: 'active' as const,
    },
  ] as StakePosition[],
  
  activities: generateRecentActivities(20),
  
  prices: {
    'royal-rwa': {
      usd: 0.15,
      change24h: 5.2,
      change7d: 12.8,
      high24h: 0.16,
      low24h: 0.14,
    },
    'royal-lp': {
      usd: 1.0,
      change24h: 0.1,
      change7d: 0.3,
      high24h: 1.01,
      low24h: 0.99,
    },
  },
}

// Helper function to generate yield history
function generateYieldHistory(days: number) {
  const history = []
  const now = Date.now()
  const baseYields = { flexible: 10.0, oneYear: 12.0, twoYear: 14.0 }
  
  for (let i = days - 1; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000)
    const variance = (Math.random() - 0.5) * 0.5 // ±0.25% variance
    
    history.push({
      timestamp,
      flexible: baseYields.flexible + variance,
      oneYear: baseYields.oneYear + variance,
      twoYear: baseYields.twoYear + variance,
    })
  }
  
  return history
}

// Helper function to generate recent activities
function generateRecentActivities(count: number) {
  const activities = []
  const types = ['stake', 'unstake', 'claim', 'asset_added', 'trade']
  const addresses = [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f89234',
    '0x123f681646d4a755815f9CB19e1aCc8565A0C2B5',
    '0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed',
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
  ]
  
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const timestamp = Date.now() - (i * 10 * 60 * 1000) // 10 minutes apart
    
    activities.push({
      id: `activity-${i}`,
      type,
      timestamp,
      user: addresses[Math.floor(Math.random() * addresses.length)],
      amount: Math.floor(Math.random() * 100000) + 1000,
      transactionHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
    })
  }
  
  return activities
}

// Mock token information
export const MOCK_TOKENS: Record<string, TokenInfo> = {
  'royal-rwa': {
    address: '0x1234567890123456789012345678901234567890',
    name: 'Royal RWA Token',
    symbol: 'ROYAL',
    decimals: 18,
    totalSupply: BigInt('1000000000000000000000000000'), // 1B tokens
    chainId: 1,
  },
  'royal-lp': {
    address: '0x2345678901234567890123456789012345678901',
    name: 'Royal LP Token',
    symbol: 'ROYAL-LP',
    decimals: 18,
    totalSupply: BigInt('100000000000000000000000000'), // 100M tokens
    chainId: 1,
  },
  'royal-stable': {
    address: '0x3456789012345678901234567890123456789012',
    name: 'Royal Stablecoin',
    symbol: 'rUSD',
    decimals: 6,
    totalSupply: BigInt('500000000000000'), // 500M tokens (6 decimals)
    chainId: 1,
  },
}

// Mock yield options
export const MOCK_YIELD_OPTIONS: YieldData[] = [
  {
    lockPeriod: 0, // Flexible
    apy: 10.0,
    minimumStake: BigInt('1000000000000000000000'), // 1,000 tokens
    availableCapacity: BigInt('50000000000000000000000000'), // 50M tokens
  },
  {
    lockPeriod: 365, // 1 year
    apy: 12.0,
    minimumStake: BigInt('5000000000000000000000'), // 5,000 tokens
    maximumStake: BigInt('1000000000000000000000000'), // 1M tokens
    availableCapacity: BigInt('30000000000000000000000000'), // 30M tokens
  },
  {
    lockPeriod: 730, // 2 years
    apy: 14.0,
    minimumStake: BigInt('10000000000000000000000'), // 10,000 tokens
    maximumStake: BigInt('5000000000000000000000000'), // 5M tokens
    availableCapacity: BigInt('20000000000000000000000000'), // 20M tokens
  },
]

// Export functions to get mock data with simulated delay
export async function getMockData<T>(data: T, delay: number = 100): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, delay))
  return data
}

// Simulate API errors occasionally
export async function getMockDataWithErrors<T>(data: T, errorRate: number = 0.1): Promise<T> {
  if (Math.random() < errorRate) {
    throw new Error('Mock API error')
  }
  return getMockData(data)
}