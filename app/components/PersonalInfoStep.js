'use client';

import { motion } from 'framer-motion';

export default function PersonalInfoStep({ personalInfo, updatePersonalInfo, targetJobTitle, setTargetJobTitle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 sm:space-y-8"
        >
            <div className="text-center">
                <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-lg sm:text-xl font-bold text-gray-900 mb-2"
                >
                    Let&apos;s Start With You
                </motion.h3>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-600 text-xs sm:text-sm"
                >
                    Tell us about yourself so we can create your perfect resume
                </motion.p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200"
            >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Full Name *
                        </label>
                        <input
                            type="text"
                            value={personalInfo.fullName}
                            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="John Doe"
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Target Job Title *
                        </label>
                        <input
                            type="text"
                            value={targetJobTitle}
                            onChange={(e) => setTargetJobTitle(e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="Software Engineer"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Email *
                        </label>
                        <input
                            type="email"
                            value={personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            value={personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="San Francisco, CA"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            LinkedIn URL
                        </label>
                        <input
                            type="url"
                            value={personalInfo.linkedIn}
                            onChange={(e) => updatePersonalInfo('linkedIn', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="linkedin.com/in/johndoe"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Website/Portfolio
                        </label>
                        <input
                            type="url"
                            value={personalInfo.website}
                            onChange={(e) => updatePersonalInfo('website', e.target.value)}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                            placeholder="johndoe.com"
                        />
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
} 