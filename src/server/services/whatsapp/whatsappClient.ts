import type { SendWhatsAppMessageInput, WhatsAppApiResponse } from './types';

const API_VERSION = 'v20.0';

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function buildMessageText(input: SendWhatsAppMessageInput): string {
  return [
    `Hola ${input.tecnicoNombre}, tienes una nueva cita asignada.`,
    '',
    `• ID Cita: ${input.citaId}`,
    `• Fecha: ${input.fechaCita}`,
    `• Hora: ${input.horaCita}`,
    `• Dirección: ${input.direccionServicio}`,
    `• Servicio: ${input.descripcionServicio}`,
    '',
    'Por favor confirma recepción en la plataforma PLAGX Solutions.'
  ].join('\n');
}

export async function sendWhatsAppMessage(input: SendWhatsAppMessageInput): Promise<WhatsAppApiResponse> {
  const phoneNumberId = getRequiredEnv('WHATSAPP_PHONE_NUMBER_ID');
  const token = getRequiredEnv('WHATSAPP_API_TOKEN');

  const endpoint = `https://graph.facebook.com/${API_VERSION}/${phoneNumberId}/messages`;
  const body = {
    messaging_product: 'whatsapp',
    to: input.tecnicoTelefono,
    type: 'text',
    text: {
      preview_url: false,
      body: buildMessageText(input)
    }
  };

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = (await response.json()) as WhatsAppApiResponse;
  if (!response.ok) {
    throw new Error(data.error?.message ?? 'WhatsApp API request failed');
  }

  return data;
}
