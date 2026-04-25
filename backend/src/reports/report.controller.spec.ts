import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { CreateReportDto, ReportStatus } from './dto/create-report.dto';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;
  let service: ReportService;

  const createDto: CreateReportDto = {
    cliente: 'Cliente Controlador',
    fechaServicio: '2026-04-21',
    tipoPlaga: 'Termitas',
    tecnicoResponsable: 'Pedro Técnico',
    estado: ReportStatus.EN_PROCESO
  };

  const request = {
    user: {
      userId: 12,
      email: 'tecnico.controlador@plagx.co',
      role: 'tecnico'
    }
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [ReportService]
    }).compile();

    controller = module.get<ReportController>(ReportController);
    service = module.get<ReportService>(ReportService);
  });

  it('should create report through controller', () => {
    const created = controller.create(createDto, request);
    expect(created.id).toBeDefined();
    expect(created.cliente).toBe(createDto.cliente);
    expect(created.autor.email).toBe(request.user.email);
  });

  it('should return all reports through controller', () => {
    service.create(createDto, request.user);

    const reports = controller.findAll();
    expect(reports).toHaveLength(1);
  });
});
