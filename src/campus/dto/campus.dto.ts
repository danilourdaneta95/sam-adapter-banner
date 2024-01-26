import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CampusDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Descripción campus Banner',
  })
  STVCAMP_DESC: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código campus Banner',
  })
  STVCAMP_CODE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Código "dicd" campus Banner',
  })
  STVCAMP_DICD_CODE: string;
}
