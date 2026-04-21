import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';

@Injectable()
export class ReportService {
  private reports: Report[] = [];
  private nextId = 1;

  create(createReportDto: CreateReportDto): Report {
    const now = new Date().toISOString();
    const report: Report = {
      id: this.nextId++,
      ...createReportDto,
      createdAt: now,
      updatedAt: now
    };

    this.reports.push(report);
    return report;
  }

  findAll(): Report[] {
    return this.reports;
  }

  findOne(id: number): Report {
    const report = this.reports.find((item) => item.id === id);

    if (!report) {
      throw new NotFoundException(`Informe con ID ${id} no encontrado`);
    }

    return report;
  }

  update(id: number, updateReportDto: UpdateReportDto): Report {
    const report = this.findOne(id);
    const updatedReport: Report = {
      ...report,
      ...updateReportDto,
      updatedAt: new Date().toISOString()
    };

    this.reports = this.reports.map((item) => (item.id === id ? updatedReport : item));
    return updatedReport;
  }

  remove(id: number): { message: string } {
    const existingReport = this.findOne(id);
    this.reports = this.reports.filter((item) => item.id !== existingReport.id);

    return { message: `Informe con ID ${id} eliminado correctamente` };
  }
}
