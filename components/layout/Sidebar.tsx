'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ActivitySquare, BarChart3, Layers, ShieldHalf, Users } from 'lucide-react';

const navItems = [
  { label: 'Dashboard', href: '/customers', icon: BarChart3 },
  { label: 'Customers', href: '/customers', icon: Users },
  { label: 'Jobs', href: '#', icon: ActivitySquare },
  { label: 'Services', href: '#', icon: Layers },
  { label: 'Compliance', href: '#', icon: ShieldHalf },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[240px] shrink-0 border-r border-white/5 bg-[#070b18]/80 backdrop-blur-xl lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-6 pb-4 pt-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff5f6d] via-[#7c3aed] to-[#5b8bff] text-white shadow-lg shadow-blue-500/20">
          <span className="text-lg font-black">A</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">AvePoint Elements</p>
          <p className="text-xs text-slate-400">MSP Control Plane</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 h-8 -translate-y-1/2 w-1 rounded-full bg-gradient-to-b from-[#ff5f6d] via-[#7c3aed] to-[#5b8bff] transition ${
                  isActive ? 'opacity-100 shadow-[0_0_12px_rgba(91,139,255,0.6)]' : 'opacity-0 group-hover:opacity-50'
                }`}
                aria-hidden
              />
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-white/5 text-white shadow-inner transition ${
                  isActive ? 'shadow-[0_10px_40px_-20px_rgba(91,139,255,0.7)]' : 'group-hover:border-white/10'
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/5 px-6 py-5 text-xs text-slate-500">
        <p className="font-semibold text-slate-300">Tenant coverage</p>
        <p>Secure backup insights, job health, and customer readiness in one view.</p>
      </div>
    </aside>
  );
}

