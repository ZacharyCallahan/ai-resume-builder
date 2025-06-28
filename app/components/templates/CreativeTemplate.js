export default function CreativeTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily, fontSize, contentPadding, sectionOrder } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Montserrat',
        lineHeight: 1.5,
        fontSize: `${fontSize?.body || 14}px`,
    };

    const headerStyle = {
        fontSize: `${fontSize?.header || 32}px`,
    };

    const sectionTitleStyle = {
        fontSize: `${fontSize?.sectionTitle || 20}px`,
        color: accentColor,
    };

    const accentStyle = {
        color: accentColor,
    };

    const accentBgStyle = {
        backgroundColor: accentColor,
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
                        <div className="flex items-center mb-4">
                            <div className="w-8 h-8 rounded-full mr-3" style={accentBgStyle}></div>
                            <h3 className="font-bold" style={sectionTitleStyle}>
                                About Me
                            </h3>
                        </div>
                        <p className="text-gray-700 leading-relaxed pl-11 border-l-4 border-gray-200">
                            {professionalSummary}
                        </p>
                    </section>
                ) : null;

            case 'experience':
                return workExperience && workExperience.length > 0 ? (
                    <section className="mb-8" key="experience">
                        <div className="flex items-center mb-6">
                            <div className="w-8 h-8 rounded-full mr-3" style={accentBgStyle}></div>
                            <h3 className="font-bold" style={sectionTitleStyle}>
                                Experience
                            </h3>
                        </div>
                        <div className="space-y-6 pl-11">
                            {workExperience.map((exp, index) => (
                                <div key={index} className="relative">
                                    <div
                                        className="absolute -left-11 top-2 w-3 h-3 rounded-full"
                                        style={accentBgStyle}
                                    ></div>
                                    <div className="bg-gray-50 p-4 rounded-lg border-l-4" style={{ borderColor: accentColor }}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="text-lg font-semibold text-gray-900">{exp.position}</h4>
                                                <p className="font-medium" style={accentStyle}>{exp.company}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="px-2 py-1 bg-white rounded text-xs text-gray-600">
                                                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                                </span>
                                            </div>
                                        </div>
                                        {(exp.bulletPoints || exp.description) && (
                                            <div className="text-gray-700 text-sm mt-2">
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
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'education':
                return education && education.length > 0 ? (
                    <section className="mb-8" key="education">
                        <div className="flex items-center mb-4">
                            <div className="w-6 h-6 rounded-full mr-2" style={accentBgStyle}></div>
                            <h3 className="font-bold" style={sectionTitleStyle}>
                                Education
                            </h3>
                        </div>
                        <div className="space-y-3">
                            {education.map((edu, index) => (
                                <div key={index} className="border-l-2 border-gray-200 pl-4">
                                    <h4 className="font-semibold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h4>
                                    <p className="text-gray-700 text-sm">{edu.institution}</p>
                                    <p className="text-gray-600 text-xs">{formatDate(edu.graduationDate)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section className="mb-8" key="skills">
                        <div className="flex items-center mb-4">
                            <div className="w-6 h-6 rounded-full mr-2" style={accentBgStyle}></div>
                            <h3 className="font-bold" style={sectionTitleStyle}>
                                Skills
                            </h3>
                        </div>
                        <div className="space-y-2">
                            {skills.filter(skill => skill.trim()).map((skill, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className="w-2 h-2 rounded-full mr-2"
                                        style={accentBgStyle}
                                    />
                                    <span className="text-gray-700 text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            default:
                return null;
        }
    };

    const sectionsToRender = sectionOrder || ['summary', 'experience', 'education', 'skills'];

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            {/* Header with accent background */}
            <header className="text-white p-8 relative overflow-hidden" style={accentBgStyle}>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full transform translate-x-32 -translate-y-32"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full transform -translate-x-24 translate-y-24"></div>
                </div>
                <div className="relative z-10">
                    <h1 className="font-bold mb-2" style={headerStyle}>
                        {personalInfo.fullName || 'Your Name'}
                    </h1>
                    <h2 className="text-xl font-light mb-6 opacity-90">
                        {targetJobTitle || 'Your Target Job Title'}
                    </h2>

                    {/* Contact Information */}
                    <div className="grid grid-cols-2 gap-4 text-sm opacity-90">
                        <div>
                            {personalInfo.email && <div className="mb-1">📧 {personalInfo.email}</div>}
                            {personalInfo.phone && <div className="mb-1">📱 {personalInfo.phone}</div>}
                        </div>
                        <div>
                            {personalInfo.location && <div className="mb-1">📍 {personalInfo.location}</div>}
                            {personalInfo.linkedIn && <div className="mb-1 break-all">🔗 LinkedIn</div>}
                            {personalInfo.website && <div className="mb-1 break-all">🌐 Portfolio</div>}
                        </div>
                    </div>
                </div>
            </header>

            <div style={{ padding: containerPadding }}>
                {/* Dynamic Sections */}
                {sectionsToRender.map(sectionType => renderSection(sectionType))}
            </div>
        </div>
    );
} 