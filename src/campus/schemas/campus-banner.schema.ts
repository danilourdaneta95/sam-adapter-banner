import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from '../../customization/schemas/base.schema';
import { HydratedDocument } from 'mongoose';

export type CampusBannerDocument = HydratedDocument<CampusBanner>;

@Schema()
export class CampusBanner extends Base{
  @IsString()
  @IsNotEmpty()
  @Prop()
  STVCAMP_DESC: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ unique: true })
  STVCAMP_CODE: string;

  @IsString()
  @IsNotEmpty()
  @Prop() 
  STVCAMP_DICD_CODE: string;
}

export const CampusBannerSchema = SchemaFactory.createForClass(CampusBanner);