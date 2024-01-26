import {
  RegistrationUpdateOutDto,
  StudentPostulant,
} from '../dto/studentPostulant.dto';
import { parseDate } from '../utils/parseDate';
export class RegistrationUpdateMapper {
  static mapRegistrationUpdateToBanner(
    student: StudentPostulant,
  ): RegistrationUpdateOutDto {
    return {
      pidm: student?.pidm,
      programa: student?.program?.code || '-',
      periodo: student?.academicPeriod || '-',
      vigenciaMatricula: student?.plazoMatriculaTermino
        ? parseDate(student?.plazoMatriculaTermino)
        : parseDate(new Date()),
    };
  }
}
