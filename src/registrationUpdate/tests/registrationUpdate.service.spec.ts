import { HttpService, HttpModule } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { RegistrationUpdateService } from '../registrationUpdate.service';
import { RegistrationUpdateRepository } from '../registrationUpdate.repository';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { StudentPostulants } from '../schemas/studentPostulat.schema';

describe('RegistrationUpdateService', () => {
  let service: RegistrationUpdateService;
  let http: HttpService;
  let config: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        RegistrationUpdateService,
        RegistrationUpdateRepository,
        ConfigService,
        {
          provide: getModelToken(StudentPostulants.name),
          useValue: StudentPostulants,
        },
      ],
    }).compile();

    service = module.get<RegistrationUpdateService>(RegistrationUpdateService);
    http = module.get<HttpService>(HttpService);
    config = module.get<ConfigService>(ConfigService);
  });
  it('RegistrationUpdateService should be defined  ', () => {
    expect(service).toBeDefined();
  });
  it('HttpService should be defined  ', () => {
    expect(http).toBeDefined();
  });
  it('ConfigService should be defined  ', () => {
    expect(config).toBeDefined();
  });
});
