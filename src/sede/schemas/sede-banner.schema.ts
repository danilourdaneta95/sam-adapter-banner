import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from '../../customization/schemas/base.schema';
import { HydratedDocument } from 'mongoose';

export type SedeBannerDocument = HydratedDocument<SedeBanner>;

@Schema()
export class SedeBanner extends Base {
  @IsString()
  @IsNotEmpty()
  @Prop({ unique: true })
  GTVDICD_DESC: string;
  @IsString()
  @IsNotEmpty()
  @Prop({ unique: true })
  GTVDICD_CODE: string;
}

export const SedeBannerSchema = SchemaFactory.createForClass(SedeBanner);
