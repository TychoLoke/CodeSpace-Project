import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar, type Breadcrumb } from './Topbar';

interface AppShellProps {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, breadcrumbs = [], actions, children }: AppShellProps) {
  return (
    <div className="relative min-h-screen bg-[#050813] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(91,139,255,0.12),transparent_25%),radial-gradient(circle_at_80%_0%,rgba(255,95,109,0.14),transparent_20%),linear-gradient(180deg,rgba(12,18,32,0.85),rgba(5,8,19,0.95))]" aria-hidden />
      <div className="relative flex min-h-screen">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col">
          <Topbar title={title} breadcrumbs={breadcrumbs} actions={actions} />
          <main className="flex-1 px-6 pb-10 pt-4 sm:px-8 lg:px-10">
            <div className="mx-auto max-w-7xl space-y-6">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

