import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportService } from './report.service';
export declare class ReportController {
    private readonly reportService;
    constructor(reportService: ReportService);
    create(createReportDto: CreateReportDto): import("./entities/report.entity").Report;
    findAll(): import("./entities/report.entity").Report[];
    findOne(id: number): import("./entities/report.entity").Report;
    update(id: number, updateReportDto: UpdateReportDto): import("./entities/report.entity").Report;
    remove(id: number): {
        message: string;
    };
}
