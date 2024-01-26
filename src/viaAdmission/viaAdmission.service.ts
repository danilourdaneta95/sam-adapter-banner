import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ViaAdmission } from './schemas/viaAdmission.schema';
import { Model } from 'mongoose';
import { CreateViaAdmissionDto } from './dto/create-viaAdmission.dto';
import { ViaAdmissionMapper } from './mapper/viaAdmission.mapper';
import { ViaAdmissionBanner } from './schemas/viaAdmission-banner.schema';

@Injectable()
export class ViaAdmissionService {
  constructor(
    @InjectModel(ViaAdmission.name)
    private viaAdmissionModel: Model<ViaAdmission>,
    @InjectModel(ViaAdmissionBanner.name)
    private viaAdmissionBannerModel: Model<ViaAdmissionBanner>,
  ) {}

  async create(
    createViaAdmissionDto: CreateViaAdmissionDto,
  ): Promise<ViaAdmission> {
    this.viaAdmissionBannerModel.create(
      ViaAdmissionMapper.mapViaAdmissionBanner(createViaAdmissionDto),
    );
    return this.viaAdmissionModel.create(
      ViaAdmissionMapper.mapViaAdmissionBannerToSAM(createViaAdmissionDto),
    );
  }
}
