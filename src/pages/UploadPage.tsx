import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Upload, Shield, TrendingUp, Brain, Target, FlaskConical, BookOpen, History, Zap, ArrowRight } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';
import SmoothButton from '../components/SmoothButton';
import SmoothLink from '../components/SmoothLink';
import PageWrapper from '../components/PageWrapper';

const UploadPage: React.FC = () => {
  return (
    <PageWrapper skeletonType="upload" loadingOptions={{ minLoadingTime: 600, maxLoadingTime: 1200 }}>
      <div className="space-y-12 py-8 ultra-smooth">
        {/* Ultra-Smooth Hero Section */}
        <AnimatedSection animation="fadeInUp" className="grid grid-cols-12 gap-8" id="hero">
          <div className="col-span-12 lg:col-span-8">
            <div className="space-y-6">
              {/* Minimal Badge */}
              <AnimatedSection animation="fadeInLeft" delay={200}>
                <div className="inline-block">
                  <div className="px-4 py-2 bg-neutral-100 text-neutral-900 text-xs font-medium uppercase tracking-widest ultra-smooth-hover">
                    AI-Powered Medical Intelligence
                  </div>
                </div>
              </AnimatedSection>

              {/* Ultra-Smooth Typography */}
              <div className="space-y-4">
                <AnimatedSection animation="fadeInUp" delay={400}>
                  <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-none tracking-tight text-reveal">
                    PROFESSIONAL
                    <br />
                    MEDICAL
                    <br />
                    <span className="text-accent-600">ANALYSIS</span>
                  </h1>
                </AnimatedSection>
                
                <AnimatedSection animation="fadeInUp" delay={600}>
                  <div className="max-w-2xl">
                    <p className="text-lg text-neutral-600 leading-relaxed font-light">
                      Transform prescription analysis with enterprise-grade AI that combines advanced 
                      image processing with comprehensive medical knowledge for clinical insights, 
                      safety assessments, and evidence-based recommendations.
                    </p>
                  </div>
                </AnimatedSection>
              </div>

              {/* Ultra-Smooth CTA */}
              <AnimatedSection animation="fadeInUp" delay={800}>
                <div className="flex items-center space-x-6">
                  <Link to="/upload-image">
                    <SmoothButton variant="primary" size="lg" className="flex items-center space-x-2 ultra-smooth-hover">
                      <Upload className="h-4 w-4" />
                      <span>Start Analysis</span>
                      <ArrowRight className="h-4 w-4" />
                    </SmoothButton>
                  </Link>
                  
                  <SmoothLink to="#features" smooth={true}>
                    <SmoothButton variant="outline" size="lg" className="ultra-smooth-hover">
                      View Features
                    </SmoothButton>
                  </SmoothLink>
                </div>
              </AnimatedSection>

              {/* Ultra-Smooth Metrics Grid */}
              <AnimatedSection animation="fadeInUp" delay={1000}>
                <div className="grid grid-cols-4 gap-8 pt-6 border-t border-neutral-200">
                  {[
                    { value: '99.9%', label: 'Accuracy' },
                    { value: '4.9/5', label: 'Rating' },
                    { value: '50K+', label: 'Analyses' },
                    { value: 'ISO', label: 'Certified' }
                  ].map((metric, index) => (
                    <div key={index} className={`text-center ultra-smooth-hover fade-in stagger-${index + 1}`}>
                      <div className="text-2xl font-bold text-neutral-900">{metric.value}</div>
                      <div className="text-xs text-neutral-600 uppercase tracking-wide">{metric.label}</div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Ultra-Smooth Grid Visual */}
          <AnimatedSection animation="fadeInRight" delay={600} className="col-span-12 lg:col-span-4">
            <div className="h-full bg-neutral-100 flex items-center justify-center ultra-smooth-hover">
              <div className="grid grid-cols-3 gap-4 p-8">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-16 h-16 ultra-smooth-hover ${
                      i === 4 ? 'bg-accent-600' : 'bg-neutral-300'
                    } fade-in stagger-${(i % 3) + 1}`}
                  />
                ))}
              </div>
            </div>
          </AnimatedSection>
        </AnimatedSection>

        {/* Ultra-Smooth Features Grid */}
        <AnimatedSection animation="fadeInUp" className="border-t border-neutral-200 pt-12" id="features">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-3">
              <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight text-reveal">
                Knowledge
                <br />
                Integration
              </h2>
            </div>
            
            <div className="col-span-12 lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: FlaskConical, title: 'Drug Mechanisms', desc: 'Detailed pharmacology, molecular mechanisms, and therapeutic pathways' },
                  { icon: Target, title: 'Clinical Indications', desc: 'Primary and secondary therapeutic applications with evidence levels' },
                  { icon: Shield, title: 'Safety Profiles', desc: 'Comprehensive adverse effects, contraindications, and risk assessments' },
                  { icon: BookOpen, title: 'Clinical Guidelines', desc: 'Evidence-based recommendations and professional protocols' }
                ].map((feature, index) => (
                  <AnimatedSection 
                    key={index} 
                    animation="fadeInUp" 
                    delay={200 * (index + 1)}
                    className={`space-y-4 card fade-in stagger-${index + 1}`}
                  >
                    <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center ultra-smooth-hover">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 uppercase tracking-wide">{feature.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{feature.desc}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Ultra-Smooth Capabilities */}
        <AnimatedSection animation="fadeInUp" className="border-t border-neutral-200 pt-12" id="capabilities">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-4">
              <h2 className="text-2xl font-bold text-neutral-900 uppercase tracking-tight text-reveal">
                Enterprise
                <br />
                Analysis
              </h2>
              <p className="text-neutral-600 mt-4 leading-relaxed fade-in stagger-1">
                Professional-level insights powered by advanced AI algorithms and comprehensive medical databases.
              </p>
            </div>
            
            <div className="col-span-12 lg:col-span-8">
              <div className="grid grid-cols-5 gap-8">
                {[
                  { icon: TrendingUp, title: 'Quality', desc: 'AI confidence scoring' },
                  { icon: Shield, title: 'Interactions', desc: 'Drug analysis' },
                  { icon: Zap, title: 'Kinetics', desc: 'ADME pathways' },
                  { icon: History, title: 'Pearls', desc: 'Expert insights' },
                  { icon: Brain, title: 'Education', desc: 'Patient counseling' }
                ].map((capability, index) => (
                  <AnimatedSection 
                    key={index} 
                    animation="fadeInUp" 
                    delay={150 * (index + 1)}
                    className={`text-center space-y-3 ultra-smooth-hover fade-in stagger-${index + 1}`}
                  >
                    <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mx-auto ultra-smooth-hover">
                      <capability.icon className="h-6 w-6 text-neutral-900" />
                    </div>
                    <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">{capability.title}</h3>
                    <p className="text-xs text-neutral-600">{capability.desc}</p>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Ultra-Smooth Quick Start */}
        <AnimatedSection animation="fadeInUp" className="border-t border-neutral-200 pt-12" id="start">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 lg:col-span-6">
              <h2 className="text-3xl font-bold text-neutral-900 uppercase tracking-tight mb-6 text-reveal">
                Ready to Start?
              </h2>
              <p className="text-neutral-600 mb-8 leading-relaxed fade-in stagger-1">
                Upload your prescription image and get comprehensive AI analysis with integrated medical knowledge in seconds.
              </p>
              <Link to="/upload-image">
                <SmoothButton variant="primary" size="lg" className="flex items-center space-x-3 ultra-smooth-hover">
                  <Upload className="h-5 w-5" />
                  <span>Upload Prescription</span>
                  <ArrowRight className="h-5 w-5" />
                </SmoothButton>
              </Link>
            </div>
            
            <AnimatedSection animation="fadeInRight" delay={400} className="col-span-12 lg:col-span-6">
              <div className="bg-neutral-50 border border-neutral-200 p-8 card">
                <h3 className="font-bold text-neutral-900 mb-6 uppercase tracking-wide">What You'll Get</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Complete Medicine Analysis', desc: 'Dosage, frequency, instructions, and safety information' },
                    { title: 'Clinical Knowledge', desc: 'Pharmacology, mechanisms, and therapeutic insights' },
                    { title: 'Safety Assessment', desc: 'Drug interactions, contraindications, and warnings' },
                    { title: 'Clinical Guidelines', desc: 'Evidence-based recommendations and best practices' }
                  ].map((item, index) => (
                    <div key={index} className={`flex items-start space-x-3 ultra-smooth-hover fade-in stagger-${index + 1}`}>
                      <div className="w-2 h-2 bg-neutral-900 mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-neutral-900 uppercase tracking-wide">{item.title}</h4>
                        <p className="text-sm text-neutral-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </AnimatedSection>
      </div>
    </PageWrapper>
  );
};

export default UploadPage;