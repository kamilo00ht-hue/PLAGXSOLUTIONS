import { useMemo, useState } from 'react';
import './agents-whatsapp.css';

type AgentConfig = {
  autoAssign: boolean;
  sendWhatsApp: boolean;
  leadMinutes: number;
  fallbackPhone: string;
};

const initialConfig: AgentConfig = {
  autoAssign: true,
  sendWhatsApp: true,
  leadMinutes: 30,
  fallbackPhone: ''
};

export default function AgentsWhatsAppPage() {
  const [config, setConfig] = useState<AgentConfig>(initialConfig);
  const [status, setStatus] = useState<'idle' | 'saved'>('idle');

  const previewMessage = useMemo(() => {
    return [
      'Hola Carlos, tienes una nueva cita asignada.',
      '',
      '• ID Cita: CITA-1021',
      '• Fecha: 2026-03-31',
      '• Hora: 14:00',
      '• Dirección: Cra 45 #10-22',
      '• Servicio: Control de roedores',
      '',
      'Por favor confirma recepción en la plataforma PLAGX Solutions.'
    ].join('\n');
  }, []);

  const handleSave = () => {
    setStatus('saved');
    setTimeout(() => setStatus('idle'), 2500);
  };

  return (
    <main className="agents-page">
      <section className="agents-panel glow-card">
        <header className="agents-header">
          <h1>Agentes IA + WhatsApp</h1>
          <p>Configura cómo se notifica automáticamente a los técnicos sobre sus citas.</p>
        </header>

        <div className="agents-form-grid">
          <label className="toggle-row">
            <span>Asignación automática de técnico</span>
            <input
              type="checkbox"
              checked={config.autoAssign}
              onChange={(event) => setConfig((prev) => ({ ...prev, autoAssign: event.target.checked }))}
            />
          </label>

          <label className="toggle-row">
            <span>Enviar notificación por WhatsApp</span>
            <input
              type="checkbox"
              checked={config.sendWhatsApp}
              onChange={(event) => setConfig((prev) => ({ ...prev, sendWhatsApp: event.target.checked }))}
            />
          </label>

          <label>
            Anticipación de aviso (minutos)
            <input
              className="neon-input"
              type="number"
              min={0}
              value={config.leadMinutes}
              onChange={(event) => setConfig((prev) => ({ ...prev, leadMinutes: Number(event.target.value) }))}
            />
          </label>

          <label>
            Teléfono de respaldo
            <input
              className="neon-input"
              type="tel"
              placeholder="+573001234567"
              value={config.fallbackPhone}
              onChange={(event) => setConfig((prev) => ({ ...prev, fallbackPhone: event.target.value }))}
            />
          </label>
        </div>

        <button className="neon-button" onClick={handleSave} type="button">
          Guardar configuración
        </button>

        {status === 'saved' && <p className="save-feedback">Configuración guardada correctamente.</p>}
      </section>

      <section className="agents-panel glow-card">
        <h2>Vista previa del mensaje</h2>
        <pre className="message-preview">{previewMessage}</pre>
      </section>
    </main>
  );
}
