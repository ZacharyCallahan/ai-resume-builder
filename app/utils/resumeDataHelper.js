/**
 * Merges original resume data with AI-generated content for template rendering
 * @param {Object} originalData - The original form data entered by the user
 * @param {Object} aiContent - The AI-generated content (can be null)
 * @returns {Object} - Merged data optimized for template rendering
 */
export function mergeResumeDataWithAI(originalData, aiContent) {
    if (!aiContent) {
        // No AI content, return original data with fallback descriptions
        return {
            ...originalData,
            workExperience: originalData.workExperience.map(exp => ({
                ...exp,
                bulletPoints: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
            }))
        };
    }

    // Merge original data with AI content
    return {
        ...originalData,
        // Use AI professional summary if available, otherwise use original
        professionalSummary: aiContent.professionalSummary || originalData.professionalSummary,

        // Merge work experience with AI bullet points
        workExperience: originalData.workExperience.map((exp, index) => {
            const aiWorkExp = aiContent.workExperience?.[index];
            return {
                ...exp, // Keep all original fields (position, company, dates, etc.)
                // Use AI bullet points if available, otherwise convert description to bullet points
                bulletPoints: aiWorkExp?.bulletPoints ||
                    (exp.description ? exp.description.split('\n').filter(line => line.trim()) : [])
            };
        })
    };
} 