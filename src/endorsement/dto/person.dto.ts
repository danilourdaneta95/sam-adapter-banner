import { IsString, IsEmail, IsDate, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonDto {
  @IsEmail()
  @ApiProperty({
    description: 'Endorsement Email',
  })
  email: string;

  @IsString()
  @ApiProperty({
    description: 'Endorsement Name',
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement Lastname',
  })
  lastname: string;

  @IsString()
  @ApiProperty({
    description: 'Endorsement Rut',
  })
  rut: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement Password',
  })
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement Phone with country code',
  })
  phone: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement Birthdate dd/mm/yyyy format',
  })
  birthDate: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement relationship with student',
  })
  similitude: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement region',
  })
  region: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement city',
  })
  ciudad: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement comuna',
  })
  comuna: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement address',
  })
  direccion: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement beneficiaries',
  })
  benefeciarios: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement selected beneficiary',
  })
  selectedBeneficiario: string;

  @IsString()
  @ApiProperty({
    description: 'Endorsement genre',
  })
  genre: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement nationality',
  })
  nationality: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Endorsement postal code',
  })
  postalCode: string;
}
