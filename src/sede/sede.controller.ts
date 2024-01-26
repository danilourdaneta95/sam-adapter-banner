import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { SedeDTO } from './dto/sede.dto';
import { SedeService } from './sede.service';
import { SedeMapper } from './mapper/sede.mapper';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Sede } from './schemas/sede.schema';

@ApiTags('sede')
@Controller('sede')
export class SedeController {
  constructor(
    private readonly sedeService: SedeService,
    private readonly sedeMapper: SedeMapper,
  ) {}

  @Post('create')
  @ApiBody({ type: SedeDTO })
  @ApiOperation({ summary: 'Create sede' })
  @ApiResponse({ status: 201, description: 'Create.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async createSede(@Body() sede: SedeDTO): Promise<Sede> {
    const dataSam = this.sedeMapper.mapBannerDataToSede(sede);
    const dataBanner = this.sedeMapper.mapBannerData(sede);
    try {
      await this.sedeService.createSedeBanner(dataBanner);
      return await this.sedeService.createSede(dataSam);
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw err;
      }
    }
  }
}
