import { Either } from 'src/Shared/utilities/Either';
import { IServicioQuery } from "./IServicioQuery";
import { IQuery } from "./IQuery";
import { TipoQuery } from "../Shared_Enums/TipoQueryNotas";

export class QueryHandler<TView>{
    private comandos:Map<TipoQuery, IServicioQuery<TView>>;

    constructor(){
        this.comandos = new Map();
    }

    public query(dto:IQuery):Promise<Either<TView,Error>>{
        for (let key of this.comandos.keys()) {
            if (dto.getType() == key){
                return this.comandos.get(key).query(dto);
            }
        }
    }

    addComando(comando:IServicioQuery<TView>, tipo:TipoQuery){
        this.comandos.set(tipo, comando);
    }
}