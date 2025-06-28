export default function AcademicTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily, fontSize, contentPadding, sectionOrder } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Times New Roman',
        lineHeight: 1.5,
        fontSize: `${fontSize?.body || 12}px`,
        padding: `${contentPadding || 2}rem`
    };

    const accentStyle = {
        color: accentColor,
    };

    const headerStyle = {
        fontSize: `${fontSize?.header || 24}px`
    };

    const sectionTitleStyle = {
        fontSize: `${fontSize?.sectionTitle || 18}px`,
        color: accentColor
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    // Section rendering functions
    const renderSection = (sectionType) => {
        switch (sectionType) {
            case 'summary':
                return professionalSummary ? (
                    <section className="mb-8 page-break-inside-avoid" key="summary">
                        <h3 className="font-bold mb-3 text-center uppercase tracking-wide" style={sectionTitleStyle}>
                            Research Summary
                        </h3>
                        <p className="text-gray-700 leading-relaxed text-center italic">
                            {professionalSummary}
                        </p>
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section className="mb-8 page-break-inside-avoid" key="education">
                        <h3 className="font-bold mb-4 text-center uppercase tracking-wide" style={sectionTitleStyle}>
                            Education
                        </h3>
                        <div className="space-y-4">
                            {education.map((edu, index) => (
                                <div key={index} className="text-center">
                                    <h4 className="font-semibold text-gray-900 text-base">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h4>
                                    <p className="text-gray-700 font-medium">{edu.institution}</p>
                                    <p className="text-gray-600 text-sm italic">{formatDate(edu.graduationDate)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'experience':
                return workExperience && workExperience.length > 0 ? (
                    <section className="mb-8 page-break-inside-avoid" key="experience">
                        <h3 className="font-bold mb-4 text-center uppercase tracking-wide" style={sectionTitleStyle}>
                            Academic Experience
                        </h3>
                        <div className="space-y-6">
                            {workExperience.map((exp, index) => (
                                <div key={index} className="page-break-inside-avoid">
                                    <div className="text-center mb-3">
                                        <h4 className="font-semibold text-gray-900 text-base">{exp.position}</h4>
                                        <p className="text-gray-700 font-medium">{exp.company}</p>
                                        <p className="text-gray-600 text-sm italic">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </p>
                                    </div>
                                    {(exp.bulletPoints || exp.description) && (
                                        <div className="text-gray-700 text-sm">
                                            {exp.bulletPoints ? (
                                                <ul className="space-y-2">
                                                    {exp.bulletPoints.map((point, pointIndex) => (
                                                        <li key={pointIndex} className="flex items-start">
                                                            <span className="mr-3">•</span>
                                                            <span className="flex-1">{point}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <ul className="space-y-2">
                                                    {exp.description.split('\n').map((line, lineIndex) => (
                                                        <li key={lineIndex} className="flex items-start">
                                                            <span className="mr-3">•</span>
                                                            <span className="flex-1">
                                                                {line.trim().startsWith('•') ? line.substring(1).trim() : line}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section className="page-break-inside-avoid" key="skills">
                        <h3 className="font-bold mb-4 text-center uppercase tracking-wide" style={sectionTitleStyle}>
                            Research Skills & Competencies
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {skills.filter(skill => skill.trim()).map((skill, index) => (
                                <div key={index} className="text-center">
                                    <div className="flex items-center justify-center">
                                        <div
                                            className="w-2 h-2 rounded-full mr-2"
                                            style={{ backgroundColor: accentColor }}
                                        />
                                        <span className="text-gray-700 text-sm">{skill}</span>
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

    const sectionsToRender = sectionOrder || ['summary', 'education', 'experience', 'skills'];

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            {/* Header */}
            <header className="text-center mb-8 pb-4 border-b page-break-inside-avoid">
                <h1 className="font-bold text-gray-900 mb-2" style={headerStyle}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>

                {/* Contact Information */}
                <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex justify-center items-center space-x-6 flex-wrap">
                        {personalInfo.email && <span>{personalInfo.email}</span>}
                        {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    </div>
                    <div className="flex justify-center items-center space-x-6 flex-wrap">
                        {personalInfo.location && <span>{personalInfo.location}</span>}
                        {personalInfo.website && <span className="break-all">{personalInfo.website}</span>}
                    </div>
                    {personalInfo.linkedIn && (
                        <div className="text-center">
                            <span className="break-all">{personalInfo.linkedIn}</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Target Position */}
            {targetJobTitle && (
                <section className="mb-6 text-center page-break-inside-avoid">
                    <h2 className="text-xl font-semibold" style={accentStyle}>
                        {targetJobTitle}
                    </h2>
                </section>
            )}

            {/* Dynamic Sections */}
            {sectionsToRender.map(sectionType => renderSection(sectionType)).filter(Boolean)}

            {/* Academic formatting note */}
            <div className="mt-12 text-center">
                <div
                    className="w-24 h-px mx-auto"
                    style={{ backgroundColor: accentColor }}
                />
            </div>
        </div>
    );
} 