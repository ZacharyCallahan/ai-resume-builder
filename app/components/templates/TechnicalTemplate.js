export default function TechnicalTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily, fontSize, contentPadding, sectionOrder } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Inter',
        lineHeight: 1.4,
        fontSize: `${fontSize?.body || 13}px`
    };

    const headerStyle = {
        fontSize: `${fontSize?.header || 24}px`,
    };

    const sectionTitleStyle = {
        fontSize: `${fontSize?.sectionTitle || 14}px`,
        color: accentColor,
    };

    const accentStyle = {
        color: accentColor,
    };

    const containerPadding = `${contentPadding || 1}rem`;

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Section rendering functions for main content
    const renderMainSection = (sectionType) => {
        switch (sectionType) {
            case 'summary':
                return professionalSummary ? (
                    <section className="mb-6 page-break-inside-avoid" key="summary">
                        <h3 className="font-bold mb-2 uppercase tracking-wider" style={sectionTitleStyle}>
                            Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-sm">
                            {professionalSummary}
                        </p>
                    </section>
                ) : null;

            case 'experience':
                return workExperience && workExperience.length > 0 ? (
                    <section className="page-break-inside-avoid" key="experience">
                        <h3 className="font-bold mb-4 uppercase tracking-wider" style={sectionTitleStyle}>
                            Experience
                        </h3>
                        <div className="space-y-5">
                            {workExperience.map((exp, index) => (
                                <div key={index} className="page-break-inside-avoid">
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-sm">{exp.position}</h4>
                                            <p className="text-gray-700 font-medium text-sm" style={accentStyle}>
                                                {exp.company}
                                            </p>
                                        </div>
                                        <div className="text-right ml-4">
                                            <p className="text-gray-600 text-xs font-mono">
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </p>
                                        </div>
                                    </div>
                                    {(exp.bulletPoints || exp.description) && (
                                        <div className="text-gray-700 text-xs">
                                            {exp.bulletPoints ? (
                                                exp.bulletPoints.map((point, pointIndex) => (
                                                    <div key={pointIndex} className="flex items-start mb-1">
                                                        <div
                                                            className="w-1 h-1 rounded-full mr-3 mt-2"
                                                            style={{ backgroundColor: accentColor }}
                                                        />
                                                        <span className="flex-1">{point}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                exp.description.split('\n').map((line, lineIndex) => (
                                                    <div key={lineIndex} className="flex items-start mb-1">
                                                        <div
                                                            className="w-1 h-1 rounded-full mr-3 mt-2"
                                                            style={{ backgroundColor: accentColor }}
                                                        />
                                                        <span className="flex-1">
                                                            {line.trim().startsWith('•') ? line.substring(1).trim() : line}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    const mainSectionsToRender = sectionOrder ? sectionOrder.filter(s => s === 'summary' || s === 'experience') : ['summary', 'experience'];

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            <div className="flex">
                {/* Left Column - Skills and Contact */}
                <div className="w-1/3 bg-gray-50" style={{ padding: containerPadding }}>
                    {/* Contact Information */}
                    <section className="mb-6 page-break-inside-avoid">
                        <h3 className="font-bold mb-3 uppercase tracking-wider" style={sectionTitleStyle}>
                            Contact
                        </h3>
                        <div className="space-y-2 text-xs">
                            {personalInfo.email && (
                                <div className="flex items-start">
                                    <span className="text-gray-500 mr-2">@</span>
                                    <span className="text-gray-700 break-all">{personalInfo.email}</span>
                                </div>
                            )}
                            {personalInfo.phone && (
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">#</span>
                                    <span className="text-gray-700">{personalInfo.phone}</span>
                                </div>
                            )}
                            {personalInfo.location && (
                                <div className="flex items-center">
                                    <span className="text-gray-500 mr-2">📍</span>
                                    <span className="text-gray-700">{personalInfo.location}</span>
                                </div>
                            )}
                            {personalInfo.linkedIn && (
                                <div className="flex items-start">
                                    <span className="text-gray-500 mr-2">in</span>
                                    <span className="text-gray-700 break-all">{personalInfo.linkedIn}</span>
                                </div>
                            )}
                            {personalInfo.website && (
                                <div className="flex items-start">
                                    <span className="text-gray-500 mr-2">🌐</span>
                                    <span className="text-gray-700 break-all">{personalInfo.website}</span>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Technical Skills */}
                    {skills && skills.length > 0 && (
                        <section className="mb-6 page-break-inside-avoid">
                            <h3 className="font-bold mb-3 uppercase tracking-wider" style={sectionTitleStyle}>
                                Technical Skills
                            </h3>
                            <div className="space-y-1">
                                {skills.filter(skill => skill.trim()).map((skill, index) => (
                                    <div key={index} className="flex items-center">
                                        <div
                                            className="w-2 h-2 rounded-sm mr-2"
                                            style={{ backgroundColor: accentColor }}
                                        />
                                        <span className="text-gray-700 text-xs font-mono">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="page-break-inside-avoid">
                            <h3 className="font-bold mb-3 uppercase tracking-wider" style={sectionTitleStyle}>
                                Education
                            </h3>
                            <div className="space-y-3">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h4 className="font-medium text-gray-900 text-xs">
                                            {edu.degree}
                                        </h4>
                                        {edu.field && (
                                            <p className="text-gray-700 text-xs">{edu.field}</p>
                                        )}
                                        <p className="text-gray-600 text-xs">{edu.institution}</p>
                                        <p className="text-gray-500 text-xs">{formatDate(edu.graduationDate)}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>

                {/* Right Column - Main Content */}
                <div className="w-2/3" style={{ padding: containerPadding }}>
                    {/* Header */}
                    <header className="mb-6 page-break-inside-avoid">
                        <h1 className="font-bold text-gray-900 mb-1" style={headerStyle}>
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <h2 className="text-lg font-medium mb-3" style={accentStyle}>
                            {targetJobTitle || 'Your Target Job Title'}
                        </h2>
                        <div
                            className="w-16 h-1 rounded"
                            style={{ backgroundColor: accentColor }}
                        />
                    </header>

                    {/* Dynamic Main Sections */}
                    {mainSectionsToRender.map(sectionType => renderMainSection(sectionType))}
                </div>
            </div>
        </div>
    );
} 