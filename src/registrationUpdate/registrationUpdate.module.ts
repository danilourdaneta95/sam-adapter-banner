import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RegistrationUpdateController } from './registrationUpdate.controller';
import { RegistrationUpdateService } from './registrationUpdate.service';
import { RegistrationUpdateRepository } from './registrationUpdate.repository';
import {
  StudentPostulants,
  StudentPostulantsSchema,
} from './schemas/studentPostulat.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StudentPostulants.name, schema: StudentPostulantsSchema },
    ]),
  ],
  controllers: [RegistrationUpdateController],
  providers: [RegistrationUpdateService, RegistrationUpdateRepository],
})
export class RegistrationUpdateModule {}
