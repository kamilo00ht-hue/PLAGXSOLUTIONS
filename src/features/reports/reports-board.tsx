import { Card } from '@/components/ui/card';

export function ReportsBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {[
        ['Servicios ejecutados', '142'],
        ['Satisfacción cliente', '94%'],
        ['Tiempo promedio respuesta', '2.4h']
      ].map(([k, v]) => (
        <Card key={k}>
          <p className="text-sm text-slate-400">{k}</p>
          <p className="mt-2 text-3xl font-semibold text-cyan-100">{v}</p>
        </Card>
      ))}
      <Card className="lg:col-span-3">
        <h3 className="mb-2 text-lg font-semibold text-cyan-100">Exportación futura</h3>
        <p className="text-slate-300">La estructura está lista para conectar exportación CSV/PDF y reportes comparativos por periodos.</p>
      </Card>
    </div>
  );
}
