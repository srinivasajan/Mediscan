import React, { createContext, useContext, ReactNode } from 'react';
import { useLenis } from '../hooks/useLenis';

interface SmoothScrollContextType {
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
  scrollToTop: () => void;
  scrollToElement: (selector: string, options?: any) => void;
  start: () => void;
  stop: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType | undefined>(undefined);

export const useSmoothScroll = () => {
  const context = useContext(SmoothScrollContext);
  if (!context) {
    throw new Error('useSmoothScroll must be used within a SmoothScrollProvider');
  }
  return context;
};

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const { scrollTo, scrollToTop, scrollToElement, start, stop } = useLenis({
    // Ultra-smooth configuration
    duration: 2.8,
    easing: (t: number) => {
      // Custom ultra-smooth easing function
      return t < 0.5 
        ? 4 * t * t * t 
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    },
    lerp: 0.05, // Ultra-smooth interpolation
    mouseMultiplier: 0.7, // Smoother mouse wheel
    touchMultiplier: 1.2, // Optimized touch
    wheelMultiplier: 0.5, // Ultra-smooth wheel
    syncTouchLerp: 0.06, // Smooth touch sync
    touchInertiaMultiplier: 30, // Enhanced inertia
    smoothTouch: true,
    normalizeWheel: true,
  });

  return (
    <SmoothScrollContext.Provider value={{
      scrollTo,
      scrollToTop,
      scrollToElement,
      start,
      stop,
    }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};