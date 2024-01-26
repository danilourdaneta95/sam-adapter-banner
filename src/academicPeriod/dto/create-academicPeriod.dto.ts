import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAcademicPeriodDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Code academic period Banner',
  })
  STVTERM_CODE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description academic period Banner',
  })
  STVTERM_DESC: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Start date academic period Banner',
  })
  STVTERM_START_DATE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'End date academic period Banner',
  })
  STVTERM_END_DATE: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description type academic period Banner',
  })
  STVTRMT_DESC: string;
}
