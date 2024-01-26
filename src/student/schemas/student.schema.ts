import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Base } from '../../customization/schemas/base.schema';
import { HydratedDocument } from 'mongoose';

export type StudentDocument = HydratedDocument<Student>;

@Schema()
export class Student extends Base {
  @Prop()
  @IsNotEmpty()
  @IsString()
  name: string;
  @Prop()
  @IsNotEmpty()
  @IsString()
  lastname: string;
  @Prop()
  @IsOptional()
  @IsEmail()
  email?: string;
  @Prop()
  @IsOptional()
  @IsString()
  rut?: string;
  @Prop()
  @IsOptional()
  @IsString()
  passport?: string;
  @Prop()
  @IsNotEmpty()
  @IsString()
  academicPeriod: string;
  @Prop()
  @IsNotEmpty()
  @IsString()
  pidm: string;
  @Prop()
  @IsOptional()
  @IsString()
  recoveryPasswordToken?: string;
  @Prop()
  @IsOptional()
  @IsString()
  password?: string;
  @Prop()
  @IsOptional()
  @IsBoolean()
  blocked?: boolean;
  @Prop()
  @IsOptional()
  @IsString()
  phone?: string;
  @Prop()
  @IsNotEmpty()
  @IsString()
  gender: string;
  @Prop()
  @IsOptional()
  @IsString()
  natnCodeIssue?: string;
  @Prop()
  @IsOptional()
  @IsString()
  typeCodePhone?: string;
  @Prop()
  @IsOptional()
  @IsString()
  phoneArea?: string;
  @Prop()
  @IsOptional()
  @IsString()
  addressType?: string;
  @Prop()
  @IsOptional()
  @IsString()
  stateCode?: string;
  @Prop()
  @IsOptional()
  @IsString()
  zip?: string;
  @Prop()
  @IsOptional()
  @IsBoolean()
  enable?: boolean;
  @Prop()
  @IsOptional()
  @IsArray()
  benefits?: string[];
  @Prop()
  @IsOptional()
  @IsArray()
  convenio?: string[];
  @Prop()
  @IsOptional()
  @IsNumber()
  simulatorSteps?: number;
  @Prop()
  @IsOptional()
  @IsString()
  payMethod?: string;
  @Prop()
  @IsOptional()
  @IsString()
  checkCAE?: string;
  @Prop()
  @IsOptional()
  @IsNumber()
  matriculatorStep?: number;
  @Prop()
  @IsOptional()
  @IsNumber()
  careerSteps?: number;
  @Prop()
  @IsOptional()
  @IsString()
  sostenedor?: string;
  @Prop()
  @IsOptional()
  @IsString()
  idDemre?: string;
  @Prop()
  @IsOptional()
  @IsString()
  campus?: string;
  @Prop()
  @IsNotEmpty()
  @IsString()
  program: string;
  @Prop()
  @IsOptional()
  @IsString()
  originUniversity?: string;
  @Prop()
  @IsOptional()
  @IsString()
  nationality?: string;
  @Prop()
  @IsOptional()
  @IsString()
  region?: string;
  @Prop()
  @IsNotEmpty()
  @IsString()
  segment: string;
  @Prop()
  @IsOptional()
  @IsString()
  ciudad?: string;
  @Prop()
  @IsOptional()
  @IsString()
  comuna?: string;
  @Prop()
  @IsOptional()
  @IsBoolean()
  contratoFirmado?: boolean;
  @Prop()
  @IsOptional()
  @IsString()
  direccion?: string;
  @Prop()
  @IsOptional()
  @IsBoolean()
  isAlumn?: boolean;
  @Prop()
  @IsNotEmpty()
  @IsString()
  studentStatus: string;//Tiene que ser un enum.
  @Prop()
  @IsOptional()
  @IsString()
  origin?: string; //Tiene que ser un enum.
  @Prop()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;
  @Prop()
  @IsOptional()
  @IsDate()
  plazoMatriculaInicio?: Date;
  @Prop()
  @IsOptional()
  @IsString()
  saldoFavor?: string; //Tiene que ser un enum.
  @Prop()
  @IsOptional()
  @IsNumber()
  totalPayment?: number;
  @Prop()
  @IsOptional()
  @IsArray()
  uploadedDocuments?: string[];
  @Prop()
  @IsOptional()
  @IsString()
  grade?: string; //Tiene que ser un enum.
  @Prop()
  @IsOptional()
  @IsBoolean()
  isOld?: boolean;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
