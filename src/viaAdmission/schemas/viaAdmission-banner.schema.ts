import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';
import { IsNotEmpty, IsString } from 'class-validator';

export type ViaAdmissionBannerDocument = HydratedDocument<ViaAdmissionBanner>;

@Schema()
export class ViaAdmissionBanner extends Base {
  @IsString()
  @IsNotEmpty()
  @Prop()
  STVADMT_DESC: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  STVADMT_CODE: string;
}

export const ViaAdmissionBannerSchema = SchemaFactory.createForClass(ViaAdmissionBanner);
