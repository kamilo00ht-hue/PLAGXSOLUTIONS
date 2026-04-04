import { KpiCard } from '@/components/dashboard/kpi-card';

export function DashboardOverview() {
  const widgets = [
    ['Clientes activos', '245'],
    ['Servicios hoy', '18'],
    ['Servicios completados', '142'],
    ['Detecciones de plagas', '37'],
    ['Próximas visitas', '26']
  ] as const;

  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">{widgets.map(([t, v]) => <KpiCard key={t} title={t} value={v} />)}</div>;
}
