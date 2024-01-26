import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export type ViaAdmissionDocument = HydratedDocument<ViaAdmission>;

@Schema()
export class ViaAdmission extends Base {
  @IsString()
  @IsNotEmpty()
  @Prop()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  slug: string;

  @IsOptional()
  @Prop()
  segment?: SegmentsEnum;
}

export const ViaAdmissionSchema = SchemaFactory.createForClass(ViaAdmission);
