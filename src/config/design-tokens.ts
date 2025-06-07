// Design Tokens - The foundation of our design system
export const tokens = {
  // Colors
  colors: {
    royal: {
      midnight: '#1a1a4e',
      deepBlue: '#2d2d7f',
      purple: '#4c1d95',
      gold: '#d4af37',
      brightGold: '#ffd700',
      lightGold: '#ffed4e',
    },
    neutral: {
      white: '#ffffff',
      gray100: '#f5f5f5',
      gray200: '#e5e5e5',
      gray300: '#d4d4d4',
      gray400: '#a3a3a3',
      gray500: '#737373',
      gray600: '#525252',
      gray700: '#404040',
      gray800: '#262626',
      gray900: '#171717',
      black: '#000000',
    },
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      error: '#ef4444',
      info: '#3b82f6',
    },
    alpha: {
      white10: 'rgba(255, 255, 255, 0.1)',
      white20: 'rgba(255, 255, 255, 0.2)',
      white30: 'rgba(255, 255, 255, 0.3)',
      white50: 'rgba(255, 255, 255, 0.5)',
      white70: 'rgba(255, 255, 255, 0.7)',
      white90: 'rgba(255, 255, 255, 0.9)',
      black10: 'rgba(0, 0, 0, 0.1)',
      black20: 'rgba(0, 0, 0, 0.2)',
      black30: 'rgba(0, 0, 0, 0.3)',
      black50: 'rgba(0, 0, 0, 0.5)',
      black70: 'rgba(0, 0, 0, 0.7)',
      black90: 'rgba(0, 0, 0, 0.9)',
    },
  },

  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
  },

  // Typography
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, sans-serif',
      display: 'Inter, system-ui, -apple-system, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
      '6xl': '3.75rem',  // 60px
      '7xl': '4.5rem',   // 72px
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
    },
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
  },

  // Border Radius
  borderRadius: {
    none: '0',
    sm: '0.125rem',    // 2px
    base: '0.25rem',   // 4px
    md: '0.375rem',    // 6px
    lg: '0.5rem',      // 8px
    xl: '0.75rem',     // 12px
    '2xl': '1rem',     // 16px
    '3xl': '1.5rem',   // 24px
    full: '9999px',
  },

  // Shadows
  shadows: {
    none: 'none',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    // Royal specific shadows
    gold: '0 0 30px rgba(212, 175, 55, 0.3)',
    goldHover: '0 0 40px rgba(212, 175, 55, 0.5)',
    royal: '0 4px 20px rgba(26, 26, 78, 0.25)',
    glow: '0 0 40px rgba(212, 175, 55, 0.5)',
  },

  // Transitions
  transitions: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
      slower: '500ms',
    },
    timing: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Z-index
  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modalBackdrop: '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },

  // Blur
  blur: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #1a1a4e 0%, #2d2d7f 100%)',
    gold: 'linear-gradient(135deg, #d4af37 0%, #ffd700 100%)',
    royal: 'linear-gradient(135deg, #1a1a4e 0%, #2d2d7f 50%, #4c1d95 100%)',
    goldShine: 'linear-gradient(135deg, #d4af37 0%, #ffd700 50%, #ffed4e 100%)',
    radial: 'radial-gradient(circle at 50% 50%, #2d2d7f 0%, #1a1a4e 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  },
} as const;

// Type exports
export type Colors = typeof tokens.colors;
export type Spacing = typeof tokens.spacing;
export type Typography = typeof tokens.typography;
export type BorderRadius = typeof tokens.borderRadius;
export type Shadows = typeof tokens.shadows;
export type Transitions = typeof tokens.transitions;
export type Breakpoints = typeof tokens.breakpoints;
export type ZIndex = typeof tokens.zIndex;
export type Blur = typeof tokens.blur;
export type Gradients = typeof tokens.gradients;

// Helper functions
export const getToken = (path: string): any => {
  const keys = path.split('.');
  let value: any = tokens;
  
  for (const key of keys) {
    value = value[key];
    if (value === undefined) return undefined;
  }
  
  return value;
};

// CSS variables generator
export const generateCSSVariables = (): string => {
  const cssVars: string[] = [];
  
  const processObject = (obj: any, prefix: string = '') => {
    Object.entries(obj).forEach(([key, value]) => {
      const varName = prefix ? `${prefix}-${key}` : key;
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        processObject(value, varName);
      } else {
        cssVars.push(`--${varName}: ${value};`);
      }
    });
  };
  
  processObject(tokens);
  
  return cssVars.join('\n');
};

export default tokens;