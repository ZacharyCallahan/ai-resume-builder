'use client';

import { motion } from 'framer-motion';
import { FaBriefcase, FaPlus, FaTrash } from 'react-icons/fa';

export default function WorkExperienceStep({ workExperience, addWorkExperience, updateWorkExperience, removeWorkExperience }) {
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