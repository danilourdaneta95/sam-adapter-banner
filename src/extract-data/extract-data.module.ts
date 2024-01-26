import { Module } from '@nestjs/common';
import { ExtractDataService } from './extract-data.service';
import { ExtractDataController } from './extract-data.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TariffModule } from '../tariff/tariff.module';
import { ProgramCatalogModule } from '../program-catalogs/modules/program-catalog.module';
import { AcademicPeriodModule } from '../academicPeriod/academicPeriod.module';
import { BenefitCatalogModule } from '../benefitcatalog/benefitcatalog.module';
import { ViaAdmissionModule } from '../viaAdmission/viaAdmission.module';
import { SedeModule } from '../sede/modules/sede.module';
import { CampusModule } from 'src/campus/modules/campus.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'oracle',
        host: configService.get('ORACLE_HOST'),
        port: configService.get('ORACLE_PORT'),
        username: configService.get('ORACLE_USER'),
        password: configService.get('ORACLE_PASSWORD'),
        sid: configService.get('ORACLE_SID'),
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    TariffModule,
    ProgramCatalogModule,
    AcademicPeriodModule,
    BenefitCatalogModule,
    ViaAdmissionModule,
    SedeModule,
    CampusModule,
  ],
  controllers: [ExtractDataController],
  providers: [ExtractDataService],
})
export class ExtractDataModule {}
