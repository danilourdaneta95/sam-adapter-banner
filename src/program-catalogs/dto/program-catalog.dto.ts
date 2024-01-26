import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SegmentsEnum } from '../../enums/segmentos.enum';
import { JornadaEnum } from '../../enums/admission.enum';
import { ModalidadEnum } from '../../enums/modality.enum';

export class ProgramCatalogDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código Banner',
  })
  STVMAJR_CODE: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción Banner',
  })
  STVMAJR_DESC: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Código facultad Banner',
  })
  STVCOLL_CODE: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción facultad Banner',
  })
  STVCOLL_DESC: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Código sede Banner',
  })
  GTVDICD_CODE: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción sede Banner',
  })
  GTVDICD_DESC: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Código campus Banner',
  })
  STVCAMP_CODE: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción campus Banner',
  })
  STVCAMP_DESC: string;

  @IsNotEmpty()
  @IsEnum(SegmentsEnum)
  @ApiProperty({
    description: 'Código segmento Banner',
  })
  STVLEVL_CODE: SegmentsEnum;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción segmento Banner',
  })
  STVLEVL_DESC: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Código carrera Banner',
  })
  SOBCURR_PROGRAM: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Descripción control admisión carrera Banner',
  })
  SORCMJR_ADM_IND: string;

  @IsNotEmpty()
  @IsEnum(JornadaEnum)
  @ApiProperty({
    description: 'Código jornada Banner',
  })
  CODIGO_JORNADA: JornadaEnum;

  @IsNotEmpty()
  @IsEnum(ModalidadEnum)
  @ApiProperty({
    description: 'Código modalidad Banner',
  })
  CODIGO_MODALIDAD: ModalidadEnum;
}
