import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from '../../customization/schemas/base.schema';
import { HydratedDocument } from 'mongoose';

export type SedeDocument = HydratedDocument<Sede>;

@Schema()
export class Sede extends Base {
  @Prop({ unique: true })
  @IsNotEmpty()
  @IsString()
  name: string;
  @Prop({ unique: true })
  @IsNotEmpty()
  @IsString()
  code: string;
}

export const SedeSchema = SchemaFactory.createForClass(Sede);
