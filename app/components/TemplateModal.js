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
        },
        {
            id: 'executive',
            name: 'Executive',
            description: 'Professional layout for senior leadership roles',
            preview: '/templates/executive-preview.jpg'
        },
        {
            id: 'technical',
            name: 'Technical',
            description: 'Developer-focused with skills sidebar',
            preview: '/templates/technical-preview.jpg'
        },
        {
            id: 'academic',
            name: 'Academic',
            description: 'Research-oriented academic CV format',
            preview: '/templates/academic-preview.jpg'
        },
        {
            id: 'compact',
            name: 'Compact',
            description: 'Maximizes information in minimal space',
            preview: '/templates/compact-preview.jpg'
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
            <div className="w-full h-full bg-white" style={previewStyle}>
                <div className="h-8 flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: customization.accentColor }}>
                    John Doe
                </div>
                <div className="p-2">
                    <div className="text-center mb-2">
                        <div style={accentStyle}>Creative Designer</div>
                        <div className="text-xs text-gray-600">john@email.com</div>
                    </div>
                    <div className="mb-2">
                        <div className="font-semibold text-xs mb-1" style={accentStyle}>EXPERIENCE</div>
                        <div className="text-xs">
                            <div className="font-medium">Senior Designer</div>
                            <div className="text-gray-600">Creative Agency</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xs mb-1" style={accentStyle}>SKILLS</div>
                        <div className="text-xs text-gray-600">Adobe Creative Suite</div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'executive') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center border-b-2 pb-2 mb-2" style={{ borderColor: customization.accentColor }}>
                    <div className="font-bold text-sm">John Doe</div>
                    <div style={accentStyle}>Chief Technology Officer</div>
                    <div className="text-xs text-gray-600">john@email.com • (555) 123-4567</div>
                </div>
                <div className="mb-2">
                    <div className="font-bold text-xs mb-1" style={accentStyle}>EXECUTIVE SUMMARY</div>
                    <div className="text-xs text-gray-700">Seasoned technology executive with 15+ years...</div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <div className="font-bold text-xs mb-1" style={accentStyle}>EXPERIENCE</div>
                        <div className="text-xs">
                            <div className="font-medium">CTO</div>
                            <div className="text-gray-600">TechCorp</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-xs mb-1" style={accentStyle}>CORE COMPETENCIES</div>
                        <div className="text-xs text-gray-600">Strategic Planning</div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'technical') {
        return (
            <div className="w-full h-full bg-white flex" style={previewStyle}>
                <div className="w-1/3 bg-gray-50 p-2">
                    <div className="mb-2">
                        <div className="font-bold text-xs mb-1" style={accentStyle}>CONTACT</div>
                        <div className="text-xs text-gray-600">
                            <div>john@email.com</div>
                            <div>(555) 123-4567</div>
                        </div>
                    </div>
                    <div>
                        <div className="font-bold text-xs mb-1" style={accentStyle}>TECHNICAL SKILLS</div>
                        <div className="text-xs text-gray-600">
                            <div>JavaScript</div>
                            <div>Python</div>
                            <div>React</div>
                        </div>
                    </div>
                </div>
                <div className="w-2/3 p-2">
                    <div className="mb-1">
                        <div className="font-bold text-sm">John Doe</div>
                        <div style={accentStyle}>Full Stack Developer</div>
                    </div>
                    <div>
                        <div className="font-bold text-xs mb-1" style={accentStyle}>EXPERIENCE</div>
                        <div className="text-xs">
                            <div className="font-medium">Senior Developer</div>
                            <div className="text-gray-600">Tech Company</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (templateId === 'academic') {
        return (
            <div className="w-full h-full bg-white p-3" style={previewStyle}>
                <div className="text-center border-b pb-2 mb-2">
                    <div className="font-bold text-sm">Dr. John Doe</div>
                    <div className="text-xs text-gray-600">john@university.edu • (555) 123-4567</div>
                </div>
                <div className="text-center mb-2">
                    <div style={accentStyle}>Associate Professor of Computer Science</div>
                </div>
                <div className="mb-2">
                    <div className="font-bold text-xs text-center mb-1" style={accentStyle}>EDUCATION</div>
                    <div className="text-xs text-center">
                        <div className="font-medium">Ph.D. in Computer Science</div>
                        <div className="text-gray-600">Stanford University, 2015</div>
                    </div>
                </div>
                <div>
                    <div className="font-bold text-xs text-center mb-1" style={accentStyle}>RESEARCH SKILLS</div>
                    <div className="text-xs text-center text-gray-600">Machine Learning • Data Analysis</div>
                </div>
            </div>
        );
    }

    if (templateId === 'compact') {
        return (
            <div className="w-full h-full bg-white p-2" style={previewStyle}>
                <div className="flex justify-between items-start mb-1">
                    <div>
                        <div className="font-bold text-sm">John Doe</div>
                        <div style={accentStyle}>Software Engineer</div>
                    </div>
                    <div className="text-xs text-gray-600 text-right">
                        <div>john@email.com</div>
                        <div>(555) 123-4567</div>
                    </div>
                </div>
                <div className="w-full h-px mb-2" style={{ backgroundColor: customization.accentColor }}></div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                        <div className="font-bold mb-1" style={accentStyle}>SKILLS</div>
                        <div className="text-gray-600">JavaScript</div>
                        <div className="text-gray-600">React</div>
                    </div>
                    <div className="col-span-2">
                        <div className="font-bold mb-1" style={accentStyle}>EXPERIENCE</div>
                        <div className="font-medium">Senior Developer</div>
                        <div className="text-gray-600">Tech Company</div>
                    </div>
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