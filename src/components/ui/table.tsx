export function Table({ children }: { children: React.ReactNode }) {
  return <table className="w-full border-collapse text-sm">{children}</table>;
}

export function Th({ children }: { children: React.ReactNode }) {
  return <th className="border-b border-cyan-300/20 px-3 py-2 text-left text-cyan-100">{children}</th>;
}

export function Td({ children }: { children: React.ReactNode }) {
  return <td className="border-b border-cyan-300/10 px-3 py-2 text-slate-200">{children}</td>;
}
