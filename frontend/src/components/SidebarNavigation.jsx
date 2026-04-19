import { Link, NavLink } from 'react-router-dom';
import { ClipboardList, LayoutDashboard, Route, Users } from 'lucide-react';

const menuItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/ruta-del-dia', label: 'Ruta del Día', icon: Route },
  { to: '/clientes', label: 'Clientes', icon: Users },
  { to: '/inventario-quimico', label: 'Inventario Químico', icon: ClipboardList },
  { to: '/servicios', label: 'Servicios', icon: ClipboardList }
];

export default function SidebarNavigation() {
  return (
    <aside className="w-full bg-navy px-4 py-4 text-white lg:min-h-screen lg:w-64">
      <Link to="/" className="mb-4 block text-lg font-bold text-white">
        PlagX Solutions
      </Link>
      <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 text-sm transition ${
                isActive ? 'bg-slate-700 text-white' : 'bg-slate-800/60 text-slate-100 hover:bg-slate-700'
              }`
            }
          >
            <Icon size={16} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
