import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationUpdateRepository } from './registrationUpdate.repository';
import { RegistrationUpdateMapper } from './mapper/registrationUpdate';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class RegistrationUpdateService {
  constructor(
    private readonly registerUpdateRepository: RegistrationUpdateRepository,
    private readonly httpService: HttpService,
  ) {}

  async updateStudent(registrationUpdateDto: any): Promise<any> {
    try {
      /* Search Student by PIDM */
      const student: any = await this.registerUpdateRepository.getStudentByPidm(
        registrationUpdateDto.pidm,
      );
      /* Build Params */
      const body =
        RegistrationUpdateMapper.mapRegistrationUpdateToBanner(student);
      console.log(JSON.stringify(body, null, 4));
      /* Execute post and send data to banner */
      return firstValueFrom(
        this.httpService.post(
          '/banner/students/admision/set-enrrollment-state',
          body,
        ),
      );
    } catch (error) {
      throw new BadRequestException('Hubo un problema en la consulta');
    }
  }
}
