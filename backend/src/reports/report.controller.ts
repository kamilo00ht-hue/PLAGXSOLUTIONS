import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';
import { ReportAuthor } from './entities/report.entity';
import { ReportService } from './report.service';

interface AuthenticatedRequest {
  user: ReportAuthor;
}

@ApiTags('Reports')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: 'Crear un nuevo informe técnico' })
  @Post()
  create(@Body() createReportDto: CreateReportDto, @Request() request: AuthenticatedRequest) {
    return this.reportService.create(createReportDto, request.user);
  }

  @ApiOperation({ summary: 'Listar todos los informes técnicos' })
  @Get()
  findAll() {
    return this.reportService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un informe técnico por ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualizar un informe técnico por ID' })
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateReportDto: UpdateReportDto) {
    return this.reportService.update(id, updateReportDto);
  }

  @ApiOperation({ summary: 'Eliminar un informe técnico por ID' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.remove(id);
  }
}
