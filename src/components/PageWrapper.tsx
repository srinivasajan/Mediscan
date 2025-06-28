import React from 'react';
import { usePageLoading } from '../hooks/usePageLoading';
import PageSkeleton from './PageSkeleton';

interface PageWrapperProps {
  children: React.ReactNode;
  skeletonType: 'upload' | 'results' | 'about' | 'upload-image';
  loadingOptions?: {
    minLoadingTime?: number;
    maxLoadingTime?: number;
  };
}

const PageWrapper: React.FC<PageWrapperProps> = ({ 
  children, 
  skeletonType, 
  loadingOptions 
}) => {
  const isLoading = usePageLoading(loadingOptions);

  if (isLoading) {
    return <PageSkeleton type={skeletonType} />;
  }

  return (
    <div className="page-fade-in">
      {children}
    </div>
  );
};

export default PageWrapper;