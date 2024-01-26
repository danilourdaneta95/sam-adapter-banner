import { AcademicPeriod } from '../schemas/academicPeriod.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { AcademicPeriodController } from '../academicPeriod.controller';
import { AcademicPeriodService } from '../academicPeriod.service';
import { v4 as uuidv4 } from 'uuid';
import { SegmentsEnum } from '../../enums/segmentos.enum';

jest.mock('uuid');

describe('AcademicPeriodController', () => {
  let academicPeriodController: AcademicPeriodController;
  let academicPeriodService: AcademicPeriodService;
  let mockAcademicPeriodService;

  beforeEach(async () => {
    mockAcademicPeriodService = {
      create: () => {},
    };
    const academicPeriod: TestingModule = await Test.createTestingModule({
      controllers: [AcademicPeriodController],
      providers: [
        { provide: AcademicPeriodService, useValue: mockAcademicPeriodService },
      ],
    }).compile();

    academicPeriodController = academicPeriod.get<AcademicPeriodController>(
      AcademicPeriodController,
    );
    academicPeriodService = academicPeriod.get<AcademicPeriodService>(
      AcademicPeriodService,
    );
  });

  describe('createAcademicPeriod', () => {
    it('should return a valid AcademicPeriod', async () => {
      const data = {
        id: uuidv4.mockReturnValue('12345678-1234-1234-1234-123456789018'),
        STVTERM_CODE: 'test01',
        STVTERM_DESC: 'test',
        STVTERM_START_DATE: '19/04/2023',
        STVTERM_END_DATE: '31/12/2023',
        STVTRMT_DESC: 'test',
      };
      const mockCreateAcademicPeriodService = async (
        data,
      ): Promise<AcademicPeriod> => {
        expect(data.STVTERM_CODE).toBe('test01');
        expect(data.STVTERM_DESC).toBe('test');
        expect(data.STVTERM_START_DATE).toBe('19/04/2023');
        expect(data.STVTERM_END_DATE).toBe('31/12/2023');
        return Promise.resolve({
          id: uuidv4.mockReturnValue('12345678-1234-1234-1234-123456789018'),
          code: 'test01',
          description: 'test',
          periodStartDate: '19/04/2023',
          periodEndDate: '31/12/2023',
          periodType: 'test',
        });
      };
      jest
        .spyOn(academicPeriodService, 'create')
        .mockImplementation(mockCreateAcademicPeriodService);
      const result = await academicPeriodController.create(data);
      expect(result.code).toBe(data.STVTERM_CODE);
      expect(result.description).toBe(data.STVTERM_DESC);
      expect(result.periodStartDate).toBe(data.STVTERM_START_DATE);
      expect(result.periodEndDate).toBe(data.STVTERM_END_DATE);
    });
    it('Debería rechazar el insert', async () => {
      const data = {
        id: uuidv4.mockReturnValue('12345678-1234-1234-1234-123456789018'),
        STVTERM_CODE: '',
        STVTERM_DESC: 'test',
        STVTERM_START_DATE: '19/04/2023',
        STVTERM_END_DATE: '31/12/2023',
        STVTRMT_DESC: 'test',
      };
      try {
        await academicPeriodController.create(data);
      } catch (ex) {
        expect(ex.message).toEqual('STVTERM_CODE should not be empty');
      }
    });
  });
});
