import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SedeDTO } from './dto/sede.dto';
import { Sede } from './schemas/sede.schema';
import { SedeBanner } from './schemas/sede-banner.schema';

@Injectable()
export class SedeService {
  constructor(
    @InjectModel(Sede.name)
    private readonly sedeModel: Model<Sede>,
    @InjectModel(SedeBanner.name)
    private readonly sedeBannerModel: Model<SedeBanner>,
  ) {}

  async createSede(sede: Sede): Promise<Sede> {
    return this.sedeModel.create(sede);
  }

  async createSedeBanner(sedeBanner: SedeDTO) {
    const existingSede = await this.getSedeByNameOrCode(
      sedeBanner.GTVDICD_DESC,
      sedeBanner.GTVDICD_CODE,
    );
    if (existingSede) {
      throw new BadRequestException(
        `Ya existe una sede con el nombre ${sedeBanner.GTVDICD_DESC} o el código ${sedeBanner.GTVDICD_CODE}`,
      );
    }
    return this.sedeBannerModel.create(sedeBanner);
  }

  async getSedeByNameOrCode(desc: string, code: string): Promise<SedeDTO> {
    return this.sedeBannerModel
      .findOne({
        $or: [
          { GTVDICD_DESC: new RegExp(desc, 'i') },
          { GTVDICD_CODE: new RegExp(code, 'i') },
        ],
      })
      .exec();
  }

  async getIdSedeByCode(codeSede: string): Promise<string> {
    const result = await this.sedeModel.findOne({ code: codeSede }).exec();
    if (!result) {
      return null;
    }
    return result._id.toString();
  }
}
