import { Tariff } from '../schemas/tariff.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { TariffController } from '../tariff.controller';
import { TariffService } from '../tariff.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTariffDto } from '../dto/create-tariff.dto';
import { SegmentsEnum } from '../../enums/segmentos.enum';

jest.mock('uuid');

describe('TariffController', () => {
  let tariffController: TariffController;
  let tariffService: TariffService;
  let mockTariffService;

  beforeEach(async () => {
    mockTariffService = {
      create: () => {},
    };
    const tariff: TestingModule = await Test.createTestingModule({
      controllers: [TariffController],
      providers: [{ provide: TariffService, useValue: mockTariffService }],
    }).compile();

    tariffController = tariff.get<TariffController>(TariffController);
    tariffService = tariff.get<TariffService>(TariffService);
  });

  describe('createTariff', () => {
    it('should return a valid tariff', async () => {
      const data: CreateTariffDto = {
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
      const mockCreateTariffService = async (data): Promise<Tariff> => {
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
        expect(data.SFRRGFE_FROM_ADD_DATE).toStrictEqual(
          new Date(2022, 12, 12),
        ),
          expect(data.SFRRGFE_TO_ADD_DATE).toStrictEqual(
            new Date(2023, 12, 12),
          ),
          expect(data.SFRRGFE_ACTIVITY_DATE).toStrictEqual(
            new Date(2023, 4, 30),
          ),
          expect(data.SFRRGFE_USER_ID).toBe('1');
        return Promise.resolve({
          id: uuidv4.mockReturnValue('12345678-1234-1234-1234-123456789018'),
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
      jest
        .spyOn(tariffService, 'create')
        .mockImplementation(mockCreateTariffService);
      const result = await tariffController.create([data]);
      expect(result[0].status).toBe('fulfilled');
      expect(result[0].value.periodo).toBe(data.SFRRGFE_TERM_CODE);
      expect(result[0].value.cohorte).toBe(data.SFRRGFE_TERM_CODE_ADMIT);
      expect(result[0].value.codigo_campus).toBe(data.SFRRGFE_CAMP_CODE);
      expect(result[0].value.campus).toBe(data.STVCAMP_DESC);
      expect(result[0].value.codigo_carrera).toBe(data.SFRRGFE_MAJR_CODE);
      expect(result[0].value.carrera).toBe(data.STVMAJR_DESC);
      expect(result[0].value.codigo_nivel).toBe(data.SFRRGFE_LEVL_CODE);
      expect(result[0].value.nivel).toBe(data.STVLEVL_DESC);
      expect(result[0].value.codigo_item).toBe(data.SFRRGFE_DETL_CODE);
      expect(result[0].value.item).toBe(data.TBBDETC_DESC);
      expect(result[0].value.precio_min).toBe(data.SFRRGFE_MIN_CHARGE);
      expect(result[0].value.precio_max).toBe(data.SFRRGFE_MAX_CHARGE);
      expect(result[0].value.vigente_desde).toStrictEqual(
        data.SFRRGFE_FROM_ADD_DATE,
      );
      expect(result[0].value.vigente_hasta).toStrictEqual(
        data.SFRRGFE_TO_ADD_DATE,
      );
      expect(result[0].value.fecha_actividad).toStrictEqual(
        data.SFRRGFE_ACTIVITY_DATE,
      );
      expect(result[0].value.id_usuario).toBe(data.SFRRGFE_USER_ID);
    });
    it('Debería rechazar el insert', async () => {
      const dataBanner: CreateTariffDto = {
        SFRRGFE_TERM_CODE: '',
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
      try {
        await tariffController.create([dataBanner]);
      } catch (ex) {
        expect(ex.message).toEqual('SFRRGFE_TERM_CODE should not be empty');
      }
    });
  });
});
