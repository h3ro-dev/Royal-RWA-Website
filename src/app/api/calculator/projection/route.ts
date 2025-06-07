import { NextResponse } from 'next/server'
import type { APIResponse } from '../../../../types/engineer3'

interface ProjectionInput {
  amount: string // Amount in tokens
  lockPeriod: number // Lock period in days (0 for flexible)
  compoundFrequency?: 'none' | 'monthly' | 'quarterly' | 'annually'
}

interface ProjectionOutput {
  initialAmount: string
  finalAmount: string
  totalRewards: string
  apy: number
  projectedReturns: Array<{
    month: number
    principal: string
    rewards: string
    total: string
  }>
}

// GET /api/calculator/projection - Calculate yield projections
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const amount = searchParams.get('amount')
    const lockPeriod = parseInt(searchParams.get('lockPeriod') || '0')
    const compoundFrequency = searchParams.get('compound') || 'none'
    
    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json({
        success: false,
        error: 'Invalid amount parameter',
      } as APIResponse<null>, { status: 400 })
    }
    
    // Calculate APY based on lock period
    let apy: number
    if (lockPeriod === 0) {
      apy = 10.0 // Flexible
    } else if (lockPeriod >= 730) {
      apy = 14.0 // 2+ years
    } else if (lockPeriod >= 365) {
      apy = 12.0 // 1+ year
    } else {
      apy = 10.0 // Default to flexible rate
    }
    
    const principal = parseFloat(amount)
    const monthlyRate = apy / 100 / 12
    const projectionMonths = Math.max(12, Math.ceil(lockPeriod / 30))
    const projectedReturns: ProjectionOutput['projectedReturns'] = []
    
    let currentAmount = principal
    let totalRewards = 0
    
    for (let month = 1; month <= projectionMonths; month++) {
      let monthlyReward = currentAmount * monthlyRate
      
      // Apply compounding if specified
      if (compoundFrequency === 'monthly') {
        currentAmount += monthlyReward
      } else if (compoundFrequency === 'quarterly' && month % 3 === 0) {
        // Add previous 3 months of rewards
        currentAmount = principal + totalRewards + monthlyReward
      } else if (compoundFrequency === 'annually' && month % 12 === 0) {
        // Add previous 12 months of rewards
        currentAmount = principal + totalRewards + monthlyReward
      }
      
      totalRewards += monthlyReward
      
      projectedReturns.push({
        month,
        principal: principal.toFixed(2),
        rewards: totalRewards.toFixed(2),
        total: (principal + totalRewards).toFixed(2),
      })
    }
    
    const finalAmount = principal + totalRewards
    
    const projection: ProjectionOutput = {
      initialAmount: principal.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
      totalRewards: totalRewards.toFixed(2),
      apy,
      projectedReturns: projectedReturns.slice(0, 12), // Return first 12 months
    }
    
    return NextResponse.json({
      success: true,
      data: projection,
    } as APIResponse<ProjectionOutput>)
    
  } catch (error) {
    console.error('Error calculating projection:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}

// POST /api/calculator/projection - Calculate complex projections
export async function POST(request: Request) {
  try {
    const body: ProjectionInput = await request.json()
    const { amount, lockPeriod, compoundFrequency = 'none' } = body
    
    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json({
        success: false,
        error: 'Invalid amount',
      } as APIResponse<null>, { status: 400 })
    }
    
    // Calculate APY based on lock period
    let apy: number
    if (lockPeriod === 0) {
      apy = 10.0 // Flexible
    } else if (lockPeriod >= 730) {
      apy = 14.0 // 2+ years
    } else if (lockPeriod >= 365) {
      apy = 12.0 // 1+ year
    } else {
      apy = 10.0 + (lockPeriod / 365) * 2 // Gradual increase
    }
    
    const principal = parseFloat(amount)
    const dailyRate = apy / 100 / 365
    const projectedReturns: ProjectionOutput['projectedReturns'] = []
    
    let currentAmount = principal
    let totalRewards = 0
    
    // Calculate monthly snapshots
    for (let month = 1; month <= 24; month++) {
      const daysInMonth = 30
      let monthlyReward = 0
      
      for (let day = 1; day <= daysInMonth; day++) {
        const dailyReward = currentAmount * dailyRate
        monthlyReward += dailyReward
        
        // Apply daily compounding if specified
        if (compoundFrequency !== 'none') {
          currentAmount += dailyReward
        }
      }
      
      totalRewards += monthlyReward
      
      // Apply compounding at specified intervals
      if (compoundFrequency === 'monthly') {
        // Already compounded daily
      } else if (compoundFrequency === 'quarterly' && month % 3 === 0) {
        currentAmount = principal + totalRewards
      } else if (compoundFrequency === 'annually' && month % 12 === 0) {
        currentAmount = principal + totalRewards
      } else if (compoundFrequency === 'none') {
        currentAmount = principal
      }
      
      projectedReturns.push({
        month,
        principal: principal.toFixed(2),
        rewards: totalRewards.toFixed(2),
        total: (principal + totalRewards).toFixed(2),
      })
    }
    
    const finalAmount = principal + totalRewards
    
    const projection: ProjectionOutput = {
      initialAmount: principal.toFixed(2),
      finalAmount: finalAmount.toFixed(2),
      totalRewards: totalRewards.toFixed(2),
      apy,
      projectedReturns,
    }
    
    return NextResponse.json({
      success: true,
      data: projection,
    } as APIResponse<ProjectionOutput>)
    
  } catch (error) {
    console.error('Error in projection calculation:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}