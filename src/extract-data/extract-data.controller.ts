import { Controller, Get } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { TariffService } from '../tariff/tariff.service';
import { ProgramCatalogService } from '../program-catalogs/program-catalog.service';
import { ProgramCatalogMapper } from '../program-catalogs/mapper/program-catalogs.mapper';
import { AcademicPeriodService } from '../academicPeriod/academicPeriod.service';
import { BenefitCatalogService } from '../benefitcatalog/benefitcatalog.service';
import { BenefitCatalogMapper } from '../benefitcatalog/mappers/benefitcatalog.mapper';
import mapBaseSchema from '../customization/mapper/base.mapper';
import { ViaAdmissionService } from '../viaAdmission/viaAdmission.service';
import { SedeMapper } from '../sede/mapper/sede.mapper';
import { SedeService } from '../sede/sede.service';
import { CampusService } from '../campus/campus.service';
import { CampusMapper } from '../campus/mapper/campus.mapper';

@Controller('extract-data')
export class ExtractDataController {
  constructor(
    private readonly tariffService: TariffService,
    private readonly dataSource: DataSource,
    private readonly programCatalogService: ProgramCatalogService,
    private readonly programCatalogMapper: ProgramCatalogMapper,
    private readonly academicPeriodService: AcademicPeriodService,
    private readonly benefitCatalogService: BenefitCatalogService,
    private readonly benefitCatalogMapper: BenefitCatalogMapper,
    private readonly viaAdmissionService: ViaAdmissionService,
    private readonly sedeService: SedeService,
    private readonly sedeMapper: SedeMapper,
    private readonly campusService: CampusService,
    private readonly campusMapper: CampusMapper,
  ) {}

  @Get('tariffs')
  async getTariffs() {
    const rawQuery = `SELECT DISTINCT 
      R1.SFRRGFE_TERM_CODE PERIODO
    ,R1.SFRRGFE_TERM_CODE_ADMIT COHORTE
    ,R1.SFRRGFE_CAMP_CODE CODIGO_CAMPUS
    ,CAMP.STVCAMP_DESC CAMPUS
    ,R1.SFRRGFE_MAJR_CODE CODIGO_CARRERA
    ,MAJR.STVMAJR_DESC CARRERA
    ,R1.SFRRGFE_LEVL_CODE CODIGO_NIVEL
    ,LEVL.STVLEVL_DESC NIVEL
    ,R1.SFRRGFE_DETL_CODE CODIGO_ITEM
    ,DETC.TBBDETC_DESC
    ,R1.SFRRGFE_MIN_CHARGE PRECIO_MIN
    ,R1.SFRRGFE_MAX_CHARGE PRECIO_MAX
    ,TRUNC(R1.SFRRGFE_FROM_ADD_DATE) VIGENCIA_DESDE
    ,TRUNC(R1.SFRRGFE_TO_ADD_DATE) VIGENCIA_HASTA
    ,TRUNC(R1.SFRRGFE_ACTIVITY_DATE) FECHA_ACTIVIDAD
    ,R1.SFRRGFE_USER_ID ID_USUARIO
  FROM SFRRGFE R1
    INNER JOIN STVCAMP CAMP ON R1.SFRRGFE_CAMP_CODE = CAMP.STVCAMP_CODE
    INNER JOIN STVMAJR MAJR ON R1.SFRRGFE_MAJR_CODE = MAJR.STVMAJR_CODE
    INNER JOIN STVLEVL LEVL ON R1.SFRRGFE_LEVL_CODE = LEVL.STVLEVL_CODE
    INNER JOIN TBBDETC DETC ON R1.SFRRGFE_DETL_CODE = DETC.TBBDETC_DETAIL_CODE
  WHERE SUBSTR(R1.SFRRGFE_TERM_CODE,1,4) = SUBSTR(R1.SFRRGFE_TERM_CODE_ADMIT,1,4)
    AND TRUNC(SYSDATE) BETWEEN TRUNC(R1.SFRRGFE_FROM_ADD_DATE) AND TRUNC(R1.SFRRGFE_TO_ADD_DATE)
    AND R1.SFRRGFE_ACTIVITY_DATE = (SELECT MAX(SFRRGFE_ACTIVITY_DATE)
                    FROM SFRRGFE R2
                    WHERE R1.SFRRGFE_TERM_CODE = R2.SFRRGFE_TERM_CODE
                      AND R1.SFRRGFE_TERM_CODE_ADMIT = R2.SFRRGFE_TERM_CODE_ADMIT
                      AND R1.SFRRGFE_DETL_CODE = R2.SFRRGFE_DETL_CODE
                      AND R1.SFRRGFE_LEVL_CODE = R2.SFRRGFE_LEVL_CODE
                      AND R1.SFRRGFE_MAJR_CODE = R2.SFRRGFE_MAJR_CODE
                      AND R1.SFRRGFE_CAMP_CODE = R2.SFRRGFE_CAMP_CODE
                      AND TRUNC(SYSDATE) BETWEEN TRUNC(R2.SFRRGFE_FROM_ADD_DATE) AND TRUNC(R2.SFRRGFE_TO_ADD_DATE))
    AND R1.SFRRGFE_SEQNO = (SELECT MAX(SFRRGFE_SEQNO)
                FROM SFRRGFE R2
                WHERE R1.SFRRGFE_TERM_CODE = R2.SFRRGFE_TERM_CODE
                  AND R1.SFRRGFE_TERM_CODE_ADMIT = R2.SFRRGFE_TERM_CODE_ADMIT
                  AND R1.SFRRGFE_DETL_CODE = R2.SFRRGFE_DETL_CODE
                  AND R1.SFRRGFE_LEVL_CODE = R2.SFRRGFE_LEVL_CODE
                  AND R1.SFRRGFE_MAJR_CODE = R2.SFRRGFE_MAJR_CODE
                  AND R1.SFRRGFE_CAMP_CODE = R2.SFRRGFE_CAMP_CODE
                  AND TRUNC(SYSDATE) BETWEEN TRUNC(R2.SFRRGFE_FROM_ADD_DATE) AND TRUNC(R2.SFRRGFE_TO_ADD_DATE))
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const tariffResultPromises = queryResult.map((tariff) => {
        const mappedTariff = {
          SFRRGFE_TERM_CODE: tariff.PERIODO,
          SFRRGFE_TERM_CODE_ADMIT: tariff.COHORTE,
          SFRRGFE_CAMP_CODE: tariff.CODIGO_CAMPUS,
          STVCAMP_DESC: tariff.CAMPUS,
          SFRRGFE_MAJR_CODE: tariff.CODIGO_CARRERA,
          STVMAJR_DESC: tariff.CARRERA,
          SFRRGFE_LEVL_CODE: tariff.CODIGO_NIVEL,
          STVLEVL_DESC: tariff.NIVEL,
          SFRRGFE_DETL_CODE: tariff.CODIGO_ITEM,
          TBBDETC_DESC: tariff.TBBDETC_DESC,
          SFRRGFE_MIN_CHARGE: tariff.PRECIO_MIN,
          SFRRGFE_MAX_CHARGE: tariff.PRECIO_MAX,
          SFRRGFE_FROM_ADD_DATE: tariff.VIGENCIA_DESDE,
          SFRRGFE_TO_ADD_DATE: tariff.VIGENCIA_HASTA,
          SFRRGFE_ACTIVITY_DATE: tariff.FECHA_ACTIVIDAD,
          SFRRGFE_USER_ID: tariff.ID_USUARIO,
        };
        return this.tariffService.create(mappedTariff);
      });
      const tariffResult = await Promise.allSettled(tariffResultPromises);
      return tariffResult;
    } catch (error) {
      console.log('Query Tariff error', error);
    }
  }

  @Get('programs-catalog')
  async getProgramsCatalog() {
    const rawQuery = `SELECT DISTINCT MAJR.STVMAJR_CODE CODE,
        MAJR.STVMAJR_DESC NAME,
        COLL.STVCOLL_CODE CODIGO_FACULTAD,
        COLL.STVCOLL_DESC FACULTAD,
        DICD.GTVDICD_CODE CODIGO_SEDE,
        DICD.GTVDICD_DESC SEDE,
        CAMP.STVCAMP_CODE CODIGO_CAMPUS,
        CAMP.STVCAMP_DESC CAMPUS,
        LEVL.STVLEVL_CODE CODIGO_NIVEL,
        LEVL.STVLEVL_DESC NIVEL,
        CURR.SOBCURR_PROGRAM PROGRAMA,
        SORCMJR_ADM_IND CONTROL_ADMISION_CARRERA
        /*,(SELECT SORMCRL_ADM_IND FROM SORMCRL WHERE SORMCRL_CURR_RULE=CMJR.SORCMJR_CURR_RULE) CONTROL_ADMISION_GENERAL*/,
        SUBSTR('AVIGTACVT1'/*CURR.SOBCURR_PROGRAM*/,8,1) CODIGO_JORNADA,
        STVSESS_DESC JORNADA,
        SUBSTR('AVIGTACVT1'/*CURR.SOBCURR_PROGRAM*/,10,1) CODIGO_MODALIDAD
      FROM SORCMJR CMJR 
        INNER JOIN STVMAJR MAJR ON CMJR.SORCMJR_MAJR_CODE = MAJR.STVMAJR_CODE 
        INNER JOIN SOBCURR CURR ON CMJR.SORCMJR_CURR_RULE = CURR.SOBCURR_CURR_RULE 
        INNER JOIN STVCAMP CAMP ON CURR.SOBCURR_CAMP_CODE = CAMP.STVCAMP_CODE 
        INNER JOIN STVLEVL LEVL ON CURR.SOBCURR_LEVL_CODE = LEVL.STVLEVL_CODE 
        INNER JOIN GTVDICD DICD ON CAMP.STVCAMP_DICD_CODE = DICD.GTVDICD_CODE 
        INNER JOIN STVCOLL COLL ON CURR.SOBCURR_COLL_CODE = COLL.STVCOLL_CODE 
        INNER JOIN STVSESS SESS ON SESS.STVSESS_CODE = SUBSTR('AVIGTACVT1'/*CURR.SOBCURR_PROGRAM*/,8,1)
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const programsResultPromises = queryResult.map(async (program) => {
        const mappedProgram = {
          STVMAJR_CODE: program.CODE,
          STVMAJR_DESC: program.NAME,
          STVCOLL_CODE: program.CODIGO_FACULTAD,
          STVCOLL_DESC: program.FACULTAD,
          GTVDICD_CODE: program.CODIGO_SEDE,
          GTVDICD_DESC: program.SEDE,
          STVCAMP_CODE: program.CODIGO_CAMPUS,
          STVCAMP_DESC: program.CAMPUS,
          STVLEVL_CODE: program.CODIGO_NIVEL,
          STVLEVL_DESC: program.NIVEL,
          SOBCURR_PROGRAM: program.PROGRAMA,
          SORCMJR_ADM_IND: program.CONTROL_ADMISION_CARRERA,
          CODIGO_JORNADA: program.CODIGO_JORNADA,
          CODIGO_MODALIDAD: program.CODIGO_MODALIDAD,
        };
        const samMappedProgram =
          this.programCatalogMapper.mapBannerDataToProgramCatalog(
            mappedProgram,
          );
        const bannerMappedProgram =
          this.programCatalogMapper.mapBannerDataBanner(mappedProgram);
        await this.programCatalogService.createProgramCatalogBanner(
          bannerMappedProgram,
        );
        return this.programCatalogService.createProgramCatalog(
          samMappedProgram,
        );
      });
      const programsResult = await Promise.allSettled(programsResultPromises);
      return programsResult;
    } catch (error) {
      console.error('Query Program Catalog error', error);
    }
  }

  @Get('academic-periods')
  async getAcademicPeriods() {
    const rawQuery = `
    SELECT
        STVTERM_CODE CODE
      ,STVTERM_DESC DESCRIPTION
      ,STVTERM_START_DATE PERIODSTARTDATE
      ,STVTERM_END_DATE PERIODENDDATE
      ,STVTRMT_DESC TIPO_PERIODO
    FROM STVTERM TERM
      INNER JOIN STVTRMT TRMT ON TERM.STVTERM_TRMT_CODE = TRMT.STVTRMT_CODE
    WHERE TRUNC(SYSDATE) BETWEEN TRUNC(STVTERM_START_DATE) AND TRUNC(STVTERM_END_DATE)
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const academicPeriodsResultPromises = queryResult.map((period) => {
        const mappedPeriod = {
          STVTERM_CODE: period.CODE,
          STVTERM_DESC: period.DESCRIPTION,
          STVTERM_START_DATE: period.PERIODSTARTDATE,
          STVTERM_END_DATE: period.PERIODENDDATE,
          STVTRMT_DESC: period.TIPO_PERIODO,
        };
        return this.academicPeriodService.create(mappedPeriod);
      });
      const academicPeriodsResult = await Promise.allSettled(
        academicPeriodsResultPromises,
      );
      return academicPeriodsResult;
    } catch (error) {
      console.error('Query Academic Periods error', error);
    }
  }

  @Get('benefits-catalog/contracts')
  async getContractBenefits() {
    const rawQuery = `SELECT
        CDET.TBRCDET_SRCE_CODE OUT_TIPO_BENEFICIO
        ,NULL OUT_PERIODO
        ,CONT.TBBCONT_PIDM OUT_CONT_PIDM
        ,CONT.TBBCONT_CONTRACT_NUMBER OUT_CONT_CODIGO
        ,CONT.TBBCONT_DESC OUT_CONT_DESC
        ,CONT.TBBCONT_TERM_CODE OUT_CONT_PER_ACAD
        ,CONT.TBBCONT_DETAIL_PAY_CODE OUT_CONT_CPAGO
        ,CONT.TBBCONT_DETAIL_CHG_CODE OUT_CONT_CCARGO
        ,CDET.TBRCDET_DETAIL_CODE OUT_CONT_CDET_CODE
        ,DETC.TBBDETC_DESC OUT_CONT_CDET_DESC
        ,CDET.TBRCDET_DETAIL_PRIORITY OUT_CONT_CDET_PRIOR
        ,CDET.TBRCDET_PERCENT OUT_CONT_CDET_PORC
        ,CDET.TBRCDET_MIN_AMOUNT OUT_CONT_CDET_MMIN
        ,CDET.TBRCDET_MAX_AMOUNT OUT_CONT_CDET_MMAX
        ,SYSDATE OUT_ACTIVITY_DATE
        ,CONT.TBBCONT_USER_ID OUT_USER_ID
        ,CONT.TBBCONT_DATA_ORIGIN OUT_DATA_ORIGIN
      FROM TBBCONT CONT
        INNER JOIN TBRCDET CDET ON CONT.TBBCONT_TERM_CODE = CDET.TBRCDET_TERM_CODE
                                AND CONT.TBBCONT_CONTRACT_NUMBER = CDET.TBRCDET_CONTRACT_NUMBER
        INNER JOIN TBBDETC DETC ON CDET.TBRCDET_DETAIL_CODE = DETC.TBBDETC_DETAIL_CODE
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const contractBenefitsResultPromises = queryResult.map(
        async (contract) => {
          const mappedContract = {
            ...mapBaseSchema(),
            OUT_TIPO_BENEFICIO: 'C',
            OUT_PERIODO: null,
            OUT_CONT_PIDM: contract.OUT_CONT_PIDM,
            OUT_ACTIVITY_DATE: contract.OUT_ACTIVITY_DATE,
            OUT_USER_ID: contract.OUT_USER_ID,
            OUT_DATA_ORIGIN: contract.OUT_DATA_ORIGIN,
            OUT_EXEN_FICA_TDOC: null,
            OUT_EXEN_FICA_DESC: 'Internas',
            OUT_EXEN_DESC: contract.OUT_CONT_DESC,
            OUT_EXEN_CODIGO: contract.OUT_CONT_CODIGO,
            OUT_EXEN_PER_ACAD: contract.OUT_CONT_PER_ACAD,
            OUT_EXEN_CDET_PAGO: contract.OUT_CONT_CCARGO,
            OUT_EXEN_CDET_CODIGO: contract.OUT_CONT_CDET_CODE,
            OUT_EXEN_CDET_DESC: contract.OUT_CONT_CDET_DESC,
            OUT_EXEN_CDET_PRIOR: contract.OUT_CONT_CDET_PRIOR,
            OUT_EXEN_CDET_PORC: contract.OUT_CONT_CDET_PORC,
            OUT_EXEN_CDET_MNIN: contract.OUT_CONT_CDET_MMIN,
            OUT_EXEN_CDET_MMAX: contract.OUT_CONT_CDET_MMAX,
          };
          const mappedContractBenefit =
            this.benefitCatalogMapper.benefitCatalogMapper(mappedContract);
          await this.benefitCatalogService.createBannerBenefitCatalog(
            mappedContract,
          );
          return this.benefitCatalogService.createBenefitCatalog(
            mappedContractBenefit,
          );
        },
      );
      const contractBenefitsResult = await Promise.all(
        contractBenefitsResultPromises,
      );
      return contractBenefitsResult;
    } catch (error) {
      console.error('Query Contract Benefits error', error);
    }
  }

  @Get('benefits-catalog/exentions')
  async getExtensionBenefits() {
    const rawQuery = `
      SELECT
          EDET.TBREDET_SRCE_CODE OUT_TIPO_BENEFICIO
        ,NULL OUT_PERIODO
        ,EXPT.TBBEXPT_EXEMPTION_CODE OUT_EXEN_CODIGO
        ,EXPT.TBBEXPT_DESC OUT_EXEN_DESC
        ,EXPT.TBBEXPT_TERM_CODE OUT_EXEN_PER_ACAD
        ,EXPT.TBBEXPT_DETAIL_CODE OUT_EXEN_CDET_PAGO
        ,EDET.TBREDET_DETAIL_CODE OUT_EXEN_CDET_CODIGO
        ,DETC.TBBDETC_DESC OUT_EXEN_CDET_DESC
        ,EDET.TBREDET_DETAIL_PRIORITY OUT_EXEN_CDET_PRIOR
        ,EDET.TBREDET_PERCENT OUT_EXEN_CDET_PORC
        ,EDET.TBREDET_MIN_AMOUNT OUT_EXEN_CDET_MNIN
        ,EDET.TBREDET_MAX_AMOUNT OUT_EXEN_CDET_MMAX
        ,FICA.TZRFICA_DOCTYPE OUT_EXEN_FICA_TDOC
        ,FICA.TZRFICA_DESC_MAINOP OUT_EXEN_FICA_DESC
        ,SYSDATE OUT_ACTIVITY_DATE
        ,EXPT.TBBEXPT_USER_ID OUT_USER_ID
      FROM TBBEXPT EXPT
        INNER JOIN TBREDET EDET ON EXPT.TBBEXPT_EXEMPTION_CODE =  EDET.TBREDET_EXEMPTION_CODE
                                AND EXPT.TBBEXPT_TERM_CODE = EDET.TBREDET_TERM_CODE
        INNER JOIN TBBDETC DETC ON EDET.TBREDET_DETAIL_CODE = DETC.TBBDETC_DETAIL_CODE
        INNER JOIN TZRFICA FICA ON EXPT.TBBEXPT_DETAIL_CODE = FICA.TZRFICA_CODE
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const extensionBenefitsResultPromises = queryResult.map(
        async (extension) => {
          const mappedExtension = {
            ...mapBaseSchema(),
            OUT_TIPO_BENEFICIO: 'E',
            OUT_PERIODO: null,
            OUT_EXEN_CODIGO: extension.OUT_EXEN_CODIGO,
            OUT_ACTIVITY_DATE: extension.OUT_ACTIVITY_DATE,
            OUT_USER_ID: extension.OUT_USER_ID,
            OUT_EXEN_FICA_TDOC: extension.OUT_EXEN_FICA_TDOC,
            OUT_EXEN_FICA_DESC: extension.OUT_EXEN_FICA_DESC,
            OUT_EXEN_DESC: extension.OUT_EXEN_DESC,
            OUT_EXEN_PER_ACAD: extension.OUT_EXEN_PER_ACAD,
            OUT_EXEN_CDET_PAGO: extension.OUT_EXEN_CDET_PAGO,
            OUT_EXEN_CDET_CODIGO: extension.OUT_EXEN_CDET_CODIGO,
            OUT_EXEN_CDET_DESC: extension.OUT_EXEN_CDET_DESC,
            OUT_EXEN_CDET_PRIOR: extension.OUT_EXEN_CDET_PRIOR,
            OUT_EXEN_CDET_PORC: extension.OUT_EXEN_CDET_PORC,
            OUT_EXEN_CDET_MNIN: extension.OUT_EXEN_CDET_MNIN,
            OUT_EXEN_CDET_MMAX: extension.OUT_EXEN_CDET_MMAX,
          };
          const mappedExtensionBenefit =
            this.benefitCatalogMapper.benefitCatalogMapper(mappedExtension);
          await this.benefitCatalogService.createBannerBenefitCatalog(
            mappedExtension,
          );
          return this.benefitCatalogService.createBenefitCatalog(
            mappedExtensionBenefit,
          );
        },
      );
      const extensionBenefitsResult = await Promise.all(
        extensionBenefitsResultPromises,
      );
      return extensionBenefitsResult;
    } catch (error) {
      console.error('Query Extension Benefits error', error);
    }
  }

  @Get('admissions-ways-catalog')
  async getAdmissionsWaysCatalog() {
    const rawQuery = `
      SELECT STVADMT_CODE, STVADMT_DESC
        FROM STVADMT
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const mappedAdmissionsWaysCatalogPromises = queryResult.map(
        (admission) => {
          const mappedAdmission = {
            ...mapBaseSchema(),
            STVADMT_CODE: admission.STVADMT_CODE,
            STVADMT_DESC: admission.STVADMT_DESC,
          };
          return this.viaAdmissionService.create(mappedAdmission);
        },
      );
      const mappedAdmissionsWaysCatalog = await Promise.all(
        mappedAdmissionsWaysCatalogPromises,
      );
      return mappedAdmissionsWaysCatalog;
    } catch (error) {
      console.error('Query Admissions Ways Catalog error', error);
    }
  }

  @Get('sede-catalog')
  async getSedeCatalog() {
    const rawQuery = `
      SELECT GTVDICD_CODE, GTVDICD_DESC
        FROM GTVDICD DICD
      WHERE EXISTS(SELECT 1 FROM STVCAMP WHERE GTVDICD_CODE = STVCAMP_DICD_CODE)
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const mappedSedeCatalogPromises = queryResult.map(async (sede) => {
        const mappedSede = {
          ...mapBaseSchema(),
          GTVDICD_CODE: sede.GTVDICD_CODE,
          GTVDICD_DESC: sede.GTVDICD_DESC,
        };
        const samMappedSede = this.sedeMapper.mapBannerDataToSede(mappedSede);
        const bannerMappedSede = this.sedeMapper.mapBannerData(mappedSede);
        await this.sedeService.createSedeBanner(bannerMappedSede);
        return this.sedeService.createSede(samMappedSede);
      });
      const mappedSedeCatalog = await Promise.all(mappedSedeCatalogPromises);
      return mappedSedeCatalog;
    } catch (error) {
      console.error('Query Sede Catalog error', error);
    }
  }

  @Get('campus-catalog')
  async getCampusCatalog() {
    const rawQuery = `
      SELECT
        STVCAMP_CODE
        ,STVCAMP_DESC
        ,STVCAMP_DICD_CODE
      FROM STVCAMP
    `;
    try {
      const queryResult = await this.dataSource.query(rawQuery);
      const mappedCampusCatalogPromises = queryResult.map(async (campus) => {
        const mappedCampus = {
          ...mapBaseSchema(),
          STVCAMP_CODE: campus.STVCAMP_CODE,
          STVCAMP_DESC: campus.STVCAMP_DESC,
          STVCAMP_DICD_CODE: campus.STVCAMP_DICD_CODE,
        };
        const idSede = await this.campusService.createCampusBanner(
          mappedCampus,
        );
        const samMappedCampus = this.campusMapper.mapBannerDataToCampus(
          mappedCampus,
          idSede,
        );
        return this.campusService.createCampus(samMappedCampus);
      });
      const mappedCampusCatalog = await Promise.all(
        mappedCampusCatalogPromises,
      );
      return mappedCampusCatalog;
    } catch (error) {
      console.error('Query Campus Catalog error', error);
    }
  }
}
