import { UploadCloud, FileText, X, CheckCircle2, AlertCircle, Loader2, Wand2 } from 'lucide-react';
import { useCallback, useRef, useState } from 'react';
import ScoreCircle from './ScoreCircle';
import AnalysisReport from './AnalysisReport';
import { extractTextFromPdf } from '@/utils/pdfExtract';
import { analyzeResume, type AnalysisResult } from '@/utils/geminiAnalyze';

type ScanStage = 'idle' | 'extracting' | 'analyzing' | 'done' | 'error';

interface UploadedFile {
  name: string;
  size: number;
}

export default function UploadZone() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<UploadedFile | null>(null);
  const [stage, setStage] = useState<ScanStage>('idle');
  const [score, setScore] = useState<number | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [usedFallback, setUsedFallback] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (f: File) => {
    if (f.type !== 'application/pdf' && !f.name.endsWith('.pdf')) {
      setErrorMsg('Please upload a PDF file.');
      setStage('error');
      return;
    }

    setFile({ name: f.name, size: f.size });
    setStage('extracting');
    setScore(null);
    setResult(null);
    setErrorMsg('');
    setUsedFallback(false);

    try {
      const text = await extractTextFromPdf(f);

      if (!text.trim()) {
        throw new Error(
          'No text could be extracted from this PDF. It may be a scanned image.'
        );
      }

      setStage('analyzing');
      const analysis = await analyzeResume(text);

      setResult(analysis);
      setScore(analysis.score);
      setUsedFallback(analysis.isMock ?? false);
      setStage('done');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStage('error');
    }
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const f = e.dataTransfer.files?.[0];
      if (f) handleFile(f);
    },
    [handleFile]
  );

  const reset = () => {
    setFile(null);
    setScore(null);
    setResult(null);
    setStage('idle');
    setErrorMsg('');
    setUsedFallback(false);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  const scanning = stage === 'extracting' || stage === 'analyzing';

  return (
    <div id="scanner" className="grid gap-8 lg:grid-cols-2 lg:items-start">
      {/* Upload side */}
      <div>
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />

        {!file ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`group relative cursor-pointer rounded-3xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
              dragging
                ? 'border-cyan-400 bg-cyan-400/10 scale-[1.02]'
                : 'border-white/15 bg-white/5 hover:border-cyan-400/50 hover:bg-white/[0.07]'
            }`}
          >
            <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-teal-500/20 border border-white/10 transition-transform group-hover:scale-110">
              <UploadCloud
                className={`h-10 w-10 transition-colors ${
                  dragging ? 'text-cyan-300' : 'text-cyan-400'
                }`}
                strokeWidth={1.5}
              />
            </div>
            <p className="text-lg font-semibold text-white">
              {dragging ? 'Drop your resume here' : 'Drag & drop your resume PDF'}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              or click to browse — PDF files up to 10 MB
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {['.pdf', 'Single file', 'No sign-up'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-teal-500/20 border border-white/10">
                <FileText className="h-7 w-7 text-cyan-400" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{file.name}</p>
                <p className="text-sm text-slate-400">{formatSize(file.size)} · PDF</p>
              </div>
              <button
                onClick={reset}
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scanning progress */}
            {scanning && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-cyan-300">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {stage === 'extracting'
                    ? 'Extracting text from your PDF…'
                    : 'Analyzing resume with AI…'}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-400 to-teal-500"
                    style={{ animation: 'slideBar 1.8s ease-in-out infinite' }}
                  />
                </div>
                <style>{`@keyframes slideBar{0%{transform:translateX(-100%)}100%{transform:translateX(300%)}}`}</style>
              </div>
            )}

            {/* Done */}
            {stage === 'done' && (
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-green-300">
                    Scan complete — your ATS score and full report are ready.
                  </span>
                </div>
                {usedFallback && (
                  <div className="flex items-start gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3">
                    <Wand2 className="h-5 w-5 text-yellow-400 mt-0.5 shrink-0" />
                    <span className="text-sm text-yellow-300">
                      AI analysis was unavailable, so a demo score was generated locally.
                      Your resume text was still extracted successfully.
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Error */}
            {stage === 'error' && (
              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3">
                  <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-red-300">Scan failed</p>
                    <p className="mt-1 text-xs text-red-200/80 break-words">{errorMsg}</p>
                  </div>
                </div>
                <button
                  onClick={reset}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          <AlertCircle className="h-3.5 w-3.5" />
          Your PDF is parsed in your browser, then analyzed by AI. Your file is never stored.
        </div>
      </div>

      {/* Score side */}
      <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] to-white/[0.02] p-8 sm:p-10 min-h-[340px] flex items-center justify-center">
        {score !== null && stage === 'done' ? (
          <ScoreCircle score={score} />
        ) : scanning ? (
          <div className="flex flex-col items-center gap-4 text-slate-400">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-white/5 border-t-cyan-400" />
            <p className="text-sm font-medium">
              {stage === 'extracting' ? 'Reading your resume…' : 'Calculating ATS score…'}
            </p>
          </div>
        ) : stage === 'error' ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-2xl border border-red-500/20 bg-red-500/5">
              <AlertCircle className="h-9 w-9 text-red-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-slate-300">Scan failed</p>
              <p className="mt-1 text-sm text-slate-500">Please try uploading again</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="grid h-20 w-20 place-items-center rounded-2xl border border-white/10 bg-white/5">
              <FileText className="h-9 w-9 text-slate-500" strokeWidth={1.5} />
            </div>
            <div>
              <p className="font-semibold text-slate-300">Your ATS score will appear here</p>
              <p className="mt-1 text-sm text-slate-500">Upload a PDF to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Full report below */}
      {result && stage === 'done' && (
        <div className="lg:col-span-2">
          <div className="mb-5 text-center">
            <h3 className="text-2xl font-bold text-white">Detailed Analysis</h3>
            <p className="mt-1 text-sm text-slate-400">
              AI-powered breakdown of your resume's ATS compatibility
            </p>
          </div>
          <AnalysisReport result={result} />
        </div>
      )}
    </div>
  );
}
