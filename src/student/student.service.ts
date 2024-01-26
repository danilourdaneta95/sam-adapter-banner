import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { ResponseBanner } from './studentBanner.interface';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('StudentPostulant')
    private readonly studentModel: Model<Student>,
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}
  async createStudent(studentToBanner: any, studentSam: Student): Promise<any> {
    //Le pego a la API de banner
    let result;
    try {
      const observable = this.httpService.post<ResponseBanner>(
        '/banner/persona',
        studentToBanner,
      );
      result = await firstValueFrom(observable);
    } catch (e) {
      if (e.response.status !== 504) {
        throw new HttpException(e.response.data.message, e.response.status);
      }
      await new Promise((resolve) => {
        setTimeout(async () => {
          const observable = this.httpService.post<ResponseBanner>(
            '/banner/persona',
            studentToBanner,
          );
          result = await firstValueFrom(observable);
          resolve(result);
        }, 3000);
      });
    }

    //Control de excepciones
    if (result.status !== 200) {
      const errorMessage = `Failed to get data from server. Response status: ${result.status} ${result.statusText}`;
      throw new BadRequestException(errorMessage);
    }
    if (result.data.statusCode !== 200) {
      throw new BadRequestException({
        message: 'Error status: ' + result.data.statusCode,
        details: [result.data.message],
      });
    }

    //Seteo el pidm para guardarlo
    studentSam.pidm = result.data.body.person.pidm;
    //TODO: En caso que la pass no venga hasheada se deja código para utilizarlo.

    return this.saveStudent(studentSam);
  }
  private saveStudent(data: Student): Promise<Student> {
    return this.studentModel.create(data);
  }
}
