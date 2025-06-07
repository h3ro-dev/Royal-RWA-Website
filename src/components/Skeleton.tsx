import { motion } from 'framer-motion';
import { skeletonAnimation } from '@/lib/animations';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export function Skeleton({
  className = '',
  variant = 'text',
  width,
  height,
  count = 1,
}: SkeletonProps) {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl',
  };

  const defaultSizes = {
    text: { width: '100%', height: '1rem' },
    circular: { width: '3rem', height: '3rem' },
    rectangular: { width: '100%', height: '10rem' },
    card: { width: '100%', height: '20rem' },
  };

  const finalWidth = width || defaultSizes[variant].width;
  const finalHeight = height || defaultSizes[variant].height;

  const skeletons = Array.from({ length: count }, (_, i) => (
    <motion.div
      key={i}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width: finalWidth, height: finalHeight }}
      {...skeletonAnimation}
    />
  ));

  return count > 1 ? (
    <div className="space-y-2">{skeletons}</div>
  ) : (
    skeletons[0]
  );
}

// Specific skeleton components
export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <Skeleton variant="circular" className="mb-4" />
      <Skeleton variant="text" width="60%" className="mb-2" />
      <Skeleton variant="text" width="80%" className="mb-4" />
      <Skeleton variant="rectangular" height="8rem" />
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
      <Skeleton variant="text" width="40%" className="mb-2" />
      <Skeleton variant="text" width="60%" height="2rem" className="mb-1" />
      <Skeleton variant="text" width="30%" height="0.875rem" />
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      <td className="py-4 px-6">
        <Skeleton variant="text" width="80%" />
      </td>
      <td className="py-4 px-6">
        <Skeleton variant="text" width="60%" />
      </td>
      <td className="py-4 px-6">
        <Skeleton variant="text" width="40%" />
      </td>
      <td className="py-4 px-6">
        <Skeleton variant="text" width="50%" />
      </td>
    </tr>
  );
}

export function CalculatorSkeleton() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
        {/* Input section */}
        <div className="mb-8">
          <Skeleton variant="text" width="30%" className="mb-4" />
          <Skeleton variant="rectangular" height="3rem" className="mb-6" />
          
          <Skeleton variant="text" width="40%" className="mb-4" />
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Skeleton variant="rectangular" height="3rem" />
            <Skeleton variant="rectangular" height="3rem" />
            <Skeleton variant="rectangular" height="3rem" />
          </div>
          
          <Skeleton variant="text" width="35%" className="mb-2" />
          <Skeleton variant="rectangular" height="2rem" width="5rem" />
        </div>
        
        {/* Results section */}
        <div className="border-t pt-8">
          <Skeleton variant="text" width="25%" className="mb-6" />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Skeleton variant="text" width="50%" className="mb-2" />
              <Skeleton variant="text" width="70%" height="2rem" />
            </div>
            <div>
              <Skeleton variant="text" width="50%" className="mb-2" />
              <Skeleton variant="text" width="70%" height="2rem" />
            </div>
            <div>
              <Skeleton variant="text" width="50%" className="mb-2" />
              <Skeleton variant="text" width="70%" height="2rem" />
            </div>
            <div>
              <Skeleton variant="text" width="50%" className="mb-2" />
              <Skeleton variant="text" width="70%" height="2rem" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading wrapper component
interface LoadingWrapperProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
}

export function LoadingWrapper({ isLoading, skeleton, children }: LoadingWrapperProps) {
  return <>{isLoading ? skeleton : children}</>;
}