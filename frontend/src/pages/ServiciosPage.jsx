import ServiceDataTable from '../components/ServiceDataTable';

export default function ServiciosPage({ filters }) {
  return (
    <section className="p-4">
      <ServiceDataTable
        services={filters.filteredServices}
        search={filters.search}
        statusFilter={filters.statusFilter}
        onSearchChange={filters.setSearch}
        onStatusChange={filters.setStatusFilter}
      />
    </section>
  );
}
