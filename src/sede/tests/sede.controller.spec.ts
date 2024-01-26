import { Test, TestingModule } from '@nestjs/testing';
import { SedeController } from '../sede.controller';
import { SedeService } from '../sede.service';
import { SedeDTO } from '../dto/sede.dto';
import { Sede } from '../schemas/sede.schema';
import { SedeMapper } from '../mapper/sede.mapper';

describe('SedeController', () => {
  let controller: SedeController;
  let service: SedeService;
  let mockSedeService;
  beforeEach(async () => {
    mockSedeService = { createSede: () => {}, createSedeBanner: () => {} };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SedeController],
      providers: [
        { provide: SedeService, useValue: mockSedeService },
        SedeMapper,
      ],
    }).compile();
    controller = module.get<SedeController>(SedeController);
    service = module.get<SedeService>(SedeService);
  });
  describe('createSede', () => {
    it('Debería crear una sede', async () => {
      const dataBanner: SedeDTO = {
        GTVDICD_DESC: 'Sede Economía',
        GTVDICD_CODE: 'SECO',
      };
      const mockSedeService = (data): Promise<Sede> => {
        expect(data.name).toBe('Sede Economía');
        return Promise.resolve({
          id: 'asdad',
          name: 'Sede Economía',
          code: 'SECO',
        });
      };

      jest.spyOn(service, 'createSede').mockImplementation(mockSedeService);
      const result = await controller.createSede(dataBanner);

      expect(result.name).toEqual(dataBanner.GTVDICD_DESC);
    });
    it('Debería rechazar el insert', async () => {
      const dataBanner: SedeDTO = {
        GTVDICD_DESC: '',
        GTVDICD_CODE: 'SECO',
      };
      try {
        await controller.createSede(dataBanner);
      } catch (ex) {
        expect(ex.message).toEqual('GTVDICD_DESC should not be empty');
      }
    });
  });
});
