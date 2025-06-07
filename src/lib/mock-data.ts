// Mock data for development - will be replaced with real API calls

export const MOCK_TVL = 125000000
export const MOCK_USERS = 12543
export const MOCK_APY = { 
  flexible: 10, 
  year1: 12, 
  year2: 14 
}

export const MOCK_ACTIVITY = [
  {
    id: '1',
    type: 'stake',
    user: '0x742d...9812',
    amount: 50000,
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 mins ago
    apy: 12
  },
  {
    id: '2',
    type: 'stake',
    user: '0x8f3a...2145',
    amount: 100000,
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    apy: 14
  },
  {
    id: '3',
    type: 'unstake',
    user: '0x1bc9...7823',
    amount: 25000,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
    apy: 10
  }
]

export const MOCK_PORTFOLIO_STATS = {
  totalValue: 125000000,
  totalAssets: 42,
  averageYield: 10.5,
  countries: 7,
  assetTypes: {
    realEstate: 15,
    infrastructure: 10,
    energy: 8,
    industrial: 9
  }
}

export const MOCK_USER_STAKE = {
  balance: 50000,
  stakedAmount: 35000,
  earnings: 4200,
  stakingPeriod: 'year1',
  startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 90), // 90 days ago
  projectedReturn: 39200
}