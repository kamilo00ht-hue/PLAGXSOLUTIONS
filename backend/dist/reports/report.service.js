"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const common_1 = require("@nestjs/common");
let ReportService = class ReportService {
    constructor() {
        this.reports = [];
        this.nextId = 1;
    }
    create(createReportDto) {
        const now = new Date().toISOString();
        const report = {
            id: this.nextId++,
            ...createReportDto,
            createdAt: now,
            updatedAt: now
        };
        this.reports.push(report);
        return report;
    }
    findAll() {
        return this.reports;
    }
    findOne(id) {
        const report = this.reports.find((item) => item.id === id);
        if (!report) {
            throw new common_1.NotFoundException(`Informe con ID ${id} no encontrado`);
        }
        return report;
    }
    update(id, updateReportDto) {
        const report = this.findOne(id);
        const updatedReport = {
            ...report,
            ...updateReportDto,
            updatedAt: new Date().toISOString()
        };
        this.reports = this.reports.map((item) => (item.id === id ? updatedReport : item));
        return updatedReport;
    }
    remove(id) {
        const existingReport = this.findOne(id);
        this.reports = this.reports.filter((item) => item.id !== existingReport.id);
        return { message: `Informe con ID ${id} eliminado correctamente` };
    }
};
exports.ReportService = ReportService;
exports.ReportService = ReportService = __decorate([
    (0, common_1.Injectable)()
], ReportService);
//# sourceMappingURL=report.service.js.map