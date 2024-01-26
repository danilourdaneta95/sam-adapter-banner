import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Base } from '../../customization/schemas/base.schema';
import mongoose, { HydratedDocument } from 'mongoose';

export type CampusDocument = HydratedDocument<Campus>;

@Schema()
export class Campus extends Base {
    @Prop()
    @IsString()
    @IsNotEmpty()
    name: string;
    @Prop({ unique: true })
    @IsNotEmpty()
    @IsString()
    code: string;
    @IsNotEmpty()
    @IsString()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sede' })
    sede: string;
    @Prop()
    demreCode: string;
}

export const CampusSchema = SchemaFactory.createForClass(Campus);