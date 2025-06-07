import { NextResponse } from 'next/server'
import type { APIResponse } from '../../../../types/engineer3'

interface YieldStats {
  current: {
    flexible: number
    oneYear: number
    twoYear: number
  }
  averageAPY: number
  totalRewardsPaid: string
  monthlyRewardRate: string
  historical: Array<{
    date: string
    flexible: number
    oneYear: number
    twoYear: number
  }>
  projectedYields: {
    nextMonth: string
    nextQuarter: string
    nextYear: string
  }
  topPerformers: Array<{
    address: string
    earned: string
    apy: number
    lockPeriod: number
  }>
}

// Mock historical yield data generator
function generateHistoricalYields(days: number): YieldStats['historical'] {
  const history = []
  const now = new Date()
  
  // Base APYs
  const baseFlexible = 10.0
  const baseOneYear = 12.0
  const baseTwoYear = 14.0
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Add some variance to simulate market conditions
    const marketFactor = 0.95 + Math.random() * 0.1 // ±5% variance
    
    history.push({
      date: date.toISOString().split('T')[0],
      flexible: parseFloat((baseFlexible * marketFactor).toFixed(2)),
      oneYear: parseFloat((baseOneYear * marketFactor).toFixed(2)),
      twoYear: parseFloat((baseTwoYear * marketFactor).toFixed(2)),
    })
  }
  
  return history
}

// Mock top performers data
function generateTopPerformers(): YieldStats['topPerformers'] {
  const performers = []
  const addresses = [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f89234',
    '0x123f681646d4a755815f9CB19e1aCc8565A0C2B5',
    '0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed',
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    '0x2546BcD3c84621e976D8185a7D0e86eC8A7E3c62',
  ]
  
  for (const address of addresses) {
    const earned = BigInt(Math.floor(Math.random() * 1000000 + 100000)) * BigInt('1000000000000000000')
    const lockPeriod = [0, 365, 730][Math.floor(Math.random() * 3)]
    const apy = lockPeriod === 0 ? 10.0 : lockPeriod === 365 ? 12.0 : 14.0
    
    performers.push({
      address,
      earned: earned.toString(),
      apy,
      lockPeriod,
    })
  }
  
  return performers.sort((a, b) => BigInt(b.earned) > BigInt(a.earned) ? 1 : -1).slice(0, 5)
}

// GET /api/stats/yields - Get yield statistics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'
    const chainId = parseInt(searchParams.get('chainId') || '1')
    
    // Determine days for historical data
    let days = 30
    switch (period) {
      case '7d':
        days = 7
        break
      case '30d':
        days = 30
        break
      case '90d':
        days = 90
        break
      case '1y':
        days = 365
        break
    }
    
    const historical = generateHistoricalYields(days)
    const latestYields = historical[historical.length - 1]
    
    // Calculate average APY
    const averageAPY = (latestYields.flexible + latestYields.oneYear + latestYields.twoYear) / 3
    
    // Mock rewards data
    const totalRewardsPaid = BigInt('25000000000000000000000000') // 25M tokens
    const monthlyRewardRate = BigInt('2000000000000000000000000') // 2M tokens/month
    
    // Calculate projected yields based on current rates and TVL
    const currentTVL = BigInt('150000000000000000000000000') // $150M
    const projectedMonthly = (currentTVL * BigInt(Math.floor(averageAPY * 100))) / BigInt(1200)
    const projectedQuarterly = projectedMonthly * BigInt(3)
    const projectedYearly = projectedMonthly * BigInt(12)
    
    const yieldStats: YieldStats = {
      current: {
        flexible: latestYields.flexible,
        oneYear: latestYields.oneYear,
        twoYear: latestYields.twoYear,
      },
      averageAPY: parseFloat(averageAPY.toFixed(2)),
      totalRewardsPaid: totalRewardsPaid.toString(),
      monthlyRewardRate: monthlyRewardRate.toString(),
      historical: historical.slice(-Math.min(days, historical.length)),
      projectedYields: {
        nextMonth: projectedMonthly.toString(),
        nextQuarter: projectedQuarterly.toString(),
        nextYear: projectedYearly.toString(),
      },
      topPerformers: generateTopPerformers(),
    }
    
    return NextResponse.json({
      success: true,
      data: yieldStats,
    } as APIResponse<YieldStats>)
    
  } catch (error) {
    console.error('Error fetching yield stats:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}