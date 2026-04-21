import { ReportStatus } from '../dto/create-report.dto';

export interface Report {
  id: number;
  cliente: string;
  fechaServicio: string;
  tipoPlaga: string;
  tecnicoResponsable: string;
  estado: ReportStatus;
  createdAt: string;
  updatedAt: string;
}
