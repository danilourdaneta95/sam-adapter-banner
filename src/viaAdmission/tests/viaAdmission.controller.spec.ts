import { ViaAdmission } from '../../viaAdmission/schemas/viaAdmission.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { ViaAdmissionController } from './../viaAdmission.controller';
import { ViaAdmissionService } from './../viaAdmission.service';
import { v4 as uuidv4 } from 'uuid';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { CreateViaAdmissionDto } from './../dto/create-viaAdmission.dto';

jest.mock('uuid');

describe('ViaAdmissionController', () => {
  let viaAdmissionController: ViaAdmissionController;
  let viaAdmissionService: ViaAdmissionService;
  let mockViaAdmissionService;

  beforeEach(async () => {
    mockViaAdmissionService = {
      create: () => {},
    };
    const viaAdmission: TestingModule = await Test.createTestingModule({
      controllers: [ViaAdmissionController],
      providers: [
        { provide: ViaAdmissionService, useValue: mockViaAdmissionService },
      ],
    }).compile();

    viaAdmissionController = viaAdmission.get<ViaAdmissionController>(
      ViaAdmissionController,
    );
    viaAdmissionService =
      viaAdmission.get<ViaAdmissionService>(ViaAdmissionService);
  });

  describe('createViaAdmission', () => {
    it('should return a valid ViaAdmission', async () => {
      const data = {
        STVADMT_DESC: 'test',
        STVADMT_CODE: 'test01',
      };
      const mockCreateViaAdmissionService = async (
        data,
      ): Promise<ViaAdmission> => {
        expect(data.STVADMT_DESC).toBe('test');
        expect(data.STVADMT_CODE).toBe('test01');
        return Promise.resolve({
          id: uuidv4.mockReturnValue('12345678-1234-1234-1234-123456789018'),
          name: 'test',
          slug: 'test01',
          segment: SegmentsEnum.AV,
        });
      };
      jest
        .spyOn(viaAdmissionService, 'create')
        .mockImplementation(mockCreateViaAdmissionService);
      const result = await viaAdmissionController.create(data);
      expect(result.name).toBe(data.STVADMT_DESC);
      expect(result.slug).toBe(data.STVADMT_CODE);
    });
  });
  it('Debería rechazar el insert', async () => {
    const data: CreateViaAdmissionDto = {
      STVADMT_CODE: '',
      STVADMT_DESC: 'test',
    };
    try {
      await viaAdmissionController.create(data);
    } catch (ex) {
      expect(ex.message).toEqual('STVADMT_CODE should not be empty');
    }
  });
});
