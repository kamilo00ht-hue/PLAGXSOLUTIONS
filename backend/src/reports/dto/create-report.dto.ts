import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export enum ReportStatus {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  COMPLETADO = 'completado'
}

export class CreateReportDto {
  @ApiProperty({ example: 3 })
  @IsNumber()
  @IsNotEmpty()
  clientId!: number;

  @ApiProperty({ example: 'Restaurante El Roble' })
  @IsString()
  @IsNotEmpty()
  cliente!: string;

  @ApiProperty({ example: '2026-04-21' })
  @IsDateString()
  fechaServicio!: string;

  @ApiProperty({ example: 'Cucarachas' })
  @IsString()
  @IsNotEmpty()
  tipoPlaga!: string;

  @ApiProperty({ example: 'Carlos Mendoza' })
  @IsString()
  @IsNotEmpty()
  tecnicoResponsable!: string;

  @ApiProperty({ enum: ReportStatus, example: ReportStatus.PENDIENTE })
  @IsEnum(ReportStatus)
  estado!: ReportStatus;
}
