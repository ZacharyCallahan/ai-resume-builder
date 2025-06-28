export default function ClassicTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Georgia',
        lineHeight: 1.5,
    };

    const accentStyle = {
        color: accentColor,
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-8" style={templateStyle}>
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2 className="text-lg mb-4" style={accentStyle}>
                    {targetJobTitle || 'Your Target Job Title'}
                </h2>

                {/* Contact Information */}
                <div className="text-sm text-gray-700 space-y-1">
                    {personalInfo.email && <div>{personalInfo.email}</div>}
                    {personalInfo.phone && <div>{personalInfo.phone}</div>}
                    {personalInfo.location && <div>{personalInfo.location}</div>}
                    {personalInfo.linkedIn && <div className="break-all">{personalInfo.linkedIn}</div>}
                    {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
                </div>

                <hr className="mt-6 border-gray-400" />
            </header>

            {/* Professional Summary */}
            {professionalSummary && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-3 text-center" style={accentStyle}>
                        PROFESSIONAL SUMMARY
                    </h3>
                    <p className="text-gray-700 text-center leading-relaxed italic">
                        {professionalSummary}
                    </p>
                </section>
            )}

            {/* Work Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-4 text-center" style={accentStyle}>
                        PROFESSIONAL EXPERIENCE
                    </h3>
                    <div className="space-y-5">
                        {workExperience.map((exp, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-baseline border-b border-gray-200 pb-1">
                                    <div>
                                        <h4 className="text-base font-bold text-gray-900">{exp.position}</h4>
                                        <p className="text-gray-700 font-medium italic">{exp.company}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-600 text-sm">
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </p>
                                    </div>
                                </div>
                                {(exp.bulletPoints || exp.description) && (
                                    <div className="text-gray-700 mt-2 text-sm">
                                        {exp.bulletPoints ? (
                                            exp.bulletPoints.map((point, pointIndex) => (
                                                <p key={pointIndex} className="mb-1 ml-4">
                                                    • {point}
                                                </p>
                                            ))
                                        ) : (
                                            exp.description.split('\n').map((line, lineIndex) => (
                                                <p key={lineIndex} className="mb-1 ml-4">
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

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-4 text-center" style={accentStyle}>
                        EDUCATION
                    </h3>
                    <div className="space-y-3">
                        {education.map((edu, index) => (
                            <div key={index} className="flex justify-between items-baseline">
                                <div>
                                    <h4 className="font-bold text-gray-900">
                                        {edu.degree} {edu.field && `in ${edu.field}`}
                                    </h4>
                                    <p className="text-gray-700 italic">{edu.institution}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-gray-600 text-sm">{formatDate(edu.graduationDate)}</p>
                                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mb-6">
                    <h3 className="text-lg font-bold mb-4 text-center" style={accentStyle}>
                        SKILLS & COMPETENCIES
                    </h3>
                    <div className="text-center">
                        <p className="text-gray-700">
                            {skills.filter(skill => skill.trim()).join(' • ')}
                        </p>
                    </div>
                </section>
            )}
        </div>
    );
} 