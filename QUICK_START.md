# Royal RWA Website - Quick Start Guide

## 🚀 Start Here

### 1. Clone and Setup
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/Promax-digital-royal-website.git
cd Promax-digital-royal-website

# Install dependencies (once we set up the project)
npm install
```

### 2. Essential Reading (30 minutes)
1. **[docs/GOLDEN_RULES.md](docs/GOLDEN_RULES.md)** - 5 min (MUST READ)
2. **[docs/ROYAL_CORE_TRUTH.md](docs/ROYAL_CORE_TRUTH.md)** - 10 min
3. **[docs/research/TARGET_AUDIENCE_RESEARCH.md](docs/research/TARGET_AUDIENCE_RESEARCH.md)** - 15 min

### 3. Development Priorities

#### Phase 1: Foundation (Week 1)
- [ ] Set up Next.js 14 with TypeScript
- [ ] Implement design system (colors, fonts, spacing)
- [ ] Create mobile-first responsive grid
- [ ] Set up Tailwind with custom config
- [ ] Basic component library (Button, Card, Input)

#### Phase 2: Core Pages (Week 2)
- [ ] Hero section with 3D globe
- [ ] Three-token ecosystem visualizer
- [ ] Interactive yield calculator
- [ ] Asset portfolio showcase
- [ ] About/Trust page

#### Phase 3: Interactions (Week 3)
- [ ] Framer Motion animations
- [ ] Three.js 3D elements
- [ ] Real-time data integration
- [ ] Staking flow prototype
- [ ] Mobile optimization

#### Phase 4: Polish (Week 4)
- [ ] Performance optimization
- [ ] SEO implementation
- [ ] Accessibility audit
- [ ] Cross-browser testing
- [ ] Launch preparation

## 🎨 Design Tokens Quick Reference

```css
/* Colors */
--royal-midnight: #1a1a4e;
--royal-deep-blue: #2d2d7f;
--royal-gold: #d4af37;
--royal-bright-gold: #ffd700;

/* Spacing */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 48px;

/* Typography */
--font-display: 'Clash Display', sans-serif;
--font-body: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

## 📱 Mobile-First Breakpoints
```scss
$mobile: 320px;    // Base
$tablet: 768px;    // iPads
$desktop: 1024px;  // Laptops
$wide: 1440px;     // Desktops
```

## ⚡ Performance Checklist
- [ ] Images: WebP with fallbacks
- [ ] Fonts: Variable fonts with preload
- [ ] Code: Route-based splitting
- [ ] Data: Static where possible
- [ ] Animations: GPU-accelerated only

## 🧪 Testing Checklist
- [ ] Mobile: iPhone SE, Pixel 3
- [ ] Network: Throttle to 3G
- [ ] Accessibility: Screen reader
- [ ] Performance: Lighthouse score >90
- [ ] Cross-browser: Chrome, Safari, Firefox

## 🚨 Red Flags - Stop If You See:
- Loading time >3s on 3G
- Text smaller than 14px
- Touch targets <44px
- Contrast ratio <4.5:1
- Animation without purpose
- Features that don't serve users

## 💬 Key Messaging
- **Hero**: "Your Money Deserves Better Than 30% Inflation"
- **Value**: "Real Assets. Real Yields. Really Accessible."
- **Trust**: "100% Asset-Backed. 100% Transparent."
- **CTA**: "Start with $10" / "Calculate Your Yield"

## 🔗 Important Links
- Whitepaper: [In docs/]
- Design System: [docs/BRANDING_GUIDE_3.0.md](docs/BRANDING_GUIDE_3.0.md)
- Tech Stack: [docs/TECHNICAL_REQUIREMENTS.md](docs/TECHNICAL_REQUIREMENTS.md)
- Content Guide: [docs/CONTENT_STRATEGY.md](docs/CONTENT_STRATEGY.md)

## 🎯 Success Criteria
1. **Grandma Test**: Can your grandma understand what we do?
2. **Speed Test**: Does it load in under 3 seconds on 3G?
3. **Trust Test**: Do you feel safe investing your money?
4. **Mobile Test**: Is everything usable with one thumb?
5. **Impact Test**: Does it help someone in Kenya save money?

## 🆘 Need Help?
1. Check the docs first
2. Ask: "Does this serve our users?"
3. When in doubt, simplify
4. Remember: We're fixing finance

---

**Now let's build something revolutionary! 🚀**