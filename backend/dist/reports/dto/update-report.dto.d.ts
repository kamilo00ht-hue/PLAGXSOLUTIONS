import { ReportStatus } from './create-report.dto';
export declare class UpdateReportDto {
    cliente?: string;
    fechaServicio?: string;
    tipoPlaga?: string;
    tecnicoResponsable?: string;
    estado?: ReportStatus;
}
