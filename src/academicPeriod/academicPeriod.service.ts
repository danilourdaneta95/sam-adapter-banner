import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AcademicPeriod } from './schemas/academicPeriod.schema';
import { Model } from 'mongoose';
import { CreateAcademicPeriodDto } from './dto/create-academicPeriod.dto';
import { AcademicPeriodMapper } from './mapper/academicPeriod.mapper';
import { AcademicPeriodBanner } from './schemas/academicPeriod-banner.schema';

@Injectable()
export class AcademicPeriodService {
  constructor(
    @InjectModel(AcademicPeriod.name)
    private academicPeriodModel: Model<AcademicPeriod>,
    @InjectModel(AcademicPeriodBanner.name)
    private academicPeriodBannerModel: Model<AcademicPeriodBanner>,
  ) {}

  async create(
    createAcademicPeriodDto: CreateAcademicPeriodDto,
  ): Promise<AcademicPeriod> {
    this.academicPeriodBannerModel.create(
      AcademicPeriodMapper.mapAcademicPeriodBanner(createAcademicPeriodDto),
    );
    return this.academicPeriodModel.create(
      AcademicPeriodMapper.mapAcademicPeriodBannerToSAM(
        createAcademicPeriodDto,
      ),
    );
  }
}
