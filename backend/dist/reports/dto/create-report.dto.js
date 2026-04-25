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
exports.CreateReportDto = exports.ReportStatus = void 0;
const swagger_1 = require("../../shims/nestjs-swagger");
const class_validator_1 = require("class-validator");
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["PENDIENTE"] = "pendiente";
    ReportStatus["EN_PROCESO"] = "en_proceso";
    ReportStatus["COMPLETADO"] = "completado";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
class CreateReportDto {
}
exports.CreateReportDto = CreateReportDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Restaurante El Roble' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "cliente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-04-21' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "fechaServicio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Cucarachas' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "tipoPlaga", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Carlos Mendoza' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateReportDto.prototype, "tecnicoResponsable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ReportStatus, example: ReportStatus.PENDIENTE }),
    (0, class_validator_1.IsEnum)(ReportStatus),
    __metadata("design:type", String)
], CreateReportDto.prototype, "estado", void 0);
//# sourceMappingURL=create-report.dto.js.map