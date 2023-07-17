import { Either } from "src/Shared/utilities/Either";
import { IQuery } from "./IQuery";

export interface IServicioQuery<TView>{
    query(query:IQuery):Promise<Either<TView, Error>>
}