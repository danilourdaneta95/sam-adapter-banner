import {
  BannerBenefitCatalogDTO,
  SAMBenefitCatalog,
} from '../dto/benefitcatalog.dto';
import { SharedService } from '../../shared/shared.service';
import benefitTypeMapper from '../../customization/mapper/benefitType.mapper';
import matriculaArancelMapper from '../../customization/mapper/matriculaArancel.mapper';
import mapBaseSchema from '../../customization/mapper/base.mapper';

export class BenefitCatalogMapper {
  benefitCatalogMapper(bannerData: BannerBenefitCatalogDTO): SAMBenefitCatalog {
    const bannerNameSlug = SharedService.createSlug(
      bannerData.OUT_EXEN_CDET_DESC,
    );
    const benefitType = benefitTypeMapper(bannerData.OUT_EXEN_FICA_DESC);
    const matriculaArancel = matriculaArancelMapper(
      bannerData.OUT_EXEN_CDET_CODIGO,
    );
    return {
      ...mapBaseSchema(),
      academicPeriod: bannerData.OUT_EXEN_PER_ACAD,
      valueType: null,
      percentage: Number(bannerData.OUT_EXEN_CDET_PORC),
      amount: Number(bannerData.OUT_EXEN_CDET_MMAX),
      bannerName: bannerData.OUT_EXEN_CDET_DESC,
      bannerNameSlug: bannerNameSlug,
      bannerCode: bannerData.OUT_EXEN_CDET_PAGO,
      bannerItemCode: bannerData.OUT_EXEN_CODIGO,
      benefitType: benefitType.sam,
      item: bannerData.OUT_EXEN_CDET_CODIGO,
      academicPeriodData: bannerData.OUT_EXEN_PER_ACAD,
      benefitFor: matriculaArancel.sam,
      isAditional: false,
    };
  }
}
