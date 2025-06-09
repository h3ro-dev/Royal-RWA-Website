'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, TrendingUp, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const MOCK_YIELDS = {
  flexible: 10,
  year1: 12,
  year2: 14,
};

// Helper function to calculate returns
function calculateReturns(
  amount: number,
  period: string,
  compounding: boolean
): {
  totalReturn: number;
  profit: number;
  apy: number;
  dailyEarnings: number;
  projectionData: Array<{ date: string; value: number }>;
} {
  const apy = MOCK_YIELDS[period as keyof typeof MOCK_YIELDS] || MOCK_YIELDS.flexible;
  const days = period === 'year1' ? 365 : period === 'year2' ? 730 : 365;
  
  let totalReturn: number;
  const projectionData: Array<{ date: string; value: number }> = [];
  
  if (compounding) {
    // Compound interest calculation (daily compounding)
    const dailyRate = apy / 100 / 365;
    totalReturn = amount * Math.pow(1 + dailyRate, days);
    
    // Generate projection data for chart
    for (let i = 0; i <= days; i += days / 12) {
      const value = amount * Math.pow(1 + dailyRate, i);
      const date = new Date();
      date.setDate(date.getDate() + i);
      projectionData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        value: Math.round(value),
      });
    }
  } else {
    // Simple interest calculation
    const interest = (amount * apy * (days / 365)) / 100;
    totalReturn = amount + interest;
    
    // Generate linear projection data
    for (let i = 0; i <= days; i += days / 12) {
      const value = amount + (interest * (i / days));
      const date = new Date();
      date.setDate(date.getDate() + i);
      projectionData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        value: Math.round(value),
      });
    }
  }
  
  const profit = totalReturn - amount;
  const dailyEarnings = profit / days;
  
  return {
    totalReturn,
    profit,
    apy,
    dailyEarnings,
    projectionData,
  };
}

export default function CalculatorPage() {
  const [amount, setAmount] = useState(10000);
  const [period, setPeriod] = useState('year1');
  const [compounding, setCompounding] = useState(true);
  const [results, setResults] = useState(calculateReturns(10000, 'year1', true));

  useEffect(() => {
    const newResults = calculateReturns(amount, period, compounding);
    setResults(newResults);
  }, [amount, period, compounding]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1a1a4e] to-[#2d2d7f] text-white">
      {/* Header */}
      <section className="px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Yield <span className="gradient-text">Calculator</span>
        </h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          See how much you could earn with Royal RWA's institutional-grade assets
        </p>
      </section>

      {/* Calculator Section */}
      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Panel */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Calculate Your Returns</h2>
              
              {/* Amount Input */}
              <div className="mb-6">
                <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ffd700] text-xl">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-12 py-4 text-xl font-bold focus:border-[#ffd700] focus:outline-none transition-colors"
                    min="100"
                    max="1000000"
                    step="100"
                  />
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="flex gap-2 mt-3">
                  {[1000, 5000, 10000, 50000].map((quickAmount) => (
                    <button
                      key={quickAmount}
                      onClick={() => setAmount(quickAmount)}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors"
                    >
                      ${(quickAmount / 1000).toFixed(0)}k
                    </button>
                  ))}
                </div>
              </div>

              {/* Period Selector */}
              <div className="mb-6">
                <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">
                  Lock Period
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setPeriod('flexible')}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      period === 'flexible'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e]'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div>Flexible</div>
                    <div className="text-xs opacity-80">{MOCK_YIELDS.flexible}% APY</div>
                  </button>
                  <button
                    onClick={() => setPeriod('year1')}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      period === 'year1'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e]'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div>1 Year</div>
                    <div className="text-xs opacity-80">{MOCK_YIELDS.year1}% APY</div>
                  </button>
                  <button
                    onClick={() => setPeriod('year2')}
                    className={`py-3 rounded-lg font-medium transition-all ${
                      period === 'year2'
                        ? 'bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e]'
                        : 'bg-white/5 hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <div>2 Years</div>
                    <div className="text-xs opacity-80">{MOCK_YIELDS.year2}% APY</div>
                  </button>
                </div>
              </div>

              {/* Compounding Toggle */}
              <div className="mb-6">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm uppercase tracking-wider opacity-70">
                    Compound Interest
                  </span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={compounding}
                      onChange={(e) => setCompounding(e.target.checked)}
                      className="sr-only"
                    />
                    <div className={`w-14 h-8 rounded-full transition-colors ${
                      compounding ? 'bg-[#ffd700]' : 'bg-white/20'
                    }`}>
                      <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                        compounding ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </div>
                  </div>
                </label>
              </div>

              {/* Comparison Table */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Comparison vs Traditional</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="opacity-70">Savings Account (0.5%)</span>
                    <span>{formatCurrency(amount * 1.005)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/10">
                    <span className="opacity-70">S&P 500 Average (7%)</span>
                    <span>{formatCurrency(amount * 1.07)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 text-[#ffd700] font-semibold">
                    <span>Royal RWA ({results.apy}%)</span>
                    <span>{formatCurrency(results.totalReturn)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Your Projected Returns</h2>
              
              {/* Main Results */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Total Value</p>
                  <p className="text-2xl font-bold text-[#ffd700]">
                    {formatCurrency(results.totalReturn)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Total Profit</p>
                  <p className="text-2xl font-bold text-green-400">
                    +{formatCurrency(results.profit)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm uppercase tracking-wider opacity-70 mb-1">Daily Earnings</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(results.dailyEarnings)}
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <p className="text-sm uppercase tracking-wider opacity-70 mb-1">APY Rate</p>
                  <p className="text-2xl font-bold">
                    {results.apy}%
                  </p>
                </div>
              </div>

              {/* Simple Chart Visualization */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Growth Projection</h3>
                <div className="bg-white/5 rounded-xl p-4 h-64 relative overflow-hidden">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs opacity-50">
                    <span>{formatCurrency(results.totalReturn)}</span>
                    <span>{formatCurrency(amount)}</span>
                  </div>
                  
                  {/* Chart bars */}
                  <div className="ml-16 h-full flex items-end justify-between gap-2">
                    {results.projectionData.map((data, index) => {
                      const height = ((data.value - amount) / (results.totalReturn - amount)) * 100;
                      return (
                        <div
                          key={index}
                          className="flex-1 bg-gradient-to-t from-[#d4af37] to-[#ffd700] rounded-t-md transition-all duration-500"
                          style={{ height: `${height}%` }}
                          title={`${data.date}: ${formatCurrency(data.value)}`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-0 left-16 right-0 flex justify-between text-xs opacity-50 mt-2">
                    <span>Now</span>
                    <span>{period === 'year2' ? '2 Years' : '1 Year'}</span>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <button 
                  className="w-full py-4 bg-gradient-to-r from-[#d4af37] to-[#ffd700] text-[#1a1a4e] font-bold rounded-lg hover:scale-105 transition-transform duration-200 shadow-xl"
                  onClick={() => window.location.href = '/staking'}
                >
                  Start Earning {results.apy}% APY
                </button>
                <button 
                  className="w-full py-4 bg-white/10 backdrop-blur-md border border-white/20 font-bold rounded-lg hover:bg-white/20 transition-colors duration-200"
                  onClick={() => {
                    // Share functionality
                    if (navigator.share) {
                      navigator.share({
                        title: 'Royal RWA Calculator',
                        text: `I could earn ${formatCurrency(results.profit)} with Royal RWA!`,
                        url: window.location.href,
                      });
                    }
                  }}
                >
                  Share Results
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}