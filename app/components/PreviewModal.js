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
    customization,
    setCustomization
}) {
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [activeCustomTab, setActiveCustomTab] = useState('general');

    // Enhanced customization handlers
    const updateCustomization = (path, value) => {
        setCustomization(prev => {
            const updated = { ...prev };
            const keys = path.split('.');
            let current = updated;

            for (let i = 0; i < keys.length - 1; i++) {
                if (!current[keys[i]]) current[keys[i]] = {};
                current = current[keys[i]];
            }

            current[keys[keys.length - 1]] = value;
            return updated;
        });
    };

    const handleSectionReorder = (dragIndex, hoverIndex) => {
        const sections = customization.sectionOrder || ['summary', 'experience', 'education', 'skills'];
        const dragSection = sections[dragIndex];
        const newOrder = [...sections];
        newOrder.splice(dragIndex, 1);
        newOrder.splice(hoverIndex, 0, dragSection);
        updateCustomization('sectionOrder', newOrder);
    };

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

                {/* Main Content */}
                <div className="flex flex-1 min-h-0">
                    {/* Customization Panel */}
                    <div className="w-1/3 border-r bg-gray-50 overflow-y-auto">
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-4">Customize Resume</h3>

                            {/* Tab Navigation */}
                            <div className="flex space-x-1 mb-4">
                                {[
                                    { id: 'general', label: 'General' },
                                    { id: 'fonts', label: 'Fonts' },
                                    { id: 'margins', label: 'Margins' },
                                    { id: 'sections', label: 'Sections' }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveCustomTab(tab.id)}
                                        className={`px-3 py-2 text-sm rounded ${activeCustomTab === tab.id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            {/* General Tab */}
                            {activeCustomTab === 'general' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Accent Color
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'].map(color => (
                                                <button
                                                    key={color}
                                                    onClick={() => updateCustomization('accentColor', color)}
                                                    className={`w-12 h-12 rounded-lg border-2 ${customization.accentColor === color ? 'border-gray-900' : 'border-gray-200'
                                                        }`}
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                        </div>
                                        <div className="mt-2">
                                            <input
                                                type="color"
                                                value={customization.accentColor || '#3B82F6'}
                                                onChange={(e) => updateCustomization('accentColor', e.target.value)}
                                                className="w-full h-10 rounded border"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Fonts Tab */}
                            {activeCustomTab === 'fonts' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Main Font Family
                                        </label>
                                        <select
                                            value={customization.fontFamily || 'Inter'}
                                            onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                        >
                                            <option value="Inter">Inter</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Georgia">Georgia</option>
                                            <option value="Times New Roman">Times New Roman</option>
                                            <option value="Arial">Arial</option>
                                            <option value="Montserrat">Montserrat</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Header Font Size
                                        </label>
                                        <input
                                            type="range"
                                            min="16"
                                            max="36"
                                            value={customization.fontSize?.header || 24}
                                            onChange={(e) => updateCustomization('fontSize.header', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600">{customization.fontSize?.header || 24}px</span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Body Font Size
                                        </label>
                                        <input
                                            type="range"
                                            min="10"
                                            max="18"
                                            value={customization.fontSize?.body || 14}
                                            onChange={(e) => updateCustomization('fontSize.body', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600">{customization.fontSize?.body || 14}px</span>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Section Title Font Size
                                        </label>
                                        <input
                                            type="range"
                                            min="12"
                                            max="20"
                                            value={customization.fontSize?.sectionTitle || 16}
                                            onChange={(e) => updateCustomization('fontSize.sectionTitle', parseInt(e.target.value))}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600">{customization.fontSize?.sectionTitle || 16}px</span>
                                    </div>
                                </div>
                            )}

                            {/* Margins Tab */}
                            {activeCustomTab === 'margins' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Page Margins
                                        </label>
                                        <div className="grid grid-cols-2 gap-2">
                                            <div>
                                                <label className="text-xs text-gray-500">Top</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="2"
                                                    value={parseFloat(customization.margins?.top?.replace('in', '') || '0.2')}
                                                    onChange={(e) => updateCustomization('margins.top', `${e.target.value}in`)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Right</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="2"
                                                    value={parseFloat(customization.margins?.right?.replace('in', '') || '0.3')}
                                                    onChange={(e) => updateCustomization('margins.right', `${e.target.value}in`)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Bottom</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="2"
                                                    value={parseFloat(customization.margins?.bottom?.replace('in', '') || '0.2')}
                                                    onChange={(e) => updateCustomization('margins.bottom', `${e.target.value}in`)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-xs text-gray-500">Left</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    min="0"
                                                    max="2"
                                                    value={parseFloat(customization.margins?.left?.replace('in', '') || '0.3')}
                                                    onChange={(e) => updateCustomization('margins.left', `${e.target.value}in`)}
                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Values in inches</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Content Padding
                                        </label>
                                        <input
                                            type="range"
                                            min="0"
                                            max="3"
                                            step="0.1"
                                            value={customization.contentPadding || 1}
                                            onChange={(e) => updateCustomization('contentPadding', parseFloat(e.target.value))}
                                            className="w-full"
                                        />
                                        <span className="text-sm text-gray-600">{customization.contentPadding || 1}rem</span>
                                    </div>
                                </div>
                            )}

                            {/* Sections Tab */}
                            {activeCustomTab === 'sections' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Section Order
                                        </label>
                                        <DragDropSectionList
                                            sections={customization.sectionOrder || ['summary', 'experience', 'education', 'skills']}
                                            onReorder={handleSectionReorder}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Preview Content */}
                    <div className="w-2/3 overflow-y-auto bg-gray-100 p-6">
                        <div className="flex justify-center">
                            {/* PDF-sized preview container - 8.5" x 11" aspect ratio */}
                            <div
                                className="bg-white shadow-lg"
                                style={{
                                    width: '612px',  // 8.5 inches at 72 DPI
                                    minHeight: '792px', // 11 inches at 72 DPI
                                    aspectRatio: '8.5 / 11',
                                    transform: 'scale(0.8)', // Scale down to fit better in preview
                                    transformOrigin: 'top center',
                                    marginBottom: '20px'
                                }}
                            >
                                <ResumeTemplate
                                    data={resumeData}
                                    aiContent={aiGeneratedContent}
                                    template={selectedTemplate}
                                    customization={customization}
                                />
                            </div>
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

// Drag and Drop Section List Component
function DragDropSectionList({ sections, onReorder }) {
    const [draggedItem, setDraggedItem] = useState(null);

    const handleDragStart = (e, index) => {
        setDraggedItem(index);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e, dropIndex) => {
        e.preventDefault();
        if (draggedItem !== null && draggedItem !== dropIndex) {
            onReorder(draggedItem, dropIndex);
        }
        setDraggedItem(null);
    };

    const sectionLabels = {
        summary: 'Professional Summary',
        experience: 'Work Experience',
        education: 'Education',
        skills: 'Skills'
    };

    return (
        <div className="space-y-2">
            {sections.map((section, index) => (
                <div
                    key={section}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`p-3 bg-white border rounded-lg cursor-move transition-all ${draggedItem === index ? 'opacity-50' : 'hover:shadow-md'
                        }`}
                >
                    <div className="flex items-center justify-between">
                        <span className="font-medium">{sectionLabels[section] || section}</span>
                        <div className="text-gray-400">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
} 