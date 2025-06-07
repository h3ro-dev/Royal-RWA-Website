import { formatUnits, parseUnits } from 'viem'

// Format token amount with proper decimals
export function formatTokenAmount(
  amount: bigint | string,
  decimals: number = 18,
  displayDecimals: number = 2
): string {
  const amountBigInt = typeof amount === 'string' ? BigInt(amount) : amount
  const formatted = formatUnits(amountBigInt, decimals)
  const num = parseFloat(formatted)
  
  if (num === 0) return '0'
  
  // For very small numbers, show more decimals
  if (num < 0.01 && num > 0) {
    return num.toFixed(6)
  }
  
  // For large numbers, use compact notation
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(2)}M`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)}K`
  }
  
  return num.toFixed(displayDecimals)
}

// Parse token amount from string
export function parseTokenAmount(amount: string, decimals: number = 18): bigint {
  return parseUnits(amount, decimals)
}

// Format USD value
export function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value)
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`
}

// Format date
export function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp))
}

// Format time ago
export function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  
  if (seconds < 60) return `${seconds}s ago`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
  
  return formatDate(timestamp)
}

// Calculate APY returns
export function calculateReturns(
  principal: bigint,
  apy: number,
  days: number
): bigint {
  // APY formula: A = P(1 + r/n)^(nt)
  // Where: A = final amount, P = principal, r = annual rate, n = compounds per year, t = time in years
  // For simplicity, we'll use daily compounding
  
  const principalNum = Number(principal)
  const rate = apy / 100
  const years = days / 365
  const compoundsPerYear = 365
  
  const finalAmount = principalNum * Math.pow(1 + rate / compoundsPerYear, compoundsPerYear * years)
  const returns = finalAmount - principalNum
  
  return BigInt(Math.floor(returns))
}

// Validate Ethereum address
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address)
}

// Shorten address for display
export function shortenAddress(address: string, chars: number = 4): string {
  if (!isValidAddress(address)) return address
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

// Get chain name
export function getChainName(chainId: number): string {
  const chains: Record<number, string> = {
    1: 'Ethereum',
    137: 'Polygon',
    42161: 'Arbitrum',
    10: 'Optimism',
    56: 'BSC',
  }
  return chains[chainId] || 'Unknown'
}

// Get block explorer URL
export function getExplorerUrl(chainId: number, hash: string, type: 'tx' | 'address' = 'tx'): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io',
    137: 'https://polygonscan.com',
    42161: 'https://arbiscan.io',
    10: 'https://optimistic.etherscan.io',
    56: 'https://bscscan.com',
  }
  
  const baseUrl = explorers[chainId] || explorers[1]
  return `${baseUrl}/${type}/${hash}`
}

// Calculate lock period end date
export function calculateLockEndDate(startTime: number, lockDays: number): Date {
  const endTime = startTime + (lockDays * 24 * 60 * 60 * 1000)
  return new Date(endTime)
}

// Check if stake is unlocked
export function isStakeUnlocked(startTime: number, lockDays: number): boolean {
  const endTime = startTime + (lockDays * 24 * 60 * 60 * 1000)
  return Date.now() >= endTime
}

// Get remaining lock time
export function getRemainingLockTime(startTime: number, lockDays: number): string {
  const endTime = startTime + (lockDays * 24 * 60 * 60 * 1000)
  const remaining = endTime - Date.now()
  
  if (remaining <= 0) return 'Unlocked'
  
  const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
  
  if (days > 0) return `${days}d ${hours}h`
  return `${hours}h`
}

// Sort assets by various criteria
export function sortAssets<T extends { value: bigint; yield: number }>(
  assets: T[],
  sortBy: 'value' | 'yield' = 'value',
  order: 'asc' | 'desc' = 'desc'
): T[] {
  return [...assets].sort((a, b) => {
    let comparison = 0
    
    if (sortBy === 'value') {
      comparison = a.value > b.value ? 1 : -1
    } else {
      comparison = a.yield - b.yield
    }
    
    return order === 'desc' ? -comparison : comparison
  })
}

// Calculate portfolio metrics
export function calculatePortfolioMetrics(positions: Array<{ amount: bigint; apy: number }>) {
  if (positions.length === 0) {
    return {
      totalValue: BigInt(0),
      weightedAPY: 0,
      positions: 0,
    }
  }
  
  let totalValue = BigInt(0)
  let weightedAPYSum = 0
  
  for (const position of positions) {
    totalValue += position.amount
    weightedAPYSum += Number(position.amount) * position.apy
  }
  
  const weightedAPY = Number(totalValue) > 0 ? weightedAPYSum / Number(totalValue) : 0
  
  return {
    totalValue,
    weightedAPY,
    positions: positions.length,
  }
}