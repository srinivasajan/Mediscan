import React from 'react';
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { Shield, User, Lock, CheckCircle, Brain, Activity, ArrowRight, Circle, Square, Triangle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return (
    <>
      <SignedIn>
        {children}
      </SignedIn>
      
      <SignedOut>
        <div className="min-h-[80vh] flex items-center justify-center py-16 bg-gradient-to-br from-neutral-50 to-neutral-100">
          <div className="max-w-6xl mx-auto relative">
            {/* Bauhaus Geometric Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {/* Large geometric shapes */}
              <div className="absolute top-10 right-20 w-32 h-32 bg-accent-500 opacity-10 transform rotate-45"></div>
              <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-500 rounded-full opacity-15"></div>
              <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-yellow-400 opacity-20"></div>
              
              {/* Small accent elements */}
              <div className="absolute top-1/4 right-1/3 w-4 h-4 bg-accent-600"></div>
              <div className="absolute bottom-1/3 right-1/4 w-6 h-6 bg-blue-600 rounded-full"></div>
              <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-yellow-500"></div>
            </div>

            <div className="grid grid-cols-12 gap-16 relative z-10">
              {/* Bauhaus Left Column - Typography with Geometric Elements */}
              <div className="col-span-12 lg:col-span-7 space-y-8">
                {/* Bauhaus Badge with Geometric Accent */}
                <div className="inline-flex items-center space-x-3">
                  <div className="w-3 h-3 bg-accent-600"></div>
                  <div className="px-4 py-2 bg-white border-2 border-neutral-900 text-neutral-900 text-xs font-bold uppercase tracking-widest">
                    Secure Medical Platform
                  </div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                </div>

                {/* Bauhaus Typography with Geometric Accents */}
                <div className="space-y-6 relative">
                  {/* Geometric accent line */}
                  <div className="absolute -left-4 top-0 w-1 h-32 bg-accent-600"></div>
                  
                  <h1 className="text-5xl lg:text-7xl font-black text-neutral-900 leading-none tracking-tighter">
                    SECURE
                    <br />
                    <span className="relative">
                      ACCESS
                      {/* Bauhaus underline */}
                      <div className="absolute -bottom-2 left-0 w-24 h-1 bg-yellow-400"></div>
                    </span>
                    <br />
                    <span className="text-accent-600 relative">
                      REQUIRED
                      {/* Geometric accent */}
                      <div className="absolute -right-8 top-4 w-4 h-4 bg-blue-600 transform rotate-45"></div>
                    </span>
                  </h1>
                  
                  <div className="max-w-xl relative">
                    {/* Bauhaus quote mark */}
                    <div className="absolute -left-6 -top-2 w-4 h-4 border-l-4 border-t-4 border-accent-600"></div>
                    <p className="text-lg text-neutral-700 leading-relaxed font-medium">
                      Enterprise-grade authentication protects your medical data. Sign in to access 
                      advanced AI analysis, secure history, and personalized healthcare insights.
                    </p>
                  </div>
                </div>

                {/* Bauhaus CTA with Geometric Elements */}
                <div className="flex items-center space-x-6 relative">
                  <SignInButton mode="modal">
                    <button className="relative inline-flex items-center space-x-3 px-8 py-4 bg-neutral-900 text-white text-sm font-bold uppercase tracking-wide hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105">
                      {/* Bauhaus corner accent */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 bg-accent-600"></div>
                      <User className="h-4 w-4" />
                      <span>Sign In</span>
                      <ArrowRight className="h-4 w-4" />
                      {/* Bauhaus corner accent */}
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400"></div>
                    </button>
                  </SignInButton>
                  
                  <div className="relative px-8 py-4 border-2 border-neutral-900 text-neutral-900 text-sm font-bold uppercase tracking-wide bg-white">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-blue-600"></div>
                    Free Account
                  </div>
                </div>

                {/* Bauhaus Security Metrics with Geometric Grid */}
                <div className="pt-8 border-t-4 border-neutral-900 relative">
                  {/* Bauhaus grid accent */}
                  <div className="absolute -top-2 left-8 w-4 h-4 bg-accent-600"></div>
                  
                  <div className="grid grid-cols-4 gap-8">
                    <div className="text-center relative group">
                      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-2xl font-black text-neutral-900">256-bit</div>
                        <div className="text-xs text-neutral-600 font-bold uppercase tracking-wide">Encryption</div>
                      </div>
                    </div>
                    <div className="text-center relative group">
                      <div className="absolute inset-0 bg-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-2xl font-black text-neutral-900">HIPAA</div>
                        <div className="text-xs text-neutral-600 font-bold uppercase tracking-wide">Compliant</div>
                      </div>
                    </div>
                    <div className="text-center relative group">
                      <div className="absolute inset-0 bg-accent-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-2xl font-black text-neutral-900">SOC 2</div>
                        <div className="text-xs text-neutral-600 font-bold uppercase tracking-wide">Certified</div>
                      </div>
                    </div>
                    <div className="text-center relative group">
                      <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="text-2xl font-black text-neutral-900">99.9%</div>
                        <div className="text-xs text-neutral-600 font-bold uppercase tracking-wide">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bauhaus Right Column - Features with Geometric Design */}
              <div className="col-span-12 lg:col-span-5 space-y-8">
                {/* Bauhaus Feature Grid with Geometric Accents */}
                <div className="bg-white border-4 border-neutral-900 p-8 relative shadow-lg">
                  {/* Bauhaus corner elements */}
                  <div className="absolute top-0 left-0 w-6 h-6 bg-accent-600"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-yellow-400"></div>
                  
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <h3 className="text-xl font-black text-neutral-900 uppercase tracking-wide">
                      Protected Features
                    </h3>
                    <div className="flex-1 h-px bg-neutral-300"></div>
                    <div className="w-2 h-2 bg-accent-600"></div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center flex-shrink-0 relative group-hover:bg-accent-600 transition-colors duration-300">
                        <Brain className="h-6 w-6 text-white" />
                        {/* Bauhaus accent */}
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-wide">AI Analysis</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Advanced prescription analysis with medical knowledge integration and clinical insights
                        </p>
                        {/* Bauhaus underline */}
                        <div className="w-8 h-0.5 bg-accent-600 mt-2"></div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center flex-shrink-0 relative group-hover:bg-blue-600 transition-colors duration-300">
                        <Shield className="h-6 w-6 text-white" />
                        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-wide">Data Security</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Enterprise-grade encryption with secure analysis history and personal data protection
                        </p>
                        <div className="w-8 h-0.5 bg-blue-600 mt-2"></div>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 group">
                      <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center flex-shrink-0 relative group-hover:bg-yellow-500 transition-colors duration-300">
                        <Activity className="h-6 w-6 text-white" />
                        <div className="absolute -top-1 -left-1 w-2 h-2 bg-accent-600"></div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-black text-neutral-900 mb-2 uppercase tracking-wide">Health Insights</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                          Personalized drug interactions, safety assessments, and clinical guidelines
                        </p>
                        <div className="w-8 h-0.5 bg-yellow-500 mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bauhaus Benefits List with Geometric Grid */}
                <div className="border-2 border-neutral-900 p-8 bg-gradient-to-br from-white to-neutral-50 relative">
                  {/* Bauhaus geometric pattern */}
                  <div className="absolute top-4 right-4 grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-accent-600"></div>
                    <div className="w-2 h-2 bg-blue-600"></div>
                    <div className="w-2 h-2 bg-yellow-400"></div>
                    <div className="w-2 h-2 bg-neutral-900"></div>
                  </div>
                  
                  <h4 className="font-black text-neutral-900 mb-6 uppercase tracking-wide flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent-600 transform rotate-45"></div>
                    <span>What You Get</span>
                  </h4>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      'Secure Analysis History',
                      'Export & Download Reports',
                      'Advanced Drug Interactions',
                      'Clinical Guidelines Access',
                      'Personal Health Dashboard',
                      'Priority Support'
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3 group">
                        <div className={`w-3 h-3 transition-all duration-300 ${
                          index % 3 === 0 ? 'bg-accent-600 group-hover:bg-accent-700' :
                          index % 3 === 1 ? 'bg-blue-600 group-hover:bg-blue-700 rounded-full' :
                          'bg-yellow-400 group-hover:bg-yellow-500 transform rotate-45'
                        }`}></div>
                        <span className="text-sm text-neutral-700 font-medium uppercase tracking-wide group-hover:text-neutral-900 transition-colors">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bauhaus Security Notice with Geometric Frame */}
                <div className="bg-white border-l-4 border-accent-600 p-6 relative shadow-md">
                  {/* Bauhaus corner accents */}
                  <div className="absolute top-0 right-0 w-4 h-4 bg-yellow-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 bg-blue-600 rounded-full"></div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-neutral-900 flex items-center justify-center flex-shrink-0">
                      <Lock className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-black text-neutral-900 mb-3 uppercase tracking-wide flex items-center space-x-2">
                        <span>Medical Data Protection</span>
                        <div className="w-2 h-2 bg-accent-600"></div>
                      </h4>
                      <div className="text-xs text-neutral-700 space-y-2 font-medium">
                        <div className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-accent-600 mt-2 flex-shrink-0"></div>
                          <p>Zero-knowledge architecture - we never store prescription images</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-blue-600 mt-2 flex-shrink-0 rounded-full"></div>
                          <p>End-to-end encryption for all medical data transmission</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-yellow-400 mt-2 flex-shrink-0"></div>
                          <p>HIPAA-compliant infrastructure and data handling</p>
                        </div>
                        <div className="flex items-start space-x-2">
                          <div className="w-1 h-1 bg-neutral-900 mt-2 flex-shrink-0"></div>
                          <p>Regular security audits and compliance monitoring</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;