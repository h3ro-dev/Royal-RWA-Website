import { NextResponse } from 'next/server'

interface ActivityEvent {
  id: string
  type: 'stake' | 'unstake' | 'claim' | 'asset_added' | 'trade' | 'reward'
  timestamp: number
  data: {
    user?: string
    amount?: string
    asset?: {
      id: string
      name: string
      value: string
    }
    transactionHash?: string
    lockPeriod?: number
    apy?: number
  }
}

// Generate mock activity events
function generateActivityEvent(): ActivityEvent {
  const types: ActivityEvent['type'][] = ['stake', 'unstake', 'claim', 'asset_added', 'trade', 'reward']
  const type = types[Math.floor(Math.random() * types.length)]
  
  const addresses = [
    '0x742d35Cc6634C0532925a3b844Bc9e7595f89234',
    '0x123f681646d4a755815f9CB19e1aCc8565A0C2B5',
    '0x5aAeb6053f3E94C9b9A09f33669435E7Ef1BeAed',
    '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
    '0x2546BcD3c84621e976D8185a7D0e86eC8A7E3c62',
  ]
  
  const event: ActivityEvent = {
    id: Math.random().toString(36).substring(7),
    type,
    timestamp: Date.now(),
    data: {},
  }
  
  switch (type) {
    case 'stake':
      event.data = {
        user: addresses[Math.floor(Math.random() * addresses.length)],
        amount: (Math.floor(Math.random() * 100000) + 1000).toString(),
        lockPeriod: [0, 365, 730][Math.floor(Math.random() * 3)],
        apy: [10, 12, 14][Math.floor(Math.random() * 3)],
        transactionHash: `0x${Math.random().toString(16).substring(2)}`,
      }
      break
      
    case 'unstake':
    case 'claim':
      event.data = {
        user: addresses[Math.floor(Math.random() * addresses.length)],
        amount: (Math.floor(Math.random() * 50000) + 500).toString(),
        transactionHash: `0x${Math.random().toString(16).substring(2)}`,
      }
      break
      
    case 'asset_added':
      const assetNames = [
        'Nairobi Tech Hub',
        'Lagos Solar Farm',
        'Cairo Smart City',
        'Kigali Innovation Center',
        'Accra Green Complex',
      ]
      event.data = {
        asset: {
          id: Math.random().toString(36).substring(7),
          name: assetNames[Math.floor(Math.random() * assetNames.length)],
          value: (Math.floor(Math.random() * 20000000) + 1000000).toString(),
        },
      }
      break
      
    case 'trade':
      event.data = {
        user: addresses[Math.floor(Math.random() * addresses.length)],
        amount: (Math.floor(Math.random() * 50000) + 1000).toString(),
        transactionHash: `0x${Math.random().toString(16).substring(2)}`,
      }
      break
      
    case 'reward':
      event.data = {
        user: addresses[Math.floor(Math.random() * addresses.length)],
        amount: (Math.floor(Math.random() * 5000) + 100).toString(),
      }
      break
  }
  
  return event
}

// GET /api/activity/stream - Server-Sent Events for real-time activity
export async function GET(request: Request) {
  const encoder = new TextEncoder()
  
  const stream = new ReadableStream({
    async start(controller) {
      // Send initial event
      const initialEvent = generateActivityEvent()
      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialEvent)}\n\n`))
      
      // Set up interval to send events
      const interval = setInterval(() => {
        try {
          // Generate and send new activity event
          const event = generateActivityEvent()
          const data = `data: ${JSON.stringify(event)}\n\n`
          controller.enqueue(encoder.encode(data))
        } catch (error) {
          console.error('Error sending activity event:', error)
        }
      }, 3000 + Math.random() * 7000) // Random interval between 3-10 seconds
      
      // Clean up on abort
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
      
      // Send heartbeat every 30 seconds to keep connection alive
      const heartbeat = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(':heartbeat\n\n'))
        } catch (error) {
          clearInterval(heartbeat)
        }
      }, 30000)
      
      request.signal.addEventListener('abort', () => {
        clearInterval(heartbeat)
      })
    },
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // Disable Nginx buffering
    },
  })
}