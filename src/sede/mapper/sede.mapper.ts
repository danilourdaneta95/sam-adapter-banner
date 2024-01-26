import mapBaseSchema from '../../customization/mapper/base.mapper';
import { SedeDTO } from '../dto/sede.dto';
import { SedeBanner } from '../schemas/sede-banner.schema';
import { Sede } from '../schemas/sede.schema';

export class SedeMapper {
  mapBannerDataToSede(bannerData: SedeDTO): Sede {
    return {
      ...mapBaseSchema(),
      name: bannerData.GTVDICD_DESC,
      //TODO: Verificar si este es el campo del código de la sede
      code: bannerData.GTVDICD_CODE,
    };
  };
  mapBannerData(bannerData: SedeDTO): SedeBanner {
    return {
      ...mapBaseSchema(),
      GTVDICD_DESC: bannerData.GTVDICD_DESC,
      //TODO: Verificar si este es el campo del código de la sede
      GTVDICD_CODE: bannerData.GTVDICD_CODE
    }
  };
}