'use client';

import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const statusOptions = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'] as const;

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
            <p className="text-cyan-100">{s.name} · {s.status}</p>
            <p className="text-sm text-slate-300">{new Date(s.serviceDate).toLocaleDateString()} · Precio ${s.price}</p>
            <p className="text-xs text-slate-400">{s.description}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Button key={status} variant="ghost" onClick={() => updateStatus.mutate({ id: s.id, status })}>
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
