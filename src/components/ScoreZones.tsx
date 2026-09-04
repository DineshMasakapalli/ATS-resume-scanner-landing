import { AlertTriangle, Minus, TrendingUp } from 'lucide-react';

const zones = [
  {
    range: '0 – 49',
    label: 'Red Zone',
    title: 'High Rejection Risk',
    description:
      'Most ATS systems will filter this resume out before a recruiter ever sees it. Major formatting and keyword gaps.',
    icon: AlertTriangle,
    accent: 'red',
    border: 'border-red-500/30',
    bg: 'bg-red-500/10',
    iconBg: 'bg-red-500/20',
    iconColor: 'text-red-400',
    bar: 'bg-red-500',
    text: 'text-red-300',
  },
  {
    range: '50 – 79',
    label: 'Yellow Zone',
    title: 'Needs Improvement',
    description:
      'Your resume passes some ATS filters but loses points on keyword density, formatting, or section structure.',
    icon: Minus,
    accent: 'yellow',
    border: 'border-yellow-500/30',
    bg: 'bg-yellow-500/10',
    iconBg: 'bg-yellow-500/20',
    iconColor: 'text-yellow-400',
    bar: 'bg-yellow-500',
    text: 'text-yellow-300',
  },
  {
    range: '80 – 100',
    label: 'Green Zone',
    title: 'ATS Optimized',
    description:
      'Your resume is well-structured and keyword-rich. It will sail through most applicant tracking systems.',
    icon: TrendingUp,
    accent: 'green',
    border: 'border-green-500/30',
    bg: 'bg-green-500/10',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    bar: 'bg-green-500',
    text: 'text-green-300',
  },
];

export default function ScoreZones() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {zones.map((zone) => {
        const Icon = zone.icon;
        return (
          <div
            key={zone.label}
            className={`group rounded-2xl border ${zone.border} ${zone.bg} p-6 backdrop-blur-sm transition-all hover:scale-[1.02] hover:shadow-xl`}
          >
            <div className="flex items-center justify-between">
              <div className={`grid h-12 w-12 place-items-center rounded-xl ${zone.iconBg}`}>
                <Icon className={`h-6 w-6 ${zone.iconColor}`} />
              </div>
              <span className={`rounded-full border ${zone.border} px-3 py-1 text-xs font-bold ${zone.text}`}>
                {zone.range}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{zone.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{zone.description}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
              <div className={`h-full ${zone.bar} rounded-full transition-all duration-700 group-hover:w-full`} style={{ width: zone.accent === 'red' ? '35%' : zone.accent === 'yellow' ? '65%' : '90%' }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
