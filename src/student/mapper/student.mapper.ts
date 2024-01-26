import { ConfigService } from '@nestjs/config';
import mapBaseSchema from '../../customization/mapper/base.mapper';
import { StudentDTO } from '../dto/student.dto';
// import { SedeBanner } from '../schemas/sede-banner.schema';
import { Student } from '../schemas/student.schema';

export default  class StudentMapper {

  mapBannerDataToSam(studentDto: StudentDTO): Student {
    return {
      ...mapBaseSchema(),
      name: studentDto.name,
      lastname: studentDto.lastname,
      email: studentDto.email,
      rut: studentDto.rut,
      passport: studentDto.passport,
      academicPeriod: studentDto.academicPeriod,
      pidm: studentDto.pidm,
      recoveryPasswordToken: studentDto.recoveryPasswordToken,
      password: studentDto.password,
      blocked: studentDto.blocked,
      phone: studentDto.phone,
      typeCodePhone:studentDto.typeCodePhone,
      addressType: studentDto.addressType,
      phoneArea: studentDto.phoneArea,
      benefits: studentDto.benefits,
      convenio: studentDto.convenio,
      simulatorSteps: studentDto.simulatorSteps,
      payMethod: studentDto.payMethod,
      checkCAE: studentDto.checkCAE,
      matriculatorStep: studentDto.matriculatorStep,
      careerSteps: studentDto.careerSteps,
      sostenedor: studentDto.sostenedor,
      idDemre: studentDto.idDemre,
      campus: studentDto.campus,
      program: studentDto.program,
      originUniversity: studentDto.originUniversity,
      nationality: studentDto.nationality,
      region: studentDto.region,
      segment: studentDto.segment,
      ciudad: studentDto.ciudad,
      comuna: studentDto.comuna,
      zip: studentDto.zip,
      stateCode: studentDto.stateCode,
      contratoFirmado: studentDto.contratoFirmado,
      direccion: studentDto.direccion,
      isAlumn: studentDto.isAlumn,
      studentStatus: studentDto.studentStatus,
      origin: studentDto.origin,
      birthDate: studentDto.birthDate,
      plazoMatriculaInicio: studentDto.plazoMatriculaInicio,
      saldoFavor: studentDto.saldoFavor,
      totalPayment: studentDto.totalPayment,
      uploadedDocuments: studentDto.uploadedDocuments,
      grade: studentDto.grade,
      isOld: studentDto.isOld,
      gender: studentDto.gender,
      natnCodeIssue: studentDto.natnCodeIssue
    };
  };
  private getInternationalInformation(data: Student) {
    return {
      passport_id: data.passport,
      natn_code_issue: data.natnCodeIssue
    };
  }
  private getDataConst(data: string) {
    let configService = new ConfigService();
    switch (data) {
      case 'origin': return configService.get<string>('BASE_DATA_ORIGIN');
      case 'legacy': return configService.get<string>('LEGACY_PERSON');
      case 'typePerson': return configService.get<string>('TYPE_PERSON');
      case 'typeEmail': return configService.get<string>('TYPE_EMAIL');
    }
  }
  private getCitizen(nationality: string) {
    if (nationality == 'Chile') return 'CH';
    return 'EX';
  }
  private getPersonInformation(data: Student) {
    let info;
    if (data.nationality !== "Chile") {
      info = {
        international_information: this.getInternationalInformation(data)
      }
    }
    return {
      ...info,
      rut: data.nationality != 'Chile' ? '' : data.rut,
      first_name: data.name,
      last_name: data.lastname,
      type: {
        code: this.getDataConst('typePerson')
      },
      birth_date: new Date(parseInt(data.birthDate.toString()) * 1000)
        .toLocaleDateString('es-CL')
        .replace(/[-]/g, '/'),
      legacy: {
        code: this.getDataConst('legacy')
      },
      gender: data.gender, //Consultar data.sexo
      citizen: {
        code: this.getCitizen(data.nationality)
      }
    }
  }
  private getEmails(email: string) {
    return [{
      type: {
        code: this.getDataConst('typeEmail')
      },
      email_address: email
    }]
  }
  private getCounty(comuna: string){
    return '13302';
  }
  private getState(state: string){
    return '13';
  }
  private getAddress(data: Student) {
    return [{
      type: {
        code: data.addressType,
      },
      address: data.direccion,
      state: {
        code: this.getState(data.region)
      },
      zip: data.zip,
      county: {
        code: this.getCounty(data.comuna)
      },
      nation: {
        code: this.getCitizen(data.nationality)
      }
    }]
  }
  private getPhones(data: Student) {
    return [{
      type: {
        code: data.typeCodePhone //Consultar
      },
      phone_area: data.phoneArea, //Consultar
      phone_number: data.phone,
      address_type: {
        code: data.addressType //Consultar
      }
    }];
  }
  private getEstudiante(data: Student) {
    if (data.sostenedor === data.rut)
      return data.rut;
    if (data.nationality !== 'Chile')
      return '=';
  }
  mapStudenDataToBanner(data: Student) {
    let info;
    if (data.nationality !== "Chile" || data.sostenedor === data.rut) {
      info = {
        estudiante: this.getEstudiante(data)
      }
    }
    return {
      ...info,
      header: {
        data_origin: this.getDataConst('origin')
      },
      person: this.getPersonInformation(data),
      phones: this.getPhones(data),
      addresses: this.getAddress(data),
      emails: this.getEmails(data.email)
    }
  }
}