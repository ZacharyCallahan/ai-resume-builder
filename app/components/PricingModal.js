'use client';

import { motion } from 'framer-motion';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function PricingModal({ isOpen, onClose }) {
    const plans = [
        {
            name: 'Free',
            price: '$0',
            period: 'forever',
            description: 'Perfect for trying out our AI resume builder',
            features: [
                '1 Resume download',
                'Basic templates',
                'AI content generation',
                'Standard support'
            ],
            limitations: [
                'Limited customization',
                'Watermark on PDF'
            ],
            buttonText: 'Get Started Free',
            popular: false
        },
        {
            name: 'Pro',
            price: '$9.99',
            period: 'one-time',
            description: 'Everything you need for your job search',
            features: [
                'Unlimited downloads',
                'All premium templates',
                'Advanced AI features',
                'Full customization',
                'No watermarks',
                'Priority support',
                'Cover letter generator'
            ],
            limitations: [],
            buttonText: 'Get Pro Access',
            popular: true
        },
        {
            name: 'Premium',
            price: '$19.99',
            period: 'one-time',
            description: 'For professionals who want everything',
            features: [
                'Everything in Pro',
                'LinkedIn optimization',
                'ATS scoring & analysis',
                'Multiple resume versions',
                'Interview preparation tips',
                'Career coaching resources',
                '1-year free updates'
            ],
            limitations: [],
            buttonText: 'Go Premium',
            popular: false
        }
    ];

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
                className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Choose Your Plan</h2>
                        <p className="text-gray-600">Unlock the full power of AI resume building</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Pricing Cards */}
                <div className="p-8 overflow-y-auto max-h-[75vh]">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative rounded-lg border-2 p-6 ${plan.popular
                                        ? 'border-blue-500 shadow-lg scale-105'
                                        : 'border-gray-200'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            Most Popular
                                        </span>
                                    </div>
                                )}

                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <div className="mb-4">
                                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                        <span className="text-gray-600 ml-2">/ {plan.period}</span>
                                    </div>
                                    <p className="text-gray-600 mb-6">{plan.description}</p>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-start space-x-3">
                                            <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                    {plan.limitations.map((limitation, limitationIndex) => (
                                        <li key={limitationIndex} className="flex items-start space-x-3">
                                            <span className="text-red-500 mt-1 flex-shrink-0">×</span>
                                            <span className="text-gray-500">{limitation}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => {
                                        // Future: Integrate with Stripe
                                        alert('Payment integration coming soon!');
                                    }}
                                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${plan.popular
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                        }`}
                                >
                                    {plan.buttonText}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* FAQ Section */}
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
                            Frequently Asked Questions
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Can I try before I buy?
                                </h4>
                                <p className="text-gray-600">
                                    Yes! Our free plan lets you create and download one resume with basic features.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Is this a subscription?
                                </h4>
                                <p className="text-gray-600">
                                    No! Our Pro and Premium plans are one-time payments with lifetime access.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    What file formats do you support?
                                </h4>
                                <p className="text-gray-600">
                                    We generate high-quality PDF files that are compatible with all job application systems.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                    Can I edit my resume later?
                                </h4>
                                <p className="text-gray-600">
                                    Yes! With Pro and Premium plans, you can edit and re-download your resume anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center items-center p-6 border-t bg-gray-50">
                    <p className="text-gray-500 text-sm">
                        🔒 Secure payment processing • 30-day money-back guarantee
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
} 