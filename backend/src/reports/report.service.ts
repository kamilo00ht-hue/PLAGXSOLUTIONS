import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../clients/entities/client.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report, ReportAuthor } from './entities/report.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}

  async create(createReportDto: CreateReportDto, author: ReportAuthor): Promise<Report> {
    const { clientId, ...reportData } = createReportDto;

    const client = await this.clientRepository.findOne({ where: { id: clientId } });

    if (!client) {
      throw new NotFoundException(`Cliente con ID ${clientId} no encontrado`);
    }

    const report = this.reportRepository.create({
      ...reportData,
      clientId: client.id,
      client,
      autor: author
    });

    return this.reportRepository.save(report);
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  async findOne(id: number): Promise<Report> {
    const report = await this.reportRepository.findOne({ where: { id } });

    if (!report) {
      throw new NotFoundException(`Informe con ID ${id} no encontrado`);
    }

    return report;
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    const report = await this.findOne(id);

    const updatedReport = this.reportRepository.create({
      ...report,
      ...updateReportDto
    });

    return this.reportRepository.save(updatedReport);
  }

  async remove(id: number): Promise<{ message: string }> {
    const existingReport = await this.findOne(id);
    await this.reportRepository.delete(existingReport.id);

    return { message: `Informe con ID ${id} eliminado correctamente` };
  }
}
