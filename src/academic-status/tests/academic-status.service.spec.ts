import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AcademicStatusService } from './../academic-status.service';
import { UpdateAcademicStatusDto } from '../dto/update-academic-status.dto';
import { BannerResponse } from '../../types/banner-response.type';

describe('AcademicStatusService', () => {
  let service: AcademicStatusService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AcademicStatusService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AcademicStatusService>(AcademicStatusService);
    httpService = module.get<HttpService>(HttpService);
  });

  describe('update', () => {
    it('should update academic status', async () => {
      const data: BannerResponse<UpdateAcademicStatusDto[]> = {
        statusCode: 200,
        message: 'Alumno no posee el programa indicado',
        // Define your expected retentions object
      };

      const mockGetMethod = (url): any => {
        expect(url).toEqual('/banner/students/admision/renuncia-retracto');
        return new Observable((subs) => {
          subs.next({
            data: {
              statusCode: 200,
              message: 'Alumno no posee el programa indicado',
            },
          });
          subs.complete();
        });
      };

      jest.spyOn(httpService, 'post').mockImplementation(mockGetMethod);
      const request = {
        pidm: '226329',
        periodo: '201310',
        programa: 'UG',
        estado_academico: 'RN',
      };
      const result = await service.update(request);

      expect(result.statusCode).toBe(200);
      expect(result.message).toEqual(data.message);
    });

    it('should throw an error if the request fails', async () => {
      const mockPostMethod = (url): any => {
        expect(url).toEqual('/banner/students/admision/renuncia-retracto');
        return new Observable((subs) => {
          subs.next({
            data: {
              statusCode: 400,
              message: 'Alumno no posee el programa indicado',
            },
          });
          subs.complete();
        });
      };
      jest.spyOn(httpService, 'post').mockImplementation(mockPostMethod);
      try {
        const request = {
          pidm: '226329',
          periodo: '201310',
          programa: 'UG',
          estado_academico: 'RN',
        };
        await service.update(request);
      } catch (err) {
        expect(err.message).toEqual('error');
      }
    });
  });
});
