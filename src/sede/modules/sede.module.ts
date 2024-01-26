import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SedeController } from '../sede.controller';
import { SedeSchema } from '../schemas/sede.schema';
import { SedeService } from '../sede.service';
import { SedeBannerSchema } from '../schemas/sede-banner.schema';
import { SedeMapper } from '../mapper/sede.mapper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Sede', schema: SedeSchema },
      { name: 'SedeBanner', schema: SedeBannerSchema },
    ]),
  ],
  controllers: [SedeController],
  providers: [SedeService, SedeMapper],
  exports: [SedeService, SedeMapper],
})
export class SedeModule {}
