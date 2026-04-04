'use client';

import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';

export function ReportsBoard() {
  const { data, isLoading } = trpc.reports.getDashboardMetrics.useQuery();

  if (isLoading || !data) return <Card>Cargando reportes...</Card>;

  return (
    <div className="grid gap-4 lg:grid-cols-4">
      <Card><p className="text-sm text-slate-400">Total clients</p><p className="mt-2 text-3xl font-semibold text-cyan-100">{data.totalClients}</p></Card>
      <Card><p className="text-sm text-slate-400">Active services</p><p className="mt-2 text-3xl font-semibold text-cyan-100">{data.activeServices}</p></Card>
      <Card><p className="text-sm text-slate-400">Completed this month</p><p className="mt-2 text-3xl font-semibold text-cyan-100">{data.servicesCompletedThisMonth}</p></Card>
      <Card><p className="text-sm text-slate-400">Appointments today</p><p className="mt-2 text-3xl font-semibold text-cyan-100">{data.appointmentsToday}</p></Card>
    </div>
  );
}
