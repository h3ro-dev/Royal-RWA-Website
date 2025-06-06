'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Shield, Users, TrendingUp, Globe, Award, Lock } from 'lucide-react'

// Mock data - will be replaced with real data from Engineer 3
const MOCK_TVL = 125000000
const MOCK_USERS = 12543
const MOCK_APY = { flexible: 10, year1: 12, year2: 14 }

export default function HomePage() {
  const [tvl, setTvl] = useState(0)
  const [users, setUsers] = useState(0)
  
  // Animate numbers on mount
  useEffect(() => {
    const tvlTimer = setInterval(() => {
      setTvl(prev => {
        const next = prev + MOCK_TVL / 50
        return next >= MOCK_TVL ? MOCK_TVL : next
      })
    }, 30)
    
    const usersTimer = setInterval(() => {
      setUsers(prev => {
        const next = prev + MOCK_USERS / 50
        return next >= MOCK_USERS ? MOCK_USERS : next
      })
    }, 30)
    
    return () => {
      clearInterval(tvlTimer)
      clearInterval(usersTimer)
    }
  }, [])
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-royal-gold/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-royal-deep-blue/30 rounded-full blur-3xl animate-float animation-delay-2000" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* Trust Badge */}
          <div className="flex justify-center mb-8">
            <div className="trust-badge">
              <Shield className="w-4 h-4" />
              <span>100% Asset-Backed</span>
            </div>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            Where Sovereign Wealth
            <br />
            <span className="gold-gradient-text">Meets Individual Opportunity</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-royal-light/80 mb-8 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Invest globally in African real-world assets. 
            Earn up to <span className="text-royal-gold font-bold">{MOCK_APY.year2}% APY</span> with 
            institutional-grade security.
          </p>
          
          {/* Dual CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up animation-delay-400">
            <Link href="/calculator" className="primary-button inline-flex items-center justify-center gap-2">
              Calculate Your Returns
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/tokens" className="secondary-button inline-flex items-center justify-center">
              Explore Ecosystem
            </Link>
          </div>
          
          {/* Trust Indicators Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 glass-card p-6 rounded-2xl animate-fade-in animation-delay-600">
            <div className="text-center">
              <div className="text-3xl font-bold gold-gradient-text">
                ${(tvl / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-royal-light/60 mt-1">Total Value Locked</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gold-gradient-text">
                {users.toLocaleString()}
              </div>
              <div className="text-sm text-royal-light/60 mt-1">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gold-gradient-text">100%</div>
              <div className="text-sm text-royal-light/60 mt-1">Over-Collateralized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gold-gradient-text">A+</div>
              <div className="text-sm text-royal-light/60 mt-1">Security Rating</div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-royal-gold/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-royal-gold rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Trusted by <span className="gold-gradient-text">Global Investors</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <Globe className="w-12 h-12 text-royal-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">25+ Countries</h3>
              <p className="text-royal-light/60">Investors from across the globe trust Royal RWA</p>
            </div>
            <div className="glass-card p-6 text-center">
              <Award className="w-12 h-12 text-royal-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sharia Compliant</h3>
              <p className="text-royal-light/60">Certified ethical investment platform</p>
            </div>
            <div className="glass-card p-6 text-center">
              <Lock className="w-12 h-12 text-royal-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-royal-light/60">Multi-sig wallets and institutional custody</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Quick Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-royal-midnight/20">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Real Assets. <span className="gold-gradient-text">Real Returns.</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="glass-card p-8">
              <TrendingUp className="w-16 h-16 text-royal-gold mx-auto mb-4" />
              <div className="text-4xl font-bold gold-gradient-text mb-2">{MOCK_APY.flexible}%</div>
              <div className="text-lg font-semibold mb-1">Flexible Staking</div>
              <div className="text-sm text-royal-light/60">Withdraw anytime</div>
            </div>
            <div className="glass-card p-8 border-2 border-royal-gold/50 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-royal-gold text-royal-midnight px-4 py-1 rounded-full text-sm font-bold">
                POPULAR
              </div>
              <TrendingUp className="w-16 h-16 text-royal-gold mx-auto mb-4" />
              <div className="text-4xl font-bold gold-gradient-text mb-2">{MOCK_APY.year1}%</div>
              <div className="text-lg font-semibold mb-1">1-Year Lock</div>
              <div className="text-sm text-royal-light/60">Higher returns</div>
            </div>
            <div className="glass-card p-8">
              <TrendingUp className="w-16 h-16 text-royal-gold mx-auto mb-4" />
              <div className="text-4xl font-bold gold-gradient-text mb-2">{MOCK_APY.year2}%</div>
              <div className="text-lg font-semibold mb-1">2-Year Lock</div>
              <div className="text-sm text-royal-light/60">Maximum yield</div>
            </div>
          </div>
          
          <Link href="/staking" className="primary-button inline-flex items-center gap-2">
            Start Earning Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}