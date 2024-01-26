import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsNumber, IsEnum } from 'class-validator';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { Transform, Type } from 'class-transformer';

export class CreateTariffDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Period arancel Banner',
  })
  SFRRGFE_TERM_CODE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Cohort arancel Banner',
  })
  SFRRGFE_TERM_CODE_ADMIT: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Campus code Banner',
  })
  SFRRGFE_CAMP_CODE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Campus description arancel Banner',
  })
  STVCAMP_DESC: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Career code arancel Banner',
  })
  SFRRGFE_MAJR_CODE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Career description arancel Banner',
  })
  STVMAJR_DESC: string;

  @IsEnum(SegmentsEnum)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Level code arancel Banner',
  })
  SFRRGFE_LEVL_CODE: SegmentsEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Level description arancel Banner',
  })
  STVLEVL_DESC: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item code arancel Banner',
  })
  SFRRGFE_DETL_CODE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Item description arancel Banner',
  })
  TBBDETC_DESC: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Minimum charge arancel Banner',
  })
  SFRRGFE_MIN_CHARGE: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Maximum charge arancel Banner',
  })
  SFRRGFE_MAX_CHARGE: number;

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date from arancel Banner',
  })
  SFRRGFE_FROM_ADD_DATE: Date;

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @ApiProperty({
    description: 'Date to arancel Banner',
  })
  SFRRGFE_TO_ADD_DATE: Date;

  @IsDate()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value))
  @IsNotEmpty()
  @ApiProperty({
    description: 'Activity date arancel Banner',
  })
  SFRRGFE_ACTIVITY_DATE: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'User id arancel Banner',
  })
  SFRRGFE_USER_ID: string;
}
