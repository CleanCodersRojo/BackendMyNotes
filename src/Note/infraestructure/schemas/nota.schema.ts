import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import { Document,Model } from "mongoose";
import { Optional } from "src/Shared/utilities/Optional";

export type NotasDocument = NotaSchema & Document;

@Schema()
export class NotaSchema{
    @Prop({
        unique:true,
        required:true,
    })
    notaId:string;

    @Prop({
        required:true,
        trim:true
    })
    titulo:string;

    @Prop({
        required:true,
        trim:true
    })
    cuerpo:string;

    @Prop({
        required:true,
    })
    fechaCreacion:Date;

    @Prop({
        required:false,
    })
    fechaEliminacion:Optional<Date>;

    @Prop({
        required:true,
    })
    fechaActualizacion:Date;

    @Prop({
        required:false,
    })
    latitud:Optional<number>;

    @Prop({
        required:false,
    })
    altitud:Optional<number>;

    @Prop({
        required:true,
    })
    usuarioId:string;
}

export const notasSchema = SchemaFactory.createForClass(NotaSchema);
export type notaModel = Model<NotaSchema>;