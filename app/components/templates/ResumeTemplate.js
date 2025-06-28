import { mergeResumeDataWithAI } from '../../utils/resumeDataHelper';
import ClassicTemplate from './ClassicTemplate';
import CreativeTemplate from './CreativeTemplate';
import MinimalistTemplate from './MinimalistTemplate';
import ModernTemplate from './ModernTemplate';

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
        default:
            return <ModernTemplate {...templateProps} />;
    }
} 