interface StudentPostulant {
  _id: string;
  uploadedDocuments: string[];
  accountType: string;
  enable: boolean;
  isMatriculated: boolean;
  isAlumn: boolean;
  studentStatus: string;
  payMethod: any;
  careerCode: string;
  campus: string;
  isOld: boolean;
  fullName: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deleted: boolean;
  ciudad: string;
  comuna: string;
  direccion: string;
  phone: string;
  region: string;
  checkCAE: {
    hasCAE: boolean;
    monto: number;
  };
  saldoFavor: {
    isSelected: boolean;
    monto: any;
  };
  hasCAE: boolean;
  arancelToPay: {
    amount: number;
    reference: string;
  };
  matriculaToPay: {
    amount: number;
    reference: string;
  };
  totalPayment: number;
  retractData: any;
  plazoMatriculaTermino: Date;
  pidm: string;
  academicPeriod: string;
  program: Program;
}
interface Program {
  _id: string;
  benefits: string[];
  enabled: boolean;
  postulable: boolean;
  campus: string;
  segment: string;
  valorArancel: number;
  valorMatricula: number;
  academicPeriod: string;
  code: string;
  createdAt: Date;
  updatedAt: Date;
  startPeriod: Date;
  version: number;
  careerData: {
    _id: string;
    id: string;
    code: string;
    name: string;
    academicPeriodCode: string;
    jornada: string;
    segment: string;
    valorArancel: number;
    valorMatricula: number;
    modality: string;
    campusCode: string;
    createdAt: Date;
    updatedAt: Date;
  };
  modality: string;
  jornada: string;
  id: string;
}

interface RegistrationUpdateOutDto {
  pidm: string;
  programa: string;
  periodo: string;
  vigenciaMatricula: string;
}
export { RegistrationUpdateOutDto, StudentPostulant, Program };
