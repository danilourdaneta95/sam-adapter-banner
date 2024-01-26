import mapBaseSchema from '../../customization/mapper/base.mapper';
import { ProgramCatalogDTO } from '../dto/program-catalog.dto';
import { ProgramCatalogBanner } from '../schemas/program-catalog-banner.schema';
import { ProgramCatalog } from '../schemas/program-catalog.schema';

export class ProgramCatalogMapper {
  mapBannerDataToProgramCatalog(bannerData: ProgramCatalogDTO): ProgramCatalog {
    return {
      ...mapBaseSchema(),
      code: bannerData.STVMAJR_CODE,
      name: bannerData.STVMAJR_DESC,
      facultyCode: bannerData.STVCOLL_CODE,
      facultyName: bannerData.STVCOLL_DESC,
      campusCode: bannerData.STVCAMP_CODE,
      campusName: bannerData.STVCAMP_DESC,
      segment: bannerData.STVLEVL_CODE,
      segementName: bannerData.STVLEVL_DESC,
      program: bannerData.SOBCURR_PROGRAM,
      admissionControl: bannerData.SORCMJR_ADM_IND,
      // academicPeriodCode: bannerData.CODIGO_CARRERA,
      jornada: bannerData.CODIGO_JORNADA,
      modality: bannerData.CODIGO_MODALIDAD,
      demreCode: 'PENDIENTE',
    };
  }

  mapBannerDataBanner(bannerData: ProgramCatalogDTO): ProgramCatalogBanner {
    return {
      ...mapBaseSchema(),
      STVMAJR_CODE: bannerData.STVMAJR_CODE,
      STVMAJR_DESC: bannerData.STVMAJR_DESC,
      STVCOLL_CODE: bannerData.STVCOLL_CODE,
      STVCOLL_DESC: bannerData.STVCOLL_DESC,
      STVCAMP_CODE: bannerData.STVCAMP_CODE,
      STVCAMP_DESC: bannerData.STVCAMP_DESC,
      STVLEVL_CODE: bannerData.STVLEVL_CODE,
      STVLEVL_DESC: bannerData.STVLEVL_DESC,
      SOBCURR_PROGRAM: bannerData.SOBCURR_PROGRAM,
      SORCMJR_ADM_IND: bannerData.SORCMJR_ADM_IND,
      // academicPeriodCode: bannerData.CODIGO_CARRERA,
      CODIGO_JORNADA: bannerData.CODIGO_JORNADA,
      CODIGO_MODALIDAD: bannerData.CODIGO_MODALIDAD,
      GTVDICD_CODE: bannerData.GTVDICD_CODE,
      GTVDICD_DESC: bannerData.GTVDICD_DESC,
    };
  }
}
