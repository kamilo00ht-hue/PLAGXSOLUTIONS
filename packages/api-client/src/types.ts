export type LoginRequest = { email: string; password: string };
export type LoginResponse = { token: string; userId: string; companyId: string; role: string; subscriptionActive: boolean };

export type ClientDto = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
};

export type CreateClientRequest = {
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive?: boolean;
};

export type ServiceDto = {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  status: string;
};

export type CreateAppointmentRequest = {
  clientId: string;
  technicianId?: string;
  serviceId?: string;
  date: string;
  time: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
};
