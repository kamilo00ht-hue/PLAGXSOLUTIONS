import { and, eq } from 'drizzle-orm';
import { db } from '@/server/db';
import { whatsappLogs } from '@/server/db/schema';
import { sendWhatsAppMessage } from './whatsappClient';
import type { SendWhatsAppMessageInput } from './types';

function buildMessage(input: SendWhatsAppMessageInput): string {
  const kindLabel = {
    CONFIRMATION: 'Confirmación de cita',
    REMINDER: 'Recordatorio de cita',
    REPORT_DELIVERY: 'Entrega de reporte'
  }[input.messageType];

  return [
    `${kindLabel} para ${input.tecnicoNombre}`,
    input.citaId ? `Cita ${input.citaId}` : undefined,
    input.fechaCita ? `${input.fechaCita} ${input.horaCita ?? ''}`.trim() : undefined,
    input.direccionServicio,
    input.descripcionServicio
  ].filter(Boolean).join(' | ');
}

async function logWhatsAppMessage(input: SendWhatsAppMessageInput, status: 'SENT' | 'FAILED', providerMessageId?: string, providerError?: string) {
  await db.insert(whatsappLogs).values({
    organizationId: input.organizationId,
    appointmentId: input.citaId ?? null,
    clientId: input.clienteId ?? null,
    technicianId: input.tecnicoId ?? null,
    phoneTo: input.tecnicoTelefono,
    messageType: input.messageType,
    message: buildMessage(input),
    status,
    providerMessageId: providerMessageId ?? null,
    providerError: providerError ?? null
  });
}

export async function notifyTechnicianByWhatsApp(input: SendWhatsAppMessageInput): Promise<void> {
  try {
    const result = await sendWhatsAppMessage(input);
    await logWhatsAppMessage(input, 'SENT', result.messages?.[0]?.id);
  } catch (error) {
    await logWhatsAppMessage(input, 'FAILED', undefined, error instanceof Error ? error.message : 'Unknown error');
    throw error;
  }
}

export async function sendAppointmentConfirmation(input: SendWhatsAppMessageInput): Promise<void> {
  await notifyTechnicianByWhatsApp({ ...input, messageType: 'CONFIRMATION' });
}

export async function sendAppointmentReminder(input: SendWhatsAppMessageInput): Promise<void> {
  await notifyTechnicianByWhatsApp({ ...input, messageType: 'REMINDER' });
}

export async function sendReportDelivery(input: SendWhatsAppMessageInput): Promise<void> {
  await notifyTechnicianByWhatsApp({ ...input, messageType: 'REPORT_DELIVERY' });
}

export async function listOrganizationWhatsAppLogs(organizationId: string) {
  return db.select().from(whatsappLogs).where(eq(whatsappLogs.organizationId, organizationId));
}

export async function getAppointmentWhatsAppLogs(organizationId: string, appointmentId: string) {
  return db.select().from(whatsappLogs).where(and(eq(whatsappLogs.organizationId, organizationId), eq(whatsappLogs.appointmentId, appointmentId)));
}
