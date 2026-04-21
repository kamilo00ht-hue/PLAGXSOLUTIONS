import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ReportStatus } from './create-report.dto';

export class UpdateReportDto {
  @ApiProperty({ required: false, example: 'Restaurante El Roble' })
  @IsOptional()
  @IsString()
  cliente?: string;

  @ApiProperty({ required: false, example: '2026-04-22' })
  @IsOptional()
  @IsDateString()
  fechaServicio?: string;

  @ApiProperty({ required: false, example: 'Roedores' })
  @IsOptional()
  @IsString()
  tipoPlaga?: string;

  @ApiProperty({ required: false, example: 'Laura Pérez' })
  @IsOptional()
  @IsString()
  tecnicoResponsable?: string;

  @ApiProperty({ required: false, enum: ReportStatus, example: ReportStatus.EN_PROCESO })
  @IsOptional()
  @IsEnum(ReportStatus)
  estado?: ReportStatus;
}
