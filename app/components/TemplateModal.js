'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

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
    const templates = [
        {
            id: 'modern',
            name: 'Modern',
            description: 'Clean two-column layout with accent colors',
            preview: '/templates/modern-preview.jpg'
        },
        {
            id: 'minimalist',
            name: 'Minimalist',
            description: 'Simple, elegant single-column design',
            preview: '/templates/minimalist-preview.jpg'
        },
        {
            id: 'classic',
            name: 'Classic',
            description: 'Traditional professional format',
            preview: '/templates/classic-preview.jpg'
        },
        {
            id: 'creative',
            name: 'Creative',
            description: 'Eye-catching design for creative fields',
            preview: '/templates/creative-preview.jpg'
        }
    ];

    const accentColors = [
        '#3B82F6', // Blue
        '#10B981', // Green
        '#8B5CF6', // Purple
        '#F59E0B', // Amber
        '#EF4444', // Red
        '#06B6D4', // Cyan
    ];

    const fontOptions = [
        { value: 'Inter', label: 'Inter (Modern)' },
        { value: 'Roboto', label: 'Roboto (Clean)' },
        { value: 'Georgia', label: 'Georgia (Classic)' },
        { value: 'Montserrat', label: 'Montserrat (Bold)' }
    ];

    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId);
    };

    const handleColorChange = (color) => {
        setCustomization(prev => ({ ...prev, accentColor: color }));
    };

    const handleFontChange = (font) => {
        setCustomization(prev => ({ ...prev, fontFamily: font }));
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
                className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b flex-shrink-0">
                    <h2 className="text-2xl font-bold text-gray-900">Choose Your Template</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="flex flex-1 min-h-0">
                    {/* Template Selection */}
                    <div className="w-2/3 p-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-4">Select a Template</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {templates.map((template) => (
                                <motion.div
                                    key={template.id}
                                    whileHover={{ scale: 1.02 }}
                                    className={`relative border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedTemplate === template.id
                                        ? 'border-blue-500 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                    onClick={() => handleTemplateSelect(template.id)}
                                >
                                    {/* Template Preview */}
                                    <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center">
                                        <TemplatePreview templateId={template.id} customization={customization} />
                                    </div>

                                    {/* Template Info */}
                                    <div className="p-4">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{template.name}</h4>
                                                <p className="text-sm text-gray-600">{template.description}</p>
                                            </div>
                                            {selectedTemplate === template.id && (
                                                <div className="text-blue-500">
                                                    <FaCheck />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Customization Panel */}
                    <div className="w-1/3 border-l bg-gray-50 p-6 overflow-y-auto">
                        <h3 className="text-lg font-semibold mb-6">Customize</h3>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Accent Color
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {accentColors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => handleColorChange(color)}
                                        className={`w-12 h-12 rounded-lg border-2 transition-all ${customization.accentColor === color
                                            ? 'border-gray-400 shadow-md'
                                            : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Font Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Font Family
                            </label>
                            <select
                                value={customization.fontFamily}
                                onChange={(e) => handleFontChange(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {fontOptions.map((font) => (
                                    <option key={font.value} value={font.value}>
                                        {font.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Section Order (future feature) */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                Section Order
                            </label>
                            <p className="text-sm text-gray-500">
                                Drag and drop reordering coming soon!
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center p-6 border-t bg-gray-50 flex-shrink-0">
                    <button
                        onClick={onBackToForm}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                        Back to Form
                    </button>
                    <button
                        onClick={onNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Preview & Download
                    </button>
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

    // Default preview for other templates
    return (
        <div className="w-full h-full bg-white p-3 flex items-center justify-center" style={previewStyle}>
            <div className="text-center">
                <div className="font-bold text-sm mb-1">John Doe</div>
                <div style={accentStyle}>{templateId} Template</div>
                <div className="text-xs text-gray-600 mt-2">Preview coming soon</div>
            </div>
        </div>
    );
} 