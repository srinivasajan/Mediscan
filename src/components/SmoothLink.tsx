import React, { ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useSmoothScroll } from './SmoothScrollProvider';

interface SmoothLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: ReactNode;
  smooth?: boolean;
  offset?: number;
  duration?: number;
  className?: string;
}

const SmoothLink: React.FC<SmoothLinkProps> = ({
  to,
  children,
  smooth = false,
  offset = -100,
  duration = 2.5,
  className = '',
  ...props
}) => {
  const { scrollToElement } = useSmoothScroll();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's a hash link and smooth is enabled
    if (smooth && to.startsWith('#')) {
      e.preventDefault();
      scrollToElement(to, { 
        offset, 
        duration,
        easing: (t: number) => {
          // Ultra-smooth easing for navigation
          return t < 0.5 
            ? 8 * t * t * t * t 
            : 1 - Math.pow(-2 * t + 2, 4) / 2;
        }
      });
    }
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`
        transition-all duration-300 ease-out
        hover:transform hover:scale-105
        active:scale-95
        ${className}
      `}
      {...props}
    >
      {children}
    </Link>
  );
};

export default SmoothLink;