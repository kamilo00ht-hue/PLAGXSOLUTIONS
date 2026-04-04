'use client';

import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function ServicesBoard() {
  const utils = trpc.useUtils();
  const { data: services = [], isLoading } = trpc.services.getAllServices.useQuery();
  const updateStatus = trpc.services.updateStatus.useMutation({ onSuccess: () => utils.services.getAllServices.invalidate() });

  if (isLoading) return <Card>Cargando servicios...</Card>;

  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-cyan-100">Servicios operativos</h3>
      <div className="space-y-3">
        {services.map((s) => (
          <div key={s.id} className="rounded-lg border border-cyan-300/20 p-3">
            <p className="text-cyan-100">{s.pestType} · {s.status}</p>
            <p className="text-sm text-slate-300">{new Date(s.serviceDate).toLocaleDateString()} · Técnico {s.technicianId.slice(0, 8)}</p>
            <p className="text-xs text-slate-400">{s.notes ?? 'Sin notas'}</p>
            <div className="mt-2 flex gap-2">
              {['Scheduled', 'In Progress', 'Completed', 'Cancelled'].map((status) => (
                <Button key={status} variant="ghost" onClick={() => updateStatus.mutate({ id: s.id, status: status as 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled' })}>
                  {status}
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
