import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProgramCatalogModule } from './program-catalogs/modules/program-catalog.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SedeModule } from './sede/modules/sede.module';
import { BenefitCatalogModule } from './benefitcatalog/benefitcatalog.module';
import { ViaAdmissionModule } from './viaAdmission/viaAdmission.module';
import { TariffModule } from './tariff/tariff.module';
import { AcademicPeriodModule } from './academicPeriod/academicPeriod.module';
import { CampusModule } from './campus/modules/campus.module';
import { RegistrationUpdateModule } from './registrationUpdate/registrationUpdate.module';
import { RetentionsModule } from './retentions/retentions.module';
import { HttpModule } from '@nestjs/axios';
import { StudentModule } from './student/modules/student.module';
import { EndorsementModule } from './endorsement/endorsement.module';
import { ExtractDataModule } from './extract-data/extract-data.module';
import { AcademicStatusModule } from './academic-status/academic-status.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env', // Especifica la ubicación del archivo .env
      isGlobal: true, // Hace que las variables de entorno sean globales en la aplicación
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('NODRIZE_DATABASE_URL'),
        // useFindAndModify: false,
        // useCreateIndex: true,
      }),
      inject: [ConfigService],
    }),
    {
      ...HttpModule.registerAsync({
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          timeout: 10000,
          maxRedirects: 3,
          baseURL: configService.get<string>('URL_BANNER_BASE'),
        }),
      }),
      global: true,
    },
    SedeModule,
    BenefitCatalogModule,
    ViaAdmissionModule,
    TariffModule,
    AcademicPeriodModule,
    CampusModule,
    RegistrationUpdateModule,
    ProgramCatalogModule,
    RetentionsModule,
    StudentModule,
    EndorsementModule,
    //ExtractDataModule,
    AcademicStatusModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
