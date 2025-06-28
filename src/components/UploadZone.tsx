import React, { useCallback, useState } from 'react';
import { Upload, Camera, RotateCcw, AlertCircle, FileImage } from 'lucide-react';

interface UploadZoneProps {
  onImageUpload: (imageDataUrl: string, imageType: string) => void;
  onReset: () => void;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageUpload, onReset }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, WebP)');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return false;
    }

    setError(null);
    return true;
  };

  const processFile = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageUpload(e.target.result as string, file.type);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="bg-white border border-neutral-200">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <h2 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Upload Prescription</h2>
        <button
          onClick={onReset}
          className="flex items-center space-x-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wide"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset</span>
        </button>
      </div>

      <div
        className={`border-2 border-dashed p-12 text-center transition-colors ${
          isDragOver
            ? 'border-neutral-900 bg-neutral-50'
            : 'border-neutral-300 hover:border-neutral-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="space-y-6">
          <div className="flex justify-center">
            <div className={`w-16 h-16 flex items-center justify-center transition-colors ${
              isDragOver 
                ? 'bg-neutral-900' 
                : 'bg-neutral-100'
            }`}>
              {isDragOver ? (
                <Camera className="h-8 w-8 text-white" />
              ) : (
                <FileImage className="h-8 w-8 text-neutral-600" />
              )}
            </div>
          </div>
          
          <div>
            <p className="text-lg font-bold text-neutral-900 mb-2 uppercase tracking-wide">
              {isDragOver ? 'Drop Image Here' : 'Upload Prescription Image'}
            </p>
            <p className="text-sm text-neutral-600 mb-8 uppercase tracking-wide">
              Drag and drop or click to select • JPEG, PNG, WebP • Max 10MB
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label className="inline-flex items-center px-8 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors cursor-pointer font-medium text-sm uppercase tracking-wide">
              <Camera className="h-4 w-4 mr-2" />
              Choose File
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileSelect}
              />
            </label>
            
            <button className="inline-flex items-center px-8 py-3 border border-neutral-300 text-neutral-900 hover:border-neutral-900 transition-colors font-medium text-sm uppercase tracking-wide">
              <Upload className="h-4 w-4 mr-2" />
              From Device
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-8 p-4 bg-accent-50 border border-accent-200 flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-accent-600 flex-shrink-0" />
            <p className="text-sm text-accent-700 font-medium">{error}</p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-neutral-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-3 border border-neutral-200">
            <div className="w-2 h-2 bg-neutral-900"></div>
            <span className="text-xs text-neutral-700 font-medium uppercase tracking-wide">Handwritten</span>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-neutral-200">
            <div className="w-2 h-2 bg-neutral-900"></div>
            <span className="text-xs text-neutral-700 font-medium uppercase tracking-wide">Medicine Strips</span>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-neutral-200">
            <div className="w-2 h-2 bg-neutral-900"></div>
            <span className="text-xs text-neutral-700 font-medium uppercase tracking-wide">Digital</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;