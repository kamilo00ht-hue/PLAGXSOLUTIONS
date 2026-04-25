"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateReportDto = void 0;
const swagger_1 = require("../../shims/nestjs-swagger");
const class_validator_1 = require("class-validator");
const create_report_dto_1 = require("./create-report.dto");
class UpdateReportDto {
}
exports.UpdateReportDto = UpdateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Restaurante El Roble' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "cliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: '2026-04-22' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "fechaServicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Roedores' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "tipoPlaga", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, example: 'Laura Pérez' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "tecnicoResponsable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: create_report_dto_1.ReportStatus, example: create_report_dto_1.ReportStatus.EN_PROCESO }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(create_report_dto_1.ReportStatus),
    __metadata("design:type", String)
], UpdateReportDto.prototype, "estado", void 0);
//# sourceMappingURL=update-report.dto.js.map