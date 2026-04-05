import { ServicesBoard } from '@/features/services/services-board';

export default function ServicesPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Services</h2>
      <ServicesBoard />
    </div>
  );
}
