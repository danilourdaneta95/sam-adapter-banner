import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CampusDTO } from './dto/campus.dto';
import { CampusService } from './campus.service';
import { CampusMapper } from './mapper/campus.mapper';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Campus } from './schemas/campus.schema';

@ApiTags('Campus')
@Controller('campus')
export class CampusController {
  constructor(
    private readonly campusService: CampusService,
    private readonly campusMapper: CampusMapper,
  ) {}

  @Post('create')
  @ApiBody({ type: CampusDTO })
  @ApiOperation({ summary: 'Create campus' })
  @ApiResponse({ status: 201, description: 'Create.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async createCampus(@Body() campus: CampusDTO): Promise<Campus> {
    const dataBanner = this.campusMapper.mapBannerData(campus);
    try {
      const idSede = await this.campusService.createCampusBanner(dataBanner);
      const dataSam = this.campusMapper.mapBannerDataToCampus(campus, idSede);
      return this.campusService.createCampus(dataSam);
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw err;
      }
    }
  }
}
