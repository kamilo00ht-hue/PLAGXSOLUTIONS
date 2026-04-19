import StatusBadge from './StatusBadge';

export default function ServiceDataTable({ services, search, statusFilter, onSearchChange, onStatusChange }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <input
          type="text"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar cliente o plaga"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />

        <select
          value={statusFilter}
          onChange={(event) => onStatusChange(event.target.value)}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          <option value="Todos">Todos</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Finalizado">Finalizado</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-3 py-2">Cliente</th>
              <th className="px-3 py-2">Fecha</th>
              <th className="px-3 py-2">Tipo de Plaga</th>
              <th className="px-3 py-2">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((service) => (
              <tr key={service.id}>
                <td className="px-3 py-2 font-medium text-slate-700">{service.cliente}</td>
                <td className="px-3 py-2">{service.fecha}</td>
                <td className="px-3 py-2">{service.tipoPlaga}</td>
                <td className="px-3 py-2">
                  <StatusBadge status={service.estado} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
