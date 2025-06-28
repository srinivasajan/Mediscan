import React from 'react';
import { Clock, Eye, Trash2, Brain, History } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';

const AnalysisHistory: React.FC = () => {
  const { analysisHistory, clearHistory, setAnalysisResult } = useAnalysis();

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'bg-neutral-100 text-neutral-900 border-neutral-200';
      case 'medium': return 'bg-neutral-100 text-neutral-900 border-neutral-200';
      case 'low': return 'bg-accent-100 text-accent-900 border-accent-200';
      default: return 'bg-neutral-100 text-neutral-900 border-neutral-200';
    }
  };

  if (analysisHistory.length === 0) {
    return (
      <div className="bg-white border border-neutral-200 p-12 text-center">
        <Clock className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
        <h3 className="text-lg font-bold text-neutral-900 mb-2 uppercase tracking-wide">No Analysis History</h3>
        <p className="text-neutral-600 uppercase tracking-wide text-sm">Your analyses will appear here</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-neutral-200">
      <div className="flex items-center justify-between p-6 border-b border-neutral-200">
        <h3 className="text-lg font-bold text-neutral-900 flex items-center space-x-2 uppercase tracking-wide">
          <History className="h-5 w-5" />
          <span>Analysis History</span>
        </h3>
        <button
          onClick={clearHistory}
          className="flex items-center space-x-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wide"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="p-6 space-y-4">
        {analysisHistory.map((analysis, index) => (
          <div key={index} className="border border-neutral-200 p-4 hover:bg-neutral-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-neutral-600 font-mono">
                  {formatDate(analysis.timestamp)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium border uppercase tracking-wide ${getConfidenceColor(analysis.data.qualityAssessment.confidence)}`}>
                  {analysis.data.qualityAssessment.confidence}
                </span>
                {analysis.knowledgeEnhanced && (
                  <span className="px-2 py-1 text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-200 flex items-center space-x-1 uppercase tracking-wide">
                    <Brain className="h-3 w-3" />
                    <span>Enhanced</span>
                  </span>
                )}
                {analysis.mock && (
                  <span className="px-2 py-1 text-xs font-medium bg-accent-100 text-accent-900 border border-accent-200 uppercase tracking-wide">
                    Mock
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setAnalysisResult(analysis)}
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs text-neutral-900 hover:bg-neutral-100 border border-neutral-200 transition-colors font-medium uppercase tracking-wide"
                >
                  <Eye className="h-3 w-3" />
                  <span>View</span>
                </button>
              </div>
            </div>
            
            <div className="text-sm text-neutral-900">
              <p className="font-bold mb-1 uppercase tracking-wide">
                {analysis.data.extractedInformation.medicines.length} medicine(s) analyzed
              </p>
              <p className="text-neutral-600 text-xs uppercase tracking-wide">
                {analysis.data.extractedInformation.medicines.map(m => m.name).join(', ')}
              </p>
              
              {analysis.knowledgeEnhanced && (
                <div className="mt-3 flex items-center space-x-4 text-xs text-neutral-500">
                  <span className="font-mono uppercase tracking-wide">v{analysis.data.analysisMetadata.analysisVersion}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;