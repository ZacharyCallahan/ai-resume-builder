'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaPlus, FaSpinner, FaTimes, FaTrash } from 'react-icons/fa';
import { generateResumeContent } from '../actions/ai-actions';

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Build Your Resume - Step {currentStep} of {totalSteps}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-4 bg-gray-50">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[60vh]">
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
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t bg-gray-50">
                    <button
                        onClick={handlePrevious}
                        disabled={currentStep === 1}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        {currentStep === totalSteps ? 'Continue to Templates' : 'Next'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function PersonalInfoStep({ personalInfo, updatePersonalInfo, targetJobTitle, setTargetJobTitle }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                    </label>
                    <input
                        type="text"
                        value={personalInfo.fullName}
                        onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="John Doe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email *
                    </label>
                    <input
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="john@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                    </label>
                    <input
                        type="tel"
                        value={personalInfo.phone}
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="(555) 123-4567"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        value={personalInfo.location}
                        onChange={(e) => updatePersonalInfo('location', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="New York, NY"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        LinkedIn
                    </label>
                    <input
                        type="url"
                        value={personalInfo.linkedIn}
                        onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://linkedin.com/in/johndoe"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Website/Portfolio
                    </label>
                    <input
                        type="url"
                        value={personalInfo.website}
                        onChange={(e) => updatePersonalInfo('website', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="https://johndoe.com"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Job Title *
                </label>
                <input
                    type="text"
                    value={targetJobTitle}
                    onChange={(e) => setTargetJobTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Software Engineer"
                />
            </div>
        </div>
    );
}

function WorkExperienceStep({ workExperience, addWorkExperience, updateWorkExperience, removeWorkExperience }) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Work Experience</h3>
                <button
                    onClick={addWorkExperience}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    <FaPlus className="text-sm" />
                    <span>Add Experience</span>
                </button>
            </div>

            {workExperience.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                    <p>No work experience added yet. Click "Add Experience" to get started.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {workExperience.map((exp) => (
                        <div key={exp.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-4">
                                <h4 className="font-medium text-gray-900">Experience #{workExperience.indexOf(exp) + 1}</h4>
                                <button
                                    onClick={() => removeWorkExperience(exp.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <input
                                    type="text"
                                    value={exp.company}
                                    onChange={(e) => updateWorkExperience(exp.id, 'company', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Company Name"
                                />

                                <input
                                    type="text"
                                    value={exp.position}
                                    onChange={(e) => updateWorkExperience(exp.id, 'position', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Job Title"
                                />

                                <input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) => updateWorkExperience(exp.id, 'startDate', e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="month"
                                        value={exp.endDate}
                                        onChange={(e) => updateWorkExperience(exp.id, 'endDate', e.target.value)}
                                        disabled={exp.current}
                                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                    />
                                    <label className="flex items-center text-sm">
                                        <input
                                            type="checkbox"
                                            checked={exp.current}
                                            onChange={(e) => updateWorkExperience(exp.id, 'current', e.target.checked)}
                                            className="mr-1"
                                        />
                                        Current
                                    </label>
                                </div>
                            </div>

                            <textarea
                                value={exp.description}
                                onChange={(e) => updateWorkExperience(exp.id, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                placeholder="Describe your responsibilities and achievements..."
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function EducationSkillsStep({ education, addEducation, updateEducation, removeEducation, skills, addSkill, updateSkill, removeSkill }) {
    return (
        <div className="space-y-8">
            {/* Education Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Education</h3>
                    <button
                        onClick={addEducation}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add Education</span>
                    </button>
                </div>

                {education.map((edu) => (
                    <div key={edu.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium text-gray-900">Education #{education.indexOf(edu) + 1}</h4>
                            <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Institution Name"
                            />

                            <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Degree (e.g., Bachelor's)"
                            />

                            <input
                                type="text"
                                value={edu.field}
                                onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Field of Study"
                            />

                            <input
                                type="month"
                                value={edu.graduationDate}
                                onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Skills Section */}
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold">Skills</h3>
                    <button
                        onClick={addSkill}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        <FaPlus className="text-sm" />
                        <span>Add Skill</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {skills.map((skill, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={skill}
                                onChange={(e) => updateSkill(index, e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., JavaScript"
                            />
                            <button
                                onClick={() => removeSkill(index)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function AIGenerationStep({ existingResume, setExistingResume, customInstructions, setCustomInstructions, onGenerateContent, isGenerating, hasAiContent }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold">AI Content Generation</h3>

            <div className={`border rounded-lg p-4 ${hasAiContent ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                <h4 className={`font-medium mb-2 ${hasAiContent ? 'text-green-900' : 'text-blue-900'}`}>
                    {hasAiContent ? '✅ AI Content Generated!' : '✨ AI Enhancement'}
                </h4>
                <p className={`text-sm ${hasAiContent ? 'text-green-800' : 'text-blue-800'}`}>
                    {hasAiContent
                        ? 'AI content has been generated successfully! Your original form data is preserved, and the enhanced content will be used in your resume templates.'
                        : 'Our AI will analyze your information and generate a professional summary and enhance your work experience descriptions.'
                    }
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Existing Resume Content (Optional)
                    </label>
                    <p className="text-sm text-gray-600 mb-3">
                        Paste your existing resume content here to help our AI understand your background better.
                    </p>
                    <textarea
                        value={existingResume}
                        onChange={(e) => setExistingResume(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={8}
                        placeholder="Paste your existing resume content here..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Instructions & Additional Information
                    </label>
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-3">
                        <h4 className="text-sm font-medium text-amber-800 mb-2">💡 Pro Tips for Better Results:</h4>
                        <ul className="text-xs text-amber-700 space-y-1">
                            <li>• Include specific numbers, percentages, or dollar amounts you achieved</li>
                            <li>• Mention awards, recognition, or promotions you received</li>
                            <li>• Describe the scope of your work (team size, budget, timeframe)</li>
                            <li>• Add industry-specific keywords relevant to your target role</li>
                            <li>• Note any special projects or initiatives you led</li>
                        </ul>
                    </div>
                    <textarea
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={8}
                        placeholder="Examples:
• Increased team productivity by 25% through process improvements
• Managed $2M annual budget across 3 departments  
• Led team of 8 developers on critical product launch
• Received 'Employee of the Year' award in 2023
• Focus on leadership and project management skills
• Include keywords: Agile, Scrum, stakeholder management..."
                    />
                </div>
            </div>

            <button
                onClick={onGenerateContent}
                disabled={isGenerating}
                className={`w-full flex items-center justify-center space-x-2 px-6 py-3 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${hasAiContent
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                    }`}
            >
                {isGenerating ? (
                    <>
                        <FaSpinner className="animate-spin" />
                        <span>Generating AI Content...</span>
                    </>
                ) : hasAiContent ? (
                    <>
                        <span>🔄</span>
                        <span>Regenerate AI Content</span>
                    </>
                ) : (
                    <>
                        <span>🤖</span>
                        <span>Generate AI Content</span>
                    </>
                )}
            </button>
        </div>
    );
} 