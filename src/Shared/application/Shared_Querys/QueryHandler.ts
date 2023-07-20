import { Either } from 'src/Shared/utilities/Either';
import { IServicioQuery } from "./IServicioQuery";
import { IQuery } from "./IQuery";
import { TipoQuery } from "../Shared_Enums/TipoQueryNotas";

export class QueryHandler<TView>{
    private queries:Map<TipoQuery, IServicioQuery<TView>>;

    constructor(){
        this.queries = new Map();
    }

    public query(dto:IQuery):Promise<Either<TView,Error>>{
        for (let key of this.queries.keys()) {
            if (dto.getType() == key){
                return this.queries.get(key).query(dto);
            }
        }
    }

    addQuery(comando:IServicioQuery<TView>, tipo:TipoQuery){
        this.queries.set(tipo, comando);
    }
}