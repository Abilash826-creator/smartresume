import { Link } from 'react-router-dom';
import { Sparkles, FileText, Download, Zap, ChevronRight, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-ink-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-volt-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-coral-500/5 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#b8f400 1px, transparent 1px), linear-gradient(90deg, #b8f400 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-ink-700/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-volt-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ink-900" />
            </div>
            <span className="font-bold text-lg text-ink-50">SmartResume <span className="text-volt-400">AI</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="btn-ghost text-sm">Sign in</Link>
            <Link to="/register" className="btn-primary text-sm">Get Started Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 bg-volt-400/10 border border-volt-400/20 rounded-full px-4 py-1.5 mb-8">
          <Star className="w-3 h-3 text-volt-400 fill-current" />
          <span className="text-xs text-volt-400 font-medium">AI-Powered Resume Builder for Students</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-ink-50 mb-6 leading-[1.05] tracking-tight">
          Build resumes that<br />
          <span className="gradient-text">get you hired</span>
        </h1>

        <p className="text-lg text-ink-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Create stunning, ATS-friendly resumes in minutes with AI assistance.
          Choose from professional templates and download as PDF instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/register" className="btn-primary flex items-center gap-2 text-base px-7 py-3">
            Start Building for Free
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link to="/login" className="btn-secondary flex items-center gap-2 text-base px-7 py-3">
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-16 pt-16 border-t border-ink-700/50">
          {[
            { value: '3', label: 'Pro Templates' },
            { value: 'AI', label: 'Powered Writing' },
            { value: 'PDF', label: 'Instant Export' },
            { value: '∞', label: 'Free Resumes' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-volt-400">{stat.value}</div>
              <div className="text-xs text-ink-400 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-ink-50 text-center mb-12">
          Everything you need to land your dream job
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Sparkles className="w-5 h-5" />,
              title: 'AI Writing Assistant',
              desc: 'Improve your career objective, project descriptions, and skills with intelligent AI suggestions.',
              color: 'text-volt-400',
              bg: 'bg-volt-400/10',
            },
            {
              icon: <FileText className="w-5 h-5" />,
              title: '3 Pro Templates',
              desc: 'Choose from Modern, Professional, and Minimal templates designed to impress recruiters.',
              color: 'text-sky-400',
              bg: 'bg-sky-400/10',
            },
            {
              icon: <Download className="w-5 h-5" />,
              title: 'Instant PDF Download',
              desc: 'Download your resume as a pixel-perfect PDF with a single click. Ready to send.',
              color: 'text-coral-400',
              bg: 'bg-coral-400/10',
            },
            {
              icon: <Zap className="w-5 h-5" />,
              title: 'Live Preview',
              desc: 'See your resume update in real-time as you type. No guesswork, no surprises.',
              color: 'text-volt-400',
              bg: 'bg-volt-400/10',
            },
            {
              icon: <Star className="w-5 h-5" />,
              title: 'Multiple Resumes',
              desc: 'Create and manage multiple versions of your resume tailored to different roles.',
              color: 'text-sky-400',
              bg: 'bg-sky-400/10',
            },
            {
              icon: <FileText className="w-5 h-5" />,
              title: 'Secure & Private',
              desc: 'Your data is encrypted and stored securely. JWT auth keeps your account protected.',
              color: 'text-coral-400',
              bg: 'bg-coral-400/10',
            },
          ].map((feat) => (
            <div key={feat.title} className="card p-6 hover:border-ink-600 transition-colors group">
              <div className={`w-10 h-10 ${feat.bg} rounded-xl flex items-center justify-center mb-4 ${feat.color} group-hover:scale-110 transition-transform`}>
                {feat.icon}
              </div>
              <h3 className="font-semibold text-ink-100 mb-2">{feat.title}</h3>
              <p className="text-sm text-ink-400 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="card p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-volt-500/10 to-sky-500/10" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-ink-50 mb-4">Ready to build your resume?</h2>
            <p className="text-ink-300 mb-8">Join students who landed their first job with SmartResume AI.</p>
            <Link to="/register" className="btn-primary text-base px-8 py-3 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Create Your Resume Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ink-700/50 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-ink-500 text-sm">
          © {new Date().getFullYear()} SmartResume AI. Built for students, by developers.
        </div>
      </footer>
    </div>
  );
}
