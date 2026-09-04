import { FileSearch, Heart, KeyRound } from 'lucide-react';
import { getApiKeyPreview } from '@/utils/geminiAnalyze';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500">
              <FileSearch className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-bold text-white">
              Parul<span className="text-cyan-400"> ATS</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a>
            <a href="#scanner" className="hover:text-white transition-colors">Scanner</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/5 pt-6 flex flex-col items-center gap-2 text-sm text-slate-500 sm:flex-row sm:justify-between">
          <p>© 2026 Parul ATS Scanner. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <p className="flex items-center gap-1.5">
              Built with <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" /> for job seekers
            </p>
            <p className="flex items-center gap-1.5 font-mono text-xs text-slate-600">
              <KeyRound className="h-3 w-3" />
              Key: {getApiKeyPreview()}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
