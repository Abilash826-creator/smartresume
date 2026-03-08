export default function MinimalTemplate({ data }) {
  const { personalInfo: pi, education, skills, projects, experience } = data;

  return (
    <div style={{ fontFamily: '"Georgia", serif', color: '#111827', backgroundColor: '#fff', minHeight: '297mm', width: '210mm', padding: '48px 52px' }}>
      {/* Header */}
      <div style={{ borderBottom: '2px solid #111827', paddingBottom: '20px', marginBottom: '28px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '700', margin: 0, letterSpacing: '-1px', color: '#111827' }}>
          {pi.fullName || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
          {[pi.email, pi.phone, pi.address, pi.linkedin, pi.github].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: '11px', color: '#6b7280', fontFamily: 'Arial, sans-serif' }}>{item}</span>
          ))}
        </div>
      </div>

      {pi.objective && (
        <div style={{ marginBottom: '28px' }}>
          <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.8, fontStyle: 'italic', margin: 0 }}>
            {pi.objective}
          </p>
        </div>
      )}

      {experience?.length > 0 && (
        <MinSection title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', marginBottom: '18px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', fontFamily: 'Arial, sans-serif', paddingTop: '2px', textAlign: 'right' }}>
                {exp.duration}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '13px' }}>{exp.role}</div>
                <div style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic' }}>{exp.company}</div>
                {exp.description && <p style={{ fontSize: '11px', color: '#374151', marginTop: '6px', lineHeight: 1.7 }}>{exp.description}</p>}
              </div>
            </div>
          ))}
        </MinSection>
      )}

      {education?.filter(e => e.collegeName).length > 0 && (
        <MinSection title="Education">
          {education.filter(e => e.collegeName).map((edu, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', marginBottom: '14px' }}>
              <div style={{ fontSize: '10px', color: '#6b7280', fontFamily: 'Arial, sans-serif', paddingTop: '2px', textAlign: 'right' }}>
                {edu.year}
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '13px' }}>{edu.degree}</div>
                <div style={{ fontSize: '12px', color: '#4b5563', fontStyle: 'italic' }}>{edu.collegeName}</div>
                {edu.gpa && <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>GPA: {edu.gpa}</div>}
              </div>
            </div>
          ))}
        </MinSection>
      )}

      {projects?.filter(p => p.title).length > 0 && (
        <MinSection title="Projects">
          {projects.filter(p => p.title).map((proj, i) => (
            <div key={i} style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div style={{ fontWeight: '700', fontSize: '13px' }}>{proj.title}</div>
                {proj.link && <div style={{ fontSize: '10px', color: '#6b7280' }}>{proj.link}</div>}
              </div>
              {proj.technologies && (
                <div style={{ fontSize: '11px', color: '#4b5563', fontStyle: 'italic', marginTop: '2px' }}>{proj.technologies}</div>
              )}
              {proj.description && <p style={{ fontSize: '11px', color: '#374151', marginTop: '6px', lineHeight: 1.7 }}>{proj.description}</p>}
            </div>
          ))}
        </MinSection>
      )}

      {skills?.length > 0 && (
        <MinSection title="Skills">
          <p style={{ fontSize: '12px', color: '#374151', lineHeight: 1.8 }}>
            {skills.join(' · ')}
          </p>
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      <h2 style={{
        fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
        letterSpacing: '2px', color: '#374151', fontFamily: 'Arial, sans-serif',
        marginBottom: '16px', margin: '0 0 16px'
      }}>
        {title}
      </h2>
      {children}
    </div>
  );
}
