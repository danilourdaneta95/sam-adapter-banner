import mapBaseSchema from '../../customization/mapper/base.mapper';
import { CampusDTO } from '../dto/campus.dto';
import { CampusBanner } from '../schemas/campus-banner.schema';
import { Campus } from '../schemas/campus.schema';

export class CampusMapper {
  mapBannerDataToCampus(bannerData: CampusDTO, idSede: string): Campus {
    return {
      ...mapBaseSchema(),
      name: bannerData.STVCAMP_DESC,
      code: bannerData.STVCAMP_CODE,
      sede: idSede, //Guardo el '_id' de la sede
      demreCode: 'PENDIENTE',
    };
  }
  mapBannerData(bannerData: CampusDTO): CampusBanner {
    return {
      ...mapBaseSchema(),
      STVCAMP_DESC: bannerData.STVCAMP_DESC,
      STVCAMP_CODE: bannerData.STVCAMP_CODE,
      STVCAMP_DICD_CODE: bannerData.STVCAMP_DICD_CODE,
    };
  }
}
