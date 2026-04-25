import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { Report } from './entities/report.entity';
export declare class ReportService {
    private reports;
    private nextId;
    create(createReportDto: CreateReportDto): Report;
    findAll(): Report[];
    findOne(id: number): Report;
    update(id: number, updateReportDto: UpdateReportDto): Report;
    remove(id: number): {
        message: string;
    };
}
