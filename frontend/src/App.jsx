import { Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import SidebarNavigation from './components/SidebarNavigation';
import UserTopBar from './components/UserTopBar';
import DashboardPage from './pages/DashboardPage';
import ClientesPage from './pages/ClientesPage';
import ServiciosPage from './pages/ServiciosPage';
import { mockServices } from './data/mockServices';
import { useServiceFilters } from './hooks/useServiceFilters';

export default function App() {
  const [services, setServices] = useState(mockServices);

  const urgentCount = useMemo(
    () => services.filter((service) => service.estado === 'Pendiente').length,
    [services]
  );

  const filters = useServiceFilters(services);

  const handleCreateService = (newService) => {
    setServices((prev) => [newService, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-100 lg:flex">
      <SidebarNavigation />

      <main className="flex-1">
        <UserTopBar urgentCount={urgentCount} />

        <Routes>
          <Route
            path="/"
            element={
              <DashboardPage services={services} filters={filters} onCreateService={handleCreateService} />
            }
          />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/servicios" element={<ServiciosPage filters={filters} />} />
          <Route path="/ruta-del-dia" element={<Navigate to="/" replace />} />
          <Route path="/inventario-quimico" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
