import React, { ReactNode } from 'react';

interface SmoothButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const SmoothButton: React.FC<SmoothButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseClasses = 'lightning-button button-press ripple font-bold uppercase tracking-wide transition-all duration-200 ease-out transform will-change-transform';
  
  const variantClasses = {
    primary: 'bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-lg',
    secondary: 'bg-white text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-50',
    outline: 'border-2 border-neutral-300 text-neutral-900 hover:border-neutral-900 hover:bg-neutral-50'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base'
  };

  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed transform-none' 
    : 'hover:transform hover:-translate-y-1 active:transform active:scale-98';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default SmoothButton;