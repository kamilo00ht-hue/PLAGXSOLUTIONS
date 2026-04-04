import { SettingsPanel } from '@/features/settings/settings-panel';

export default function SettingsPage() {
  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-semibold">Settings</h2>
      <SettingsPanel />
    </div>
  );
}
