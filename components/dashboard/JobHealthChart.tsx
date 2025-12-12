'use client';

import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type JobHealthDatum = {
  status: string;
  count: number;
};

interface JobHealthChartProps {
  data: JobHealthDatum[];
}

const STATUS_COLORS: Record<string, string> = {
  Succeeded: '#34d399',
  Warning: '#f59e0b',
  Failed: '#f43f5e',
  Running: '#38bdf8',
  Pending: '#a855f7',
  Ready: '#cbd5e1',
};

export function JobHealthChart({ data }: JobHealthChartProps) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 10, bottom: 8, left: 0 }} barSize={26}>
          <CartesianGrid stroke="#1e293b" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="status" tickLine={false} axisLine={{ stroke: '#1f2937' }} tick={{ fill: '#cbd5e1', fontSize: 12 }} />
          <YAxis
            allowDecimals={false}
            tickLine={false}
            axisLine={{ stroke: '#1f2937' }}
            tick={{ fill: '#cbd5e1', fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: 'rgba(255,255,255,0.02)' }}
            contentStyle={{ backgroundColor: '#0b1120', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12 }}
            labelStyle={{ color: '#e2e8f0' }}
            formatter={(value: number) => [value, 'Jobs']}
          />
          <defs>
            <linearGradient id="jobHealthGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff5f6d" />
              <stop offset="50%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#5b8bff" />
            </linearGradient>
          </defs>
          <Bar dataKey="count" radius={[8, 8, 8, 8]}>
            {data.map((entry) => (
              <Cell
                key={entry.status}
                fill={STATUS_COLORS[entry.status] ?? 'url(#jobHealthGradient)'}
                stroke="url(#jobHealthGradient)"
                strokeWidth={0}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

