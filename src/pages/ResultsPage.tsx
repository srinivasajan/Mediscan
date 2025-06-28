import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Upload, 
  AlertTriangle, 
  CheckCircle, 
  Pill, 
  User, 
  Shield,
  Download,
  Eye,
  EyeOff,
  Brain,
  BookOpen,
  Target,
  AlertCircle,
  Info,
  Lightbulb,
  Stethoscope,
  FlaskConical,
  Thermometer,
  Activity,
  TrendingUp
} from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import ProtectedRoute from '../components/ProtectedRoute';
import PageWrapper from '../components/PageWrapper';

const ResultsPage: React.FC = () => {
  const { uploadedImage, analysisResult, isAnalyzing, exportAnalysis } = useAnalysis();
  const [activeTab, setActiveTab] = useState<'overview' | 'knowledge' | 'safety' | 'clinical' | 'quality'>('overview');
  const [showSensitiveInfo, setShowSensitiveInfo] = useState(false);
  const [expandedMedicine, setExpandedMedicine] = useState<number | null>(null);

  // Helper function to check if data exists and is not empty
  const hasData = (value: any): boolean => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim() !== '' && value !== 'Not specified' && value !== 'N/A';
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object') return Object.keys(value).length > 0;
    return true;
  };

  const ResultsContent = () => {
    if (!uploadedImage && !analysisResult) {
      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Upload className="h-8 w-8 text-neutral-400" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">No Analysis Available</h2>
          <p className="text-neutral-600 mb-6 uppercase tracking-wide">Please upload an image first to see analysis results.</p>
          <Link
            to="/upload-image"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors uppercase tracking-wide"
          >
            <Upload className="h-4 w-4" />
            <span>Upload Image</span>
          </Link>
        </div>
      );
    }

    if (isAnalyzing) {
      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <Brain className="h-8 w-8 text-neutral-900 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">AI Analysis in Progress</h2>
          <p className="text-neutral-600 mb-6 uppercase tracking-wide">Gemini is processing your image...</p>
          <div className="mt-6 max-w-md mx-auto">
            <div className="bg-neutral-200 h-1 mb-4">
              <div className="bg-neutral-900 h-1 transition-all duration-1000" style={{ width: '70%' }}></div>
            </div>
            <div className="space-y-2 text-sm text-neutral-500 uppercase tracking-wide">
              <p>✓ Image processing complete</p>
              <p>✓ Text extraction complete</p>
              <p>🧠 Applying medical knowledge...</p>
              <p>⏳ Generating clinical insights...</p>
            </div>
          </div>
        </div>
      );
    }

    if (!analysisResult) {
      return (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-accent-100 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-accent-600" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 mb-4 uppercase tracking-wide">Analysis Failed</h2>
          <p className="text-neutral-600 mb-6 uppercase tracking-wide">Unable to analyze the image. Please try again.</p>
          <Link
            to="/upload-image"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors uppercase tracking-wide"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Try Again</span>
          </Link>
        </div>
      );
    }

    const { data, mock, error, knowledgeEnhanced } = analysisResult;

    const tabs = [
      { id: 'overview', label: 'Overview', icon: Eye },
      { id: 'knowledge', label: 'Knowledge', icon: Brain },
      { id: 'safety', label: 'Safety', icon: Shield },
      { id: 'clinical', label: 'Clinical', icon: Stethoscope },
      { id: 'quality', label: 'Quality', icon: TrendingUp }
    ];

    const getConfidenceColor = (confidence: string) => {
      switch (confidence) {
        case 'high': return 'bg-neutral-100 text-neutral-900';
        case 'medium': return 'bg-neutral-100 text-neutral-900';
        case 'low': return 'bg-accent-100 text-accent-900';
        default: return 'bg-neutral-100 text-neutral-900';
      }
    };

    const getSeverityColor = (severity: string) => {
      switch (severity?.toLowerCase()) {
        case 'major': return 'bg-accent-100 text-accent-900 border-accent-200';
        case 'moderate': return 'bg-neutral-100 text-neutral-900 border-neutral-200';
        case 'minor': return 'bg-neutral-100 text-neutral-900 border-neutral-200';
        default: return 'bg-neutral-100 text-neutral-900 border-neutral-200';
      }
    };

    return (
      <div className="space-y-8">
        {/* Swiss Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 pb-8">
          <div className="flex items-center space-x-4">
            <Link
              to="/upload-image"
              className="flex items-center space-x-2 text-neutral-600 hover:text-neutral-900 transition-colors uppercase tracking-wide"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
            <div className="h-6 w-px bg-neutral-300"></div>
            <h1 className="text-2xl font-bold text-neutral-900 uppercase tracking-wide">Analysis Results</h1>
            {knowledgeEnhanced && (
              <span className="px-2 py-1 bg-neutral-100 text-neutral-900 text-xs font-medium border border-neutral-200 flex items-center space-x-1 uppercase tracking-wide">
                <Brain className="h-3 w-3" />
                <span>Enhanced</span>
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowSensitiveInfo(!showSensitiveInfo)}
              className="flex items-center space-x-2 px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 border border-neutral-200 hover:border-neutral-900 transition-colors uppercase tracking-wide"
            >
              {showSensitiveInfo ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              <span>{showSensitiveInfo ? 'Hide' : 'Show'} Info</span>
            </button>
            
            <button
              onClick={() => exportAnalysis('json')}
              className="flex items-center space-x-2 px-3 py-2 text-sm bg-neutral-900 text-white hover:bg-neutral-800 transition-colors uppercase tracking-wide"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            
            {mock ? (
              <span className="px-3 py-1 bg-accent-100 text-accent-900 text-sm font-medium border border-accent-200 uppercase tracking-wide">
                Mock
              </span>
            ) : (
              <span className="px-3 py-1 bg-neutral-100 text-neutral-900 text-sm font-medium border border-neutral-200 uppercase tracking-wide">
                AI
              </span>
            )}
            
            <span className={`px-3 py-1 text-sm font-medium border uppercase tracking-wide ${getConfidenceColor(data.qualityAssessment.confidence)}`}>
              {data.qualityAssessment.confidence}
            </span>
          </div>
        </div>

        {/* Error Notice */}
        {error && (
          <div className="bg-accent-50 border border-accent-200 p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-accent-600" />
              <p className="text-accent-800 uppercase tracking-wide">{error}</p>
            </div>
          </div>
        )}

        {/* Swiss Metadata */}
        <div className="bg-neutral-50 border border-neutral-200 p-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-neutral-900" />
              <span className="text-neutral-600 uppercase tracking-wide">Processing:</span>
              <span className="font-medium">{data.analysisMetadata.processingApproach}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain className="h-4 w-4 text-neutral-900" />
              <span className="text-neutral-600 uppercase tracking-wide">Model:</span>
              <span className="font-medium">{data.analysisMetadata.aiModel}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600 uppercase tracking-wide">Document:</span>
              <span className="font-medium">{data.analysisMetadata.documentType}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600 uppercase tracking-wide">Version:</span>
              <span className="font-medium">{data.analysisMetadata.analysisVersion}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-neutral-600 uppercase tracking-wide">Enhanced:</span>
              <span className="font-medium text-neutral-900">Yes</span>
            </div>
          </div>
        </div>

        {/* Swiss Tab Navigation */}
        <div className="border-b border-neutral-200">
          <nav className="flex space-x-8">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors uppercase tracking-wide ${
                  activeTab === id
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Preview */}
          <div className="lg:col-span-1">
            {uploadedImage && (
              <div className="bg-white border border-neutral-200 sticky top-6">
                <h3 className="text-lg font-bold text-neutral-900 p-6 border-b border-neutral-200 uppercase tracking-wide">Analyzed Image</h3>
                <img
                  src={uploadedImage}
                  alt="Analyzed prescription"
                  className="w-full h-64 object-cover border-b border-neutral-200"
                />
                <div className="p-6 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600 uppercase tracking-wide">Quality:</span>
                    <span className="font-medium text-neutral-900">{data.qualityAssessment.imageClarity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 uppercase tracking-wide">Legibility:</span>
                    <span className="font-medium text-neutral-900">{data.qualityAssessment.textLegibility}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 uppercase tracking-wide">Extraction:</span>
                    <span className="font-medium text-neutral-900">{data.qualityAssessment.extractionConfidence}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600 uppercase tracking-wide">Knowledge:</span>
                    <span className="font-medium text-neutral-900">{data.qualityAssessment.knowledgeApplicationConfidence}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-2 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Prescription Details - Only show if data exists */}
                {hasData(data.extractedInformation.prescriptionDetails) && (
                  <div className="bg-white border border-neutral-200">
                    <div className="flex items-center space-x-2 p-6 border-b border-neutral-200">
                      <User className="h-5 w-5 text-neutral-900" />
                      <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Prescription Details</h3>
                    </div>
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {hasData(data.extractedInformation.prescriptionDetails.doctorName) && (
                        <div>
                          <p className="text-sm text-neutral-600 uppercase tracking-wide">Doctor</p>
                          <p className="font-medium text-neutral-900">{data.extractedInformation.prescriptionDetails.doctorName}</p>
                          {showSensitiveInfo && hasData(data.extractedInformation.prescriptionDetails.doctorLicense) && (
                            <p className="text-xs text-neutral-500">License: {data.extractedInformation.prescriptionDetails.doctorLicense}</p>
                          )}
                        </div>
                      )}
                      {hasData(data.extractedInformation.prescriptionDetails.patientName) && (
                        <div>
                          <p className="text-sm text-neutral-600 uppercase tracking-wide">Patient</p>
                          <p className="font-medium text-neutral-900">
                            {showSensitiveInfo ? data.extractedInformation.prescriptionDetails.patientName : 'Patient (Hidden)'}
                          </p>
                        </div>
                      )}
                      {hasData(data.extractedInformation.prescriptionDetails.date) && (
                        <div>
                          <p className="text-sm text-neutral-600 uppercase tracking-wide">Date</p>
                          <p className="font-medium text-neutral-900">{data.extractedInformation.prescriptionDetails.date}</p>
                        </div>
                      )}
                      {hasData(data.extractedInformation.prescriptionDetails.hospitalClinic) && (
                        <div>
                          <p className="text-sm text-neutral-600 uppercase tracking-wide">Clinic</p>
                          <p className="font-medium text-neutral-900">{data.extractedInformation.prescriptionDetails.hospitalClinic}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Medicines Overview - Only show medicines that have data */}
                {hasData(data.extractedInformation.medicines) && (
                  <div className="bg-white border border-neutral-200">
                    <div className="flex items-center space-x-2 p-6 border-b border-neutral-200">
                      <Pill className="h-5 w-5 text-neutral-900" />
                      <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Prescribed Medicines</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {data.extractedInformation.medicines.filter(medicine => hasData(medicine.name)).map((medicine, index) => (
                        <div key={index} className="border border-neutral-200 p-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {hasData(medicine.name) && (
                              <div>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Medicine</p>
                                <p className="font-medium text-neutral-900">{medicine.name}</p>
                                {hasData(medicine.genericName) && medicine.genericName !== medicine.name && (
                                  <p className="text-sm text-neutral-500">Generic: {medicine.genericName}</p>
                                )}
                              </div>
                            )}
                            {hasData(medicine.dosage) && (
                              <div>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Dosage</p>
                                <p className="font-medium text-neutral-900">{medicine.dosage}</p>
                              </div>
                            )}
                            {hasData(medicine.frequency) && (
                              <div>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Frequency</p>
                                <p className="font-medium text-neutral-900">{medicine.frequency}</p>
                              </div>
                            )}
                            {hasData(medicine.duration) && (
                              <div>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Duration</p>
                                <p className="font-medium text-neutral-900">{medicine.duration}</p>
                              </div>
                            )}
                            {hasData(medicine.route) && (
                              <div>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Route</p>
                                <p className="font-medium text-neutral-900">{medicine.route}</p>
                              </div>
                            )}
                            {hasData(medicine.expiryDate) && (
                              <div>
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Expiry</p>
                                <p className="font-medium text-neutral-900">{medicine.expiryDate}</p>
                              </div>
                            )}
                            {hasData(medicine.instructions) && (
                              <div className="sm:col-span-3">
                                <p className="text-sm text-neutral-600 uppercase tracking-wide">Instructions</p>
                                <p className="text-neutral-900">{medicine.instructions}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Knowledge Tab */}
            {activeTab === 'knowledge' && hasData(data.knowledgeBasedInsights?.medicineProfiles) && (
              <div className="space-y-8">
                {data.knowledgeBasedInsights.medicineProfiles.map((profile, index) => (
                  <div key={index} className="bg-white border border-neutral-200">
                    <div className="flex items-center justify-between p-6 border-b border-neutral-200">
                      <div className="flex items-center space-x-2">
                        <Brain className="h-5 w-5 text-neutral-900" />
                        <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">{profile.medicineName}</h3>
                      </div>
                      <button
                        onClick={() => setExpandedMedicine(expandedMedicine === index ? null : index)}
                        className="text-neutral-900 hover:text-neutral-600 text-sm font-medium uppercase tracking-wide"
                      >
                        {expandedMedicine === index ? 'Less' : 'More'}
                      </button>
                    </div>

                    <div className="p-6 space-y-6">
                      {/* Drug Class */}
                      {hasData(profile.drugClass) && hasData(profile.mechanismOfAction) && (
                        <div className="bg-neutral-50 border border-neutral-200 p-4">
                          <h4 className="font-medium text-neutral-900 mb-2 flex items-center space-x-2 uppercase tracking-wide">
                            <FlaskConical className="h-4 w-4" />
                            <span>Classification & Mechanism</span>
                          </h4>
                          <p className="text-sm text-neutral-800 mb-2"><strong>Class:</strong> {profile.drugClass}</p>
                          <p className="text-sm text-neutral-800">{profile.mechanismOfAction}</p>
                        </div>
                      )}

                      {/* Indications */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hasData(profile.primaryIndications) && (
                          <div className="bg-neutral-50 border border-neutral-200 p-4">
                            <h4 className="font-medium text-neutral-900 mb-2 flex items-center space-x-2 uppercase tracking-wide">
                              <Target className="h-4 w-4" />
                              <span>Primary Uses</span>
                            </h4>
                            <ul className="text-sm text-neutral-800 space-y-1">
                              {profile.primaryIndications.map((indication, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-neutral-900 mt-2 flex-shrink-0"></div>
                                  <span>{indication}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {hasData(profile.secondaryIndications) && (
                          <div className="bg-neutral-50 border border-neutral-200 p-4">
                            <h4 className="font-medium text-neutral-900 mb-2 flex items-center space-x-2 uppercase tracking-wide">
                              <BookOpen className="h-4 w-4" />
                              <span>Secondary Uses</span>
                            </h4>
                            <ul className="text-sm text-neutral-800 space-y-1">
                              {profile.secondaryIndications.map((indication, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 bg-neutral-900 mt-2 flex-shrink-0"></div>
                                  <span>{indication}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Expanded content */}
                      {expandedMedicine === index && (
                        <div className="space-y-6">
                          {/* Side Effects */}
                          {hasData(profile.comprehensiveSideEffects) && (
                            <div className="bg-neutral-50 border border-neutral-200 p-4">
                              <h4 className="font-medium text-neutral-900 mb-4 flex items-center space-x-2 uppercase tracking-wide">
                                <AlertTriangle className="h-4 w-4" />
                                <span>Side Effects</span>
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {hasData(profile.comprehensiveSideEffects.common) && (
                                  <div>
                                    <h5 className="text-sm font-medium text-neutral-900 mb-2 uppercase tracking-wide">Common</h5>
                                    <ul className="text-sm text-neutral-700 space-y-1">
                                      {profile.comprehensiveSideEffects.common.slice(0, 4).map((effect, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <div className="w-1 h-1 bg-neutral-600 mt-2 flex-shrink-0"></div>
                                          <span>{effect}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {hasData(profile.comprehensiveSideEffects.serious) && (
                                  <div>
                                    <h5 className="text-sm font-medium text-accent-900 mb-2 uppercase tracking-wide">Serious</h5>
                                    <ul className="text-sm text-accent-800 space-y-1">
                                      {profile.comprehensiveSideEffects.serious.slice(0, 4).map((effect, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                          <div className="w-1 h-1 bg-accent-600 mt-2 flex-shrink-0"></div>
                                          <span>{effect}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Patient Counseling */}
                          {hasData(profile.patientCounseling) && (
                            <div className="bg-neutral-50 border border-neutral-200 p-4">
                              <h4 className="font-medium text-neutral-900 mb-2 flex items-center space-x-2 uppercase tracking-wide">
                                <Lightbulb className="h-4 w-4" />
                                <span>Patient Counseling</span>
                              </h4>
                              <ul className="text-sm text-neutral-800 space-y-2">
                                {profile.patientCounseling.slice(0, 5).map((point, idx) => (
                                  <li key={idx} className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-neutral-900 mt-2 flex-shrink-0"></div>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Safety Tab */}
            {activeTab === 'safety' && (
              <div className="space-y-8">
                {/* Drug Interactions */}
                {hasData(data.knowledgeBasedInsights?.drugInteractionAnalysis?.identifiedInteractions) && (
                  <div className="bg-white border border-neutral-200">
                    <div className="flex items-center space-x-2 p-6 border-b border-neutral-200">
                      <Shield className="h-5 w-5 text-neutral-900" />
                      <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Drug Interactions</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {data.knowledgeBasedInsights.drugInteractionAnalysis.identifiedInteractions.map((interaction, index) => (
                        <div key={index} className={`border p-4 ${getSeverityColor(interaction.severity)}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-neutral-900">{interaction.drugs.join(' + ')}</h4>
                            <span className="text-xs font-medium uppercase tracking-wide px-2 py-1 border border-neutral-300">
                              {interaction.severity}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-800 mb-2">{interaction.clinicalSignificance}</p>
                          <p className="text-sm text-neutral-700"><strong>Management:</strong> {interaction.management}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overall Assessment */}
                {hasData(data.knowledgeBasedInsights?.overallAssessment) && (
                  <div className="bg-white border border-neutral-200">
                    <div className="flex items-center space-x-2 p-6 border-b border-neutral-200">
                      <Stethoscope className="h-5 w-5 text-neutral-900" />
                      <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Clinical Assessment</h3>
                    </div>
                    <div className="p-6 space-y-4">
                      {hasData(data.knowledgeBasedInsights.overallAssessment.therapyApproppriateness) && (
                        <div className="bg-neutral-50 border border-neutral-200 p-4">
                          <h4 className="font-medium text-neutral-900 mb-2 uppercase tracking-wide">Therapy Appropriateness</h4>
                          <p className="text-sm text-neutral-800">{data.knowledgeBasedInsights.overallAssessment.therapyApproppriateness}</p>
                        </div>
                      )}
                      
                      {hasData(data.knowledgeBasedInsights.overallAssessment.potentialConcerns) && (
                        <div className="bg-accent-50 border border-accent-200 p-4">
                          <h4 className="font-medium text-accent-900 mb-2 uppercase tracking-wide">Potential Concerns</h4>
                          <ul className="text-sm text-accent-800 space-y-1">
                            {data.knowledgeBasedInsights.overallAssessment.potentialConcerns.map((concern, idx) => (
                              <li key={idx} className="flex items-start space-x-2">
                                <div className="w-1.5 h-1.5 bg-accent-600 mt-2 flex-shrink-0"></div>
                                <span>{concern}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Clinical Tab */}
            {activeTab === 'clinical' && hasData(data.knowledgeBasedInsights?.clinicalGuidelines) && (
              <div className="space-y-8">
                <div className="bg-white border border-neutral-200">
                  <div className="flex items-center space-x-2 p-6 border-b border-neutral-200">
                    <BookOpen className="h-5 w-5 text-neutral-900" />
                    <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Clinical Guidelines</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {hasData(data.knowledgeBasedInsights.clinicalGuidelines.relevantGuidelines) && (
                      <div className="bg-neutral-50 border border-neutral-200 p-4">
                        <h4 className="font-medium text-neutral-900 mb-2 uppercase tracking-wide">Relevant Guidelines</h4>
                        <ul className="text-sm text-neutral-800 space-y-1">
                          {data.knowledgeBasedInsights.clinicalGuidelines.relevantGuidelines.map((guideline, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-neutral-900 mt-2 flex-shrink-0"></div>
                              <span>{guideline}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {hasData(data.knowledgeBasedInsights.clinicalGuidelines.evidenceLevel) && (
                      <div className="bg-neutral-50 border border-neutral-200 p-4">
                        <h4 className="font-medium text-neutral-900 mb-2 uppercase tracking-wide">Evidence Level</h4>
                        <p className="text-sm text-neutral-800">{data.knowledgeBasedInsights.clinicalGuidelines.evidenceLevel}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Quality Tab */}
            {activeTab === 'quality' && (
              <div className="space-y-8">
                <div className="bg-white border border-neutral-200">
                  <div className="flex items-center space-x-2 p-6 border-b border-neutral-200">
                    <TrendingUp className="h-5 w-5 text-neutral-900" />
                    <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Quality Assessment</h3>
                  </div>
                  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-neutral-50 border border-neutral-200 p-4">
                      <h4 className="font-medium text-neutral-900 mb-2 uppercase tracking-wide">Image Quality</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Clarity:</span>
                          <span className="font-medium">{data.qualityAssessment.imageClarity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Legibility:</span>
                          <span className="font-medium">{data.qualityAssessment.textLegibility}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Completeness:</span>
                          <span className="font-medium">{data.qualityAssessment.completeness}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-50 border border-neutral-200 p-4">
                      <h4 className="font-medium text-neutral-900 mb-2 uppercase tracking-wide">Analysis Confidence</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Overall:</span>
                          <span className="font-medium">{data.qualityAssessment.confidence}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Extraction:</span>
                          <span className="font-medium">{data.qualityAssessment.extractionConfidence}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-600">Knowledge:</span>
                          <span className="font-medium">{data.qualityAssessment.knowledgeApplicationConfidence}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {hasData(data.qualityAssessment.uncertainAreas) && (
                    <div className="px-6 pb-6">
                      <div className="bg-accent-50 border border-accent-200 p-4">
                        <h4 className="font-medium text-accent-900 mb-2 uppercase tracking-wide">Uncertain Areas</h4>
                        <ul className="text-sm text-accent-800 space-y-1">
                          {data.qualityAssessment.uncertainAreas.map((area, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-accent-600 mt-2 flex-shrink-0"></div>
                              <span>{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Medical Disclaimer */}
            <div className="bg-neutral-50 border border-neutral-200 p-6">
              <div className="flex items-start space-x-2">
                <Shield className="h-5 w-5 text-neutral-900 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-neutral-900 mb-2 uppercase tracking-wide">Medical Disclaimer</h4>
                  <p className="text-sm text-neutral-800 mb-3">
                    This analysis combines image extraction with AI medical knowledge. 
                    Always consult healthcare professionals for medical decisions.
                  </p>
                  <div className="text-xs text-neutral-700 space-y-1">
                    <p>• Extracted information reflects only visible image content</p>
                    <p>• Knowledge insights derived from AI training data</p>
                    <p>• Always verify with healthcare providers</p>
                    <p>• Seek immediate medical attention for adverse reactions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProtectedRoute>
      <PageWrapper skeletonType="results" loadingOptions={{ minLoadingTime: 700, maxLoadingTime: 1400 }}>
        <ResultsContent />
      </PageWrapper>
    </ProtectedRoute>
  );
};

export default ResultsPage;