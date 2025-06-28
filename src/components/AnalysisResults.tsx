import React from 'react';
import { 
  Pill, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  Info, 
  Building2,
  Loader2,
  FileText,
  Shield
} from 'lucide-react';
import { AnalysisData } from '../types/analysis';

interface AnalysisResultsProps {
  analysisData: AnalysisData | null;
  isAnalyzing: boolean;
  hasImage: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  analysisData, 
  isAnalyzing, 
  hasImage 
}) => {
  if (!hasImage) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">AI Analysis Results</h3>
        <p className="text-slate-600">Upload an image to see detailed medicine analysis</p>
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Analyzing Image</h3>
          <p className="text-slate-600">Our AI is extracting medicine details...</p>
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-100 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!analysisData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Shield className="h-12 w-12 text-slate-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready for Analysis</h3>
        <p className="text-slate-600">Upload an image to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-slate-900">Analysis Results</h3>
        <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
          Verified
        </span>
      </div>

      <div className="space-y-6">
        {/* Medicine Info */}
        <div className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Pill className="h-5 w-5 text-blue-600" />
            <h4 className="font-semibold text-slate-900">Medicine Information</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-600">Brand Name</p>
              <p className="font-medium text-slate-900">{analysisData.medicineName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Generic Name</p>
              <p className="font-medium text-slate-900">{analysisData.genericName}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Category</p>
              <p className="font-medium text-slate-900">{analysisData.category}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Manufacturer</p>
              <p className="font-medium text-slate-900">{analysisData.manufacturer}</p>
            </div>
          </div>
        </div>

        {/* Dosage Info */}
        <div className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Clock className="h-5 w-5 text-green-600" />
            <h4 className="font-semibold text-slate-900">Dosage & Frequency</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-slate-600">Dosage</p>
              <p className="font-medium text-slate-900">{analysisData.dosage}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Frequency</p>
              <p className="font-medium text-slate-900">{analysisData.frequency}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Duration</p>
              <p className="font-medium text-slate-900">{analysisData.duration}</p>
            </div>
          </div>
        </div>

        {/* Expiry & Instructions */}
        <div className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="h-5 w-5 text-purple-600" />
            <h4 className="font-semibold text-slate-900">Expiry & Instructions</h4>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-600">Expiry Date</p>
              <p className="font-medium text-slate-900">{analysisData.expiryDate}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">Usage Instructions</p>
              <p className="text-slate-900">{analysisData.instructions}</p>
            </div>
          </div>
        </div>

        {/* Warnings */}
        <div className="border border-orange-200 rounded-lg p-4 bg-orange-50">
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <h4 className="font-semibold text-orange-900">Important Warnings</h4>
          </div>
          <ul className="space-y-2">
            {analysisData.warnings.map((warning, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-orange-800">{warning}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900 mb-1">Medical Disclaimer</h5>
              <p className="text-sm text-blue-800">
                This analysis is for informational purposes only. Always consult with a healthcare 
                professional before taking any medication. Do not rely solely on AI analysis for 
                medical decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;