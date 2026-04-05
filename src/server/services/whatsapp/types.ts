export interface SendWhatsAppMessageInput {
  organizationId: string;
  tecnicoId?: string;
  tecnicoNombre: string;
  tecnicoTelefono: string;
  citaId?: string;
  clienteId?: string;
  fechaCita?: string;
  horaCita?: string;
  direccionServicio?: string;
  descripcionServicio: string;
  messageType: 'CONFIRMATION' | 'REMINDER' | 'REPORT_DELIVERY';
}

export interface WhatsAppApiResponse {
  messaging_product: string;
  contacts?: Array<{ input: string; wa_id: string }>;
  messages?: Array<{ id: string }>;
  error?: {
    message: string;
    type: string;
    code: number;
    fbtrace_id?: string;
  };
}

export type LogEstado = 'SENT' | 'FAILED';
