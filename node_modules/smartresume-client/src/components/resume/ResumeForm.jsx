import { useState } from 'react';
import { Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import AIImproveButton from './AIImproveButton';

export default function ResumeForm({ data, onChange, activeStep, onStepChange, totalSteps }) {
  const update = (field, value) => onChange(prev => ({ ...prev, [field]: value }));
  const updatePersonal = (field, value) => onChange(prev => ({
    ...prev, personalInfo: { ...prev.personalInfo, [field]: value }
  }));

  // Education helpers
  const addEdu = () => update('education', [...data.education, { collegeName: '', degree: '', year: '', gpa: '' }]);
  const removeEdu = (i) => update('education', data.education.filter((_, idx) => idx !== i));
  const updateEdu = (i, field, val) => {
    const arr = [...data.education];
    arr[i] = { ...arr[i], [field]: val };
    update('education', arr);
  };

  // Skills
  const [skillInput, setSkillInput] = useState('');
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !data.skills.includes(s)) {
      update('skills', [...data.skills, s]);
      setSkillInput('');
    }
  };
  const removeSkill = (i) => update('skills', data.skills.filter((_, idx) => idx !== i));

  // Projects
  const addProject = () => update('projects', [...data.projects, { title: '', description: '', technologies: '', link: '' }]);
  const removeProject = (i) => update('projects', data.projects.filter((_, idx) => idx !== i));
  const updateProject = (i, field, val) => {
    const arr = [...data.projects];
    arr[i] = { ...arr[i], [field]: val };
    update('projects', arr);
  };

  // Experience
  const addExp = () => update('experience', [...data.experience, { company: '', role: '', duration: '', description: '' }]);
  const removeExp = (i) => update('experience', data.experience.filter((_, idx) => idx !== i));
  const updateExp = (i, field, val) => {
    const arr = [...data.experience];
    arr[i] = { ...arr[i], [field]: val };
    update('experience', arr);
  };

  return (
    <div className="animate-fade-in">
      {/* Step 0: Personal Info */}
      {activeStep === 0 && (
        <div className="space-y-5">
          <div>
            <p className="section-header">Personal Information</p>
            <p className="text-xs text-ink-400 mb-4">Basic contact details for your resume header</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Full Name *</label>
              <input className="input-field" placeholder="Jane Doe" value={data.personalInfo.fullName}
                onChange={e => updatePersonal('fullName', e.target.value)} />
            </div>
            <div>
              <label className="label">Email *</label>
              <input className="input-field" type="email" placeholder="jane@example.com" value={data.personalInfo.email}
                onChange={e => updatePersonal('email', e.target.value)} />
            </div>
            <div>
              <label className="label">Phone</label>
              <input className="input-field" placeholder="+1 (555) 000-0000" value={data.personalInfo.phone}
                onChange={e => updatePersonal('phone', e.target.value)} />
            </div>
            <div>
              <label className="label">Address</label>
              <input className="input-field" placeholder="City, State" value={data.personalInfo.address}
                onChange={e => updatePersonal('address', e.target.value)} />
            </div>
            <div>
              <label className="label">LinkedIn URL</label>
              <input className="input-field" placeholder="linkedin.com/in/janedoe" value={data.personalInfo.linkedin}
                onChange={e => updatePersonal('linkedin', e.target.value)} />
            </div>
            <div>
              <label className="label">GitHub URL</label>
              <input className="input-field" placeholder="github.com/janedoe" value={data.personalInfo.github}
                onChange={e => updatePersonal('github', e.target.value)} />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="label">Career Objective</label>
              <AIImproveButton
                text={data.personalInfo.objective}
                type="objective"
                onImprove={(val) => updatePersonal('objective', val)}
              />
            </div>
            <textarea
              className="input-field resize-none h-28"
              placeholder="A brief summary of your professional goals and what you bring to the table..."
              value={data.personalInfo.objective}
              onChange={e => updatePersonal('objective', e.target.value)}
            />
          </div>
        </div>
      )}

      {/* Step 1: Education */}
      {activeStep === 1 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header">Education</p>
              <p className="text-xs text-ink-400">Your academic background</p>
            </div>
            <button onClick={addEdu} className="flex items-center gap-1.5 text-xs text-volt-400 hover:text-volt-300 font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
          {data.education.map((edu, i) => (
            <div key={i} className="card p-4 space-y-3 relative">
              {data.education.length > 1 && (
                <button onClick={() => removeEdu(i)} className="absolute top-3 right-3 text-ink-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="text-xs font-medium text-ink-400 mb-1">Education #{i + 1}</div>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="label">College / University *</label>
                  <input className="input-field" placeholder="Massachusetts Institute of Technology" value={edu.collegeName}
                    onChange={e => updateEdu(i, 'collegeName', e.target.value)} />
                </div>
                <div>
                  <label className="label">Degree *</label>
                  <input className="input-field" placeholder="B.S. Computer Science" value={edu.degree}
                    onChange={e => updateEdu(i, 'degree', e.target.value)} />
                </div>
                <div>
                  <label className="label">Graduation Year</label>
                  <input className="input-field" placeholder="2024" value={edu.year}
                    onChange={e => updateEdu(i, 'year', e.target.value)} />
                </div>
                <div>
                  <label className="label">GPA (optional)</label>
                  <input className="input-field" placeholder="3.8/4.0" value={edu.gpa}
                    onChange={e => updateEdu(i, 'gpa', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 2: Skills */}
      {activeStep === 2 && (
        <div className="space-y-5">
          <div>
            <p className="section-header">Skills</p>
            <p className="text-xs text-ink-400 mb-4">Add your technical and soft skills</p>
          </div>
          <div>
            <label className="label">Add Skill</label>
            <div className="flex gap-2">
              <input
                className="input-field flex-1"
                placeholder="e.g. React, Python, Machine Learning..."
                value={skillInput}
                onChange={e => setSkillInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addSkill()}
              />
              <button onClick={addSkill} className="btn-secondary px-4 py-2 text-sm flex-shrink-0">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-ink-500 mt-1.5">Press Enter or click + to add</p>
          </div>
          {data.skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span key={i} className="flex items-center gap-1.5 bg-ink-700 border border-ink-600 text-ink-200 text-xs px-3 py-1.5 rounded-full font-medium">
                  {s}
                  <button onClick={() => removeSkill(i)} className="text-ink-400 hover:text-red-400 transition-colors">
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
          {data.skills.length === 0 && (
            <div className="card p-6 text-center text-ink-500 text-sm">
              No skills added yet. Type a skill and press Enter.
            </div>
          )}
        </div>
      )}

      {/* Step 3: Projects */}
      {activeStep === 3 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header">Projects</p>
              <p className="text-xs text-ink-400">Showcase your best work</p>
            </div>
            <button onClick={addProject} className="flex items-center gap-1.5 text-xs text-volt-400 hover:text-volt-300 font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Project
            </button>
          </div>
          {data.projects.map((proj, i) => (
            <div key={i} className="card p-4 space-y-3 relative">
              {data.projects.length > 1 && (
                <button onClick={() => removeProject(i)} className="absolute top-3 right-3 text-ink-500 hover:text-red-400 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <div className="text-xs font-medium text-ink-400">Project #{i + 1}</div>
              <div>
                <label className="label">Project Title *</label>
                <input className="input-field" placeholder="E-commerce Platform" value={proj.title}
                  onChange={e => updateProject(i, 'title', e.target.value)} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label">Description *</label>
                  <AIImproveButton
                    text={proj.description}
                    type="project"
                    onImprove={(val) => updateProject(i, 'description', val)}
                  />
                </div>
                <textarea className="input-field resize-none h-20" placeholder="Describe what you built, the problem it solves, and your impact..."
                  value={proj.description} onChange={e => updateProject(i, 'description', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Technologies Used</label>
                  <input className="input-field" placeholder="React, Node.js, MongoDB" value={proj.technologies}
                    onChange={e => updateProject(i, 'technologies', e.target.value)} />
                </div>
                <div>
                  <label className="label">Project Link</label>
                  <input className="input-field" placeholder="github.com/..." value={proj.link}
                    onChange={e => updateProject(i, 'link', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Step 4: Experience */}
      {activeStep === 4 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-header">Experience</p>
              <p className="text-xs text-ink-400">Work history, internships, freelance</p>
            </div>
            <button onClick={addExp} className="flex items-center gap-1.5 text-xs text-volt-400 hover:text-volt-300 font-medium transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Add Experience
            </button>
          </div>
          {data.experience.length === 0 && (
            <div className="card p-8 text-center">
              <p className="text-ink-400 text-sm mb-3">No experience added yet</p>
              <button onClick={addExp} className="btn-secondary text-sm flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Add Experience
              </button>
            </div>
          )}
          {data.experience.map((exp, i) => (
            <div key={i} className="card p-4 space-y-3 relative">
              <button onClick={() => removeExp(i)} className="absolute top-3 right-3 text-ink-500 hover:text-red-400 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <div className="text-xs font-medium text-ink-400">Experience #{i + 1}</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label">Company *</label>
                  <input className="input-field" placeholder="Google" value={exp.company}
                    onChange={e => updateExp(i, 'company', e.target.value)} />
                </div>
                <div>
                  <label className="label">Role *</label>
                  <input className="input-field" placeholder="Software Engineer Intern" value={exp.role}
                    onChange={e => updateExp(i, 'role', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className="label">Duration</label>
                  <input className="input-field" placeholder="June 2023 – August 2023" value={exp.duration}
                    onChange={e => updateExp(i, 'duration', e.target.value)} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label">Description</label>
                  <AIImproveButton
                    text={exp.description}
                    type="experience"
                    onImprove={(val) => updateExp(i, 'description', val)}
                  />
                </div>
                <textarea className="input-field resize-none h-20" placeholder="Describe your responsibilities, achievements, and impact..."
                  value={exp.description} onChange={e => updateExp(i, 'description', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-ink-700">
        <button
          onClick={() => onStepChange(Math.max(0, activeStep - 1))}
          disabled={activeStep === 0}
          className="btn-ghost flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>
        <span className="text-xs text-ink-500">{activeStep + 1} / {totalSteps}</span>
        <button
          onClick={() => onStepChange(Math.min(totalSteps - 1, activeStep + 1))}
          disabled={activeStep === totalSteps - 1}
          className="btn-ghost flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
