'use client';

import React, { useState } from 'react';

// Mock data for staking options
const STAKING_OPTIONS = {
  flexible: { apy: 10, minAmount: 100, lockPeriod: 0 },
  oneYear: { apy: 12, minAmount: 1000, lockPeriod: 365 },
  twoYear: { apy: 14, minAmount: 5000, lockPeriod: 730 },
};

export default function StakingPage() {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('oneYear');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedOption = STAKING_OPTIONS[selectedPeriod as keyof typeof STAKING_OPTIONS];
  const projectedEarnings = parseFloat(amount || '0') * (selectedOption.apy / 100);
  const totalValue = parseFloat(amount || '0') + projectedEarnings;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setAmount(value);
  };

  const handleStake = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    setStep(4);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Choose Your Staking Amount</h2>
            
            {/* Amount Input */}
            <div>
              <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">
                Amount to Stake
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffd700] text-xl">$</span>
                <input
                  type="text"
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter amount"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-4 text-xl font-bold focus:border-[#ffd700] focus:outline-none transition-colors"
                />
              </div>
              
              {/* Quick Amount Buttons */}
              <div className="grid grid-cols-4 gap-2 mt-3">
                {[1000, 5000, 10000, 25000].map((quickAmount) => (
                  <button
                    key={quickAmount}
                    onClick={() => setAmount(quickAmount.toString())}
                    className="py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                  >
                    ${(quickAmount / 1000).toFixed(0)}k
                  </button>
                ))}
              </div>
              
              {/* Balance Info */}
              <p className="text-sm opacity-70 mt-2">
                Available balance: <span className="text-[#ffd700]">$50,000</span>
              </p>
            </div>

            {/* Min Amount Warning */}
            {parseFloat(amount) > 0 && parseFloat(amount) < selectedOption.minAmount && (
              <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-sm">
                Minimum stake amount for {selectedPeriod === 'flexible' ? 'Flexible' : selectedPeriod === 'oneYear' ? '1 Year' : '2 Years'} is {formatCurrency(selectedOption.minAmount)}
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              disabled={!amount || parseFloat(amount) < selectedOption.minAmount}
              className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e] font-bold rounded-lg hover:scale-105 transition-transform duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              Continue
            </button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Select Lock Period</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(STAKING_OPTIONS).map(([key, option]) => (
                <button
                  key={key}
                  onClick={() => setSelectedPeriod(key)}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    selectedPeriod === key
                      ? 'border-[#ffd700] bg-[#ffd700]/10'
                      : 'border-white/20 bg-white/5 hover:border-white/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="text-left">
                      <h3 className="text-xl font-bold">
                        {key === 'flexible' ? 'Flexible' : key === 'oneYear' ? '1 Year Lock' : '2 Year Lock'}
                      </h3>
                      <p className="text-sm opacity-70">
                        {key === 'flexible' ? 'Withdraw anytime' : `Locked for ${option.lockPeriod} days`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-[#ffd700]">{option.apy}%</p>
                      <p className="text-sm opacity-70">APY</p>
                    </div>
                  </div>
                  
                  {selectedPeriod === key && (
                    <div className="mt-4 pt-4 border-t border-white/10 text-sm">
                      <p>Your estimated earnings: <span className="text-[#ffd700] font-bold">{formatCurrency(parseFloat(amount) * (option.apy / 100))}</span></p>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={parseFloat(amount) < selectedOption.minAmount}
                className="flex-1 py-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e] font-bold rounded-lg hover:scale-105 transition-transform duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Confirm Your Stake</h2>
            
            {/* Summary Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-lg font-semibold mb-4">Staking Summary</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="opacity-70">Amount</span>
                  <span className="font-bold text-xl">{formatCurrency(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="opacity-70">Lock Period</span>
                  <span className="font-bold">
                    {selectedPeriod === 'flexible' ? 'Flexible' : selectedPeriod === 'oneYear' ? '1 Year' : '2 Years'}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="opacity-70">APY Rate</span>
                  <span className="font-bold text-[#ffd700]">{selectedOption.apy}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="opacity-70">Projected Earnings</span>
                  <span className="font-bold text-green-400">+{formatCurrency(projectedEarnings)}</span>
                </div>
                <div className="flex justify-between items-center py-3 text-lg">
                  <span className="font-semibold">Total Value at Maturity</span>
                  <span className="font-bold text-[#ffd700]">{formatCurrency(totalValue)}</span>
                </div>
              </div>
            </div>

            {/* Terms Notice */}
            <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4 text-sm">
              <p className="font-semibold mb-2">Important Notice:</p>
              <ul className="list-disc list-inside space-y-1 opacity-90">
                <li>Earnings are calculated based on current APY rates</li>
                <li>{selectedPeriod !== 'flexible' ? `Funds will be locked for ${selectedOption.lockPeriod} days` : 'You can withdraw anytime with flexible staking'}</li>
                <li>Rewards are distributed daily to your account</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                Back
              </button>
              <button
                onClick={handleStake}
                disabled={isProcessing}
                className="flex-1 py-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e] font-bold rounded-lg hover:scale-105 transition-transform duration-200 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? 'Processing...' : 'Confirm Stake'}
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            {/* Success Animation */}
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#ffd700] rounded-full animate-ping opacity-20"></div>
              <div className="relative w-32 h-32 bg-gradient-to-r from-[#d4af37] to-[#ffd700] rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-[#1a1a4e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            <h2 className="text-3xl font-bold">Staking Successful!</h2>
            
            <p className="text-xl opacity-90 max-w-md mx-auto">
              Your {formatCurrency(parseFloat(amount))} has been successfully staked for {selectedOption.apy}% APY
            </p>

            {/* Transaction Details */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 max-w-md mx-auto text-left">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-70">Transaction ID</span>
                  <span className="font-mono">0x7f8a...3d2c</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Staked Amount</span>
                  <span>{formatCurrency(parseFloat(amount))}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Daily Earnings</span>
                  <span className="text-green-400">{formatCurrency(projectedEarnings / 365)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-w-md mx-auto">
              <button
                onClick={() => window.location.href = '/'}
                className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e] font-bold rounded-lg hover:scale-105 transition-transform duration-200 shadow-xl"
              >
                View Dashboard
              </button>
              <button
                onClick={() => {
                  setStep(1);
                  setAmount('');
                  setIsSuccess(false);
                }}
                className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-colors duration-200"
              >
                Stake More
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a4e] to-[#2d2d7f] text-white">
      {/* Header */}
      <section className="px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Stake & <span className="gradient-text">Earn</span>
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          Lock your funds and earn up to 14% APY with our flexible staking options
        </p>
      </section>

      {/* Progress Bar */}
      {!isSuccess && (
        <div className="px-4 mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`flex items-center ${stepNumber < 3 ? 'flex-1' : ''}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step >= stepNumber
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e]'
                        : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  {stepNumber < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                        step > stepNumber ? 'bg-[#ffd700]' : 'bg-white/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-sm opacity-70">
              <span>Amount</span>
              <span className="text-center">Period</span>
              <span className="text-right">Confirm</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="px-4 pb-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
            {renderStep()}
          </div>
        </div>
      </section>
    </main>
  );
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