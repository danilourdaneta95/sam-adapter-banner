import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SedeDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código sede Banner',
  })
  GTVDICD_CODE: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción sede Banner',
  })
  GTVDICD_DESC: string;
}