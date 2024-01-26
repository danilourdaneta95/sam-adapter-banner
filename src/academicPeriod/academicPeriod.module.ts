import { Module } from '@nestjs/common';
import { AcademicPeriodController } from './academicPeriod.controller';
import { AcademicPeriodService } from './academicPeriod.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AcademicPeriodBanner,
  AcademicPeriodBannerSchema,
} from './schemas/academicPeriod-banner.schema';
import {
  AcademicPeriod,
  AcademicPeriodSchema,
} from './schemas/academicPeriod.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AcademicPeriod.name, schema: AcademicPeriodSchema },
      { name: AcademicPeriodBanner.name, schema: AcademicPeriodBannerSchema },
    ]),
  ],
  controllers: [AcademicPeriodController],
  providers: [AcademicPeriodService],
  exports: [AcademicPeriodService],
})
export class AcademicPeriodModule {}
