import Link from 'next/link';
import { ArrowRight, Search, Settings } from 'lucide-react';

export type Breadcrumb = { label: string; href?: string };

interface TopbarProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
}

export function Topbar({ title, breadcrumbs = [], actions }: TopbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0d1629]/80 backdrop-blur-2xl shadow-[0_12px_40px_-28px_rgba(0,0,0,0.8)]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-8 lg:px-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-slate-500">
            <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 font-semibold text-slate-100">Dashboard</span>
            <span className="rounded-lg border border-white/10 px-2 py-1 text-slate-500">AvePoint Elements</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="text-slate-200 transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-500">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <ArrowRight className="h-3 w-3 text-slate-600" />}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Command Center</p>
              <h1 className="text-2xl font-semibold leading-tight text-white sm:text-3xl lg:text-4xl">{title}</h1>
            </div>
            <span className="h-1 w-14 rounded-full bg-gradient-to-r from-[#ff5f6d] via-[#7c3aed] to-[#5b8bff]" aria-hidden />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="group flex items-center gap-3 rounded-2xl border border-white/5 bg-[#0f192f] px-3.5 py-2.5 shadow-inner shadow-black/30 transition focus-within:border-blue-400/60 focus-within:ring-2 focus-within:ring-blue-500/20">
            <Search className="h-4 w-4 text-slate-500 transition group-focus-within:text-slate-200" />
            <input
              type="search"
              placeholder="Search customers"
              className="w-60 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </label>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#111b32] px-3.5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_36px_-30px_rgba(0,0,0,0.9)] transition hover:border-white/20 hover:bg-[#15243f]">
              <Settings className="h-4 w-4 text-[#5b8bff]" />
              Settings
            </button>
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
}
