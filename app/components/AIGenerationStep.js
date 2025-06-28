'use client';

import { motion } from 'framer-motion';
import { FaRobot, FaSpinner } from 'react-icons/fa';

export default function AIGenerationStep({ existingResume, setExistingResume, customInstructions, setCustomInstructions, onGenerateContent, isGenerating, hasAiContent }) {
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
                    AI Content Enhancement
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600"
                >
                    Let our AI supercharge your resume with compelling content
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={`rounded-xl p-6 border-2 ${hasAiContent
                    ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-300'
                    : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-300'
                    }`}
            >
                <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${hasAiContent
                        ? 'bg-green-500'
                        : 'bg-blue-500'
                        }`}>
                        {hasAiContent ? '✅' : '🤖'}
                    </div>
                    <h4 className={`text-xl font-bold ${hasAiContent ? 'text-green-900' : 'text-blue-900'}`}>
                        {hasAiContent ? 'AI Content Generated!' : 'AI Enhancement Ready'}
                    </h4>
                </div>
                <p className={`text-sm leading-relaxed ${hasAiContent ? 'text-green-800' : 'text-blue-800'}`}>
                    {hasAiContent
                        ? 'Your resume has been enhanced with AI-generated content! The enhanced version will be used in your templates while preserving your original data.'
                        : 'Our advanced AI will analyze your information to create a compelling professional summary and enhance your work experience descriptions with industry-relevant keywords and impact-focused language.'
                    }
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                        <div className="w-6 h-6 mr-2 text-gray-600">📄</div>
                        Existing Resume Content (Optional)
                    </label>
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        Paste your current resume content to help our AI understand your writing style and professional background better.
                    </p>
                    <textarea
                        value={existingResume}
                        onChange={(e) => setExistingResume(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={8}
                        placeholder="Paste your existing resume content here..."
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
                >
                    <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                        <div className="w-6 h-6 mr-2 text-purple-600">💡</div>
                        Custom Instructions & Achievements
                    </label>

                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-xl p-4 mb-4">
                        <h4 className="text-sm font-bold text-amber-800 mb-3 flex items-center">
                            <span className="mr-2">🎯</span>
                            Pro Tips for Maximum Impact:
                        </h4>
                        <ul className="text-xs text-amber-700 space-y-2">
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Include specific metrics (%, $, #) to quantify achievements
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Mention awards, promotions, or recognition received
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Add scope details (team size, budget, project timeline)
                            </li>
                            <li className="flex items-start">
                                <span className="mr-2 text-amber-500">▸</span>
                                Include industry keywords for your target role
                            </li>
                        </ul>
                    </div>

                    <textarea
                        value={customInstructions}
                        onChange={(e) => setCustomInstructions(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                        rows={8}
                        placeholder="Share your key achievements and specific instructions:

• Increased team productivity by 25% through process improvements
• Managed $2M annual budget across 3 departments  
• Led team of 8 developers on critical product launch
• Received &quot;Employee of the Year&quot; award in 2023
• Focus on leadership and project management skills
• Include keywords: Agile, Scrum, stakeholder management..."
                    />
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
            >
                <button
                    onClick={onGenerateContent}
                    disabled={isGenerating}
                    className={`flex items-center justify-center space-x-3 px-8 py-4 text-white rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 ${hasAiContent
                        ? 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700'
                        : 'bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700'
                        }`}
                >
                    {isGenerating ? (
                        <>
                            <FaSpinner className="animate-spin text-xl" />
                            <span>AI is Working Its Magic...</span>
                        </>
                    ) : hasAiContent ? (
                        <>
                            <span className="text-xl">🔄</span>
                            <span>Regenerate AI Content</span>
                        </>
                    ) : (
                        <>
                            <FaRobot className="text-xl" />
                            <span>Generate AI-Enhanced Content</span>
                        </>
                    )}
                </button>
            </motion.div>
        </motion.div>
    );
} 