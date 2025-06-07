'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Award, Users, Globe, CheckCircle, Star, Building, ArrowRight } from 'lucide-react'

const milestones = [
  { year: '2021', event: 'Royal RWA conceptualized with vision for African asset tokenization' },
  { year: '2022', event: 'Strategic partnerships formed with leading African financial institutions' },
  { year: '2023', event: 'First real-world assets tokenized and platform beta launched' },
  { year: '2024', event: 'Public launch with $125M+ in tokenized assets' }
]

const teamMembers = [
  {
    name: 'Dr. Amara Okafor',
    role: 'CEO & Co-Founder',
    bio: '15+ years in African capital markets',
    expertise: 'Former MD at African Development Bank'
  },
  {
    name: 'James Mitchell',
    role: 'CTO & Co-Founder', 
    bio: '12+ years in blockchain technology',
    expertise: 'Ex-Ethereum core developer'
  },
  {
    name: 'Fatima Al-Hassan',
    role: 'Chief Compliance Officer',
    bio: '20+ years in financial regulation',
    expertise: 'Former regulator at Dubai Financial Services Authority'
  },
  {
    name: 'Chen Wei',
    role: 'Head of Asset Management',
    bio: '18+ years in real estate investment',
    expertise: 'Managed $2B+ portfolio across emerging markets'
  }
]

const partners = [
  { name: 'Kenya Commercial Bank', type: 'Banking Partner' },
  { name: 'PwC Africa', type: 'Audit Partner' },
  { name: 'Clifford Chance', type: 'Legal Partner' },
  { name: 'Chainlink', type: 'Oracle Partner' }
]

export default function AboutPage() {
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
            About <span className="gold-gradient-text">Royal RWA</span>
          </h1>
          <p className="text-xl text-royal-light/80 max-w-3xl">
            Building the bridge between sovereign wealth and individual opportunity
          </p>
        </div>
        
        {/* Mission Section */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg text-royal-light/80 mb-6">
            Royal RWA exists to democratize access to institutional-grade investments in African real-world assets. 
            We believe that the future of finance is transparent, accessible, and backed by real value.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal-gold/20 mb-4">
                <Globe className="w-8 h-8 text-royal-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Global Access</h3>
              <p className="text-sm text-royal-light/60">
                Breaking down barriers to African investment opportunities
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal-gold/20 mb-4">
                <Shield className="w-8 h-8 text-royal-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real Security</h3>
              <p className="text-sm text-royal-light/60">
                100% asset-backed tokens with institutional-grade custody
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-royal-gold/20 mb-4">
                <Users className="w-8 h-8 text-royal-gold" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inclusive Finance</h3>
              <p className="text-sm text-royal-light/60">
                Making sovereign wealth opportunities available to all
              </p>
            </div>
          </div>
        </div>
        
        {/* Why Trust Us Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Trust <span className="gold-gradient-text">Royal RWA</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Regulated & Compliant</h3>
                  <p className="text-royal-light/60">
                    Licensed and regulated in multiple jurisdictions with full KYC/AML compliance
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Audited Smart Contracts</h3>
                  <p className="text-royal-light/60">
                    All smart contracts audited by CertiK and Quantstamp
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Insurance Coverage</h3>
                  <p className="text-royal-light/60">
                    $100M+ insurance coverage for digital assets and operations
                  </p>
                </div>
              </div>
            </div>
            <div className="glass-card p-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent Operations</h3>
                  <p className="text-royal-light/60">
                    Real-time on-chain verification of all assets and reserves
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Journey Timeline */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8">Our Journey</h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-royal-gold flex items-center justify-center text-royal-midnight font-bold">
                    {milestone.year.slice(-2)}
                  </div>
                </div>
                <div className="flex-1 pb-6 border-l-2 border-royal-gold/30 pl-6 -mt-6">
                  <div className="mt-6">
                    <div className="text-sm text-royal-gold font-semibold mb-1">{milestone.year}</div>
                    <p className="text-royal-light/80">{milestone.event}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-royal-gold to-royal-bright-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-royal-gold mb-3">{member.role}</p>
                <p className="text-sm text-royal-light/60 mb-2">{member.bio}</p>
                <p className="text-xs text-royal-light/50">{member.expertise}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Partners Section */}
        <div className="glass-card p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Trusted Partners</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div key={index} className="text-center">
                <div className="h-20 bg-royal-midnight/50 rounded-lg flex items-center justify-center mb-3">
                  <Building className="w-8 h-8 text-royal-gold/60" />
                </div>
                <h3 className="font-semibold mb-1">{partner.name}</h3>
                <p className="text-sm text-royal-light/60">{partner.type}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Awards & Recognition */}
        <div className="glass-card p-8 text-center mb-12">
          <Award className="w-12 h-12 text-royal-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Awards & Recognition</h2>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-royal-gold" />
              <span>Best DeFi Platform Africa 2024</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-royal-gold" />
              <span>Innovation Award - Blockchain Summit</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-royal-gold" />
              <span>Top 10 RWA Projects Globally</span>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the <span className="gold-gradient-text">Revolution?</span>
          </h2>
          <p className="text-xl text-royal-light/80 mb-8 max-w-2xl mx-auto">
            Be part of the future of finance. Start earning sustainable yields backed by real assets today.
          </p>
          <Link href="/staking" className="primary-button inline-flex items-center gap-2">
            Start Investing Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}