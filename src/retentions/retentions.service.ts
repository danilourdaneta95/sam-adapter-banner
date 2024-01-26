import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RetentionDto } from './dto/retention.dto';
import { BannerResponse } from 'src/types/banner-response.type';

@Injectable()
export class RetentionsService {
  constructor(private readonly httpService: HttpService) {}

  async getAll(): Promise<BannerResponse<RetentionDto[]>> {
    const response = await firstValueFrom(
      this.httpService.get<BannerResponse<RetentionDto[]>>(
        '/banner/mestros/retenciones',
      ),
    );
    return response.data;
  }
}
