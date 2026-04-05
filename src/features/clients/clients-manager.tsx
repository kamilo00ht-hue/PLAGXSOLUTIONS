'use client';

import { useMemo, useState } from 'react';
import { trpc } from '@/lib/trpc';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Table, Td, Th } from '@/components/ui/table';

type FormState = { name: string; phone: string; email: string; address: string; isActive: boolean };

const initialForm: FormState = { name: '', phone: '', email: '', address: '', isActive: true };

export function ClientsManager() {
  const utils = trpc.useUtils();
  const { data: clients = [], isLoading } = trpc.clients.getAll.useQuery();
  const createMutation = trpc.clients.create.useMutation({ onSuccess: () => utils.clients.getAll.invalidate() });
  const updateMutation = trpc.clients.update.useMutation({ onSuccess: () => utils.clients.getAll.invalidate() });
  const deleteMutation = trpc.clients.delete.useMutation({ onSuccess: () => utils.clients.getAll.invalidate() });

  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(initialForm);

  const filtered = useMemo(
    () => clients.filter((c) => `${c.name} ${c.email}`.toLowerCase().includes(query.toLowerCase())),
    [clients, query]
  );

  function startCreate() {
    setEditingId(null);
    setForm(initialForm);
    setOpen(true);
  }

  function startEdit(client: (typeof clients)[number]) {
    setEditingId(client.id);
    setForm({ name: client.name, phone: client.phone, email: client.email, address: client.address, isActive: client.isActive });
    setOpen(true);
  }

  async function saveClient() {
    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, ...form });
    } else {
      await createMutation.mutateAsync(form);
    }
    setOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input placeholder="Buscar cliente..." value={query} onChange={(e) => setQuery(e.target.value)} className="max-w-sm" />
        <Button onClick={startCreate}>Nuevo cliente</Button>
      </div>

      <Card>
        {isLoading ? (
          <p className="text-slate-300">Cargando clientes...</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <Th>ID</Th><Th>Nombre</Th><Th>Teléfono</Th><Th>Email</Th><Th>Dirección</Th><Th>Activo</Th><Th>Acciones</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <Td>{c.id.slice(0, 8)}</Td><Td>{c.name}</Td><Td>{c.phone}</Td><Td>{c.email}</Td><Td>{c.address}</Td><Td>{c.isActive ? 'Sí' : 'No'}</Td>
                  <Td>
                    <div className="flex gap-2">
                      <Button variant="ghost" onClick={() => startEdit(c)}>Editar</Button>
                      <Button variant="violet" onClick={() => deleteMutation.mutate({ id: c.id })}>Eliminar</Button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? 'Editar cliente' : 'Crear cliente'}>
        <div className="space-y-3">
          <Input placeholder="Nombre" value={form.name} onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))} />
          <Input placeholder="Teléfono" value={form.phone} onChange={(e) => setForm((s) => ({ ...s, phone: e.target.value }))} />
          <Input placeholder="Email" value={form.email} onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))} />
          <Input placeholder="Dirección" value={form.address} onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))} />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button onClick={saveClient} disabled={createMutation.isPending || updateMutation.isPending}>Guardar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
