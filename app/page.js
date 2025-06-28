'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import InputFormModal from './components/InputFormModal';
import PreviewModal from './components/PreviewModal';
import PricingModal from './components/PricingModal';
import TemplateModal from './components/TemplateModal';

export default function Home() {
  const [activeModal, setActiveModal] = useState(null);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedIn: '',
      website: ''
    },
    targetJobTitle: '',
    professionalSummary: '',
    workExperience: [],
    education: [],
    skills: [],
    existingResume: '',
    customInstructions: ''
  });

  const [aiGeneratedContent, setAiGeneratedContent] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [customization, setCustomization] = useState({
    accentColor: '#3B82F6',
    fontFamily: 'Inter',
    sectionOrder: ['summary', 'experience', 'education', 'skills']
  });

  const openModal = (modalName) => {
    setActiveModal(modalName);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setActiveModal(null);
    document.body.style.overflow = 'unset';
  };

  const handleGetStarted = () => {
    openModal('input');
  };

  const handleTemplateSelect = () => {
    closeModal();
    openModal('template');
  };

  const handlePreview = () => {
    closeModal();
    openModal('preview');
  };

  const handleBackToForm = () => {
    closeModal();
    openModal('input');
  };

  const handleBackToTemplates = () => {
    closeModal();
    openModal('template');
  };

  const handlePricing = () => {
    openModal('pricing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header onPricing={handlePricing} />

      <main>
        <HeroSection onGetStarted={handleGetStarted} />

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Create professional resumes in minutes with AI assistance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🤖"
              title="AI-Powered Content"
              description="Generate compelling professional summaries and optimize your work experience with AI"
            />
            <FeatureCard
              icon="🎨"
              title="Beautiful Templates"
              description="Choose from modern, professional templates designed to make you stand out"
            />
            <FeatureCard
              icon="📱"
              title="Live Preview"
              description="See your resume in real-time as you make changes and customize"
            />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                Three simple steps to your perfect resume
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StepCard
                step="1"
                title="Enter Your Information"
                description="Provide your work experience, skills, and career goals"
              />
              <StepCard
                step="2"
                title="Choose a Template"
                description="Select from our collection of professional templates"
              />
              <StepCard
                step="3"
                title="Download Your Resume"
                description="Get your polished resume as a PDF ready to send"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {activeModal === 'input' && (
          <InputFormModal
            isOpen={true}
            onClose={closeModal}
            resumeData={resumeData}
            setResumeData={setResumeData}
            aiGeneratedContent={aiGeneratedContent}
            setAiGeneratedContent={setAiGeneratedContent}
            onNext={handleTemplateSelect}
          />
        )}

        {activeModal === 'template' && (
          <TemplateModal
            isOpen={true}
            onClose={closeModal}
            onBackToForm={handleBackToForm}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
            customization={customization}
            setCustomization={setCustomization}
            onNext={handlePreview}
          />
        )}

        {activeModal === 'preview' && (
          <PreviewModal
            isOpen={true}
            onClose={closeModal}
            onBackToTemplates={handleBackToTemplates}
            resumeData={resumeData}
            aiGeneratedContent={aiGeneratedContent}
            selectedTemplate={selectedTemplate}
            customization={customization}
            setCustomization={setCustomization}
          />
        )}

        {activeModal === 'pricing' && (
          <PricingModal
            isOpen={true}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">AI Resume Builder</h3>
            <p className="text-gray-400">
              Create professional resumes with AI assistance
            </p>
            <div className="mt-8 text-gray-500 text-sm">
              © 2024 AI Resume Builder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="text-center p-6 bg-white rounded-lg shadow-lg"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function StepCard({ step, title, description }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-4">
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
