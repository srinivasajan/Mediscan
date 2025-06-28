import React from 'react';
import { Scan, Loader2, CheckCircle, Brain } from 'lucide-react';

interface ImagePreviewProps {
  imageUrl: string;
  isAnalyzing: boolean;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ imageUrl, isAnalyzing }) => {
  return (
    <div className="bg-white border border-neutral-200">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Image Preview</h3>
        <div className="flex items-center space-x-2">
          {isAnalyzing ? (
            <>
              <Loader2 className="h-4 w-4 text-neutral-900 animate-spin" />
              <span className="text-sm text-neutral-900 font-medium uppercase tracking-wide">Analyzing...</span>
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 text-neutral-900" />
              <span className="text-sm text-neutral-900 font-medium uppercase tracking-wide">Ready</span>
            </>
          )}
        </div>
      </div>

      <div className="relative">
        <img
          src={imageUrl}
          alt="Uploaded prescription"
          className="w-full h-64 object-cover border-b border-neutral-200"
        />
        
        {isAnalyzing && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
            <div className="bg-white border border-neutral-200 p-8 flex items-center space-x-4">
              <Brain className="h-6 w-6 text-neutral-900" />
              <div>
                <p className="text-sm font-bold text-neutral-900 uppercase tracking-wide">Gemini AI Processing</p>
                <p className="text-xs text-neutral-600 uppercase tracking-wide">Extracting details...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 border border-neutral-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-neutral-100 flex items-center justify-center">
              <Scan className="h-4 w-4 text-neutral-900" />
            </div>
            <p className="text-xs text-neutral-600 font-medium uppercase tracking-wide">Text Recognition</p>
          </div>
          <div className="text-center p-4 border border-neutral-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-neutral-100 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-neutral-900" />
            </div>
            <p className="text-xs text-neutral-600 font-medium uppercase tracking-wide">Medicine ID</p>
          </div>
          <div className="text-center p-4 border border-neutral-200">
            <div className="w-8 h-8 mx-auto mb-2 bg-neutral-100 flex items-center justify-center">
              <Brain className="h-4 w-4 text-neutral-900" />
            </div>
            <p className="text-xs text-neutral-600 font-medium uppercase tracking-wide">AI Analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;