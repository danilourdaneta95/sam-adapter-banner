import { Module } from '@nestjs/common';
import { TariffController } from './tariff.controller';
import { TariffService } from './tariff.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TariffBannerSchema } from './schemas/tariff-banner.schema';
import { TariffSchema } from './schemas/tariff.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Arancel', schema: TariffSchema },
      { name: 'ArancelBanner', schema: TariffBannerSchema },
    ]),
  ],
  controllers: [TariffController],
  providers: [TariffService],
  exports: [TariffService],
})
export class TariffModule {}
