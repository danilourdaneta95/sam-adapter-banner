import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags, } from '@nestjs/swagger';
import { StudentDTO } from './dto/student.dto';
import { Student } from './schemas/student.schema';
import  StudentMapper  from './mapper/student.mapper';
@ApiTags('Student Postulant')
@Controller('student')
export class StudentController {

    constructor(
      private readonly studentService: StudentService,
      private readonly studentMapper: StudentMapper,
      ) { }

    @Post('create')
    @ApiBody({ type: StudentDTO })
    @ApiOperation({ summary: 'Create student' })
    @ApiResponse({ status: 201, description: 'Create.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiResponse({ status: 500, description: 'Server Error.' })
    async createStudent(@Body() student: StudentDTO): Promise<Student> {
      let dataSam = this.studentMapper.mapBannerDataToSam(student);
      let studentToBanner = this.studentMapper.mapStudenDataToBanner(dataSam);
      try {
        return await this.studentService.createStudent(studentToBanner, dataSam);
      } catch (err) {
        if (err instanceof BadRequestException) {
          throw new BadRequestException(err.getResponse());
        } else {
          throw err;
        }
      }
    }


}
