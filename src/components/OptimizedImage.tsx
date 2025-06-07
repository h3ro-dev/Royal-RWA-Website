import Image, { ImageProps } from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  alt: string;
  fallbackSrc?: string;
  showSkeleton?: boolean;
}

export function OptimizedImage({
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  showSkeleton = true,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Skeleton loader */}
      {showSkeleton && isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"
          initial={{ opacity: 1 }}
          animate={{ opacity: isLoading ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Image */}
      <Image
        {...props}
        src={hasError ? fallbackSrc : props.src}
        alt={alt}
        loading={props.priority ? "eager" : "lazy"}
        placeholder={props.placeholder || "blur"}
        quality={props.quality || 85}
        sizes={props.sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"}
        onLoadingComplete={handleLoadingComplete}
        onError={handleError}
        className={`${props.className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      />
    </div>
  );
}

// Blur data URL generator for custom blur placeholders
export function generateBlurDataURL(width: number = 10, height: number = 10): string {
  const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;
  if (!canvas) return '';
  
  canvas.width = width;
  canvas.height = height;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // Create a gradient or solid color as placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#1a1a4e'); // royal-midnight
  gradient.addColorStop(1, '#2d2d7f'); // royal-deep-blue
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
}