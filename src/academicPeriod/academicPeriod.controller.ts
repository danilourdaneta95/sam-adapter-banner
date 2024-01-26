import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AcademicPeriodService } from './academicPeriod.service';
import { CreateAcademicPeriodDto } from './dto/create-academicPeriod.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AcademicPeriod } from './schemas/academicPeriod.schema';

@ApiTags('academicPeriod')
@Controller('academicPeriod')
export class AcademicPeriodController {
  constructor(private readonly academicPeriodService: AcademicPeriodService) {}

  @Post('create')
  @ApiBody({ type: CreateAcademicPeriodDto })
  @ApiOperation({ summary: 'Create academic period' })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async create(
    @Body() createAcademicPeriodDto: CreateAcademicPeriodDto,
  ): Promise<AcademicPeriod> {
    try {
      return this.academicPeriodService.create(createAcademicPeriodDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
