import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../customization/schemas/base.schema';

export type BannerBenefitCatalogDocument = BannerBenefitCatalog & Document;

@Schema()
export class BannerBenefitCatalog extends Base {
  @Prop()
  OUT_TIPO_BENEFICIO: string;

  @Prop()
  OUT_PERIODO: string;

  @Prop()
  OUT_EXEN_CODIGO: string;

  @Prop()
  OUT_EXEN_DESC: string;

  @Prop()
  OUT_EXEN_PER_ACAD: string;

  @Prop()
  OUT_EXEN_CDET_PAGO: string;

  @Prop()
  OUT_EXEN_CDET_CODIGO: string;

  @Prop()
  OUT_EXEN_CDET_DESC: string;

  @Prop()
  OUT_EXEN_CDET_PRIOR: string;

  @Prop()
  OUT_EXEN_CDET_PORC: string;

  @Prop()
  OUT_EXEN_CDET_MNIN: string;

  @Prop()
  OUT_EXEN_CDET_MMAX: string;

  @Prop()
  OUT_EXEN_FICA_TDOC: string;

  @Prop()
  OUT_EXEN_FICA_DESC: string;

  @Prop()
  OUT_ACTIVITY_DATE?: Date;

  @Prop()
  OUT_USER_ID: string;
}

export const BannerBenefitCatalogSchema =
  SchemaFactory.createForClass(BannerBenefitCatalog);
