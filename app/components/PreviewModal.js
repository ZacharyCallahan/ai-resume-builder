'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaArrowLeft, FaDownload, FaEye, FaFileAlt, FaFont, FaList, FaMagic, FaPalette, FaRulerCombined, FaSpinner, FaTimes } from 'react-icons/fa';
import ResumeTemplate from './templates/ResumeTemplate';

const customizationTabs = [
    { id: 'general', label: 'General', icon: FaPalette },
    { id: 'fonts', label: 'Fonts', icon: FaFont },
    { id: 'margins', label: 'Margins', icon: FaRulerCombined },
    { id: 'sections', label: 'Sections', icon: FaList }
];

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

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] flex flex-col overflow-hidden"
            >
                {/* Enhanced Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <FaEye className="text-2xl" />
                            </div>
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-2xl font-bold"
                                >
                                    Resume Preview
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-blue-100 flex items-center space-x-2 text-sm"
                                >
                                    <FaFileAlt className="text-sm" />
                                    <span>Template: {selectedTemplate?.charAt(0).toUpperCase() + selectedTemplate?.slice(1)}</span>
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <motion.button
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 }}
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPDF}
                                className="flex items-center space-x-3 px-6 py-3 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-xl hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-lg"
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
                            </motion.button>
                            <button
                                onClick={onClose}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-all duration-200"
                            >
                                <FaTimes size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-1 min-h-0">
                    {/* Enhanced Customization Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="w-1/3 border-r bg-gradient-to-br from-gray-50 to-white overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <FaMagic className="text-white text-sm" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Customize Resume</h3>
                            </div>

                            {/* Enhanced Tab Navigation */}
                            <div className="grid grid-cols-2 gap-2 mb-6">
                                {customizationTabs.map(tab => {
                                    const Icon = tab.icon;
                                    const isActive = activeCustomTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveCustomTab(tab.id)}
                                            className={`flex items-center space-x-2 px-4 py-3 text-sm rounded-xl transition-all duration-200 font-medium ${isActive
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className={`text-sm ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Tab Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCustomTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* General Tab */}
                                    {activeCustomTab === 'general' && (
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                                                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
                                                    <FaPalette className="mr-2 text-blue-600" />
                                                    Accent Color
                                                </label>

                                                {/* Color Presets */}
                                                <div className="grid grid-cols-3 gap-3 mb-4">
                                                    {['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'].map(color => (
                                                        <motion.button
                                                            key={color}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => updateCustomization('accentColor', color)}
                                                            className={`w-12 h-12 rounded-xl border-2 transition-all duration-200 ${customization.accentColor === color ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                                                                }`}
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Custom Color Picker */}
                                                <div className="space-y-2">
                                                    <label className="text-xs font-medium text-gray-600">Custom Color</label>
                                                    <input
                                                        type="color"
                                                        value={customization.accentColor || '#3B82F6'}
                                                        onChange={(e) => updateCustomization('accentColor', e.target.value)}
                                                        className="w-full h-12 rounded-xl border border-gray-300 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Fonts Tab */}
                                    {activeCustomTab === 'fonts' && (
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                                                            <FaFont className="mr-2 text-blue-600" />
                                                            Font Family
                                                        </label>
                                                        <select
                                                            value={customization.fontFamily || 'Inter'}
                                                            onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                        >
                                                            <option value="Inter">Inter</option>
                                                            <option value="Roboto">Roboto</option>
                                                            <option value="Georgia">Georgia</option>
                                                            <option value="Times New Roman">Times New Roman</option>
                                                            <option value="Arial">Arial</option>
                                                            <option value="Montserrat">Montserrat</option>
                                                        </select>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Header Font Size
                                                            </label>
                                                            <input
                                                                type="range"
                                                                min="16"
                                                                max="36"
                                                                value={customization.fontSize?.header || 24}
                                                                onChange={(e) => updateCustomization('fontSize.header', parseInt(e.target.value))}
                                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                            />
                                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                                <span>16px</span>
                                                                <span className="font-semibold text-blue-600">{customization.fontSize?.header || 24}px</span>
                                                                <span>36px</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Body Font Size
                                                            </label>
                                                            <input
                                                                type="range"
                                                                min="10"
                                                                max="18"
                                                                value={customization.fontSize?.body || 14}
                                                                onChange={(e) => updateCustomization('fontSize.body', parseInt(e.target.value))}
                                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                            />
                                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                                <span>10px</span>
                                                                <span className="font-semibold text-blue-600">{customization.fontSize?.body || 14}px</span>
                                                                <span>18px</span>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                                Section Title Font Size
                                                            </label>
                                                            <input
                                                                type="range"
                                                                min="12"
                                                                max="20"
                                                                value={customization.fontSize?.sectionTitle || 16}
                                                                onChange={(e) => updateCustomization('fontSize.sectionTitle', parseInt(e.target.value))}
                                                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                            />
                                                            <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                                <span>12px</span>
                                                                <span className="font-semibold text-blue-600">{customization.fontSize?.sectionTitle || 16}px</span>
                                                                <span>20px</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Margins Tab */}
                                    {activeCustomTab === 'margins' && (
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
                                                            <FaRulerCombined className="mr-2 text-blue-600" />
                                                            Page Margins
                                                        </label>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-semibold text-gray-600">Top (inches)</label>
                                                                <input
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    max="2"
                                                                    value={parseFloat(customization.margins?.top?.replace('in', '') || '0.2')}
                                                                    onChange={(e) => updateCustomization('margins.top', `${e.target.value}in`)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-semibold text-gray-600">Right (inches)</label>
                                                                <input
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    max="2"
                                                                    value={parseFloat(customization.margins?.right?.replace('in', '') || '0.3')}
                                                                    onChange={(e) => updateCustomization('margins.right', `${e.target.value}in`)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-semibold text-gray-600">Bottom (inches)</label>
                                                                <input
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    max="2"
                                                                    value={parseFloat(customization.margins?.bottom?.replace('in', '') || '0.2')}
                                                                    onChange={(e) => updateCustomization('margins.bottom', `${e.target.value}in`)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-semibold text-gray-600">Left (inches)</label>
                                                                <input
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    max="2"
                                                                    value={parseFloat(customization.margins?.left?.replace('in', '') || '0.3')}
                                                                    onChange={(e) => updateCustomization('margins.left', `${e.target.value}in`)}
                                                                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Content Padding
                                                        </label>
                                                        <input
                                                            type="range"
                                                            min="0"
                                                            max="3"
                                                            step="0.1"
                                                            value={customization.contentPadding || 1}
                                                            onChange={(e) => updateCustomization('contentPadding', parseFloat(e.target.value))}
                                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                                        />
                                                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                            <span>0rem</span>
                                                            <span className="font-semibold text-blue-600">{customization.contentPadding || 1}rem</span>
                                                            <span>3rem</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Sections Tab */}
                                    {activeCustomTab === 'sections' && (
                                        <div className="space-y-6">
                                            <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-200">
                                                <label className="block text-sm font-bold text-gray-700 mb-4 flex items-center">
                                                    <FaList className="mr-2 text-blue-600" />
                                                    Section Order
                                                </label>
                                                <DragDropSectionList
                                                    sections={customization.sectionOrder || ['summary', 'experience', 'education', 'skills']}
                                                    onReorder={handleSectionReorder}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* Enhanced Preview Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-2/3 overflow-y-auto bg-gradient-to-br from-gray-100 to-gray-200 p-8"
                    >
                        <div className="flex justify-center">
                            {/* PDF-sized preview container - 8.5" x 11" aspect ratio */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="bg-white shadow-2xl rounded-lg overflow-hidden"
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
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                {/* Enhanced Footer */}
                <div className="flex justify-between items-center p-6 border-t bg-gradient-to-r from-gray-50 to-white">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        onClick={onBackToTemplates}
                        className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                    >
                        <FaArrowLeft />
                        <span>Back to Templates</span>
                    </motion.button>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex space-x-4"
                    >
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="flex items-center space-x-3 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105"
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
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Enhanced Drag and Drop Section List Component
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

    const sectionIcons = {
        summary: '📝',
        experience: '💼',
        education: '🎓',
        skills: '⚡'
    };

    return (
        <div className="space-y-3">
            <p className="text-xs text-gray-600 mb-3">Drag and drop to reorder sections</p>
            {sections.map((section, index) => (
                <motion.div
                    key={section}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, index)}
                    className={`flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl cursor-move hover:shadow-lg transition-all duration-200 ${draggedItem === index ? 'opacity-50 transform rotate-2' : ''
                        }`}
                >
                    <div className="flex items-center space-x-3 flex-1">
                        <span className="text-2xl">{sectionIcons[section]}</span>
                        <div>
                            <span className="font-semibold text-gray-900">
                                {sectionLabels[section] || section}
                            </span>
                            <div className="text-xs text-gray-600">
                                Position {index + 1}
                            </div>
                        </div>
                    </div>
                    <div className="text-gray-400">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                    </div>
                </motion.div>
            ))}
        </div>
    );
} 