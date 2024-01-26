import { Test, TestingModule } from '@nestjs/testing';
import { EndorsementService } from './endorsement.service';
import { getModelToken } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import bannerData from '../test-data/banner.data';
import samData from '../test-data/sam.data';

describe('EndorsementService', () => {
  let service: EndorsementService;
  let httpService: HttpService;
  const mockHttpService = {
    post: jest.fn(),
  };
  const mockConfigService = {
    get: jest.fn(),
  };
  const endorsementModel = {
    create: (data) => {
      return data;
    },
    findOne: jest.fn(),
  };
  let configService: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EndorsementService,
        { provide: HttpService, useValue: mockHttpService },
        { provide: ConfigService, useValue: mockConfigService },
        { provide: getModelToken('Sostenedor'), useValue: endorsementModel },
      ],
    }).compile();

    service = module.get<EndorsementService>(EndorsementService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createEndorsement', () => {
    it('should return a endorsement', async () => {
      const request: any = samData.VALID_ENDORSEMENT_SAM();
      const response = await service.createEndorsement(request);
      expect(response).toEqual(request);
    });
    it('should return a error', async () => {
      const request: any = {
        email: 'example@example.com',
        name: 'John',
        lastname: 'Doe',
        rut: '12345678-9',
        password: '123456',
        phone: '+56912345678',
        birthDate: Date.now(),
        similitude: 'Padre',
        region: 'Metropolitana',
        ciudad: 'Santiago',
        direccion: 'Calle 123',
        comuna: 'Santiago',
        beneficiarios: '12345678-9',
        selectedBeneficiario: '12345678-9',
        genre: 'Masculino',
        nationality: 'Chilena',
        postalCode: '1234567',
      };
      const mockCreate = (data) => {
        expect(data).toEqual(request);
        return Promise.reject('error');
      };
      jest.spyOn(endorsementModel, 'create').mockImplementation(mockCreate);
      try {
        await service.createEndorsement(request);
      } catch (error) {
        expect(error).toEqual('error');
      }
    });
  });
  describe('sendBannerEndorsement', () => {
    it('should return a banner endorsement', async () => {
      const request: any = bannerData.VALID_ENDORSEMENT_BANNER();
      const mockPostMethod = (url, data): any => {
        expect(url).toEqual('/banner/persona');
        expect(data).toEqual(request);
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
          });
          subs.complete();
        });
      };
      jest.spyOn(httpService, 'post').mockImplementation(mockPostMethod);
      const response = await service.sendBannerEndorsement(request);
      expect(response.data.statusCode).toEqual(200);
      expect(response.data.body.person.pidm).toEqual('123456');
    });
    it('should return a error', async () => {
      const request: any = bannerData.VALID_ENDORSEMENT_BANNER();
      const mockPostMethod = (url, data): any => {
        expect(url).toEqual('/banner/persona');
        expect(data).toEqual(request);
        return new Observable((subs) => {
          subs.next({
            data: {
              statusCode: 400,
              message: 'error',
            },
          });
          subs.complete();
        });
      };
      jest.spyOn(httpService, 'post').mockImplementation(mockPostMethod);
      try {
        await service.sendBannerEndorsement(request);
      } catch (error) {
        expect(error).toEqual('error');
      }
    });
  });
});
