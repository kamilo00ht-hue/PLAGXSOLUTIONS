import { Card } from '@/components/ui/card';

const data = [
  { plaga: 'Roedores', estado: 'Activo', fecha: '2026-04-04', tecnico: 'Carlos M.', notas: 'Zona logística' },
  { plaga: 'Cucarachas', estado: 'En seguimiento', fecha: '2026-04-05', tecnico: 'Laura P.', notas: 'Cocina industrial' },
  { plaga: 'Termitas', estado: 'Completado', fecha: '2026-04-03', tecnico: 'Jhon R.', notas: 'Tratamiento barrera' }
];

export function ServicesBoard() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-cyan-100">Servicios operativos</h3>
      <div className="space-y-3">{data.map(s => <div key={`${s.plaga}-${s.fecha}`} className="rounded-lg border border-cyan-300/20 p-3"><p className="text-cyan-100">{s.plaga} · {s.estado}</p><p className="text-sm text-slate-300">{s.fecha} · {s.tecnico}</p><p className="text-xs text-slate-400">{s.notas}</p></div>)}</div>
    </Card>
  );
}
