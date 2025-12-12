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
    <div className="relative min-h-screen bg-gradient-to-br from-[#070c16] via-[#0a1322] to-[#0f1a2f] text-slate-100">
      <div
        className="pointer-events-none fixed inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            'radial-gradient(circle at 18% 18%, rgba(91,139,255,0.08), transparent 26%), radial-gradient(circle at 82% 4%, rgba(255,95,109,0.07), transparent 22%), radial-gradient(circle at 78% 62%, rgba(91,139,255,0.05), transparent 30%), linear-gradient(120deg, rgba(255,255,255,0.02), transparent 25%)',
        }}
      />

      <Sidebar />

      <div className="relative flex min-h-screen flex-col lg:ml-72">
        <Topbar title={title} breadcrumbs={breadcrumbs} actions={actions} />
        <main className="flex-1 px-4 pb-14 pt-8 sm:px-8 lg:px-14">
          <div className="mx-auto max-w-7xl space-y-8 lg:space-y-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
