// Token related types
export interface TokenInfo {
  name: string
  symbol: string
  decimals: number
  totalSupply: bigint
  address: string
  chainId: number
}

export interface TokenBalance {
  token: TokenInfo
  balance: bigint
  formattedBalance: string
  value: number // USD value
}

// Staking related types
export interface StakePosition {
  id: string
  amount: bigint
  startTime: number
  lockPeriod: number // in days
  apy: number
  rewards: bigint
  status: 'active' | 'completed' | 'withdrawn'
}

export interface StakingStats {
  totalStaked: bigint
  totalRewards: bigint
  averageAPY: number
  positions: StakePosition[]
}

// RWA Asset types
export interface RWAAsset {
  id: string
  name: string
  type: 'real-estate' | 'infrastructure' | 'agriculture' | 'energy' | 'mining'
  location: string
  country: string
  value: bigint
  yield: number // Annual yield percentage
  active: boolean
  description: string
  images: string[]
  documents: string[]
}

export interface RWAPortfolio {
  totalValue: bigint
  totalAssets: number
  averageYield: number
  collateralizationRatio: number
  assetsByType: Record<string, RWAAsset[]>
  assetsByCountry: Record<string, RWAAsset[]>
}

// Market data types
export interface MarketData {
  price: number
  priceChange24h: number
  volume24h: number
  marketCap: number
  circulatingSupply: bigint
  timestamp: number
}

export interface YieldData {
  lockPeriod: number
  apy: number
  minimumStake: bigint
  maximumStake?: bigint
  availableCapacity: bigint
}

// Transaction types
export interface Transaction {
  hash: string
  from: string
  to: string
  value: bigint
  timestamp: number
  status: 'pending' | 'success' | 'failed'
  type: 'stake' | 'unstake' | 'claim' | 'transfer' | 'swap'
  metadata?: any
}

// API response types
export interface APIResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> extends APIResponse<T[]> {
  page: number
  limit: number
  total: number
  hasMore: boolean
}

// User data types
export interface UserProfile {
  address: string
  ens?: string
  totalStaked: bigint
  totalRewards: bigint
  stakingPositions: StakePosition[]
  tokenBalances: TokenBalance[]
  transactionHistory: Transaction[]
  kycStatus: 'none' | 'pending' | 'verified' | 'rejected'
}

// Activity feed types
export interface ActivityItem {
  id: string
  type: 'stake' | 'unstake' | 'claim' | 'asset_added' | 'asset_updated'
  user?: string
  amount?: bigint
  asset?: RWAAsset
  timestamp: number
  transactionHash?: string
}

// Analytics types
export interface Analytics {
  totalValueLocked: bigint
  totalUsers: number
  totalTransactions: number
  averageStakeSize: bigint
  topStakers: Array<{
    address: string
    amount: bigint
  }>
  assetPerformance: Array<{
    assetId: string
    yield: number
    value: bigint
  }>
}