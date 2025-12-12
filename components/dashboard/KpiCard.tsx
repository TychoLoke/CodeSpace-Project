import type { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface KpiCardProps {
  title: string;
  value: string | number;
  helper?: string;
  icon: LucideIcon;
  footer?: string;
}

export function KpiCard({ title, value, helper, icon: Icon, footer }: KpiCardProps) {
  return (
    <Card className="group relative h-full overflow-hidden bg-[#0b1426] transition-all duration-200 hover:-translate-y-1 hover:border-white/10 hover:shadow-[0_30px_90px_-60px_rgba(0,0,0,0.85)]">
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-white/[0.02] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

      <div className="flex h-full flex-col justify-between gap-6 p-6">
        <div className="flex items-start justify-between gap-5">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{title}</p>
            <p className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{value}</p>
            {helper && <p className="text-sm text-slate-400">{helper}</p>}
          </div>

          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-[#0f1b30] ring-1 ring-white/10">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6ee7ff] via-[#7c3aed] to-[#ff6b6b] opacity-80" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0b1426] text-white shadow-[0_18px_50px_-30px_rgba(255,107,107,0.8)]">
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>

        {footer && <p className="text-xs text-slate-500">{footer}</p>}
      </div>
    </Card>
  );
}
