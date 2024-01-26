import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDate,
  IsNumber,
  IsBoolean,
} from 'class-validator';

export class BannerBenefitCatalogDTO {
  @IsNotEmpty()
  @IsString()
  OUT_TIPO_BENEFICIO: string;

  @IsOptional()
  @IsString()
  OUT_PERIODO: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CODIGO: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_DESC: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_PER_ACAD: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_PAGO: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_CODIGO: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_DESC: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_PRIOR: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_PORC: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_MNIN: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_CDET_MMAX: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_FICA_TDOC: string;

  @IsString()
  @IsOptional()
  OUT_EXEN_FICA_DESC: string;

  @IsDate()
  @IsOptional()
  OUT_ACTIVITY_DATE: Date;

  @IsString()
  @IsOptional()
  OUT_USER_ID: string;
}

export class SAMBenefitCatalog {
  @IsNotEmpty()
  @IsString()
  academicPeriod: string;

  @IsString()
  @IsOptional()
  valueType?: string;

  @IsNotEmpty()
  @IsNumber()
  percentage: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  bannerName: string;

  @IsNotEmpty()
  @IsString()
  bannerNameSlug: string;

  @IsNotEmpty()
  @IsString()
  bannerCode: string;

  @IsOptional()
  @IsString()
  bannerItemCode?: string;

  @IsOptional()
  @IsString()
  benefitType?: string;

  @IsOptional()
  @IsString()
  item?: string;

  @IsNotEmpty()
  @IsString()
  academicPeriodData: string;

  @IsOptional()
  @IsString()
  benefitFor?: string;

  @IsOptional()
  @IsBoolean()
  isAditional?: boolean;
}
