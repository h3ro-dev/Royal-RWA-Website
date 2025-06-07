import { NextResponse } from 'next/server'
import { getTotalAssetsValue } from '../../../../services/blockchain'
import type { APIResponse } from '../../../../types/engineer3'

interface TVLData {
  current: string
  change24h: number
  change7d: number
  change30d: number
  breakdown: {
    stakedTokens: string
    rwaAssets: string
    liquidityPools: string
  }
  history: Array<{
    timestamp: number
    value: string
  }>
}

// Mock historical TVL data generator
function generateHistoricalTVL(days: number): Array<{ timestamp: number; value: string }> {
  const history = []
  const now = Date.now()
  const baseValue = 125000000 // $125M base
  
  for (let i = days; i >= 0; i--) {
    const timestamp = now - (i * 24 * 60 * 60 * 1000)
    // Add some variance to simulate growth
    const growthFactor = 1 + ((days - i) / days) * 0.2 // 20% growth over period
    const dailyVariance = (Math.random() - 0.5) * 0.05 // ±2.5% daily variance
    const value = baseValue * growthFactor * (1 + dailyVariance)
    
    history.push({
      timestamp,
      value: Math.floor(value).toString(),
    })
  }
  
  return history
}

// GET /api/stats/tvl - Get total value locked statistics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const chainId = parseInt(searchParams.get('chainId') || '1')
    const period = searchParams.get('period') || '7d' // 24h, 7d, 30d, all
    
    // Get real RWA assets value from blockchain
    const rwaAssetsValue = await getTotalAssetsValue(chainId)
    
    // Mock other TVL components
    const stakedTokensValue = BigInt('75000000000000000000000000') // $75M
    const liquidityPoolsValue = BigInt('50000000000000000000000000') // $50M
    
    const totalTVL = rwaAssetsValue + stakedTokensValue + liquidityPoolsValue
    
    // Generate historical data based on period
    let historyDays = 7
    switch (period) {
      case '24h':
        historyDays = 1
        break
      case '7d':
        historyDays = 7
        break
      case '30d':
        historyDays = 30
        break
      case 'all':
        historyDays = 365
        break
    }
    
    const history = generateHistoricalTVL(historyDays)
    
    // Calculate percentage changes
    const currentValue = parseFloat(totalTVL.toString()) / 1e6 // Convert to millions
    const value24hAgo = parseFloat(history[Math.max(0, history.length - 2)]?.value || '0')
    const value7dAgo = parseFloat(history[Math.max(0, history.length - 8)]?.value || '0')
    const value30dAgo = parseFloat(history[Math.max(0, history.length - 31)]?.value || '0')
    
    const change24h = value24hAgo > 0 ? ((currentValue - value24hAgo) / value24hAgo) * 100 : 0
    const change7d = value7dAgo > 0 ? ((currentValue - value7dAgo) / value7dAgo) * 100 : 0
    const change30d = value30dAgo > 0 ? ((currentValue - value30dAgo) / value30dAgo) * 100 : 0
    
    const tvlData: TVLData = {
      current: totalTVL.toString(),
      change24h: parseFloat(change24h.toFixed(2)),
      change7d: parseFloat(change7d.toFixed(2)),
      change30d: parseFloat(change30d.toFixed(2)),
      breakdown: {
        stakedTokens: stakedTokensValue.toString(),
        rwaAssets: rwaAssetsValue.toString(),
        liquidityPools: liquidityPoolsValue.toString(),
      },
      history,
    }
    
    return NextResponse.json({
      success: true,
      data: tvlData,
    } as APIResponse<TVLData>)
    
  } catch (error) {
    console.error('Error fetching TVL data:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}