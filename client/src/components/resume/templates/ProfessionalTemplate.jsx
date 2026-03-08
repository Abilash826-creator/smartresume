export default function ProfessionalTemplate({ data }) {
  const { personalInfo: pi, education, skills, projects, experience } = data;

  return (
    <div style={{ fontFamily: 'Arial, Helvetica, sans-serif', color: '#1a202c', backgroundColor: '#fff', minHeight: '297mm', width: '210mm', display: 'grid', gridTemplateColumns: '140px 1fr' }}>
      {/* Left sidebar */}
      <div style={{ background: '#0e7490', color: '#fff', padding: '32px 16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(255,255,255,0.2)', margin: '0 auto 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '24px', fontWeight: '700', color: '#fff'
          }}>
            {(pi.fullName || 'Y').charAt(0).toUpperCase()}
          </div>
        </div>

        <SideSection title="Contact">
          {[
            { label: 'Email', val: pi.email },
            { label: 'Phone', val: pi.phone },
            { label: 'Location', val: pi.address },
            { label: 'LinkedIn', val: pi.linkedin },
            { label: 'GitHub', val: pi.github },
          ].filter(i => i.val).map((item) => (
            <div key={item.label} style={{ marginBottom: '8px' }}>
              <div style={{ fontSize: '8px', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.7, fontWeight: '700' }}>{item.label}</div>
              <div style={{ fontSize: '10px', wordBreak: 'break-all', marginTop: '1px' }}>{item.val}</div>
            </div>
          ))}
        </SideSection>

        {skills?.length > 0 && (
          <SideSection title="Skills">
            {skills.map((s, i) => (
              <div key={i} style={{ fontSize: '10px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)', flexShrink: 0 }} />
                {s}
              </div>
            ))}
          </SideSection>
        )}

        {education?.filter(e => e.collegeName).length > 0 && (
          <SideSection title="Education">
            {education.filter(e => e.collegeName).map((edu, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontWeight: '700' }}>{edu.degree}</div>
                <div style={{ fontSize: '9px', opacity: 0.8, marginTop: '2px' }}>{edu.collegeName}</div>
                <div style={{ fontSize: '9px', opacity: 0.7 }}>{edu.year}{edu.gpa ? ` • ${edu.gpa}` : ''}</div>
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Right main */}
      <div style={{ padding: '32px 28px' }}>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#0e7490', margin: '0 0 4px', lineHeight: 1.1 }}>
            {pi.fullName || 'Your Name'}
          </h1>
          {pi.objective && (
            <p style={{ fontSize: '11px', color: '#4a5568', lineHeight: 1.7, marginTop: '8px', maxWidth: '420px' }}>
              {pi.objective}
            </p>
          )}
        </div>

        {experience?.length > 0 && (
          <MainSection title="Work Experience">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '16px', paddingLeft: '12px', borderLeft: '3px solid #0e7490' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '13px' }}>{exp.role}</div>
                    <div style={{ fontSize: '11px', color: '#0e7490', fontWeight: '600' }}>{exp.company}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#718096', flexShrink: 0, marginLeft: '8px' }}>{exp.duration}</div>
                </div>
                {exp.description && (
                  <p style={{ fontSize: '11px', color: '#4a5568', marginTop: '6px', lineHeight: 1.6 }}>{exp.description}</p>
                )}
              </div>
            ))}
          </MainSection>
        )}

        {projects?.filter(p => p.title).length > 0 && (
          <MainSection title="Projects">
            {projects.filter(p => p.title).map((proj, i) => (
              <div key={i} style={{ marginBottom: '14px', paddingLeft: '12px', borderLeft: '3px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: '700', fontSize: '13px' }}>{proj.title}</div>
                  {proj.link && <div style={{ fontSize: '9px', color: '#718096' }}>{proj.link}</div>}
                </div>
                {proj.technologies && <div style={{ fontSize: '10px', color: '#0e7490', fontWeight: '600', marginTop: '2px' }}>{proj.technologies}</div>}
                {proj.description && <p style={{ fontSize: '11px', color: '#4a5568', marginTop: '5px', lineHeight: 1.6 }}>{proj.description}</p>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SideSection({ title, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ fontSize: '9px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '700', marginBottom: '8px', opacity: 0.9, borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '4px' }}>{title}</div>
      {children}
    </div>
  );
}

function MainSection({ title, children }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#2d3748', borderBottom: '2px solid #0e7490', paddingBottom: '6px', marginBottom: '12px' }}>{title}</h2>
      {children}
    </div>
  );
}
