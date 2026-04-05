import { Card } from '@/components/ui/card';

export default function BillingPage() {
  return (
    <Card>
      <h1 className="text-2xl font-semibold text-cyan-100">Suscripción inactiva</h1>
      <p className="mt-3 text-slate-300">Tu suscripción está inactiva. Actualiza tu plan para desbloquear el dashboard.</p>
    </Card>
  );
}
