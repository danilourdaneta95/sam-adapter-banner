import { Test, TestingModule } from '@nestjs/testing';
import { ViaAdmission } from './../schemas/viaAdmission.schema';
import { ViaAdmissionService } from './../viaAdmission.service';
import { getModelToken } from '@nestjs/mongoose';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { CreateViaAdmissionDto } from './../dto/create-viaAdmission.dto';

describe('ViaAdmissionService', () => {
  let service: ViaAdmissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ViaAdmissionService,
        {
          provide: getModelToken('ViaAdmission'),
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: getModelToken('ViaAdmissionBanner'),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ViaAdmissionService>(ViaAdmissionService);
  });

  it('should create a program catalog', async () => {
    const expectedResult: CreateViaAdmissionDto = {
      STVADMT_DESC: 'test',
      STVADMT_CODE: 'test01',
    };
    const mockViaAdmissionService = (data): Promise<ViaAdmission> => {
      expect(data.STVADMT_DESC).toBe('test');
      expect(data.STVADMT_CODE).toBe('test01');
      return Promise.resolve({
        id: '12345678-1234-1234-1234-123456789018',
        name: 'test',
        slug: 'test01',
        segment: SegmentsEnum.AV,
      });
    };
    jest.spyOn(service, 'create').mockImplementation(mockViaAdmissionService);

    const result = await service.create(expectedResult);

    expect(result.name).toBe(expectedResult.STVADMT_DESC);
    expect(result.slug).toBe(expectedResult.STVADMT_CODE);
  });
});
