import { randomUUID } from 'node:crypto';
import { whatsappLogs } from '../../db/schema/whatsappLogs';
import type { MySql2Database } from 'drizzle-orm/mysql2';
import { sendWhatsAppMessage } from './whatsappClient';
import type { SendWhatsAppMessageInput } from './types';

function buildMessage(input: SendWhatsAppMessageInput): string {
  return [
    `Cita ${input.citaId}`,
    `${input.fechaCita} ${input.horaCita}`,
    `${input.direccionServicio}`,
    `${input.descripcionServicio}`
  ].join(' | ');
}

export async function notifyTechnicianByWhatsApp(
  db: MySql2Database,
  input: SendWhatsAppMessageInput
): Promise<void> {
  try {
    const result = await sendWhatsAppMessage(input);

    await db.insert(whatsappLogs).values({
      id: randomUUID(),
      tecnicoId: input.tecnicoId,
      citaId: input.citaId,
      telefonoDestino: input.tecnicoTelefono,
      mensaje: buildMessage(input),
      estado: 'SENT',
      providerMessageId: result.messages?.[0]?.id ?? null
    });
  } catch (error) {
    await db.insert(whatsappLogs).values({
      id: randomUUID(),
      tecnicoId: input.tecnicoId,
      citaId: input.citaId,
      telefonoDestino: input.tecnicoTelefono,
      mensaje: buildMessage(input),
      estado: 'FAILED',
      providerError: error instanceof Error ? error.message : 'Unknown error'
    });

    throw error;
  }
}
