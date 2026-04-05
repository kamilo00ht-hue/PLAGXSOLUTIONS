import { ClientsManager } from '@/features/clients/clients-manager';

export default function ClientsPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Clients</h2>
      <ClientsManager />
    </div>
  );
}
