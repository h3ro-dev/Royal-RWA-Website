'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Building2, Factory, Zap, Home, TrendingUp, MapPin, DollarSign, Calendar } from 'lucide-react'

interface Asset {
  id: string
  name: string
  type: 'real-estate' | 'infrastructure' | 'energy' | 'industrial'
  location: string
  value: number
  yield: number
  image: string
  description: string
  details: {
    size?: string
    tenants?: number
    capacity?: string
    built?: string
  }
}

const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Nairobi Tech Park',
    type: 'real-estate',
    location: 'Nairobi, Kenya',
    value: 15000000,
    yield: 8.5,
    image: '/assets/nairobi-tech-park.jpg',
    description: 'Premium commercial office space in Kenya\'s tech hub',
    details: {
      size: '50,000 sq ft',
      tenants: 12,
      built: '2022'
    }
  },
  {
    id: '2',
    name: 'Lagos Solar Farm',
    type: 'energy',
    location: 'Lagos, Nigeria',
    value: 25000000,
    yield: 12,
    image: '/assets/lagos-solar.jpg',
    description: 'Large-scale solar installation powering 10,000 homes',
    details: {
      capacity: '25 MW',
      built: '2023'
    }
  },
  {
    id: '3',
    name: 'Cairo Logistics Center',
    type: 'infrastructure',
    location: 'Cairo, Egypt',
    value: 30000000,
    yield: 9.5,
    image: '/assets/cairo-logistics.jpg',
    description: 'Strategic distribution hub for North Africa',
    details: {
      size: '200,000 sq ft',
      tenants: 8,
      built: '2021'
    }
  },
  {
    id: '4',
    name: 'Accra Manufacturing Plant',
    type: 'industrial',
    location: 'Accra, Ghana',
    value: 20000000,
    yield: 11,
    image: '/assets/accra-plant.jpg',
    description: 'Modern manufacturing facility for consumer goods',
    details: {
      size: '100,000 sq ft',
      capacity: '5,000 units/day',
      built: '2022'
    }
  }
]

const assetTypeIcons = {
  'real-estate': <Building2 className="w-5 h-5" />,
  'infrastructure': <Factory className="w-5 h-5" />,
  'energy': <Zap className="w-5 h-5" />,
  'industrial': <Home className="w-5 h-5" />
}

const assetTypeColors = {
  'real-estate': 'from-blue-500 to-blue-600',
  'infrastructure': 'from-purple-500 to-purple-600',
  'energy': 'from-green-500 to-green-600',
  'industrial': 'from-orange-500 to-orange-600'
}

export default function AssetsPage() {
  const [selectedType, setSelectedType] = useState<string>('all')
  
  const filteredAssets = selectedType === 'all' 
    ? mockAssets 
    : mockAssets.filter(asset => asset.type === selectedType)
    
  const totalValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0)
  const avgYield = mockAssets.reduce((sum, asset) => sum + asset.yield, 0) / mockAssets.length
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-royal-gold hover:text-royal-bright-gold transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Asset <span className="gold-gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-royal-light/80 max-w-3xl">
            Real-world assets generating sustainable yields across Africa
          </p>
        </div>
        
        {/* Portfolio Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-royal-gold" />
              <span className="text-sm text-royal-light/60">Total Value</span>
            </div>
            <div className="text-2xl font-bold gold-gradient-text">
              ${(totalValue / 1000000).toFixed(1)}M
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-royal-gold" />
              <span className="text-sm text-royal-light/60">Average Yield</span>
            </div>
            <div className="text-2xl font-bold gold-gradient-text">
              {avgYield.toFixed(1)}%
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-5 h-5 text-royal-gold" />
              <span className="text-sm text-royal-light/60">Total Assets</span>
            </div>
            <div className="text-2xl font-bold gold-gradient-text">
              {mockAssets.length}
            </div>
          </div>
          <div className="glass-card p-6">
            <div className="flex items-center gap-3 mb-2">
              <MapPin className="w-5 h-5 text-royal-gold" />
              <span className="text-sm text-royal-light/60">Countries</span>
            </div>
            <div className="text-2xl font-bold gold-gradient-text">
              4
            </div>
          </div>
        </div>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-6 py-2 rounded-lg font-medium transition-all ${
              selectedType === 'all'
                ? 'bg-royal-gold text-royal-midnight'
                : 'bg-royal-midnight border border-royal-gold/30 hover:border-royal-gold'
            }`}
          >
            All Assets
          </button>
          <button
            onClick={() => setSelectedType('real-estate')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedType === 'real-estate'
                ? 'bg-royal-gold text-royal-midnight'
                : 'bg-royal-midnight border border-royal-gold/30 hover:border-royal-gold'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Real Estate
          </button>
          <button
            onClick={() => setSelectedType('energy')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedType === 'energy'
                ? 'bg-royal-gold text-royal-midnight'
                : 'bg-royal-midnight border border-royal-gold/30 hover:border-royal-gold'
            }`}
          >
            <Zap className="w-4 h-4" />
            Energy
          </button>
          <button
            onClick={() => setSelectedType('infrastructure')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedType === 'infrastructure'
                ? 'bg-royal-gold text-royal-midnight'
                : 'bg-royal-midnight border border-royal-gold/30 hover:border-royal-gold'
            }`}
          >
            <Factory className="w-4 h-4" />
            Infrastructure
          </button>
          <button
            onClick={() => setSelectedType('industrial')}
            className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              selectedType === 'industrial'
                ? 'bg-royal-gold text-royal-midnight'
                : 'bg-royal-midnight border border-royal-gold/30 hover:border-royal-gold'
            }`}
          >
            <Home className="w-4 h-4" />
            Industrial
          </button>
        </div>
        
        {/* Assets Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="glass-card overflow-hidden group hover:border-royal-gold/50 transition-all">
              {/* Asset Image */}
              <div className="relative h-48 bg-gradient-to-br from-royal-midnight to-royal-deep-blue overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-royal-dark/80 to-transparent z-10" />
                <div className={`absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${assetTypeColors[asset.type]} text-white text-sm font-medium`}>
                  {assetTypeIcons[asset.type]}
                  <span className="capitalize">{asset.type.replace('-', ' ')}</span>
                </div>
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-royal-gold/20 backdrop-blur-sm text-royal-gold text-sm font-bold">
                  {asset.yield}% Yield
                </div>
              </div>
              
              {/* Asset Details */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{asset.name}</h3>
                <div className="flex items-center gap-2 text-sm text-royal-light/60 mb-4">
                  <MapPin className="w-4 h-4" />
                  {asset.location}
                </div>
                
                <p className="text-royal-light/80 mb-4">{asset.description}</p>
                
                {/* Asset Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-royal-midnight/50 rounded-lg p-3">
                    <div className="text-xs text-royal-light/60 mb-1">Asset Value</div>
                    <div className="font-bold gold-gradient-text">
                      ${(asset.value / 1000000).toFixed(1)}M
                    </div>
                  </div>
                  <div className="bg-royal-midnight/50 rounded-lg p-3">
                    <div className="text-xs text-royal-light/60 mb-1">Annual Yield</div>
                    <div className="font-bold text-green-400">
                      {asset.yield}%
                    </div>
                  </div>
                </div>
                
                {/* Asset Details */}
                <div className="border-t border-royal-gold/20 pt-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    {asset.details.size && (
                      <div className="flex items-center gap-1">
                        <Building2 className="w-4 h-4 text-royal-gold/60" />
                        <span className="text-royal-light/60">{asset.details.size}</span>
                      </div>
                    )}
                    {asset.details.tenants && (
                      <div className="flex items-center gap-1">
                        <Home className="w-4 h-4 text-royal-gold/60" />
                        <span className="text-royal-light/60">{asset.details.tenants} tenants</span>
                      </div>
                    )}
                    {asset.details.capacity && (
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4 text-royal-gold/60" />
                        <span className="text-royal-light/60">{asset.details.capacity}</span>
                      </div>
                    )}
                    {asset.details.built && (
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-royal-gold/60" />
                        <span className="text-royal-light/60">Built {asset.details.built}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Info Section */}
        <div className="mt-12 glass-card p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">
            100% <span className="gold-gradient-text">Over-Collateralized</span>
          </h2>
          <p className="text-royal-light/80 max-w-2xl mx-auto mb-6">
            Every token in the Royal RWA ecosystem is backed by more than 100% of its value in real, 
            income-generating assets. This ensures sustainable yields and capital preservation for all investors.
          </p>
          <Link href="/tokens" className="primary-button inline-flex items-center gap-2">
            Learn About Our Tokens
            <ArrowLeft className="w-5 h-5 rotate-180" />
          </Link>
        </div>
      </div>
    </div>
  )
}