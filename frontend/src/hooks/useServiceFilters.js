import { useMemo, useState } from 'react';

export function useServiceFilters(services) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.cliente.toLowerCase().includes(search.toLowerCase()) ||
        service.tipoPlaga.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = statusFilter === 'Todos' || service.estado === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, services, statusFilter]);

  return {
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    filteredServices
  };
}
