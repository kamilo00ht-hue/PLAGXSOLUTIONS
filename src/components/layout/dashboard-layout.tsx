import { Sidebar } from './sidebar';
import { Header } from './header';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a192f] text-slate-100 lg:flex">
      <Sidebar />
      <main className="flex-1 p-5 lg:p-8">
        <Header />
        <section className="mt-6">{children}</section>
      </main>
    </div>
  );
}
