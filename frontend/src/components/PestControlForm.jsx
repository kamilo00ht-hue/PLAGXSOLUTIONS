import { useState } from 'react';

const INITIAL_FORM = {
  cliente: '',
  fecha: '',
  tipoPlaga: '',
  productoQuimico: '',
  dosisAplicada: '',
  hallazgosTecnicos: '',
  estado: 'Pendiente'
};

export default function PestControlForm({ onCreateService }) {
  const [form, setForm] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.cliente || !form.fecha || !form.tipoPlaga) {
      return;
    }

    onCreateService({
      ...form,
      id: Date.now()
    });

    setForm(INITIAL_FORM);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold text-navy">PestControlForm</h2>
      <form className="grid gap-3" onSubmit={handleSubmit}>
        <input
          name="cliente"
          value={form.cliente}
          onChange={handleChange}
          placeholder="Datos del cliente"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          required
        />

        <input
          type="date"
          name="fecha"
          value={form.fecha}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          required
        />

        <input
          name="tipoPlaga"
          value={form.tipoPlaga}
          onChange={handleChange}
          placeholder="Tipo de plaga"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          required
        />

        <input
          name="productoQuimico"
          value={form.productoQuimico}
          onChange={handleChange}
          placeholder="Producto químico utilizado"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />

        <input
          name="dosisAplicada"
          value={form.dosisAplicada}
          onChange={handleChange}
          placeholder="Dosis aplicada"
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        />

        <textarea
          name="hallazgosTecnicos"
          value={form.hallazgosTecnicos}
          onChange={handleChange}
          placeholder="Hallazgos técnicos"
          className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm"
        />

        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="Pendiente">Pendiente</option>
          <option value="En Proceso">En Proceso</option>
          <option value="Finalizado">Finalizado</option>
        </select>

        <button
          type="submit"
          className="rounded-md bg-navy px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Registrar servicio
        </button>
      </form>
    </section>
  );
}
