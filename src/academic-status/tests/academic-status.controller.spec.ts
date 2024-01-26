import { Test, TestingModule } from '@nestjs/testing';
import { AcademicStatusController } from '../academic-status.controller';
import { AcademicStatusService } from '../academic-status.service';

describe('AcademicStatusController', () => {
  let academicStatusController: AcademicStatusController;
  let academicStatusService: AcademicStatusService;
  let mockAcademicStatusService;

  beforeEach(async () => {
    mockAcademicStatusService = {
      update: () => {},
    };
    const academicStatus: TestingModule = await Test.createTestingModule({
      controllers: [AcademicStatusController],
      providers: [
        {
          provide: AcademicStatusService,
          useValue: mockAcademicStatusService,
        },
      ],
    }).compile();

    academicStatusController = academicStatus.get<AcademicStatusController>(AcademicStatusController);
    academicStatusService = academicStatus.get<AcademicStatusService>(AcademicStatusService);
  });

  describe('get', () => {
    it('should return all academicStatus', async () => {
      const academicStatus = {
        statusCode: 200,
        message: 'Alumno no posee el programa indicado',
      }; // Define the expected academicStatus object

      jest
        .spyOn(academicStatusService, 'update')
        .mockResolvedValue(academicStatus);

      const request = {
        pidm: '226329',
        periodo: '201310',
        programa: 'UG',
        estado_academico: 'RN',
      };
      const result = await academicStatusController.update(request);

      expect(result.statusCode).toBe(200);
      expect(result.message).toEqual(academicStatus.message);
    });

    it('should throw BadRequestException if service throws BadRequestException', async () => {
      const academicStatus = {
        statusCode: 400,
        message: 'Alumno no posee el programa indicado',
      }; // Define the expected academicStatus object

      jest
        .spyOn(academicStatusService, 'update')
        .mockResolvedValue(academicStatus);
      try {
        const request = {
          pidm: '226329',
          periodo: '201310',
          programa: 'UG',
          estado_academico: 'RN',
        };
        await academicStatusController.update(request);
      } catch (error) {
        expect(error.message).toBe(academicStatus.message);
      }
    });
  });
});
