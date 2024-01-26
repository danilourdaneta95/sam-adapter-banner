import { Test, TestingModule } from '@nestjs/testing';
import { CampusController } from '../campus.controller';
import { CampusService } from '../campus.service';
import { CampusDTO } from '../dto/campus.dto';
import { Campus } from '../schemas/campus.schema';
import { CampusMapper } from '../mapper/campus.mapper';

describe('CampusController', () => {
  let controller: CampusController;
  let service: CampusService;
  let mapper: CampusMapper;
  let mockCampusService;
  beforeEach(async () => {
    mockCampusService = {
      createCampus: () => {},
      createCampusBanner: () => {},
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CampusController],
      providers: [
        { provide: CampusService, useValue: mockCampusService },
        CampusMapper,
      ],
    }).compile();
    controller = module.get<CampusController>(CampusController);
    service = module.get<CampusService>(CampusService);
  });
  describe('createCampus', () => {
    it('Debería crear una campus', async () => {
      const dataBanner: CampusDTO = {
        STVCAMP_DESC: 'Universidad Nacional de Lanús',
        STVCAMP_CODE: 'UNLa',
        STVCAMP_DICD_CODE: 'SFILO',
      };

      const mockCampusService = (data): Promise<Campus> => {
        expect(data.name).toBe(dataBanner.STVCAMP_DESC);
        expect(data.code).toBe(dataBanner.STVCAMP_CODE);
        return Promise.resolve({
          id: 'asdad',
          name: 'Universidad Nacional de Lanús',
          code: 'UNLa',
          sede: 'SFILO',
          demreCode: 'PENDIENTE',
        });
      };
      jest.spyOn(service, 'createCampus').mockImplementation(mockCampusService);
      const result = await controller.createCampus(dataBanner);

      expect(result.name).toEqual(dataBanner.STVCAMP_DESC);
      expect(result.code).toEqual(dataBanner.STVCAMP_CODE);
      expect(result.sede).toEqual(dataBanner.STVCAMP_DICD_CODE);
    });
    it('Debería rechazar el insert', async () => {
      const dataBanner: CampusDTO = {
        STVCAMP_DESC: '',
        STVCAMP_CODE: 'UNLa',
        STVCAMP_DICD_CODE: 'SFILO',
      };
      try {
        await controller.createCampus(dataBanner);
      } catch (ex) {
        expect(ex.message).toEqual('STVCAMP_DESC should not be empty');
      }
    });
  });
});
