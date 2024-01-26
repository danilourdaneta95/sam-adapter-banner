import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StudentDTO {
  @ApiProperty({description: 'Name student postulant'})
  @IsNotEmpty()
  @IsString()
  name: string;
  @ApiProperty({description: 'Gender student postulant'})
  @IsNotEmpty()
  @IsString()
  gender: string;
  @ApiProperty({description: 'Lastname student postulant'})
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @ApiProperty({description: 'Email student postulant'})
  @IsOptional()
  @IsEmail()
  email?: string;
  @ApiProperty({description: 'Natn code issue of international student postulant'})
  @IsOptional()
  @IsString()
  natnCodeIssue?: string;
  @ApiProperty({description: 'Rut student postulant'})
  @IsOptional()
  @IsString()
  rut?: string;
  @ApiProperty({description: 'Passport id student postulant'})
  @IsOptional()
  @IsString()
  passport?: string;
  @ApiProperty({description: 'Academic period'})
  @IsNotEmpty()
  @IsString()
  academicPeriod: string;
  @IsOptional()
  @IsString()
  pidm?: string;
  @ApiProperty({description: 'Recovery password token student postulant'})
  @IsOptional()
  @IsString()
  recoveryPasswordToken?: string;
  @ApiProperty({description: 'Password student postulant'})
  @IsOptional()
  @IsString()
  password?: string;
  @ApiProperty({description: 'Is blocked student postulant'})
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
  @ApiProperty({description: 'Phone student postulant'})
  @IsOptional()
  @IsString()
  phone?: string;
  @ApiProperty({description: 'Code of type of phone student postulant'})
  @IsOptional()
  @IsString()
  typeCodePhone?: string;
  @ApiProperty({description: 'Phone area student postulant'})
  @IsOptional()
  @IsString()
  phoneArea?: string;
  @ApiProperty({description: 'Address type student postulant'})
  @IsOptional()
  @IsString()
  addressType?: string;
  @ApiProperty({description: 'Code of state student postulant'})
  @IsOptional()
  @IsString()
  stateCode?: string;
  @ApiProperty({description: 'Zip student postulant'})
  @IsOptional()
  @IsString()
  zip?: string;
  @ApiProperty({description: 'Is enabled student postulant'})
  @IsOptional()
  @IsBoolean()
  enable?: boolean;
  @ApiProperty({description: 'Benefits student postulant'})
  @IsOptional()
  @IsArray()
  benefits?: string[];
  @ApiProperty({description: 'Convenio student postulant'})
  @IsOptional()
  @IsArray()
  convenio?: string[];
  @ApiProperty({description: 'Simulator step student postulant'})
  @IsOptional()
  @IsNumber()
  simulatorSteps?: number;
  @ApiProperty({description: 'Pay method student postulant'})
  @IsOptional()
  @IsString()
  payMethod?: string;
  @ApiProperty({description: 'Check CAE student postulant'})
  @IsOptional()
  @IsString()
  checkCAE?: string;
  @ApiProperty({description: 'Matriculator step student postulant'})
  @IsOptional()
  @IsNumber()
  matriculatorStep?: number;
  @ApiProperty({description: 'Career steps student postulant'})
  @IsOptional()
  @IsNumber()
  careerSteps?: number;
  @ApiProperty({description: 'Sostenedor student postulant'})
  @IsOptional()
  @IsString()
  sostenedor?: string;
  @ApiProperty({description: 'Id demre student postulant'})
  @IsOptional()
  @IsString()
  idDemre?: string;
  @ApiProperty({description: 'Campus id'})
  @IsOptional()
  @IsString()
  campus?: string;
  @ApiProperty({description: 'Program id'})
  @IsNotEmpty()
  @IsString()
  program: string;
  @ApiProperty({description: 'Origin university student postulant'})
  @IsOptional()
  @IsString()
  originUniversity?: string;
  @ApiProperty({description: 'Nationality student postulant'})
  @IsOptional()
  @IsString()
  nationality?: string;
  @ApiProperty({description: 'Region student postulant'})
  @IsOptional()
  @IsString()
  region?: string;
  @ApiProperty({description: 'Segment student postulant'})
  @IsNotEmpty()
  @IsString()
  segment: string;
  @ApiProperty({description: 'City student postulant'})
  @IsOptional()
  @IsString()
  ciudad?: string;
  @ApiProperty({description: 'Comuna student postulant'})
  @IsOptional()
  @IsString()
  comuna?: string;
  @ApiProperty({description: 'Is signed contract student postulant'})
  @IsOptional()
  @IsBoolean()
  contratoFirmado?: boolean;
  @ApiProperty({description: 'Address student postulant'})
  @IsOptional()
  @IsString()
  direccion?: string;
  @ApiProperty({description: 'Is alumn student postulant'})
  @IsOptional()
  @IsBoolean()
  isAlumn?: boolean;
  @ApiProperty({description: 'Student status student postulant'})
  @IsNotEmpty()
  @IsString()
  studentStatus: string;
  @IsOptional()
  @IsString()
  origin?: string; 
  @ApiProperty({description: 'Birth date student postulant'})
  @IsNotEmpty()
  @IsString()
  birthDate: Date;
  @ApiProperty({description: 'Term enrollment start student postulant'})
  @IsOptional()
  @IsDate()
  plazoMatriculaInicio?: Date;
  @ApiProperty({description: 'Favor balance student postulant'})
  @IsOptional()
  @IsString()
  saldoFavor?: string; 
  @ApiProperty({description: 'Total payment student postulant'})
  @IsOptional()
  @IsNumber()
  totalPayment?: number;
  @ApiProperty({description: 'Uploaded documents student postulant'})
  @IsOptional()
  @IsArray()
  uploadedDocuments?: string[];
  @ApiProperty({description: 'Grade student postulant'})
  @IsOptional()
  @IsString()
  grade?: string; 
  @ApiProperty({description: 'Is old student postulant'})
  @IsOptional()
  @IsBoolean()
  isOld?: boolean;
}