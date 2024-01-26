import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProgramCatalog } from './schemas/program-catalog.schema';
import { ProgramCatalogBanner } from './schemas/program-catalog-banner.schema';

@Injectable()
export class ProgramCatalogService {
  constructor(
    @InjectModel(ProgramCatalog.name)
    private readonly programCatalogModel: Model<ProgramCatalog>,
    @InjectModel(ProgramCatalogBanner.name)
    private readonly programCatalogBannerModel: Model<ProgramCatalogBanner>,
  ) {}

  async createProgramCatalog(
    programCatalog: ProgramCatalog,
  ): Promise<ProgramCatalog> {
    return this.programCatalogModel.create(programCatalog);
  }
  async createProgramCatalogBanner(
    programCatalogBanner: ProgramCatalogBanner,
  ): Promise<ProgramCatalogBanner> {
    return this.programCatalogBannerModel.create(programCatalogBanner);
  }
}
