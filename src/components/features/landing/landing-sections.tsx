import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export function LandingSections() {
  return (
    <div className="mx-auto max-w-6xl space-y-20 px-6 py-14">
      <motion.section {...reveal} className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-5xl font-bold leading-tight text-cyan-100">Gestión inteligente y profesional de control de plagas</h1>
          <p className="mt-5 text-lg text-slate-300">Monitoreo digital en tiempo real, planificación automática y reportes profesionales para empresas.</p>
          <div className="mt-8 flex gap-3"><Button>Solicitar demo</Button><Button variant="ghost">Ver plataforma</Button></div>
        </div>
        <Card className="neon-glow"><img src="/img/logo.png" alt="logo" className="mx-auto h-20" /><div className="mt-5 h-60 rounded-xl bg-[#0f2341]" /></Card>
      </motion.section>

      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Problem</h2><p className="text-slate-300">Las operaciones de control de plagas suelen gestionarse en hojas de cálculo, generando errores de agenda y falta de trazabilidad.</p></motion.section>

      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Solution</h2><Card><p className="text-slate-300">PLAGXSOLUTIONS centraliza clientes, visitas, técnicos y reportes en un solo panel empresarial.</p><div className="mt-4 h-44 rounded-xl bg-[#0f2341]" /></Card></motion.section>

      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Services</h2><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{['Inspección','Desinfección','Desratización','Control de insectos','Monitoreo IoT','Reportes técnicos'].map(s=><Card key={s}>{s}</Card>)}</div></motion.section>

      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">How It Works</h2><div className="grid gap-4 md:grid-cols-4">{['Registrar cliente','Planificar visita','Ejecutar servicio','Emitir reporte'].map((s,i)=><Card key={s}><p className="text-cyan-200">0{i+1}</p><p>{s}</p></Card>)}</div></motion.section>

      <motion.section {...reveal}><h2 className="mb-4 text-3xl font-semibold">Benefits</h2><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{['Mayor productividad','Menos errores operativos','Reportes instantáneos','Trazabilidad completa','Mejor servicio al cliente','Escalable multi-sede'].map(s=><Card key={s}>{s}</Card>)}</div></motion.section>

      <motion.section {...reveal} className="rounded-2xl border border-violet-400/30 bg-violet-500/10 p-8 text-center">
        <h2 className="text-3xl font-semibold">Digitaliza tu operación hoy</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-300">Convierte tu empresa de control de plagas en una operación premium con métricas, agenda inteligente y automatizaciones.</p>
        <div className="mt-6"><Button variant="violet">Comenzar ahora</Button></div>
      </motion.section>
    </div>
  );
}
