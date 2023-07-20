import { TipoQuery } from "src/Shared/application/Shared_Enums/TipoQueryNotas";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";

export class UserNotaQuery extends IQuery{
    usuarioId:string;

    constructor(user:string){
        super();
        super.tipoQuery = TipoQuery.user;
        this.usuarioId = user;
    }
}