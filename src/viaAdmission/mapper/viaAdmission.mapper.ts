import mapBaseSchema from '../../customization/mapper/base.mapper';
import { ViaAdmission } from '../schemas/viaAdmission.schema';
import { CreateViaAdmissionDto } from '../dto/create-viaAdmission.dto';
import { ViaAdmissionBanner } from '../schemas/viaAdmission-banner.schema';

export class ViaAdmissionMapper {
  static mapViaAdmissionBannerToSAM(data: CreateViaAdmissionDto): ViaAdmission {
    return {
      ...mapBaseSchema(),
      name: data.STVADMT_DESC,
      slug: data.STVADMT_CODE,
      // segment: SegmentsEnum.AV,
    };
  }
  static mapViaAdmissionBanner(data: CreateViaAdmissionDto): ViaAdmissionBanner {
    return {
      ...mapBaseSchema(),
      STVADMT_DESC: data.STVADMT_DESC,
      STVADMT_CODE: data.STVADMT_CODE,
    };
  }
}
