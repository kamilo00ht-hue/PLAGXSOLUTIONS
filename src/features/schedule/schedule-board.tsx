'use client';

import { useMemo, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function ScheduleBoard() {
  const utils = trpc.useUtils();
  const month = useMemo(() => new Date().toISOString().slice(0, 7), []);
  const { data: grouped = {}, isLoading } = trpc.schedule.getMonthlySchedule.useQuery({ month });
  const { data: clients = [] } = trpc.clients.getAll.useQuery();
  const { data: technicians = [] } = trpc.technicians.getAll.useQuery();

  const create = trpc.schedule.createAppointment.useMutation({ onSuccess: () => utils.schedule.getMonthlySchedule.invalidate({ month }) });

  const [form, setForm] = useState({ clientId: '', technicianId: '', serviceId: '', date: `${month}-01`, time: '08:00', status: 'Scheduled' });

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <h3 className="mb-3 text-lg font-semibold text-cyan-100">Crear cita</h3>
        <div className="space-y-2">
          <select className="w-full rounded-xl border border-cyan-300/30 bg-[#0f2341] p-2" value={form.clientId} onChange={(e) => setForm((s) => ({ ...s, clientId: e.target.value }))}>
            <option value="">Cliente</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <select className="w-full rounded-xl border border-cyan-300/30 bg-[#0f2341] p-2" value={form.technicianId} onChange={(e) => setForm((s) => ({ ...s, technicianId: e.target.value }))}>
            <option value="">Técnico</option>
            {technicians.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
          <div className="grid grid-cols-2 gap-2">
            <Input type="date" value={form.date} onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))} />
            <Input type="time" value={form.time} onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))} />
          </div>
          <Button onClick={() => create.mutate({ ...form, serviceId: form.serviceId || undefined })}>Guardar cita</Button>
        </div>
      </Card>

      <Card>
        <h3 className="mb-3 text-lg font-semibold text-cyan-100">Agenda mensual</h3>
        {isLoading ? (
          <p className="text-slate-300">Cargando agenda...</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(grouped).map(([date, items]) => (
              <div key={date} className="rounded-lg border border-cyan-300/20 p-3">
                <p className="text-cyan-100">{date}</p>
                {(items as Array<{ id: string; time: string; status: string }>).map((a) => (
                  <p key={a.id} className="text-sm text-slate-300">{a.time} · {a.status}</p>
                ))}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
