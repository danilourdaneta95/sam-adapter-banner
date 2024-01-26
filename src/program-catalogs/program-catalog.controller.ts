import { Body, Controller, Post } from '@nestjs/common';
import { ProgramCatalogDTO } from './dto/program-catalog.dto';
import { ProgramCatalogService } from './program-catalog.service';
import { ProgramCatalogMapper } from './mapper/program-catalogs.mapper';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProgramCatalog } from './schemas/program-catalog.schema';

@ApiTags('ProgramCatalog')
@Controller('program-catalog')
export class ProgramCatalogController {
  constructor(
    private readonly programCatalogService: ProgramCatalogService,
    private readonly programCatalogMapper: ProgramCatalogMapper,
  ) {}
  @Post('create')
  @ApiBody({ type: ProgramCatalogDTO })
  @ApiOperation({ summary: 'Create program catalog' })
  @ApiResponse({ status: 201, description: 'Create.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async createProgramCatalog(
    @Body() programCatalog: ProgramCatalogDTO,
  ): Promise<ProgramCatalog> {
    const dataSam =
      this.programCatalogMapper.mapBannerDataToProgramCatalog(programCatalog);
    const dataBanner =
      this.programCatalogMapper.mapBannerDataBanner(programCatalog);
    this.programCatalogService.createProgramCatalogBanner(dataBanner);
    return this.programCatalogService.createProgramCatalog(dataSam);
  }
}
