import { Either } from "src/Shared/utilities/Either";
import { IServicioQuery } from "./IServicioQuery";
import { IQuery } from "./IQuery";

export class QueryBaseDecorator<TView> implements IServicioQuery<TView>{
    protected wrapee:IServicioQuery<TView>

    constructor(service:IServicioQuery<TView>){
        this.wrapee = service;
    }

    query(query:IQuery):Promise<Either<TView, Error>>{
        return this.wrapee.query(query);
    }
}   