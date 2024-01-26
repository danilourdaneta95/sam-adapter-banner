import { Module } from '@nestjs/common';
import { ViaAdmissionController } from './viaAdmission.controller';
import { ViaAdmissionService } from './viaAdmission.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ViaAdmission,
  ViaAdmissionSchema,
} from './schemas/viaAdmission.schema';
import {
  ViaAdmissionBanner,
  ViaAdmissionBannerSchema,
} from './schemas/viaAdmission-banner.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ViaAdmission.name, schema: ViaAdmissionSchema },
      { name: ViaAdmissionBanner.name, schema: ViaAdmissionBannerSchema },
    ]),
  ],
  controllers: [ViaAdmissionController],
  providers: [ViaAdmissionService],
  exports: [ViaAdmissionService],
})
export class ViaAdmissionModule {}
