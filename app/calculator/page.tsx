'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { ArrowLeft, Calculator, TrendingUp, Info } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock APY rates
const APY_RATES = {
  flexible: 10,
  year1: 12,
  year2: 14
}

interface ProjectionData {
  month: string
  value: number
}

export default function CalculatorPage() {
  const [amount, setAmount] = useState(10000)
  const [period, setPeriod] = useState<'flexible' | 'year1' | 'year2'>('year1')
  const [isCompounding, setIsCompounding] = useState(true)
  
  // Calculate returns
  const calculations = useMemo(() => {
    const apy = APY_RATES[period] / 100
    const periodMonths = period === 'flexible' ? 12 : period === 'year1' ? 12 : 24
    
    let totalReturn = amount
    let projectionData: ProjectionData[] = [{ month: 'Start', value: amount }]
    
    if (isCompounding) {
      // Compound interest calculation
      const monthlyRate = Math.pow(1 + apy, 1/12) - 1
      
      for (let month = 1; month <= periodMonths; month++) {
        totalReturn = totalReturn * (1 + monthlyRate)
        projectionData.push({
          month: `Month ${month}`,
          value: Math.round(totalReturn)
        })
      }
    } else {
      // Simple interest calculation
      const monthlyReturn = (amount * apy) / 12
      
      for (let month = 1; month <= periodMonths; month++) {
        totalReturn = amount + (monthlyReturn * month)
        projectionData.push({
          month: `Month ${month}`,
          value: Math.round(totalReturn)
        })
      }
    }
    
    const profit = totalReturn - amount
    const dailyEarnings = profit / (periodMonths * 30)
    
    return {
      totalReturn: Math.round(totalReturn),
      profit: Math.round(profit),
      apy: APY_RATES[period],
      dailyEarnings: Math.round(dailyEarnings * 100) / 100,
      projectionData
    }
  }, [amount, period, isCompounding])
  
  // Comparison data
  const comparisonData = [
    { type: 'Traditional Savings', rate: '0.5%', returns: Math.round(amount * 1.005) },
    { type: 'Stock Market (Avg)', rate: '7%', returns: Math.round(amount * 1.07) },
    { type: 'Corporate Bonds', rate: '4%', returns: Math.round(amount * 1.04) },
    { type: 'Royal RWA', rate: `${APY_RATES[period]}%`, returns: calculations.totalReturn }
  ]
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-royal-gold hover:text-royal-bright-gold transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Yield <span className="gold-gradient-text">Calculator</span>
          </h1>
          <p className="text-xl text-royal-light/80">
            Calculate your potential returns with Royal RWA staking
          </p>
        </div>
        
        {/* Calculator Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Input Section */}
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Investment Details</h2>
            
            {/* Amount Input */}
            <div>
              <label className="block text-sm font-medium text-royal-light/80 mb-2">
                Investment Amount (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-royal-light/60">$</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-royal-midnight/50 border border-royal-gold/30 rounded-lg px-8 py-3 text-royal-light focus:border-royal-gold focus:outline-none transition-colors"
                  min="0"
                  step="1000"
                />
              </div>
              {/* Amount Slider */}
              <input
                type="range"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                min="1000"
                max="1000000"
                step="1000"
                className="w-full mt-4 accent-royal-gold"
              />
              <div className="flex justify-between text-xs text-royal-light/60 mt-1">
                <span>$1K</span>
                <span>$500K</span>
                <span>$1M</span>
              </div>
            </div>
            
            {/* Period Selection */}
            <div>
              <label className="block text-sm font-medium text-royal-light/80 mb-2">
                Staking Period
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setPeriod('flexible')}
                  className={`p-3 rounded-lg border transition-all ${
                    period === 'flexible'
                      ? 'border-royal-gold bg-royal-gold/20 text-royal-gold'
                      : 'border-royal-gold/30 hover:border-royal-gold/50'
                  }`}
                >
                  <div className="font-semibold">Flexible</div>
                  <div className="text-sm">{APY_RATES.flexible}% APY</div>
                </button>
                <button
                  onClick={() => setPeriod('year1')}
                  className={`p-3 rounded-lg border transition-all ${
                    period === 'year1'
                      ? 'border-royal-gold bg-royal-gold/20 text-royal-gold'
                      : 'border-royal-gold/30 hover:border-royal-gold/50'
                  }`}
                >
                  <div className="font-semibold">1 Year</div>
                  <div className="text-sm">{APY_RATES.year1}% APY</div>
                </button>
                <button
                  onClick={() => setPeriod('year2')}
                  className={`p-3 rounded-lg border transition-all ${
                    period === 'year2'
                      ? 'border-royal-gold bg-royal-gold/20 text-royal-gold'
                      : 'border-royal-gold/30 hover:border-royal-gold/50'
                  }`}
                >
                  <div className="font-semibold">2 Years</div>
                  <div className="text-sm">{APY_RATES.year2}% APY</div>
                </button>
              </div>
            </div>
            
            {/* Compound Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-royal-light/80">
                  Compound Interest
                </label>
                <Info className="w-4 h-4 text-royal-light/60" />
              </div>
              <button
                onClick={() => setIsCompounding(!isCompounding)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isCompounding ? 'bg-royal-gold' : 'bg-royal-midnight'
                }`}
              >
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  isCompounding ? 'translate-x-6' : ''
                }`} />
              </button>
            </div>
          </div>
          
          {/* Results Section */}
          <div className="glass-card p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Projected Returns</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-royal-midnight/50 p-4 rounded-lg">
                <div className="text-sm text-royal-light/60 mb-1">Total Return</div>
                <div className="text-2xl font-bold gold-gradient-text">
                  ${calculations.totalReturn.toLocaleString()}
                </div>
              </div>
              <div className="bg-royal-midnight/50 p-4 rounded-lg">
                <div className="text-sm text-royal-light/60 mb-1">Total Profit</div>
                <div className="text-2xl font-bold text-green-400">
                  +${calculations.profit.toLocaleString()}
                </div>
              </div>
              <div className="bg-royal-midnight/50 p-4 rounded-lg">
                <div className="text-sm text-royal-light/60 mb-1">Daily Earnings</div>
                <div className="text-2xl font-bold gold-gradient-text">
                  ${calculations.dailyEarnings}
                </div>
              </div>
              <div className="bg-royal-midnight/50 p-4 rounded-lg">
                <div className="text-sm text-royal-light/60 mb-1">APY Rate</div>
                <div className="text-2xl font-bold gold-gradient-text">
                  {calculations.apy}%
                </div>
              </div>
            </div>
            
            {/* CTA */}
            <Link href="/staking" className="primary-button w-full text-center">
              Start Staking Now
            </Link>
          </div>
        </div>
        
        {/* Projection Chart */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Growth Projection</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calculations.projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d7f40" />
                <XAxis dataKey="month" stroke="#f8f8ff60" />
                <YAxis stroke="#f8f8ff60" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a4e', 
                    border: '1px solid #d4af37',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#d4af37" 
                  strokeWidth={3}
                  dot={{ fill: '#ffd700', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Comparison Table */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-semibold mb-6">Investment Comparison</h2>
          <p className="text-royal-light/60 mb-6">
            Based on ${amount.toLocaleString()} investment over 1 year
          </p>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-royal-gold/20">
                  <th className="text-left py-3 px-4">Investment Type</th>
                  <th className="text-center py-3 px-4">Annual Rate</th>
                  <th className="text-right py-3 px-4">Returns</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-royal-gold/10 ${
                      item.type === 'Royal RWA' ? 'bg-royal-gold/10' : ''
                    }`}
                  >
                    <td className="py-4 px-4 font-medium">{item.type}</td>
                    <td className="py-4 px-4 text-center">{item.rate}</td>
                    <td className={`py-4 px-4 text-right font-bold ${
                      item.type === 'Royal RWA' ? 'gold-gradient-text' : ''
                    }`}>
                      ${item.returns.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}