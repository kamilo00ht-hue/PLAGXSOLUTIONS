import { Test, TestingModule } from '@nestjs/testing';
import { ReportController } from './report.controller';
import { CreateReportDto, ReportStatus } from './dto/create-report.dto';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;

  const reportService = {
    create: jest.fn(),
    findAll: jest.fn()
  };

  const createDto: CreateReportDto = {
    clientId: 2,
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
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [{ provide: ReportService, useValue: reportService }]
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  it('should create report through controller', async () => {
    reportService.create.mockResolvedValue({ id: 1, ...createDto, autor: request.user });

    const created = await controller.create(createDto, request);
    expect(created.id).toBeDefined();
    expect(created.clientId).toBe(createDto.clientId);
    expect(created.autor.email).toBe(request.user.email);
  });

  it('should return all reports through controller', async () => {
    reportService.findAll.mockResolvedValue([{ id: 1 }]);

    const reports = await controller.findAll();
    expect(reports).toHaveLength(1);
  });
});
