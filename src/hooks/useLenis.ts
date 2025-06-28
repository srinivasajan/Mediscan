import { useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';

interface LenisOptions {
  duration?: number;
  easing?: (t: number) => number;
  direction?: 'vertical' | 'horizontal';
  gestureDirection?: 'vertical' | 'horizontal' | 'both';
  smooth?: boolean;
  mouseMultiplier?: number;
  smoothTouch?: boolean;
  touchMultiplier?: number;
  infinite?: boolean;
  autoResize?: boolean;
  syncTouch?: boolean;
  syncTouchLerp?: number;
  touchInertiaMultiplier?: number;
  wheelMultiplier?: number;
  normalizeWheel?: boolean;
  lerp?: number;
}

interface SmoothScrollReturn {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: any) => void;
  scrollToTop: () => void;
  scrollToElement: (selector: string, options?: any) => void;
  start: () => void;
  stop: () => void;
  destroy: () => void;
}

const defaultOptions: LenisOptions = {
  duration: 2.5, // Increased for ultra-smooth feel
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ultra-smooth easing
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 0.8, // Reduced for smoother mouse wheel
  smoothTouch: true, // Enable smooth touch scrolling
  touchMultiplier: 1.5, // Optimized touch sensitivity
  infinite: false,
  autoResize: true,
  syncTouch: true, // Sync touch with smooth scrolling
  syncTouchLerp: 0.075, // Ultra-smooth touch lerp
  touchInertiaMultiplier: 25, // Enhanced touch inertia
  wheelMultiplier: 0.6, // Smoother wheel scrolling
  normalizeWheel: true,
  lerp: 0.06, // Ultra-smooth interpolation
};

export const useLenis = (options: LenisOptions = {}): SmoothScrollReturn => {
  const lenisRef = useRef<Lenis | null>(null);
  const rafRef = useRef<number>();

  const mergedOptions = { ...defaultOptions, ...options };

  // Ultra-smooth RAF loop
  const raf = useCallback((time: number) => {
    lenisRef.current?.raf(time);
    rafRef.current = requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Disable smooth scrolling for accessibility
      return;
    }

    // Initialize Lenis with ultra-smooth settings
    lenisRef.current = new Lenis({
      ...mergedOptions,
      // Additional smooth scroll optimizations
      wrapper: window,
      content: document.documentElement,
    });

    // Start the RAF loop
    rafRef.current = requestAnimationFrame(raf);

    // Enhanced scroll event handling
    const handleScroll = () => {
      // Trigger custom scroll events for other components
      window.dispatchEvent(new CustomEvent('smooth-scroll', {
        detail: { 
          scroll: lenisRef.current?.scroll,
          velocity: lenisRef.current?.velocity,
          direction: lenisRef.current?.direction,
        }
      }));
    };

    lenisRef.current.on('scroll', handleScroll);

    // Cleanup
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [raf, mergedOptions]);

  // Ultra-smooth scroll to function
  const scrollTo = useCallback((target: string | number | HTMLElement, options: any = {}) => {
    if (!lenisRef.current) return;
    
    const smoothOptions = {
      offset: 0,
      duration: 2.5, // Ultra-smooth duration
      easing: (t: number) => 1 - Math.pow(1 - t, 4), // Smooth ease-out
      lerp: 0.05, // Ultra-smooth interpolation
      ...options,
    };

    lenisRef.current.scrollTo(target, smoothOptions);
  }, []);

  const scrollToTop = useCallback(() => {
    scrollTo(0, { 
      duration: 3, // Longer duration for top scroll
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });
  }, [scrollTo]);

  const scrollToElement = useCallback((selector: string, options: any = {}) => {
    const element = document.querySelector(selector);
    if (element) {
      scrollTo(element, {
        offset: -100, // Account for header
        duration: 2.5,
        ...options,
      });
    }
  }, [scrollTo]);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const destroy = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    lenisRef.current?.destroy();
    lenisRef.current = null;
  }, []);

  return {
    lenis: lenisRef.current,
    scrollTo,
    scrollToTop,
    scrollToElement,
    start,
    stop,
    destroy,
  };
};

export default useLenis;