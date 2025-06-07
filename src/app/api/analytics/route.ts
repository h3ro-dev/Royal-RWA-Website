import { NextResponse } from 'next/server'
import { getTotalAssetsValue } from '../../../services/blockchain'
import type { APIResponse, Analytics, ActivityItem } from '../../../types/engineer3'

// Mock data for demonstration - in production, this would come from a database or indexer
const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'stake',
    user: '0x1234567890123456789012345678901234567890',
    amount: BigInt('50000000000000000000000'), // 50,000 tokens
    timestamp: Date.now() - 3600000, // 1 hour ago
    transactionHash: '0xabc123...',
  },
  {
    id: '2',
    type: 'asset_added',
    asset: {
      id: '3',
      name: 'Cairo Smart City Phase 2',
      type: 'real-estate',
      location: 'New Cairo',
      country: 'Egypt',
      value: BigInt('12000000000000000000000000'), // $12M
      yield: 13.5,
      active: true,
      description: 'Mixed-use development in Egypt\'s new administrative capital',
      images: [],
      documents: [],
    },
    timestamp: Date.now() - 7200000, // 2 hours ago
  },
  {
    id: '3',
    type: 'claim',
    user: '0x9876543210987654321098765432109876543210',
    amount: BigInt('1200000000000000000000'), // 1,200 tokens
    timestamp: Date.now() - 10800000, // 3 hours ago
    transactionHash: '0xdef456...',
  },
]

// GET /api/analytics - Get platform analytics
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'overview', 'activity', or 'performance'
    const chainId = parseInt(searchParams.get('chainId') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    if (type === 'overview') {
      // Get total value locked (sum of all staked tokens + assets value)
      const totalAssetsValue = await getTotalAssetsValue(chainId)
      
      // Mock TVL calculation - in production, get from staking contract
      const totalStakedValue = BigInt('150000000000000000000000000') // $150M
      const totalValueLocked = totalAssetsValue + totalStakedValue
      
      // Mock analytics data
      const analytics: Analytics = {
        totalValueLocked,
        totalUsers: 12543,
        totalTransactions: 89234,
        averageStakeSize: BigInt('12000000000000000000000'), // 12,000 tokens
        topStakers: [
          {
            address: '0x1234567890123456789012345678901234567890',
            amount: BigInt('5000000000000000000000000'), // 5M tokens
          },
          {
            address: '0x2345678901234567890123456789012345678901',
            amount: BigInt('3500000000000000000000000'), // 3.5M tokens
          },
          {
            address: '0x3456789012345678901234567890123456789012',
            amount: BigInt('2800000000000000000000000'), // 2.8M tokens
          },
        ],
        assetPerformance: [
          {
            assetId: '1',
            yield: 12.5,
            value: BigInt('5000000000000000000000000'), // $5M
          },
          {
            assetId: '2',
            yield: 14.2,
            value: BigInt('8000000000000000000000000'), // $8M
          },
        ],
      }
      
      return NextResponse.json({
        success: true,
        data: {
          ...analytics,
          totalValueLocked: analytics.totalValueLocked.toString(),
          averageStakeSize: analytics.averageStakeSize.toString(),
          topStakers: analytics.topStakers.map(staker => ({
            address: staker.address,
            amount: staker.amount.toString(),
          })),
          assetPerformance: analytics.assetPerformance.map(perf => ({
            ...perf,
            value: perf.value.toString(),
          })),
        },
      } as APIResponse<{
        totalValueLocked: string;
        totalUsers: number;
        totalTransactions: number;
        averageStakeSize: string;
        topStakers: Array<{ address: string; amount: string }>;
        assetPerformance: Array<{ assetId: string; yield: number; value: string }>;
      }>)
    }
    
    if (type === 'activity') {
      // Return recent activity feed
      const activities = mockActivities
        .slice(0, limit)
        .map(activity => ({
          ...activity,
          amount: activity.amount?.toString(),
          asset: activity.asset ? {
            ...activity.asset,
            value: activity.asset.value.toString(),
          } : undefined,
        }))
      
      return NextResponse.json({
        success: true,
        data: activities,
      } as APIResponse<typeof activities>)
    }
    
    if (type === 'performance') {
      // Return performance metrics over time
      const performanceData = {
        tvl: [
          { date: '2024-01-01', value: '100000000' },
          { date: '2024-01-15', value: '120000000' },
          { date: '2024-02-01', value: '150000000' },
          { date: '2024-02-15', value: '180000000' },
          { date: '2024-03-01', value: '210000000' },
        ],
        apy: [
          { date: '2024-01-01', flexible: 10, oneYear: 12, twoYear: 14 },
          { date: '2024-01-15', flexible: 10, oneYear: 12, twoYear: 14 },
          { date: '2024-02-01', flexible: 10, oneYear: 12, twoYear: 14 },
          { date: '2024-02-15', flexible: 10, oneYear: 12, twoYear: 14 },
          { date: '2024-03-01', flexible: 10, oneYear: 12, twoYear: 14 },
        ],
        users: [
          { date: '2024-01-01', count: 5000 },
          { date: '2024-01-15', count: 7500 },
          { date: '2024-02-01', count: 10000 },
          { date: '2024-02-15', count: 11500 },
          { date: '2024-03-01', count: 12543 },
        ],
      }
      
      return NextResponse.json({
        success: true,
        data: performanceData,
      } as APIResponse<typeof performanceData>)
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid type parameter',
    } as APIResponse<null>, { status: 400 })
    
  } catch (error) {
    console.error('Error in analytics API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}