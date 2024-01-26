import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateViaAdmissionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description via admission Banner',
  })
  STVADMT_DESC: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Code via admission Banner',
  })
  STVADMT_CODE: string;
}
