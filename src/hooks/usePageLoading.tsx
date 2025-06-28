import { useState, useEffect } from 'react';

interface UsePageLoadingOptions {
  minLoadingTime?: number;
  maxLoadingTime?: number;
}

export const usePageLoading = (options: UsePageLoadingOptions = {}) => {
  const { minLoadingTime = 800, maxLoadingTime = 2000 } = options;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate realistic loading time
    const loadingTime = Math.random() * (maxLoadingTime - minLoadingTime) + minLoadingTime;
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime, maxLoadingTime]);

  return isLoading;
};