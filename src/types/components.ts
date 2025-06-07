import { ReactNode, HTMLAttributes, ButtonHTMLAttributes, InputHTMLAttributes } from 'react';

// Base Component Props - without extending HTMLAttributes to avoid conflicts
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Button Component
export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>, BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Card Component
export interface CardProps extends HTMLAttributes<HTMLDivElement>, BaseComponentProps {
  variant?: 'default' | 'glass' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  clickable?: boolean;
  gradient?: boolean;
}

// Input Component
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'children'>, BaseComponentProps {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'outlined';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  floatingLabel?: boolean;
}

// Modal Component
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  footer?: ReactNode;
}

// Navigation Component
export interface NavigationProps extends BaseComponentProps {
  items: NavigationItem[];
  variant?: 'default' | 'minimal' | 'bordered';
  orientation?: 'horizontal' | 'vertical';
  sticky?: boolean;
}

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  active?: boolean;
  disabled?: boolean;
  children?: NavigationItem[];
}

// Stat Card Component
export interface StatCardProps extends BaseComponentProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: ReactNode;
  loading?: boolean;
  variant?: 'default' | 'gradient' | 'bordered';
  trend?: 'up' | 'down' | 'neutral';
}

// Chart Component
export interface ChartProps extends BaseComponentProps {
  data: any[];
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut';
  height?: number;
  loading?: boolean;
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  animate?: boolean;
}

// Table Component
export interface TableProps<T = any> extends BaseComponentProps {
  data: T[];
  columns: TableColumn<T>[];
  loading?: boolean;
  pagination?: TablePagination;
  onRowClick?: (row: T) => void;
  striped?: boolean;
  hoverable?: boolean;
  compact?: boolean;
}

export interface TableColumn<T = any> {
  key: string;
  header: string;
  accessor: keyof T | ((row: T) => ReactNode);
  sortable?: boolean;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
}

export interface TablePagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

// Progress Bar Component
export interface ProgressBarProps extends BaseComponentProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  variant?: 'default' | 'gradient' | 'striped';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

// Count Up Component
export interface CountUpProps extends BaseComponentProps {
  end: number;
  start?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimal?: string;
  delay?: number;
  onEnd?: () => void;
}

// Yield Calculator Component
export interface YieldCalculatorProps extends BaseComponentProps {
  currentAPY: number;
  onCalculate: (amount: number, duration: number) => void;
  minAmount?: number;
  maxAmount?: number;
  currency?: string;
  showBreakdown?: boolean;
}

// Token Card Component
export interface TokenCardProps extends BaseComponentProps {
  symbol: string;
  name: string;
  icon?: string | ReactNode;
  balance?: string | number;
  value?: string | number;
  change?: number;
  apy?: number;
  staked?: boolean;
  loading?: boolean;
  onClick?: () => void;
  variant?: 'default' | '3d' | 'glass';
}

// Activity Feed Component
export interface ActivityFeedProps extends BaseComponentProps {
  activities: Activity[];
  loading?: boolean;
  showTimestamps?: boolean;
  variant?: 'default' | 'timeline' | 'compact';
  maxItems?: number;
  onLoadMore?: () => void;
}

export interface Activity {
  id: string;
  type: 'stake' | 'unstake' | 'reward' | 'transfer' | 'swap';
  title: string;
  description?: string;
  timestamp: Date;
  amount?: string | number;
  status?: 'pending' | 'completed' | 'failed';
  icon?: ReactNode;
  metadata?: Record<string, any>;
}

// Trust Badge Component
export interface TrustBadgeProps extends BaseComponentProps {
  variant?: 'audited' | 'verified' | 'secure' | 'certified';
  size?: 'sm' | 'md' | 'lg';
  tooltip?: string;
  href?: string;
  animate?: boolean;
}

// Staking Card Component
export interface StakingCardProps extends BaseComponentProps {
  tokenSymbol: string;
  tokenName: string;
  apy: number;
  totalStaked: string | number;
  userStaked?: string | number;
  minStake?: number;
  lockPeriod?: string;
  onStake: (amount: number) => void;
  onUnstake: (amount: number) => void;
  loading?: boolean;
  disabled?: boolean;
}

// Skeleton Component
export interface SkeletonProps extends BaseComponentProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: number | string;
  height?: number | string;
  animation?: 'pulse' | 'wave' | 'none';
  count?: number;
}

// Toast Component
export interface ToastProps extends BaseComponentProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
  onClose?: () => void;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Tooltip Component
export interface TooltipProps extends BaseComponentProps {
  tooltipContent: ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click' | 'focus';
  delay?: number;
  arrow?: boolean;
}

// Badge Component
export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  badgeContent?: string | number;
  max?: number;
}

// Avatar Component
export interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  name?: string;
  variant?: 'circular' | 'rounded' | 'square';
  status?: 'online' | 'offline' | 'away' | 'busy';
  badge?: ReactNode;
}

// Tabs Component
export interface TabsProps extends BaseComponentProps {
  items: TabItem[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underlined';
  orientation?: 'horizontal' | 'vertical';
}

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

// Accordion Component
export interface AccordionProps extends BaseComponentProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: string[];
  variant?: 'default' | 'bordered' | 'separated';
}

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

// Switch Component
export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'children' | 'size'>, BaseComponentProps {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'success' | 'warning' | 'danger';
}

// Divider Component
export interface DividerProps extends BaseComponentProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'dotted';
  spacing?: 'sm' | 'md' | 'lg';
  color?: string;
}

// Export all types
export type ComponentProps = 
  | ButtonProps
  | CardProps
  | InputProps
  | ModalProps
  | NavigationProps
  | StatCardProps
  | ChartProps
  | TableProps
  | ProgressBarProps
  | CountUpProps
  | YieldCalculatorProps
  | TokenCardProps
  | ActivityFeedProps
  | TrustBadgeProps
  | StakingCardProps
  | SkeletonProps
  | ToastProps
  | TooltipProps
  | BadgeProps
  | AvatarProps
  | TabsProps
  | AccordionProps
  | SwitchProps
  | DividerProps;