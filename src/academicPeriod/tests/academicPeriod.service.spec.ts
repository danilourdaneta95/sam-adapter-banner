import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriod } from './../schemas/academicPeriod.schema';
import { AcademicPeriodService } from './../academicPeriod.service';
import { getModelToken } from '@nestjs/mongoose';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { CreateAcademicPeriodDto } from './../dto/create-academicPeriod.dto';

describe('AcademicPeriodService', () => {
  let service: AcademicPeriodService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicPeriodService,
        {
          provide: getModelToken('AcademicPeriod'),
          useValue: {
            create: (data) => {
              return data;
            },
          },
        },
        {
          provide: getModelToken('AcademicPeriodBanner'),
          useValue: {
            create: (data) => {
              return data;
            },
          },
        },
      ],
    }).compile();

    service = module.get<AcademicPeriodService>(AcademicPeriodService);
  });

  it('should create a program catalog', async () => {
    const expectedResult: CreateAcademicPeriodDto = {
      STVTERM_CODE: 'test01',
      STVTERM_DESC: 'test',
      STVTERM_START_DATE: '19/04/2023',
      STVTERM_END_DATE: '31/12/2023',
      STVTRMT_DESC: 'test',
    };

    const result = await service.create(expectedResult);

    expect(result.code).toBe(expectedResult.STVTERM_CODE);
    expect(result.description).toBe(expectedResult.STVTERM_DESC);
    expect(result.periodStartDate).toBe(expectedResult.STVTERM_START_DATE);
    expect(result.periodEndDate).toBe(expectedResult.STVTERM_END_DATE);
  });
});
