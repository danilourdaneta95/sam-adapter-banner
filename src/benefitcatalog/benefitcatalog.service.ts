import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenefitCatalog } from './benefitcatalog.schema';
import { BannerBenefitCatalog } from './benefitcatalog-banner.schema';
import {
  BannerBenefitCatalogDTO,
  SAMBenefitCatalog,
} from './dto/benefitcatalog.dto';

@Injectable()
export class BenefitCatalogService {
  constructor(
    @InjectModel('BenefitCatalog')
    private benefitCatalogModel: Model<BenefitCatalog>,
    @InjectModel('BannerBenefitCatalog')
    private bannerBenefitCatalogModel: Model<BannerBenefitCatalog>,
  ) {}

  async createBenefitCatalog(
    benefitCatalog: SAMBenefitCatalog,
  ): Promise<BenefitCatalog> {
    const existingBenefitCatalog = await this.getBenefitCatalog({
      code: benefitCatalog.bannerItemCode,
      academicPeriod: benefitCatalog.academicPeriodData,
    });
    if (existingBenefitCatalog) {
      throw new Error('BenefitCatalog already exists');
    }
    return this.benefitCatalogModel.create(benefitCatalog);
  }

  async createBannerBenefitCatalog(
    benefitCatalog: BannerBenefitCatalogDTO,
  ): Promise<BannerBenefitCatalog> {
    return this.bannerBenefitCatalogModel.create(benefitCatalog);
  }

  async getBenefitCatalog(args): Promise<BenefitCatalog> {
    return this.benefitCatalogModel.findOne(args);
  }
}
