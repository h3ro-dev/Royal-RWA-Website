export default function Home() {
  return (
    <main className="min-h-screen p-8">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto mb-16">
        <h1 className="text-6xl font-bold mb-6">
          <span className="gold-gradient">Royal RWA</span>
        </h1>
        <p className="text-2xl text-gray-300 mb-8">
          Real-World Assets on Blockchain
        </p>
        
        <div className="glass rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">🚀 Development Status</h2>
          <p className="text-lg mb-4">
            4-Engineer Parallel Development Architecture is now active!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-[var(--royal-gold)] mb-2">Engineer 1</h3>
              <p className="font-semibold mb-1">Foundation</p>
              <p className="text-sm text-gray-400">Design System & Components</p>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                Planned
              </span>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-[var(--royal-gold)] mb-2">Engineer 2</h3>
              <p className="font-semibold mb-1">Features</p>
              <p className="text-sm text-gray-400">User Flows & Pages</p>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                Planned
              </span>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-[var(--royal-gold)] mb-2">Engineer 3</h3>
              <p className="font-semibold mb-1">Data</p>
              <p className="text-sm text-gray-400">APIs & Web3</p>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                Planned
              </span>
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <h3 className="font-bold text-[var(--royal-gold)] mb-2">Engineer 4</h3>
              <p className="font-semibold mb-1">Performance</p>
              <p className="text-sm text-gray-400">Testing & Optimization</p>
              <span className="inline-block mt-2 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                Planned
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Overview */}
      <div className="max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-8">What We&apos;re Building</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass rounded-lg p-6">
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="text-xl font-bold mb-2">Real Assets</h3>
            <p className="text-gray-300">
              Gold, fisheries, oil, and real estate tokenized on blockchain
            </p>
          </div>
          
          <div className="glass rounded-lg p-6">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="text-xl font-bold mb-2">Premium Yields</h3>
            <p className="text-gray-300">
              Up to 17.8% APY on flexible terms with real asset backing
            </p>
          </div>
          
          <div className="glass rounded-lg p-6">
            <div className="text-4xl mb-4">🔐</div>
            <h3 className="text-xl font-bold mb-2">Secure & Transparent</h3>
            <p className="text-gray-300">
              Multi-chain support with full audit trails and compliance
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">Developer Resources</h2>
        
        <div className="glass rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-[var(--royal-gold)] mb-3">Documentation</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <a href="/docs/engineer-workflows" className="hover:text-white">Engineer Workflows</a></li>
                <li>• <a href="/STREAMS_SETUP.md" className="hover:text-white">Streams Setup Guide</a></li>
                <li>• <a href="/NEXT_STEPS.md" className="hover:text-white">Next Steps</a></li>
                <li>• <a href="/interfaces.json" className="hover:text-white">interfaces.json</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-[var(--royal-gold)] mb-3">GitHub</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• <a href="https://github.com/h3ro-dev/Royal-RWA-Website" className="hover:text-white">Repository</a></li>
                <li>• <a href="https://github.com/h3ro-dev/Royal-RWA-Website/actions" className="hover:text-white">Actions Dashboard</a></li>
                <li>• <code className="bg-white/10 px-2 py-1 rounded text-sm">./engineer-tools.sh</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Join the Future Section */}
      <div className="max-w-7xl mx-auto mt-16">
        <h2 className="text-4xl font-bold mb-8">Join the Future</h2>
        <p className="text-xl text-gray-400 mb-12 max-w-2xl">
          Join the future of investing. Access institutional-grade real estate
          opportunities with the security of blockchain technology and
          Royal&apos;s trusted platform.
        </p>
      </div>
    </main>
  )
} 