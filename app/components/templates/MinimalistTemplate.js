export default function MinimalistTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily, fontSize, contentPadding, sectionOrder } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Inter',
        lineHeight: 1.6,
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
                        <h3 className="font-semibold mb-3 uppercase tracking-wider" style={sectionTitleStyle}>
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
                        <h3 className="font-semibold mb-4 uppercase tracking-wider" style={sectionTitleStyle}>
                            Professional Experience
                        </h3>
                        <div className="space-y-6">
                            {workExperience.map((exp, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-2">
                                        <div>
                                            <h4 className="text-lg font-medium text-gray-900">{exp.position}</h4>
                                            <p className="text-gray-700">{exp.company}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-gray-600 text-sm">
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
                        <h3 className="font-semibold mb-4 uppercase tracking-wider" style={sectionTitleStyle}>
                            Education
                        </h3>
                        <div className="space-y-3">
                            {education.map((edu, index) => (
                                <div key={index} className="flex justify-between items-baseline">
                                    <div>
                                        <h4 className="font-medium text-gray-900">
                                            {edu.degree} {edu.field && `in ${edu.field}`}
                                        </h4>
                                        <p className="text-gray-700">{edu.institution}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600 text-sm">{formatDate(edu.graduationDate)}</p>
                                        {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ) : null;

            case 'skills':
                return skills && skills.length > 0 ? (
                    <section className="mb-8" key="skills">
                        <h3 className="font-semibold mb-4 uppercase tracking-wider" style={sectionTitleStyle}>
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {skills.filter(skill => skill.trim()).map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
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
        <div className="w-full max-w-4xl mx-auto bg-white" style={{ ...templateStyle, padding: containerPadding }}>
            {/* Header */}
            <header className="text-center border-b border-gray-300 pb-8 mb-8">
                <h1 className="font-bold text-gray-900 mb-3" style={headerStyle}>
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-xl font-medium mb-4" style={accentStyle}>
                    {targetJobTitle || 'Your Target Job Title'}
                </h2>

                {/* Contact Info */}
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 flex-wrap">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>

                {(personalInfo.linkedIn || personalInfo.website) && (
                    <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 mt-2 flex-wrap">
                        {personalInfo.linkedIn && <span className="break-all">{personalInfo.linkedIn}</span>}
                        {personalInfo.website && personalInfo.linkedIn && <span>•</span>}
                        {personalInfo.website && <span className="break-all">{personalInfo.website}</span>}
                    </div>
                )}
            </header>

            {/* Dynamic Sections */}
            {sectionsToRender.map(sectionType => renderSection(sectionType))}
        </div>
    );
} 