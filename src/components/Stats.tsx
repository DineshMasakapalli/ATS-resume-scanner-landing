const stats = [
  { value: '75%', label: 'of resumes rejected by ATS before human review' },
  { value: '10s', label: 'average time to get your ATS score' },
  { value: '30+', label: 'ATS compatibility checks performed' },
  { value: '100%', label: 'private — your file never leaves your browser' },
];

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
        >
          <div className="text-3xl font-bold text-cyan-400 sm:text-4xl">{s.value}</div>
          <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
