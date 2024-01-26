import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { TariffService } from './tariff.service';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Tariff } from './schemas/tariff.schema';

@ApiTags('Tariff')
@Controller('tariff')
export class TariffController {
  constructor(private readonly tariffService: TariffService) {}

  @Post('create')
  @ApiBody({ type: CreateTariffDto })
  @ApiOperation({ summary: 'Create tariff' })
  @ApiResponse({ status: 201, description: 'Create.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async create(@Body() createTariffDtos: CreateTariffDto[]): Promise<any> {
    try {
      const result = createTariffDtos.map((createTariffDto) =>
        this.tariffService.create(createTariffDto),
      );
      return Promise.allSettled(result);
    } catch (err) {
      console.log('error', err);
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw err;
      }
    }
  }
}
