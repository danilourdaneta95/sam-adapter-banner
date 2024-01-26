import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CampusDTO } from './dto/campus.dto';
import { SedeService } from '../sede/sede.service';
import { Campus } from './schemas/campus.schema';
import { CampusBanner } from './schemas/campus-banner.schema';

@Injectable()
export class CampusService {
  constructor(
    @InjectModel(Campus.name)
    private readonly campusModel: Model<Campus>,
    @InjectModel(CampusBanner.name)
    private readonly campusBannerModel: Model<CampusBanner>,
    private readonly sedeService: SedeService,
  ) {}

  async createCampus(campus: Campus): Promise<Campus> {
    return this.campusModel.create(campus);
  }

  async createCampusBanner(campusBanner: CampusDTO): Promise<string> {
    const idSede = await this.getSedeByCode(campusBanner.STVCAMP_DICD_CODE);
    if (!idSede) {
      throw new BadRequestException(
        `No existe el código de sede ingresado ${campusBanner.STVCAMP_DICD_CODE}`,
      );
    }
    const existingCampus = await this.getCampusByName(
      campusBanner.STVCAMP_CODE,
    );
    if (existingCampus) {
      throw new BadRequestException(
        `Ya existe una campus con el nombre ${campusBanner.STVCAMP_CODE}`,
      );
    }
    this.campusBannerModel.create(campusBanner);
    return idSede.toString();
  }

  async getCampusByName(codigo: string): Promise<CampusDTO> {
    return this.campusBannerModel
      .findOne({ STVCAMP_CODE: new RegExp(codigo, 'i') })
      .exec();
  }

  async getSedeByCode(codeSede: string): Promise<string> {
    const idSede = await this.sedeService.getIdSedeByCode(codeSede);
    if (!idSede) {
      return null;
    }
    //Seteo el _id al campo id para poder almacenarlo correctamente la relación en SAM
    return idSede;
  }
}
