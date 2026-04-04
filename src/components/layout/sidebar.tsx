'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  ['Dashboard', '/dashboard'],
  ['Clients', '/clients'],
  ['Schedule', '/schedule'],
  ['Services', '/services'],
  ['Technicians', '/technicians'],
  ['Reports & Analytics', '/reports'],
  ['Settings', '/settings']
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full max-w-[270px] border-r border-cyan-300/20 bg-[#0d1f3b] p-5">
      <div className="mb-8 flex items-center gap-3">
        <img src="/img/logo.png" alt="PLAGXSOLUTIONS" className="h-10 w-10 rounded-lg object-contain" />
        <div>
          <p className="text-xs text-cyan-200">PLAGXSOLUTIONS</p>
          <h2 className="text-sm font-semibold">Business SaaS</h2>
        </div>
      </div>
      <nav className="space-y-2">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className={`block rounded-xl px-3 py-2 text-sm ${pathname === href ? 'bg-cyan-400/20 text-cyan-100' : 'text-slate-300 hover:bg-cyan-400/10'}`}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
