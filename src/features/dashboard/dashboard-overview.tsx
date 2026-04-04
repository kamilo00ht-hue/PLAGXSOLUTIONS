'use client';

import { trpc } from '@/lib/trpc';
import { KpiCard } from '@/components/dashboard/kpi-card';

export function DashboardOverview() {
  const { data, isLoading } = trpc.reports.getDashboardMetrics.useQuery();

  if (isLoading || !data) return <p className="text-slate-300">Cargando KPIs...</p>;

  const widgets = [
    ['Clientes activos', String(data.totalClients)],
    ['Servicios activos', String(data.activeServices)],
    ['Completados mes', String(data.servicesCompletedThisMonth)],
    ['Citas hoy', String(data.appointmentsToday)]
  ] as const;

  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{widgets.map(([t, v]) => <KpiCard key={t} title={t} value={v} />)}</div>;
}
