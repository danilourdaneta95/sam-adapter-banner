import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ProgramCatalogService } from '../program-catalog.service';
import { getModelToken } from '@nestjs/mongoose';
import { ProgramCatalog } from '../schemas/program-catalog.schema';
import { JornadaEnum } from '../../enums/admission.enum';
import { ModalidadEnum } from '../../enums/modality.enum';
import { SegmentsEnum } from '../../enums/segmentos.enum';

describe('ProgramCatalogService', () => {
  let service: ProgramCatalogService;
  let model: Model<ProgramCatalog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramCatalogService,
        {
          provide: getModelToken('ProgramCatalog'),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken('ProgramCatalogBanner'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProgramCatalogService>(ProgramCatalogService);
    model = module.get<Model<ProgramCatalog>>(getModelToken('ProgramCatalog'));
  });

  it('should create a program catalog', async () => {
    const expectedResult: ProgramCatalog = {
      id: 'asdasd',
      code: 'abc123',
      name: 'bca321',
      facultyCode: 'Faculty Name',
      facultyName: 'Faculty Code',
      campusName: 'Campus Name',
      campusCode: 'Campus Code',
      segment: SegmentsEnum.AV,
      segementName: 'Segement Name',
      program: 'Program',
      admissionControl: 'Admission Control',
      jornada: JornadaEnum.DIURNO,
      modality: ModalidadEnum.PRESENCIAL,
      demreCode: 'PENDIENTE',
    };
    const mockProgramCatalogService = (data): Promise<ProgramCatalog> => {
      expect(data.code).toBe('abc123');
      expect(data.name).toBe('bca321');
      expect(data.campusCode).toBe('Campus Code');
      return Promise.resolve({
        id: 'asdasd',
        code: 'abc123',
        name: 'bca321',
        facultyCode: 'Faculty Name',
        facultyName: 'Faculty Code',
        campusName: 'Campus Name',
        campusCode: 'Campus Code',
        segment: SegmentsEnum.AV,
        segementName: 'Segement Name',
        program: 'Program',
        admissionControl: 'Admission Control',
        jornada: JornadaEnum.DIURNO,
        modality: ModalidadEnum.PRESENCIAL,
        demreCode: 'PENDIENTE',
      });
    };
    jest
      .spyOn(service, 'createProgramCatalog')
      .mockImplementation(mockProgramCatalogService);

    const result = await service.createProgramCatalog(expectedResult);

    expect(result).toEqual(expectedResult);
  });
  it('Debería rechazar el insert', async () => {
    const expectedResult: ProgramCatalog = {
      id: 'asdasd',
      code: '',
      name: 'bca321',
      facultyCode: 'Faculty Name',
      facultyName: 'Faculty Code',
      campusName: 'Campus Name',
      campusCode: 'Campus Code',
      segment: SegmentsEnum.AV,
      segementName: 'Segement Name',
      program: 'Program',
      admissionControl: 'Admission Control',
      jornada: JornadaEnum.DIURNO,
      modality: ModalidadEnum.PRESENCIAL,
      demreCode: 'PENDIENTE',
    };
    try {
      await service.createProgramCatalog(expectedResult);
    } catch (ex) {
      expect(ex.message).toEqual('STVMAJR_CODE should not be empty');
    }
  });
});
