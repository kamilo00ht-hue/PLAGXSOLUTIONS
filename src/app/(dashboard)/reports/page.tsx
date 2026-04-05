import { ReportsBoard } from '@/features/reports/reports-board';

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Reports & Analytics</h2>
      <ReportsBoard />
    </div>
  );
}
