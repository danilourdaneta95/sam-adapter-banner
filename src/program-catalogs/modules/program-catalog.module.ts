import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramCatalogController } from '../program-catalog.controller';
import { ProgramCatalogSchema } from '../schemas/program-catalog.schema';
import { ProgramCatalogService } from '../program-catalog.service';
import { ProgramCatalogBannerSchema } from '../schemas/program-catalog-banner.schema';
import { ProgramCatalogMapper } from '../mapper/program-catalogs.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProgramCatalog', schema: ProgramCatalogSchema }, 
      { name: 'ProgramCatalogBanner', schema: ProgramCatalogBannerSchema }
    ]),
  ],
  controllers: [ProgramCatalogController],
  providers: [ProgramCatalogService, ProgramCatalogMapper],
  exports: [ProgramCatalogService, ProgramCatalogMapper],
})
export class ProgramCatalogModule {}
