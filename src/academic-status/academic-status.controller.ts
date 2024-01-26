import { Body, Controller, Post } from '@nestjs/common';
import { AcademicStatusService } from './academic-status.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UpdateAcademicStatusDto } from './dto/update-academic-status.dto';

@ApiTags('AcademicStatus')
@Controller('academic-status')
export class AcademicStatusController {
  constructor(private readonly academicStatusService: AcademicStatusService) {}

  @Post('update')
  @ApiBody({ type: UpdateAcademicStatusDto })
  @ApiOperation({ summary: 'Update academic status' })
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async update(@Body() data: UpdateAcademicStatusDto): Promise<any> {
    try {
      return await this.academicStatusService.update(data);
    } catch (err) {
      throw err;
    }
  }
}
