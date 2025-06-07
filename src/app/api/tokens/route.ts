import { NextResponse } from 'next/server'
import { getTokenInfo, getTokenBalance } from '../../../services/blockchain'
import { CONTRACTS } from '../../../config/contracts'
import type { APIResponse, TokenInfo } from '../../../types/engineer3'

// GET /api/tokens - Get token information
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tokenType = searchParams.get('type') // 'rwa', 'lp', or 'stablecoin'
    const chainId = parseInt(searchParams.get('chainId') || '1')
    const userAddress = searchParams.get('address')
    
    let tokenAddress: string
    
    switch (tokenType) {
      case 'rwa':
        tokenAddress = CONTRACTS.ROYAL_RWA_TOKEN[getChainName(chainId) as keyof typeof CONTRACTS.ROYAL_RWA_TOKEN]
        break
      case 'lp':
        tokenAddress = CONTRACTS.ROYAL_LP_TOKEN[getChainName(chainId) as keyof typeof CONTRACTS.ROYAL_LP_TOKEN]
        break
      case 'stablecoin':
        tokenAddress = CONTRACTS.ROYAL_STABLECOIN[getChainName(chainId) as keyof typeof CONTRACTS.ROYAL_STABLECOIN]
        break
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid token type',
        } as APIResponse<null>, { status: 400 })
    }
    
    const tokenInfo = await getTokenInfo(tokenAddress, chainId)
    
    let balance: bigint | undefined
    if (userAddress) {
      balance = await getTokenBalance(tokenAddress, userAddress, chainId)
    }
    
    const response: APIResponse<any> = {
      success: true,
      data: {
        ...tokenInfo,
        balance: balance?.toString(),
        formattedBalance: balance ? formatBalance(balance, tokenInfo.decimals) : undefined,
      },
    }
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching token data:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}

// Helper functions
function getChainName(chainId: number): string {
  const chainMap: Record<number, string> = {
    1: 'mainnet',
    137: 'polygon',
    42161: 'arbitrum',
    10: 'optimism',
    56: 'bsc',
  }
  return chainMap[chainId] || 'mainnet'
}

function formatBalance(balance: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals)
  const wholePart = balance / divisor
  const fractionalPart = balance % divisor
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0')
  const significantDecimals = fractionalStr.slice(0, 4)
  
  return `${wholePart}.${significantDecimals}`
}