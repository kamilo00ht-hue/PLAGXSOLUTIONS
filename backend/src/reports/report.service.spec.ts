import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Client } from '../clients/entities/client.entity';
import { CreateReportDto, ReportStatus } from './dto/create-report.dto';
import { ReportAuthor } from './entities/report.entity';
import { Report } from './entities/report.entity';
import { ReportService } from './report.service';

describe('ReportService', () => {
  let service: ReportService;

  const clientRepository = {
    findOne: jest.fn()
  };

  const reportRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn()
  };

  const createDto: CreateReportDto = {
    clientId: 3,
    cliente: 'Cliente QA',
    fechaServicio: '2026-04-21',
    tipoPlaga: 'Hormigas',
    tecnicoResponsable: 'Ana QA',
    estado: ReportStatus.PENDIENTE
  };

  const reportAuthor: ReportAuthor = {
    userId: 7,
    email: 'tecnico.qa@plagx.co',
    role: 'tecnico'
  };

  const client: Client = { id: 3, nombre: 'Cliente QA', email: 'qa@cliente.com', reportes: [] };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportService,
        { provide: getRepositoryToken(Report), useValue: reportRepository },
        { provide: getRepositoryToken(Client), useValue: clientRepository }
      ]
    }).compile();

    service = module.get<ReportService>(ReportService);
  });

  it('should create a report', async () => {
    clientRepository.findOne.mockResolvedValue(client);
    reportRepository.create.mockImplementation((payload) => payload);
    reportRepository.save.mockImplementation(async (payload) => ({ id: 1, ...payload }));

    const result = await service.create(createDto, reportAuthor);

    expect(result.id).toBe(1);
    expect(result.clientId).toBe(createDto.clientId);
    expect(result.autor.userId).toBe(reportAuthor.userId);
  });

  it('should list reports', async () => {
    reportRepository.find.mockResolvedValue([{ id: 1 }]);

    const reports = await service.findAll();
    expect(reports).toHaveLength(1);
  });

  it('should throw NotFoundException if report does not exist', async () => {
    reportRepository.findOne.mockResolvedValue(undefined);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
