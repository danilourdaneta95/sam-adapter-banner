import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../customization/schemas/base.schema';

export type BenefitCatalogDocument = BenefitCatalog & Document;

@Schema()
export class BenefitCatalog extends Base {
  @Prop()
  academicPeriod: string;

  @Prop()
  valueType?: string;

  @Prop()
  percentage: number;

  @Prop()
  amount: number;

  @Prop()
  bannerName: string;

  @Prop()
  bannerNameSlug: string;

  @Prop()
  bannerCode: string;

  @Prop()
  bannerItemCode?: string;

  @Prop()
  benefitType?: string;

  @Prop()
  item?: string;

  @Prop()
  academicPeriodData: string;

  @Prop()
  benefitFor?: string;

  @Prop()
  isAditional?: boolean;
}
export const BenefitCatalogSchema =
  SchemaFactory.createForClass(BenefitCatalog);
