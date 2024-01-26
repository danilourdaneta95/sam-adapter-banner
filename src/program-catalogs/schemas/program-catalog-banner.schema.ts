import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { JornadaEnum } from '../../enums/admission.enum';
import { ModalidadEnum } from '../../enums/modality.enum';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';

export type ProgramCatalogDocument = HydratedDocument<ProgramCatalogBanner>;

@Schema()
export class ProgramCatalogBanner extends Base {
  @Prop()
  STVMAJR_CODE: string;
  @Prop()
  STVMAJR_DESC: string;
  @Prop()
  STVCOLL_CODE: string;
  @Prop()
  STVCOLL_DESC: string;
  @Prop()
  GTVDICD_CODE: string;
  @Prop()
  GTVDICD_DESC: string;
  @Prop()
  STVCAMP_CODE: string;
  @Prop()
  STVCAMP_DESC: string;
  @Prop()
  STVLEVL_DESC: string;
  @Prop()
  SOBCURR_PROGRAM: string;
  @Prop()
  SORCMJR_ADM_IND: string;

  @IsEnum(SegmentsEnum)
  @Prop()
  STVLEVL_CODE: SegmentsEnum;

  @IsEnum(JornadaEnum)
  @Prop()
  CODIGO_JORNADA: JornadaEnum;

  @IsEnum(ModalidadEnum)
  @Prop()
  CODIGO_MODALIDAD: ModalidadEnum;
}

export const ProgramCatalogBannerSchema =
  SchemaFactory.createForClass(ProgramCatalogBanner);
