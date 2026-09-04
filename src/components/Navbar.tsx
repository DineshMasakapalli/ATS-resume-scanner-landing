import { FileSearch, Github, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 pt-4">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-5 py-3 flex items-center justify-between shadow-lg shadow-black/20">
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400/40 blur-md rounded-lg group-hover:bg-cyan-400/60 transition-colors" />
            <div className="relative grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-cyan-400 to-teal-500">
              <FileSearch className="h-5 w-5 text-slate-950" strokeWidth={2.5} />
            </div>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">
            Parul<span className="text-cyan-400"> ATS</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-slate-300 hover:text-white hover:border-white/20 transition-colors"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href="#scanner"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300 transition-colors"
          >
            Scan Resume
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden mx-auto max-w-6xl mt-2 rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur-xl px-5 py-4 flex flex-col gap-3">
          {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s/g, '-')}`}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
              onClick={() => setOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#scanner"
            className="rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-slate-950"
          >
            Scan Resume
          </a>
        </div>
      )}
    </nav>
  );
}
