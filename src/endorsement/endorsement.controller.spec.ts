import { Test, TestingModule } from '@nestjs/testing';
import { EndorsementController } from './endorsement.controller';
import { EndorsementService } from './endorsement.service';
import EndorsementMapper from './mappers/endorsement.mapper';
import { ConfigService } from '@nestjs/config';

describe('EndorsementController', () => {
  let controller: EndorsementController;
  let service: EndorsementService;
  let endorsementMapper: EndorsementMapper;
  let configService: ConfigService;
  const mockEndorsementService = {
    sendBannerEndorsement: jest.fn(),
    createEndorsement: jest.fn(),
  };
  const mockEndorsementMapper = {
    toBannerEndorsement: jest.fn(),
  };
  const mockConfigService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndorsementController],
      providers: [
        { provide: EndorsementService, useValue: mockEndorsementService },
        { provide: EndorsementMapper, useValue: mockEndorsementMapper },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    controller = module.get<EndorsementController>(EndorsementController);
    service = module.get<EndorsementService>(EndorsementService);
    endorsementMapper = module.get<EndorsementMapper>(EndorsementMapper);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createEndorsement', () => {
    it('should return a endorsement', async () => {
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
      const mockSendBannerEndorsement = (data) => {
        expect(data).toBeDefined();
        expect(data.header).toBeDefined();
        expect(data.person).toBeDefined();
        return Promise.resolve({
          data: {
            statusCode: 200,
            body: {
              person: {
                pidm: 123456,
              },
            },
          },
        });
      };
      const mockToBannerEndorsement = (data) => {
        expect(data).toBeDefined();
        return {
          person: {
            rut: data.rut,
            first_name: data.name,
            last_name: data.lastname,
            type: { code: 'PNAT' },
            birth_date: data.birthDate,
            legacy: { code: 'P' },
            gender: 'M',
            citizen: { code: 'CH' },
          },
          phones: [
            {
              phone: data.phone,
              phone_area: '56',
              type: { code: 'MA' },
              address_type: { code: 'PR' },
            },
          ],
          addresses: [
            {
              type: { code: 'PR' },
              address: data.direccion,
              state: { code: '13' },
              zip: data.postalCode,
              county: { code: '13101' },
              nation: { code: 'CL' },
            },
          ],
          emails: [
            {
              email_address: data.email,
              type: { code: 'CSOS' },
            },
          ],
        };
      };
      const mockConfigService = (key: string) => {
        switch (key) {
          case 'DATA_ORIGIN':
            return 'BANNER';
          case 'DATA_USER':
            return 'user';
        }
      };
      jest.spyOn(configService, 'get').mockImplementation(mockConfigService);
      jest
        .spyOn(endorsementMapper, 'toBannerEndorsement')
        .mockImplementation(mockToBannerEndorsement);
      jest
        .spyOn(service, 'sendBannerEndorsement')
        .mockImplementation(mockSendBannerEndorsement);
      jest
        .spyOn(service, 'createEndorsement')
        .mockResolvedValue({ ...request, pidm: 123456 });
      const result = await controller.createEndorsement(request);
      expect(result).toBeDefined();
      expect(result).toHaveProperty('pidm');
      expect(result).toHaveProperty('email');
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
      const mockSendBannerEndorsement = (data) => {
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
      const mockToBannerEndorsement = (data) => {
        expect(data).toBeDefined();
        return {
          person: {
            rut: data.rut,
            first_name: data.name,
            last_name: data.lastname,
            type: { code: 'PNAT' },
            birth_date: data.birthDate,
            legacy: { code: 'P' },
            gender: 'M',
            citizen: { code: 'CH' },
          },
          phones: [
            {
              phone: data.phone,
              phone_area: '56',
              type: { code: 'MA' },
              address_type: { code: 'PR' },
            },
          ],
          addresses: [
            {
              type: { code: 'PR' },
              address: data.direccion,
              state: { code: '13' },
              zip: data.postalCode,
              county: { code: '13101' },
              nation: { code: 'CL' },
            },
          ],
          emails: [
            {
              email_address: data.email,
              type: { code: 'CSOS' },
            },
          ],
        };
      };
      const mockConfigService = (key: string) => {
        switch (key) {
          case 'DATA_ORIGIN':
            return 'BANNER';
          case 'DATA_USER':
            return 'user';
          case 'URL_BANNER_BASE':
            return 'http://localhost:3000';
        }
      };
      jest.spyOn(configService, 'get').mockImplementation(mockConfigService);
      jest
        .spyOn(endorsementMapper, 'toBannerEndorsement')
        .mockImplementation(mockToBannerEndorsement);
      jest
        .spyOn(service, 'sendBannerEndorsement')
        .mockImplementation(mockSendBannerEndorsement);
      try {
        await controller.createEndorsement(request);
      } catch (error) {
        expect(error).toBeDefined();
        expect(error.message).toBe('Error');
      }
    });
  });
});
