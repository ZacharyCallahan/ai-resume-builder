'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { FaCheck, FaCrown, FaRocket, FaShieldAlt, FaStar, FaTimes } from 'react-icons/fa';

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
            popular: false,
            icon: FaRocket,
            color: 'gray'
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
            popular: true,
            icon: FaStar,
            color: 'blue'
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
            popular: false,
            icon: FaCrown,
            color: 'purple'
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            role: "Software Engineer",
            company: "Google",
            testimonial: "This AI resume builder helped me land my dream job at Google! The templates are professional and the AI content is spot-on.",
            avatar: "SJ"
        },
        {
            name: "Michael Chen",
            role: "Marketing Manager",
            company: "Facebook",
            testimonial: "The Pro plan was worth every penny. I got 3 job offers within 2 weeks of using this tool!",
            avatar: "MC"
        },
        {
            name: "Emily Rodriguez",
            role: "Data Scientist",
            company: "Netflix",
            testimonial: "The ATS optimization feature in Premium helped my resume get past all the screening filters.",
            avatar: "ER"
        }
    ];

    const faqs = [
        {
            question: "Can I try before I buy?",
            answer: "Yes! Our free plan lets you create and download one resume with basic features to see if you like our platform."
        },
        {
            question: "Is this a subscription?",
            answer: "No! Our Pro and Premium plans are one-time payments with lifetime access. No recurring charges ever."
        },
        {
            question: "What file formats do you support?",
            answer: "We generate high-quality PDF files that are compatible with all job application systems and ATS software."
        },
        {
            question: "Can I edit my resume later?",
            answer: "Yes! With Pro and Premium plans, you can edit and re-download your resume anytime with no limits."
        },
        {
            question: "Do you offer refunds?",
            answer: "Absolutely! We offer a 30-day money-back guarantee if you are not completely satisfied with your purchase."
        },
        {
            question: "How does the AI content generation work?",
            answer: "Our AI analyzes your experience and the job market to create compelling, keyword-rich content that helps you stand out to employers."
        }
    ];

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-2 sm:p-4 overflow-hidden"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-5xl xl:max-w-6xl max-h-[98vh] sm:max-h-[95vh] overflow-hidden"
            >
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-3 sm:p-4 lg:p-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-lg sm:text-xl lg:text-2xl font-bold mb-1"
                            >
                                Choose Your Plan
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-blue-100 text-xs sm:text-sm"
                            >
                                Unlock the full power of AI resume building
                            </motion.p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-all duration-200"
                        >
                            <FaTimes size={16} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Trust Indicators - Responsive */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-blue-100"
                    >
                        <div className="flex items-center space-x-2">
                            <FaShieldAlt className="text-green-400" />
                            <span className="text-xs">30-Day Money Back Guarantee</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaStar className="text-yellow-400" />
                            <span className="text-xs">4.9/5 Average Rating</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-xs">50,000+ Resumes Created</span>
                        </div>
                    </motion.div>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] bg-gradient-to-br from-gray-50 to-white">
                    {/* Pricing Cards - Responsive Grid */}
                    <div className="p-3 sm:p-4 lg:p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                            {plans.map((plan, index) => {
                                const Icon = plan.icon;
                                const isPopular = plan.popular;

                                return (
                                    <motion.div
                                        key={plan.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        className={`relative bg-white rounded-xl sm:rounded-2xl border-2 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${isPopular ? 'border-blue-500 ring-2 ring-blue-100 scale-100 sm:scale-105' : 'border-gray-200'
                                            }`}
                                    >
                                        {/* Popular Badge */}
                                        {isPopular && (
                                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                                <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-bold px-3 sm:px-4 py-1 rounded-full shadow-lg">
                                                    Most Popular
                                                </div>
                                            </div>
                                        )}

                                        <div className="p-3 sm:p-4 lg:p-5">
                                            {/* Plan Header */}
                                            <div className="text-center mb-3 sm:mb-4">
                                                <div className={`w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 rounded-full flex items-center justify-center ${plan.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                                                    plan.color === 'purple' ? 'bg-purple-100 text-purple-600' :
                                                        'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    <Icon className="text-sm sm:text-lg" />
                                                </div>
                                                <h3 className="text-base sm:text-lg font-bold text-gray-900">{plan.name}</h3>
                                                <p className="text-xs text-gray-600 mt-1">{plan.description}</p>
                                            </div>

                                            {/* Pricing */}
                                            <div className="text-center mb-3 sm:mb-4">
                                                <div className="flex items-baseline justify-center">
                                                    <span className="text-xl sm:text-2xl font-bold text-gray-900">{plan.price}</span>
                                                    <span className="text-xs sm:text-sm text-gray-600 ml-1">/{plan.period}</span>
                                                </div>
                                            </div>

                                            {/* Features */}
                                            <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                                                {plan.features.map((feature, featureIndex) => (
                                                    <div key={featureIndex} className="flex items-center text-xs">
                                                        <FaCheck className="text-green-500 mr-2 flex-shrink-0" />
                                                        <span className="text-gray-700">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Limitations */}
                                            {plan.limitations.length > 0 && (
                                                <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-100">
                                                    {plan.limitations.map((limitation, limitationIndex) => (
                                                        <div key={limitationIndex} className="flex items-center text-xs">
                                                            <span className="text-red-500 mr-2">✕</span>
                                                            <span className="text-gray-500">{limitation}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* CTA Button */}
                                            <button
                                                className={`w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${isPopular
                                                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {plan.buttonText}
                                            </button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Testimonials Section - Responsive */}
                    <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-white">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-base sm:text-lg font-bold text-center text-gray-900 mb-3 sm:mb-4"
                        >
                            What Our Users Say
                        </motion.h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    className="bg-gray-50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-100"
                                >
                                    <div className="flex items-center mb-2">
                                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2 sm:mr-3">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-xs sm:text-sm text-gray-900">{testimonial.name}</div>
                                            <div className="text-xs text-gray-600">{testimonial.role} at {testimonial.company}</div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-700 italic leading-relaxed">&quot;{testimonial.testimonial}&quot;</p>
                                    <div className="flex text-yellow-400 mt-2">
                                        {[...Array(5)].map((_, i) => (
                                            <FaStar key={i} className="text-xs" />
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section - Responsive */}
                    <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-50 to-white">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0 }}
                            className="text-base sm:text-lg font-bold text-center text-gray-900 mb-3 sm:mb-4"
                        >
                            Frequently Asked Questions
                        </motion.h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 max-w-4xl mx-auto">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.1 + index * 0.1 }}
                                    className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
                                >
                                    <h4 className="font-semibold text-xs sm:text-sm text-gray-900 mb-1 sm:mb-2">{faq.question}</h4>
                                    <p className="text-xs text-gray-600 leading-relaxed">{faq.answer}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Trust & Security Footer - Responsive */}
                    <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 bg-gradient-to-r from-blue-50 to-purple-50 border-t">
                        <div className="text-center">
                            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-gray-600 text-xs">
                                <span className="flex items-center space-x-2">
                                    <FaShieldAlt className="text-green-500" />
                                    <span>Secure payment processing</span>
                                </span>
                                <span className="flex items-center space-x-2">
                                    <FaCheck className="text-green-500" />
                                    <span>No hidden fees</span>
                                </span>
                                <span className="flex items-center space-x-2">
                                    <FaStar className="text-yellow-500" />
                                    <span>30-day guarantee</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
} 