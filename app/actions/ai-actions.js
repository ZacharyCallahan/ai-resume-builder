'use server';

import OpenAI from 'openai';

// Initialize OpenAI - you'll need to add your API key to environment variables
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
});

export async function generateResumeContent(resumeData) {
    try {
        // Format work experience for AI analysis
        const workExperienceText = resumeData.workExperience
            .map(exp => `${exp.position} at ${exp.company} (${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}): ${exp.description}`)
            .join('\n');

        const skillsText = resumeData.skills.join(', ');
        const educationText = resumeData.education
            .map(edu => `${edu.degree} in ${edu.field} from ${edu.institution}`)
            .join('\n');

        // Create a comprehensive prompt for the AI
        const prompt = `
    You are a professional resume writer expert. Based on the following information, generate compelling resume content:

    Target Job Title: ${resumeData.targetJobTitle}
    
    Work Experience:
    ${workExperienceText}
    
    Skills: ${skillsText}
    
    Education:
    ${educationText}
    
    ${resumeData.existingResume ? `Existing Resume Content:\n${resumeData.existingResume}` : ''}
    
    ${resumeData.customInstructions ? `Additional Instructions & Information:\n${resumeData.customInstructions}` : ''}

    CRITICAL RESUME WRITING RULES:
    
    1. BULLET POINT LENGTH:
       - Each bullet point must be 1-2 lines only (12-20 words maximum)
       - Recruiters spend only 6-10 seconds scanning resumes
       - Short bullets are easier to skim and more impactful
    
    2. BULLET POINT STRUCTURE:
       - Follow the formula: Action + Impact + Metric (when available)
       - Start with strong action verbs (Led, Developed, Increased, Streamlined, etc.)
       - Focus on achievements and results, not just job duties
    
    3. QUANTIFIABLE RESULTS:
       - ONLY use specific numbers/percentages if provided in the user's information
       - DO NOT invent or fabricate metrics that weren't mentioned
       - If no metrics are provided, focus on qualitative impact and achievements
       - Use phrases like "significantly improved", "successfully implemented", "effectively managed"
    
    4. CONTENT QUALITY:
       - Make each bullet point unique - avoid repetition
       - Use keywords relevant to the target job title
       - Highlight leadership, problem-solving, and business impact
       - Generate 2-4 bullet points per work experience based on role importance

    Please generate:
    1. A professional summary (2-3 sentences) that highlights the candidate's value proposition for the target role
    2. For each work experience entry, create 2-4 compelling bullet points following the above rules
    
    Format your response as JSON with the following structure:
    {
      "professionalSummary": "...",
      "workExperience": [
        {
          "bulletPoints": [
            "Action verb + specific achievement in 12-20 words",
            "Another action verb + impact + metric (if provided)",
            "Third accomplishment focused on relevant skills"
          ]
        }
      ]
    }
    
    EXAMPLES OF GOOD BULLET POINTS:
    ✅ "Resolved complex billing issues to improve customer satisfaction by 25%" (if 25% was provided)
    ✅ "Led cross-functional project that streamlined onboarding processes"
    ✅ "Implemented automated reporting system, reducing manual work significantly"
    
    EXAMPLES TO AVOID:
    ❌ "Worked closely with cross-functional teams to develop and implement comprehensive strategies..." (too long)
    ❌ "Increased sales by 45%" (if 45% wasn't provided by the user)
    ❌ "Responsible for managing various tasks and duties" (too vague)
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-4-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional resume writer with expertise in creating ATS-friendly, compelling resume content. Always respond with valid JSON."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_completion_tokens: 1500,
        });

        const response = completion.choices[0].message.content;

        try {
            // Clean the response by removing markdown code blocks if present
            const cleanedResponse = response.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
            const generatedContent = JSON.parse(cleanedResponse);
            return generatedContent;
        } catch (parseError) {
            console.error('Error parsing AI response:', parseError);
            console.error('Raw response:', response);
            throw new Error(`Failed to parse AI response: ${parseError.message}. Raw response: ${response.substring(0, 200)}...`);
        }
    } catch (error) {
        console.error('Error generating AI content:', error);
        throw new Error(`AI content generation failed: ${error.message}`);
    }
}

export async function generateCoverLetter(resumeData, jobDescription) {
    try {
        const prompt = `
    Generate a professional cover letter based on:
    
    Candidate Info:
    - Name: ${resumeData.personalInfo.fullName}
    - Target Role: ${resumeData.targetJobTitle}
    - Key Skills: ${resumeData.skills.join(', ')}
    - Recent Experience: ${resumeData.workExperience[0]?.position} at ${resumeData.workExperience[0]?.company}
    
    Job Description:
    ${jobDescription}
    
    Create a compelling 3-paragraph cover letter that:
    1. Opens with enthusiasm for the specific role
    2. Highlights relevant experience and achievements
    3. Closes with a call to action
    
    Make it professional, personalized, and ATS-friendly.
    `;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a professional career counselor specializing in writing compelling cover letters."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 800,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error generating cover letter:', error);
        throw new Error('Failed to generate cover letter');
    }
} 