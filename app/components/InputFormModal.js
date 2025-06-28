'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaBriefcase, FaCheckCircle, FaGraduationCap, FaRobot, FaTimes, FaUser } from 'react-icons/fa';
import { generateResumeContent } from '../actions/ai-actions';
import AIGenerationStep from './AIGenerationStep';
import EducationSkillsStep from './EducationSkillsStep';
import PersonalInfoStep from './PersonalInfoStep';
import WorkExperienceStep from './WorkExperienceStep';

const stepIcons = [
    { icon: FaUser, label: 'Personal Info' },
    { icon: FaBriefcase, label: 'Experience' },
    { icon: FaGraduationCap, label: 'Education & Skills' },
    { icon: FaRobot, label: 'AI Enhancement' }
];

export default function InputFormModal({ isOpen, onClose, resumeData, setResumeData, aiGeneratedContent, setAiGeneratedContent, onNext }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const directionRef = useRef(1); // 1 for forward, -1 for backward
    const totalSteps = 4;

    const updatePersonalInfo = (field, value) => {
        setResumeData(prev => ({
            ...prev,
            personalInfo: {
                ...prev.personalInfo,
                [field]: value
            }
        }));
    };

    const addWorkExperience = () => {
        setResumeData(prev => ({
            ...prev,
            workExperience: [
                ...prev.workExperience,
                {
                    id: Date.now(),
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: ''
                }
            ]
        }));
    };

    const updateWorkExperience = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            workExperience: prev.workExperience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        }));
    };

    const removeWorkExperience = (id) => {
        setResumeData(prev => ({
            ...prev,
            workExperience: prev.workExperience.filter(exp => exp.id !== id)
        }));
    };

    const addEducation = () => {
        setResumeData(prev => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    id: Date.now(),
                    institution: '',
                    degree: '',
                    field: '',
                    graduationDate: '',
                    gpa: ''
                }
            ]
        }));
    };

    const updateEducation = (id, field, value) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        }));
    };

    const removeEducation = (id) => {
        setResumeData(prev => ({
            ...prev,
            education: prev.education.filter(edu => edu.id !== id)
        }));
    };

    const addSkill = () => {
        setResumeData(prev => ({
            ...prev,
            skills: [...prev.skills, '']
        }));
    };

    const updateSkill = (index, value) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.map((skill, i) => i === index ? value : skill)
        }));
    };

    const removeSkill = (index) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }));
    };

    const handleGenerateContent = async () => {
        // Validate that we have the minimum required data
        if (!resumeData.targetJobTitle) {
            alert('Please enter a target job title before generating AI content.');
            return;
        }

        if (!resumeData.workExperience || resumeData.workExperience.length === 0) {
            alert('Please add at least one work experience entry before generating AI content.');
            return;
        }

        // Check that work experience entries have required fields
        const incompleteEntries = resumeData.workExperience.filter(exp =>
            !exp.position || !exp.company || !exp.startDate
        );

        if (incompleteEntries.length > 0) {
            alert('Please complete all work experience entries (position, company, and start date are required) before generating AI content.');
            return;
        }

        setIsGenerating(true);
        try {
            console.log('Original resume data before AI generation:', resumeData);
            const generatedContent = await generateResumeContent(resumeData);
            console.log('AI Generated content:', generatedContent);

            // Store AI content separately - don't modify the original form data
            setAiGeneratedContent(generatedContent);

            // Show success message
            alert('AI content generated successfully! Your original form data is preserved, and the AI-enhanced content will be used in your resume templates.');
        } catch (error) {
            console.error('Error generating content:', error);
            alert(`AI Generation Error: ${error.message}\n\nPlease check your work experience entries and try again, or contact support if the issue persists.`);
        } finally {
            setIsGenerating(false);
        }
    };

    const handleNext = () => {
        if (currentStep < totalSteps) {
            directionRef.current = 1; // Going forward
            setCurrentStep(currentStep + 1);
        } else {
            onNext();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            directionRef.current = -1; // Going backward
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden"
            >
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-3 sm:p-4 lg:p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-lg sm:text-xl lg:text-2xl font-bold"
                            >
                                Build Your Resume
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-blue-100 mt-1 text-xs sm:text-sm"
                            >
                                Step {currentStep} of {totalSteps}: {stepIcons[currentStep - 1].label}
                            </motion.p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
                        >
                            <FaTimes size={16} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Enhanced Progress Steps - Responsive */}
                    <div className="mt-4 sm:mt-6">
                        {/* Mobile Progress Steps - Vertical */}
                        <div className="block sm:hidden">
                            <div className="flex items-center justify-between mb-4">
                                {stepIcons.map((step, index) => {
                                    const stepNumber = index + 1;
                                    const isActive = stepNumber === currentStep;
                                    const isCompleted = stepNumber < currentStep;
                                    const Icon = step.icon;

                                    return (
                                        <motion.div
                                            key={stepNumber}
                                            className="flex flex-col items-center relative"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className={`
                                                w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs
                                                ${isActive ? 'bg-white text-blue-600 shadow-lg scale-110' :
                                                    isCompleted ? 'bg-green-500 text-white' :
                                                        'bg-white bg-opacity-20 text-gray-400'}
                                            `}>
                                                {isCompleted ? <FaCheckCircle /> : <Icon />}
                                            </div>
                                            <span className={`text-xs mt-1 font-medium text-center ${isActive ? 'text-white' : 'text-blue-200'}`}>
                                                {step.label.split(' ')[0]}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Desktop Progress Steps - Horizontal */}
                        <div className="hidden sm:block">
                            <div className="flex justify-between items-center relative">
                                {stepIcons.map((step, index) => {
                                    const stepNumber = index + 1;
                                    const isActive = stepNumber === currentStep;
                                    const isCompleted = stepNumber < currentStep;
                                    const Icon = step.icon;

                                    return (
                                        <motion.div
                                            key={stepNumber}
                                            className="flex flex-col items-center relative z-10"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <div className={`
                                                w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300
                                                ${isActive ? 'bg-white text-blue-600 shadow-lg scale-110' :
                                                    isCompleted ? 'bg-green-500 text-white' :
                                                        'bg-white bg-opacity-20 text-gray-400'}
                                            `}>
                                                {isCompleted ? <FaCheckCircle /> : <Icon />}
                                            </div>
                                            <span className={`text-xs mt-2 font-medium text-center ${isActive ? 'text-white' : 'text-blue-200'}`}>
                                                {step.label}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-4 sm:mt-6 w-full bg-white bg-opacity-30 rounded-full h-2 sm:h-3 shadow-inner">
                            <motion.div
                                key={`progress-${currentStep}`}
                                className="bg-gradient-to-r from-green-400 to-green-500 h-2 sm:h-3 rounded-full shadow-sm"
                                initial={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto max-h-[50vh] sm:max-h-[55vh] lg:max-h-[60vh] bg-gradient-to-br from-gray-50 to-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{
                                opacity: 0,
                                x: directionRef.current * 50
                            }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{
                                opacity: 0,
                                x: directionRef.current * -50
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="p-3 sm:p-4 lg:p-6"
                        >
                            {currentStep === 1 && (
                                <PersonalInfoStep
                                    personalInfo={resumeData.personalInfo}
                                    updatePersonalInfo={updatePersonalInfo}
                                    targetJobTitle={resumeData.targetJobTitle}
                                    setTargetJobTitle={(value) => setResumeData(prev => ({ ...prev, targetJobTitle: value }))}
                                />
                            )}
                            {currentStep === 2 && (
                                <WorkExperienceStep
                                    workExperience={resumeData.workExperience}
                                    addWorkExperience={addWorkExperience}
                                    updateWorkExperience={updateWorkExperience}
                                    removeWorkExperience={removeWorkExperience}
                                />
                            )}
                            {currentStep === 3 && (
                                <EducationSkillsStep
                                    education={resumeData.education}
                                    addEducation={addEducation}
                                    updateEducation={updateEducation}
                                    removeEducation={removeEducation}
                                    skills={resumeData.skills}
                                    addSkill={addSkill}
                                    updateSkill={updateSkill}
                                    removeSkill={removeSkill}
                                />
                            )}
                            {currentStep === 4 && (
                                <AIGenerationStep
                                    existingResume={resumeData.existingResume}
                                    setExistingResume={(value) => setResumeData(prev => ({ ...prev, existingResume: value }))}
                                    customInstructions={resumeData.customInstructions}
                                    setCustomInstructions={(value) => setResumeData(prev => ({ ...prev, customInstructions: value }))}
                                    onGenerateContent={handleGenerateContent}
                                    isGenerating={isGenerating}
                                    hasAiContent={!!aiGeneratedContent}
                                />
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Enhanced Footer - Responsive */}
                <div className="border-t border-gray-200 bg-white px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm sm:text-base"
                        >
                            ← Previous
                        </button>

                        <div className="text-center order-first sm:order-none">
                            <span className="text-xs sm:text-sm text-gray-500">
                                Step {currentStep} of {totalSteps}
                            </span>
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-full sm:w-auto px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                        >
                            {currentStep === totalSteps ? 'Continue to Templates →' : 'Next →'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
} 