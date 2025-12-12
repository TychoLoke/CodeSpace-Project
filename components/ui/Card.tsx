import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0d162a] via-[#0b1223]/95 to-[#0a0f1d] shadow-[0_28px_70px_-48px_rgba(0,0,0,1)] ring-1 ring-white/10 backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-px rounded-[22px] border border-white/5 bg-white/5 mix-blend-screen" aria-hidden />
      <div className="relative">{children}</div>
    </div>
  );
}
