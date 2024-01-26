import mapBaseSchema from '../../customization/mapper/base.mapper';
import { Tariff } from '../schemas/tariff.schema';
import { CreateTariffDto } from './../dto/create-tariff.dto';
import { TariffBanner } from '../schemas/tariff-banner.schema';

export class TariffMapper {
  static mapTariffBannerToSAM(data: CreateTariffDto): Tariff {
    return {
      ...mapBaseSchema(),
      periodo: data.SFRRGFE_TERM_CODE,
      cohorte: data.SFRRGFE_TERM_CODE_ADMIT,
      codigo_campus: data.SFRRGFE_CAMP_CODE,
      campus: data.STVCAMP_DESC,
      codigo_carrera: data.SFRRGFE_MAJR_CODE,
      carrera: data.STVMAJR_DESC,
      codigo_nivel: data.SFRRGFE_LEVL_CODE,
      nivel: data.STVLEVL_DESC,
      codigo_item: data.SFRRGFE_DETL_CODE,
      item: data.TBBDETC_DESC,
      precio_min: data.SFRRGFE_MIN_CHARGE,
      precio_max: data.SFRRGFE_MAX_CHARGE,
      vigente_desde: data.SFRRGFE_FROM_ADD_DATE,
      vigente_hasta: data.SFRRGFE_TO_ADD_DATE,
      fecha_actividad: data.SFRRGFE_ACTIVITY_DATE,
      id_usuario: data.SFRRGFE_USER_ID,
      usuario: 'user_sys',
    };
  }
  static mapTariffBanner(data: CreateTariffDto): TariffBanner {
    return {
      ...mapBaseSchema(),
      SFRRGFE_TERM_CODE: data.SFRRGFE_TERM_CODE,
      SFRRGFE_TERM_CODE_ADMIT: data.SFRRGFE_TERM_CODE_ADMIT,
      SFRRGFE_CAMP_CODE: data.SFRRGFE_CAMP_CODE,
      STVCAMP_DESC: data.STVCAMP_DESC,
      SFRRGFE_MAJR_CODE: data.SFRRGFE_MAJR_CODE,
      STVMAJR_DESC: data.STVMAJR_DESC,
      SFRRGFE_LEVL_CODE: data.SFRRGFE_LEVL_CODE,
      STVLEVL_DESC: data.STVLEVL_DESC,
      SFRRGFE_DETL_CODE: data.SFRRGFE_DETL_CODE,
      TBBDETC_DESC: data.TBBDETC_DESC,
      SFRRGFE_MIN_CHARGE: data.SFRRGFE_MIN_CHARGE,
      SFRRGFE_MAX_CHARGE: data.SFRRGFE_MAX_CHARGE,
      SFRRGFE_FROM_ADD_DATE: data.SFRRGFE_FROM_ADD_DATE,
      SFRRGFE_TO_ADD_DATE: data.SFRRGFE_TO_ADD_DATE,
      SFRRGFE_ACTIVITY_DATE: data.SFRRGFE_ACTIVITY_DATE,
      SFRRGFE_USER_ID: data.SFRRGFE_USER_ID,
    };
  }
}
