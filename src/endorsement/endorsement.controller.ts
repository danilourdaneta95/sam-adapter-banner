import { BadRequestException, Controller, Post, Body } from '@nestjs/common';
import { EndorsementService } from './endorsement.service';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PersonDto } from './dto/person.dto';
import EndorsementMapper from './mappers/endorsement.mapper';
import { ConfigService } from '@nestjs/config';

@ApiTags('Endorsement')
@Controller('endorsement')
export class EndorsementController {
  constructor(
    private readonly endorsementService: EndorsementService,
    private readonly endorsementMapper: EndorsementMapper,
    private readonly configService: ConfigService,
  ) {}

  @Post('create')
  @ApiBody({ type: PersonDto })
  @ApiOperation({ summary: 'Create Endorsement' })
  @ApiResponse({ status: 200, description: 'Endorsement created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Return a message with data' })
  async createEndorsement(@Body() endorsement: PersonDto): Promise<any> {
    try {
      const mappedEndorsement =
        this.endorsementMapper.toBannerEndorsement(endorsement);
      const data = {
        ...mappedEndorsement,
        header: {
          data_origin: this.configService.get('DATA_ORIGIN'),
          user_id: this.configService.get('DATA_USER'),
        },
      };
      const response = await this.endorsementService.sendBannerEndorsement(
        data,
      );
      console.info('Banner response', response.data);
      if (response.data.statusCode !== 200) {
        throw new Error(response.data.message);
      }
      const validEndorsement = {
        ...endorsement,
        pidm: response.data.body.person.pidm,
      };
      return this.endorsementService.createEndorsement(validEndorsement);
    } catch (error) {
      throw new BadRequestException({
        message: error.message,
      });
    }
  }
}
