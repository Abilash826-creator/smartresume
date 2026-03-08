import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-900 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-ink-800 border-r border-ink-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-volt-500/8 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-sky-500/8 rounded-full blur-3xl" />
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
            Your career starts<br />with a great resume
          </h2>
          <p className="text-ink-400 text-lg">AI-powered tools to help students land their dream jobs.</p>
        </div>
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {['A', 'B', 'C'].map((l) => (
              <div key={l} className="w-8 h-8 rounded-full bg-ink-600 border-2 border-ink-800 flex items-center justify-center text-xs font-bold text-volt-400">{l}</div>
            ))}
          </div>
          <p className="text-sm text-ink-400">Students building their careers daily</p>
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
            <h1 className="text-3xl font-bold text-ink-50 mb-2">Sign in</h1>
            <p className="text-ink-400">Welcome back! Enter your credentials to continue.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="Your password"
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
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-ink-900/30 border-t-ink-900 rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-ink-400 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-volt-400 hover:text-volt-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
