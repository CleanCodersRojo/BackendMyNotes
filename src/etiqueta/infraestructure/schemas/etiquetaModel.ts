import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import { Document,Model } from "mongoose";

export type EtiquetaDocument = EtiquetaSchema & Document;

@Schema()
export class EtiquetaSchema{
    @Prop({
        unique:true,
        required:true,
    })
    Id:string;

    @Prop({
        required:true
    })
    nombre:string;


}

export const userSchema = SchemaFactory.createForClass(EtiquetaSchema);
export type etiquetaModel = Model<EtiquetaSchema>;