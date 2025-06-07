'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Calculator, Coins, TrendingUp, Building2, Info } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/calculator', label: 'Calculator', icon: Calculator },
  { href: '/tokens', label: 'Tokens', icon: Coins },
  { href: '/staking', label: 'Staking', icon: TrendingUp },
  { href: '/assets', label: 'Assets', icon: Building2 },
  { href: '/about', label: 'About', icon: Info }
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-royal-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-gold to-royal-bright-gold" />
            <span className="font-bold text-xl">Royal RWA</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-royal-light/80 hover:text-royal-gold transition-colors"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
            <Link href="/staking" className="primary-button text-sm px-6 py-2">
              Start Staking
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-royal-gold/10 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-royal-gold/20">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-royal-gold/10 transition-colors"
              >
                {item.icon && <item.icon className="w-5 h-5 text-royal-gold" />}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            <Link
              href="/staking"
              onClick={() => setIsOpen(false)}
              className="primary-button w-full text-center mt-4"
            >
              Start Staking
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}