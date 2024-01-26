import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sostenedor } from './endorsement.schema';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EndorsementService {
  constructor(
    @InjectModel('Sostenedor')
    private endorsementModel: Model<Sostenedor>,
    private readonly httpService: HttpService,
  ) {}

  async sendBannerEndorsement(data: any): Promise<any> {
    const response = await this.httpService.post('/banner/persona', data);
    return firstValueFrom(response);
  }

  async createEndorsement(endorsement: any): Promise<Sostenedor> {
    return this.endorsementModel.create(endorsement);
  }
}
