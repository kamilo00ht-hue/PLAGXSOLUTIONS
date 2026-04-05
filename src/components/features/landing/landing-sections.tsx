import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const features = [
  'Multi-tenant seguro por empresa',
  'Agenda operativa con técnicos',
  'Reportes de inspección con firma',
  'Automatización WhatsApp y recordatorios',
  'Analítica KPI en tiempo real',
  'Suscripciones SaaS con Stripe'
];

const plans = [
  { name: 'Starter', price: '$29', desc: 'Hasta 5 técnicos y operaciones básicas.' },
  { name: 'Professional', price: '$79', desc: 'Automatizaciones, reportes y métricas avanzadas.' },
  { name: 'Enterprise', price: 'Custom', desc: 'Multi-sede, integraciones y soporte dedicado.' }
];

export function LandingSections() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-6 py-14">
      <section className="rounded-2xl border border-cyan-300/30 bg-[#0f2341] p-10">
        <p className="text-cyan-200">PLAGXSOLUTIONS</p>
        <h1 className="mt-2 text-4xl font-bold text-cyan-100">La plataforma SaaS para empresas de control de plagas en Colombia</h1>
        <p className="mt-4 max-w-3xl text-slate-300">Gestiona clientes, servicios, técnicos, reportes de inspección y comunicaciones en una sola plataforma moderna.</p>
        <div className="mt-6 flex gap-3"><Button>Solicitar demo</Button><Button variant="ghost">Ver producto</Button></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Features</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{features.map((item) => <Card key={item}>{item}</Card>)}</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Product demo</h2>
        <Card>
          <p className="text-slate-300">Dashboard con KPIs, agenda mensual, tablero de servicios y generación de reportes PDF por visita técnica.</p>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Pricing</h2>
        <div className="grid gap-4 md:grid-cols-3">{plans.map((plan) => <Card key={plan.name}><p className="text-cyan-100">{plan.name}</p><p className="mt-2 text-3xl font-bold">{plan.price}</p><p className="mt-2 text-sm text-slate-300">{plan.desc}</p></Card>)}</div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Testimonials</h2>
        <div className="grid gap-4 md:grid-cols-2"><Card>“Reducimos un 40% el tiempo operativo en agenda y reportes.”</Card><Card>“Ahora tenemos trazabilidad por cliente y técnico en tiempo real.”</Card></div>
      </section>

      <section className="rounded-2xl border border-violet-400/40 bg-violet-500/10 p-8 text-center">
        <h2 className="text-3xl font-semibold">CTA</h2>
        <p className="mt-2 text-slate-300">Empieza a digitalizar tu operación hoy.</p>
        <div className="mt-4"><Button variant="violet">Comenzar ahora</Button></div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
        <Card>
          <p>Escríbenos a ventas@plagxsolutions.com o WhatsApp +57 300 000 0000.</p>
        </Card>
      </section>
    </div>
  );
}
