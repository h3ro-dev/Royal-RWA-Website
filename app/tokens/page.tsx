'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Coins, Lock, TrendingUp, Shield, Globe, ArrowRight } from 'lucide-react'

interface TokenInfo {
  name: string
  symbol: string
  purpose: string
  features: string[]
  color: string
  icon: React.ReactNode
}

const tokens: TokenInfo[] = [
  {
    name: 'ROYAL RWA TOKEN',
    symbol: 'RWA',
    purpose: 'Utility token for ecosystem access',
    features: [
      '50 billion total supply',
      '90% for capital raising',
      'Must stake to earn yield',
      'Governance rights'
    ],
    color: 'from-royal-gold to-royal-bright-gold',
    icon: <Coins className="w-8 h-8" />
  },
  {
    name: 'ROYAL LP TOKEN',
    symbol: 'RLP',
    purpose: 'Rewards for staking RWA tokens',
    features: [
      '10% APY (flexible)',
      '12% APY (1-year lock)',
      '14% APY (2-year lock)',
      'Auto-compounding available'
    ],
    color: 'from-purple-500 to-pink-500',
    icon: <TrendingUp className="w-8 h-8" />
  },
  {
    name: 'ROYAL STABLECOIN',
    symbol: 'RUSD',
    purpose: 'Stable medium of exchange',
    features: [
      '100% over-collateralized',
      'Backed by RWAs and gold',
      'Perfect for remittances',
      '1:1 USD peg'
    ],
    color: 'from-green-500 to-emerald-500',
    icon: <Shield className="w-8 h-8" />
  }
]

export default function TokensPage() {
  const [selectedToken, setSelectedToken] = useState<number>(0)
  
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
            The Three-Token <span className="gold-gradient-text">Ecosystem</span>
          </h1>
          <p className="text-xl text-royal-light/80 max-w-3xl">
            A revolutionary system designed to provide stable yields, governance, and real utility
          </p>
        </div>
        
        {/* Token Visualizer */}
        <div className="glass-card p-8 mb-12">
          <div className="relative">
            {/* Central Hub */}
            <div className="flex justify-center items-center mb-12">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80">
                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-royal-gold/20 animate-pulse" />
                <div className="absolute inset-4 rounded-full border-2 border-royal-gold/30 animate-pulse animation-delay-200" />
                <div className="absolute inset-8 rounded-full border-2 border-royal-gold/40 animate-pulse animation-delay-400" />
                
                {/* Center logo */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-royal-gold to-royal-bright-gold flex items-center justify-center glow-gold">
                    <Globe className="w-12 h-12 text-royal-midnight" />
                  </div>
                </div>
                
                {/* Orbiting tokens */}
                {tokens.map((token, index) => {
                  const angle = (index * 120) - 90 // Distribute evenly in circle
                  const radius = 120 // Distance from center
                  const x = Math.cos(angle * Math.PI / 180) * radius
                  const y = Math.sin(angle * Math.PI / 180) * radius
                  
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedToken(index)}
                      className={`absolute w-20 h-20 rounded-full bg-gradient-to-br ${token.color} 
                        flex items-center justify-center transform transition-all duration-300
                        hover:scale-110 ${selectedToken === index ? 'scale-110 shadow-2xl' : ''}
                        animate-float`}
                      style={{
                        left: '50%',
                        top: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        animationDelay: `${index * 2}s`
                      }}
                    >
                      {token.icon}
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Token Details */}
            <div className="grid md:grid-cols-3 gap-6">
              {tokens.map((token, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                    selectedToken === index
                      ? 'border-royal-gold bg-royal-gold/10'
                      : 'border-royal-gold/20 hover:border-royal-gold/40'
                  }`}
                  onClick={() => setSelectedToken(index)}
                >
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${token.color} mb-4`}>
                    {token.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{token.name}</h3>
                  <p className="text-sm text-royal-light/60 mb-4">{token.purpose}</p>
                  <ul className="space-y-2">
                    {token.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-2 text-sm">
                        <span className="text-royal-gold mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Value Flow Diagram */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-2xl font-bold mb-6">How Value Flows</h2>
          <div className="grid md:grid-cols-5 gap-4 items-center">
            <div className="text-center">
              <div className="glass-card p-4 mb-2">
                <Coins className="w-8 h-8 text-royal-gold mx-auto mb-2" />
                <div className="font-semibold">Buy RWA</div>
              </div>
              <p className="text-sm text-royal-light/60">Get ecosystem access</p>
            </div>
            
            <ArrowRight className="w-8 h-8 text-royal-gold mx-auto hidden md:block" />
            
            <div className="text-center">
              <div className="glass-card p-4 mb-2">
                <Lock className="w-8 h-8 text-royal-gold mx-auto mb-2" />
                <div className="font-semibold">Stake RWA</div>
              </div>
              <p className="text-sm text-royal-light/60">Lock for rewards</p>
            </div>
            
            <ArrowRight className="w-8 h-8 text-royal-gold mx-auto hidden md:block" />
            
            <div className="text-center">
              <div className="glass-card p-4 mb-2">
                <TrendingUp className="w-8 h-8 text-royal-gold mx-auto mb-2" />
                <div className="font-semibold">Earn RLP</div>
              </div>
              <p className="text-sm text-royal-light/60">Up to 14% APY</p>
            </div>
          </div>
        </div>
        
        {/* Key Benefits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">For Investors</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-royal-gold mt-0.5" />
                <div>
                  <div className="font-semibold">Real Asset Backing</div>
                  <div className="text-sm text-royal-light/60">100% over-collateralized by real-world assets</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-royal-gold mt-0.5" />
                <div>
                  <div className="font-semibold">Sustainable Yields</div>
                  <div className="text-sm text-royal-light/60">Up to 14% APY from real economic activity</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-royal-gold mt-0.5" />
                <div>
                  <div className="font-semibold">Global Access</div>
                  <div className="text-sm text-royal-light/60">Invest in African growth from anywhere</div>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4">For the Ecosystem</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Coins className="w-5 h-5 text-royal-gold mt-0.5" />
                <div>
                  <div className="font-semibold">Capital Formation</div>
                  <div className="text-sm text-royal-light/60">Funding real-world development projects</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-royal-gold mt-0.5" />
                <div>
                  <div className="font-semibold">Stability Mechanism</div>
                  <div className="text-sm text-royal-light/60">Staking creates long-term alignment</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-royal-gold mt-0.5" />
                <div>
                  <div className="font-semibold">Risk Mitigation</div>
                  <div className="text-sm text-royal-light/60">Diversified portfolio of income-generating assets</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Link href="/staking" className="primary-button inline-flex items-center gap-2">
            Start Staking Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}