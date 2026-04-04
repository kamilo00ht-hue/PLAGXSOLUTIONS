import { Card } from '@/components/ui/card';

const citas = [
  { hora: '08:00', cliente: 'Grupo Andino', estado: 'Pendiente', tecnico: 'Carlos M.' },
  { hora: '10:30', cliente: 'Centro Norte SAS', estado: 'En ruta', tecnico: 'Laura P.' },
  { hora: '15:00', cliente: 'Logística Delta', estado: 'Completada', tecnico: 'Jhon R.' }
];

export function ScheduleBoard() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-lg font-semibold text-cyan-100">Agenda del día</h3>
        <ul className="space-y-3">{citas.map(c => <li key={`${c.hora}-${c.cliente}`} className="rounded-lg border border-cyan-300/20 p-3"><p className="text-cyan-100">{c.hora} · {c.cliente}</p><p className="text-sm text-slate-300">{c.tecnico} · {c.estado}</p></li>)}</ul>
      </Card>
      <Card>
        <h3 className="mb-3 text-lg font-semibold text-cyan-100">Vista mensual</h3>
        <div className="grid grid-cols-7 gap-2 text-center text-xs">{Array.from({ length: 30 }).map((_, i) => <div key={i} className="rounded bg-[#0f2341] p-2">{i + 1}</div>)}</div>
      </Card>
    </div>
  );
}
