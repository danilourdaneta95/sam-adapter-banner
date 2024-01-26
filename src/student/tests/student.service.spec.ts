import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from '../student.service';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Student } from '../schemas/student.schema';
import samData from '../../test-data/sam.data';
import { Observable } from 'rxjs';

describe('StudentService', () => {
  let service: StudentService;
  let httpService: HttpService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn()
  };
  const mockHttpService = {
    post: jest.fn()
  };
  const studentModel = {
    create: (data) => {
      return data;
    },
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getModelToken('StudentPostulant'), useValue: studentModel },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('createStudent', () => {
    it('should return a student', async () => {
      const dataToSam: Student = {
        name: 'Felipe',
        gender: 'M',
        lastname: 'Futo',
        email: 'asd@asd.com',
        rut: '12345678-9',
        password: '123456',
        phone: '+56912345678',
        birthDate: new Date(parseInt(Date.now().toString()) * 1000),
        region: 'Metropolitana',
        zip: '1824',
        enable: true,
        program: '1222',
        ciudad: 'Santiago',
        direccion: 'Calle 123',
        comuna: 'Santiago',
        nationality: 'Chilena',
        segment: 'segment',
        studentStatus: 'Ok',
        pidm: '123456',
        id: '11111',
        academicPeriod: '202310'
      };
      const dataToBanner: any = {
        person: {
          rut: '12345',
          first_name: 'Pato',
          last_name: 'Cortez',
          type: { code: 'PNAT' },
          birth_date: '20/01/1970',
          legacy: { code: 'P' },
          gender: 'M',
          citizen: { code: 'CH' },
        },
        phones: [
          {
            phone_number: '56912345678',
            phone_area: '56',
            type: { code: 'MA' },
            address_type: { code: 'PR' },
          },
        ],
        addresses: [
          {
            type: { code: 'PR' },
            address: 'Calle 123',
            state: { code: '13' },
            zip: '1234567',
            county: { code: '13302' },
            nation: { code: 'CL' },
          },
        ],
        emails: [
          { email_address: 'example@example.com', type: { code: 'CSOS' } },
        ],
        header: { data_origin: 'SAM-MATICULADOR', user_id: 'uss-dev' },
      };
      const mockConfigService = (key: string) => {
        switch (key) {
          case 'BASE_URL_BANNER':
            return 'https://test.com/staging';
        }
      };
      jest.spyOn(configService, 'get').mockImplementation(mockConfigService);
      const mockPostMethod = (url, data): any => {
        expect(url).toEqual('https://test.com/staging/banner/persona');
        expect(data).toEqual(dataToBanner);
        return new Observable((subs) => {
          subs.next({
            data: {
              statusCode: 200,
              body: {
                person: {
                  pidm: '123456',
                },
              },
            },
            status: 200
          });
          subs.complete();
        });
      };
      jest.spyOn(httpService, 'post').mockImplementation(mockPostMethod);

      const response = await service.createStudent(dataToBanner, dataToSam);
      expect(response).toEqual(dataToSam);
    });
    it('should return error', async () => {
      //Variables
      const dataToBanner: any = {
        person: {
          rut: '12345',
          first_name: 'Pato',
          last_name: 'Cortez',
          type: { code: 'PNAT' },
          birth_date: '20/01/1970',
          legacy: { code: 'P' },
          gender: 'M',
          citizen: { code: 'CH' },
        },
        phones: [
          {
            phone_number: '56912345678',
            phone_area: '56',
            type: { code: 'MA' },
            address_type: { code: 'PR' },
          },
        ],
        addresses: [
          {
            type: { code: 'PR' },
            address: 'Calle 123',
            state: { code: '13' },
            zip: '1234567',
            county: { code: '13302' },
            nation: { code: 'CL' },
          },
        ],
        emails: [
          { email_address: 'example@example.com', type: { code: 'CSOS' } },
        ],
        header: { data_origin: 'SAM-MATICULADOR', user_id: 'uss-dev' },
      };
      const dataToSam: Student = {
        name: 'Felipe',
        gender: 'M',
        lastname: 'Futo',
        email: 'asd@asd.com',
        rut: '12345678-9',
        password: '123456',
        phone: '+56912345678',
        birthDate: new Date(parseInt(Date.now().toString()) * 1000),
        region: 'Metropolitana',
        zip: '1824',
        enable: true,
        program: '1222',
        ciudad: 'Santiago',
        direccion: 'Calle 123',
        comuna: 'Santiago',
        nationality: 'Chilena',
        segment: 'segment',
        studentStatus: 'Ok',
        pidm: '123456',
        id: '11111',
        academicPeriod: '202310'
      };
      //Mocks
      const mockPostMethod = (url, data): any => {
        expect(url).toEqual('https://test.com/staging/banner/persona');
        expect(data).toEqual(dataToBanner);
        return new Observable((subs) => {
          subs.next({
            data: {
              statusCode: 400,
              message: 'Bad request'
            },
            status: 200
          });
          subs.complete();
        });
      };
      const mockConfigService = (key: string) => {
        switch (key) {
          case 'BASE_URL_BANNER':
            return 'https://test.com/staging';
        }
      };
      //SpyOn
      jest.spyOn(configService, 'get').mockImplementation(mockConfigService);
      jest.spyOn(httpService, 'post').mockImplementation(mockPostMethod);
      try {
        await service.createStudent(dataToBanner, dataToSam);
      } catch (error) {
        expect(error.message).toEqual('Error status: 400');
      }
    });
  });
});
