import { Test, TestingModule } from '@nestjs/testing';
import { StudentController } from '../student.controller';
import { StudentService } from '../student.service';
import { StudentDTO } from '../dto/student.dto';
import { Student } from '../schemas/student.schema';
import StudentMapper from '../mapper/student.mapper';
import { ConfigService } from '@nestjs/config';

describe('StudentController', () => {
  let controller: StudentController;
  let service: StudentService;
  let studentMapper: StudentMapper;
  let configService: ConfigService;
  let mockStudentService = {
    createStudent: jest.fn(),
    saveStudent: jest.fn()
  };
  const mockStudentMapper = {
    mapStudenDataToBanner: jest.fn(),
    mapBannerDataToSam: jest.fn(),
  };
  const mockConfigService = {
    get: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentController],
      providers: [
        { provide: StudentService, useValue: mockStudentService },
        { provide: StudentMapper, useValue: mockStudentMapper },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();
    controller = module.get<StudentController>(StudentController);
    service = module.get<StudentService>(StudentService);
    studentMapper = module.get<StudentMapper>(StudentMapper);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('createStudent', () => {
    it('should return a student', async () => {
      const req: any = {
        name: 'Felipe',
        gender: 'M',
        lastname: 'Futo',
        email: 'asd@asd.com',
        rut: '12345678-9',
        password: '123456',
        phone: '+56912345678',
        birthDate: Date.now(),
        region: 'Metropolitana',
        passport: '12333',
        academicPeriod: '202310',
        blocked: false,
        zip: '1824',
        enable: true,
        program: '1222',
        ciudad: 'Santiago',
        direccion: 'Calle 123',
        comuna: 'Santiago',
        nationality: 'Chilena',
        segment: 'segment',
        studentStatus: 'Ok'
      };
      const mockSendBannerStudent = (data): Promise<Student> => {
        expect(data).toBeDefined();
        expect(data.header).toBeDefined();
        expect(data.person).toBeDefined();
        return Promise.resolve({
          name: data.name,
          gender: data.gender,
          lastname: data.lastname,
          email: data.email,
          rut: data.rut,
          password: data.password,
          phone: data.phone,
          birthDate: data.birthDate,
          region: data.region,
          passport: data.passport,
          academicPeriod: data.academicPeriod,
          blocked: data.blocked,
          zip: data.zip,
          enable: data.enable,
          program: data.program,
          ciudad: data.ciudad,
          direccion: data.direccion,
          comuna: data.comuna,
          nationality: data.nationality,
          segment: data.segment,
          studentStatus: data.studentStatus,
          pidm: '12345',
          id: '111111'
        })
      };
      const mockDataToSam = (data): Student => {
        expect(data).toBeDefined();
        return {
          name: 'Felipe',
          gender: 'M',
          lastname: 'Futo',
          email: 'asd@asd.com',
          rut: '12345678-9',
          password: '123456',
          phone: '+56912345678',
          birthDate: new Date(parseInt(Date.now().toString()) * 1000),
          region: 'Metropolitana',
          passport: '12333',
          academicPeriod: '202310',
          blocked: false,
          zip: '1824',
          enable: true,
          program: '1222',
          ciudad: 'Santiago',
          direccion: 'Calle 123',
          comuna: 'Santiago',
          nationality: 'Chilena',
          segment: 'segment',
          studentStatus: 'Ok',
          pidm: '',
          id: ''
        }
      }
      const mockToBannerStudent = (data) => {
        expect(data).toBeDefined();
        return {
          header: {
            data_origin: data.origin
          },
          person: {
            rut: data.rut,
            first_name: data.name,
            last_name: data.lastname,
            legacy: { code: 'P' },
            gender: 'M',
            citizen: { code: 'CH' },
            birth_date: data.birthDate,
            type: { code: 'PNAT' },
          },
          phones: [{
            phone: data.phone,
            phone_area: '56',
            type: { code: 'MA' },
            address_type: { code: 'PR' },
          }],
          address: [{
            type: { code: 'PR' },
            address: data.direccion,
            state: { code: '13' },
            zip: data.postalCode,
            county: { code: '13101' },
            nation: { code: 'CL' },
          }],
          emails: [
            {
              email_address: data.email,
              type: { code: 'CSOS' },
            },
          ]
        }
      };
      const mockConfigService = (key: string) => {
        switch (key) {
          case 'BASE_DATA_ORIGIN':
            return 'SAM-MATRICULA';
          case 'LEGACY_PERSON':
            return 'P';
          case 'TYPE_PERSON':
            return 'PNAT';
          case 'TYPE_EMAIL':
            return 'CPAR';
        }
      };
      jest.spyOn(configService, 'get').mockImplementation(mockConfigService);
      jest.spyOn(studentMapper, 'mapStudenDataToBanner').mockImplementation(mockToBannerStudent);
      jest.spyOn(studentMapper, 'mapBannerDataToSam').mockImplementation(mockDataToSam);
      jest.spyOn(service, 'createStudent').mockImplementation(mockSendBannerStudent);
      jest.spyOn(service, 'createStudent').mockResolvedValue({ ...req, pidm: 123456 });
      const result = await controller.createStudent(req);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('pidm');
      expect(result).toHaveProperty('email');
    });
    it('should return a error', async () => {
      const req: any = {
        name: 'Felipe',
        gender: 'M',
        lastname: 'Futo',
        email: 'asd@asd.com',
        rut: '12345678-9',
        password: '123456',
        phone: '+56912345678',
        birthDate: Date.now(),
        region: 'Metropolitana',
        passport: '12333',
        academicPeriod: '202310',
        blocked: false,
        zip: '1824',
        enable: true,
        program: '1222',
        ciudad: 'Santiago',
        direccion: 'Calle 123',
        comuna: 'Santiago',
        nationality: 'Chilena',
        segment: 'segment',
        studentStatus: 'Ok'
      };
      const mockDataToSam = (data): Student => {
        expect(data).toBeDefined();
        return {
          name: 'Felipe',
          gender: 'M',
          lastname: 'Futo',
          email: 'asd@asd.com',
          rut: '12345678-9',
          password: '123456',
          phone: '+56912345678',
          birthDate: new Date(parseInt(Date.now().toString()) * 1000),
          region: 'Metropolitana',
          passport: '12333',
          academicPeriod: '202310',
          blocked: false,
          zip: '1824',
          enable: true,
          program: '1222',
          ciudad: 'Santiago',
          direccion: 'Calle 123',
          comuna: 'Santiago',
          nationality: 'Chilena',
          segment: 'segment',
          studentStatus: 'Ok',
          pidm: '',
          id: ''
        }
      }
      const mockSendBannerStudent = (data) => {
        expect(data).toBeDefined();
        expect(data.header).toBeDefined();
        expect(data.person).toBeDefined();
        return Promise.resolve({
          data: {
            statusCode: 400,
            message: 'Error',
          },
        });
      };
      const mockToBannerStudent = (data) => {
        expect(data).toBeDefined();
        return {
          header: {
            data_origin: data.origin
          },
          person: {
            rut: data.rut,
            first_name: data.name,
            last_name: data.lastname,
            legacy: { code: 'P' },
            gender: 'M',
            citizen: { code: 'CH' },
            birth_date: data.birthDate,
            type: { code: 'PNAT' },
          },
          phones: [{
            phone: data.phone,
            phone_area: '56',
            type: { code: 'MA' },
            address_type: { code: 'PR' },
          }],
          address: [{
            type: { code: 'PR' },
            address: data.direccion,
            state: { code: '13' },
            zip: data.postalCode,
            county: { code: '13101' },
            nation: { code: 'CL' },
          }],
          emails: [
            {
              email_address: data.email,
              type: { code: 'CSOS' },
            },
          ]
        }
      };
      const mockConfigService = (key: string) => {
        switch (key) {
          case 'BASE_DATA_ORIGIN':
            return 'SAM-MATRICULA';
          case 'LEGACY_PERSON':
            return 'P';
          case 'TYPE_PERSON':
            return 'PNAT';
          case 'TYPE_EMAIL':
            return 'CPAR';
        }
      };
      jest.spyOn(configService, 'get').mockImplementation(mockConfigService);
      jest.spyOn(studentMapper, 'mapStudenDataToBanner').mockImplementation(mockToBannerStudent);
      jest.spyOn(studentMapper, 'mapBannerDataToSam').mockImplementation(mockDataToSam);
      jest.spyOn(service, 'createStudent').mockImplementation(mockSendBannerStudent);
      try {
        await controller.createStudent(req);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Error');
      }
    });
  });
});