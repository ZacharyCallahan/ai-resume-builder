export default function ExecutiveTemplate({ data, customization }) {
    const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
    const {
        accentColor = '#3B82F6',
        fontFamily = 'Georgia',
        fontSize = {},
        contentPadding = 1,
        sectionOrder = ['summary', 'experience', 'education', 'skills']
    } = customization;

    // Calculate responsive font sizes
    const fontSizes = {
        header: `${fontSize?.header || 24}px`,
        subheader: `${(fontSize?.header || 24) * 0.75}px`,
        sectionTitle: `${fontSize?.sectionTitle || 16}px`,
        body: `${fontSize?.body || 14}px`,
        small: `${(fontSize?.body || 14) * 0.85}px`
    };

    const templateStyle = {
        fontFamily: fontFamily || 'Georgia',
        lineHeight: 1.4,
        fontSize: fontSizes.body,
        padding: `${contentPadding || 1}rem`
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

    // Section components
    const sections = {
        summary: () => (
            professionalSummary && (
                <section className="mb-5 page-break-inside-avoid">
                    <h3
                        className="font-bold mb-2 uppercase tracking-wide"
                        style={{ ...accentStyle, fontSize: fontSizes.sectionTitle }}
                    >
                        Executive Summary
                    </h3>
                    <p
                        className="text-gray-700 leading-relaxed"
                        style={{ fontSize: fontSizes.body }}
                    >
                        {professionalSummary}
                    </p>
                </section>
            )
        ),
        experience: () => (
            workExperience && workExperience.length > 0 && (
                <section className="mb-5 page-break-inside-avoid">
                    <h3
                        className="font-bold mb-3 uppercase tracking-wide"
                        style={{ ...accentStyle, fontSize: fontSizes.sectionTitle }}
                    >
                        Professional Experience
                    </h3>
                    <div className="space-y-4">
                        {workExperience.map((exp, index) => (
                            <div key={index} className="page-break-inside-avoid">
                                <div className="flex justify-between items-baseline mb-1">
                                    <div>
                                        <h4
                                            className="font-semibold text-gray-900"
                                            style={{ fontSize: fontSizes.body }}
                                        >
                                            {exp.position}
                                        </h4>
                                        <p
                                            className="text-gray-700 font-medium"
                                            style={{ fontSize: fontSizes.body }}
                                        >
                                            {exp.company}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p
                                            className="text-gray-600"
                                            style={{ fontSize: fontSizes.small }}
                                        >
                                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                                        </p>
                                    </div>
                                </div>
                                {(exp.bulletPoints || exp.description) && (
                                    <div
                                        className="text-gray-700 mt-1 ml-2"
                                        style={{ fontSize: fontSizes.small }}
                                    >
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
            )
        ),
        education: () => (
            education && education.length > 0 && (
                <section className="page-break-inside-avoid">
                    <h3
                        className="font-bold mb-3 uppercase tracking-wide"
                        style={{ ...accentStyle, fontSize: fontSizes.sectionTitle }}
                    >
                        Education
                    </h3>
                    <div className="space-y-2">
                        {education.map((edu, index) => (
                            <div key={index}>
                                <h4
                                    className="font-medium text-gray-900"
                                    style={{ fontSize: fontSizes.body }}
                                >
                                    {edu.degree} {edu.field && `in ${edu.field}`}
                                </h4>
                                <p
                                    className="text-gray-700"
                                    style={{ fontSize: fontSizes.small }}
                                >
                                    {edu.institution}
                                </p>
                                <p
                                    className="text-gray-600"
                                    style={{ fontSize: fontSizes.small }}
                                >
                                    {formatDate(edu.graduationDate)}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )
        ),
        skills: () => (
            skills && skills.length > 0 && (
                <section className="page-break-inside-avoid">
                    <h3
                        className="font-bold mb-3 uppercase tracking-wide"
                        style={{ ...accentStyle, fontSize: fontSizes.sectionTitle }}
                    >
                        Core Competencies
                    </h3>
                    <div className="grid grid-cols-2 gap-1">
                        {skills.filter(skill => skill.trim()).map((skill, index) => (
                            <div key={index} className="flex items-center">
                                <div
                                    className="w-1 h-1 rounded-full mr-2"
                                    style={{ backgroundColor: accentColor }}
                                />
                                <span
                                    className="text-gray-700"
                                    style={{ fontSize: fontSizes.small }}
                                >
                                    {skill}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            )
        )
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white" style={templateStyle}>
            {/* Header - Compact */}
            <header
                className="text-center mb-6 pb-4 border-b-2"
                style={{ borderColor: accentColor }}
            >
                <h1
                    className="font-bold text-gray-900 mb-1"
                    style={{ fontSize: fontSizes.header }}
                >
                    {personalInfo.fullName || 'Your Name'}
                </h1>
                <h2
                    className="font-medium mb-2"
                    style={{ ...accentStyle, fontSize: fontSizes.subheader }}
                >
                    {targetJobTitle || 'Your Target Job Title'}
                </h2>

                {/* Contact Info - Horizontal */}
                <div
                    className="flex justify-center items-center space-x-4 text-gray-600 flex-wrap"
                    style={{ fontSize: fontSizes.small }}
                >
                    {personalInfo.email && <span>{personalInfo.email}</span>}
                    {personalInfo.phone && <span>•</span>}
                    {personalInfo.phone && <span>{personalInfo.phone}</span>}
                    {personalInfo.location && <span>•</span>}
                    {personalInfo.location && <span>{personalInfo.location}</span>}
                </div>

                {(personalInfo.linkedIn || personalInfo.website) && (
                    <div
                        className="flex justify-center items-center space-x-4 text-gray-600 mt-1 flex-wrap"
                        style={{ fontSize: fontSizes.small }}
                    >
                        {personalInfo.linkedIn && <span className="break-all">{personalInfo.linkedIn}</span>}
                        {personalInfo.website && personalInfo.linkedIn && <span>•</span>}
                        {personalInfo.website && <span className="break-all">{personalInfo.website}</span>}
                    </div>
                )}
            </header>

            {/* Dynamic Section Rendering based on sectionOrder */}
            <div className="space-y-1">
                {sectionOrder.map((sectionKey, index) => {
                    const SectionComponent = sections[sectionKey];
                    return SectionComponent ? (
                        <div key={`${sectionKey}-${index}`}>
                            {SectionComponent()}
                        </div>
                    ) : null;
                })}
            </div>

            {/* Education and Skills - Two Column Layout for remaining sections not in order */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {!sectionOrder.includes('education') && sections.education()}
                {!sectionOrder.includes('skills') && sections.skills()}
            </div>
        </div>
    );
} 