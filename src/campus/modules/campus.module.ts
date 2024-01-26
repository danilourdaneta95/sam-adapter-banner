import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CampusController } from '../campus.controller';
import { CampusSchema } from '../schemas/campus.schema';
import { CampusService } from '../campus.service';
import { CampusBannerSchema } from '../schemas/campus-banner.schema';
import { SedeModule } from '../../sede/modules/sede.module';
import { CampusMapper } from '../mapper/campus.mapper';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Campus', schema: CampusSchema },
      { name: 'CampusBanner', schema: CampusBannerSchema },
    ]),
    SedeModule,
  ],
  controllers: [CampusController],
  providers: [CampusService, CampusMapper],
  exports: [CampusService, CampusMapper],
})
export class CampusModule {}
