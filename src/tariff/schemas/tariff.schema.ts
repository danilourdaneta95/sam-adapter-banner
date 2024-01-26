import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type TariffDocument = HydratedDocument<Tariff>;

@Schema()
export class Tariff extends Base {
  @IsString()
  @IsNotEmpty()
  @Prop()
  periodo: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  cohorte: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  codigo_campus: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  campus: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  codigo_carrera: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  carrera: string;

  @IsEnum(SegmentsEnum)
  @IsNotEmpty()
  @Prop()
  codigo_nivel: SegmentsEnum;

  @IsString()
  @IsNotEmpty()
  @Prop()
  nivel: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  codigo_item: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  item: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop()
  precio_min: number;

  @IsNumber()
  @IsNotEmpty()
  @Prop()
  precio_max: number;

  @IsDate()
  @IsNotEmpty()
  @Prop()
  vigente_desde: Date;

  @IsDate()
  @IsNotEmpty()
  @Prop()
  vigente_hasta: Date;

  @IsDate()
  @IsNotEmpty()
  @Prop()
  fecha_actividad: Date;

  @IsString()
  @IsNotEmpty()
  @Prop()
  id_usuario: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  usuario: string;
}

export const TariffSchema = SchemaFactory.createForClass(Tariff);
