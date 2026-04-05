export function Header() {
  return (
    <header className="flex items-center justify-between rounded-2xl border border-cyan-300/25 bg-[#102542] px-5 py-4">
      <div>
        <h1 className="text-xl font-semibold text-cyan-100">Panel Empresarial</h1>
        <p className="text-sm text-slate-300">Monitoreo operativo en tiempo real.</p>
      </div>
      <div className="rounded-xl bg-violet-500/20 px-3 py-2 text-sm text-violet-100">Pro Plan</div>
    </header>
  );
}
