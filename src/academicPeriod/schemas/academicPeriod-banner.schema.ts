import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';

export type AcademicPeriodBannerDocument =
  HydratedDocument<AcademicPeriodBanner>;

@Schema()
export class AcademicPeriodBanner extends Base {
  @Prop()
  STVTERM_CODE: string;

  @Prop()
  STVTERM_DESC: string;

  @Prop()
  STVTERM_START_DATE: string;

  @Prop()
  STVTERM_END_DATE: string;

  @Prop()
  STVTRMT_DESC: string;
}

export const AcademicPeriodBannerSchema =
  SchemaFactory.createForClass(AcademicPeriodBanner);
