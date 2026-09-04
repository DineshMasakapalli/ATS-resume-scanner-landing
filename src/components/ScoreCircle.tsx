import { useEffect, useState } from 'react';

interface ScoreCircleProps {
  score: number;
}

function getZone(score: number) {
  if (score < 50) {
    return {
      label: 'Needs Work',
      color: '#ef4444',
      gradient: 'from-red-500 to-rose-600',
      description: 'Your resume is likely to be rejected by most ATS systems.',
    };
  }
  if (score < 80) {
    return {
      label: 'Getting Close',
      color: '#eab308',
      gradient: 'from-yellow-400 to-amber-500',
      description: 'Decent, but there is room for improvement before submitting.',
    };
  }
  return {
    label: 'ATS Ready',
    color: '#22c55e',
    gradient: 'from-green-400 to-emerald-500',
    description: 'Your resume is well-optimized for applicant tracking systems.',
  };
}

export default function ScoreCircle({ score }: ScoreCircleProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const zone = getZone(score);
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, score));
  const offset = circumference - (clamped / 100) * circumference;

  useEffect(() => {
    setDisplayScore(0);
    const duration = 1200;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(eased * score));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [score]);

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-72 w-72">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 280 280">
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={zone.color} />
              <stop offset="100%" stopColor={zone.color} stopOpacity="0.6" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="16"
          />
          <circle
            cx="140"
            cy="140"
            r={radius}
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#glow)"
            style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)' }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-7xl font-bold tabular-nums tracking-tight"
            style={{ color: zone.color }}
          >
            {displayScore}
          </span>
          <span className="mt-1 text-sm font-medium uppercase tracking-widest text-slate-400">
            out of 100
          </span>
          <div
            className="mt-3 rounded-full px-4 py-1.5 text-sm font-semibold text-slate-950"
            style={{ backgroundColor: zone.color }}
          >
            {zone.label}
          </div>
        </div>
      </div>

      <p className="max-w-xs text-center text-sm leading-relaxed text-slate-400">
        {zone.description}
      </p>
    </div>
  );
}
