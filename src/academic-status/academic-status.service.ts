import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { BannerResponse } from 'src/types/banner-response.type';
import { UpdateAcademicStatusDto } from './dto/update-academic-status.dto';

@Injectable()
export class AcademicStatusService {
  constructor(private readonly httpService: HttpService) {}

  async update(data: UpdateAcademicStatusDto): Promise<BannerResponse<string>> {
    const response = await firstValueFrom(
      this.httpService.post<BannerResponse<string>>(
        '/banner/students/admision/renuncia-retracto',
        data,
      ),
    );
    return response.data;
  }
}
