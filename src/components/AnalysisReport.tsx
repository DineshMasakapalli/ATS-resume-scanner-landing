import { CheckCircle2, XCircle, AlertTriangle, Sparkles, Lightbulb } from 'lucide-react';
import type { AnalysisResult } from '@/utils/geminiAnalyze';

interface AnalysisReportProps {
  result: AnalysisResult;
}

export default function AnalysisReport({ result }: AnalysisReportProps) {
  return (
    <div className="space-y-4">
      {/* Strengths */}
      {result.strengths.length > 0 && (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <h3 className="text-sm font-bold text-green-300 uppercase tracking-wide">
              Strengths
            </h3>
          </div>
          <ul className="space-y-2">
            {result.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                <span className="text-green-400 mt-0.5 shrink-0">+</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Weaknesses */}
      {result.weaknesses.length > 0 && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <XCircle className="h-5 w-5 text-red-400" />
            <h3 className="text-sm font-bold text-red-300 uppercase tracking-wide">
              Weaknesses
            </h3>
          </div>
          <ul className="space-y-2">
            {result.weaknesses.map((w, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300 leading-relaxed">
                <span className="text-red-400 mt-0.5 shrink-0">-</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Missing Keywords */}
      {result.missing_keywords.length > 0 && (
        <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wide">
              Missing Keywords
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.missing_keywords.map((k, i) => (
              <span
                key={i}
                className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-medium text-yellow-200"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Improved Bullets */}
      {result.improved_bullets.length > 0 && (
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">
              Improved Bullet Points
            </h3>
          </div>
          <ul className="space-y-3">
            {result.improved_bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-2 text-sm text-slate-300 leading-relaxed rounded-lg bg-white/5 px-3 py-2"
              >
                <Lightbulb className="h-4 w-4 text-cyan-400 mt-0.5 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
