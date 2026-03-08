import { X, Check } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern',
    desc: 'Bold accent colors and clean layout for tech roles',
    preview: { accent: '#1a56db', header: 'blue' },
  },
  {
    id: 'professional',
    name: 'Professional',
    desc: 'Classic two-column layout for business & finance',
    preview: { accent: '#0e7490', header: 'teal' },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    desc: 'Clean typography-first design for creative roles',
    preview: { accent: '#374151', header: 'gray' },
  },
];

export default function TemplateSelector({ current, onSelect, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 bg-ink-800 border border-ink-600 rounded-2xl p-6 w-full max-w-2xl shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-ink-50">Choose Template</h2>
            <p className="text-sm text-ink-400 mt-0.5">Select a design for your resume</p>
          </div>
          <button onClick={onClose} className="p-2 text-ink-400 hover:text-ink-100 hover:bg-ink-700 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {TEMPLATES.map((t) => (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              className={`relative group text-left rounded-xl border-2 overflow-hidden transition-all ${
                current === t.id
                  ? 'border-volt-400'
                  : 'border-ink-600 hover:border-ink-400'
              }`}
            >
              {/* Preview card */}
              <div className="bg-white h-36 p-3 relative">
                {/* Header bar */}
                <div className={`h-8 rounded mb-2 ${
                  t.id === 'modern' ? 'bg-blue-600' :
                  t.id === 'professional' ? 'bg-teal-600' : 'bg-gray-700'
                }`} />
                <div className="space-y-1.5">
                  <div className="h-1.5 bg-gray-200 rounded w-3/4" />
                  <div className="h-1.5 bg-gray-200 rounded w-1/2" />
                  <div className="h-1.5 bg-gray-200 rounded w-2/3" />
                  <div className="h-1.5 bg-gray-200 rounded w-1/3" />
                </div>
                {t.id === 'professional' && (
                  <div className="absolute right-2 top-12 bottom-2 w-1/3 bg-teal-50 rounded" />
                )}
              </div>
              <div className="p-3 bg-ink-700">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-semibold text-sm text-ink-100">{t.name}</span>
                  {current === t.id && (
                    <div className="w-5 h-5 bg-volt-400 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-ink-900" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-ink-400">{t.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
