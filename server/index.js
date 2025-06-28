import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Enhanced analysis endpoint with Gemini knowledge integration
app.post('/api/analyze', async (req, res) => {
  try {
    const { image, imageType } = req.body;

    if (!image) {
      return res.status(400).json({ 
        error: 'No image provided',
        mock: false 
      });
    }

    // Remove data URL prefix if present
    const base64Image = image.replace(/^data:image\/[a-z]+;base64,/, '');

    // Use the current Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const enhancedPrompt = `
    You are an expert medical AI assistant with comprehensive pharmaceutical knowledge. Analyze this medical image and provide both EXTRACTED information and KNOWLEDGE-BASED insights.

    PHASE 1 - EXTRACT VISIBLE INFORMATION:
    Extract information EXACTLY as written in the image. If text is unclear, indicate uncertainty.

    PHASE 2 - APPLY MEDICAL KNOWLEDGE:
    For each identified medicine, use your extensive pharmaceutical knowledge to provide:
    1. Detailed drug information and mechanism of action
    2. Complete therapeutic uses and indications
    3. Comprehensive side effects and adverse reactions
    4. Drug interactions and contraindications
    5. Clinical considerations and monitoring requirements
    6. Patient counseling points
    7. Alternative medications and generic equivalents
    8. Dosing considerations for special populations
    9. Storage and handling requirements
    10. Clinical pearls and important notes

    Return ONLY valid JSON in this exact structure:
    {
      "extractedInformation": {
        "medicines": [
          {
            "name": "exact medicine name as written",
            "genericName": "generic name if different",
            "brandName": "brand name if different",
            "dosage": "complete dosage with units",
            "strength": "active ingredient strength",
            "frequency": "detailed frequency",
            "duration": "treatment duration",
            "instructions": "complete usage instructions",
            "route": "administration route",
            "batchNumber": "batch/lot number if visible",
            "ndc": "NDC number if visible",
            "expiryDate": "expiry date if visible"
          }
        ],
        "prescriptionDetails": {
          "doctorName": "prescribing doctor name",
          "doctorLicense": "doctor license number if visible",
          "patientName": "patient name (redact if privacy concern)",
          "patientAge": "patient age if mentioned",
          "prescriptionNumber": "prescription number",
          "date": "prescription date",
          "hospitalClinic": "healthcare facility name",
          "pharmacyName": "dispensing pharmacy name"
        }
      },
      "knowledgeBasedInsights": {
        "medicineProfiles": [
          {
            "medicineName": "medicine name",
            "drugClass": "therapeutic classification",
            "mechanismOfAction": "detailed explanation of how the drug works",
            "primaryIndications": ["main therapeutic uses"],
            "secondaryIndications": ["off-label or secondary uses"],
            "pharmacokinetics": {
              "absorption": "absorption characteristics",
              "distribution": "distribution in body",
              "metabolism": "metabolic pathway",
              "elimination": "elimination route and half-life"
            },
            "dosageConsiderations": {
              "standardDosing": "typical dosing regimens",
              "pediatricDosing": "dosing for children if applicable",
              "geriatricDosing": "dosing considerations for elderly",
              "renalAdjustment": "kidney function adjustments",
              "hepaticAdjustment": "liver function adjustments"
            },
            "comprehensiveSideEffects": {
              "common": ["frequent side effects >10%"],
              "uncommon": ["less frequent side effects 1-10%"],
              "rare": ["rare side effects <1%"],
              "serious": ["serious adverse reactions requiring monitoring"]
            },
            "drugInteractions": {
              "majorInteractions": ["significant drug interactions"],
              "moderateInteractions": ["moderate interactions"],
              "foodInteractions": ["food and dietary interactions"],
              "supplementInteractions": ["vitamin/supplement interactions"]
            },
            "contraindications": {
              "absolute": ["absolute contraindications"],
              "relative": ["relative contraindications"],
              "pregnancy": "pregnancy category and considerations",
              "breastfeeding": "breastfeeding safety information"
            },
            "monitoringRequirements": ["lab tests and clinical monitoring needed"],
            "patientCounseling": ["important points to discuss with patients"],
            "clinicalPearls": ["important clinical considerations and tips"],
            "alternatives": {
              "genericEquivalents": ["available generic versions"],
              "therapeuticAlternatives": ["alternative medications in same class"],
              "differentClassAlternatives": ["alternatives from different drug classes"]
            },
            "storageAndHandling": {
              "temperature": "storage temperature requirements",
              "lightSensitivity": "light protection needs",
              "moistureProtection": "humidity considerations",
              "specialHandling": "any special handling requirements"
            }
          }
        ],
        "overallAssessment": {
          "therapyApproppriateness": "assessment of the prescribed therapy",
          "potentialConcerns": ["any potential issues or red flags"],
          "optimizationSuggestions": ["suggestions for therapy optimization"],
          "patientEducationPriorities": ["key education points for patient"]
        },
        "drugInteractionAnalysis": {
          "identifiedInteractions": [
            {
              "drugs": ["drug A", "drug B"],
              "severity": "major/moderate/minor",
              "mechanism": "interaction mechanism",
              "clinicalSignificance": "clinical impact",
              "management": "how to manage the interaction"
            }
          ],
          "interactionRisk": "overall interaction risk assessment"
        },
        "clinicalGuidelines": {
          "relevantGuidelines": ["applicable clinical guidelines"],
          "evidenceLevel": "strength of evidence for prescribed therapy",
          "guidelineRecommendations": ["specific guideline recommendations"]
        }
      },
      "qualityAssessment": {
        "imageClarity": "excellent/good/fair/poor",
        "textLegibility": "excellent/good/fair/poor",
        "completeness": "complete/partial/minimal",
        "confidence": "high/medium/low",
        "extractionConfidence": "confidence in extracted information",
        "knowledgeApplicationConfidence": "confidence in applied medical knowledge",
        "uncertainAreas": ["areas where text was unclear"],
        "missingInformation": ["expected information not found"]
      },
      "analysisMetadata": {
        "imageType": "prescription/medicine_strip/bottle_label/box_label",
        "documentType": "handwritten/printed/digital",
        "language": "primary language detected",
        "processingApproach": "extraction + knowledge application",
        "aiModel": "gemini-1.5-flash",
        "analysisVersion": "3.0-knowledge-enhanced",
        "knowledgeCutoffNote": "Based on training data up to knowledge cutoff"
      }
    }

    CRITICAL INSTRUCTIONS:
    1. For EXTRACTED information: Use ONLY what is visible in the image
    2. For KNOWLEDGE-BASED insights: Apply your comprehensive medical knowledge
    3. Clearly distinguish between extracted facts and knowledge-based insights
    4. If medicine is not clearly identifiable, limit knowledge application
    5. Always include confidence levels for both extraction and knowledge application
    6. Provide comprehensive but accurate medical information
    7. Include appropriate medical disclaimers in knowledge sections
    8. Focus on clinically relevant and actionable insights
    `;

    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: imageType || "image/jpeg"
      }
    };

    const result = await model.generateContent([enhancedPrompt, imagePart]);
    const response = await result.response;
    let text = response.text();

    try {
      // Enhanced text cleaning
      text = text.trim();
      
      // Remove markdown code block formatting
      text = text.replace(/^```json\s*/i, '');
      text = text.replace(/^```\s*/, '');
      text = text.replace(/\s*```$/i, '');
      
      // Remove any leading/trailing whitespace
      text = text.trim();
      
      // Extract JSON if wrapped in other text
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        text = jsonMatch[0];
      }

      const analysisData = JSON.parse(text);
      
      // Enhanced response with knowledge integration
      res.json({
        success: true,
        data: analysisData,
        mock: false,
        timestamp: new Date().toISOString(),
        processingTime: Date.now(),
        apiVersion: "3.0-knowledge-enhanced",
        knowledgeEnhanced: true
      });
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw response text:', text);
      
      // Enhanced mock data with knowledge insights
      const mockData = generateKnowledgeEnhancedMockAnalysis();
      res.json({
        success: true,
        data: mockData,
        mock: true,
        error: 'Failed to parse AI response, using knowledge-enhanced mock data',
        rawResponse: text.substring(0, 500) + '...', 
        timestamp: new Date().toISOString(),
        apiVersion: "3.0-knowledge-enhanced",
        knowledgeEnhanced: true
      });
    }

  } catch (error) {
    console.error('Gemini API error:', error);
    
    const mockData = generateKnowledgeEnhancedMockAnalysis();
    res.json({
      success: true,
      data: mockData,
      mock: true,
      error: error.message || 'AI service temporarily unavailable, using knowledge-enhanced mock data',
      timestamp: new Date().toISOString(),
      apiVersion: "3.0-knowledge-enhanced",
      knowledgeEnhanced: true
    });
  }
});

// Enhanced mock data generator with knowledge insights
function generateKnowledgeEnhancedMockAnalysis() {
  const mockDataOptions = [
    {
      extractedInformation: {
        medicines: [
          {
            name: "Amoxicillin 500mg Capsules",
            genericName: "Amoxicillin",
            brandName: "Amoxil",
            dosage: "500mg capsules",
            strength: "500mg",
            frequency: "Three times daily",
            duration: "7 days",
            instructions: "Take with food",
            route: "Oral",
            batchNumber: "AMX2024001",
            ndc: "0093-2264-01",
            expiryDate: "12/2025"
          }
        ],
        prescriptionDetails: {
          doctorName: "Dr. Sarah Johnson, MD",
          doctorLicense: "MD123456",
          patientName: "Patient Name (Redacted)",
          patientAge: "35 years",
          prescriptionNumber: "RX2024001234",
          date: "2024-01-15",
          hospitalClinic: "City Medical Center",
          pharmacyName: "Central Pharmacy"
        }
      },
      knowledgeBasedInsights: {
        medicineProfiles: [
          {
            medicineName: "Amoxicillin",
            drugClass: "Beta-lactam antibiotic (Penicillin derivative)",
            mechanismOfAction: "Inhibits bacterial cell wall synthesis by binding to penicillin-binding proteins, leading to cell wall weakening and bacterial lysis. Effective against gram-positive and some gram-negative bacteria.",
            primaryIndications: [
              "Respiratory tract infections (pneumonia, bronchitis)",
              "Urinary tract infections",
              "Skin and soft tissue infections",
              "Otitis media",
              "Dental infections"
            ],
            secondaryIndications: [
              "H. pylori eradication (combination therapy)",
              "Endocarditis prophylaxis",
              "Lyme disease (early stages)",
              "Anthrax exposure prophylaxis"
            ],
            pharmacokinetics: {
              absorption: "Well absorbed orally (74-92%), food does not significantly affect absorption",
              distribution: "Widely distributed, crosses placenta, minimal CNS penetration",
              metabolism: "Minimal hepatic metabolism (~10%)",
              elimination: "Primarily renal excretion (60-70% unchanged), half-life 1-1.3 hours"
            },
            dosageConsiderations: {
              standardDosing: "250-500mg every 8 hours or 500-875mg every 12 hours",
              pediatricDosing: "20-40mg/kg/day divided every 8 hours (max 2-3g/day)",
              geriatricDosing: "No adjustment needed unless renal impairment",
              renalAdjustment: "CrCl 10-30: dose every 12h; CrCl <10: dose every 24h",
              hepaticAdjustment: "No adjustment needed"
            },
            comprehensiveSideEffects: {
              common: ["Nausea (7%)", "Diarrhea (9%)", "Abdominal pain", "Headache"],
              uncommon: ["Vomiting (3%)", "Skin rash (3%)", "Dizziness", "Fatigue"],
              rare: ["Severe allergic reactions", "Stevens-Johnson syndrome", "Hepatotoxicity"],
              serious: ["Anaphylaxis", "C. difficile colitis", "Severe skin reactions"]
            },
            drugInteractions: {
              majorInteractions: ["Warfarin (increased bleeding risk)", "Methotrexate (increased toxicity)"],
              moderateInteractions: ["Oral contraceptives (reduced efficacy)", "Allopurinol (increased rash risk)"],
              foodInteractions: ["None significant - can take with or without food"],
              supplementInteractions: ["Probiotics may help prevent antibiotic-associated diarrhea"]
            },
            contraindications: {
              absolute: ["Known penicillin allergy", "Previous severe allergic reaction to beta-lactams"],
              relative: ["Mononucleosis (increased rash risk)", "Severe renal impairment"],
              pregnancy: "Category B - Generally safe, crosses placenta but no known harm",
              breastfeeding: "Compatible - minimal transfer to breast milk"
            },
            monitoringRequirements: [
              "Monitor for allergic reactions",
              "Assess clinical response after 48-72 hours",
              "Monitor renal function in elderly or impaired patients",
              "Watch for signs of C. difficile infection"
            ],
            patientCounseling: [
              "Complete full course even if feeling better",
              "Take with food if stomach upset occurs",
              "Report any rash, difficulty breathing, or severe diarrhea immediately",
              "May reduce effectiveness of oral contraceptives",
              "Stay hydrated and consider probiotics"
            ],
            clinicalPearls: [
              "Amoxicillin rash in mononucleosis patients is not a true allergy",
              "Higher doses (875mg BID) preferred for respiratory infections",
              "Good first-line choice for most common bacterial infections",
              "Resistance increasing in H. influenzae and E. coli"
            ],
            alternatives: {
              genericEquivalents: ["Multiple generic manufacturers available"],
              therapeuticAlternatives: ["Ampicillin", "Amoxicillin/clavulanate", "Penicillin VK"],
              differentClassAlternatives: ["Azithromycin", "Cephalexin", "Doxycycline"]
            },
            storageAndHandling: {
              temperature: "Store at room temperature 20-25°C (68-77°F)",
              lightSensitivity: "Protect from light",
              moistureProtection: "Keep in original container, protect from moisture",
              specialHandling: "Oral suspension requires refrigeration and shaking"
            }
          }
        ],
        overallAssessment: {
          therapyApproppriateness: "Appropriate first-line antibiotic choice for most common bacterial infections. Standard dosing and duration appear reasonable.",
          potentialConcerns: [
            "Ensure patient has no penicillin allergy history",
            "Monitor for antibiotic-associated diarrhea",
            "Consider resistance patterns in local area"
          ],
          optimizationSuggestions: [
            "Confirm bacterial vs viral infection before treatment",
            "Consider culture and sensitivity if severe infection",
            "Ensure adequate hydration during treatment"
          ],
          patientEducationPriorities: [
            "Importance of completing full course",
            "Recognition of allergic reaction symptoms",
            "When to seek immediate medical attention"
          ]
        },
        drugInteractionAnalysis: {
          identifiedInteractions: [
            {
              drugs: ["Amoxicillin", "Warfarin"],
              severity: "moderate",
              mechanism: "Alteration of gut flora affecting vitamin K synthesis",
              clinicalSignificance: "May increase INR and bleeding risk",
              management: "Monitor INR more frequently, adjust warfarin dose if needed"
            }
          ],
          interactionRisk: "Low to moderate - mainly with anticoagulants and oral contraceptives"
        },
        clinicalGuidelines: {
          relevantGuidelines: [
            "IDSA Guidelines for Community-Acquired Pneumonia",
            "AAP Guidelines for Acute Otitis Media",
            "AHA Guidelines for Endocarditis Prophylaxis"
          ],
          evidenceLevel: "High - extensive clinical evidence supporting efficacy",
          guidelineRecommendations: [
            "First-line therapy for uncomplicated respiratory infections",
            "Preferred agent for dental prophylaxis in penicillin-tolerant patients"
          ]
        }
      },
      qualityAssessment: {
        imageClarity: "good",
        textLegibility: "excellent",
        completeness: "complete",
        confidence: "high",
        extractionConfidence: "high",
        knowledgeApplicationConfidence: "high",
        uncertainAreas: [],
        missingInformation: []
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
    }
  ];

  return mockDataOptions[0];
}

// Medicine knowledge lookup endpoint
app.get('/api/medicine-knowledge/:name', async (req, res) => {
  const { name } = req.params;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const knowledgePrompt = `
    Provide comprehensive pharmaceutical knowledge about "${name}". Include:
    1. Drug classification and mechanism of action
    2. Therapeutic indications and uses
    3. Dosing information and considerations
    4. Side effects and adverse reactions
    5. Drug interactions and contraindications
    6. Clinical monitoring requirements
    7. Patient counseling points
    8. Alternative medications
    
    Return as structured JSON with detailed medical information.
    `;
    
    const result = await model.generateContent(knowledgePrompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({
      medicine: name,
      knowledge: text,
      source: "gemini-knowledge-base"
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicine knowledge' });
  }
});

// Drug interaction analysis endpoint
app.post('/api/analyze-interactions', async (req, res) => {
  const { medicines } = req.body;
  
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const interactionPrompt = `
    Analyze potential drug interactions between these medications: ${medicines.join(', ')}.
    
    Provide:
    1. Identified interactions with severity levels
    2. Mechanisms of interaction
    3. Clinical significance
    4. Management recommendations
    5. Monitoring requirements
    
    Return as structured JSON with detailed interaction analysis.
    `;
    
    const result = await model.generateContent(interactionPrompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({
      medicines: medicines,
      interactionAnalysis: text,
      source: "gemini-knowledge-base"
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to analyze drug interactions' });
  }
});

app.listen(PORT, () => {
  console.log(`Knowledge-Enhanced MediScan AI Server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
  console.log(`API Version: 3.0 - Knowledge-Enhanced Analysis`);
});