import { NextResponse } from 'next/server'
import { getRWAAssets, getTotalAssetsValue, getCollateralizationRatio } from '../../../services/blockchain'
import type { APIResponse, RWAAsset, RWAPortfolio, PaginatedResponse } from '../../../types/engineer3'

// GET /api/assets - Get RWA assets data
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action') // 'list', 'portfolio', or 'details'
    const assetId = searchParams.get('id')
    const country = searchParams.get('country')
    const type = searchParams.get('type')
    const chainId = parseInt(searchParams.get('chainId') || '1')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    
    if (action === 'portfolio') {
      const [assets, totalValue, collateralizationRatio] = await Promise.all([
        getRWAAssets(chainId),
        getTotalAssetsValue(chainId),
        getCollateralizationRatio(chainId),
      ])
      
      // Group assets by type and country
      const assetsByType: Record<string, RWAAsset[]> = {}
      const assetsByCountry: Record<string, RWAAsset[]> = {}
      
      assets.forEach(asset => {
        if (!assetsByType[asset.type]) {
          assetsByType[asset.type] = []
        }
        assetsByType[asset.type].push(asset)
        
        if (!assetsByCountry[asset.country]) {
          assetsByCountry[asset.country] = []
        }
        assetsByCountry[asset.country].push(asset)
      })
      
      const totalYield = assets.reduce((sum, asset) => sum + asset.yield, 0)
      const averageYield = assets.length > 0 ? totalYield / assets.length : 0
      
      const portfolio: RWAPortfolio = {
        totalValue,
        totalAssets: assets.length,
        averageYield,
        collateralizationRatio,
        assetsByType,
        assetsByCountry,
      }
      
      return NextResponse.json({
        success: true,
        data: {
          ...portfolio,
          totalValue: portfolio.totalValue.toString(),
        },
      } as APIResponse<any>)
    }
    
    if (action === 'list' || !action) {
      let assets = await getRWAAssets(chainId)
      
      // Filter by country if specified
      if (country) {
        assets = assets.filter(asset => 
          asset.country.toLowerCase() === country.toLowerCase()
        )
      }
      
      // Filter by type if specified
      if (type) {
        assets = assets.filter(asset => 
          asset.type === type
        )
      }
      
      // Pagination
      const start = (page - 1) * limit
      const end = start + limit
      const paginatedAssets = assets.slice(start, end)
      
      const response: PaginatedResponse<any> = {
        success: true,
        data: paginatedAssets.map(asset => ({
          ...asset,
          value: asset.value.toString(),
        })),
        page,
        limit,
        total: assets.length,
        hasMore: end < assets.length,
      }
      
      return NextResponse.json(response)
    }
    
    if (action === 'details' && assetId) {
      const assets = await getRWAAssets(chainId)
      const asset = assets.find(a => a.id === assetId)
      
      if (!asset) {
        return NextResponse.json({
          success: false,
          error: 'Asset not found',
        } as APIResponse<null>, { status: 404 })
      }
      
      return NextResponse.json({
        success: true,
        data: {
          ...asset,
          value: asset.value.toString(),
        },
      } as APIResponse<any>)
    }
    
    return NextResponse.json({
      success: false,
      error: 'Invalid action or missing parameters',
    } as APIResponse<null>, { status: 400 })
    
  } catch (error) {
    console.error('Error in assets API:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error',
    } as APIResponse<null>, { status: 500 })
  }
}