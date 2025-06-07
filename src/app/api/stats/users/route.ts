import { NextResponse } from 'next/server'
import type { APIResponse } from '../../../../types/engineer3'

interface UserStats {
  totalUsers: number
  activeUsers: number
  newUsers24h: number
  newUsers7d: number
  newUsers30d: number
  averageHolding: string
  medianHolding: string
  distribution: {
    whales: number // > $1M
    dolphins: number // $100k - $1M
    fish: number // $10k - $100k
    shrimp: number // < $10k
  }
  topCountries: Array<{
    country: string
    users: number
    percentage: number
  }>
  growth: Array<{
    date: string
    totalUsers: number
    activeUsers: number
    newUsers: number
  }>
}

// Mock user growth data generator
function generateUserGrowth(days: number): UserStats['growth'] {
  const growth = []
  const now = new Date()
  const baseUsers = 10000
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    
    // Simulate growth
    const growthRate = 0.005 // 0.5% daily growth
    const totalUsers = Math.floor(baseUsers * Math.pow(1 + growthRate, days - i))
    const activeUsers = Math.floor(totalUsers * (0.6 + Math.random() * 0.2)) // 60-80% active
    const newUsers = Math.floor(totalUsers * growthRate * (0.8 + Math.random() * 0.4))
    
    growth.push({
      date: date.toISOString().split('T')[0],
      totalUsers,
      activeUsers,
      newUsers,
    })
  }
  
  return growth
}

// GET /api/stats/users - Get user statistics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'
    const chainId = parseInt(searchParams.get('chainId') || '1')
    
    // Determine the number of days for historical data
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
      case 'all':
        days = 365
        break
    }
    
    const growth = generateUserGrowth(days)
    const latestData = growth[growth.length - 1]
    
    // Calculate new users for different periods
    const now = Date.now()
    const oneDayAgo = now - 24 * 60 * 60 * 1000
    const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000
    const thirtyDaysAgo = now - 30 * 24 * 60 * 60 * 1000
    
    const newUsers24h = growth
      .filter(g => new Date(g.date).getTime() > oneDayAgo)
      .reduce((sum, g) => sum + g.newUsers, 0)
    
    const newUsers7d = growth
      .filter(g => new Date(g.date).getTime() > sevenDaysAgo)
      .reduce((sum, g) => sum + g.newUsers, 0)
    
    const newUsers30d = growth
      .filter(g => new Date(g.date).getTime() > thirtyDaysAgo)
      .reduce((sum, g) => sum + g.newUsers, 0)
    
    // Mock user distribution
    const totalUsers = latestData.totalUsers
    const distribution = {
      whales: Math.floor(totalUsers * 0.01), // 1%
      dolphins: Math.floor(totalUsers * 0.09), // 9%
      fish: Math.floor(totalUsers * 0.30), // 30%
      shrimp: Math.floor(totalUsers * 0.60), // 60%
    }
    
    // Mock top countries
    const topCountries = [
      { country: 'United States', users: Math.floor(totalUsers * 0.25), percentage: 25 },
      { country: 'Kenya', users: Math.floor(totalUsers * 0.15), percentage: 15 },
      { country: 'Nigeria', users: Math.floor(totalUsers * 0.12), percentage: 12 },
      { country: 'India', users: Math.floor(totalUsers * 0.10), percentage: 10 },
      { country: 'Egypt', users: Math.floor(totalUsers * 0.08), percentage: 8 },
      { country: 'Brazil', users: Math.floor(totalUsers * 0.06), percentage: 6 },
      { country: 'Indonesia', users: Math.floor(totalUsers * 0.05), percentage: 5 },
      { country: 'Others', users: Math.floor(totalUsers * 0.19), percentage: 19 },
    ]
    
    const userStats: UserStats = {
      totalUsers: latestData.totalUsers,
      activeUsers: latestData.activeUsers,
      newUsers24h,
      newUsers7d,
      newUsers30d,
      averageHolding: '42500000000000000000000', // 42,500 tokens
      medianHolding: '15000000000000000000000', // 15,000 tokens
      distribution,
      topCountries,
      growth: growth.slice(-Math.min(days, growth.length)), // Return requested period
    }
    
    return NextResponse.json({
      success: true,
      data: userStats,
    } as APIResponse<UserStats>)
    
  } catch (error) {
    console.error('Error fetching user stats:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}