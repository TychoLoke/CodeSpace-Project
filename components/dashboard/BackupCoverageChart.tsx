'use client';

import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type CoverageDatum = {
  module: string;
  scanned: number;
  protected: number;
};

interface BackupCoverageChartProps {
  data: CoverageDatum[];
}

export function BackupCoverageChart({ data }: BackupCoverageChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 8, left: 0 }} barSize={20}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="module" tickLine={false} axisLine={{ stroke: '#1f2937' }} tick={{ fill: '#cbd5e1', fontSize: 12 }} />
          <YAxis
            tickFormatter={(value) => Math.round(value).toLocaleString()}
            tickLine={false}
            axisLine={{ stroke: '#1f2937' }}
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            contentStyle={{ backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number, name) => [value.toLocaleString(), name === 'protected' ? 'Protected' : 'Scanned']}
          />
          <Legend
            verticalAlign="top"
            height={28}
            iconType="circle"
            wrapperStyle={{ color: '#cbd5e1', fontSize: 12 }}
          />
          <defs>
            <linearGradient id="coverageScanned" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5b8bff" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
            <linearGradient id="coverageProtected" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#0ea5e9" />
            </linearGradient>
          </defs>
          <Bar dataKey="scanned" stackId="coverage" name="Scanned" fill="url(#coverageScanned)" radius={[6, 6, 0, 0]} />
          <Bar dataKey="protected" stackId="coverage" name="Protected" fill="url(#coverageProtected)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

