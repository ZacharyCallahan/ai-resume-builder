export default function CompactTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily, fontSize, contentPadding, sectionOrder } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Arial',
        lineHeight: 1.3,
        fontSize: `${fontSize?.body || 11}px`,
        padding: `${contentPadding || 0.5}rem`
    };

    const accentStyle = {
        color: accentColor,
    };

    const headerStyle = {
        fontSize: `${fontSize?.header || 20}px`
    };

    const sectionTitleStyle = {
        fontSize: `${fontSize?.sectionTitle || 12}px`,
        color: accentColor
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    // Section rendering functions for main content area
    const renderMainSection = (sectionType) => {
        switch (sectionType) {
            case 'summary':
                return professionalSummary ? (
                    <section className="page-break-inside-avoid" key="summary">
                        <h3 className="font-bold mb-2 uppercase tracking-wider" style={sectionTitleStyle}>
                            Summary
                        </h3>
                        <p className="text-gray-700 text-xs leading-relaxed">
                            {professionalSummary}
                        </p>
                    </section>
                ) : null;

            case 'experience':
                return workExperience && workExperience.length > 0 ? (
                    <section className="page-break-inside-avoid" key="experience">
                        <h3 className="font-bold mb-3 uppercase tracking-wider" style={sectionTitleStyle}>
                            Experience
                        </h3>
                        <div className="space-y-3">
                            {workExperience.map((exp, index) => (
                                <div key={index} className="page-break-inside-avoid">
                                    <div className="flex justify-between items-baseline mb-1">
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-xs">{exp.position}</h4>
                                            <p className="text-gray-700 text-xs">{exp.company}</p>
                                        </div>
                                        <div className="text-right ml-2">
                                            <p className="text-gray-600 text-xs">
                                                {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                            </p>
                                        </div>
                                    </div>
                                    {(exp.bulletPoints || exp.description) && (
                                        <div className="text-gray-700 text-xs ml-2">
                                            {exp.bulletPoints ? (
                                                exp.bulletPoints.slice(0, 3).map((point, pointIndex) => (
                                                    <div key={pointIndex} className="flex items-start mb-0.5">
                                                        <span className="mr-1 mt-1">•</span>
                                                        <span className="flex-1 leading-tight">{point}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                exp.description.split('\n').slice(0, 3).map((line, lineIndex) => (
                                                    <div key={lineIndex} className="flex items-start mb-0.5">
                                                        <span className="mr-1 mt-1">•</span>
                                                        <span className="flex-1 leading-tight">
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

    // Fixed sidebar sections (Skills and Education always in sidebar for compact layout)
    const mainSections = (sectionOrder || ['summary', 'experience']).filter(section =>
        ['summary', 'experience'].includes(section)
    );

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            {/* Compact Header */}
            <header className="mb-4 page-break-inside-avoid">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <h1 className="font-bold text-gray-900 mb-0.5" style={headerStyle}>
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <h2 className="text-sm font-medium mb-1" style={accentStyle}>
                            {targetJobTitle || 'Your Target Job Title'}
                        </h2>
                    </div>
                    <div className="text-right text-xs text-gray-600 ml-4">
                        {personalInfo.email && <div>{personalInfo.email}</div>}
                        {personalInfo.phone && <div>{personalInfo.phone}</div>}
                        {personalInfo.location && <div>{personalInfo.location}</div>}
                    </div>
                </div>
                {(personalInfo.linkedIn || personalInfo.website) && (
                    <div className="text-xs text-gray-600 mt-1 flex space-x-4">
                        {personalInfo.linkedIn && <span className="break-all">{personalInfo.linkedIn}</span>}
                        {personalInfo.website && <span className="break-all">{personalInfo.website}</span>}
                    </div>
                )}
                <div
                    className="w-full h-0.5 mt-2"
                    style={{ backgroundColor: accentColor }}
                />
            </header>

            {/* Two Column Layout */}
            <div className="grid grid-cols-3 gap-4">
                {/* Left Column - 1/3 width */}
                <div className="col-span-1 space-y-4">
                    {/* Skills */}
                    {skills && skills.length > 0 && (
                        <section className="page-break-inside-avoid">
                            <h3 className="font-bold mb-2 uppercase tracking-wider" style={sectionTitleStyle}>
                                Skills
                            </h3>
                            <div className="space-y-0.5">
                                {skills.filter(skill => skill.trim()).map((skill, index) => (
                                    <div key={index} className="text-xs text-gray-700">
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="page-break-inside-avoid">
                            <h3 className="font-bold mb-2 uppercase tracking-wider" style={sectionTitleStyle}>
                                Education
                            </h3>
                            <div className="space-y-2">
                                {education.map((edu, index) => (
                                    <div key={index}>
                                        <h4 className="font-medium text-gray-900 text-xs leading-tight">
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

                {/* Right Column - 2/3 width */}
                <div className="col-span-2 space-y-4">
                    {/* Dynamic Sections */}
                    {mainSections.map(sectionType => renderMainSection(sectionType)).filter(Boolean)}
                </div>
            </div>
        </div>
    );
} 