import { ScanLine, Tags, LayoutTemplate, Zap, ShieldCheck, BarChart3 } from 'lucide-react';

const features = [
  {
    icon: ScanLine,
    title: 'Deep ATS Parsing',
    description: 'Simulates how real applicant tracking systems read and extract data from your resume.',
  },
  {
    icon: Tags,
    title: 'Keyword Analysis',
    description: 'Identifies missing keywords from job descriptions so you can tailor each application.',
  },
  {
    icon: LayoutTemplate,
    title: 'Format Check',
    description: 'Flags tables, images, and columns that break ATS parsing and hurt your score.',
  },
  {
    icon: BarChart3,
    title: 'Section Scoring',
    description: 'Breaks down your score by section — experience, skills, education, and summary.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Get your score in seconds. No waiting, no email signup, no credit card required.',
  },
  {
    icon: ShieldCheck,
    title: 'Private & Secure',
    description: 'Your resume is analyzed in your browser. We never store or transmit your file.',
  },
];

export default function Features() {
  return (
    <div id="features" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f) => {
        const Icon = f.icon;
        return (
          <div
            key={f.title}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-400/30 hover:bg-white/[0.07] hover:-translate-y-1"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/15 to-teal-500/15 border border-white/10 transition-transform group-hover:scale-110">
              <Icon className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="mt-4 text-lg font-bold text-white">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{f.description}</p>
          </div>
        );
      })}
    </div>
  );
}
