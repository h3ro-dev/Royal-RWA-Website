import { NextResponse } from 'next/server'
import type { APIResponse, MarketData } from '../../../types/engineer3'

// Mock market data - in production, this would come from price oracles or external APIs
const mockMarketData: Record<string, MarketData> = {
  'royal-rwa': {
    price: 0.15,
    priceChange24h: 5.2,
    volume24h: 2500000,
    marketCap: 7500000000,
    circulatingSupply: BigInt('50000000000000000000000000000'), // 50B tokens
    timestamp: Date.now(),
  },
  'royal-lp': {
    price: 1.0,
    priceChange24h: 0.1,
    volume24h: 500000,
    marketCap: 1000000000,
    circulatingSupply: BigInt('1000000000000000000000000000'), // 1B tokens
    timestamp: Date.now(),
  },
  'royal-stablecoin': {
    price: 1.0,
    priceChange24h: 0.02,
    volume24h: 10000000,
    marketCap: 500000000,
    circulatingSupply: BigInt('500000000000000000000000000'), // 500M tokens
    timestamp: Date.now(),
  },
}

// GET /api/market - Get market data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token') // 'royal-rwa', 'royal-lp', or 'royal-stablecoin'
    const period = searchParams.get('period') || '24h' // '1h', '24h', '7d', '30d'
    
    if (token && mockMarketData[token]) {
      return NextResponse.json({
        success: true,
        data: {
          ...mockMarketData[token],
          circulatingSupply: mockMarketData[token].circulatingSupply.toString(),
        },
      } as APIResponse<any>)
    }
    
    if (!token) {
      // Return all market data
      const allMarketData = Object.entries(mockMarketData).map(([key, data]) => ({
        token: key,
        ...data,
        circulatingSupply: data.circulatingSupply.toString(),
      }))
      
      return NextResponse.json({
        success: true,
        data: allMarketData,
      } as APIResponse<any[]>)
    }
    
    // Historical price data
    if (token && period) {
      const generateHistoricalData = (basePrice: number, days: number) => {
        const data: Array<{
          timestamp: number
          price: number
          volume: number
        }> = []
        const now = Date.now()
        const interval = 86400000 // 1 day in milliseconds
        
        for (let i = days; i >= 0; i--) {
          const timestamp = now - (i * interval)
          const variance = (Math.random() - 0.5) * 0.1 // ±5% variance
          const price = basePrice * (1 + variance)
          
          data.push({
            timestamp,
            price: parseFloat(price.toFixed(4)),
            volume: Math.floor(Math.random() * 5000000) + 1000000,
          })
        }
        
        return data
      }
      
      let days = 1
      switch (period) {
        case '1h':
          days = 0.04 // ~1 hour worth of data points
          break
        case '24h':
          days = 1
          break
        case '7d':
          days = 7
          break
        case '30d':
          days = 30
          break
      }
      
      const basePrice = mockMarketData[token]?.price || 1
      const historicalData = generateHistoricalData(basePrice, days)
      
      return NextResponse.json({
        success: true,
        data: {
          token,
          period,
          data: historicalData,
        },
      } as APIResponse<any>)
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid token',
    } as APIResponse<null>, { status: 400 })
    
  } catch (error) {
    console.error('Error in market API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}