import { NextResponse } from 'next/server'
import { getUserStakes, stake, unstake, claimRewards } from '../../../services/blockchain'
import type { APIResponse, StakePosition, YieldData } from '../../../types/engineer3'

// GET /api/staking - Get user stakes or yield data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') // 'stakes' or 'yields'
    const userAddress = searchParams.get('address')
    const chainId = parseInt(searchParams.get('chainId') || '1')
    
    if (action === 'stakes' && userAddress) {
      const stakes = await getUserStakes(userAddress, chainId)
      
      return NextResponse.json({
        success: true,
        data: stakes,
      } as APIResponse<StakePosition[]>)
    }
    
    if (action === 'yields') {
      // Return available yield options
      const yieldOptions: YieldData[] = [
        {
          lockPeriod: 0, // Flexible
          apy: 10,
          minimumStake: BigInt('1000000000000000000000'), // 1000 tokens
          availableCapacity: BigInt('50000000000000000000000000'), // 50M tokens
        },
        {
          lockPeriod: 365, // 1 year
          apy: 12,
          minimumStake: BigInt('5000000000000000000000'), // 5000 tokens
          maximumStake: BigInt('1000000000000000000000000'), // 1M tokens
          availableCapacity: BigInt('30000000000000000000000000'), // 30M tokens
        },
        {
          lockPeriod: 730, // 2 years
          apy: 14,
          minimumStake: BigInt('10000000000000000000000'), // 10000 tokens
          maximumStake: BigInt('5000000000000000000000000'), // 5M tokens
          availableCapacity: BigInt('20000000000000000000000000'), // 20M tokens
        },
      ]
      
      return NextResponse.json({
        success: true,
        data: yieldOptions.map(option => ({
          ...option,
          minimumStake: option.minimumStake.toString(),
          maximumStake: option.maximumStake?.toString(),
          availableCapacity: option.availableCapacity.toString(),
        })),
      } as APIResponse<Array<{
        lockPeriod: number;
        apy: number;
        minimumStake: string;
        maximumStake?: string;
        availableCapacity: string;
      }>>)
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action or missing parameters',
    } as APIResponse<null>, { status: 400 })
    
  } catch (error) {
    console.error('Error in staking API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}

// POST /api/staking - Perform staking actions
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, amount, lockPeriod, stakeId, chainId = 1 } = body
    
    let result: string
    
    switch (action) {
      case 'stake':
        if (!amount || lockPeriod === undefined) {
          return NextResponse.json({
            success: false,
            error: 'Missing amount or lockPeriod',
          } as APIResponse<null>, { status: 400 })
        }
        result = await stake(BigInt(amount), lockPeriod, chainId)
        break
        
      case 'unstake':
        if (!stakeId) {
          return NextResponse.json({
            success: false,
            error: 'Missing stakeId',
          } as APIResponse<null>, { status: 400 })
        }
        result = await unstake(stakeId, chainId)
        break
        
      case 'claim':
        if (!stakeId) {
          return NextResponse.json({
            success: false,
            error: 'Missing stakeId',
          } as APIResponse<null>, { status: 400 })
        }
        result = await claimRewards(stakeId, chainId)
        break
        
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action',
        } as APIResponse<null>, { status: 400 })
    }
    
    return NextResponse.json({
      success: true,
      data: { transactionHash: result },
    } as APIResponse<{ transactionHash: string }>)
    
  } catch (error) {
    console.error('Error in staking POST:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}