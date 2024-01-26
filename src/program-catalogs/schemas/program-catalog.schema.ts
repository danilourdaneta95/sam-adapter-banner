import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { Base } from '../../customization/schemas/base.schema';
import { JornadaEnum } from '../../enums/admission.enum';
import { ModalidadEnum } from '../../enums/modality.enum';
import { SegmentsEnum } from '../../enums/segmentos.enum';

@Schema()
export class ProgramCatalog extends Base {
  @Prop()
  code: string;

  @Prop()
  name: string;

  @Prop()
  facultyCode: string;

  @Prop()
  facultyName: string;

  @Prop()
  campusCode: string;

  @Prop()
  campusName: string;

  @IsEnum(SegmentsEnum)
  @Prop()
  segment: SegmentsEnum;

  @Prop()
  segementName: string;

  @Prop()
  program: string;

  @Prop()
  admissionControl: string;

  @IsEnum(JornadaEnum)
  @Prop()
  jornada: JornadaEnum;

  @IsEnum(ModalidadEnum)
  @Prop()
  modality: ModalidadEnum;

  @Prop()
  demreCode?: string;
}

export const ProgramCatalogSchema =
  SchemaFactory.createForClass(ProgramCatalog);
