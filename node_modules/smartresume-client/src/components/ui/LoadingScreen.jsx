export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-ink-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-12 h-12 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-2 border-ink-700" />
          <div className="absolute inset-0 rounded-full border-2 border-t-volt-400 animate-spin" />
        </div>
        <p className="text-ink-400 text-sm font-medium">Loading SmartResume AI...</p>
      </div>
    </div>
  );
}
