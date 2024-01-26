import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Base } from '../../customization/schemas/base.schema';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export type TariffDocument = HydratedDocument<TariffBanner>;

@Schema()
export class TariffBanner extends Base {
  @IsString()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_TERM_CODE: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_TERM_CODE_ADMIT: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_CAMP_CODE: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  STVCAMP_DESC: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_MAJR_CODE: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  STVMAJR_DESC: string;

  @IsEnum(SegmentsEnum)
  @IsNotEmpty()
  @Prop()
  SFRRGFE_LEVL_CODE: SegmentsEnum;

  @IsString()
  @IsNotEmpty()
  @Prop()
  STVLEVL_DESC: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_DETL_CODE: string;

  @IsString()
  @IsNotEmpty()
  @Prop()
  TBBDETC_DESC: string;

  @IsNumber()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_MIN_CHARGE: number;

  @IsNumber()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_MAX_CHARGE: number;

  @IsDate()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_FROM_ADD_DATE: Date;

  @IsDate()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_TO_ADD_DATE: Date;

  @IsDate()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_ACTIVITY_DATE: Date;

  @IsString()
  @IsNotEmpty()
  @Prop()
  SFRRGFE_USER_ID: string;
}

export const TariffBannerSchema = SchemaFactory.createForClass(TariffBanner);
