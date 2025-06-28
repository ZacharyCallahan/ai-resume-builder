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
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-7xl max-h-[95vh] overflow-hidden"
            >
                {/* Header with Gradient */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8">
                    <div className="flex justify-between items-center">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl font-bold mb-2"
                            >
                                Choose Your Plan
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-blue-100 text-lg"
                            >
                                Unlock the full power of AI resume building
                            </motion.p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-3 rounded-full transition-all duration-200"
                        >
                            <FaTimes size={24} />
                        </button>
                    </div>

                    {/* Trust Indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 flex flex-wrap items-center justify-center gap-8 text-blue-100"
                    >
                        <div className="flex items-center space-x-2">
                            <FaShieldAlt className="text-green-400" />
                            <span className="text-sm">30-Day Money Back Guarantee</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaStar className="text-yellow-400" />
                            <span className="text-sm">4.9/5 Average Rating</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-green-400">✓</span>
                            <span className="text-sm">50,000+ Resumes Created</span>
                        </div>
                    </motion.div>
                </div>

                {/* Content Area */}
                <div className="overflow-y-auto max-h-[70vh] bg-gradient-to-br from-gray-50 to-white">
                    {/* Pricing Cards */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {plans.map((plan, index) => {
                                const Icon = plan.icon;
                                const isPopular = plan.popular;

                                return (
                                    <motion.div
                                        key={plan.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.3 }}
                                        className={`relative rounded-2xl border-2 p-8 transition-all duration-300 hover:shadow-2xl ${isPopular
                                            ? 'border-blue-500 shadow-2xl scale-105 bg-gradient-to-br from-blue-50 to-purple-50'
                                            : 'border-gray-200 bg-white hover:border-gray-300'
                                            }`}
                                    >
                                        {isPopular && (
                                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{ delay: 0.5, type: "spring" }}
                                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center space-x-2"
                                                >
                                                    <FaStar className="text-yellow-300" />
                                                    <span>Most Popular</span>
                                                </motion.span>
                                            </div>
                                        )}

                                        <div className="text-center mb-8">
                                            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isPopular ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-100'}`}>
                                                <Icon className={`text-2xl ${isPopular ? 'text-white' : 'text-gray-600'}`} />
                                            </div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                            <div className="mb-4">
                                                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                                <span className="text-gray-600 ml-2">/ {plan.period}</span>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            {plan.features.map((feature, featureIndex) => (
                                                <motion.div
                                                    key={featureIndex}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 + featureIndex * 0.05 + 0.5 }}
                                                    className="flex items-start space-x-3"
                                                >
                                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-0.5">
                                                        <FaCheck className="text-white text-xs" />
                                                    </div>
                                                    <span className="text-gray-700 leading-relaxed">{feature}</span>
                                                </motion.div>
                                            ))}
                                            {plan.limitations.map((limitation, limitationIndex) => (
                                                <motion.div
                                                    key={limitationIndex}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 + (plan.features.length + limitationIndex) * 0.05 + 0.5 }}
                                                    className="flex items-start space-x-3"
                                                >
                                                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                                                        <FaTimes className="text-white text-xs" />
                                                    </div>
                                                    <span className="text-gray-500 leading-relaxed">{limitation}</span>
                                                </motion.div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => {
                                                // Future: Integrate with Stripe
                                                alert('Payment integration coming soon!');
                                            }}
                                            className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${isPopular
                                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-200 hover:border-gray-300'
                                                }`}
                                        >
                                            {plan.buttonText}
                                        </button>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
                        <div className="max-w-6xl mx-auto px-8">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="text-3xl font-bold text-gray-900 text-center mb-12"
                            >
                                What Our Users Say
                            </motion.h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 + 0.9 }}
                                        className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                {testimonial.avatar}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                                <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed italic">"{testimonial.testimonial}"</p>
                                        <div className="flex mt-4">
                                            {[...Array(5)].map((_, i) => (
                                                <FaStar key={i} className="text-yellow-400" />
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="py-16 px-8">
                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.2 }}
                            className="text-3xl font-bold text-gray-900 text-center mb-12"
                        >
                            Frequently Asked Questions
                        </motion.h3>
                        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                            {faqs.map((faq, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 1.3 }}
                                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <h4 className="font-bold text-gray-900 mb-3 text-lg">
                                        {faq.question}
                                    </h4>
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex justify-center items-center p-6 border-t bg-white">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5 }}
                        className="text-gray-500 text-sm flex items-center space-x-4"
                    >
                        <span className="flex items-center space-x-2">
                            <FaShieldAlt className="text-green-500" />
                            <span>Secure payment processing</span>
                        </span>
                        <span>•</span>
                        <span>30-day money-back guarantee</span>
                        <span>•</span>
                        <span>No hidden fees</span>
                    </motion.p>
                </div>
            </motion.div>
        </motion.div>
    );
} 