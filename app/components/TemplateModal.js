'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck, FaCode, FaCompress, FaCrown, FaEye, FaFont, FaGraduationCap, FaHeart, FaLayerGroup, FaPalette, FaRocket, FaSearch, FaStar, FaTimes } from 'react-icons/fa';

export default function TemplateModal({
    isOpen,
    onClose,
    onBackToForm,
    selectedTemplate,
    setSelectedTemplate,
    customization,
    setCustomization,
    onNext
}) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showCustomizationPanel, setShowCustomizationPanel] = useState(false);

    const templateCategories = {
        all: { label: 'All Templates', icon: FaLayerGroup },
        professional: { label: 'Professional', icon: FaCrown },
        creative: { label: 'Creative', icon: FaHeart },
        specialized: { label: 'Specialized', icon: FaCode }
    };

    const templates = [
        {
            id: 'modern',
            name: 'Modern',
            description: 'Clean two-column layout with accent colors perfect for tech professionals',
            category: 'professional',
            tags: ['two-column', 'modern', 'clean'],
            popular: true,
            icon: FaRocket,
            color: '#3B82F6'
        },
        {
            id: 'minimalist',
            name: 'Minimalist',
            description: 'Simple, elegant single-column design for maximum readability',
            category: 'professional',
            tags: ['simple', 'clean', 'minimal'],
            popular: true,
            icon: FaLayerGroup,
            color: '#10B981'
        },
        {
            id: 'classic',
            name: 'Classic',
            description: 'Traditional professional format trusted by recruiters',
            category: 'professional',
            tags: ['traditional', 'formal', 'corporate'],
            icon: FaCrown,
            color: '#6B7280'
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Eye-catching design for creative fields and portfolios',
            category: 'creative',
            tags: ['colorful', 'artistic', 'unique'],
            popular: true,
            icon: FaHeart,
            color: '#8B5CF6'
        },
        {
            id: 'executive',
            name: 'Executive',
            description: 'Professional layout for senior leadership roles and executives',
            category: 'professional',
            tags: ['leadership', 'executive', 'formal'],
            icon: FaCrown,
            color: '#059669'
        },
        {
            id: 'technical',
            name: 'Technical',
            description: 'Developer-focused with skills sidebar and technical sections',
            category: 'specialized',
            tags: ['technical', 'developer', 'skills'],
            popular: true,
            icon: FaCode,
            color: '#DC2626'
        },
        {
            id: 'academic',
            name: 'Academic',
            description: 'Research-oriented academic CV format for educators',
            category: 'specialized',
            tags: ['academic', 'research', 'cv'],
            icon: FaGraduationCap,
            color: '#7C2D12'
        },
        {
            id: 'compact',
            name: 'Compact',
            description: 'Maximizes information in minimal space efficiently',
            category: 'specialized',
            tags: ['compact', 'dense', 'efficient'],
            icon: FaCompress,
            color: '#BE185D'
        }
    ];

    const accentColors = [
        { color: '#3B82F6', name: 'Ocean Blue' },
        { color: '#10B981', name: 'Emerald Green' },
        { color: '#8B5CF6', name: 'Royal Purple' },
        { color: '#F59E0B', name: 'Golden Amber' },
        { color: '#EF4444', name: 'Crimson Red' },
        { color: '#06B6D4', name: 'Turquoise' },
    ];

    const fontOptions = [
        { value: 'Inter', label: 'Inter (Modern & Clean)' },
        { value: 'Roboto', label: 'Roboto (Professional)' },
        { value: 'Georgia', label: 'Georgia (Classic Serif)' },
        { value: 'Montserrat', label: 'Montserrat (Bold & Modern)' }
    ];

    // Filter templates based on search and category
    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const handleColorChange = (color) => {
        setCustomization(prev => ({ ...prev, accentColor: color }));
    };

    const handleFontChange = (font) => {
        setCustomization(prev => ({ ...prev, fontFamily: font }));
    };

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-5xl lg:max-w-6xl xl:max-w-7xl h-[85vh] sm:h-[90vh] lg:max-h-[95vh] overflow-hidden flex flex-col"
            >
                {/* Enhanced Header with Gradient - Compact on Mobile */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-2 sm:p-4 lg:p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 sm:space-x-4">
                            <div className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <FaLayerGroup className="text-sm sm:text-xl lg:text-2xl" />
                            </div>
                            <div>
                                <motion.h2
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-base sm:text-xl lg:text-2xl font-bold"
                                >
                                    Choose Your Template
                                </motion.h2>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="text-blue-100 text-xs sm:text-sm hidden sm:block"
                                >
                                    Select from our professionally designed resume templates
                                </motion.p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-1 sm:space-x-2">
                            {/* Mobile Customization Toggle */}
                            <button
                                onClick={() => setShowCustomizationPanel(!showCustomizationPanel)}
                                className="lg:hidden text-white hover:bg-white hover:bg-opacity-20 p-1.5 sm:p-2 rounded-full transition-all duration-200"
                            >
                                <FaPalette size={14} className="sm:text-base" />
                            </button>

                            <button
                                onClick={onClose}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-1.5 sm:p-3 rounded-full transition-all duration-200"
                            >
                                <FaTimes size={14} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Stats - Responsive - Hidden on Small Mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-2 sm:mt-4 lg:mt-6 hidden sm:flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8 text-blue-100"
                    >
                        <div className="flex items-center space-x-2">
                            <FaStar className="text-yellow-300" />
                            <span className="text-xs sm:text-sm">8 Premium Templates</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaEye />
                            <span className="text-xs sm:text-sm">Live Preview</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaPalette />
                            <span className="text-xs sm:text-sm">Full Customization</span>
                        </div>
                    </motion.div>
                </div>

                <div className="flex flex-col lg:flex-row flex-1 min-h-0">
                    {/* Template Selection */}
                    <div className="flex-1 flex flex-col min-h-0">
                        {/* Enhanced Search and Filter Bar - Responsive */}
                        <div className="p-2 sm:p-4 lg:p-6 border-b bg-gradient-to-r from-gray-50 to-white flex-shrink-0">
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
                                {/* Search */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="relative flex-1 min-w-0"
                                >
                                    <FaSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                                    <input
                                        type="text"
                                        placeholder="Search templates..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-8 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm text-sm sm:text-base"
                                    />
                                </motion.div>

                                {/* Category Filter - Responsive */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="flex bg-white rounded-lg sm:rounded-xl border border-gray-300 overflow-hidden shadow-sm"
                                >
                                    {Object.entries(templateCategories).map(([key, category]) => {
                                        const Icon = category.icon;
                                        const isActive = selectedCategory === key;

                                        return (
                                            <button
                                                key={key}
                                                onClick={() => setSelectedCategory(key)}
                                                className={`flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 lg:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-all duration-200 ${isActive
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <Icon className={`text-xs sm:text-sm ${isActive ? 'text-white' : 'text-gray-500'}`} />
                                                <span className="hidden sm:inline">{category.label}</span>
                                            </button>
                                        );
                                    })}
                                </motion.div>
                            </div>
                        </div>

                        {/* Enhanced Templates Grid - Responsive with proper mobile height and scroll fix */}
                        <div className="flex-1 min-h-0 overflow-y-auto bg-gradient-to-br from-gray-50 to-white">
                            <div className="p-2 sm:p-4 lg:p-8 pt-3 sm:pt-4 lg:pt-8">
                                {filteredTemplates.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-8 sm:py-16"
                                    >
                                        <div className="text-4xl sm:text-6xl mb-4">🔍</div>
                                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No templates found</h3>
                                        <p className="text-sm sm:text-base text-gray-600">Try adjusting your search or filter criteria</p>
                                    </motion.div>
                                ) : (
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6 pb-4 lg:pb-0">
                                        {filteredTemplates.map((template, index) => {
                                            const Icon = template.icon;
                                            const isSelected = selectedTemplate === template.id;

                                            return (
                                                <motion.div
                                                    key={template.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 + 0.5 }}
                                                    whileHover={{ y: -4, scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`relative bg-white border-2 rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${isSelected
                                                        ? 'border-blue-500 shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-blue-100'
                                                        : 'border-gray-200 hover:border-gray-300 hover:shadow-lg sm:hover:shadow-xl'
                                                        }`}
                                                    onClick={() => handleTemplateSelect(template.id)}
                                                >
                                                    {/* Popular Badge - Smaller on Mobile */}
                                                    {template.popular && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ delay: index * 0.1 + 0.7 }}
                                                            className="absolute top-1 sm:top-4 right-1 sm:right-4 z-10 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-1.5 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-lg flex items-center space-x-1"
                                                        >
                                                            <FaStar className="text-xs" />
                                                            <span className="hidden sm:inline">Popular</span>
                                                        </motion.div>
                                                    )}

                                                    {/* Selected Badge - Smaller on Mobile */}
                                                    {isSelected && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", duration: 0.3 }}
                                                            className="absolute top-1 sm:top-4 left-1 sm:left-4 z-10 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-1.5 sm:p-3 shadow-lg"
                                                        >
                                                            <FaCheck className="w-2.5 h-2.5 sm:w-4 sm:h-4" />
                                                        </motion.div>
                                                    )}

                                                    {/* Template Preview - More compact on mobile */}
                                                    <div className="aspect-[4/3] sm:aspect-[3/4] bg-gradient-to-br from-gray-50 to-gray-100 border-b relative overflow-hidden">
                                                        <TemplatePreview
                                                            key={`${template.id}-${customization.accentColor}-${customization.fontFamily}`}
                                                            templateId={template.id}
                                                            customization={customization}
                                                        />

                                                        {/* Overlay for better visual */}
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                                                    </div>

                                                    {/* Enhanced Template Info - Compact on Mobile */}
                                                    <div className="p-2 sm:p-4 lg:p-6">
                                                        <div className="flex items-center space-x-1.5 sm:space-x-3 mb-1.5 sm:mb-3">
                                                            <div
                                                                className="w-5 h-5 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white"
                                                                style={{ backgroundColor: template.color }}
                                                            >
                                                                <Icon className="text-xs sm:text-sm" />
                                                            </div>
                                                            <div className="min-w-0 flex-1">
                                                                <h4 className="font-bold text-gray-900 text-xs sm:text-base lg:text-lg truncate">{template.name}</h4>
                                                                <div className="text-xs text-gray-500 capitalize hidden sm:block">{template.category}</div>
                                                            </div>
                                                        </div>

                                                        <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4 leading-relaxed line-clamp-2 hidden sm:block">{template.description}</p>

                                                        {/* Enhanced Tags - Only show on larger screens */}
                                                        <div className="hidden sm:flex flex-wrap gap-1 sm:gap-2">
                                                            {template.tags.slice(0, 3).map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="inline-block bg-gray-100 text-gray-700 text-xs px-2 sm:px-3 py-1 rounded-full font-medium"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Customization Panel - Mobile Overlay/Desktop Side Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className={`
                            ${showCustomizationPanel ? 'absolute inset-0 z-20 lg:relative lg:inset-auto lg:z-auto' : 'hidden lg:block'}
                            w-full lg:w-72 xl:w-80 border-l bg-gradient-to-b from-gray-50 to-white
                                                `}
                    >
                        <div className="p-3 sm:p-4 lg:p-6 h-full overflow-y-auto">
                            {/* Mobile Panel Header */}
                            <div className="lg:hidden flex justify-between items-center mb-4 pb-4 border-b">
                                <h3 className="text-lg font-bold text-gray-900">Customize Style</h3>
                                <button
                                    onClick={() => setShowCustomizationPanel(false)}
                                    className="text-gray-500 hover:text-gray-700 p-2"
                                >
                                    <FaTimes size={16} />
                                </button>
                            </div>

                            <div className="hidden lg:flex items-center space-x-3 mb-6">
                                <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                                    <FaPalette className="text-white text-xs sm:text-sm" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Customize Style</h3>
                            </div>

                            {/* Enhanced Selected Template Info */}
                            {selectedTemplate && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 sm:mb-8 p-3 sm:p-5 bg-white rounded-lg sm:rounded-xl border border-gray-200 shadow-lg"
                                >
                                    <div className="flex items-center space-x-3 mb-3">
                                        <div
                                            className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white"
                                            style={{ backgroundColor: templates.find(t => t.id === selectedTemplate)?.color }}
                                        >
                                            {templates.find(t => t.id === selectedTemplate) &&
                                                React.createElement(templates.find(t => t.id === selectedTemplate).icon, { className: "text-xs sm:text-sm" })
                                            }
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">
                                                {templates.find(t => t.id === selectedTemplate)?.name}
                                            </h4>
                                            <p className="text-xs text-gray-600">Selected Template</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Color Customization */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-lg border border-gray-200 mb-4 sm:mb-6">
                                <h5 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
                                    <FaPalette className="mr-2 text-blue-600" />
                                    Accent Color
                                </h5>
                                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                                    {accentColors.map(({ color, name }) => (
                                        <motion.button
                                            key={color}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleColorChange(color)}
                                            className={`aspect-square rounded-lg sm:rounded-xl border-2 transition-all duration-200 ${customization.accentColor === color ? 'border-gray-900 shadow-lg' : 'border-gray-200 hover:border-gray-400'
                                                }`}
                                            style={{ backgroundColor: color }}
                                            title={name}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Font Customization */}
                            <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-5 shadow-lg border border-gray-200">
                                <h5 className="font-bold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base flex items-center">
                                    <FaFont className="mr-2 text-blue-600" />
                                    Font Family
                                </h5>
                                <select
                                    value={customization.fontFamily || 'Inter'}
                                    onChange={(e) => handleFontChange(e.target.value)}
                                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                                >
                                    {fontOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Enhanced Footer - Responsive */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-2 sm:p-4 lg:p-6 border-t bg-gradient-to-r from-gray-50 to-white space-y-2 sm:space-y-0 flex-shrink-0">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        onClick={onBackToForm}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-gray-700 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-sm sm:text-base"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back to Form</span>
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={onNext}
                        disabled={!selectedTemplate}
                        className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg sm:rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-bold shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                    >
                        <span>Continue to Preview</span>
                        <FaArrowRight className="text-sm" />
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}

function TemplatePreview({ templateId, customization }) {
    const previewStyle = {
        fontFamily: customization.fontFamily,
        color: '#000',
        fontSize: '8px',
        lineHeight: 1.2
    };

    const accentStyle = {
        color: customization.accentColor,
        borderColor: customization.accentColor
    };

    if (templateId === 'modern') {
        return (
            <div className="w-full h-full bg-white p-3 text-xs" style={previewStyle}>
                <div className="flex">
                    <div className="w-2/3 pr-2">
                        <div className="border-b-2 pb-1 mb-2" style={accentStyle}>
                            <div className="font-bold text-sm">John Doe</div>
                            <div style={accentStyle}>Software Engineer</div>
                        </div>
                        <div className="mb-2">
                            <div className="font-semibold mb-1" style={accentStyle}>EXPERIENCE</div>
                            <div className="text-xs">
                                <div className="font-medium">Senior Developer</div>
                                <div className="text-gray-600">Tech Company • 2020-Present</div>
                                <div className="text-gray-500 text-xs">Developed web applications...</div>
                            </div>
                        </div>
                    </div>
                    <div className="w-1/3 pl-2 border-l" style={accentStyle}>
                        <div className="mb-2">
                            <div className="font-semibold text-xs mb-1" style={accentStyle}>CONTACT</div>
                            <div className="text-xs text-gray-600">
                                <div>john@email.com</div>
                                <div>(555) 123-4567</div>
                            </div>
                        </div>
                        <div>
                            <div className="font-semibold text-xs mb-1" style={accentStyle}>SKILLS</div>
                            <div className="text-xs text-gray-600">
                                <div>JavaScript</div>
                                <div>React</div>
                                <div>Node.js</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'minimalist') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center border-b pb-2 mb-2">
                    <div className="font-bold text-sm">John Doe</div>
                    <div style={accentStyle}>Software Engineer</div>
                    <div className="text-xs text-gray-600">john@email.com • (555) 123-4567</div>
                </div>
                <div className="mb-2">
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>EXPERIENCE</div>
                    <div className="text-xs">
                        <div className="font-medium">Senior Developer</div>
                        <div className="text-gray-600">Tech Company • 2020-Present</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>SKILLS</div>
                    <div className="text-xs text-gray-600">JavaScript, React, Node.js</div>
                </div>
            </div>
        );
    }

    if (templateId === 'classic') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center mb-2">
                    <div className="font-bold text-sm">John Doe</div>
                    <div className="text-xs text-gray-600">john@email.com • (555) 123-4567 • City, State</div>
                </div>
                <div className="mb-2">
                    <div className="text-center font-medium" style={accentStyle}>Software Engineer</div>
                </div>
                <div className="mb-2">
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>PROFESSIONAL EXPERIENCE</div>
                    <div className="text-xs">
                        <div className="font-medium">Senior Developer</div>
                        <div className="text-gray-600">Tech Company, 2020-Present</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>SKILLS</div>
                    <div className="text-xs text-gray-600">JavaScript • React • Node.js</div>
                </div>
            </div>
        );
    }

    if (templateId === 'creative') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center mb-3 p-2 rounded" style={{ backgroundColor: `${customization.accentColor}15` }}>
                    <div className="font-bold text-sm" style={accentStyle}>John Doe</div>
                    <div className="text-xs font-medium">Creative Designer</div>
                </div>
                <div className="mb-2">
                    <div className="font-semibold text-xs mb-1 p-1 rounded" style={{ backgroundColor: `${customization.accentColor}15`, color: customization.accentColor }}>EXPERIENCE</div>
                    <div className="text-xs">
                        <div className="font-medium">Senior Designer</div>
                        <div className="text-gray-600">Creative Agency • 2020-Present</div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'executive') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center border-b-2 pb-2 mb-2" style={accentStyle}>
                    <div className="font-bold text-sm">John Doe</div>
                    <div className="text-xs font-medium" style={accentStyle}>Chief Technology Officer</div>
                    <div className="text-xs text-gray-600">john@email.com • (555) 123-4567</div>
                </div>
                <div className="mb-2">
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>EXECUTIVE SUMMARY</div>
                    <div className="text-xs text-gray-600">Technology leader with 15+ years of experience driving digital transformation and leading high-performing teams.</div>
                </div>
                <div className="mb-2">
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>CORE COMPETENCIES</div>
                    <div className="text-xs text-gray-600">Strategic Planning • Team Leadership • Digital Transformation</div>
                </div>
                <div>
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>EXPERIENCE</div>
                    <div className="text-xs">
                        <div className="font-medium">Chief Technology Officer</div>
                        <div className="text-gray-600">TechCorp Inc • 2020-Present</div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'technical') {
        return (
            <div className="w-full h-full bg-white p-3 text-xs flex" style={previewStyle}>
                <div className="w-1/3 pr-2 border-r" style={accentStyle}>
                    <div className="mb-2">
                        <div className="font-semibold text-xs mb-1" style={accentStyle}>CONTACT</div>
                        <div className="text-xs text-gray-600">
                            <div>john@dev.com</div>
                            <div>github.com/john</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs mb-1" style={accentStyle}>SKILLS</div>
                        <div className="text-xs">
                            <div className="mb-1">JavaScript</div>
                            <div className="mb-1">Python</div>
                            <div className="mb-1">React</div>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 pl-2">
                    <div className="mb-2">
                        <div className="font-bold text-sm">John Developer</div>
                        <div style={accentStyle}>Full Stack Developer</div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs mb-1" style={accentStyle}>EXPERIENCE</div>
                        <div className="text-xs">
                            <div className="font-medium">Senior Developer</div>
                            <div className="text-gray-600">Tech Corp • 2020-Present</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'academic') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center mb-3">
                    <div className="font-bold text-sm">Dr. John Smith</div>
                    <div className="text-xs">Associate Professor of Computer Science</div>
                    <div className="text-xs text-gray-600">john.smith@university.edu</div>
                </div>
                <div className="mb-2">
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>EDUCATION</div>
                    <div className="text-xs">
                        <div className="font-medium">Ph.D. Computer Science</div>
                        <div className="text-gray-600">Stanford University, 2015</div>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-xs mb-1" style={accentStyle}>RESEARCH</div>
                    <div className="text-xs text-gray-600">Machine Learning, AI</div>
                </div>
            </div>
        );
    }

    if (templateId === 'compact') {
        return (
            <div className="w-full h-full bg-white p-2 text-xs grid grid-cols-3 gap-1" style={previewStyle}>
                <div className="col-span-1">
                    <div className="mb-1">
                        <div className="font-semibold text-xs" style={accentStyle}>CONTACT</div>
                        <div className="text-xs text-gray-600">john@email.com</div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs" style={accentStyle}>SKILLS</div>
                        <div className="text-xs text-gray-600">JS, React, Node</div>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="mb-1">
                        <div className="font-bold text-sm">John Doe</div>
                        <div className="text-xs" style={accentStyle}>Software Engineer</div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs" style={accentStyle}>EXPERIENCE</div>
                        <div className="text-xs">
                            <div className="font-medium">Senior Dev</div>
                            <div className="text-gray-600">Tech Co • 2020-Now</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default preview
    return (
        <div className="w-full h-full bg-white p-3 flex items-center justify-center" style={previewStyle}>
            <div className="text-center text-gray-400">
                <div className="text-lg mb-1">📄</div>
                <div className="text-xs">Template Preview</div>
            </div>
        </div>
    );
} 