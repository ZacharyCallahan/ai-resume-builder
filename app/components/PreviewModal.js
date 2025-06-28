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
    const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);

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
            className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[98vh] sm:max-h-[95vh] flex flex-col overflow-hidden"
            >
                {/* Enhanced Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-3 sm:p-4 lg:p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <FaEye className="text-lg sm:text-2xl" />
                            </div>
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-lg sm:text-xl lg:text-2xl font-bold"
                                >
                                    Resume Preview
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-blue-100 flex items-center space-x-2 text-xs sm:text-sm"
                                >
                                    <FaFileAlt className="text-xs sm:text-sm" />
                                    <span>Template: {selectedTemplate?.charAt(0).toUpperCase() + selectedTemplate?.slice(1)}</span>
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            {/* Mobile Customization Toggle */}
                            <button
                                onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
                                className="lg:hidden text-white hover:text-black hover:bg-white hover:bg-opacity-20 p-2 sm:p-3 rounded-full transition-all duration-200"
                            >
                                <FaMagic size={16} className="sm:w-5 sm:h-5" />
                            </button>

                            <button
                                onClick={onClose}
                                className="text-white hover:text-black hover:bg-white hover:bg-opacity-20 p-2 sm:p-3 rounded-full transition-all duration-200"
                            >
                                <FaTimes size={16} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Action Buttons */}
                    <div className="lg:hidden mt-4 flex space-x-2">
                        <button
                            onClick={onBackToTemplates}
                            className="flex-1 flex items-center justify-center space-x-2 text-black bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-2 rounded-lg transition-all duration-200 text-sm"
                        >
                            <FaArrowLeft className="text-xs" />
                            <span>Templates</span>
                        </button>
                        <button
                            onClick={handleDownloadPDF}
                            disabled={isGeneratingPDF}
                            className="flex-1 flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 px-3 py-2 rounded-lg transition-all duration-200 text-sm disabled:opacity-50"
                        >
                            {isGeneratingPDF ? <FaSpinner className="animate-spin text-xs" /> : <FaDownload className="text-xs" />}
                            <span>{isGeneratingPDF ? 'Generating...' : 'Download'}</span>
                        </button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                    {/* Enhanced Customization Panel - Mobile Overlay/Desktop Side Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`
                            ${showCustomizationPanel ? 'absolute inset-0 z-20 lg:relative lg:inset-auto lg:z-auto' : 'hidden lg:block'}
                            w-full lg:w-80 xl:w-96 border-r bg-gradient-to-br from-gray-50 to-white overflow-y-auto
                        `}
                    >
                        <div className="p-3 sm:p-4 lg:p-6">
                            {/* Mobile Panel Header */}
                            <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b">
                                <h3 className="text-lg font-bold text-gray-900">Customize Resume</h3>
                                <button
                                    onClick={() => setShowCustomizationPanel(false)}
                                    className="text-gray-500 hover:text-gray-700 p-2"
                                >
                                    <FaTimes size={16} />
                                </button>
                            </div>

                            <div className="hidden lg:flex items-center space-x-3 mb-6">
                                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <FaMagic className="text-white text-xs sm:text-sm" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Customize Resume</h3>
                            </div>

                            {/* Enhanced Tab Navigation - Responsive */}
                            <div className="grid grid-cols-2 lg:grid-cols-2 gap-2 mb-4 sm:mb-6">
                                {customizationTabs.map(tab => {
                                    const Icon = tab.icon;
                                    const isActive = activeCustomTab === tab.id;

                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveCustomTab(tab.id)}
                                            className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm rounded-lg sm:rounded-xl transition-all duration-200 font-medium ${isActive
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            <Icon className={`text-xs sm:text-sm ${isActive ? 'text-white' : 'text-gray-600'}`} />
                                            <span className="hidden sm:inline">{tab.label}</span>
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
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-lg border border-gray-200">
                                                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center">
                                                    <FaPalette className="mr-2 text-blue-600" />
                                                    Accent Color
                                                </label>

                                                {/* Color Presets - Responsive Grid */}
                                                <div className="grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
                                                    {['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'].map(color => (
                                                        <motion.button
                                                            key={color}
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => updateCustomization('accentColor', color)}
                                                            className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${customization.accentColor === color ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
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
                                                        className="w-full h-8 sm:h-12 rounded-lg sm:rounded-xl border border-gray-300 cursor-pointer"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Fonts Tab */}
                                    {activeCustomTab === 'fonts' && (
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-lg border border-gray-200">
                                                <div className="space-y-4 sm:space-y-6">
                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-2 sm:mb-3 flex items-center">
                                                            <FaFont className="mr-2 text-blue-600" />
                                                            Font Family
                                                        </label>
                                                        <select
                                                            value={customization.fontFamily || 'Inter'}
                                                            onChange={(e) => updateCustomization('fontFamily', e.target.value)}
                                                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                                        >
                                                            <option value="Inter">Inter</option>
                                                            <option value="Roboto">Roboto</option>
                                                            <option value="Georgia">Georgia</option>
                                                            <option value="Times New Roman">Times New Roman</option>
                                                            <option value="Arial">Arial</option>
                                                            <option value="Montserrat">Montserrat</option>
                                                        </select>
                                                    </div>

                                                    <div className="space-y-3 sm:space-y-4">
                                                        <div>
                                                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
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
                                                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
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
                                                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
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
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-lg border border-gray-200">
                                                <div className="space-y-4 sm:space-y-6">
                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center">
                                                            <FaRulerCombined className="mr-2 text-blue-600" />
                                                            Page Margins
                                                        </label>
                                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                                            <div className="space-y-2">
                                                                <label className="text-xs font-semibold text-gray-600">Top (inches)</label>
                                                                <input
                                                                    type="number"
                                                                    step="0.1"
                                                                    min="0"
                                                                    max="2"
                                                                    value={parseFloat(customization.margins?.top?.replace('in', '') || '0.2')}
                                                                    onChange={(e) => updateCustomization('margins.top', `${e.target.value}in`)}
                                                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
                                                                    className="w-full px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-lg sm:rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2">
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
                                        <div className="space-y-4 sm:space-y-6">
                                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-lg border border-gray-200">
                                                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-3 sm:mb-4 flex items-center">
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

                    {/* Resume Preview Area */}
                    <div className="flex-1 flex flex-col bg-gray-100">
                        {/* Desktop Action Bar */}
                        <div className="hidden lg:flex justify-between items-center p-4 bg-white border-b">
                            <button
                                onClick={onBackToTemplates}
                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200"
                            >
                                <FaArrowLeft />
                                <span>Back to Templates</span>
                            </button>
                            <button
                                onClick={handleDownloadPDF}
                                disabled={isGeneratingPDF}
                                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50"
                            >
                                {isGeneratingPDF ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                                <span>{isGeneratingPDF ? 'Generating PDF...' : 'Download PDF'}</span>
                            </button>
                        </div>

                        {/* Resume Preview - Mobile Optimized */}
                        <div className="flex-1 overflow-auto p-1 sm:p-4 lg:p-8">
                            <div className="w-full max-w-sm sm:max-w-lg lg:max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden transform scale-90 sm:scale-95 lg:scale-100 origin-top">
                                <ResumeTemplate
                                    data={aiGeneratedContent || resumeData}
                                    selectedTemplate={selectedTemplate}
                                    customization={customization}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
} 