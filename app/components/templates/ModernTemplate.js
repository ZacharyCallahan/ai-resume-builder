export default function ModernTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const { accentColor, fontFamily } = customization;

    const templateStyle = {
        fontFamily: fontFamily || 'Inter',
        lineHeight: 1.5,
    };

    const accentStyle = {
        color: accentColor,
    };

    const accentBorderStyle = {
        borderColor: accentColor,
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month] = dateString.split('-');
        const date = new Date(year, month - 1);
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            <div className="flex min-h-screen">
                {/* Left Column - Main Content */}
                <div className="w-2/3 p-8">
                    {/* Header */}
                    <div className="border-b-4 pb-6 mb-8" style={accentBorderStyle}>
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">
                            {personalInfo.fullName || 'Your Name'}
                        </h1>
                        <h2 className="text-2xl font-semibold mb-4" style={accentStyle}>
                            {targetJobTitle || 'Your Target Job Title'}
                        </h2>
                    </div>

                    {/* Professional Summary */}
                    {professionalSummary && (
                        <section className="mb-8">
                            <h3 className="text-xl font-bold mb-3 uppercase tracking-wide" style={accentStyle}>
                                Professional Summary
                            </h3>
                            <p className="text-gray-700 leading-relaxed">
                                {professionalSummary}
                            </p>
                        </section>
                    )}

                    {/* Work Experience */}
                    {workExperience && workExperience.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={accentStyle}>
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
                    )}

                    {/* Education */}
                    {education && education.length > 0 && (
                        <section className="mb-8">
                            <h3 className="text-xl font-bold mb-4 uppercase tracking-wide" style={accentStyle}>
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
                    )}
                </div>

                {/* Right Column - Sidebar */}
                <div className="w-1/3 bg-gray-50 p-8">
                    {/* Contact Information */}
                    <section className="mb-8">
                        <h3 className="text-lg font-bold mb-4 uppercase tracking-wide" style={accentStyle}>
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
                            <h3 className="text-lg font-bold mb-4 uppercase tracking-wide" style={accentStyle}>
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