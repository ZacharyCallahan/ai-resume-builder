'use client';

import { motion } from 'framer-motion';

export default function HeroSection({ onGetStarted }) {
    return (
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8">
                        Create Your Perfect{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            AI-Powered
                        </span>{' '}
                        Resume
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        Generate professional, ATS-friendly resumes in minutes. Our AI analyzes your experience
                        and creates compelling content that gets you noticed by employers.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onGetStarted}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            Build My Resume Now
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
                        >
                            See Examples
                        </motion.button>
                    </div>

                    <div className="mt-16 flex justify-center items-center space-x-8 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span>ATS-Friendly</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span>Professional Templates</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-500">✓</span>
                            <span>AI-Generated Content</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
} 