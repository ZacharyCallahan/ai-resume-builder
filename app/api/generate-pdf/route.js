import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(request) {
  try {
    const { resumeData, aiGeneratedContent, selectedTemplate, customization } = await request.json();

    // Generate HTML content for the resume
    const html = generateResumeHTML(resumeData, aiGeneratedContent, selectedTemplate, customization);

    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Set the HTML content
    await page.setContent(html, {
      waitUntil: 'networkidle0',
    });

    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in',
      },
    });

    await browser.close();

    // Return the PDF as a response
    return new NextResponse(pdf, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${resumeData.personalInfo.fullName || 'Resume'}_Resume.pdf"`,
      },
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

function generateResumeHTML(originalData, aiContent, template, customization) {
  // Import the helper function locally in this server-side function
  const mergeResumeDataWithAI = (originalData, aiContent) => {
    if (!aiContent) {
      return {
        ...originalData,
        workExperience: originalData.workExperience.map(exp => ({
          ...exp,
          bulletPoints: exp.description ? exp.description.split('\n').filter(line => line.trim()) : []
        }))
      };
    }

    return {
      ...originalData,
      professionalSummary: aiContent.professionalSummary || originalData.professionalSummary,
      workExperience: originalData.workExperience.map((exp, index) => {
        const aiWorkExp = aiContent.workExperience?.[index];
        return {
          ...exp,
          bulletPoints: aiWorkExp?.bulletPoints ||
            (exp.description ? exp.description.split('\n').filter(line => line.trim()) : [])
        };
      })
    };
  };

  // Merge the data for PDF generation
  const data = mergeResumeDataWithAI(originalData, aiContent);
  const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;
  const { accentColor, fontFamily } = customization;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const date = new Date(year, month - 1);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Helper function to render work experience content
  const renderWorkExperienceContent = (exp, style = '') => {
    if (exp.bulletPoints && exp.bulletPoints.length > 0) {
      return `
                <div style="color: #374151; font-size: 0.9rem; ${style}">
                    ${exp.bulletPoints.map(point =>
        `<p style="margin-bottom: 0.25rem;">• ${point}</p>`
      ).join('')}
                </div>
            `;
    } else if (exp.description) {
      return `
                <div style="color: #374151; font-size: 0.9rem; ${style}">
                    ${exp.description.split('\n').map(line =>
        `<p style="margin-bottom: 0.25rem;">${line.trim().startsWith('•') ? line : `• ${line}`}</p>`
      ).join('')}
                </div>
            `;
    }
    return '';
  };

  // Base styles
  const baseStyles = `
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        font-family: ${fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        line-height: 1.5;
        color: #374151;
        background: white;
      }
      
      .container {
        max-width: 210mm;
        margin: 0 auto;
        background: white;
      }
      
      .accent-color {
        color: ${accentColor};
      }
      
      .accent-bg {
        background-color: ${accentColor};
      }
      
      .accent-border {
        border-color: ${accentColor};
      }
      
      h1, h2, h3, h4, h5, h6 {
        margin-bottom: 0.5rem;
      }
      
      p {
        margin-bottom: 0.5rem;
      }
      
      .section {
        margin-bottom: 1.5rem;
      }
      
      .section-title {
        font-size: 1.1rem;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 1rem;
        color: ${accentColor};
      }
    </style>
  `;

  // Generate template-specific HTML
  let templateHTML = '';

  switch (template) {
    case 'modern':
      templateHTML = generateModernHTML(data, accentColor, formatDate, renderWorkExperienceContent);
      break;
    case 'minimalist':
      templateHTML = generateMinimalistHTML(data, accentColor, formatDate, renderWorkExperienceContent);
      break;
    case 'classic':
      templateHTML = generateClassicHTML(data, accentColor, formatDate, renderWorkExperienceContent);
      break;
    case 'creative':
      templateHTML = generateCreativeHTML(data, accentColor, formatDate, renderWorkExperienceContent);
      break;
    default:
      templateHTML = generateModernHTML(data, accentColor, formatDate, renderWorkExperienceContent);
  }

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resume</title>
      ${baseStyles}
    </head>
    <body>
      <div class="container">
        ${templateHTML}
      </div>
    </body>
    </html>
  `;
}

function generateModernHTML(data, accentColor, formatDate, renderWorkExperienceContent) {
  const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;

  return `
    <div style="display: flex; min-height: 297mm;">
      <!-- Left Column -->
      <div style="width: 65%; padding: 2rem; padding-right: 1rem;">
        <!-- Header -->
        <div style="border-bottom: 4px solid ${accentColor}; padding-bottom: 1.5rem; margin-bottom: 2rem;">
          <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem;">
            ${personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 style="font-size: 1.5rem; color: ${accentColor}; margin-bottom: 1rem;">
            ${targetJobTitle || 'Your Target Job Title'}
          </h2>
        </div>

        ${professionalSummary ? `
        <div class="section">
          <h3 class="section-title">Professional Summary</h3>
          <p style="line-height: 1.6;">${professionalSummary}</p>
        </div>
        ` : ''}

        ${workExperience && workExperience.length > 0 ? `
        <div class="section">
          <h3 class="section-title">Professional Experience</h3>
          ${workExperience.map(exp => `
            <div style="margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                <div>
                  <h4 style="font-size: 1.1rem; font-weight: 600;">${exp.position}</h4>
                  <p style="font-weight: 500; color: #6B7280;">${exp.company}</p>
                </div>
                <div style="text-align: right;">
                  <p style="color: #6B7280; font-size: 0.9rem;">
                    ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                </div>
              </div>
              ${renderWorkExperienceContent(exp)}
            </div>
          `).join('')}
        </div>
        ` : ''}

        ${education && education.length > 0 ? `
        <div class="section">
          <h3 class="section-title">Education</h3>
          ${education.map(edu => `
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
              <div>
                <h4 style="font-weight: 600;">${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</h4>
                <p style="color: #6B7280;">${edu.institution}</p>
              </div>
              <div style="text-align: right; color: #6B7280; font-size: 0.9rem;">
                <p>${formatDate(edu.graduationDate)}</p>
                ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
        ` : ''}
      </div>

      <!-- Right Column -->
      <div style="width: 35%; background-color: #F9FAFB; padding: 2rem; padding-left: 1rem;">
        <!-- Contact -->
        <div class="section">
          <h3 class="section-title">Contact</h3>
          <div style="font-size: 0.9rem;">
            ${personalInfo.email ? `<p style="margin-bottom: 0.5rem;">${personalInfo.email}</p>` : ''}
            ${personalInfo.phone ? `<p style="margin-bottom: 0.5rem;">${personalInfo.phone}</p>` : ''}
            ${personalInfo.location ? `<p style="margin-bottom: 0.5rem;">${personalInfo.location}</p>` : ''}
            ${personalInfo.linkedIn ? `<p style="margin-bottom: 0.5rem; word-break: break-all;">${personalInfo.linkedIn}</p>` : ''}
            ${personalInfo.website ? `<p style="margin-bottom: 0.5rem; word-break: break-all;">${personalInfo.website}</p>` : ''}
          </div>
        </div>

        ${skills && skills.length > 0 ? `
        <div class="section">
          <h3 class="section-title">Skills</h3>
          <div>
            ${skills.filter(skill => skill.trim()).map(skill => `
              <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <div style="width: 8px; height: 8px; background-color: ${accentColor}; border-radius: 50%; margin-right: 0.75rem;"></div>
                <span style="font-size: 0.9rem;">${skill}</span>
              </div>
            `).join('')}
          </div>
        </div>
        ` : ''}
      </div>
    </div>
  `;
}

function generateMinimalistHTML(data, accentColor, formatDate, renderWorkExperienceContent) {
  const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;

  return `
    <div style="padding: 2rem;">
      <!-- Header -->
      <header style="text-align: center; border-bottom: 1px solid #D1D5DB; padding-bottom: 2rem; margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.75rem;">
          ${personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 style="font-size: 1.25rem; color: ${accentColor}; margin-bottom: 1rem;">
          ${targetJobTitle || 'Your Target Job Title'}
        </h2>
        
        <div style="font-size: 0.9rem; color: #6B7280;">
          ${[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' • ')}
        </div>
        
        ${(personalInfo.linkedIn || personalInfo.website) ? `
        <div style="font-size: 0.9rem; color: #6B7280; margin-top: 0.5rem;">
          ${[personalInfo.linkedIn, personalInfo.website].filter(Boolean).join(' • ')}
        </div>
        ` : ''}
      </header>

      ${professionalSummary ? `
      <section class="section">
        <h3 style="font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${accentColor}; margin-bottom: 0.75rem;">
          Professional Summary
        </h3>
        <p style="line-height: 1.6;">${professionalSummary}</p>
      </section>
      ` : ''}

      ${workExperience && workExperience.length > 0 ? `
      <section class="section">
        <h3 style="font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${accentColor}; margin-bottom: 1rem;">
          Professional Experience
        </h3>
        ${workExperience.map(exp => `
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.5rem;">
              <div>
                <h4 style="font-size: 1.1rem; font-weight: 500;">${exp.position}</h4>
                <p style="color: #6B7280;">${exp.company}</p>
              </div>
              <div style="text-align: right;">
                <p style="color: #6B7280; font-size: 0.9rem;">
                  ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
            </div>
            ${renderWorkExperienceContent(exp)}
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${education && education.length > 0 ? `
      <section class="section">
        <h3 style="font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${accentColor}; margin-bottom: 1rem;">
          Education
        </h3>
        ${education.map(edu => `
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;">
            <div>
              <h4 style="font-weight: 500;">${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</h4>
              <p style="color: #6B7280;">${edu.institution}</p>
            </div>
            <div style="text-align: right; color: #6B7280; font-size: 0.9rem;">
              <p>${formatDate(edu.graduationDate)}</p>
              ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${skills && skills.length > 0 ? `
      <section class="section">
        <h3 style="font-size: 1.1rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: ${accentColor}; margin-bottom: 1rem;">
          Skills
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${skills.filter(skill => skill.trim()).map(skill => `
            <span style="padding: 0.25rem 0.75rem; background-color: #F3F4F6; border-radius: 9999px; font-size: 0.9rem;">
              ${skill}
            </span>
          `).join('')}
        </div>
      </section>
      ` : ''}
    </div>
  `;
}

function generateClassicHTML(data, accentColor, formatDate, renderWorkExperienceContent) {
  const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;

  return `
    <div style="padding: 2rem; font-family: Georgia, serif;">
      <!-- Header -->
      <header style="text-align: center; margin-bottom: 2rem;">
        <h1 style="font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem;">
          ${personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 style="font-size: 1.1rem; color: ${accentColor}; margin-bottom: 1rem;">
          ${targetJobTitle || 'Your Target Job Title'}
        </h2>
        
        <div style="font-size: 0.9rem; color: #374151;">
          ${personalInfo.email ? `<div>${personalInfo.email}</div>` : ''}
          ${personalInfo.phone ? `<div>${personalInfo.phone}</div>` : ''}
          ${personalInfo.location ? `<div>${personalInfo.location}</div>` : ''}
          ${personalInfo.linkedIn ? `<div style="word-break: break-all;">${personalInfo.linkedIn}</div>` : ''}
          ${personalInfo.website ? `<div style="word-break: break-all;">${personalInfo.website}</div>` : ''}
        </div>
        
        <hr style="margin-top: 1.5rem; border: 1px solid #9CA3AF;" />
      </header>

      ${professionalSummary ? `
      <section style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.1rem; font-weight: bold; text-align: center; color: ${accentColor}; margin-bottom: 0.75rem;">
          PROFESSIONAL SUMMARY
        </h3>
        <p style="text-align: center; line-height: 1.6; font-style: italic;">${professionalSummary}</p>
      </section>
      ` : ''}

      ${workExperience && workExperience.length > 0 ? `
      <section style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.1rem; font-weight: bold; text-align: center; color: ${accentColor}; margin-bottom: 1rem;">
          PROFESSIONAL EXPERIENCE
        </h3>
        ${workExperience.map(exp => `
          <div style="margin-bottom: 1.25rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; border-bottom: 1px solid #E5E7EB; padding-bottom: 0.25rem;">
              <div>
                <h4 style="font-weight: bold;">${exp.position}</h4>
                <p style="font-style: italic; font-weight: 500; color: #6B7280;">${exp.company}</p>
              </div>
              <div style="text-align: right;">
                <p style="color: #6B7280; font-size: 0.9rem;">
                  ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                </p>
              </div>
            </div>
            ${renderWorkExperienceContent(exp, 'margin-top: 0.5rem; margin-left: 1rem;')}
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${education && education.length > 0 ? `
      <section style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.1rem; font-weight: bold; text-align: center; color: ${accentColor}; margin-bottom: 1rem;">
          EDUCATION
        </h3>
        ${education.map(edu => `
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem;">
            <div>
              <h4 style="font-weight: bold;">${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</h4>
              <p style="font-style: italic; color: #6B7280;">${edu.institution}</p>
            </div>
            <div style="text-align: right; color: #6B7280; font-size: 0.9rem;">
              <p>${formatDate(edu.graduationDate)}</p>
              ${edu.gpa ? `<p>GPA: ${edu.gpa}</p>` : ''}
            </div>
          </div>
        `).join('')}
      </section>
      ` : ''}

      ${skills && skills.length > 0 ? `
      <section style="margin-bottom: 1.5rem;">
        <h3 style="font-size: 1.1rem; font-weight: bold; text-align: center; color: ${accentColor}; margin-bottom: 1rem;">
          SKILLS & COMPETENCIES
        </h3>
        <div style="text-align: center;">
          <p>${skills.filter(skill => skill.trim()).join(' • ')}</p>
        </div>
      </section>
      ` : ''}
    </div>
  `;
}

function generateCreativeHTML(data, accentColor, formatDate, renderWorkExperienceContent) {
  const { personalInfo, targetJobTitle, professionalSummary, workExperience, education, skills } = data;

  return `
    <div style="font-family: Montserrat, sans-serif;">
      <!-- Header -->
      <header style="background-color: ${accentColor}; color: white; padding: 2rem; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; right: 0; width: 16rem; height: 16rem; background-color: rgba(255,255,255,0.1); border-radius: 50%; transform: translate(8rem, -8rem);"></div>
        <div style="position: absolute; bottom: 0; left: 0; width: 12rem; height: 12rem; background-color: rgba(255,255,255,0.1); border-radius: 50%; transform: translate(-6rem, 6rem);"></div>
        <div style="position: relative; z-index: 10;">
          <h1 style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem;">
            ${personalInfo.fullName || 'Your Name'}
          </h1>
          <h2 style="font-size: 1.25rem; font-weight: 300; margin-bottom: 1.5rem; opacity: 0.9;">
            ${targetJobTitle || 'Your Target Job Title'}
          </h2>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; font-size: 0.9rem; opacity: 0.9;">
            <div>
              ${personalInfo.email ? `<div style="margin-bottom: 0.25rem;">📧 ${personalInfo.email}</div>` : ''}
              ${personalInfo.phone ? `<div style="margin-bottom: 0.25rem;">📱 ${personalInfo.phone}</div>` : ''}
            </div>
            <div>
              ${personalInfo.location ? `<div style="margin-bottom: 0.25rem;">📍 ${personalInfo.location}</div>` : ''}
              ${personalInfo.linkedIn ? `<div style="margin-bottom: 0.25rem;">🔗 LinkedIn</div>` : ''}
              ${personalInfo.website ? `<div style="margin-bottom: 0.25rem;">🌐 Portfolio</div>` : ''}
            </div>
          </div>
        </div>
      </header>

      <div style="padding: 2rem;">
        ${professionalSummary ? `
        <section style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; margin-bottom: 1rem;">
            <div style="width: 2rem; height: 2rem; background-color: ${accentColor}; border-radius: 50%; margin-right: 0.75rem;"></div>
            <h3 style="font-size: 1.25rem; font-weight: bold; color: ${accentColor};">About Me</h3>
          </div>
          <p style="line-height: 1.6; padding-left: 2.75rem; border-left: 4px solid #E5E7EB;">
            ${professionalSummary}
          </p>
        </section>
        ` : ''}

        ${workExperience && workExperience.length > 0 ? `
        <section style="margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
            <div style="width: 2rem; height: 2rem; background-color: ${accentColor}; border-radius: 50%; margin-right: 0.75rem;"></div>
            <h3 style="font-size: 1.25rem; font-weight: bold; color: ${accentColor};">Experience</h3>
          </div>
          <div style="padding-left: 2.75rem;">
            ${workExperience.map(exp => `
              <div style="position: relative; margin-bottom: 1.5rem;">
                <div style="position: absolute; left: -2.75rem; top: 0.5rem; width: 0.75rem; height: 0.75rem; background-color: ${accentColor}; border-radius: 50%;"></div>
                <div style="background-color: #F9FAFB; padding: 1rem; border-radius: 0.5rem; border-left: 4px solid ${accentColor};">
                  <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                    <div>
                      <h4 style="font-size: 1.1rem; font-weight: 600;">${exp.position}</h4>
                      <p style="font-weight: 500; color: ${accentColor};">${exp.company}</p>
                    </div>
                    <div>
                      <span style="padding: 0.25rem 0.5rem; background-color: white; border-radius: 0.25rem; font-size: 0.8rem; color: #6B7280;">
                        ${formatDate(exp.startDate)} - ${exp.current ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  ${renderWorkExperienceContent(exp)}
                </div>
              </div>
            `).join('')}
          </div>
        </section>
        ` : ''}

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
          ${education && education.length > 0 ? `
          <section>
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
              <div style="width: 1.5rem; height: 1.5rem; background-color: ${accentColor}; border-radius: 50%; margin-right: 0.5rem;"></div>
              <h3 style="font-size: 1.1rem; font-weight: bold; color: ${accentColor};">Education</h3>
            </div>
            ${education.map(edu => `
              <div style="border-left: 2px solid #E5E7EB; padding-left: 1rem; margin-bottom: 0.75rem;">
                <h4 style="font-weight: 600;">${edu.degree} ${edu.field ? `in ${edu.field}` : ''}</h4>
                <p style="color: #6B7280; font-size: 0.9rem;">${edu.institution}</p>
                <p style="color: #9CA3AF; font-size: 0.8rem;">${formatDate(edu.graduationDate)}</p>
              </div>
            `).join('')}
          </section>
          ` : ''}

          ${skills && skills.length > 0 ? `
          <section>
            <div style="display: flex; align-items: center; margin-bottom: 1rem;">
              <div style="width: 1.5rem; height: 1.5rem; background-color: ${accentColor}; border-radius: 50%; margin-right: 0.5rem;"></div>
              <h3 style="font-size: 1.1rem; font-weight: bold; color: ${accentColor};">Skills</h3>
            </div>
            ${skills.filter(skill => skill.trim()).map(skill => `
              <div style="display: flex; align-items: center; margin-bottom: 0.5rem;">
                <div style="width: 0.5rem; height: 0.5rem; background-color: ${accentColor}; border-radius: 50%; margin-right: 0.5rem;"></div>
                <span style="font-size: 0.9rem;">${skill}</span>
              </div>
            `).join('')}
          </section>
          ` : ''}
        </div>
      </div>
    </div>
  `;
} 