import { Module } from '@nestjs/common';
import { AcademicStatusController } from './academic-status.controller';
import { AcademicStatusService } from './academic-status.service';

@Module({
  imports: [],
  controllers: [AcademicStatusController],
  providers: [AcademicStatusService],
})
export class AcademicStatusModule {}
