import { BadRequestException, Controller, Get } from '@nestjs/common';
import { RetentionsService } from './retentions.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RetentionDto } from './dto/retention.dto';

@ApiTags('Retentions')
@Controller('retentions')
export class RetentionsController {
  constructor(private readonly retentionsService: RetentionsService) {}

  @Get('get')
  @ApiOperation({ summary: 'Get retention' })
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async get(): Promise<RetentionDto[]> {
    try {
      const response = await this.retentionsService.getAll();
      if (response.statusCode === 200) {
        return response.body;
      } else {
        throw new BadRequestException(response.message);
      }
    } catch (err) {
      throw err;
    }
  }
}
