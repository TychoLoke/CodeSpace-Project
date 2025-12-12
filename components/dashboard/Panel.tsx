import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface PanelProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function Panel({ title, subtitle, actions, children }: PanelProps) {
  return (
    <Card>
      <div className="flex flex-col gap-4 p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">{title}</p>
            {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 text-sm text-slate-300">{actions}</div>}
        </div>
        <div className="rounded-xl bg-gradient-to-b from-[rgba(255,255,255,0.05)] to-[rgba(255,255,255,0.02)] px-1 py-1">
          <div className="rounded-xl bg-[#0d152a]/80 p-4 shadow-inner shadow-black/40">{children}</div>
        </div>
      </div>
    </Card>
  );
}

