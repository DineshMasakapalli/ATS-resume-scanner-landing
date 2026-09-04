import Navbar from '@/components/Navbar';
import UploadZone from '@/components/UploadZone';
import ScoreZones from '@/components/ScoreZones';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';
import { ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white antialiased">
      {/* Ambient background glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-teal-500/15 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative">
        <Navbar />

        {/* Hero */}
        <section className="px-4 pt-32 pb-16 sm:px-6 sm:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Trusted by 50,000+ job seekers worldwide
            </div>

            <h1 className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl">
              Parul ATS Scanner
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Beat 75% Rejection
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
              Most resumes get rejected by robots before a human ever sees them. Upload yours
              and instantly see how applicant tracking systems score your resume — with a clear
              0–100 rating and actionable fixes.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#scanner"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-lg shadow-cyan-500/25 transition-all hover:shadow-cyan-400/40 hover:scale-105"
              >
                Scan My Resume Now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/10 transition-colors"
              >
                How it Works
              </a>
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 text-green-400" />
              No sign-up required · Your resume never leaves your browser
            </div>
          </div>
        </section>

        {/* Scanner */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <UploadZone />
          </div>
        </section>

        {/* Score Zones */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Understanding Your Score
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-400">
                Every resume lands in one of three zones. Here is what each one means for your
                job applications.
              </p>
            </div>
            <ScoreZones />
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <Stats />
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-400">
                Three simple steps stand between you and an ATS-optimized resume.
              </p>
            </div>
            <HowItWorks />
          </div>
        </section>

        {/* Features */}
        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need to Pass
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-slate-400">
                A full toolkit for making your resume ATS-friendly and recruiter-ready.
              </p>
            </div>
            <Features />
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent p-10 text-center backdrop-blur-sm sm:p-16">
              <div className="absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-cyan-400/20 blur-[80px]" />
              <div className="relative">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Don't Let a Robot Reject You
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-slate-400">
                  Join thousands of job seekers who improved their ATS score and landed more
                  interviews. It starts with a single scan.
                </p>
                <a
                  href="#scanner"
                  className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-300 hover:scale-105"
                >
                  Scan Your Resume Free
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;
