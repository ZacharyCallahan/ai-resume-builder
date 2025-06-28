'use client';

import { motion } from 'framer-motion';
import { FaGraduationCap, FaPlus, FaTrash } from 'react-icons/fa';

export default function EducationSkillsStep({ education, addEducation, updateEducation, removeEducation, skills, addSkill, updateSkill, removeSkill }) {
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