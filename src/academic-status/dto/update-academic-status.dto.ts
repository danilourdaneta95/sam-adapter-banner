import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAcademicStatusDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Student pidm',
  })
  pidm: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Academic period',
  })
  periodo: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Academic program',
  })
  programa: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Academis status to update',
  })
  estado_academico: string;
}
