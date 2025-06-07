# Royal Website Design System

## Overview

The Royal Website Design System is a comprehensive collection of design tokens, utilities, and components built specifically for the Royal RWA platform. It features a dark theme with royal blue and gold accents, glassmorphism effects, and mobile-first responsive design.

## Design Tokens

All design decisions are centralized in `src/styles/design-tokens.ts`:

- **Colors**: Royal color palette including midnight blue, deep blue, gold, and semantic colors
- **Typography**: Font families (Inter, Montserrat, JetBrains Mono), sizes, weights
- **Spacing**: Consistent spacing scale from 0 to 96
- **Animations**: Durations, easing functions, and keyframes
- **Effects**: Blur values, shadows, and glassmorphism effects

## Core Utilities

### cn() - Class Name Utility
Combines clsx and tailwind-merge for optimal className handling:

```tsx
import { cn } from '@/components'

// Merges classes intelligently
<div className={cn('p-4 bg-white', 'bg-black', isActive && 'text-gold')} />
```

### Style Helpers
Pre-defined style combinations in `src/utils/style-helpers.ts`:

```tsx
import { responsiveText, glassStyles, gradientText } from '@/components'

// Responsive text sizes
<h1 className={responsiveText.h1}>Large Heading</h1>

// Glass morphism effects
<div className={glassStyles.medium}>Glass Card</div>

// Gradient text
<span className={gradientText.gold}>Golden Text</span>
```

## Components

### Button

A versatile button component with multiple variants, sizes, and states:

```tsx
import { Button, ButtonGroup } from '@/components'

// Primary button with glow effect
<Button variant="primary" glow>
  Get Started
</Button>

// Secondary glass button with icon
<Button variant="secondary" icon={<Icon />} iconPosition="left">
  Learn More
</Button>

// Loading state
<Button loading>
  Processing...
</Button>

// Button group
<ButtonGroup>
  <Button>Option 1</Button>
  <Button>Option 2</Button>
  <Button>Option 3</Button>
</ButtonGroup>
```

**Props:**
- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link'
- `size`: 'sm' | 'md' | 'lg' | 'xl'
- `fullWidth`: boolean
- `loading`: boolean
- `icon`: ReactNode
- `iconPosition`: 'left' | 'right'
- `glow`: boolean
- `pulse`: boolean

### Card

A flexible card component with glassmorphism effects:

```tsx
import { Card, CardHeader, CardContent, CardFooter } from '@/components'

// Glass card with hover effect
<Card variant="glass" hover glow>
  <CardHeader
    title="Yield Farming"
    subtitle="Earn up to 14% APY"
    action={<Button size="sm">View</Button>}
  />
  <CardContent>
    <p>Content goes here...</p>
  </CardContent>
  <CardFooter align="between">
    <span>$1,234</span>
    <Button variant="primary">Stake Now</Button>
  </CardFooter>
</Card>

// Gradient card
<Card variant="gradient" gradient="gold">
  <p>Golden gradient background</p>
</Card>
```

**Props:**
- `variant`: 'default' | 'glass' | 'solid' | 'gradient'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `hover`: boolean
- `glow`: boolean
- `gradient`: 'gold' | 'royal' | 'mixed' | 'custom'

### Typography

Complete typography system with animations and gradients:

```tsx
import { Heading, Text, Display, Code, Quote, List } from '@/components'

// Animated heading with gradient
<Heading level={1} gradient="gold" glow animate="slide">
  Welcome to Royal RWA
</Heading>

// Body text with custom styling
<Text size="lg" weight="medium" color="secondary">
  Invest in real-world assets with confidence
</Text>

// Large decorative display text
<Display size="xl" gradient="mixed">
  14% APY
</Display>

// Code blocks
<Code variant="inline">const yield = 0.14</Code>
<Code variant="block">
  {`function calculateYield() {
    return investment * 0.14
  }`}
</Code>

// Quotes
<Quote author="Satoshi Nakamoto" source="Bitcoin Whitepaper">
  A purely peer-to-peer version of electronic cash...
</Quote>

// Lists
<List variant="check" spacing="loose">
  <li>100% Asset Backed</li>
  <li>Audited Smart Contracts</li>
  <li>Institutional Grade Security</li>
</List>
```

### Input

Form input components with validation states:

```tsx
import { Input, Textarea, InputGroup } from '@/components'

// Input with label and validation
<Input
  label="Email Address"
  type="email"
  placeholder="investor@example.com"
  required
  error={hasError}
  errorMessage="Please enter a valid email"
  icon={<MailIcon />}
/>

// Success state
<Input
  label="Wallet Address"
  success
  successMessage="Address verified"
  value={address}
/>

// Textarea
<Textarea
  label="Investment Goals"
  helper="Tell us about your investment objectives"
  rows={4}
/>

// Input group
<InputGroup label="Amount to Stake">
  <Input type="number" placeholder="0.00" />
  <Button variant="secondary">Max</Button>
</InputGroup>
```

### Layout Components

Flexible layout system:

```tsx
import { Container, Section, Grid, Row, Spacer, Divider } from '@/components'

// Page section with container
<Section variant="gradient" padding="large">
  <Container size="wide">
    <Heading>Our Features</Heading>
    
    <Grid cols={3} gap="lg">
      <Card>Feature 1</Card>
      <Card>Feature 2</Card>
      <Card>Feature 3</Card>
    </Grid>
  </Container>
</Section>

// Flexible row layout
<Row align="center" justify="between" gap="md">
  <Text>Total Value Locked</Text>
  <Display size="sm">$100M</Display>
</Row>

// Spacing
<Spacer size="xl" />

// Dividers
<Divider variant="gradient" color="gold" spacing="lg" />
```

## Global Styles

The global styles in `src/styles/globals.css` include:

- Dark theme with CSS variables
- Custom scrollbar styling
- Glassmorphism utility classes
- Animation keyframes
- Focus ring styles
- Mobile-first responsive utilities

## Tailwind Configuration

Custom Tailwind configuration extends the default with:

- Royal color palette
- Custom font families
- Extended spacing scale
- Glass morphism utilities
- Animation presets
- Custom breakpoints

## Best Practices

1. **Use Design Tokens**: Always use tokens from the design system rather than hard-coding values
2. **Mobile First**: Design for mobile screens first, then enhance for larger screens
3. **Accessibility**: All interactive components include proper focus states and ARIA attributes
4. **Performance**: Components use CSS transforms and will-change for smooth animations
5. **Consistency**: Use the pre-built components and utilities for consistent UI

## Examples

### Hero Section
```tsx
<Section variant="dark" padding="xlarge">
  <Container>
    <Row align="center" direction="col" gap="xl">
      <Display gradient="gold" animate="fade">
        The Future of Finance
      </Display>
      <Text size="xl" color="secondary" className="text-center max-w-3xl">
        Invest in tokenized real-world assets with institutional-grade security
      </Text>
      <ButtonGroup>
        <Button variant="primary" size="lg" glow>
          Start Investing
        </Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </ButtonGroup>
    </Row>
  </Container>
</Section>
```

### Feature Card Grid
```tsx
<Grid cols={3} gap="lg">
  {features.map((feature, index) => (
    <Card
      key={feature.id}
      variant="glass"
      hover
      style={animationDelay(index)}
      className="animate-slide-in"
    >
      <div className={cn(glowShadows.gold, 'w-16 h-16 rounded-full flex items-center justify-center mb-4')}>
        {feature.icon}
      </div>
      <Heading level={3} className="mb-2">
        {feature.title}
      </Heading>
      <Text color="secondary">
        {feature.description}
      </Text>
    </Card>
  ))}
</Grid>
```

## Component Status

✅ **Complete**
- Button (with ButtonGroup)
- Card (with subcomponents)
- Typography (Heading, Text, Display, Code, Quote, List)
- Input (with Textarea, InputGroup)
- Layout (Container, Section, Grid, Row, Column, Spacer, Divider)

🚧 **Coming Soon**
- Modal
- Dropdown
- Tabs
- Toast/Notification
- Progress indicators
- Charts
- 3D Token visualizer
- Particle effects

## Contributing

When adding new components:
1. Follow the existing component structure
2. Include TypeScript types
3. Add proper documentation
4. Ensure mobile responsiveness
5. Test with all variants
6. Update this documentation