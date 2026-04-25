import { ReportStatus } from '../dto/create-report.dto';

export interface ReportAuthor {
  userId: number;
  email: string;
  role: string;
}

export interface Report {
  id: number;
  cliente: string;
  fechaServicio: string;
  tipoPlaga: string;
  tecnicoResponsable: string;
  estado: ReportStatus;
  autor: ReportAuthor;
  createdAt: string;
  updatedAt: string;
}
