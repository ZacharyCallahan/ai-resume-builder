import { mergeResumeDataWithAI } from '../../utils/resumeDataHelper';
import AcademicTemplate from './AcademicTemplate';
import ClassicTemplate from './ClassicTemplate';
import CompactTemplate from './CompactTemplate';
import CreativeTemplate from './CreativeTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ModernTemplate from './ModernTemplate';
import TechnicalTemplate from './TechnicalTemplate';

export default function ResumeTemplate({ data, aiContent, template, customization }) {
    // Merge original data with AI content for template rendering
    const mergedData = mergeResumeDataWithAI(data, aiContent);

    const templateProps = {
        data: mergedData,
        customization
    };

    switch (template) {
        case 'modern':
            return <ModernTemplate {...templateProps} />;
        case 'minimalist':
            return <MinimalistTemplate {...templateProps} />;
        case 'classic':
            return <ClassicTemplate {...templateProps} />;
        case 'creative':
            return <CreativeTemplate {...templateProps} />;
        case 'executive':
            return <ExecutiveTemplate {...templateProps} />;
        case 'technical':
            return <TechnicalTemplate {...templateProps} />;
        case 'academic':
            return <AcademicTemplate {...templateProps} />;
        case 'compact':
            return <CompactTemplate {...templateProps} />;
        default:
            return <ModernTemplate {...templateProps} />;
    }
} 