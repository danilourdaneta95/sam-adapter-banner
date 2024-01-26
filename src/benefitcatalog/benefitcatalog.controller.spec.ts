/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { BenefitCatalogController } from './benefitcatalog.controller';
import { BenefitCatalogService } from './benefitcatalog.service';
import { BenefitCatalogMapper } from './mappers/benefitcatalog.mapper';

describe('BenefitCatalogController', () => {
  let controller: BenefitCatalogController;
  let service: BenefitCatalogService;
  let mockBenefitCatalogService;

  beforeEach(async () => {
    mockBenefitCatalogService = {
      createBenefitCatalog: () => {},
      getBenefitCatalog: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BenefitCatalogController],
      providers: [
        {
          provide: BenefitCatalogService,
          useValue: mockBenefitCatalogService,
        },
        BenefitCatalogMapper,
      ],
    }).compile();

    controller = module.get<BenefitCatalogController>(BenefitCatalogController);
    service = module.get<BenefitCatalogService>(BenefitCatalogService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createBenefitCatalog', () => {
    it('should return a BenefitCatalog', async () => {
      const benefitCatalogData = {
        OUT_TIPO_BENEFICIO: 'Beca',
        OUT_PERIODO: '2020-1',
        OUT_EXEN_CODIGO: 'BEXA',
        OUT_EXEN_DESC: 'Beca de Excelencia Académica',
        OUT_EXEN_PER_ACAD: '2020-1',
        OUT_EXEN_CDET_PAGO: 'S',
        OUT_EXEN_CDET_CODIGO: 'Matrícula',
        OUT_EXEN_CDET_DESC: 'Beca de Excelencia Académica',
        OUT_EXEN_CDET_PRIOR: '1',
        OUT_EXEN_CDET_PORC: '100',
        OUT_EXEN_CDET_MNIN: '0',
        OUT_EXEN_CDET_MMAX: '0',
        OUT_EXEN_FICA_TDOC: 'C',
        OUT_EXEN_FICA_DESC: 'Beca Internas',
        OUT_ACTIVITY_DATE: new Date(),
        OUT_USER_ID: 'sam',
      };
      const mockGetBenefitCatalog = (data) => {
        expect(data.academicPeriod).toBe('2020-1');
        expect(data.code).toBe('BEXA');
        return Promise.resolve(null);
      };
      jest.spyOn(service, 'createBenefitCatalog').mockResolvedValue({
        id: '1',
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
      });
      jest
        .spyOn(mockBenefitCatalogService, 'getBenefitCatalog')
        .mockImplementation(mockGetBenefitCatalog);
      const result = await controller.createBenefitCatalog(benefitCatalogData);
      expect(result.academicPeriod).toEqual('2020-1');
      expect(result.valueType).toEqual('percentage');
    });
    it('should return an error', async () => {
      const date = new Date();
      const benefitCatalogData = {
        OUT_TIPO_BENEFICIO: 'Beca',
        OUT_PERIODO: '2020-1',
        OUT_EXEN_CODIGO: 'BEXA',
        OUT_EXEN_DESC: 'Beca de Excelencia Académica',
        OUT_EXEN_PER_ACAD: '2020-1',
        OUT_EXEN_CDET_PAGO: 'S',
        OUT_EXEN_CDET_CODIGO: 'Matrícula',
        OUT_EXEN_CDET_DESC: 'Beca de Excelencia Académica',
        OUT_EXEN_CDET_PRIOR: '1',
        OUT_EXEN_CDET_PORC: '100',
        OUT_EXEN_CDET_MNIN: '0',
        OUT_EXEN_CDET_MMAX: '0',
        OUT_EXEN_FICA_TDOC: 'C',
        OUT_EXEN_FICA_DESC: 'Beca Internas',
        OUT_ACTIVITY_DATE: date,
        OUT_USER_ID: 'sam',
      };
      const mockGetBenefitCatalog = (data) => {
        expect(data.academicPeriod).toBe('2020-1');
        expect(data.code).toBe('BEXA');
        return Promise.resolve({
          OUT_TIPO_BENEFICIO: 'Beca',
          OUT_PERIODO: '2020-1',
          OUT_EXEN_CODIGO: 'BEXA',
          OUT_EXEN_DESC: 'Beca de Excelencia Académica',
          OUT_EXEN_PER_ACAD: '2020-1',
          OUT_EXEN_CDET_PAGO: 'S',
          OUT_EXEN_CDET_CODIGO: 'Matrícula',
          OUT_EXEN_CDET_DESC: 'Beca de Excelencia Académica',
          OUT_EXEN_CDET_PRIOR: '1',
          OUT_EXEN_CDET_PORC: '100',
          OUT_EXEN_CDET_MNIN: '0',
          OUT_EXEN_CDET_MMAX: '0',
          OUT_EXEN_FICA_TDOC: 'C',
          OUT_EXEN_FICA_DESC: 'Beca Internas',
          OUT_ACTIVITY_DATE: date,
          OUT_USER_ID: 'sam',
        });
      };
      jest
        .spyOn(mockBenefitCatalogService, 'getBenefitCatalog')
        .mockImplementation(mockGetBenefitCatalog);
      try {
        await controller.createBenefitCatalog(benefitCatalogData);
      } catch (error) {
        expect(error.response).toEqual({
          message: 'BenefitCatalog already exists',
          data: benefitCatalogData,
        });
        expect(error.status).toEqual(400);
      }
    });
  });
});
