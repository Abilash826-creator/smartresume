import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles, Plus, FileText, Edit3, Trash2, LogOut,
  Calendar, Layout, Clock, User
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getUserResumes, deleteResume } from '../api';
import toast from 'react-hot-toast';

const TEMPLATE_LABELS = { modern: 'Modern', professional: 'Professional', minimal: 'Minimal' };
const TEMPLATE_COLORS = {
  modern: 'bg-volt-400/10 text-volt-400 border-volt-400/20',
  professional: 'bg-sky-400/10 text-sky-400 border-sky-400/20',
  minimal: 'bg-ink-600/50 text-ink-300 border-ink-600',
};

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await getUserResumes();
      setResumes(res.data.resumes);
    } catch {
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this resume? This action cannot be undone.')) return;
    setDeleting(id);
    try {
      await deleteResume(id);
      setResumes(prev => prev.filter(r => r._id !== id));
      toast.success('Resume deleted');
    } catch {
      toast.error('Failed to delete resume');
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out');
    navigate('/');
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-ink-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ink-800 border-r border-ink-700 flex flex-col fixed h-full z-20">
        {/* Logo */}
        <div className="p-6 border-b border-ink-700">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-volt-400 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-ink-900" />
            </div>
            <span className="font-bold text-ink-50">SmartResume <span className="text-volt-400">AI</span></span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 py-2 mb-2">
            <p className="text-xs text-ink-500 uppercase tracking-widest font-medium">Menu</p>
          </div>
          <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-volt-400/10 text-volt-400 font-medium text-sm">
            <Layout className="w-4 h-4" />
            Dashboard
          </Link>
          <Link to="/resume/new" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-ink-300 hover:text-ink-100 hover:bg-ink-700 font-medium text-sm transition-colors">
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-ink-700">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <div className="w-8 h-8 bg-ink-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-ink-300" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink-100 truncate">{user?.name}</p>
              <p className="text-xs text-ink-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-ink-400 hover:text-red-400 hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-ink-50">My Resumes</h1>
            <p className="text-ink-400 text-sm mt-1">
              {resumes.length} resume{resumes.length !== 1 ? 's' : ''} · Manage and edit your resumes
            </p>
          </div>
          <Link to="/resume/new" className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Resume
          </Link>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Resumes', value: resumes.length, icon: <FileText className="w-4 h-4" />, color: 'text-volt-400' },
            { label: 'Last Updated', value: resumes[0] ? formatDate(resumes[0].updatedAt) : '—', icon: <Clock className="w-4 h-4" />, color: 'text-sky-400' },
            { label: 'Member Since', value: user?.createdAt ? formatDate(user.createdAt) : '—', icon: <Calendar className="w-4 h-4" />, color: 'text-coral-400' },
          ].map((s) => (
            <div key={s.label} className="card p-5">
              <div className={`${s.color} mb-3`}>{s.icon}</div>
              <div className="text-xl font-bold text-ink-100">{s.value}</div>
              <div className="text-xs text-ink-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Resume list */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-ink-600 border-t-volt-400 rounded-full animate-spin" />
          </div>
        ) : resumes.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="w-16 h-16 bg-ink-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-ink-500" />
            </div>
            <h3 className="text-lg font-semibold text-ink-200 mb-2">No resumes yet</h3>
            <p className="text-ink-400 text-sm mb-6">Create your first AI-powered resume and start applying.</p>
            <Link to="/resume/new" className="btn-primary inline-flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Create First Resume
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 stagger">
            {resumes.map((resume) => (
              <div key={resume._id} className="card p-5 hover:border-ink-600 transition-all group flex items-center gap-4">
                <div className="w-10 h-10 bg-ink-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-ink-600 transition-colors">
                  <FileText className="w-5 h-5 text-volt-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-ink-100 truncate">{resume.title || 'Untitled Resume'}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${TEMPLATE_COLORS[resume.template]}`}>
                      {TEMPLATE_LABELS[resume.template]}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-ink-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Updated {formatDate(resume.updatedAt)}
                    </span>
                    <span>{resume.personalInfo?.fullName || 'No name set'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/resume/${resume._id}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-ink-300 hover:text-ink-100 bg-ink-700 hover:bg-ink-600 rounded-lg border border-ink-600 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(resume._id)}
                    disabled={deleting === resume._id}
                    className="p-1.5 text-ink-500 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deleting === resume._id
                      ? <div className="w-3.5 h-3.5 border border-red-400 border-t-transparent rounded-full animate-spin" />
                      : <Trash2 className="w-3.5 h-3.5" />
                    }
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
