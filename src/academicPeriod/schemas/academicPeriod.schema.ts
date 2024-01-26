import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';

export type AcademicPeriodDocument = HydratedDocument<AcademicPeriod>;

@Schema()
export class AcademicPeriod extends Base {
  @Prop()
  code: string;

  @Prop()
  description: string;

  @Prop()
  periodStartDate: string;

  @Prop()
  periodEndDate: string;

  @Prop()
  periodType: string;

  @Prop()
  config?: string; //pendiente de definir el tipo de dato
}

export const AcademicPeriodSchema =
  SchemaFactory.createForClass(AcademicPeriod);
