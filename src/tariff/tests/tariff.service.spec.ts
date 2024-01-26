import { Test, TestingModule } from '@nestjs/testing';
import { TariffService } from '../tariff.service';
import { getModelToken } from '@nestjs/mongoose';
import { Tariff } from '../schemas/tariff.schema';
import { CreateTariffDto } from '../dto/create-tariff.dto';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { TariffMapper } from '../mapper/tariff.mapper';

describe('TariffService', () => {
  let service: TariffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TariffService,
        {
          provide: getModelToken('Arancel'),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken('ArancelBanner'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TariffService>(TariffService);
  });

  it('should create a program catalog', async () => {
    const expectedResult: CreateTariffDto = {
      SFRRGFE_TERM_CODE: '2023',
      SFRRGFE_TERM_CODE_ADMIT: '01',
      SFRRGFE_CAMP_CODE: 'COD',
      STVCAMP_DESC: 'Campus xxx',
      SFRRGFE_MAJR_CODE: 'INGC',
      STVMAJR_DESC: 'Ingenieria computación',
      SFRRGFE_LEVL_CODE: SegmentsEnum.AV,
      STVLEVL_DESC: '01',
      SFRRGFE_DETL_CODE: '001',
      TBBDETC_DESC: 'x',
      SFRRGFE_MIN_CHARGE: 10,
      SFRRGFE_MAX_CHARGE: 100,
      SFRRGFE_FROM_ADD_DATE: new Date(2022, 12, 12),
      SFRRGFE_TO_ADD_DATE: new Date(2023, 12, 12),
      SFRRGFE_ACTIVITY_DATE: new Date(2023, 4, 30),
      SFRRGFE_USER_ID: '1',
    };
    const mockTariffService = (data): Promise<Tariff> => {
      expect(data.SFRRGFE_TERM_CODE).toBe('2023');
      expect(data.SFRRGFE_TERM_CODE_ADMIT).toBe('01');
      expect(data.SFRRGFE_CAMP_CODE).toBe('COD');
      expect(data.STVCAMP_DESC).toBe('Campus xxx');
      expect(data.SFRRGFE_MAJR_CODE).toBe('INGC');
      expect(data.STVMAJR_DESC).toBe('Ingenieria computación');
      expect(data.SFRRGFE_LEVL_CODE).toBe(SegmentsEnum.AV);
      expect(data.STVLEVL_DESC).toBe('01');
      expect(data.SFRRGFE_DETL_CODE).toBe('001');
      expect(data.TBBDETC_DESC).toBe('x');
      expect(data.SFRRGFE_MIN_CHARGE).toBe(10);
      expect(data.SFRRGFE_MAX_CHARGE).toBe(100);
      expect(data.SFRRGFE_FROM_ADD_DATE).toStrictEqual(new Date(2022, 12, 12)),
      expect(data.SFRRGFE_TO_ADD_DATE).toStrictEqual(new Date(2023, 12, 12)),
      expect(data.SFRRGFE_ACTIVITY_DATE).toStrictEqual(new Date(2023, 4, 30)),
      expect(data.SFRRGFE_USER_ID).toBe('1');
      return Promise.resolve({
        id: '12345678-1234-1234-1234-123456789018',
        periodo: '2023',
        cohorte: '01',
        codigo_campus: 'COD',
        campus: 'Campus xxx',
        codigo_carrera: 'INGC',
        carrera: 'Ingenieria computación',
        codigo_nivel: SegmentsEnum.AV,
        nivel: '01',
        codigo_item: '001',
        item: 'x',
        precio_min: 10,
        precio_max: 100,
        vigente_desde: new Date(2022, 12, 12),
        vigente_hasta: new Date(2023, 12, 12),
        fecha_actividad: new Date(2023, 4, 30),
        id_usuario: '1',
        usuario: 'user_sys',
      });
    };
    jest.spyOn(service, 'create').mockImplementation(mockTariffService);

    const result = await service.create(expectedResult);

    expect(result.periodo).toBe(expectedResult.SFRRGFE_TERM_CODE);
    expect(result.cohorte).toBe(expectedResult.SFRRGFE_TERM_CODE_ADMIT);
    expect(result.codigo_campus).toBe(expectedResult.SFRRGFE_CAMP_CODE);
    expect(result.campus).toBe(expectedResult.STVCAMP_DESC);
    expect(result.codigo_carrera).toBe(expectedResult.SFRRGFE_MAJR_CODE);
    expect(result.carrera).toBe(expectedResult.STVMAJR_DESC);
    expect(result.codigo_nivel).toBe(expectedResult.SFRRGFE_LEVL_CODE);
    expect(result.nivel).toBe(expectedResult.STVLEVL_DESC);
    expect(result.codigo_item).toBe(expectedResult.SFRRGFE_DETL_CODE);
    expect(result.item).toBe(expectedResult.TBBDETC_DESC);
    expect(result.precio_min).toBe(expectedResult.SFRRGFE_MIN_CHARGE);
    expect(result.precio_max).toBe(expectedResult.SFRRGFE_MAX_CHARGE);
    expect(result.vigente_desde).toStrictEqual(expectedResult.SFRRGFE_FROM_ADD_DATE);
    expect(result.vigente_hasta).toStrictEqual(expectedResult.SFRRGFE_TO_ADD_DATE);
    expect(result.fecha_actividad).toStrictEqual(expectedResult.SFRRGFE_ACTIVITY_DATE);
    expect(result.id_usuario).toBe(expectedResult.SFRRGFE_USER_ID);
  });
});
