import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tariff } from './schemas/tariff.schema';
import { Model } from 'mongoose';
import { CreateTariffDto } from './dto/create-tariff.dto';
import { TariffMapper } from './mapper/tariff.mapper';
import { TariffBanner } from './schemas/tariff-banner.schema';

@Injectable()
export class TariffService {
  constructor(
    @InjectModel('Arancel') private tariffModel: Model<Tariff>,
    @InjectModel('ArancelBanner') private tariffBannerModel: Model<TariffBanner>,
  ) {}

  async create(createTariffDto: CreateTariffDto): Promise<Tariff> {
    const existingTariff = await this.exist(createTariffDto);
    if (existingTariff) {
      throw new BadRequestException(
        `Ya existe el arancel para el periodo ${createTariffDto.SFRRGFE_TERM_CODE} y carrera ${createTariffDto.SFRRGFE_MAJR_CODE}`,
      );
    }
    this.tariffBannerModel.create(
      TariffMapper.mapTariffBanner(createTariffDto),
    );
    return this.tariffModel.create(
      TariffMapper.mapTariffBannerToSAM(createTariffDto),
    );
  }

  async exist(tariffDto: CreateTariffDto): Promise<Tariff> {
    return this.tariffModel
      .findOne({
        periodo: tariffDto.SFRRGFE_TERM_CODE,
        codigo_carrera: tariffDto.SFRRGFE_MAJR_CODE,
        fecha_actividad: tariffDto.SFRRGFE_ACTIVITY_DATE,
      })
      .exec();
  }
}
