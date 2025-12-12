import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

export type CustomerRow = {
  id: string;
  organization: string;
  tenants: number;
  region: string;
  backupEnabled: boolean;
  protectedObjects: number | null | undefined;
  jobHealth: string;
};

interface CustomerTableProps {
  rows: CustomerRow[];
  errors?: string[];
}

function formatNumber(value: number | null | undefined) {
  if (value == null) return '—';
  return value.toLocaleString();
}

export function CustomerTable({ rows, errors = [] }: CustomerTableProps) {
  return (
    <div className="space-y-4">
      {errors.length > 0 && (
        <div className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-100">
          <p className="font-semibold">Fixture warnings</p>
          <ul className="list-disc space-y-1 pl-5">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {rows.length === 0 ? (
        <p className="text-sm text-slate-300">No customers are available.</p>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-white/[0.02] shadow-inner shadow-black/30">
          <div className="grid grid-cols-12 items-center gap-4 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
            <span className="col-span-4 sm:col-span-5">Customer</span>
            <span className="col-span-2">Backup</span>
            <span className="col-span-3">Protected objects</span>
            <span className="col-span-3 text-right">Job health</span>
          </div>
          <div className="divide-y divide-white/5 text-sm">
            {rows.map((row) => (
              <Link
                key={row.id}
                href={`/customers/${row.id}`}
                className="grid grid-cols-12 items-center gap-4 px-5 py-3 transition hover:bg-white/5"
              >
                <div className="col-span-4 sm:col-span-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xs font-semibold uppercase text-white">
                      {row.organization
                        .split(/\s+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0])
                        .join('') || 'CU'}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{row.organization}</p>
                      <p className="text-xs text-slate-400">
                        {row.tenants} tenants · {row.region}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                      row.backupEnabled
                        ? 'bg-emerald-500/10 text-emerald-100 ring-1 ring-emerald-400/40'
                        : 'bg-slate-600/20 text-slate-200 ring-1 ring-slate-500/30'
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {row.backupEnabled ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
                <div className="col-span-3 text-slate-200">{formatNumber(row.protectedObjects)}</div>
                <div className="col-span-3 flex items-center justify-end gap-3 text-slate-200">
                  <StatusBadge status={row.jobHealth}>{row.jobHealth}</StatusBadge>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

