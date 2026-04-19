import ServiceDataTable from '../components/ServiceDataTable';
import PestControlForm from '../components/PestControlForm';

export default function DashboardPage({ services, filters, onCreateService }) {
  return (
    <div className="grid gap-4 p-4 lg:grid-cols-[1.1fr_1fr]">
      <PestControlForm onCreateService={onCreateService} />
      <ServiceDataTable
        services={filters.filteredServices}
        search={filters.search}
        statusFilter={filters.statusFilter}
        onSearchChange={filters.setSearch}
        onStatusChange={filters.setStatusFilter}
      />
    </div>
  );
}
