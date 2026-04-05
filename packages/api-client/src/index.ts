import { HttpClient } from './httpClient';
import type { ClientDto, CreateAppointmentRequest, CreateClientRequest, LoginRequest, LoginResponse, ServiceDto } from './types';

export type ApiClientConfig = {
  baseUrl: string;
  getToken?: () => string | null;
};

export function createApiClient(config: ApiClientConfig) {
  const http = new HttpClient(config);

  return {
    loginUser: (input: LoginRequest) => http.request<LoginResponse>('/api/auth/login', { method: 'POST', body: JSON.stringify(input) }),
    getClients: () => http.request<ClientDto[]>('/api/clients'),
    createClient: (input: CreateClientRequest) => http.request<ClientDto>('/api/clients', { method: 'POST', body: JSON.stringify(input) }),
    getServices: () => http.request<ServiceDto[]>('/api/services'),
    createAppointment: (input: CreateAppointmentRequest) =>
      http.request<{ id: string }>('/api/appointments', { method: 'POST', body: JSON.stringify(input) })
  };
}

export * from './types';
export * from './httpClient';
