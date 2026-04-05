import { HttpClient } from './httpClient';
import type { ClientDto, CreateAppointmentRequest, CreateClientRequest, LoginRequest, LoginResponse, ServiceDto } from './types';

export type ApiClientConfig = {
  baseUrl: string;
  getToken?: () => string | null;
};

type ApiSuccess<T> = { success: true; data: T };

const unwrap = <T>(response: ApiSuccess<T>) => response.data;

export function createApiClient(config: ApiClientConfig) {
  const http = new HttpClient(config);

  return {
    loginUser: async (input: LoginRequest) => unwrap(await http.request<ApiSuccess<LoginResponse>>('/api/auth/login', { method: 'POST', body: JSON.stringify(input) })),
    getClients: async () => unwrap(await http.request<ApiSuccess<{ items: ClientDto[] }>>('/api/clients')).items,
    createClient: async (input: CreateClientRequest) => unwrap(await http.request<ApiSuccess<ClientDto>>('/api/clients', { method: 'POST', body: JSON.stringify(input) })),
    getServices: async () => unwrap(await http.request<ApiSuccess<{ items: ServiceDto[] }>>('/api/services')).items,
    createAppointment: async (input: CreateAppointmentRequest) =>
      unwrap(await http.request<ApiSuccess<{ id: string }>>('/api/appointments', { method: 'POST', body: JSON.stringify(input) }))
  };
}

export * from './types';
export * from './httpClient';
