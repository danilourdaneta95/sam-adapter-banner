import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EndorsementService } from './endorsement.service';
import { EndorsementController } from './endorsement.controller';
import { SostenedorSchema } from './endorsement.schema';
import { HttpModule } from '@nestjs/axios';
import EndorsementMapper from './mappers/endorsement.mapper';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Sostenedor', schema: SostenedorSchema },
    ]),
    HttpModule,
    SharedModule,
  ],
  controllers: [EndorsementController],
  providers: [EndorsementService, EndorsementMapper],
})
export class EndorsementModule {}
