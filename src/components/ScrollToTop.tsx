import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useSmoothScroll } from './SmoothScrollProvider';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollToTop } = useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      setIsVisible(scrollTop > 400);
    };

    // Listen for both regular scroll and smooth scroll events
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('smooth-scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('smooth-scroll', handleScroll);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50
        w-14 h-14 bg-neutral-900 text-white
        border-2 border-neutral-900
        transition-all duration-500 ease-out
        hover:bg-white hover:text-neutral-900
        hover:scale-110 hover:rotate-12
        active:scale-95
        group relative overflow-hidden
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}
      `}
      aria-label="Scroll to top"
    >
      {/* Bauhaus geometric background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      
      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          opacity="0.2"
        />
        <circle
          cx="28"
          cy="28"
          r="26"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray={`${2 * Math.PI * 26}`}
          strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
          className="transition-all duration-300 ease-out"
        />
      </svg>
      
      {/* Arrow icon */}
      <ArrowUp className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
      
      {/* Bauhaus corner accents */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 transition-all duration-300 group-hover:scale-125"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-600 rounded-full transition-all duration-300 group-hover:scale-125"></div>
      
      {/* Smooth hover effect */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
    </button>
  );
};

export default ScrollToTop;