'use client';

import { motion } from 'framer-motion';

export default function Header({ onPricing }) {
    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold text-blue-600"
                        >
                            🤖 AI Resume Builder
                        </motion.div>
                    </div>

                    <nav className="hidden md:flex space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">
                            Features
                        </a>
                        <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition-colors">
                            How It Works
                        </a>
                        <button
                            onClick={onPricing}
                            className="text-gray-700 hover:text-blue-600 transition-colors"
                        >
                            Pricing
                        </button>
                    </nav>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onPricing}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </div>
        </motion.header>
    );
} 