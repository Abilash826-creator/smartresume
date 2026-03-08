import ModernTemplate from './templates/ModernTemplate';
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const TEMPLATES = {
  modern: ModernTemplate,
  professional: ProfessionalTemplate,
  minimal: MinimalTemplate,
};

export default function ResumePreview({ data }) {
  const Template = TEMPLATES[data.template] || TEMPLATES.modern;

  return (
    <div className="flex justify-center">
      <div
        id="resume-preview-content"
        style={{
          width: '210mm',
          minHeight: '297mm',
          backgroundColor: '#fff',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          borderRadius: '4px',
          overflow: 'hidden',
          transform: 'scale(0.75)',
          transformOrigin: 'top center',
          marginBottom: '-25%',
        }}
      >
        <Template data={data} />
      </div>
    </div>
  );
}
