import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateReportDto, ReportStatus } from './dto/create-report.dto';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;

  const createDto: CreateReportDto = {
    cliente: 'Cliente QA',
    fechaServicio: '2026-04-21',
    tipoPlaga: 'Hormigas',
    tecnicoResponsable: 'Ana QA',
    estado: ReportStatus.PENDIENTE
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReportService]
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should create a report', () => {
    const result = service.create(createDto);

    expect(result.id).toBe(1);
    expect(result.cliente).toBe(createDto.cliente);
  });

  it('should list reports', () => {
    service.create(createDto);

    const reports = service.findAll();
    expect(reports).toHaveLength(1);
  });

  it('should throw NotFoundException if report does not exist', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('should update an existing report', () => {
    const created = service.create(createDto);

    const updated = service.update(created.id, { estado: ReportStatus.COMPLETADO });
    expect(updated.estado).toBe(ReportStatus.COMPLETADO);
  });

  it('should remove an existing report', () => {
    const created = service.create(createDto);

    const response = service.remove(created.id);
    expect(response.message).toContain('eliminado correctamente');
    expect(service.findAll()).toHaveLength(0);
  });
});
