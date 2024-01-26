import { Module } from '@nestjs/common';
import { StudentController } from '../student.controller';
import { StudentService } from '../student.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from '../schemas/student.schema';
import { HttpModule } from "@nestjs/axios";
import StudentMapper from '../mapper/student.mapper';
@Module({
  controllers: [StudentController],
  providers: [StudentService, StudentMapper],
  imports: [
    MongooseModule.forFeature([
      { name: 'StudentPostulant', schema: StudentSchema },
    ]),
    HttpModule,
  ],
})
export class StudentModule {}
