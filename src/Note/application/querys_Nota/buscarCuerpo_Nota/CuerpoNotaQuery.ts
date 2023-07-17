import { ReceptorTextoCuerpo } from "src/Note/domain/fabrics/FabricaTexto/ReceptorTextoCuerpo";
import { TipoQuery } from "src/Shared/application/Shared_Enums/TipoQueryNotas";
import { IQuery } from "src/Shared/application/Shared_Querys/IQuery";

export class CuerpoNotaQuery extends IQuery{
    cuerpo:string;
    usuarioId:string;

    constructor(user:string, cuerpo:string){
        super();
        super.tipoQuery = TipoQuery.cuerpo;
        this.cuerpo = cuerpo;
        this.usuarioId = user;
    }
}