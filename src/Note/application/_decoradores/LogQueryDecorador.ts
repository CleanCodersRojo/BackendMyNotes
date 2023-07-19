import { QueryBaseDecorator } from "src/Shared/application/Shared_Querys/QueryBaseDecorator";
import { ILogger } from "./ILogger";
import { IServicioQuery } from "src/Shared/application/Shared_Querys/IServicioQuery";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";
import { Either } from "src/Shared/utilities/Either";

export class LogQueryDecorador<TView> extends QueryBaseDecorator<TView>{
    logger:ILogger;

    constructor(service:IServicioQuery<TView>, logger:ILogger){
        super(service);
        this.logger = logger;
    }

    async query(query:IQuery):Promise<Either<TView, Error>>{
        const result:Either<TView, Error> = await super.query(query);
        if (result.isLeft()){
            console.log(result.getLeft());
            const resultstring:string = JSON.stringify(result.getLeft(),null,2);

            this.logger.log("Consulta exitosa de query de tipo:" + query.getType() + "\nresultado: " + resultstring);
        }
        else{
            const resultstring:string = JSON.stringify(result.getRight(),null,2);
            this.logger.log("Consulta excepcional de query de tipo:" + query.getType() + "\n error:" + resultstring);
        }
        return result;
    }
}