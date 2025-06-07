import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useAccount, useNetwork } from 'wagmi'
import type { 
  TokenInfo, 
  StakePosition, 
  MarketData,
  YieldData,
  ActivityItem,
  APIResponse
} from '../types/engineer3'

// Base API URL - in production, use environment variable
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Token data hook
export function useTokenData(tokenType: 'rwa' | 'lp' | 'stablecoin') {
  const { address } = useAccount()
  const { chain } = useNetwork()
  
  return useQuery({
    queryKey: ['token', tokenType, address, chain?.id],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: tokenType,
        chainId: chain?.id?.toString() || '1',
        ...(address && { address }),
      })
      
      const response = await fetch(`${API_BASE_URL}/tokens?${params}`)
      const data: APIResponse<TokenInfo> = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch token data')
      }
      
      return data.data
    },
    enabled: !!tokenType,
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}

// User stakes hook
export function useUserStakes() {
  const { address } = useAccount()
  const { chain } = useNetwork()
  
  return useQuery({
    queryKey: ['stakes', address, chain?.id],
    queryFn: async () => {
      if (!address) throw new Error('No wallet connected')
      
      const params = new URLSearchParams({
        action: 'stakes',
        address,
        chainId: chain?.id?.toString() || '1',
      })
      
      const response = await fetch(`${API_BASE_URL}/staking?${params}`)
      const data: APIResponse<StakePosition[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch stakes')
      }
      
      return data.data || []
    },
    enabled: !!address,
    refetchInterval: 60000, // Refresh every minute
  })
}

// Yield options hook
export function useYieldOptions() {
  const { chain } = useNetwork()
  
  return useQuery({
    queryKey: ['yields', chain?.id],
    queryFn: async () => {
      const params = new URLSearchParams({
        action: 'yields',
        chainId: chain?.id?.toString() || '1',
      })
      
      const response = await fetch(`${API_BASE_URL}/staking?${params}`)
      const data: APIResponse<YieldData[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch yield options')
      }
      
      return data.data || []
    },
    staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
  })
}

// Stake mutation hook
export function useStake() {
  const queryClient = useQueryClient()
  const { chain } = useNetwork()
  
  return useMutation({
    mutationFn: async ({ amount, lockPeriod }: { amount: string; lockPeriod: number }) => {
      const response = await fetch(`${API_BASE_URL}/staking`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'stake',
          amount,
          lockPeriod,
          chainId: chain?.id || 1,
        }),
      })
      
      const data: APIResponse<{ transactionHash: string }> = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to stake')
      }
      
      return data.data
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['stakes'] })
      queryClient.invalidateQueries({ queryKey: ['token'] })
    },
  })
}

// RWA Assets hook
export function useRWAAssets(filters?: { country?: string; type?: string }) {
  const { chain } = useNetwork()
  
  return useQuery({
    queryKey: ['assets', filters, chain?.id],
    queryFn: async () => {
      const params = new URLSearchParams({
        chainId: chain?.id?.toString() || '1',
        ...(filters?.country && { country: filters.country }),
        ...(filters?.type && { type: filters.type }),
      })
      
      const response = await fetch(`${API_BASE_URL}/assets?${params}`)
      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch assets')
      }
      
      return data.data || []
    },
    staleTime: 10 * 60 * 1000, // Consider data stale after 10 minutes
  })
}

// Market data hook
export function useMarketData(token?: string) {
  return useQuery({
    queryKey: ['market', token],
    queryFn: async () => {
      const params = token ? `?token=${token}` : ''
      const response = await fetch(`${API_BASE_URL}/market${params}`)
      const data: APIResponse<MarketData | MarketData[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch market data')
      }
      
      return data.data
    },
    refetchInterval: 60000, // Refresh every minute
  })
}

// Activity feed hook
export function useActivityFeed(limit: number = 50) {
  return useQuery({
    queryKey: ['activity', limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        type: 'activity',
        limit: limit.toString(),
      })
      
      const response = await fetch(`${API_BASE_URL}/analytics?${params}`)
      const data: APIResponse<ActivityItem[]> = await response.json()
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch activity')
      }
      
      return data.data || []
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}