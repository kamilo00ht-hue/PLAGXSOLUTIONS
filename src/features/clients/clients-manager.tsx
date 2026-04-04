'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Table, Td, Th } from '@/components/ui/table';
import type { Client } from '@/types/client';

const seed: Client[] = [
  { id: 'CL-101', nombre: 'Grupo Andino', contacto: 'Laura Melo', telefono: '+57 3001231234', email: 'laura@andino.com', estado: 'Activo' }
];

export function ClientsManager() {
  const [clients, setClients] = useState<Client[]>(seed);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Client | null>(null);
  const [form, setForm] = useState<Omit<Client, 'id'>>({ nombre: '', contacto: '', telefono: '', email: '', estado: 'Activo' });

  const filtered = useMemo(() => clients.filter(c => `${c.nombre} ${c.contacto}`.toLowerCase().includes(query.toLowerCase())), [clients, query]);

  function startCreate() {
    setEditing(null);
    setForm({ nombre: '', contacto: '', telefono: '', email: '', estado: 'Activo' });
    setOpen(true);
  }

  function startEdit(client: Client) {
    setEditing(client);
    setForm({ nombre: client.nombre, contacto: client.contacto, telefono: client.telefono, email: client.email, estado: client.estado });
    setOpen(true);
  }

  function saveClient() {
    if (editing) {
      setClients(prev => prev.map(c => (c.id === editing.id ? { ...editing, ...form } : c)));
    } else {
      setClients(prev => [{ id: `CL-${Date.now()}`, ...form }, ...prev]);
    }
    setOpen(false);
  }

  function removeClient(id: string) {
    setClients(prev => prev.filter(c => c.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Input placeholder="Buscar cliente..." value={query} onChange={e => setQuery(e.target.value)} className="max-w-sm" />
        <Button onClick={startCreate}>Nuevo cliente</Button>
      </div>

      <Card>
        <Table>
          <thead><tr><Th>ID</Th><Th>Empresa</Th><Th>Contacto</Th><Th>Teléfono</Th><Th>Email</Th><Th>Estado</Th><Th>Acciones</Th></tr></thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <Td>{c.id}</Td><Td>{c.nombre}</Td><Td>{c.contacto}</Td><Td>{c.telefono}</Td><Td>{c.email}</Td><Td>{c.estado}</Td>
                <Td><div className="flex gap-2"><Button variant="ghost" onClick={() => startEdit(c)}>Editar</Button><Button variant="violet" onClick={() => removeClient(c.id)}>Eliminar</Button></div></Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? 'Editar cliente' : 'Crear cliente'}>
        <div className="space-y-3">
          <Input placeholder="Empresa" value={form.nombre} onChange={e => setForm(s => ({ ...s, nombre: e.target.value }))} />
          <Input placeholder="Contacto" value={form.contacto} onChange={e => setForm(s => ({ ...s, contacto: e.target.value }))} />
          <Input placeholder="Teléfono" value={form.telefono} onChange={e => setForm(s => ({ ...s, telefono: e.target.value }))} />
          <Input placeholder="Email" value={form.email} onChange={e => setForm(s => ({ ...s, email: e.target.value }))} />
          <div className="flex justify-end gap-2"><Button variant="ghost" onClick={() => setOpen(false)}>Cancelar</Button><Button onClick={saveClient}>Guardar</Button></div>
        </div>
      </Modal>
    </div>
  );
}
