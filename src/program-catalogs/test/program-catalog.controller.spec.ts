import { Test, TestingModule } from '@nestjs/testing';
import { ProgramCatalogController } from '../program-catalog.controller';
import { ProgramCatalogService } from '../program-catalog.service';
import { ProgramCatalogMapper } from '../mapper/program-catalogs.mapper';
import { ProgramCatalogDTO } from '../dto/program-catalog.dto';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { JornadaEnum } from '../../enums/admission.enum';
import { ModalidadEnum } from '../../enums/modality.enum';
import { ProgramCatalog } from '../schemas/program-catalog.schema';
import { ProgramCatalogBanner } from '../schemas/program-catalog-banner.schema';

describe('ProgramCatalogController', () => {
  let controller: ProgramCatalogController;
  let service: ProgramCatalogService;
  let mockProgramCatalogService;
  beforeEach(async () => {
    mockProgramCatalogService = {
      createProgramCatalog: () => {},
      createProgramCatalogBanner: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProgramCatalogController],
      providers: [
        ProgramCatalogService,
        ProgramCatalogMapper,
        { provide: ProgramCatalogService, useValue: mockProgramCatalogService },
      ],
    }).compile();
    controller = module.get<ProgramCatalogController>(ProgramCatalogController);
    service = module.get<ProgramCatalogService>(ProgramCatalogService);
  });
  describe('createProgramCatalog', () => {
    it('Debería crear un programa de catalogo', async () => {
      const dataBanner: ProgramCatalogDTO = {
        STVMAJR_CODE: 'abc123',
        STVMAJR_DESC: 'bca321',
        STVCOLL_CODE: 'Facultad Code',
        STVCOLL_DESC: 'Facultad Name',
        GTVDICD_CODE: 'Sede Code',
        GTVDICD_DESC: 'Sede Name',
        STVCAMP_CODE: 'Campus Code',
        STVCAMP_DESC: 'Campus Name',
        STVLEVL_CODE: SegmentsEnum.AV,
        STVLEVL_DESC: 'Segment Name',
        SOBCURR_PROGRAM: 'COD CARRERA',
        SORCMJR_ADM_IND: '1',
        CODIGO_JORNADA: JornadaEnum.DIURNO,
        CODIGO_MODALIDAD: ModalidadEnum.PRESENCIAL,
      };
      const mockProgramCatalogService = (data): Promise<ProgramCatalog> => {
        expect(data.code).toBe('abc123');
        expect(data.name).toBe('bca321');
        expect(data.campusCode).toBe('Campus Code');
        expect(data.segment).toBe(SegmentsEnum.AV);
        expect(data.jornada).toBe(JornadaEnum.DIURNO);
        expect(data.modality).toBe(ModalidadEnum.PRESENCIAL);
        return Promise.resolve({
          id: 'asdasd',
          code: 'abc123',
          name: 'bca321',
          facultyCode: 'Facultad Code',
          facultyName: 'Facultad Name',
          campusCode: 'Campus Code',
          campusName: 'Campus Name',
          segementName: 'Segment Name',
          program: 'COD CARRERA',
          admissionControl: '1',
          segment: SegmentsEnum.AV,
          jornada: JornadaEnum.DIURNO,
          modality: ModalidadEnum.PRESENCIAL,
          demreCode: 'PENDIENTE',
        });
      };
      jest
        .spyOn(service, 'createProgramCatalog')
        .mockImplementation(mockProgramCatalogService);

      const mockCreateProgramCatalogBanner = (
        data,
      ): Promise<ProgramCatalogBanner> => {
        expect(data.STVMAJR_CODE).toBe('abc123');
        expect(data.STVMAJR_DESC).toBe('bca321');
        expect(data.STVCAMP_CODE).toBe('Campus Code');
        expect(data.GTVDICD_CODE).toBe('Sede Code');
        expect(data.GTVDICD_DESC).toBe('Sede Name');
        expect(data.STVCOLL_CODE).toBe('Facultad Code');
        expect(data.STVCOLL_DESC).toBe('Facultad Name');
        expect(data.STVLEVL_CODE).toBe(SegmentsEnum.AV);
        expect(data.STVLEVL_DESC).toBe('Segment Name');
        expect(data.SOBCURR_PROGRAM).toBe('COD CARRERA');
        expect(data.SORCMJR_ADM_IND).toBe('1');
        expect(data.CODIGO_JORNADA).toBe(JornadaEnum.DIURNO);
        expect(data.CODIGO_MODALIDAD).toBe(ModalidadEnum.PRESENCIAL);
        return Promise.resolve({
          id: 'asdasd',
          STVMAJR_CODE: 'abc123',
          STVMAJR_DESC: 'bca321',
          STVCOLL_CODE: 'Facultad Code',
          STVCOLL_DESC: 'Facultad Name',
          GTVDICD_CODE: 'Sede Code',
          GTVDICD_DESC: 'Sede Name',
          STVCAMP_CODE: 'Campus Code',
          STVCAMP_DESC: 'Campus Name',
          STVLEVL_CODE: SegmentsEnum.AV,
          STVLEVL_DESC: 'Segment Name',
          SOBCURR_PROGRAM: 'COD CARRERA',
          SORCMJR_ADM_IND: '1',
          CODIGO_JORNADA: JornadaEnum.DIURNO,
          CODIGO_MODALIDAD: ModalidadEnum.PRESENCIAL,
        });
      };
      jest
        .spyOn(service, 'createProgramCatalogBanner')
        .mockImplementation(mockCreateProgramCatalogBanner);

      const result = await controller.createProgramCatalog(dataBanner);

      expect(result.code).toEqual(dataBanner.STVMAJR_CODE);
      expect(result.name).toEqual(dataBanner.STVMAJR_DESC);
      expect(result.campusCode).toEqual(dataBanner.STVCAMP_CODE);
      expect(result.segment).toEqual(dataBanner.STVLEVL_CODE);
      expect(result.jornada).toEqual(dataBanner.CODIGO_JORNADA);
      expect(result.modality).toEqual(dataBanner.CODIGO_MODALIDAD);
    });
    it('Debería rechazar el insert', async () => {
      const dataBanner: ProgramCatalogDTO = {
        STVMAJR_CODE: '',
        STVMAJR_DESC: 'bca321',
        STVCOLL_CODE: 'Facultad Code',
        STVCOLL_DESC: 'Facultad Name',
        GTVDICD_CODE: 'Sede Code',
        GTVDICD_DESC: 'Sede Name',
        STVCAMP_CODE: 'Campus Code',
        STVCAMP_DESC: 'Campus Name',
        STVLEVL_CODE: SegmentsEnum.AV,
        STVLEVL_DESC: 'Segment Name',
        SOBCURR_PROGRAM: 'COD CARRERA',
        SORCMJR_ADM_IND: '1',
        CODIGO_JORNADA: JornadaEnum.DIURNO,
        CODIGO_MODALIDAD: ModalidadEnum.PRESENCIAL,
      };
      try {
        await controller.createProgramCatalog(dataBanner);
      } catch (ex) {
        expect(ex.message).toEqual('STVMAJR_CODE should not be empty');
      }
    });
  });
});
