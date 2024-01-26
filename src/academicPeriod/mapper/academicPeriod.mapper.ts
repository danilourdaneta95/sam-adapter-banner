import mapBaseSchema from '../../customization/mapper/base.mapper';
import { AcademicPeriod } from '../schemas/academicPeriod.schema';
import { CreateAcademicPeriodDto } from '../dto/create-academicPeriod.dto';
import { AcademicPeriodBanner } from '../schemas/academicPeriod-banner.schema';

export class AcademicPeriodMapper {
  static mapAcademicPeriodBannerToSAM(
    data: CreateAcademicPeriodDto,
  ): AcademicPeriod {
    return {
      ...mapBaseSchema(),
      code: data.STVTERM_CODE,
      description: data.STVTERM_DESC,
      periodStartDate: data.STVTERM_START_DATE,
      periodEndDate: data.STVTERM_END_DATE,
      periodType: data.STVTRMT_DESC,
      // segment: SegmentsEnum.AV,
    };
  }
  static mapAcademicPeriodBanner(
    data: CreateAcademicPeriodDto,
  ): AcademicPeriodBanner {
    return {
      ...mapBaseSchema(),
      STVTERM_CODE: data.STVTERM_CODE,
      STVTERM_DESC: data.STVTERM_DESC,
      STVTERM_START_DATE: data.STVTERM_START_DATE,
      STVTERM_END_DATE: data.STVTERM_END_DATE,
      STVTRMT_DESC: data.STVTRMT_DESC,
    };
  }
}
