'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaBriefcase, FaCheckCircle, FaGraduationCap, FaPlus, FaRobot, FaSpinner, FaTimes, FaTrash, FaUser } from 'react-icons/fa';
import { generateResumeContent } from '../actions/ai-actions';

const stepIcons = [
    { icon: FaUser, label: 'Personal Info' },
    { icon: FaBriefcase, label: 'Experience' },
    { icon: FaGraduationCap, label: 'Education & Skills' },
    { icon: FaRobot, label: 'AI Enhancement' }
];

export default function InputFormModal({ isOpen, onClose, resumeData, setResumeData, aiGeneratedContent, setAiGeneratedContent, onNext }) {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
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
            setCurrentStep(currentStep + 1);
        } else {
            onNext();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden"
            >
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-2xl font-bold"
                            >
                                Build Your Resume
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-blue-100 mt-1 text-sm"
                            >
                                Step {currentStep} of {totalSteps}: {stepIcons[currentStep - 1].label}
                            </motion.p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Enhanced Progress Steps */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center">
                            {stepIcons.map((step, index) => {
                                const stepNumber = index + 1;
                                const isActive = stepNumber === currentStep;
                                const isCompleted = stepNumber < currentStep;
                                const Icon = step.icon;

                                return (
                                    <motion.div
                                        key={stepNumber}
                                        className="flex flex-col items-center"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <div className={`
                                            w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                                            ${isActive ? 'bg-white text-blue-600 shadow-lg scale-110' :
                                                isCompleted ? 'bg-green-500 text-white' :
                                                    'bg-white bg-opacity-20 text-white'}
                                        `}>
                                            {isCompleted ? <FaCheckCircle /> : <Icon />}
                                        </div>
                                        <span className={`text-xs mt-2 font-medium ${isActive ? 'text-white' : 'text-blue-200'}`}>
                                            {step.label}
                                        </span>
                                        {index < stepIcons.length - 1 && (
                                            <div className={`absolute top-6 left-1/2 w-24 h-0.5 transform translate-x-6 
                                                ${isCompleted ? 'bg-green-400' : 'bg-white bg-opacity-30'}`}
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6 w-full bg-white bg-opacity-20 rounded-full h-2">
                            <motion.div
                                className="bg-white h-2 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto max-h-[60vh] bg-gradient-to-br from-gray-50 to-white">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, x: 0 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-6"
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

                {/* Enhanced Footer */}
                <div className="border-t border-gray-200 bg-white px-8 py-6">
                    <div className="flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            disabled={currentStep === 1}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
                        >
                            ← Previous
                        </button>

                        <div className="text-center">
                            <span className="text-sm text-gray-500">
                                Step {currentStep} of {totalSteps}
                            </span>
                        </div>

                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            {currentStep === totalSteps ? 'Continue to Templates →' : 'Next →'}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

function PersonalInfoStep({ personalInfo, updatePersonalInfo, targetJobTitle, setTargetJobTitle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="text-center">
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl font-bold text-gray-900 mb-2"
                >
                    Let&apos;s Start With You
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-sm"
                >
                    Tell us about yourself so we can create your perfect resume
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            value={personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="New York, NY"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            LinkedIn
                        </label>
                        <input
                            type="url"
                            value={personalInfo.linkedIn}
                            onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="https://linkedin.com/in/johndoe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Website/Portfolio
                        </label>
                        <input
                            type="url"
                            value={personalInfo.website}
                            onChange={(e) => updatePersonalInfo('website', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="https://johndoe.com"
                        />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200"
            >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Target Job Title *
                </label>
                <input
                    type="text"
                    value={targetJobTitle}
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg font-medium"
                    placeholder="Software Engineer"
                />
                <p className="text-sm text-gray-600 mt-2">
                    This helps our AI tailor your resume for the specific role  targeting
                </p>
            </motion.div>
        </motion.div>
    );
}

function WorkExperienceStep({ workExperience, addWorkExperience, updateWorkExperience, removeWorkExperience }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="text-center">
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                >
                    Your Work Experience
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600"
                >
                    Share your professional journey and accomplishments
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center"
            >
                <button
                    onClick={addWorkExperience}
                    className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <FaPlus className="text-sm" />
                    <span>Add Work Experience</span>
                </button>
            </motion.div>

            {workExperience.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-center py-16 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                >
                    <FaBriefcase className="mx-auto text-6xl text-blue-300 mb-4" />
                    <p className="text-xl text-gray-600 mb-2">No work experience added yet</p>
                    <p className="text-gray-500">Start building your professional story!</p>
                </motion.div>
            ) : (
                <div className="space-y-6">
                    {workExperience.map((exp, index) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-200"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        {index + 1}
                                    </div>
                                    <h4 className="text-xl font-semibold text-gray-900">
                                        {exp.position || 'Experience'} {exp.company && `at ${exp.company}`}
                                    </h4>
                                </div>
                                <button
                                    onClick={() => removeWorkExperience(exp.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Company *</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Company Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Position *</label>
                                    <input
                                        type="text"
                                        value={exp.position}
                                        onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Job Title"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Start Date *</label>
                                    <input
                                        type="month"
                                        value={exp.startDate}
                                        onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">End Date</label>
                                    <div className="flex items-center space-x-3">
                                        <input
                                            type="month"
                                            value={exp.endDate}
                                            onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                                            disabled={exp.current}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-100"
                                        />
                                        <label className="flex items-center space-x-2 text-sm font-medium">
                                            <input
                                                type="checkbox"
                                                checked={exp.current}
                                                onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span>Current</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">Job Description</label>
                                <textarea
                                    value={exp.description}
                                    onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    rows={4}
                                    placeholder="Describe your key responsibilities, achievements, and impact in this role..."
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

function EducationSkillsStep({ education, addEducation, updateEducation, removeEducation, skills, addSkill, updateSkill, removeSkill }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="text-center">
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                >
                    Education & Skills
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600"
                >
                    Showcase your educational background and expertise
                </motion.p>
            </div>

            {/* Education Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                        <FaGraduationCap className="mr-3 text-blue-600" />
                        Education
                    </h4>
                    <button
                        onClick={addEducation}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add Education</span>
                    </button>
                </div>

                <div className="space-y-4">
                    {education.map((edu, index) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-6 border border-green-200"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                        {index + 1}
                                    </div>
                                    <h5 className="font-semibold text-gray-900">
                                        {edu.degree || 'Education'} {edu.field && `in ${edu.field}`}
                                    </h5>
                                </div>
                                <button
                                    onClick={() => removeEducation(edu.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                                >
                                    <FaTrash />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Institution</label>
                                    <input
                                        type="text"
                                        value={edu.institution}
                                        onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="University/School Name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Degree</label>
                                    <input
                                        type="text"
                                        value={edu.degree}
                                        onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Bachelor&apos;s, Master&apos;s, PhD, etc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Field of Study</label>
                                    <input
                                        type="text"
                                        value={edu.field}
                                        onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                        placeholder="Computer Science, Business, etc."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-gray-700">Graduation Date</label>
                                    <input
                                        type="month"
                                        value={edu.graduationDate}
                                        onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Skills Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-semibold text-gray-900 flex items-center">
                        <div className="w-6 h-6 mr-3 text-purple-600">⚡</div>
                        Skills & Expertise
                    </h4>
                    <button
                        onClick={addSkill}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add Skill</span>
                    </button>
                </div>

                {skills.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center space-x-2 bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-200"
                            >
                                <input
                                    type="text"
                                    value={skill}
                                    onChange={(e) => updateSkill(index, e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                    placeholder="e.g., JavaScript, Leadership"
                                />
                                <button
                                    onClick={() => removeSkill(index)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-200"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <span className="text-4xl">🎯</span>
                        <p className="mt-2">No skills added yet. Click &quot;Add Skill&quot; to showcase your expertise!</p>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}

function AIGenerationStep({ existingResume, setExistingResume, customInstructions, setCustomInstructions, onGenerateContent, isGenerating, hasAiContent }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="text-center">
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl font-bold text-gray-900 mb-2"
                >
                    AI Content Enhancement
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600"
                >
                    Let our AI supercharge your resume with compelling content
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-xl p-6 border-2 ${hasAiContent
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
                    }`}
            >
                <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${hasAiContent
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                        }`}>
                        {hasAiContent ? '✅' : '🤖'}
                    </div>
                    <h4 className={`text-xl font-bold ${hasAiContent ? 'text-green-900' : 'text-blue-900'}`}>
                        {hasAiContent ? 'AI Content Generated!' : 'AI Enhancement Ready'}
                    </h4>
                </div>
                <p className={`text-sm leading-relaxed ${hasAiContent ? 'text-green-800' : 'text-blue-800'}`}>
                    {hasAiContent
                        ? 'Your resume has been enhanced with AI-generated content! The enhanced version will be used in your templates while preserving your original data.'
                        : 'Our advanced AI will analyze your information to create a compelling professional summary and enhance your work experience descriptions with industry-relevant keywords and impact-focused language.'
                    }
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                        <div className="w-6 h-6 mr-2 text-gray-600">📄</div>
                        Existing Resume Content (Optional)
                    </label>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Paste your current resume content to help our AI understand your writing style and professional background better.
                    </p>
                    <textarea
                        value={existingResume}
                        onChange={(e) => setExistingResume(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={8}
                        placeholder="Paste your existing resume content here..."
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                        <div className="w-6 h-6 mr-2 text-purple-600">💡</div>
                        Custom Instructions & Achievements
                    </label>

                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-xl p-4 mb-4">
                        <h4 className="text-sm font-bold text-amber-800 mb-3 flex items-center">
                            <span className="mr-2">🎯</span>
                            Pro Tips for Maximum Impact:
                        </h4>
                        <ul className="text-xs text-amber-700 space-y-2">
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Include specific metrics (%, $, #) to quantify achievements
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Mention awards, promotions, or recognition received
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Add scope details (team size, budget, project timeline)
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Include industry keywords for your target role
                            </li>
                        </ul>
                    </div>

                    <textarea
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={8}
                        placeholder="Share your key achievements and specific instructions:

• Increased team productivity by 25% through process improvements
• Managed $2M annual budget across 3 departments  
• Led team of 8 developers on critical product launch
• Received &quot;Employee of the Year&quot; award in 2023
• Focus on leadership and project management skills
• Include keywords: Agile, Scrum, stakeholder management..."
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
            >
                <button
                    onClick={onGenerateContent}
                    disabled={isGenerating}
                    className={`flex items-center justify-center space-x-3 px-8 py-4 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 ${hasAiContent
                        ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700'
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700'
                        }`}
                >
                    {isGenerating ? (
                        <>
                            <FaSpinner className="animate-spin text-xl" />
                            <span>AI is Working Its Magic...</span>
                        </>
                    ) : hasAiContent ? (
                        <>
                            <span className="text-xl">🔄</span>
                            <span>Regenerate AI Content</span>
                        </>
                    ) : (
                        <>
                            <FaRobot className="text-xl" />
                            <span>Generate AI-Enhanced Content</span>
                        </>
                    )}
                </button>
            </motion.div>
        </motion.div>
    );
} 