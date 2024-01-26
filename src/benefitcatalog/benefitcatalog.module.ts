import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BenefitCatalogService } from './benefitcatalog.service';
import { BenefitCatalogController } from './benefitcatalog.controller';
import { SharedService } from '../shared/shared.service';
import { BenefitCatalogSchema } from './benefitcatalog.schema';
import { BannerBenefitCatalogSchema } from './benefitcatalog-banner.schema';
import { BenefitCatalogMapper } from './mappers/benefitcatalog.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'BenefitCatalog', schema: BenefitCatalogSchema },
      { name: 'BannerBenefitCatalog', schema: BannerBenefitCatalogSchema },
    ]),
  ],
  controllers: [BenefitCatalogController],
  providers: [BenefitCatalogService, SharedService, BenefitCatalogMapper],
  exports: [BenefitCatalogService, BenefitCatalogMapper],
})
export class BenefitCatalogModule {}
