import { Variants } from 'framer-motion';

// Global animation presets
export const animations = {
  // Micro-interactions
  hover: {
    scale: 1.02,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10
    }
  },
  
  tap: {
    scale: 0.98,
    transition: { 
      type: "spring", 
      stiffness: 400,
      damping: 10
    }
  },
  
  // Page transitions
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  // Fade animations
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.3 }
  },
  
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  // Stagger children
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  },
  
  staggerChild: {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  },
  
  // Success celebrations
  success: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: { 
      duration: 0.5,
      times: [0, 0.3, 0.7, 1],
      ease: "easeInOut"
    }
  },
  
  // Slide animations
  slideInLeft: {
    initial: { x: -100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  },
  
  slideInRight: {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

// Variants for complex animations
export const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

// Loading skeleton animation
export const skeletonAnimation = {
  initial: { opacity: 0.6 },
  animate: { 
    opacity: [0.6, 1, 0.6],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Royal theme specific animations
export const royalGlow = {
  initial: { filter: "brightness(1)" },
  animate: {
    filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Particle System for celebrations
export class ParticleSystem {
  private container: HTMLElement | null = null;
  
  constructor(containerId?: string) {
    if (typeof window !== 'undefined') {
      this.container = containerId 
        ? document.getElementById(containerId) 
        : document.body;
    }
  }
  
  celebrate(type: 'stake' | 'yield' | 'milestone') {
    if (!this.container || typeof window === 'undefined') return;
    
    const colors = {
      stake: ['#d4af37', '#ffd700', '#ffed4e'],
      yield: ['#4ade80', '#22c55e', '#86efac'],
      milestone: ['#818cf8', '#6366f1', '#a5b4fc']
    };
    
    const particleCount = type === 'milestone' ? 100 : 50;
    const particles = colors[type];
    
    for (let i = 0; i < particleCount; i++) {
      this.createParticle(particles);
    }
    
    // Play success sound (optional)
    if ('vibrate' in navigator) {
      navigator.vibrate(200);
    }
  }
  
  private createParticle(colors: string[]) {
    const particle = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = window.innerHeight + 10;
    
    // Random movement values
    const endX = startX + (Math.random() - 0.5) * 300;
    const endY = startY - (Math.random() * window.innerHeight * 1.5);
    const duration = 2000 + Math.random() * 1000;
    const size = 4 + Math.random() * 8;
    
    particle.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      left: ${startX}px;
      top: ${startY}px;
      box-shadow: 0 0 ${size}px ${color};
    `;
    
    this.container?.appendChild(particle);
    
    // Animate the particle
    particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)',
        opacity: 1 
      },
      { 
        transform: `translate(${endX - startX}px, ${endY - startY}px) scale(0)`,
        opacity: 0 
      }
    ], {
      duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    }).onfinish = () => particle.remove();
  }
}

// Scroll reveal configuration
export const scrollRevealConfig = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: "easeOut" }
};

// Performance-optimized animation settings
export const reducedMotion = {
  hover: {},
  tap: {},
  pageEnter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.1 }
  }
};

// Check for reduced motion preference
export function shouldReduceMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Animation wrapper component props
export interface AnimationWrapperProps {
  animation?: keyof typeof animations;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}