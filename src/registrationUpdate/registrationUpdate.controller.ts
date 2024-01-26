import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationUpdateService } from './registrationUpdate.service';

@ApiTags('registrationUpdate')
@Controller('registrationUpdate')
export class RegistrationUpdateController {
  constructor(
    private readonly registerUpdateService: RegistrationUpdateService,
  ) {}
  @Post('update')
  @ApiOperation({ summary: 'Registration update' })
  @ApiResponse({ status: 201, description: 'Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Server Error.' })
  async updateStudent(@Body() registrationUpdateDto: any): Promise<any> {
    try {
      return this.registerUpdateService.updateStudent(registrationUpdateDto);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
