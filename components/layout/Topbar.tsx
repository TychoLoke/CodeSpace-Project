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
    <header className="sticky top-0 z-20 border-b border-white/5 bg-[#0a0f1d]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 sm:px-8 lg:px-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
            <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-semibold text-slate-200">Global</span>
            <span className="text-slate-500">AvePoint Elements</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            {breadcrumbs.map((crumb, index) => (
              <span key={crumb.label} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="text-slate-300 transition hover:text-white">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-slate-500">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 && <ArrowRight className="h-3 w-3 text-slate-600" />}
              </span>
            ))}
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center rounded-xl border border-white/5 bg-white/5 px-3 py-2 shadow-inner shadow-black/20 focus-within:border-blue-400/40 focus-within:ring-2 focus-within:ring-blue-500/20">
            <Search className="mr-2 h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search customers"
              className="w-56 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/5 bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:border-white/20 hover:bg-white/15">
              <Settings className="h-4 w-4" />
              Settings
            </button>
            {actions}
          </div>
        </div>
      </div>
    </header>
  );
}

