'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Lock, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

interface StakingOption {
  period: 'flexible' | 'year1' | 'year2'
  name: string
  apy: number
  lockDays: number
  description: string
}

const stakingOptions: StakingOption[] = [
  {
    period: 'flexible',
    name: 'Flexible Staking',
    apy: 10,
    lockDays: 0,
    description: 'Withdraw anytime with no penalties'
  },
  {
    period: 'year1',
    name: '1-Year Lock',
    apy: 12,
    lockDays: 365,
    description: 'Higher returns with 1-year commitment'
  },
  {
    period: 'year2',
    name: '2-Year Lock',
    apy: 14,
    lockDays: 730,
    description: 'Maximum yield for long-term investors'
  }
]

const presetAmounts = [1000, 5000, 10000, 25000, 50000, 100000]

export default function StakingPage() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(10000)
  const [selectedPeriod, setSelectedPeriod] = useState<'flexible' | 'year1' | 'year2'>('year1')
  const [isConfirming, setIsConfirming] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const selectedOption = stakingOptions.find(opt => opt.period === selectedPeriod)!
  const projectedReturn = amount * (1 + selectedOption.apy / 100)
  const profit = projectedReturn - amount
  
  const handleConfirm = async () => {
    setIsConfirming(true)
    // Simulate transaction
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsConfirming(false)
    setIsSuccess(true)
  }
  
  const resetFlow = () => {
    setStep(1)
    setAmount(10000)
    setSelectedPeriod('year1')
    setIsSuccess(false)
  }
  
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-royal-gold hover:text-royal-bright-gold transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Stake Your <span className="gold-gradient-text">RWA Tokens</span>
          </h1>
          <p className="text-xl text-royal-light/80">
            Earn up to 14% APY by staking your Royal RWA tokens
          </p>
        </div>
        
        {/* Progress Indicator */}
        {!isSuccess && (
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 1 ? 'bg-royal-gold text-royal-midnight' : 'bg-royal-midnight border-2 border-royal-gold/30'
              }`}>
                1
              </div>
              <div className={`w-20 h-1 ${step >= 2 ? 'bg-royal-gold' : 'bg-royal-gold/30'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 2 ? 'bg-royal-gold text-royal-midnight' : 'bg-royal-midnight border-2 border-royal-gold/30'
              }`}>
                2
              </div>
              <div className={`w-20 h-1 ${step >= 3 ? 'bg-royal-gold' : 'bg-royal-gold/30'}`} />
              <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                step >= 3 ? 'bg-royal-gold text-royal-midnight' : 'bg-royal-midnight border-2 border-royal-gold/30'
              }`}>
                3
              </div>
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <div className="glass-card p-8">
          {isSuccess ? (
            // Success State
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500/20 mb-6">
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Staking Successful!</h2>
              <p className="text-xl text-royal-light/80 mb-8">
                You've successfully staked {amount.toLocaleString()} RWA tokens
              </p>
              <div className="bg-royal-midnight/50 rounded-lg p-6 mb-8 max-w-md mx-auto">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-royal-light/60">Amount Staked</span>
                    <span className="font-semibold">{amount.toLocaleString()} RWA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-light/60">Staking Period</span>
                    <span className="font-semibold">{selectedOption.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-light/60">APY Rate</span>
                    <span className="font-semibold gold-gradient-text">{selectedOption.apy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-royal-light/60">Projected Return</span>
                    <span className="font-semibold text-green-400">{projectedReturn.toLocaleString()} RWA</span>
                  </div>
                </div>
              </div>
              <button onClick={resetFlow} className="primary-button">
                Stake More Tokens
              </button>
            </div>
          ) : (
            <>
              {/* Step 1: Amount Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">How much would you like to stake?</h2>
                  
                  {/* Custom Amount Input */}
                  <div>
                    <label className="block text-sm font-medium text-royal-light/80 mb-2">
                      Enter Amount
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full bg-royal-midnight/50 border border-royal-gold/30 rounded-lg px-4 py-3 pr-16 text-xl font-semibold focus:border-royal-gold focus:outline-none transition-colors"
                        min="0"
                        step="1000"
                      />
                      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-royal-light/60">
                        RWA
                      </span>
                    </div>
                  </div>
                  
                  {/* Preset Amounts */}
                  <div>
                    <label className="block text-sm font-medium text-royal-light/80 mb-2">
                      Or select a preset amount
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {presetAmounts.map((preset) => (
                        <button
                          key={preset}
                          onClick={() => setAmount(preset)}
                          className={`p-3 rounded-lg border transition-all ${
                            amount === preset
                              ? 'border-royal-gold bg-royal-gold/20 text-royal-gold'
                              : 'border-royal-gold/30 hover:border-royal-gold/50'
                          }`}
                        >
                          {preset.toLocaleString()} RWA
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Balance Info */}
                  <div className="bg-royal-midnight/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="w-4 h-4 text-royal-gold" />
                      <span className="text-royal-light/60">
                        Available balance: <span className="font-semibold text-royal-light">50,000 RWA</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* Continue Button */}
                  <button
                    onClick={() => setStep(2)}
                    disabled={amount <= 0}
                    className="primary-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}
              
              {/* Step 2: Period Selection */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">Choose your staking period</h2>
                  
                  <div className="space-y-4">
                    {stakingOptions.map((option) => (
                      <button
                        key={option.period}
                        onClick={() => setSelectedPeriod(option.period)}
                        className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
                          selectedPeriod === option.period
                            ? 'border-royal-gold bg-royal-gold/10'
                            : 'border-royal-gold/20 hover:border-royal-gold/40'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-1">{option.name}</h3>
                            <p className="text-sm text-royal-light/60 mb-3">{option.description}</p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-royal-gold" />
                                <span className="text-sm font-medium">{option.apy}% APY</span>
                              </div>
                              {option.lockDays > 0 && (
                                <div className="flex items-center gap-1">
                                  <Lock className="w-4 h-4 text-royal-gold" />
                                  <span className="text-sm font-medium">{option.lockDays} days lock</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-2xl font-bold gold-gradient-text">
                              {option.apy}%
                            </div>
                            <div className="text-sm text-royal-light/60">APY</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  {/* Navigation */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="secondary-button flex-1"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="primary-button flex-1"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}
              
              {/* Step 3: Confirmation */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold mb-4">Confirm your stake</h2>
                  
                  <div className="bg-royal-midnight/50 rounded-lg p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-royal-light/60">Amount to Stake</span>
                      <span className="text-xl font-semibold">{amount.toLocaleString()} RWA</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-royal-light/60">Staking Period</span>
                      <span className="text-xl font-semibold">{selectedOption.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-royal-light/60">APY Rate</span>
                      <span className="text-xl font-semibold gold-gradient-text">{selectedOption.apy}%</span>
                    </div>
                    <div className="border-t border-royal-gold/20 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-royal-light/60">Projected Return</span>
                        <span className="text-2xl font-bold text-green-400">
                          {projectedReturn.toLocaleString()} RWA
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-royal-light/60">Total Profit</span>
                        <span className="text-lg font-semibold text-green-400">
                          +{profit.toLocaleString()} RWA
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Warning for locked periods */}
                  {selectedOption.lockDays > 0 && (
                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                      <div className="flex gap-3">
                        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm">
                            Your tokens will be locked for {selectedOption.lockDays} days. 
                            You won't be able to withdraw them during this period.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Navigation */}
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="secondary-button flex-1"
                      disabled={isConfirming}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirm}
                      className="primary-button flex-1 disabled:opacity-50"
                      disabled={isConfirming}
                    >
                      {isConfirming ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-royal-midnight border-t-transparent rounded-full animate-spin" />
                          Confirming...
                        </span>
                      ) : (
                        'Confirm Stake'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}