import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles, ArrowLeft, Save, Download, Eye, EyeOff, Layout } from 'lucide-react';
import { getResumeById, createResume, updateResume } from '../api';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import ResumeForm from '../components/resume/ResumeForm';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateSelector from '../components/resume/TemplateSelector';

const defaultResume = {
  title: 'My Resume',
  template: 'modern',
  personalInfo: { fullName: '', email: '', phone: '', linkedin: '', github: '', address: '', objective: '' },
  education: [{ collegeName: '', degree: '', year: '', gpa: '' }],
  skills: [],
  projects: [{ title: '', description: '', technologies: '', link: '' }],
  experience: [],
};

export default function ResumeBuilderPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [resumeData, setResumeData] = useState(defaultResume);
  const [loading, setLoading] = useState(!!id);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const previewRef = useRef(null);

  const steps = ['Personal', 'Education', 'Skills', 'Projects', 'Experience'];

  useEffect(() => {
    if (id) {
      getResumeById(id)
        .then(res => {
          const r = res.data.resume;
          setResumeData({
            title: r.title || 'My Resume',
            template: r.template || 'modern',
            personalInfo: { ...defaultResume.personalInfo, ...r.personalInfo },
            education: r.education?.length ? r.education : defaultResume.education,
            skills: r.skills || [],
            projects: r.projects?.length ? r.projects : defaultResume.projects,
            experience: r.experience || [],
          });
        })
        .catch(() => {
          toast.error('Failed to load resume');
          navigate('/dashboard');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      if (id) {
        await updateResume(id, resumeData);
        toast.success('Resume saved!');
      } else {
        const res = await createResume(resumeData);
        toast.success('Resume created!');
        navigate(`/resume/${res.data.resume._id}`, { replace: true });
      }
    } catch {
      toast.error('Failed to save resume');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async () => {
    const element = document.getElementById('resume-preview-content');
    if (!element) {
      toast.error('Please open the preview first');
      setShowPreview(true);
      return;
    }
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const name = resumeData.personalInfo.fullName || 'Resume';
      const opt = {
        margin: 0,
        filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      };
      toast.loading('Generating PDF...', { id: 'pdf' });
      await html2pdf().set(opt).from(element).save();
      toast.success('PDF downloaded!', { id: 'pdf' });
    } catch (err) {
      toast.error('PDF generation failed', { id: 'pdf' });
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-ink-900 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-ink-600 border-t-volt-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ink-900 flex flex-col">
      {/* Top bar */}
      <header className="bg-ink-800 border-b border-ink-700 px-6 py-3 flex items-center gap-4 sticky top-0 z-30">
        <Link to="/dashboard" className="flex items-center gap-1.5 text-ink-400 hover:text-ink-200 text-sm transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Dashboard
        </Link>
        <div className="h-4 w-px bg-ink-600" />

        {/* Title input */}
        <input
          type="text"
          value={resumeData.title}
          onChange={(e) => setResumeData(p => ({ ...p, title: e.target.value }))}
          className="bg-transparent text-ink-100 font-semibold text-sm focus:outline-none border-b border-transparent focus:border-ink-500 transition-colors py-0.5 min-w-0 flex-1 max-w-xs"
          placeholder="Resume title..."
        />

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setShowTemplates(!showTemplates)}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            <Layout className="w-3.5 h-3.5" />
            Template
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-ghost text-xs flex items-center gap-1.5"
          >
            {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showPreview ? 'Hide' : 'Preview'}
          </button>
          <button
            onClick={handleDownload}
            className="btn-secondary text-xs flex items-center gap-1.5 py-2 px-3"
          >
            <Download className="w-3.5 h-3.5" />
            PDF
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn-primary text-xs flex items-center gap-1.5 py-2 px-4"
          >
            {saving
              ? <div className="w-3 h-3 border border-ink-900/30 border-t-ink-900 rounded-full animate-spin" />
              : <Save className="w-3.5 h-3.5" />}
            Save
          </button>
        </div>
      </header>

      {/* Template selector overlay */}
      {showTemplates && (
        <TemplateSelector
          current={resumeData.template}
          onSelect={(t) => { setResumeData(p => ({ ...p, template: t })); setShowTemplates(false); }}
          onClose={() => setShowTemplates(false)}
        />
      )}

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Form panel */}
        <div className={`${showPreview ? 'w-1/2' : 'w-full max-w-3xl mx-auto'} flex flex-col border-r border-ink-700 overflow-y-auto transition-all duration-300`}>
          {/* Step tabs */}
          <div className="bg-ink-800/50 border-b border-ink-700 px-6 py-3">
            <div className="flex gap-1">
              {steps.map((s, i) => (
                <button
                  key={s}
                  onClick={() => setActiveStep(i)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeStep === i
                      ? 'bg-volt-400 text-ink-900'
                      : 'text-ink-400 hover:text-ink-200 hover:bg-ink-700'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 p-6">
            <ResumeForm
              data={resumeData}
              onChange={setResumeData}
              activeStep={activeStep}
              onStepChange={setActiveStep}
              totalSteps={steps.length}
            />
          </div>
        </div>

        {/* Preview panel */}
        {showPreview && (
          <div className="w-1/2 overflow-y-auto bg-ink-950 p-6" ref={previewRef}>
            <div className="sticky top-0 z-10 bg-ink-950/80 backdrop-blur-sm pb-4 mb-4 flex items-center justify-between">
              <p className="text-xs text-ink-400 font-medium uppercase tracking-wider">Live Preview</p>
              <button onClick={handleDownload} className="btn-primary text-xs flex items-center gap-1.5 py-1.5 px-3">
                <Download className="w-3 h-3" />
                Download PDF
              </button>
            </div>
            <ResumePreview data={resumeData} />
          </div>
        )}
      </div>
    </div>
  );
}
