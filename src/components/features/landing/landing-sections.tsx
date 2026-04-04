import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export function LandingSections() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-6 py-14">
      <motion.section {...reveal} className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs text-cyan-100">
            <Image src="/img/logo.png" alt="Logo" width={18} height={18} className="h-5 w-5 object-contain" /> SaaS de operación empresarial
          </div>
          <h1 className="text-5xl font-bold leading-tight text-cyan-100">Gestión inteligente y profesional de control de plagas</h1>
          <p className="mt-5 text-lg text-slate-300">Monitoreo digital en tiempo real, planificación automática y reportes profesionales para empresas.</p>
          <div className="mt-8 flex gap-3"><Button>Solicitar demo</Button><Button variant="ghost">Ver plataforma</Button></div>
        </div>
        <Card className="neon-glow">
          <div className="mb-4 flex items-center justify-between"><p className="text-sm text-cyan-100">Preview Dashboard</p><span className="rounded-full bg-violet-400/20 px-3 py-1 text-xs">Live</span></div>
          <div className="grid gap-3 sm:grid-cols-2">{['Clientes activos 245','Servicios hoy 18','Detecciones 37','Cumplimiento 92%'].map((k)=><div key={k} className="rounded-xl border border-cyan-300/20 bg-[#0f2341] p-3 text-sm text-slate-200">{k}</div>)}</div>
        </Card>
      </motion.section>

      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Problem</h2><p className="text-slate-300">La operación suele estar fragmentada entre llamadas, hojas de cálculo y reportes manuales, perdiendo trazabilidad y velocidad.</p></motion.section>
      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Solution</h2><Card><p className="text-slate-300">PLAGXSOLUTIONS centraliza clientes, agenda, servicios, técnicos y analítica en una única plataforma con control operativo real.</p><div className="mt-4 h-44 rounded-xl bg-[#0f2341] p-4 text-sm text-slate-300">Vista unificada de operación y rendimiento por sedes.</div></Card></motion.section>
      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Services</h2><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{['Inspección avanzada','Desinfección técnica','Desratización integral','Control de insectos','Monitoreo IoT','Reportes normativos'].map(s=><Card key={s}><p className="text-cyan-100">{s}</p></Card>)}</div></motion.section>
      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">How It Works</h2><div className="grid gap-4 md:grid-cols-4">{['Registrar cliente','Planificar visita','Ejecutar servicio','Emitir reporte'].map((s,i)=><Card key={s}><p className="text-cyan-200">0{i+1}</p><p>{s}</p></Card>)}</div></motion.section>
      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Benefits</h2><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{['⚡ Mayor productividad','🧭 Menos errores operativos','📊 Reportes instantáneos','🔍 Trazabilidad completa','🤝 Mejor experiencia cliente','🏢 Escalabilidad multi-sede'].map(s=><Card key={s}>{s}</Card>)}</div></motion.section>
      <motion.section {...reveal} className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-8 text-center"><h2 className="text-3xl font-semibold">Digitaliza tu operación hoy</h2><p className="mx-auto mt-3 max-w-2xl text-slate-300">Convierte tu empresa de control de plagas en una operación premium con métricas, agenda inteligente y automatizaciones.</p><div className="mt-6"><Button variant="violet">Comenzar ahora</Button></div></motion.section>
    </div>
  );
}
