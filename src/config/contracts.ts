export const CONTRACTS = {
  // Royal RWA Token Contract
  ROYAL_RWA_TOKEN: {
    mainnet: '0x0000000000000000000000000000000000000000', // To be deployed
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    optimism: '0x0000000000000000000000000000000000000000',
    bsc: '0x0000000000000000000000000000000000000000',
  },
  
  // Royal LP Token Contract
  ROYAL_LP_TOKEN: {
    mainnet: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    optimism: '0x0000000000000000000000000000000000000000',
    bsc: '0x0000000000000000000000000000000000000000',
  },
  
  // Royal Stablecoin Contract
  ROYAL_STABLECOIN: {
    mainnet: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    optimism: '0x0000000000000000000000000000000000000000',
    bsc: '0x0000000000000000000000000000000000000000',
  },
  
  // Staking Contract
  STAKING: {
    mainnet: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    optimism: '0x0000000000000000000000000000000000000000',
    bsc: '0x0000000000000000000000000000000000000000',
  },
  
  // RWA Assets Contract
  RWA_ASSETS: {
    mainnet: '0x0000000000000000000000000000000000000000',
    polygon: '0x0000000000000000000000000000000000000000',
    arbitrum: '0x0000000000000000000000000000000000000000',
    optimism: '0x0000000000000000000000000000000000000000',
    bsc: '0x0000000000000000000000000000000000000000',
  },
} as const

// ABIs for smart contracts
export const ABIS = {
  ROYAL_RWA_TOKEN: [
    'function name() view returns (string)',
    'function symbol() view returns (string)',
    'function decimals() view returns (uint8)',
    'function totalSupply() view returns (uint256)',
    'function balanceOf(address account) view returns (uint256)',
    'function transfer(address to, uint256 amount) returns (bool)',
    'function allowance(address owner, address spender) view returns (uint256)',
    'function approve(address spender, uint256 amount) returns (bool)',
    'function transferFrom(address from, address to, uint256 amount) returns (bool)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    'event Approval(address indexed owner, address indexed spender, uint256 value)',
  ],
  
  STAKING: [
    'function stake(uint256 amount, uint256 lockPeriod) returns (bool)',
    'function unstake(uint256 stakeId) returns (bool)',
    'function claimRewards(uint256 stakeId) returns (bool)',
    'function getStakeInfo(address user, uint256 stakeId) view returns (uint256 amount, uint256 startTime, uint256 lockPeriod, uint256 rewards)',
    'function getUserStakes(address user) view returns (uint256[] memory)',
    'function calculateRewards(address user, uint256 stakeId) view returns (uint256)',
    'function getAPY(uint256 lockPeriod) view returns (uint256)',
    'event Staked(address indexed user, uint256 indexed stakeId, uint256 amount, uint256 lockPeriod)',
    'event Unstaked(address indexed user, uint256 indexed stakeId, uint256 amount)',
    'event RewardsClaimed(address indexed user, uint256 indexed stakeId, uint256 rewards)',
  ],
  
  RWA_ASSETS: [
    'function getAssetInfo(uint256 assetId) view returns (string memory name, string memory location, uint256 value, uint256 yield, bool active)',
    'function getTotalAssetsValue() view returns (uint256)',
    'function getCollateralizationRatio() view returns (uint256)',
    'function getAssetsByRegion(string memory region) view returns (uint256[] memory)',
    'function getAssetsByType(string memory assetType) view returns (uint256[] memory)',
    'event AssetAdded(uint256 indexed assetId, string name, string location, uint256 value)',
    'event AssetUpdated(uint256 indexed assetId, uint256 newValue, uint256 newYield)',
  ],
} as const