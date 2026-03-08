import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success('Account created! Welcome to SmartResume AI 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-800 border-r border-ink-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-volt-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-coral-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-volt-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ink-900" />
            </div>
            <span className="font-bold text-lg text-ink-50">SmartResume <span className="text-volt-400">AI</span></span>
          </Link>
        </div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-ink-50 leading-tight mb-4">
            Build resumes that<br /><span className="text-volt-400">actually get read</span>
          </h2>
          <div className="space-y-3 mt-6">
            {['AI-powered writing assistance', '3 professional templates', 'Instant PDF download', 'Unlimited resumes'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-ink-300 text-sm">
                <div className="w-5 h-5 bg-volt-400/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-volt-400 rounded-full" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 text-ink-500 text-sm">
          Join students building their careers with AI
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
              <div className="w-7 h-7 bg-volt-400 rounded-lg flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-ink-900" />
              </div>
              <span className="font-bold text-ink-50">SmartResume <span className="text-volt-400">AI</span></span>
            </Link>
            <h1 className="text-3xl font-bold text-ink-50 mb-2">Create account</h1>
            <p className="text-ink-400">Start building professional resumes for free.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input
                type="text"
                className="input-field"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="label">Email</label>
              <input
                type="email"
                className="input-field"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                disabled={loading}
              />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  className="input-field pr-11"
                  placeholder="Min. 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-200 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <input
                type="password"
                className="input-field"
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3 mt-2"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-ink-900/30 border-t-ink-900 rounded-full animate-spin" />
              ) : (
                <>Create Free Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-volt-400 hover:text-volt-300 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
