import { 
  getContract, 
  parseEther, 
  parseUnits, 
  formatUnits 
} from 'viem'
import { getPublicClient, getWalletClient } from 'wagmi/actions'
import { CONTRACTS, ABIS } from '../config/contracts'
import type { 
  TokenInfo, 
  StakePosition, 
  RWAAsset,
  Transaction
} from '../types/engineer3'

// Get contract instance
export function getContractInstance(
  contractName: keyof typeof CONTRACTS,
  chainId: number
) {
  const chainName = getChainName(chainId)
  const address = CONTRACTS[contractName][chainName as keyof typeof CONTRACTS[typeof contractName]]
  const abi = ABIS[contractName as keyof typeof ABIS]
  
  return {
    address,
    abi,
  }
}

// Get chain name from chainId
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

// Token functions
export async function getTokenInfo(
  tokenAddress: string,
  chainId: number
): Promise<TokenInfo> {
  const publicClient = getPublicClient({ chainId })
  const contract = getContract({
    address: tokenAddress as `0x${string}`,
    abi: ABIS.ROYAL_RWA_TOKEN,
    publicClient,
  })
  
  const [name, symbol, decimals, totalSupply] = await Promise.all([
    contract.read.name(),
    contract.read.symbol(),
    contract.read.decimals(),
    contract.read.totalSupply(),
  ])
  
  return {
    name: name as string,
    symbol: symbol as string,
    decimals: decimals as number,
    totalSupply: totalSupply as bigint,
    address: tokenAddress,
    chainId,
  }
}

export async function getTokenBalance(
  tokenAddress: string,
  userAddress: string,
  chainId: number
): Promise<bigint> {
  const publicClient = getPublicClient({ chainId })
  const contract = getContract({
    address: tokenAddress as `0x${string}`,
    abi: ABIS.ROYAL_RWA_TOKEN,
    publicClient,
  })
  
  return contract.read.balanceOf([userAddress]) as Promise<bigint>
}

// Staking functions
export async function stake(
  amount: bigint,
  lockPeriod: number,
  chainId: number
): Promise<string> {
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) throw new Error('No wallet connected')
  
  const { address } = getContractInstance('STAKING', chainId)
  
  const hash = await walletClient.writeContract({
    address: address as `0x${string}`,
    abi: ABIS.STAKING,
    functionName: 'stake',
    args: [amount, BigInt(lockPeriod)],
  })
  
  return hash
}

export async function unstake(
  stakeId: string,
  chainId: number
): Promise<string> {
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) throw new Error('No wallet connected')
  
  const { address } = getContractInstance('STAKING', chainId)
  
  const hash = await walletClient.writeContract({
    address: address as `0x${string}`,
    abi: ABIS.STAKING,
    functionName: 'unstake',
    args: [BigInt(stakeId)],
  })
  
  return hash
}

export async function claimRewards(
  stakeId: string,
  chainId: number
): Promise<string> {
  const walletClient = await getWalletClient({ chainId })
  if (!walletClient) throw new Error('No wallet connected')
  
  const { address } = getContractInstance('STAKING', chainId)
  
  const hash = await walletClient.writeContract({
    address: address as `0x${string}`,
    abi: ABIS.STAKING,
    functionName: 'claimRewards',
    args: [BigInt(stakeId)],
  })
  
  return hash
}

export async function getUserStakes(
  userAddress: string,
  chainId: number
): Promise<StakePosition[]> {
  const publicClient = getPublicClient({ chainId })
  const { address } = getContractInstance('STAKING', chainId)
  
  const contract = getContract({
    address: address as `0x${string}`,
    abi: ABIS.STAKING,
    publicClient,
  })
  
  const stakeIds = await contract.read.getUserStakes([userAddress]) as bigint[]
  
  const stakes = await Promise.all(
    stakeIds.map(async (stakeId) => {
      const [amount, startTime, lockPeriod, rewards] = await contract.read.getStakeInfo([
        userAddress,
        stakeId,
      ]) as [bigint, bigint, bigint, bigint]
      
      const apy = await contract.read.getAPY([lockPeriod]) as bigint
      
      return {
        id: stakeId.toString(),
        amount,
        startTime: Number(startTime),
        lockPeriod: Number(lockPeriod),
        apy: Number(apy) / 100, // Convert from basis points
        rewards,
        status: 'active' as const,
      }
    })
  )
  
  return stakes
}

// RWA Asset functions
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getRWAAssets(_chainId: number): Promise<RWAAsset[]> {
  // const publicClient = getPublicClient({ chainId })
  // const { address } = getContractInstance('RWA_ASSETS', chainId)
  
  // const contract = getContract({
  //   address: address as `0x${string}`,
  //   abi: ABIS.RWA_ASSETS,
  //   publicClient,
  // })
  
  // This is a simplified example - in reality, you'd need to know asset IDs
  // or have a function that returns all asset IDs
  const mockAssets: RWAAsset[] = [
    {
      id: '1',
      name: 'Nairobi Tech Hub',
      type: 'real-estate',
      location: 'Westlands, Nairobi',
      country: 'Kenya',
      value: parseEther('5000000'),
      yield: 12.5,
      active: true,
      description: 'Premium commercial real estate in Nairobi\'s tech district',
      images: ['/assets/nairobi-tech-hub.jpg'],
      documents: ['/docs/nairobi-tech-hub-deed.pdf'],
    },
    {
      id: '2',
      name: 'Lagos Solar Farm',
      type: 'energy',
      location: 'Lekki, Lagos',
      country: 'Nigeria',
      value: parseEther('8000000'),
      yield: 14.2,
      active: true,
      description: '50MW solar power generation facility',
      images: ['/assets/lagos-solar-farm.jpg'],
      documents: ['/docs/lagos-solar-farm-agreement.pdf'],
    },
  ]
  
  return mockAssets
}

export async function getTotalAssetsValue(chainId: number): Promise<bigint> {
  const publicClient = getPublicClient({ chainId })
  const { address } = getContractInstance('RWA_ASSETS', chainId)
  
  const contract = getContract({
    address: address as `0x${string}`,
    abi: ABIS.RWA_ASSETS,
    publicClient,
  })
  
  return contract.read.getTotalAssetsValue() as Promise<bigint>
}

export async function getCollateralizationRatio(chainId: number): Promise<number> {
  const publicClient = getPublicClient({ chainId })
  const { address } = getContractInstance('RWA_ASSETS', chainId)
  
  const contract = getContract({
    address: address as `0x${string}`,
    abi: ABIS.RWA_ASSETS,
    publicClient,
  })
  
  const ratio = await contract.read.getCollateralizationRatio() as bigint
  return Number(ratio) / 100 // Convert from basis points
}

// Utility functions
export function formatTokenAmount(
  amount: bigint,
  decimals: number,
  displayDecimals: number = 2
): string {
  const formatted = formatUnits(amount, decimals)
  const num = parseFloat(formatted)
  return num.toFixed(displayDecimals)
}

export function parseTokenAmount(
  amount: string,
  decimals: number
): bigint {
  return parseUnits(amount, decimals)
}

// Transaction monitoring
export async function waitForTransaction(
  hash: string,
  chainId: number
): Promise<Transaction> {
  const publicClient = getPublicClient({ chainId })
  
  const receipt = await publicClient.waitForTransactionReceipt({
    hash: hash as `0x${string}`,
  })
  
  return {
    hash,
    from: receipt.from,
    to: receipt.to || '',
    value: BigInt(0), // Would need to parse from logs
    timestamp: Date.now(),
    status: receipt.status === 'success' ? 'success' : 'failed',
    type: 'transfer', // Would need to determine from logs
  }
}