import { TipoQuery } from "src/Shared/application/Shared_Enums/TipoQueryNotas";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";

export class IdNotaQuery extends IQuery{
    idNota:string;
    usuarioId:string;

    constructor(user:string, id:string){
        super();
        super.tipoQuery = TipoQuery.idNota;
        this.idNota = id;
        this.usuarioId = user;
    }
}