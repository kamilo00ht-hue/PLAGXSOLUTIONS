import { Bell, UserCircle2 } from 'lucide-react';

export default function UserTopBar({ urgentCount = 0 }) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3">
      <div>
        <p className="text-xs text-slate-500">Panel operativo</p>
        <h1 className="text-base font-bold text-navy sm:text-lg">Gestión Técnica de Plagas</h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-full border border-slate-300 p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notificaciones urgentes"
        >
          <Bell size={18} />
          {urgentCount > 0 && (
            <span className="absolute -right-1 -top-1 rounded-full bg-red-600 px-1.5 text-[10px] font-bold text-white">
              {urgentCount}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5">
          <UserCircle2 className="text-slate-600" size={18} />
          <span className="text-xs font-medium text-slate-700 sm:text-sm">Técnico de Campo</span>
        </div>
      </div>
    </header>
  );
}
