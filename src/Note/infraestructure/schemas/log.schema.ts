import {Schema,Prop,SchemaFactory} from "@nestjs/mongoose";
import { Document,Model } from "mongoose";

export type LogsDocument = LogSchema & Document;

@Schema()
export class LogSchema{
    @Prop({
        required:true
    })
    log:string;

    @Prop({
        required:true
    })
    fecha:Date;
}

export const logsSchema = SchemaFactory.createForClass(LogSchema);
export type logsModel = Model<LogSchema>;