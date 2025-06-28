import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Brain, Shield, CheckCircle } from 'lucide-react';
import UploadZone from '../components/UploadZone';
import ImagePreview from '../components/ImagePreview';
import AnalysisHistory from '../components/AnalysisHistory';
import ProtectedRoute from '../components/ProtectedRoute';
import PageWrapper from '../components/PageWrapper';
import { useAnalysis } from '../context/AnalysisContext';

const UploadImagePage: React.FC = () => {
  const navigate = useNavigate();
  const { uploadedImage, isAnalyzing, analysisHistory, setUploadedImage, analyzeImage } = useAnalysis();

  const handleImageUpload = async (imageDataUrl: string, imageType: string) => {
    setUploadedImage(imageDataUrl);
    await analyzeImage(imageDataUrl, imageType);
    navigate('/results');
  };

  const handleReset = () => {
    setUploadedImage(null);
  };

  return (
    <ProtectedRoute>
      <PageWrapper skeletonType="upload-image" loadingOptions={{ minLoadingTime: 500, maxLoadingTime: 1000 }}>
        <div className="space-y-16">
          {/* Swiss Header */}
          <section className="border-b border-neutral-200 pb-8">
            <div className="flex items-center space-x-4 mb-8">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wide"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </button>
              <div className="h-6 w-px bg-neutral-300"></div>
              <h1 className="text-2xl font-bold text-neutral-900 uppercase tracking-wide">Upload Prescription</h1>
            </div>

            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-8">
                <h2 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-none tracking-tight mb-6">
                  UPLOAD YOUR
                  <br />
                  <span className="text-accent-600">PRESCRIPTION</span>
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
                  Upload your prescription image for comprehensive AI analysis. Our advanced system 
                  will extract medication details and provide clinical insights with safety assessments.
                </p>
              </div>

              <div className="col-span-12 lg:col-span-4">
                <div className="bg-neutral-50 border border-neutral-200 p-6">
                  <h3 className="font-bold text-neutral-900 mb-4 uppercase tracking-wide">Analysis Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Brain className="h-4 w-4 text-neutral-900" />
                      <span className="text-sm text-neutral-700 uppercase tracking-wide">AI Knowledge Integration</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Shield className="h-4 w-4 text-neutral-900" />
                      <span className="text-sm text-neutral-700 uppercase tracking-wide">Safety Assessment</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-4 w-4 text-neutral-900" />
                      <span className="text-sm text-neutral-700 uppercase tracking-wide">Clinical Guidelines</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Swiss Upload Interface */}
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div className="space-y-8">
                <UploadZone onImageUpload={handleImageUpload} onReset={handleReset} />
                
                {analysisHistory.length > 0 && (
                  <AnalysisHistory />
                )}
              </div>

              <div className="space-y-8">
                {uploadedImage ? (
                  <ImagePreview imageUrl={uploadedImage} isAnalyzing={isAnalyzing} />
                ) : (
                  <div className="bg-neutral-50 border border-neutral-200 p-12 text-center">
                    <div className="w-16 h-16 bg-neutral-900 flex items-center justify-center mx-auto mb-6">
                      <Brain className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">
                      Ready for Analysis
                    </h3>
                    <p className="text-neutral-600 mb-8 leading-relaxed">
                      Upload an image to receive comprehensive AI analysis with integrated medical knowledge
                    </p>
                    <div className="space-y-3 text-sm text-neutral-500">
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-neutral-900"></div>
                        <span className="uppercase tracking-wide">Image extraction + Medical knowledge</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-neutral-900"></div>
                        <span className="uppercase tracking-wide">Clinical insights + Safety analysis</span>
                      </div>
                      <div className="flex items-center justify-center space-x-3">
                        <div className="w-2 h-2 bg-neutral-900"></div>
                        <span className="uppercase tracking-wide">Drug interactions + Guidelines</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Swiss Process Steps */}
          <section className="border-t border-neutral-200 pt-16">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-4">
                <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                  Analysis
                  <br />
                  Process
                </h2>
              </div>
              
              <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mx-auto text-sm font-bold">
                      01
                    </div>
                    <h4 className="font-bold text-neutral-900 uppercase tracking-wide">Upload Image</h4>
                    <p className="text-sm text-neutral-600">
                      Take a photo or upload an image of your prescription or medicine strip
                    </p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mx-auto text-sm font-bold">
                      02
                    </div>
                    <h4 className="font-bold text-neutral-900 uppercase tracking-wide">AI Analysis</h4>
                    <p className="text-sm text-neutral-600">
                      Google Gemini Vision AI processes and extracts medical information
                    </p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mx-auto text-sm font-bold">
                      03
                    </div>
                    <h4 className="font-bold text-neutral-900 uppercase tracking-wide">Knowledge Integration</h4>
                    <p className="text-sm text-neutral-600">
                      AI applies comprehensive medical knowledge for clinical insights
                    </p>
                  </div>
                  
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mx-auto text-sm font-bold">
                      04
                    </div>
                    <h4 className="font-bold text-neutral-900 uppercase tracking-wide">Get Results</h4>
                    <p className="text-sm text-neutral-600">
                      Receive detailed analysis with safety assessments and guidelines
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Swiss Supported Formats */}
          <section className="border-t border-neutral-200 pt-16">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 lg:col-span-4">
                <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                  Supported
                  <br />
                  Formats
                </h2>
              </div>
              
              <div className="col-span-12 lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                  <div className="flex items-center space-x-4 p-4 border border-neutral-200">
                    <div className="w-3 h-3 bg-neutral-900"></div>
                    <span className="text-sm font-medium text-neutral-900 uppercase tracking-wide">Handwritten & Digital</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border border-neutral-200">
                    <div className="w-3 h-3 bg-neutral-900"></div>
                    <span className="text-sm font-medium text-neutral-900 uppercase tracking-wide">Medicine Strips & Bottles</span>
                  </div>
                  <div className="flex items-center space-x-4 p-4 border border-neutral-200">
                    <div className="w-3 h-3 bg-neutral-900"></div>
                    <span className="text-sm font-medium text-neutral-900 uppercase tracking-wide">Pharmacy Labels</span>
                  </div>
                </div>
                
                <div className="border border-neutral-200 p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <Brain className="h-6 w-6 text-neutral-900" />
                    <span className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Knowledge Enhancement v3.0</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-600">
                    <div className="space-y-2">
                      <p>• Comprehensive medical knowledge beyond image content</p>
                      <p>• Detailed pharmacology and mechanism analysis</p>
                      <p>• Drug interaction and safety assessment</p>
                    </div>
                    <div className="space-y-2">
                      <p>• Clinical guidelines and evidence-based recommendations</p>
                      <p>• Patient counseling and monitoring requirements</p>
                      <p>• Alternative medications and optimization</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default UploadImagePage;