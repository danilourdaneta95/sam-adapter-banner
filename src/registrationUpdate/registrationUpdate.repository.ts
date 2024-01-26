import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { StudentPostulants } from './schemas/studentPostulat.schema';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class RegistrationUpdateRepository {
  constructor(
    @InjectModel(StudentPostulants.name)
    private studentPostulantModel: Model<StudentPostulants>,
  ) {}
  getStudentByPidm(pidm) {
    return new Promise((resolve, reject) => {
      this.studentPostulantModel
        .aggregate(
          [
            {
              $match: {
                pidm,
              },
            },
            {
              $lookup: {
                from: 'programs',
                localField: 'program',
                foreignField: 'id',
                as: 'program',
              },
            },
            {
              $unwind: {
                path: '$program',
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
          {},
        )
        .then((result) => {
          resolve(result.length > 0 ? result[0] : {});
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
