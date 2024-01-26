import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from '../customization/schemas/base.schema';

export type SostenedorDocument = Sostenedor & Document;

@Schema()
export class Sostenedor extends Base {
  @Prop()
  pidm: string;

  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  rut: string;

  @Prop()
  password: string;

  @Prop()
  phone: string;

  @Prop()
  birthDate: Date;

  @Prop()
  similitude: string;

  @Prop()
  region: string;

  @Prop()
  ciudad: string;

  @Prop()
  comuna: string;

  @Prop()
  direccion: string;

  @Prop()
  beneficiarios: string;

  @Prop()
  selectedBeneficiario: string;

  @Prop({ default: 'SOSTENEDOR' })
  accountType: string;
}

export const SostenedorSchema = SchemaFactory.createForClass(Sostenedor);
