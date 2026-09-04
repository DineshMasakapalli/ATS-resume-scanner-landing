import { Upload, Cpu, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload Your Resume',
    description: 'Drag and drop your PDF resume into the scanner. No sign-up or account needed.',
  },
  {
    icon: Cpu,
    step: '02',
    title: 'AI-Powered Analysis',
    description: 'Our engine checks formatting, keywords, structure, and readability against ATS standards.',
  },
  {
    icon: FileCheck,
    step: '03',
    title: 'Get Your Score',
    description: 'Receive a 0–100 score with actionable feedback to improve your chances of passing.',
  },
];

export default function HowItWorks() {
  return (
    <div id="how-it-works" className="relative">
      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.step} className="relative">
              {i < steps.length - 1 && (
                <div className="absolute left-full top-10 hidden h-px w-full bg-gradient-to-r from-cyan-400/40 to-transparent md:block" style={{ marginLeft: '1.5rem' }} />
              )}
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500">
                    <Icon className="h-6 w-6 text-slate-950" strokeWidth={2} />
                  </div>
                  <span className="text-3xl font-bold text-white/10">{s.step}</span>
                </div>
                <h3 className="mt-4 text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
