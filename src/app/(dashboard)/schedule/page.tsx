import { ScheduleBoard } from '@/features/schedule/schedule-board';

export default function SchedulePage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Schedule</h2>
      <ScheduleBoard />
    </div>
  );
}
