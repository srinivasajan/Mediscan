import React from 'react';
import SkeletonLoader from './SkeletonLoader';

interface PageSkeletonProps {
  type: 'upload' | 'results' | 'about' | 'upload-image';
}

const PageSkeleton: React.FC<PageSkeletonProps> = ({ type }) => {
  const renderUploadSkeleton = () => (
    <div className="space-y-12 py-8 animate-pulse">
      {/* Hero Section Skeleton */}
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* Badge */}
          <SkeletonLoader variant="button" width="280px" height="32px" />
          
          {/* Main Title */}
          <div className="space-y-4">
            <SkeletonLoader variant="text" height="60px" width="90%" />
            <SkeletonLoader variant="text" height="60px" width="80%" />
            <SkeletonLoader variant="text" height="60px" width="70%" />
          </div>
          
          {/* Description */}
          <SkeletonLoader variant="text" lines={3} />
          
          {/* CTA Buttons */}
          <div className="flex items-center space-x-6 pt-4">
            <SkeletonLoader variant="button" width="160px" height="48px" />
            <SkeletonLoader variant="button" width="120px" height="48px" />
          </div>
          
          {/* Metrics */}
          <div className="grid grid-cols-4 gap-8 pt-6 border-t border-neutral-200">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="text-center space-y-2">
                <SkeletonLoader variant="text" height="32px" width="60px" className="mx-auto" />
                <SkeletonLoader variant="text" height="16px" width="80px" className="mx-auto" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual Grid */}
        <div className="col-span-12 lg:col-span-4">
          <div className="h-full bg-neutral-100 p-8">
            <div className="grid grid-cols-3 gap-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonLoader 
                  key={i} 
                  variant="rectangular" 
                  width="64px" 
                  height="64px"
                  className={i === 4 ? 'bg-accent-200' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="border-t border-neutral-200 pt-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <SkeletonLoader variant="text" lines={2} height="32px" />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <SkeletonLoader variant="rectangular" width="48px" height="48px" />
                  <SkeletonLoader variant="text" height="24px" width="70%" />
                  <SkeletonLoader variant="text" lines={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResultsSkeleton = () => (
    <div className="space-y-8 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-8">
        <div className="flex items-center space-x-4">
          <SkeletonLoader variant="button" width="80px" height="32px" />
          <div className="h-6 w-px bg-neutral-300"></div>
          <SkeletonLoader variant="text" width="200px" height="32px" />
        </div>
        <div className="flex items-center space-x-3">
          <SkeletonLoader variant="button" width="100px" height="36px" />
          <SkeletonLoader variant="button" width="80px" height="36px" />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-neutral-200">
        <div className="flex space-x-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonLoader key={i} variant="button" width="100px" height="40px" />
          ))}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Preview */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-neutral-200">
            <SkeletonLoader variant="text" height="24px" className="m-6" />
            <SkeletonLoader variant="image" height="256px" className="mx-6 mb-6" />
            <div className="p-6 space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <SkeletonLoader variant="text" width="60px" height="16px" />
                  <SkeletonLoader variant="text" width="80px" height="16px" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-2 space-y-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-neutral-200">
              <div className="p-6 border-b border-neutral-200">
                <SkeletonLoader variant="text" height="24px" width="200px" />
              </div>
              <div className="p-6 space-y-4">
                <SkeletonLoader variant="text" lines={3} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <div key={j}>
                      <SkeletonLoader variant="text" height="16px" width="60%" />
                      <SkeletonLoader variant="text" height="20px" width="80%" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAboutSkeleton = () => (
    <div className="space-y-16 animate-pulse">
      {/* Hero */}
      <div className="grid grid-cols-12 gap-8 py-16">
        <div className="col-span-12 lg:col-span-8">
          <SkeletonLoader variant="text" lines={2} height="60px" />
          <div className="mt-8">
            <SkeletonLoader variant="text" lines={3} />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="border-t border-neutral-200 pt-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-3">
            <SkeletonLoader variant="text" lines={2} height="32px" />
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <SkeletonLoader variant="rectangular" width="48px" height="48px" />
                  <SkeletonLoader variant="text" height="24px" />
                  <SkeletonLoader variant="text" lines={3} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="border-t border-neutral-200 pt-16">
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-4">
            <SkeletonLoader variant="text" lines={2} height="32px" />
          </div>
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-4">
                  <SkeletonLoader variant="circular" width="48px" height="48px" className="mx-auto" />
                  <SkeletonLoader variant="text" height="20px" />
                  <SkeletonLoader variant="text" lines={2} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUploadImageSkeleton = () => (
    <div className="space-y-16 animate-pulse">
      {/* Header */}
      <div className="border-b border-neutral-200 pb-8">
        <div className="flex items-center space-x-4 mb-8">
          <SkeletonLoader variant="button" width="120px" height="32px" />
          <div className="h-6 w-px bg-neutral-300"></div>
          <SkeletonLoader variant="text" width="200px" height="32px" />
        </div>

        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8">
            <SkeletonLoader variant="text" lines={2} height="48px" />
            <div className="mt-6">
              <SkeletonLoader variant="text" lines={3} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <SkeletonLoader variant="text" height="20px" className="mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <SkeletonLoader variant="rectangular" width="16px" height="16px" />
                    <SkeletonLoader variant="text" width="150px" height="16px" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          {/* Upload Zone */}
          <div className="bg-white border border-neutral-200">
            <div className="p-6 border-b border-neutral-200">
              <SkeletonLoader variant="text" height="24px" width="200px" />
            </div>
            <div className="p-12">
              <SkeletonLoader variant="circular" width="64px" height="64px" className="mx-auto mb-6" />
              <SkeletonLoader variant="text" height="24px" className="mb-4" />
              <SkeletonLoader variant="text" height="16px" className="mb-8" />
              <div className="flex justify-center space-x-4">
                <SkeletonLoader variant="button" width="120px" height="40px" />
                <SkeletonLoader variant="button" width="120px" height="40px" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-neutral-50 border border-neutral-200 p-12 text-center">
            <SkeletonLoader variant="rectangular" width="64px" height="64px" className="mx-auto mb-6" />
            <SkeletonLoader variant="text" height="24px" className="mb-4" />
            <SkeletonLoader variant="text" lines={2} className="mb-8" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-center space-x-3">
                  <SkeletonLoader variant="rectangular" width="8px" height="8px" />
                  <SkeletonLoader variant="text" width="200px" height="16px" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const skeletonMap = {
    upload: renderUploadSkeleton,
    results: renderResultsSkeleton,
    about: renderAboutSkeleton,
    'upload-image': renderUploadImageSkeleton
  };

  return (
    <div className="min-h-screen">
      {skeletonMap[type]()}
    </div>
  );
};

export default PageSkeleton;