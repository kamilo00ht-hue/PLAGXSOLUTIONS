export declare enum ReportStatus {
    PENDIENTE = "pendiente",
    EN_PROCESO = "en_proceso",
    COMPLETADO = "completado"
}
export declare class CreateReportDto {
    cliente: string;
    fechaServicio: string;
    tipoPlaga: string;
    tecnicoResponsable: string;
    estado: ReportStatus;
}
