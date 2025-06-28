import React from 'react';
import { Brain, Shield, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const AboutPage: React.FC = () => {
  return (
    <PageWrapper skeletonType="about" loadingOptions={{ minLoadingTime: 400, maxLoadingTime: 800 }}>
      <div className="space-y-16">
        {/* Swiss Hero */}
        <section className="grid grid-cols-12 gap-8 py-16">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 leading-none tracking-tight mb-8">
              ABOUT
              <br />
              <span className="text-accent-600">MEDISCAN AI</span>
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed max-w-2xl">
              Advanced AI-powered prescription analysis using Google Gemini Vision to help you 
              understand your medications better and ensure safe usage.
            </p>
          </div>
        </section>

        {/* Swiss Features Grid */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                Core
                <br />
                Features
              </h2>
            </div>
            
            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">AI-Powered Analysis</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Leverages Google Gemini Vision AI to accurately extract and interpret 
                    prescription information from images.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Secure & Private</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Your medical information is processed securely with no data storage. 
                    Images are analyzed in real-time and not retained.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">Instant Results</h3>
                  <p className="text-neutral-600 leading-relaxed">
                    Get comprehensive medication analysis within seconds, including dosage, 
                    frequency, warnings, and usage instructions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Swiss Process */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                How It
                <br />
                Works
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
                  <h4 className="font-bold text-neutral-900 uppercase tracking-wide">Data Extraction</h4>
                  <p className="text-sm text-neutral-600">
                    Medicine names, dosages, frequencies, and warnings are identified
                  </p>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-neutral-900 text-white flex items-center justify-center mx-auto text-sm font-bold">
                    04
                  </div>
                  <h4 className="font-bold text-neutral-900 uppercase tracking-wide">Get Results</h4>
                  <p className="text-sm text-neutral-600">
                    Receive structured, easy-to-understand medication information
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Swiss Analysis Types */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                What We
                <br />
                Analyze
              </h2>
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-neutral-900 mb-4 flex items-center uppercase tracking-wide">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Supported Formats
                  </h4>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• Handwritten prescriptions</li>
                    <li>• Digital/printed prescriptions</li>
                    <li>• Medicine strips and blister packs</li>
                    <li>• Medicine bottles and boxes</li>
                    <li>• Pharmacy labels</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold text-neutral-900 mb-4 flex items-center uppercase tracking-wide">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Extracted Information
                  </h4>
                  <ul className="space-y-2 text-neutral-600">
                    <li>• Medicine names (brand & generic)</li>
                    <li>• Dosage and strength</li>
                    <li>• Frequency and timing</li>
                    <li>• Duration of treatment</li>
                    <li>• Usage instructions</li>
                    <li>• Warnings and precautions</li>
                    <li>• Expiry dates</li>
                    <li>• Manufacturer information</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Swiss Disclaimer */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="border border-accent-200 bg-accent-50 p-8">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-6 w-6 text-accent-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-accent-900 mb-4 uppercase tracking-wide">Important Medical Disclaimer</h3>
                <div className="text-accent-800 space-y-4">
                  <p>
                    MediScan AI is designed to assist with medication information extraction and should 
                    <strong> never replace professional medical advice</strong>.
                  </p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Always consult with qualified healthcare providers</li>
                    <li>Verify all medication information with your doctor or pharmacist</li>
                    <li>Do not make medication changes based solely on AI analysis</li>
                    <li>In case of medical emergencies, contact emergency services immediately</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Swiss Technology */}
        <section className="border-t border-neutral-200 pt-16">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight">
                Technology
                <br />
                Stack
              </h2>
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto">
                    <div className="text-2xl">⚛️</div>
                  </div>
                  <p className="font-bold text-neutral-900 uppercase tracking-wide">React</p>
                  <p className="text-sm text-neutral-600 uppercase tracking-wide">Frontend</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto">
                    <div className="text-2xl">🧠</div>
                  </div>
                  <p className="font-bold text-neutral-900 uppercase tracking-wide">Gemini AI</p>
                  <p className="text-sm text-neutral-600 uppercase tracking-wide">Vision</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto">
                    <div className="text-2xl">🚀</div>
                  </div>
                  <p className="font-bold text-neutral-900 uppercase tracking-wide">Node.js</p>
                  <p className="text-sm text-neutral-600 uppercase tracking-wide">Backend</p>
                </div>
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto">
                    <div className="text-2xl">🎨</div>
                  </div>
                  <p className="font-bold text-neutral-900 uppercase tracking-wide">Tailwind</p>
                  <p className="text-sm text-neutral-600 uppercase tracking-wide">Styling</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;