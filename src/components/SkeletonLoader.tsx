import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular' | 'button' | 'card' | 'image';
  width?: string | number;
  height?: string | number;
  lines?: number;
  animate?: boolean;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  lines = 1,
  animate = true
}) => {
  const baseClasses = `
    bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200
    ${animate ? 'skeleton-shimmer' : ''}
    transition-all duration-300
  `;

  const variants = {
    text: 'h-4 rounded',
    rectangular: 'rounded',
    circular: 'rounded-full',
    button: 'h-10 rounded',
    card: 'rounded-lg',
    image: 'rounded aspect-video'
  };

  const style = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height || undefined
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseClasses} ${variants.text}`}
            style={{
              width: index === lines - 1 ? '75%' : '100%',
              ...style
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      style={style}
    />
  );
};

export default SkeletonLoader;