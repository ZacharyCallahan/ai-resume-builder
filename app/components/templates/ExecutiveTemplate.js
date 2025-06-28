export default function ExecutiveTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Georgia',
        lineHeight: 1.4,
        fontSize: '14px'
    };

    const accentStyle = {
        color: accentColor,
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-6" style={templateStyle}>
            {/* Header - Compact */}
            <header className="text-center mb-6 pb-4 border-b-2" style={{ borderColor: accentColor }}>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-lg font-medium mb-2" style={accentStyle}>
                    {targetJobTitle || 'Your Target Job Title'}
                </h2>

                {/* Contact Info - Horizontal */}
                <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 flex-wrap">
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>

                {(personalInfo.linkedIn || personalInfo.website) && (
                    <div className="flex justify-center items-center space-x-4 text-sm text-gray-600 mt-1 flex-wrap">
                        {personalInfo.linkedIn && <span className="break-all">{personalInfo.linkedIn}</span>}
                        {personalInfo.website && personalInfo.linkedIn && <span>•</span>}
                        {personalInfo.website && <span className="break-all">{personalInfo.website}</span>}
                    </div>
                )}
            </header>

            {/* Professional Summary */}
            {professionalSummary && (
                <section className="mb-5 page-break-inside-avoid">
                    <h3 className="text-base font-bold mb-2 uppercase tracking-wide" style={accentStyle}>
                        Executive Summary
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                        {professionalSummary}
                    </p>
                </section>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="mb-5 page-break-inside-avoid">
                    <h3 className="text-base font-bold mb-3 uppercase tracking-wide" style={accentStyle}>
                        Professional Experience
                    </h3>
                    <div className="space-y-4">
                        {workExperience.map((exp, index) => (
                            <div key={index} className="page-break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 text-sm">{exp.position}</h4>
                                        <p className="text-gray-700 font-medium text-sm">{exp.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600 text-xs">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </p>
                                    </div>
                                </div>
                                {(exp.bulletPoints || exp.description) && (
                                    <div className="text-gray-700 text-xs mt-1 ml-2">
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
            )}

            {/* Education and Skills - Two Column Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Education */}
                {education && education.length > 0 && (
                    <section className="page-break-inside-avoid">
                        <h3 className="text-base font-bold mb-3 uppercase tracking-wide" style={accentStyle}>
                            Education
                        </h3>
                        <div className="space-y-2">
                            {education.map((edu, index) => (
                                <div key={index}>
                                    <h4 className="font-medium text-gray-900 text-sm">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h4>
                                    <p className="text-gray-700 text-xs">{edu.institution}</p>
                                    <p className="text-gray-600 text-xs">{formatDate(edu.graduationDate)}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Skills */}
                {skills && skills.length > 0 && (
                    <section className="page-break-inside-avoid">
                        <h3 className="text-base font-bold mb-3 uppercase tracking-wide" style={accentStyle}>
                            Core Competencies
                        </h3>
                        <div className="grid grid-cols-2 gap-1">
                            {skills.filter(skill => skill.trim()).map((skill, index) => (
                                <div key={index} className="flex items-center">
                                    <div
                                        className="w-1 h-1 rounded-full mr-2"
                                        style={{ backgroundColor: accentColor }}
                                    />
                                    <span className="text-gray-700 text-xs">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
} 