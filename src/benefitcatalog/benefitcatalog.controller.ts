import { Body, Controller, Post } from '@nestjs/common';
import { BenefitCatalogService } from './benefitcatalog.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  SAMBenefitCatalog,
  BannerBenefitCatalogDTO,
} from './dto/benefitcatalog.dto';
import { BenefitCatalogMapper } from './mappers/benefitcatalog.mapper';

@ApiTags('BenefitCatalog')
@Controller('benefitcatalog')
export class BenefitCatalogController {
  constructor(
    private readonly benefitCatalogService: BenefitCatalogService,
    private readonly benefitCatalogMapper: BenefitCatalogMapper,
  ) {}

  @Post('create')
  @ApiBody({ type: BannerBenefitCatalogDTO })
  @ApiOperation({ summary: 'Create BenefitCatalog' })
  @ApiResponse({ status: 200, description: 'BenefitCatalog created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Return a message with data' })
  async createBenefitCatalog(
    @Body() benefitCatalog: BannerBenefitCatalogDTO,
  ): Promise<SAMBenefitCatalog> {
    const mappedBenefitCatalog =
      this.benefitCatalogMapper.benefitCatalogMapper(benefitCatalog);
    return this.benefitCatalogService.createBenefitCatalog(
      mappedBenefitCatalog,
    );
  }
}
