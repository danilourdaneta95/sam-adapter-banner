import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ViaAdmissionService } from './viaAdmission.service';
import { CreateViaAdmissionDto } from './dto/create-viaAdmission.dto';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('ViaAdmission')
@Controller('viaAdmission')
export class ViaAdmissionController {
  constructor(private readonly viaAdmissionService: ViaAdmissionService) {}

  @Post('create')
  @ApiBody({ type: CreateViaAdmissionDto })
  @ApiOperation({ summary: 'Create via admission' })
  @ApiResponse({ status: 201, description: 'Create.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async create(@Body() createViaAdmissionDto: CreateViaAdmissionDto) {
    try {
      return this.viaAdmissionService.create(createViaAdmissionDto);
    } catch (err) {
      if (err instanceof BadRequestException) {
        throw new BadRequestException(err.message);
      } else {
        throw err;
      }
    }
  }
}
