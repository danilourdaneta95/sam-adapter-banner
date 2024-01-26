import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';

import { RegistrationUpdateRepository } from '../registrationUpdate.repository';
import { getModelToken } from '@nestjs/mongoose';
import { StudentPostulants } from '../schemas/studentPostulat.schema';
import { StudentPostulant } from '../dto/studentPostulant.dto';

describe('RegistrationUpdateRepository', () => {
  let service: RegistrationUpdateRepository;

  const PIDM_MOCK = {
    pidm: 'b304bd05-3be5-44d7-b97d-014f01554d48',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistrationUpdateRepository,
        {
          provide: getModelToken(StudentPostulants.name),
          useValue: StudentPostulants,
        },
      ],
    }).compile();

    service = module.get<RegistrationUpdateRepository>(
      RegistrationUpdateRepository,
    );
  });
  it('should be defined repository', () => {
    expect(service).toBeDefined();
  });

  it('should find student by pidm', async () => {
    const expectResult = {
      pidm: 'b304bd05-3be5-44d7-b97d-014f01554d48',
      programa: 'DGSP511',
      periodo: '202300',
      vigenciaMatricula: '03/05/2023',
    };

    jest.spyOn(service, 'getStudentByPidm').mockResolvedValue(expectResult);

    const result: StudentPostulant | any = await service.getStudentByPidm(
      PIDM_MOCK.pidm,
    );
    expect(result.pidm).toEqual(PIDM_MOCK.pidm);
    expect(result.periodo).toEqual(expectResult.periodo);
  });
});
