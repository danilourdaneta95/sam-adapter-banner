import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IsBoolean, IsDate, IsOptional, IsString } from 'class-validator';

export type BaseDocument = Base & Document;

@Schema({ timestamps: true, _id: false })
export class Base {
  @Prop({ unique: true })
  id: string;

  @IsOptional()
  @IsString()
  @Prop()
  createdBy?: string;

  @IsBoolean()
  @Prop({ default: false })
  deleted?: boolean;

  @IsOptional()
  @IsDate()
  @Prop()
  deletedAt?: Date;

  @IsOptional()
  @IsBoolean()
  @Prop()
  deletable?: boolean;

  @IsOptional()
  @IsBoolean()
  @Prop()
  editable?: boolean;
}

export const BaseSchema = SchemaFactory.createForClass(Base);
