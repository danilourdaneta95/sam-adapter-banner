import { Test, TestingModule } from '@nestjs/testing';
import { BenefitCatalogService } from './benefitcatalog.service';
import { getModelToken } from '@nestjs/mongoose';

describe('BenefitCatalogService', () => {
  let service: BenefitCatalogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BenefitCatalogService,
        {
          provide: getModelToken('BenefitCatalog'),
          useValue: {
            create: (data) => {
              return data;
            },
            findOne: (data) => {
              return {
                academicPeriod: '2020-1',
                valueType: 'percentage',
                percentage: 100,
                amount: 0,
                bannerName: 'Beca de Excelencia Académica',
                bannerNameSlug: 'beca-de-excelencia-academica',
                bannerCode: 'BEXA',
                bannerItemCode: 'BEXA',
                benefitType: 'academic',
                item: 'Beca de Excelencia Académica',
                academicPeriodData: '2020-1',
                benefitFor: 'matrícula',
                isAditional: false,
              };
            },
          },
        },
        {
          provide: getModelToken('BannerBenefitCatalog'),
          useValue: {
            create: (data) => {
              return data;
            },
          },
        },
      ],
    }).compile();

    service = module.get<BenefitCatalogService>(BenefitCatalogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createBenefitCatalog', () => {
    it('should return a BenefitCatalog', async () => {
      const benefitCatalogData = {
        academicPeriod: '2020-1',
        valueType: 'percentage',
        percentage: 100,
        amount: 0,
        bannerName: 'Beca de Excelencia Académica',
        bannerNameSlug: 'beca-de-excelencia-academica',
        bannerCode: 'BEXA',
        bannerItemCode: 'BEXA',
        benefitType: 'academic',
        item: 'Beca de Excelencia Académica',
        academicPeriodData: '2020-1',
        benefitFor: 'matrícula',
        isAditional: false,
      };
      const mockGetBenefitCatalog = (data) => {
        expect(data).toBeInstanceOf(Object);
        expect(data.academicPeriod).toBe('2020-1');
        expect(data.code).toBe('BEXA');
        return Promise.resolve(null);
      };
      jest
        .spyOn(service, 'getBenefitCatalog')
        .mockImplementation(mockGetBenefitCatalog);
      const result = await service.createBenefitCatalog(benefitCatalogData);
      expect(result.academicPeriod).toBe('2020-1');
      expect(result.valueType).toBe('percentage');
      expect(result.percentage).toBe(100);
    });
    it('should return a BenefitCatalog instace', async () => {
      const result = await service.getBenefitCatalog({
        academicPeriod: '2020-1',
      });
      expect(result).toBeInstanceOf(Object);
      expect(result.academicPeriod).toBe('2020-1');
      expect(result.valueType).toBe('percentage');
    });
  });
  describe('createBannerBenefitCatalog', () => {
    it('should return a BannerBenefitCatalog', async () => {
      const bannerBenefitCatalogData = {
        OUT_TIPO_BENEFICIO: 'Beca',
        OUT_PERIODO: '2020-1',
        OUT_EXEN_CODIGO: 'BEXA',
        OUT_EXEN_DESC: 'Beca de Excelencia Académica',
        OUT_EXEN_PER_ACAD: '2020-1',
        OUT_EXEN_CDET_PAGO: 'S',
        OUT_EXEN_CDET_CODIGO: 'BEXA',
        OUT_EXEN_CDET_DESC: 'Beca de Excelencia Académica',
        OUT_EXEN_CDET_PRIOR: '1',
        OUT_EXEN_CDET_PORC: '100',
        OUT_EXEN_CDET_MNIN: '0',
        OUT_EXEN_CDET_MMAX: '0',
        OUT_EXEN_FICA_TDOC: 'C',
        OUT_EXEN_FICA_DESC: 'Cédula de Ciudadanía',
        OUT_ACTIVITY_DATE: new Date(),
        OUT_USER_ID: 'sam',
      };

      const result = await service.createBannerBenefitCatalog(
        bannerBenefitCatalogData,
      );
      expect(result.OUT_PERIODO).toBe('2020-1');
      expect(result.OUT_EXEN_CDET_PORC).toBe('100');
      expect(result.OUT_EXEN_FICA_TDOC).toBe('C');
    });
  });
});
