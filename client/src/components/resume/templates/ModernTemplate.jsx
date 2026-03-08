export default function ModernTemplate({ data }) {
  const { personalInfo: pi, education, skills, projects, experience } = data;

  return (
    <div style={{ fontFamily: 'Georgia, serif', color: '#1a1a2e', backgroundColor: '#fff', minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1a56db 0%, #1e40af 100%)', padding: '32px 40px', color: '#fff' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px', fontFamily: 'Arial, sans-serif', letterSpacing: '-0.5px' }}>
          {pi.fullName || 'Your Name'}
        </h1>
        {pi.objective && (
          <p style={{ fontSize: '12px', margin: '8px 0 0', opacity: 0.85, lineHeight: 1.5, maxWidth: '480px', fontFamily: 'Arial, sans-serif' }}>
            {pi.objective}
          </p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px' }}>
          {[
            pi.email,
            pi.phone,
            pi.address,
            pi.linkedin && `LinkedIn: ${pi.linkedin}`,
            pi.github && `GitHub: ${pi.github}`,
          ].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: '11px', opacity: 0.9, fontFamily: 'Arial, sans-serif' }}>
              {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: '28px 40px', display: 'grid', gridTemplateColumns: '1fr 200px', gap: '32px' }}>
        {/* Left column */}
        <div>
          {experience?.length > 0 && (
            <Section title="Experience" accent="#1a56db">
              {experience.map((exp, i) => (
                <div key={i} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '13px', color: '#1a1a2e' }}>{exp.role}</div>
                      <div style={{ fontSize: '12px', color: '#1a56db', fontWeight: '600' }}>{exp.company}</div>
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', flexShrink: 0, marginLeft: '8px' }}>{exp.duration}</div>
                  </div>
                  {exp.description && (
                    <p style={{ fontSize: '11px', color: '#444', marginTop: '6px', lineHeight: 1.6 }}>{exp.description}</p>
                  )}
                </div>
              ))}
            </Section>
          )}

          {projects?.length > 0 && (
            <Section title="Projects" accent="#1a56db">
              {projects.filter(p => p.title).map((proj, i) => (
                <div key={i} style={{ marginBottom: '14px' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px', color: '#1a1a2e' }}>{proj.title}</div>
                  {proj.technologies && (
                    <div style={{ fontSize: '10px', color: '#1a56db', fontWeight: '600', marginTop: '2px' }}>
                      {proj.technologies}
                    </div>
                  )}
                  {proj.description && (
                    <p style={{ fontSize: '11px', color: '#444', marginTop: '5px', lineHeight: 1.6 }}>{proj.description}</p>
                  )}
                  {proj.link && (
                    <div style={{ fontSize: '10px', color: '#666', marginTop: '3px' }}>{proj.link}</div>
                  )}
                </div>
              ))}
            </Section>
          )}
        </div>

        {/* Right column */}
        <div>
          {education?.length > 0 && (
            <Section title="Education" accent="#1a56db">
              {education.filter(e => e.collegeName).map((edu, i) => (
                <div key={i} style={{ marginBottom: '12px' }}>
                  <div style={{ fontWeight: '700', fontSize: '12px', color: '#1a1a2e' }}>{edu.degree}</div>
                  <div style={{ fontSize: '11px', color: '#1a56db', fontWeight: '600' }}>{edu.collegeName}</div>
                  <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>{edu.year}{edu.gpa ? ` · GPA: ${edu.gpa}` : ''}</div>
                </div>
              ))}
            </Section>
          )}

          {skills?.length > 0 && (
            <Section title="Skills" accent="#1a56db">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {skills.map((s, i) => (
                  <span key={i} style={{
                    background: '#eff6ff', color: '#1a56db', fontSize: '10px',
                    padding: '3px 8px', borderRadius: '4px', fontWeight: '600',
                    border: '1px solid #bfdbfe'
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}

function Section({ title, accent, children }) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <h2 style={{
          fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
          letterSpacing: '1.5px', color: accent, fontFamily: 'Arial, sans-serif', margin: 0
        }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: '1px', background: accent, opacity: 0.3 }} />
      </div>
      {children}
    </div>
  );
}
