import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';

export type StudentPostulantsDocument = HydratedDocument<StudentPostulants>;

@Schema()
export class StudentPostulants extends Base {}

export const StudentPostulantsSchema =
  SchemaFactory.createForClass(StudentPostulants);
