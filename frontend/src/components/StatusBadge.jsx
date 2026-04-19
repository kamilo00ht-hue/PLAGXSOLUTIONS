const STATUS_STYLES = {
  Pendiente: 'bg-amber-100 text-amber-700 border-amber-300',
  'En Proceso': 'bg-blue-100 text-blue-700 border-blue-300',
  Finalizado: 'bg-emerald-100 text-emerald-700 border-emerald-300'
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-700 border-slate-300';

  return (
    <span className={`rounded-full border px-2 py-1 text-xs font-semibold ${style}`}>
      {status}
    </span>
  );
}
