'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaDownload, FaSpinner, FaTimes } from 'react-icons/fa';
import ResumeTemplate from './templates/ResumeTemplate';

export default function PreviewModal({
    isOpen,
    onClose,
    onBackToTemplates,
    resumeData,
    aiGeneratedContent,
    selectedTemplate,
    customization
}) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    resumeData,
                    aiGeneratedContent,
                    selectedTemplate,
                    customization
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate PDF');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        } finally {
            setIsGeneratingPDF(false);
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
                className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[95vh] flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
                        <p className="text-gray-600">Template: {selectedTemplate}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGeneratingPDF ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <FaDownload />
                                    <span>Download PDF</span>
                                </>
                            )}
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>

                {/* Preview Content */}
                <div className="flex-1 overflow-y-auto bg-gray-100 p-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white shadow-lg">
                            <ResumeTemplate
                                data={resumeData}
                                aiContent={aiGeneratedContent}
                                template={selectedTemplate}
                                customization={customization}
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t bg-gray-50 flex-shrink-0">
                    <button
                        onClick={onBackToTemplates}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Back to Templates
                    </button>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isGeneratingPDF ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    <span>Generating PDF...</span>
                                </>
                            ) : (
                                <>
                                    <FaDownload />
                                    <span>Download Resume</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
} 