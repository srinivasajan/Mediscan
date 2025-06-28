import React, { createContext, useContext, useState, ReactNode } from 'react';

// Enhanced interfaces for knowledge-based analysis
export interface Medicine {
  name: string;
  genericName: string;
  brandName: string;
  dosage: string;
  strength: string;
  frequency: string;
  duration: string;
  instructions: string;
  route: string;
  batchNumber: string;
  ndc: string;
  expiryDate: string;
}

export interface PrescriptionDetails {
  doctorName: string;
  doctorLicense: string;
  patientName: string;
  patientAge: string;
  prescriptionNumber: string;
  date: string;
  hospitalClinic: string;
  pharmacyName: string;
}

export interface ExtractedInformation {
  medicines: Medicine[];
  prescriptionDetails: PrescriptionDetails;
}

export interface MedicineProfile {
  medicineName: string;
  drugClass: string;
  mechanismOfAction: string;
  primaryIndications: string[];
  secondaryIndications: string[];
  pharmacokinetics: {
    absorption: string;
    distribution: string;
    metabolism: string;
    elimination: string;
  };
  dosageConsiderations: {
    standardDosing: string;
    pediatricDosing: string;
    geriatricDosing: string;
    renalAdjustment: string;
    hepaticAdjustment: string;
  };
  comprehensiveSideEffects: {
    common: string[];
    uncommon: string[];
    rare: string[];
    serious: string[];
  };
  drugInteractions: {
    majorInteractions: string[];
    moderateInteractions: string[];
    foodInteractions: string[];
    supplementInteractions: string[];
  };
  contraindications: {
    absolute: string[];
    relative: string[];
    pregnancy: string;
    breastfeeding: string;
  };
  monitoringRequirements: string[];
  patientCounseling: string[];
  clinicalPearls: string[];
  alternatives: {
    genericEquivalents: string[];
    therapeuticAlternatives: string[];
    differentClassAlternatives: string[];
  };
  storageAndHandling: {
    temperature: string;
    lightSensitivity: string;
    moistureProtection: string;
    specialHandling: string;
  };
}

export interface DrugInteraction {
  drugs: string[];
  severity: string;
  mechanism: string;
  clinicalSignificance: string;
  management: string;
}

export interface KnowledgeBasedInsights {
  medicineProfiles: MedicineProfile[];
  overallAssessment: {
    therapyApproppriateness: string;
    potentialConcerns: string[];
    optimizationSuggestions: string[];
    patientEducationPriorities: string[];
  };
  drugInteractionAnalysis: {
    identifiedInteractions: DrugInteraction[];
    interactionRisk: string;
  };
  clinicalGuidelines: {
    relevantGuidelines: string[];
    evidenceLevel: string;
    guidelineRecommendations: string[];
  };
}

export interface QualityAssessment {
  imageClarity: 'excellent' | 'good' | 'fair' | 'poor';
  textLegibility: 'excellent' | 'good' | 'fair' | 'poor';
  completeness: 'complete' | 'partial' | 'minimal';
  confidence: 'high' | 'medium' | 'low';
  extractionConfidence: 'high' | 'medium' | 'low';
  knowledgeApplicationConfidence: 'high' | 'medium' | 'low';
  uncertainAreas: string[];
  missingInformation: string[];
}

export interface AnalysisMetadata {
  imageType: string;
  documentType: string;
  language: string;
  processingApproach: string;
  aiModel: string;
  analysisVersion: string;
  knowledgeCutoffNote: string;
}

export interface EnhancedAnalysisResult {
  extractedInformation: ExtractedInformation;
  knowledgeBasedInsights: KnowledgeBasedInsights;
  qualityAssessment: QualityAssessment;
  analysisMetadata: AnalysisMetadata;
}

export interface AnalysisResponse {
  success: boolean;
  data: EnhancedAnalysisResult;
  mock: boolean;
  error?: string;
  timestamp: string;
  processingTime?: number;
  apiVersion?: string;
  knowledgeEnhanced?: boolean;
}

interface AnalysisContextType {
  uploadedImage: string | null;
  analysisResult: AnalysisResponse | null;
  isAnalyzing: boolean;
  analysisHistory: AnalysisResponse[];
  setUploadedImage: (image: string | null) => void;
  setAnalysisResult: (result: AnalysisResponse | null) => void;
  setIsAnalyzing: (analyzing: boolean) => void;
  analyzeImage: (imageData: string, imageType: string) => Promise<void>;
  addToHistory: (result: AnalysisResponse) => void;
  clearHistory: () => void;
  exportAnalysis: (format: 'json' | 'pdf') => void;
  getMedicineKnowledge: (medicineName: string) => Promise<any>;
  analyzeInteractions: (medicines: string[]) => Promise<any>;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

interface AnalysisProviderProps {
  children: ReactNode;
}

export const AnalysisProvider: React.FC<AnalysisProviderProps> = ({ children }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResponse[]>([]);

  const analyzeImage = async (imageData: string, imageType: string) => {
    setIsAnalyzing(true);
    const startTime = Date.now();
    
    try {
      const response = await fetch('http://localhost:3001/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: imageData,
          imageType: imageType
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: AnalysisResponse = await response.json();
      result.processingTime = Date.now() - startTime;
      
      setAnalysisResult(result);
      addToHistory(result);
    } catch (error) {
      console.error('Analysis failed:', error);
      
      // Enhanced fallback mock data with knowledge insights
      const mockResult: AnalysisResponse = {
        success: true,
        data: {
          extractedInformation: {
            medicines: [
              {
                name: "Paracetamol 500mg Tablets",
                genericName: "Acetaminophen",
                brandName: "Tylenol",
                dosage: "500mg tablets",
                strength: "500mg",
                frequency: "Every 6 hours as needed",
                duration: "As needed for pain/fever",
                instructions: "Take with water, do not exceed 4g daily",
                route: "Oral",
                batchNumber: "PCM2024001",
                ndc: "0045-0123-60",
                expiryDate: "12/2025"
              }
            ],
            prescriptionDetails: {
              doctorName: "Dr. Smith",
              doctorLicense: "MD123456",
              patientName: "Patient (Redacted)",
              patientAge: "Not specified",
              prescriptionNumber: "RX2024001",
              date: "2024-01-15",
              hospitalClinic: "Medical Center",
              pharmacyName: "Central Pharmacy"
            }
          },
          knowledgeBasedInsights: {
            medicineProfiles: [
              {
                medicineName: "Paracetamol (Acetaminophen)",
                drugClass: "Non-opioid analgesic and antipyretic",
                mechanismOfAction: "Inhibits cyclooxygenase (COX) enzymes in the central nervous system, reducing prostaglandin synthesis. Also affects the endocannabinoid system and serotonergic pathways.",
                primaryIndications: ["Mild to moderate pain relief", "Fever reduction", "Headache", "Muscle aches"],
                secondaryIndications: ["Osteoarthritis pain", "Post-operative pain (combination therapy)", "Migraine (combination products)"],
                pharmacokinetics: {
                  absorption: "Rapidly and almost completely absorbed from GI tract, peak levels in 30-60 minutes",
                  distribution: "Widely distributed, crosses placenta and blood-brain barrier",
                  metabolism: "Primarily hepatic via glucuronidation and sulfation, small amount via CYP2E1 to toxic metabolite NAPQI",
                  elimination: "Renal excretion of metabolites, half-life 1-4 hours"
                },
                dosageConsiderations: {
                  standardDosing: "325-1000mg every 4-6 hours, maximum 4g/day",
                  pediatricDosing: "10-15mg/kg every 4-6 hours, maximum 75mg/kg/day",
                  geriatricDosing: "Consider reduced dosing due to decreased hepatic function",
                  renalAdjustment: "Reduce frequency if CrCl <10 mL/min",
                  hepaticAdjustment: "Contraindicated in severe hepatic impairment"
                },
                comprehensiveSideEffects: {
                  common: ["Generally well tolerated at therapeutic doses"],
                  uncommon: ["Nausea", "Skin rash", "Allergic reactions"],
                  rare: ["Thrombocytopenia", "Neutropenia", "Pancytopenia"],
                  serious: ["Hepatotoxicity (overdose)", "Severe skin reactions", "Acute liver failure"]
                },
                drugInteractions: {
                  majorInteractions: ["Warfarin (increased bleeding risk)", "Chronic alcohol use (hepatotoxicity risk)"],
                  moderateInteractions: ["Phenytoin", "Carbamazepine", "Rifampin (increased metabolism)"],
                  foodInteractions: ["Food may delay absorption but doesn't affect total absorption"],
                  supplementInteractions: ["N-acetylcysteine (antidote for overdose)"]
                },
                contraindications: {
                  absolute: ["Known hypersensitivity", "Severe hepatic impairment"],
                  relative: ["Chronic alcohol use", "Hepatic disease", "G6PD deficiency"],
                  pregnancy: "Category B - Safe during pregnancy, preferred analgesic",
                  breastfeeding: "Compatible - minimal transfer to breast milk"
                },
                monitoringRequirements: [
                  "Monitor liver function with chronic use",
                  "Watch for signs of overdose",
                  "Monitor total daily dose from all sources",
                  "Assess pain relief and fever reduction"
                ],
                patientCounseling: [
                  "Do not exceed maximum daily dose (4g/day)",
                  "Check all medications for acetaminophen content",
                  "Avoid alcohol while taking regularly",
                  "Seek medical attention for persistent pain/fever",
                  "Store safely away from children"
                ],
                clinicalPearls: [
                  "Most common cause of acute liver failure in developed countries",
                  "Safer than NSAIDs for cardiovascular and GI risk",
                  "First-line analgesic in pregnancy",
                  "Many combination products contain acetaminophen"
                ],
                alternatives: {
                  genericEquivalents: ["Multiple generic manufacturers available"],
                  therapeuticAlternatives: ["Ibuprofen", "Aspirin", "Naproxen"],
                  differentClassAlternatives: ["Topical analgesics", "Tramadol", "Codeine combinations"]
                },
                storageAndHandling: {
                  temperature: "Store at room temperature 15-30°C",
                  lightSensitivity: "Protect from light",
                  moistureProtection: "Keep in dry place, original container",
                  specialHandling: "Keep out of reach of children due to overdose risk"
                }
              }
            ],
            overallAssessment: {
              therapyApproppriateness: "Appropriate choice for mild to moderate pain and fever. Safe and effective when used as directed.",
              potentialConcerns: [
                "Risk of accidental overdose from multiple sources",
                "Hepatotoxicity risk with chronic use or overdose",
                "May mask symptoms of serious conditions"
              ],
              optimizationSuggestions: [
                "Ensure patient understands maximum daily dose",
                "Consider scheduled dosing for chronic pain",
                "Evaluate need for combination with other analgesics"
              ],
              patientEducationPriorities: [
                "Maximum daily dose limits",
                "Recognition of acetaminophen in other medications",
                "When to seek medical attention"
              ]
            },
            drugInteractionAnalysis: {
              identifiedInteractions: [],
              interactionRisk: "Low - generally safe with most medications when used appropriately"
            },
            clinicalGuidelines: {
              relevantGuidelines: [
                "WHO Pain Management Guidelines",
                "American Pain Society Guidelines",
                "ACOG Guidelines for Pain Management in Pregnancy"
              ],
              evidenceLevel: "High - extensive safety and efficacy data",
              guidelineRecommendations: [
                "First-line therapy for mild to moderate pain",
                "Preferred analgesic during pregnancy",
                "Safe for use in most patient populations"
              ]
            }
          },
          qualityAssessment: {
            imageClarity: "good",
            textLegibility: "good",
            completeness: "partial",
            confidence: "medium",
            extractionConfidence: "medium",
            knowledgeApplicationConfidence: "high",
            uncertainAreas: ["Batch number partially obscured"],
            missingInformation: ["Manufacturing date"]
          },
          analysisMetadata: {
            imageType: "prescription",
            documentType: "printed",
            language: "English",
            processingApproach: "extraction + knowledge application",
            aiModel: "gemini-1.5-flash",
            analysisVersion: "3.0-knowledge-enhanced",
            knowledgeCutoffNote: "Based on training data up to knowledge cutoff"
          }
        },
        mock: true,
        error: 'Network error - using offline knowledge-enhanced analysis',
        timestamp: new Date().toISOString(),
        processingTime: Date.now() - startTime,
        apiVersion: "3.0-knowledge-enhanced",
        knowledgeEnhanced: true
      };
      
      setAnalysisResult(mockResult);
      addToHistory(mockResult);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getMedicineKnowledge = async (medicineName: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/medicine-knowledge/${encodeURIComponent(medicineName)}`);
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch medicine knowledge:', error);
      return null;
    }
  };

  const analyzeInteractions = async (medicines: string[]) => {
    try {
      const response = await fetch('http://localhost:3001/api/analyze-interactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ medicines }),
      });
      return await response.json();
    } catch (error) {
      console.error('Failed to analyze interactions:', error);
      return null;
    }
  };

  const addToHistory = (result: AnalysisResponse) => {
    setAnalysisHistory(prev => [result, ...prev.slice(0, 9)]); // Keep last 10 analyses
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
  };

  const exportAnalysis = (format: 'json' | 'pdf') => {
    if (!analysisResult) return;

    if (format === 'json') {
      const dataStr = JSON.stringify(analysisResult, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mediscan-knowledge-analysis-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <AnalysisContext.Provider
      value={{
        uploadedImage,
        analysisResult,
        isAnalyzing,
        analysisHistory,
        setUploadedImage,
        setAnalysisResult,
        setIsAnalyzing,
        analyzeImage,
        addToHistory,
        clearHistory,
        exportAnalysis,
        getMedicineKnowledge,
        analyzeInteractions,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
};