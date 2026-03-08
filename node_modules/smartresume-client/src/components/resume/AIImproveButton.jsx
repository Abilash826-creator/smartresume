import { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { improveText } from '../../api';
import toast from 'react-hot-toast';

export default function AIImproveButton({ text, type, onImprove, className = '' }) {
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    if (!text || text.trim().length < 5) {
      toast.error('Please enter some text first');
      return;
    }
    setLoading(true);
    try {
      const res = await improveText(text, type);
      onImprove(res.data.improved);
      toast.success('Text improved by AI!');
    } catch {
      toast.error('AI improvement failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handle}
      disabled={loading}
      className={`flex items-center gap-1.5 text-xs font-medium text-volt-400 hover:text-volt-300 disabled:opacity-50 transition-colors ${className}`}
    >
      {loading
        ? <div className="w-3 h-3 border border-volt-400/30 border-t-volt-400 rounded-full animate-spin" />
        : <Sparkles className="w-3 h-3" />
      }
      {loading ? 'Improving...' : 'AI Improve'}
    </button>
  );
}
