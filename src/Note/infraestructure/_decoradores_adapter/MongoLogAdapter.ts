import { ILogger } from "src/Note/application/_decoradores/ILogger";
import { logsModel } from "../schemas/log.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

class ReceptorLog{
    log:string;
    fecha:Date;

    constructor(log:string){
        this.log = log;
        this.fecha = new Date();
    }
}

@Injectable()
export class MongoLogAdapter implements ILogger{
    constructor(@InjectModel("Log") private readonly logmodel:logsModel){}

    async log(msg: string): Promise<void> {
        console.log(msg)
        const logschme = new ReceptorLog(msg);

        const result = await (new this.logmodel(logschme)).save();
    }
}