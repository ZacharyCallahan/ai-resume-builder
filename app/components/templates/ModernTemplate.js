export default function ModernTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily, fontSize, contentPadding, sectionOrder } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Inter',
        lineHeight: 1.5,
        fontSize: `${fontSize?.body || 14}px`,
    };

    const headerStyle = {
        fontSize: `${fontSize?.header || 32}px`,
    };

    const sectionTitleStyle = {
        fontSize: `${fontSize?.sectionTitle || 18}px`,
        color: accentColor,
    };

    const accentStyle = {
        color: accentColor,
    };

    const accentBorderStyle = {
        borderColor: accentColor,
    };

    const containerPadding = `${contentPadding || 1}rem`;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Section rendering functions
    const renderSection = (sectionType) => {
        switch (sectionType) {
            case 'summary':
                return professionalSummary ? (
                    <section className="mb-8" key="summary">
                        <h3 className="font-bold mb-3 uppercase tracking-wide" style={sectionTitleStyle}>
                            Professional Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                            {professionalSummary}
                        </p>
                    </section>
                ) : null;

            case 'experience':
                return workExperience && workExperience.length > 0 ? (
                    <section className="mb-8" key="experience">
                        <h3 className="font-bold mb-4 uppercase tracking-wide" style={sectionTitleStyle}>
                            Professional Experience
                        </h3>
                        <div className="space-y-6">
                            {workExperience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                                            <p className="text-gray-700 font-medium">{exp.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600">
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </p>
                                        </div>
                                    </div>
                                    {(exp.bulletPoints || exp.description) && (
                                        <div className="text-gray-700 mt-2">
                                            {exp.bulletPoints ? (
                                                exp.bulletPoints.map((point, pointIndex) => (
                                                    <p key={pointIndex} className="mb-1">
                                                        • {point}
                                                    </p>
                                                ))
                                            ) : (
                                                exp.description.split('\n').map((line, lineIndex) => (
                                                    <p key={lineIndex} className="mb-1">
                                                        {line.trim().startsWith('•') ? line : `• ${line}`}
                                                    </p>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section className="mb-8" key="education">
                        <h3 className="font-bold mb-4 uppercase tracking-wide" style={sectionTitleStyle}>
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">
                                                {edu.degree} {edu.field && `in ${edu.field}`}
                                            </h4>
                                            <p className="text-gray-700">{edu.institution}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600">{formatDate(edu.graduationDate)}</p>
                                            {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    const sectionsToRender = sectionOrder || ['summary', 'experience', 'education'];

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            <div className="flex">
                {/* Left Column - Main Content */}
                <div className="w-2/3" style={{ padding: containerPadding }}>
                    {/* Header */}
                    <div className="border-b-4 pb-6 mb-8" style={accentBorderStyle}>
                        <h1 className="font-bold text-gray-900 mb-2" style={headerStyle}>
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <h2 className="text-2xl font-semibold mb-4" style={accentStyle}>
                            {targetJobTitle || 'Your Target Job Title'}
                        </h2>
                    </div>

                    {/* Dynamic Sections */}
                    {sectionsToRender.map(sectionType => renderSection(sectionType))}
                </div>

                {/* Right Column - Sidebar */}
                <div className="w-1/3 bg-gray-50" style={{ padding: containerPadding }}>
                    {/* Contact Information */}
                    <section className="mb-8">
                        <h3 className="font-bold mb-4 uppercase tracking-wide" style={sectionTitleStyle}>
                            Contact
                        </h3>
                        <div className="space-y-2 text-sm">
                            {personalInfo.email && (
                                <div>
                                    <p className="text-gray-700">{personalInfo.email}</p>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div>
                                    <p className="text-gray-700">{personalInfo.phone}</p>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div>
                                    <p className="text-gray-700">{personalInfo.location}</p>
                                </div>
                            )}
                            {personalInfo.linkedIn && (
                                <div>
                                    <p className="text-gray-700 break-all">{personalInfo.linkedIn}</p>
                                </div>
                            )}
                            {personalInfo.website && (
                                <div>
                                    <p className="text-gray-700 break-all">{personalInfo.website}</p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section className="mb-8">
                            <h3 className="font-bold mb-4 uppercase tracking-wide" style={sectionTitleStyle}>
                                Skills
                            </h3>
                            <div className="space-y-2">
                                {skills.filter(skill => skill.trim()).map((skill, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-2 h-2 rounded-full mr-3"
                                            style={{ backgroundColor: accentColor }}
                                        />
                                        <span className="text-gray-700 text-sm">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Additional sections can be added here */}
                </div>
            </div>
        </div>
    );
} 