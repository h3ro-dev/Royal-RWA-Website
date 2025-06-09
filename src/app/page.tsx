import React from 'react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-royal-midnight to-royal-deep-blue">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-8">
          <span className="gradient-text">Royal RWA</span>
        </h1>
        <p className="text-xl text-center text-white/70 mb-12">
          Where Sovereign Wealth Meets Individual Opportunity
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass rounded-xl p-6 gold-glow">
            <h2 className="text-2xl font-semibold mb-4 text-royal-bright-gold">
              Royal RWA Token
            </h2>
            <p className="text-white/70">
              Access the ecosystem with our utility token
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 gold-glow">
            <h2 className="text-2xl font-semibold mb-4 text-royal-bright-gold">
              Yield up to 14%
            </h2>
            <p className="text-white/70">
              Earn sustainable yields from real-world assets
            </p>
          </div>
          
          <div className="glass rounded-xl p-6 gold-glow">
            <h2 className="text-2xl font-semibold mb-4 text-royal-bright-gold">
              100% Backed
            </h2>
            <p className="text-white/70">
              Over-collateralized by real assets and gold
            </p>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <p className="text-sm text-white/50">
            Engineer3-Data APIs and Web3 Integration Ready
          </p>
        </div>
      </div>
    </main>
  )
}